<?php
// api/src/OpenApi/JwtDecorator.php

namespace App\OpenApi;

use ApiPlatform\OpenApi\Model;
use ApiPlatform\OpenApi\OpenApi;
use ApiPlatform\OpenApi\Model\PathItem;
use ApiPlatform\OpenApi\Model\Operation;
use ApiPlatform\OpenApi\Factory\OpenApiFactoryInterface;
use Symfony\Component\HttpFoundation\Response;

final class JwtDecorator implements OpenApiFactoryInterface
{
    public function __construct(OpenApiFactoryInterface $decorated)
    {
        $this->decorated = $decorated;
    }
    public function normalize($object, $format = null, array $context = [])
    {
        $docs = $this->decorated->normalize($object, $format, $context);

        // Override BasePath
        $docs['basePath'] = '/api/doc';

        return $docs;
    }

    public function supportsNormalization($data, $format = null)
    {
        return $this->decorated->supportsNormalization($data, $format);
    }


    public function __invoke(array $context = []): OpenApi
    {
        $openApi = $this->decorated->__invoke($context);
        $openApi
            ->getPaths()
            ->addPath('/stats', new PathItem(
                null,
                null,
                null,
                new Operation(
                    'get',
                    ['Stats'],
                    [
                        Response::HTTP_OK => [
                            'content' => [
                                'application/json' => [
                                    'schema' => [
                                        'type' => 'object',
                                        'properties' => [
                                            'books_count' => [
                                                'type' => 'integer',
                                                'example' => 997,
                                            ],
                                            'topbooks_count' => [
                                                'type' => 'integer',
                                                'example' => 101,
                                            ],
                                        ],
                                    ],
                                ],
                            ],
                        ],
                    ],
                    'Retrieves the number of books and top books (legacy endpoint).'
                )
            ));
        return $openApi;
    }
}
