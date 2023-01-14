<?php

namespace App\Service;

use Symfony\Component\HttpFoundation\File\Exception\FileException;
use Gedmo\Sluggable\Util\Urlizer;

class UploadService
{
    private $logger;
    private $projectDir;
    public function __construct(string $projectDir)
    {
        $this->projectDir = $projectDir;
    }
    public function upload($base64, $fileName)
    {
        try {
            $newFilename = Urlizer::urlize($fileName) . '-' . uniqid() . '.' . "png";
            $image_parts = explode(";base64,", $base64);
            $image_en_base64 = base64_decode($image_parts[1]);

            $newFile = $this->projectDir . DIRECTORY_SEPARATOR . "public" . DIRECTORY_SEPARATOR . "images" . DIRECTORY_SEPARATOR . $newFilename;
            file_put_contents($newFile, $image_en_base64);

            // Save the GD resource as PNG in the best possible quality (no compression)
            // This will strip any metadata or invalid contents (including, the PHP backdoor)
            // To block any possible exploits, consider increasing the compression level


            return $newFile;
        } catch (FileException $e) {

            $this->logger->error('failed to upload image: ' . $e->getMessage());
            throw new FileException('Failed to upload file');
        }
    }
}
