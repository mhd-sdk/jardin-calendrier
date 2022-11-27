<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use Gesdinet\JWTRefreshTokenBundle\Entity\RefreshToken as BaseRefreshToken;


/**
 * @ORM\Entity
 */
/**
 * @ORM\Table(name="refresh_token")
 */
/**
 * @ORM\Entity(repositoryClass="Gesdinet\JWTRefreshTokenBundle\Entity\RefreshTokenRepository")
 */
class RefreshToken extends BaseRefreshToken
{
}
