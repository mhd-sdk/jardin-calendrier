<?php

namespace App\Controller;

use App\Entity\User;
use Doctrine\Persistence\ManagerRegistry;
use ApiPlatform\Api\UrlGeneratorInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

class UserController extends AbstractController
{

    public function __construct(ManagerRegistry $doctrine)
    {
        $this->em = $doctrine->getManager();
        $this->userRepository = $doctrine->getRepository(User::class);
    }

    /**
     * @Route("/api/register", name="user.create", methods={"POST"})
     */
    public function createPlayer(Request $request, SerializerInterface $serializer, UrlGeneratorInterface $urlGenerator, UserPasswordHasherInterface $passwordHasher): JsonResponse
    {
        $params = json_decode($request->getContent(), true);
        if (empty($params['email']) || empty($params['password'] || empty($params['username']))) {
            return new JsonResponse(['error' => 'Missing parameters'], Response::HTTP_BAD_REQUEST);
        }

        $user = new User();
        // if email is not unique
        if ($this->userRepository->findOneBy(['email' => $params['email']])) {
            return new JsonResponse(['message' => 'Email already exists'], Response::HTTP_BAD_REQUEST);
        }
        // if username is not unique
        if ($this->userRepository->findOneBy(['username' => $params['username']])) {
            return new JsonResponse(['message' => 'Username already exists'], Response::HTTP_BAD_REQUEST);
        }
        $user->setUsername($params['username']);
        $user->setEmail($params['email']);
        $user->setPassword($passwordHasher->hashPassword($user, $params['password']));
        $user->setRoles(['ROLE_USER']);

        $this->em->persist($user);
        $this->em->flush();

        return new JsonResponse([
            'status' => 'success',
            'message' => 'User created',
        ], Response::HTTP_CREATED);
    }

    /**
     * @Route("/api/grant/{id}", name="user.grant-admin", methods={"GET"})
     */
    public function grantAdmin($id): JsonResponse
    {
        if (!$this->isGranted('ROLE_ADMIN')) {
            return new JsonResponse(['message' => 'You are not allowed to grant admin role'], Response::HTTP_FORBIDDEN);
        }
        $user = $this->userRepository->find($id);
        $user->setRoles(['ROLE_ADMIN']);

        $this->em->persist($user);
        $this->em->flush();

        return new JsonResponse([
            'status' => 'success',
            'message' => 'User granted admin role',
        ], Response::HTTP_OK);
    }



    /**
     * @Route("/api/delete/{id}", name="user.delete", methods={"DELETE"})
     */

    public function deleteUser($id): JsonResponse
    {
        // if user is not admin
        if (!$this->isGranted('ROLE_ADMIN')) {
            return new JsonResponse(['message' => 'You are not allowed to delete user'], Response::HTTP_FORBIDDEN);
        }
        $user = $this->userRepository->find($id);
        $this->em->remove($user);
        $this->em->flush();

        return new JsonResponse([
            'status' => 'success',
            'message' => 'User deleted',
        ], Response::HTTP_OK);
    }
}
