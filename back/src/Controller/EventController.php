<?php

namespace App\Controller;

use App\Entity\User;
use App\Entity\Event;
use App\Entity\EventImage;
use App\Entity\Participant;
use App\Service\UploadService;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class EventController extends AbstractController
{
    private $em;
    private $userRepository;
    private $eventRepository;
    private $eventImageRepository;
    private $participantRepository;
    private $uploader;

    public function __construct(ManagerRegistry $doctrine, string $projectDir)
    {
        $this->em = $doctrine->getManager();
        $this->userRepository = $doctrine->getRepository(User::class);
        $this->eventRepository = $doctrine->getRepository(Event::class);
        $this->eventImageRepository = $doctrine->getRepository(EventImage::class);
        $this->participantRepository = $doctrine->getRepository(Participant::class);
        $this->uploader = new UploadService($projectDir);
    }

    #[Route('/api/event/new', name: 'event.create', methods: ['POST'])]
    /**
     * @Route("/api/event/new", name="event.create", methods={"POST"})
     */
    public function newEvent(Request $request): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        if (empty($data['title']) || empty($data['description']) || empty($data['start']) || empty($data['end'])) {
            return new JsonResponse(['status' => 'error', 'message' => 'Missing data'], Response::HTTP_BAD_REQUEST);
        }

        $event = new Event();
        $event->setTitle($data['title']);
        $event->setDescription($data['description']);
        $start = new \DateTime($data['start']);
        $event->setStart($start);

        $end = new \DateTime($data['end']);
        $event->setEnd($end);

        if (isset($data['images'])) {
            foreach ($data['images'] as $image) {
                // create file object
                $eventImage = new EventImage();
                $eventImage->setEvent($event);
                // $eventImage->setBase64($image['base64']);
                $eventImage->setImagePath($this->uploader->upload($image['base64'], $image['filename']));
                $this->em->persist($eventImage);
            }
        }
        $this->em->persist($event);
        $this->em->flush();

        return new JsonResponse(['status' => 'success', 'message' => 'Event created'], Response::HTTP_CREATED);
    }

    // edit event
    /**
     * @Route("/api/event/edit", name="event.edit", methods={"PUT"})
     */
    public function editEvent(Request $request): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        if (empty($data['title']) || empty($data['description']) || empty($data['start']) || empty($data['end'])) {
            return new JsonResponse(['status' => 'error', 'message' => 'Missing data'], Response::HTTP_BAD_REQUEST);
        }

        $event = $this->eventRepository->find($data['id']);
        $event->setTitle($data['title']);
        $event->setDescription($data['description']);
        $start = new \DateTime($data['start']);
        $event->setStart($start);

        $end = new \DateTime($data['end']);
        $event->setEnd($end);

        // remove all images
        $eventImages = $this->eventImageRepository->findBy(['event' => $event]);
        foreach ($eventImages as $eventImage) {
            $this->em->remove($eventImage);
        }

        if (isset($data['images'])) {
            foreach ($data['images'] as $image) {
                $eventImage = new EventImage();
                $eventImage->setEvent($event);
                $eventImage->setBase64($image['base64']);
                $eventImage->setImagePath($this->uploader->upload($image['base64'], $image['filename']));
                $this->em->persist($eventImage);
            }
        }


        $this->em->persist($event);
        $this->em->flush();

        return new JsonResponse(['status' => 'success', 'message' => 'Event edited'], Response::HTTP_CREATED);
    }

    // delete event
    /**
     * @Route("/api/event/delete", name="event.delete", methods={"DELETE"})
     */
    public function deleteEvent(Request $request): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        if (empty($data['id'])) {
            return new JsonResponse(['status' => 'error', 'message' => 'Missing data'], Response::HTTP_BAD_REQUEST);
        }

        $event = $this->eventRepository->find($data['id']);

        $this->em->remove($event);
        $this->em->flush();

        return new JsonResponse(['status' => 'success', 'message' => 'Event deleted'], Response::HTTP_CREATED);
    }






















    /**
     * @Route("/api/event/all", name="event.list", methods={"GET"})
     */
    public function listEvents(SerializerInterface $serializer): JsonResponse
    {
        $events = $this->eventRepository->findAll();

        $data = [];

        foreach ($events as $event) {
            $data[] = [
                'id' => $event->getId(),
                'title' => $event->getTitle(),
                'description' => $event->getDescription(),
                'start' => $event->getStart(),
                'end' => $event->getEnd(),
                'images' => $event->getEventImage(),
                'participants' => $event->getParticipants()
            ];
        }

        return new JsonResponse($serializer->serialize($data, 'json', ['groups' => ['event:read']]), Response::HTTP_OK, [], true);
    }

    // add participant to event
    /**
     * @Route("/api/event/add-participant", name="event.add-participant", methods={"POST"})
     */
    public function addParticipant(Request $request): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        if (empty($data['email'])) {
            return new JsonResponse(['status' => 'error', 'message' => 'Missing data'], Response::HTTP_BAD_REQUEST);
        }
        if (empty($data['fullname'])) {
            return new JsonResponse(['status' => 'error', 'message' => 'Missing data'], Response::HTTP_BAD_REQUEST);
        }
        if (empty($data['year'])) {
            return new JsonResponse(['status' => 'error', 'message' => 'Missing data'], Response::HTTP_BAD_REQUEST);
        }

        if (empty($data['eventId'])) {
            return new JsonResponse(['status' => 'error', 'message' => 'Missing data'], Response::HTTP_BAD_REQUEST);
        }
        $participant = new Participant();
        $participant->setEmail($data['email']);
        $participant->setFullname($data['fullname']);
        $participant->setYear($data['year']);

        $event = $this->eventRepository->find($data['eventId']);
        $this->em->persist($participant);

        if (!$event) {
            return new JsonResponse(['status' => 'error', 'message' => 'Event not found'], Response::HTTP_NOT_FOUND);
        }
        $event->addParticipant($participant);
        $participants = $this->participantRepository->findBy(['event' => $data['eventId']]);
        // if participant mail already exists
        foreach ($participants as $participant) {
            if ($participant->getEmail() == $data['email']) {
                return new JsonResponse(['status' => 'error', 'message' => 'Participant already exists'], Response::HTTP_BAD_REQUEST);
            }
        }

        $this->em->persist($event);
        $this->em->flush();


        return new JsonResponse(['status' => 'success', 'message' => 'Participant added'], Response::HTTP_CREATED);
    }
}
