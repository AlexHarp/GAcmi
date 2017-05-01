<?php

/**
 * @file
 * Views integration.
 */

use Drupal\cshs\Plugin\views\filter\CshsTaxonomyIndexTid;

/**
 * Implements hook_views_plugins_filter_alter().
 */
function cshs_views_plugins_filter_alter(array &$plugins) {
  foreach (['taxonomy_index_tid', 'taxonomy_index_tid_depth'] as $plugin) {
    $plugins[$plugin]['class'] = CshsTaxonomyIndexTid::class;
  }
}
