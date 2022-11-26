<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\EventRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: EventRepository::class)]
#[ApiResource]
class Event
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $title = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $description = null;

    #[ORM\OneToMany(mappedBy: 'event', targetEntity: EventImage::class)]
    private Collection $eventImage;

    public function __construct()
    {
        $this->eventImage = new ArrayCollection();
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
}
