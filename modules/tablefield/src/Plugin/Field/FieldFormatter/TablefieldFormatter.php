<?php

/**
 * @file
 * Contains \Drupal\tablefield\Plugin\Field\FieldFormatter\TablefieldFormatter.
 */

namespace Drupal\tablefield\Plugin\Field\FieldFormatter;

use Drupal\Core\Field\FieldItemListInterface;
use Drupal\Core\Field\FormatterBase;
use Drupal\Core\Url;
use Drupal\Component\Utility\Html;
//use Drupal\tablefield\Utility\Tablefield;

/**
 * Plugin implementation of the default Tablefield formatter.
 *
 * @FieldFormatter (
 *   id = "tablefield",
 *   label = @Translation("Tabular View"),
 *   field_types = {
 *     "tablefield"
 *   }
 * )
 */
class TablefieldFormatter extends FormatterBase {

  /**
   * {@inheritdoc}
   */
  public function viewElements(FieldItemListInterface $items, $langcode = NULL) {

    $field = $items->getFieldDefinition();
    $field_name = $field->getName();
    $field_settings = $field->getSettings();

    $entity = $items->getEntity();
    $entity_type = $entity->getEntityTypeId();
    $entity_id = $entity->id();


    $elements = array();
  
    foreach ($items as $delta => $table) {

      if (!empty($table->value)) {
        $tabledata = $table->value;//Tablefield::rationalizeTable($table->value);

        // Run the table through input filters
        foreach ($tabledata as $row_key => $row) {
          foreach ($row as $col_key => $cell) {
            $tabledata[$row_key][$col_key] = array(
              'data' => empty($table->format) ? Html::escape($cell) : check_markup($cell, $table->format),
              'class' => array('row_' . $row_key, 'col_' . $col_key)
            );
          }
        }
  
        // Pull the header for theming
        $header_data = array_shift($tabledata);
  
        // Check for an empty header, if so we don't want to theme it.
        $noheader = TRUE;
        foreach ($header_data as $cell) {
          if (strlen($cell['data']) > 0) {
            $noheader = FALSE;
            break;
          }
        }
  
        $header = $noheader ? NULL : $header_data;

        $render_array = array();

        // If the user has access to the csv export option, display it now.
        if ($field_settings['export'] && \Drupal::currentUser()->hasPermission('export tablefield')) {

          $route_params = array(
            'entity_type' => $entity_type,
            'entity_id' => $entity_id,
            'field_name' => $field_name,
            'langcode' => $items->getLangcode(),
            'delta' => $delta,
          );

          $url = Url::fromRoute('tablefield.export', $route_params);

          $render_array['export'] = array(
            '#type' => 'container',
            '#attributes' => array(
              'id' => 'tablefield-export-link-' . $delta,
              'class' => 'tablefield-export-link',
            ),
          );
          $render_array['export']['link'] = array(
            '#type' => 'link',
            '#title' => $this->t('Export Table Data'),
            '#url' => $url,
          );
        }

        $render_array['tablefield'] = array(
          '#type' => 'table',
          '#header' => $header,
          '#rows' => $tabledata,
          '#attributes' => array(
            'id' => 'tablefield-' . $delta,
            'class' => array(
              'tablefield'
            ),
          ),
          '#prefix' => '<div id="tablefield-wrapper-'. $delta .'" class="tablefield-wrapper">',
          '#suffix' => '</div>',
        );

        $elements[$delta] = $render_array;
      }
  
    }
    return $elements;
  }

}
