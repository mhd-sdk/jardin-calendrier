<?php

namespace App\Entity;

use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use App\Repository\EventRepository;
use ApiPlatform\Metadata\ApiResource;
use Doctrine\Common\Collections\Collection;
use ApiPlatform\Core\Annotation\ApiProperty;
use Doctrine\Common\Collections\ArrayCollection;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ORM\Table(name="event")
 * @ORM\Entity(repositoryClass="App\Repository\EventRepository")
 */
class Event
{
    /**
     * @ApiProperty(identifier=true)
     * @ORM\GeneratedValue(strategy="IDENTITY")
     * @ORM\Column(type="integer", nullable=false)
     * @ORM\Id
     */
    private ?int $id = null;

    /**
     * @ORM\Column(type="string", length=255, nullable=false)
     * @Groups({"event:read"})
     */
    private ?string $title = null;

    /**
     * @ORM\Column(type="string", length=255000, nullable=true)
     * @Groups({"event:read"})
     */
    private ?string $description = null;
    /**
     * @ORM\OneToMany(targetEntity="App\Entity\EventImage", mappedBy="event", orphanRemoval=true)
     * @Groups({"event:read"})
     */
    private Collection $eventImage;

    /**
     * @ORM\Column(type="datetime", nullable=false)
     * @Groups({"event:read"})
     */
    private ?\DateTimeInterface $start = null;

    /**
     * @ORM\Column(type="datetime", nullable=false)
     * @Groups({"event:read"})
     */
    private ?\DateTimeInterface $end = null;

    /**
     * @ORM\OneToMany(targetEntity=Participant::class, mappedBy="event", orphanRemoval=true)
     * @Groups({"event:read"})
     */
    private $participants;

    public function __construct()
    {
        $this->eventImage = new ArrayCollection();
        $this->participants = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getTitle(): ?string
    {
        return $this->title;
    }

    public function setTitle(string $title): self
    {
        $this->title = $title;

        return $this;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(?string $description): self
    {
        $this->description = $description;

        return $this;
    }

    /**
     * @return Collection<int, EventImage>
     */
    public function getEventImage(): Collection
    {
        return $this->eventImage;
    }

    public function addEventImage(EventImage $eventImage): self
    {
        if (!$this->eventImage->contains($eventImage)) {
            $this->eventImage->add($eventImage);
            $eventImage->setEvent($this);
        }

        return $this;
    }

    public function removeEventImage(EventImage $eventImage): self
    {
        if ($this->eventImage->removeElement($eventImage)) {
            // set the owning side to null (unless already changed)
            if ($eventImage->getEvent() === $this) {
                $eventImage->setEvent(null);
            }
        }

        return $this;
    }

    public function getStart(): ?\DateTimeInterface
    {
        return $this->start;
    }

    public function setStart(?\DateTimeInterface $start): self
    {
        $this->start = $start;

        return $this;
    }

    public function getEnd(): ?\DateTimeInterface
    {
        return $this->end;
    }

    public function setEnd(\DateTimeInterface $end): self
    {
        $this->end = $end;

        return $this;
    }

    /**
     * @return Collection<int, Participant>
     */
    public function getParticipants(): Collection
    {
        return $this->participants;
    }

    public function addParticipant(Participant $participant): self
    {
        if (!$this->participants->contains($participant)) {
            $this->participants[] = $participant;
            $participant->setEvent($this);
        }

        return $this;
    }

    public function removeParticipant(Participant $participant): self
    {
        if ($this->participants->removeElement($participant)) {
            // set the owning side to null (unless already changed)
            if ($participant->getEvent() === $this) {
                $participant->setEvent(null);
            }
        }

        return $this;
    }
}
