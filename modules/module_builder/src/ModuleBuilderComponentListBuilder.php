<?php

namespace Drupal\module_builder;

use Drupal\Core\Entity\EntityInterface;
use Drupal\Core\Config\Entity\ConfigEntityListBuilder;
use DrupalCodeBuilder\Factory;
use DrupalCodeBuilder\Exception\SanityException;

/**
 * Defines a class to build a listing of module builder components.
 */
class ModuleBuilderComponentListBuilder extends ConfigEntityListBuilder {

  /**
   * {@inheritdoc}
   */
  public function render() {
    // Sanity check the environment and tell the user to go process data if
    // not already done so.
    LibraryWrapper::loadLibrary();
    try {
      Factory::getEnvironment()->verifyEnvironment('hook_data');
    }
    catch (SanityException $e) {
      ExceptionHandler::handleSanityException($e);
    }

    return parent::render();
  }

  /**
   * {@inheritdoc}
   */
  public function buildHeader() {
    $header['label'] = t('Module name');
    return $header + parent::buildHeader();
  }

  /**
   * {@inheritdoc}
   */
  public function buildRow(EntityInterface $entity) {
    $row['label'] = $entity->label();
    return $row + parent::buildRow($entity);
  }

  /**
   * {@inheritdoc}
   */
  public function getDefaultOperations(EntityInterface $entity) {
    $operations = parent::getDefaultOperations($entity);

    if (isset($operations['edit'])) {
      $operations['edit']['title'] = t('Edit info');
      $operations['edit']['weight'] = 0;
    }

    $operations['hooks'] = array(
      'title' => t('Edit hooks'),
      'url' => $entity->toUrl('hooks-form'),
      'weight' => 5,
    );

    $operations['plugins'] = array(
      'title' => t('Edit plugins'),
      'url' => $entity->toUrl('plugins-form'),
      'weight' => 10,
    );

    $operations['misc'] = array(
      'title' => t('Edit other components'),
      'url' => $entity->toUrl('misc-form'),
      'weight' => 15,
    );

    $operations['generate'] = array(
      'title' => t('Generate code'),
      'weight' => 20,
      'url' => $entity->toUrl('generate-form'),
    );

    return $operations;
  }

}
