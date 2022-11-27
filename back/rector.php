<?php

use Rector\Config\RectorConfig;
use Rector\Core\Configuration\Option;
use Rector\DowngradePhp80\ValueObject\DowngradeAttributeToAnnotation;
use Rector\DowngradePhp80\Rector\Class_\DowngradeAttributeToAnnotationRector;
use Symfony\Component\DependencyInjection\Loader\Configurator\ContainerConfigurator;


return static function (RectorConfig $rectorConfig): void {
    // rector config path
    $rectorConfig->paths([
        __DIR__ . '/src',
    ]);
    $rectorConfig->ruleWithConfiguration(
        DowngradeAttributeToAnnotationRector::class,
        [new DowngradeAttributeToAnnotation('Symfony\Component\Routing\Annotation\Route')]
    );
};
