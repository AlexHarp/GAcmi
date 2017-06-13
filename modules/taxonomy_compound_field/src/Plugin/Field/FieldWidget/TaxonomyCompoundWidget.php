<?php

namespace Drupal\taxonomy_compound_field\Plugin\Field\FieldWidget;

use Drupal\Core\Field\FieldItemListInterface;
use Drupal\Core\Field\WidgetBase;
use Drupal\Core\Form\FormStateInterface;
use Drupal\Component\Utility\Html;


/**
 * Plugin implementation of the 'taxonomy_compound_widget' widget.
 *
 * @FieldWidget(
 *   id = "taxonomy_compound_widget",
 *   label = @Translation("Taxonomy compound widget"),
 *   field_types = {
 *     "tax_compound_field_type"
 *   }
 * )
 */
class TaxonomyCompoundWidget extends WidgetBase {

  /**
   * {@inheritdoc}
   */
  public static function defaultSettings() {
    return [
      'size' => 90,
      'placeholder' => '',
    ] + parent::defaultSettings();
  }

  /**
   * {@inheritdoc}
   */
  public function settingsForm(array $form, FormStateInterface $form_state) {
    $elements = [];

    $elements['size'] = [
      '#type' => 'number',
      '#title' => t('Size of textfield'),
      '#default_value' => $this->getSetting('size'),
      '#required' => TRUE,
      '#min' => 1,
    ];
    $elements['placeholder'] = [
      '#type' => 'textfield',
      '#title' => t('Placeholder'),
      '#default_value' => $this->getSetting('placeholder'),
      '#description' => t('Text that will be shown inside the field until a value is entered. This hint is usually a sample value or a brief description of the expected format.'),
    ];

    
    // Vocabulary selection.
    /*$options = [];
    $vocabulary_storage = \Drupal::entityTypeManager()->getStorage('taxonomy_vocabulary');
    foreach ($vocabulary_storage->loadMultiple() as $vocabulary) {
      $options[$vocabulary->id()] = $vocabulary->label();
    }
    $elemnents['vocabulary'] = [
      '#type' => 'select',
      '#title' => $this->t('Vocabulary'),
      '#options' => $options,
      //'#default_value' => $taxonomy_menu->getVocabulary(),
    ];

*/
    return $elements;
  }

  /**
   * {@inheritdoc}
   */
  public function settingsSummary() {
    $summary = [];

    $summary[] = t('Textfield size: @size', ['@size' => $this->getSetting('size')]);
    if (!empty($this->getSetting('placeholder'))) {
      $summary[] = t('Placeholder: @placeholder', ['@placeholder' => $this->getSetting('placeholder')]);
    }

    return $summary;
  }

  /**
   * {@inheritdoc}
   */
  public function formElement(FieldItemListInterface $items, $delta, array $element, array &$form, FormStateInterface $form_state) {
    /*$element['value'] = $element + [
      '#type' => 'textfield',
      '#default_value' => isset($items[$delta]->value) ? $items[$delta]->value : NULL,
      '#size' => $this->getSetting('size'),
      '#placeholder' => $this->getSetting('placeholder'),
      '#maxlength' => $this->getFieldSetting('max_length'),
    ];*/

    // Vocabulary selection.
    $options = [];
    $vocabulary_storage = \Drupal::entityTypeManager()->getStorage('taxonomy_vocabulary');
    foreach ($vocabulary_storage->loadMultiple() as $vocabulary) {
      $options[$vocabulary->id()] = $vocabulary->label();
    }
    $element['value'] = $element + [
      '#type' => 'select',
      '#title' => $this->t('Vocabulary'),
      '#options' => $options,
      //'#default_value' => $taxonomy_menu->getVocabulary(),
    ];

    return $element;
  }

  /**
  * {@inheritdoc}
  */
  protected function formMultipleElements(FieldItemListInterface $items, array &$form, FormStateInterface $form_state)
  {
// $elements = parent::formMultipleElements($items, $form, $form_state);
    $form['#wrapper_id'] = Html::getUniqueID($items->getName());
    $elements = parent::formMultipleElements($items, $form, $form_state);
    $elements['#prefix'] = '<div id="' . $form['#wrapper_id'] . '">';
    $elements['#suffix'] = '</div>';
    $elements['add_more']['#ajax']['wrapper'] = $form['#wrapper_id'];
    $elements[1]['value']['#options'] = array('foo','bar',);
    $elements[1]['#ajax'] = array(
      'callback' => 'custom_taxonomy_lookup_ajax',
      'wrapper' => $form['#wrapper_id'],
      'event' => 'mousedown',
    );
dpm($elements); 
    return $elements;
  }

function custom_taxonomy_lookup_ajax($form, $form_state) {
  return $elements[1]['value']['#options'] = array('iko','rah',);

}




}
