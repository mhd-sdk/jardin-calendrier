<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Metadata\ApiResource;
use App\Repository\EventImageRepository;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ORM\Table(name="event_image")
 * @ORM\Entity(repositoryClass="App\Repository\EventImageRepository")
 */
class EventImage
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer", nullable=false)
     * @Groups({"event:read"})
     */
    private ?int $id = null;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\Event", inversedBy="eventImage")
     * @ORM\JoinColumn(nullable=false)
     */

    private ?Event $event = null;
    /**
     * @Groups({"event:read"})
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private ?string $imageSize = null;

    /**
     * @ORM\Column(type="string", length=2500000, nullable=true)
     */
    private ?string $base64 = null;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     * @Groups({"event:read"})
     */
    private ?string $imagePath = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getEvent(): ?Event
    {
        return $this->event;
    }

    public function setEvent(?Event $event): self
    {
        $this->event = $event;

        return $this;
    }

    public function getImageSize(): ?string
    {
        return $this->imageSize;
    }

    public function setImageSize(?string $imageSize): self
    {
        $this->imageSize = $imageSize;

        return $this;
    }

    public function getBase64(): ?string
    {
        return $this->base64;
    }

    public function setBase64(string $base64): self
    {
        $this->base64 = $base64;

        return $this;
    }

    public function getImagePath(): ?string
    {
        return $this->imagePath;
    }

    public function setImagePath(string $imagePath): self
    {
        $this->imagePath = $imagePath;

        return $this;
    }
}
