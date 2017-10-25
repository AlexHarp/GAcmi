<?php

namespace Drupal\rest\Plugin\views\display;

/**
 * The plugin that handles Data response callbacks for REST resources.
 *
 * @ingroup views_display_plugins
 *
 * @ViewsDisplay(
 *   id = "hydroid_export",
 *   title = @Translation("Hydroid export"),
 *   help = @Translation("Create a Json export resource for Hydroid."),
 *   uses_route = TRUE,
 *   admin = @Translation("Hydroid export"),
 *   returns_response = TRUE
 * )
 */
class HydroidExport extends RestExport {


}

