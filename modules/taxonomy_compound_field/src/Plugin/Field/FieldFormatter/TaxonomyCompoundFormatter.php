<?php

namespace Drupal\Taxonomy_compound_field\Plugin\Field\FieldFormatter;

use Drupal\Core\Field\FormatterBase;
use Drupal\Core\Field\FieldItemListInterface;
use Drupal\Core\Form\FormStateInterface;


/**
 * Plugin implementation of the 'Random_default' formatter.
 *
 * @FieldFormatter(
 *   id = "taxonomy_compound_formatter",
 *   label = @Translation("Taxonomy compound formatter"),
 *   field_types = {
 *     "tax_compound_field_type"
 *   },
 * )
 */
class TaxonomyCompoundFormatter extends FormatterBase {

  /**
   * {@inheritdoc}
   */
  public function settingsSummary() {
    $summary = array();
    $settings = $this->getSettings();

    $summary[] = t('Displays the random string.');

    return $summary;
  }

  /**
   * {@inheritdoc}
   */
  public function viewElements(FieldItemListInterface $items, $langcode) {
    $element = array();

    foreach ($items as $delta => $item) {
      // Render each element as markup.
      $element[$delta] = array(
        '#type' => 'markup',
        '#markup' => $item->value,
      );
    }

    return $element;
  }

/**
 * {@inheritdoc}
 */
public static function defaultSettings() {
  return [
    // Declare a setting named 'text_length', with
    // a default value of 'short'
    'text_length' => 'short',
  ] + parent::defaultSettings();
}

/**
 * {@inheritdoc}
 */
public function settingsForm(array $form, FormStateInterface $form_state) {
  $element['text_length'] = [
    '#title' => t('Text length'),
    '#type' => 'select',
    '#options' => [
      'short' => $this->t('Short'),
      'long' => $this->t('Long'),
    ],
    '#default_value' => $this->getSetting('text_length'),
  ];

  return $element;
}

}
