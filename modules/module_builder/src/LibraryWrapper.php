<?php

namespace Drupal\module_builder;

use Drupal\module_builder\Environment\Drupal8Module;

/**
 * Class LibraryWrapper
 *
 * Quick and dirty wrapper class to load our library.
 *
 * TODO: Use either Libraries module or Composer manager.
 */
class LibraryWrapper {

  /**
   * Load the Module Builder library and set the environment.
   *
   * @throws
   *  Throws an exception if the library can't be found.
   */
  public static function loadLibrary() {
    if (!file_exists('libraries/drupal-code-builder/Factory.php')) {
      throw new \Exception("Mising library.");
    }
    require_once('libraries/drupal-code-builder/Factory.php');

    \DrupalCodeBuilder\Factory::setEnvironmentLocalClass('DrupalLibrary')
      ->setCoreVersionNumber(\Drupal::VERSION);
  }

}
