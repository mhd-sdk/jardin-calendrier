<?php

namespace App\Controller;

use App\Entity\User;
use App\Entity\Event;
use App\Entity\EventImage;
use App\Service\UploadService;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\ResponseHeaderBag;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class EventImageController extends AbstractController
{
    public function __construct(ManagerRegistry $doctrine, string $projectDir)
    {
        $this->em = $doctrine->getManager();
        $this->userRepository = $doctrine->getRepository(User::class);
        $this->eventRepository = $doctrine->getRepository(Event::class);
        $this->eventImageRepository = $doctrine->getRepository(EventImage::class);
        $this->uploader = new UploadService($projectDir);
    }

    /**
     * @Route("/api/image/{idImage}", name="get.image", methods={"GET"})
     */
    public function getPicture($idImage)
    {

        // get eventImage from id
        $eventImage = $this->eventImageRepository->find($idImage);
        $filePath = $eventImage->getImagePath();


        if (file_exists($filePath)) {
            $response = new Response();
            $disposition = $response->headers->makeDisposition(ResponseHeaderBag::DISPOSITION_INLINE, "image");
            $response->headers->set('Content-Disposition', $disposition);
            $response->headers->set('Content-Type', 'image/png');
            $response->setContent(file_get_contents($filePath));
            return $response;
        } else {
            return $this->redirect($this->generateUrl('my_url_to_site_index'));
        }
    }
}
