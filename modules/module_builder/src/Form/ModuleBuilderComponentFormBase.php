<?php

namespace Drupal\module_builder\Form;

use Drupal\Component\Utility\Html;
use Drupal\Component\Utility\NestedArray;
use Drupal\Core\Entity\EntityForm;
use Drupal\Core\Entity\EntityInterface;
use Drupal\Core\Entity\EntityTypeInterface;
use Drupal\Core\Form\FormStateInterface;
use Drupal\module_builder\LibraryWrapper;
use DrupalCodeBuilder\Exception\SanityException;

/**
 * Class ModuleBuilderComponentFormBase
 *
 * Base class for Module Builder component forms.
 */
class ModuleBuilderComponentFormBase extends EntityForm {

  /**
   * The DCB Generate Task handler.
   */
  protected $codeBuilderTaskHandlerGenerate;

  /**
   * Constructor.
   */
  function __construct() {
  }

  /**
   * {@inheritdoc}
   */
  public function buildForm(array $form, FormStateInterface $form_state) {
    // Load our library.
    LibraryWrapper::loadLibrary();

    // Get the component data info.
    try {
      $this->codeBuilderTaskHandlerGenerate = \DrupalCodeBuilder\Factory::getTask('Generate', 'module');
    }
    catch (SanityException $e) {
      drupal_set_message(t("Modules cannot be created because component data is not available. Use the 'Process data' tab to get data about hooks and plugins."), 'error');
      return $form;
    }

    $form = parent::buildForm($form, $form_state);

    return $form;
  }

  /**
   * Add form elements for the specified component properties.
   *
   * @param $form
   *  The form array.
   * @param FormStateInterface $form_state
   *  The form state object.
   * @param $component_properties_to_use
   *  An array of property names from the component.
   *
   * @return
   *  The form array.
   */
  protected final function componentPropertiesForm($form, FormStateInterface $form_state, $component_properties_to_use) {
    // Set #tree on the data element.
    $form['data'] = [
      '#tree' => TRUE,
    ];

    $module = $this->entity;
    $module_entity_data = $module->get('data');

    $component_data_info = $this->codeBuilderTaskHandlerGenerate->getRootComponentDataInfo();

    $component_data = array();

    // Work through the component data info, assembling the component data array
    // Each property info needs to be prepared, so iterate by reference.
    foreach ($component_data_info as $property_name => &$property_info) {
      // Prepare the single property: get options, default value, etc.
      // (We prepare all of them as they may have an effect on the default value
      // of a property we show in this form.)
      $this->codeBuilderTaskHandlerGenerate->prepareComponentDataProperty($property_name, $property_info, $component_data);
    }
    // Crazy PHP bug. See https://bugs.php.net/bug.php?id=29992
    unset($property_info);

    // Iterate over our list of properties, so we are in control of the order.
    foreach ($component_properties_to_use as $property_name) {
      $property_info = $component_data_info[$property_name];

      // Get the value to set in the form element.
      $form_default_value = isset($module_entity_data[$property_name])
        ? $module_entity_data[$property_name]
        : $component_data[$property_name];

      $element = array(
        '#title' => $property_info['label'],
        '#required' => $property_info['required'],
        '#mb_component_property_name' => $property_name,
      );

      if (isset($property_info['description'])) {
        $element['#description'] = $property_info['description'];
      }

      // The type of the form element depends on the format of the component data
      // property.
      $format = $property_info['format'];
      $format_method = 'element' . ucfirst($format);
      $this->{$format_method}($element, $form_state, $property_info, $form_default_value);

      $element['#mb_format'] = $property_info['format'];

      $form['data'][$property_name] = $element;
    }

    return $form;
  }

  /**
   * Set form element properties specific to array component properties.
   *
   * @param &$element
   *  The form element for the component property.
   * @param FormStateInterface $form_state
   *  The form state.
   * @param $property_info
   *  The info array for the component property.
   * @param $form_default_value
   *  The default value for the form element.
   */
  protected function elementArray(&$element, FormStateInterface $form_state, $property_info, $form_default_value) {
    if (isset($property_info['options'])) {
      $element['#type'] = 'checkboxes';
      $element['#options'] = $property_info['options'];

      if (is_null($form_default_value)) {
        $form_default_value = [];
      }
      else {
        $form_default_value = array_combine($form_default_value, $form_default_value);
      }
    }
    else {
      $element['#type'] = 'textarea';
      $element['#description'] = (string) $element['#description'] . ' ' . t("Enter one item per line.");

      $form_default_value = implode("\n", $form_default_value);
    }

    $element['#default_value'] = $form_default_value;
  }

  /**
   * Set form element properties specific to boolean component properties.
   *
   * @param &$element
   *  The form element for the component property.
   * @param FormStateInterface $form_state
   *  The form state.
   * @param $property_info
   *  The info array for the component property.
   * @param $form_default_value
   *  The default value for the form element.
   */
  protected function elementBoolean(&$element, FormStateInterface $form_state, $property_info, $form_default_value) {
    $element['#type'] = 'checkbox';

    $element['#default_value'] = $form_default_value;
  }

  /**
   * Set form element properties specific to compound component properties.
   *
   * @param &$element
   *  The form element for the component property.
   * @param FormStateInterface $form_state
   *  The form state.
   * @param $property_info
   *  The info array for the component property.
   * @param $form_default_value
   *  The default value for the form element.
   */
  protected function elementCompound(&$element, FormStateInterface $form_state, $property_info, $form_default_value) {
    // Figure out how many items to show.
    // If we're reloading the form in response to the 'add more' button, then
    // form storage dictates the item count.
    // Otherwise, it's the first time we're here and the number of items in the
    // entity tells us how many items to show in the form.
    // Finally, if that's empty, then show one item.
    $storage = &$form_state->getStorage();
    $item_count = NestedArray::getValue($storage, ['module_builder_item_count', $element['#mb_component_property_name']]);
    if (empty($item_count)) {
      $item_count = count($form_default_value);
    }
    if (empty($item_count)) {
      $item_count = 1;
    }

    // Update the form storage.
    NestedArray::setValue($storage, ['module_builder_item_count', $element['#mb_component_property_name']], $item_count);

    $element['#type'] = 'details';
    $element['#open'] = TRUE;

    // Set up a wrapper for AJAX.
    $wrapper_id = Html::getUniqueId($element['#mb_component_property_name'] . '-add-more-wrapper');
    $element['#prefix'] = '<div id="' . $wrapper_id . '">';
    $element['#suffix'] = '</div>';

    // Show the items in a table. This is single-column, with all child
    // properties in the one cell, but we just want the striping for visual
    // clarity.
    $element['table'] = array(
      '#type' => 'table',
    );

    for ($delta = 0; $delta < $item_count; $delta++) {
      $row = [];
      $cell = [];

      foreach ($property_info['properties'] as $property_name => $info) {
        $sub_element = array(
          '#title' => $info['label'],
          '#required' => $info['required'],
        );

        if (isset($info['description'])) {
          $sub_element['#description'] = $info['description'];
        }

        if (isset($form_default_value[$delta][$property_name])) {
          $sub_element_default_value = $form_default_value[$delta][$property_name];
        }
        else {
          $sub_element_default_value = NULL;
        }

        // Add in a marker that this is a child property.
        $info['child_property'] = TRUE;

        $format = $info['format'];
        $format_method = 'element' . ucfirst($format);

        $this->{$format_method}($sub_element, $form_state, $info, $sub_element_default_value);

        // Add description to child properties that can get defaults filled in
        // later.
        if (empty($info['required']) && isset($info['default']) && $info['format'] != 'boolean') {
          $sub_element['#description'] = (isset($sub_element['#description']) ? $sub_element['#description'] . ' ' : '')
            . t("Leave blank for a default value.");
        }

        // Remove the 'required' property, so you can save the form and leave
        // a compound item blank.
        // TODO: this won't work if compound properties themselves have child
        // compound properties. Which should be unlikely!
        unset($sub_element['#required']);

        $sub_element['#parents'] = array(
          'data',
          $element['#mb_component_property_name'],
          $delta,
          $property_name,
        );

        $cell[$property_name] = $sub_element;
      }

      // Put all the properties into a single cell so it's a 1-column table.
      $row[] = $cell;
      $element['table'][$delta] = $row;
    }

    // Button to add more items.
    $element['add'] = array(
      '#type' => 'submit',
      '#name' => strtr($element['#mb_component_property_name'], '-', '_') . '_add_more',
      '#value' => t('Add another item'),
      '#limit_validation_errors' => [],
      '#submit' => array(array(get_class($this), 'addMoreSubmit')),
      '#ajax' => array(
        'callback' => array(get_class($this), 'addMoreAjax'),
        'wrapper' => $wrapper_id,
        'effect' => 'fade',
      ),
    );
  }

  /**
   * Submission handler for the "Add another item" button.
   */
  public static function addMoreSubmit(array $form, FormStateInterface $form_state) {
    $button = $form_state->getTriggeringElement();

    // Go one level up in the form, to the widgets container.
    $element = NestedArray::getValue($form, array_slice($button['#array_parents'], 0, -1));

    // Get the item count for this element from form storage and increment it.
    $storage = &$form_state->getStorage();
    $item_count = NestedArray::getValue($storage, ['module_builder_item_count', $element['#mb_component_property_name']]);
    $item_count++;
    NestedArray::setValue($storage, ['module_builder_item_count', $element['#mb_component_property_name']], $item_count);

    $form_state->setRebuild();
  }

  /**
   * Ajax callback for the "Add another item" button.
   *
   * This returns the new page content to replace the page content made obsolete
   * by the form submission.
   */
  public static function addMoreAjax(array $form, FormStateInterface $form_state) {
    $button = $form_state->getTriggeringElement();

    // Go one level up in the form, to the widgets container.
    $element = NestedArray::getValue($form, array_slice($button['#array_parents'], 0, -1));

    $item_count = NestedArray::getValue($form_state->getStorage(), ['module_builder_item_count', $element['#mb_component_property_name']]);

    // Add a DIV around the delta receiving the Ajax effect.
    $delta = $item_count;
    $element[$delta]['#prefix'] = '<div class="ajax-new-content">' . (isset($element[$delta]['#prefix']) ? $element[$delta]['#prefix'] : '');
    $element[$delta]['#suffix'] = (isset($element[$delta]['#suffix']) ? $element[$delta]['#suffix'] : '') . '</div>';

    return $element;
  }

  /**
   * Set form element properties specific to array component properties.
   *
   * @param &$element
   *  The form element for the component property.
   * @param FormStateInterface $form_state
   *  The form state.
   * @param $property_info
   *  The info array for the component property.
   * @param $form_default_value
   *  The default value for the form element.
   */
  protected function elementString(&$element, FormStateInterface $form_state, $property_info, $form_default_value) {
    if (isset($property_info['options'])) {
      $element['#type'] = 'select';

      $options = [];
      if (!empty($property_info['child_property'])) {
        $options[''] = t('-- None --');
      }
      $options = array_merge($options, $property_info['options']);

      $element['#options'] = $options;

      if (empty($form_default_value)) {
        $form_default_value = '';
      }
    }
    else {
      $element['#type'] = 'textfield';
    }

    $element['#default_value'] = $form_default_value;
  }

  /**
   * Returns an array of supported actions for the current entity form.
   */
  protected function actions(array $form, FormStateInterface $form_state) {
    $actions['submit'] = array(
      '#type' => 'submit',
      '#value' => $this->t('Save'),
      '#dropbutton' => 'mb',
      // Still no way to get a button's name, apparently?
      '#mb_action' => 'submit',
      '#submit' => array('::submitForm', '::save'),
    );
    if ($this->getNextLink() != 'generate-form') {
      $actions['submit_next'] = array(
        '#type' => 'submit',
        '#value' => $this->t('Save and go to next page'),
        '#dropbutton' => 'mb',
        '#mb_action' => 'submit_next',
        '#submit' => array('::submitForm', '::save'),
      );
    }
    $actions['submit_generate'] = array(
      '#type' => 'submit',
      '#value' => $this->t('Save and generate code'),
      '#dropbutton' => 'mb',
      '#mb_action' => 'submit_generate',
      '#submit' => array('::submitForm', '::save'),
    );

    return $actions;
  }

  /**
   * Copies top-level form values to entity properties
   *
   * This should not change existing entity properties that are not being edited
   * by this form.
   *
   * @param \Drupal\Core\Entity\EntityInterface $entity
   *   The entity the current form should operate upon.
   * @param array $form
   *   A nested array of form elements comprising the form.
   * @param \Drupal\Core\Form\FormStateInterface $form_state
   *   The current state of the form.
   */
  protected function copyFormValuesToEntity(EntityInterface $entity, array $form, FormStateInterface $form_state) {
    $values = $form_state->getValues();

    if ($this->entity instanceof EntityWithPluginCollectionInterface) {
      // Do not manually update values represented by plugin collections.
      $values = array_diff_key($values, $this->entity->getPluginCollections());
    }

    //dsm($form);

    // Need to get the component data info again.
    // We can't put this into form state storage, because it contains closures,
    // which don't survive the serialization process in the database.
    $component_data_info = $this->codeBuilderTaskHandlerGenerate->getRootComponentDataInfo();
    // We don't need defaults or options, so no need to do
    // prepareComponentDataProperty().

    if ($this->entity->isNew()) {
      $data = [];
    }
    else {
      // Add to the existing entity data array.
      $data = $entity->get('data');
    }

    foreach ($values['data'] as $key => $value) {
      $form_element = $form['data'][$key];

      $value = $this->getFormElementValue($key, $component_data_info[$key], $value);

      if (empty($value)) {
        unset($data[$key]);
      }
      else {
        $data[$key] = $value;
      }
    }

    $entity->set('data', $data);
  }

  /**
   * Get the value for a property from the form values.
   *
   * This performs various processing depending on the form element type and the
   * property format:
   *  - explode textarea values
   *  - filter checkboxes and store only the keys
   *  - recurse into compound properties
   *
   * @param $key
   *  The name of the property and the form element.
   * @param $component_property_info
   *  The property info array for this property.
   * @param $value
   *  The incoming form value from the form element for this property.
   *
   * @return
   *  The processed value.
   */
  protected function getFormElementValue($key, $component_property_info, $value) {
    if ($component_property_info['format'] == 'array') {
      if (empty($component_property_info['options'])) {
        // Array format, without options: textarea.
        // Only explode a non-empty string, as explode() will turn '' into an
        // array!
        if (!empty($value)) {
          $value = explode("\n", $value);
        }
      }
      else {
        // Array format, with options: checkboxes.
        // Filter out empty values. (FormAPI *still* doesn't do this???)
        $value = array_filter($value);
        // Don't store values also in the keys, as some of these have dots in
        // them, which ConfigAPI doesn't allow.
        $value = array_keys($value);
      }
    }

    // Compound format.
    if ($component_property_info['format'] == 'compound') {
      // Remove the 'add' button from the values.
      unset($value['add']);
      unset($value['table']);

      // Filter out items which are empty.
      $child_properties = array_keys($component_property_info['properties']);
      $first_child_property = $child_properties[0];

      foreach ($value as $delta => $item_value) {
        // Ignore an item whose first property is empty.
        if (empty($item_value[$first_child_property])) {
          unset($value[$delta]);
          continue;
        }

        // Recurse into the child property values.
        foreach ($item_value as $child_key => $child_value) {
          $value[$delta][$child_key] = $this->getFormElementValue($child_key, $component_property_info['properties'][$child_key], $child_value);
        }
      }
    }

    return $value;
  }

  // TODO: validate compound properties on submit:
  // - check for required properties
  // - filter out items which are completely empty.

  /**
   * {@inheritdoc}
   */
  public function save(array $form, FormStateInterface $form_state) {
    $is_new = $this->entity->isNew();

    $module = $this->entity;

    $status = $module->save();

    if ($status) {
      // Setting the success message.
      drupal_set_message($this->t('Saved the module: @name.', array(
        '@name' => $module->name,
      )));
    }
    else {
      drupal_set_message($this->t('The @name module was not saved.', array(
        '@name' => $module->name,
      )));
    }

    // Optionally advance to next tab or go to the generate page.
    $element = $form_state->getTriggeringElement();
    switch ($element['#mb_action']) {
      case 'submit':
        if ($is_new) {
          // For a new module, we need to redirect to its edit form, as staying
          // put would leave on the add form.
          $url = $module->toUrl('edit-form');
          $form_state->setRedirectUrl($url);
        }
        break;
      case 'submit_next':
        $next_link = $this->getNextLink();
        $url = $module->toUrl($next_link);
        $form_state->setRedirectUrl($url);
        break;
      case 'submit_generate':
        $url = $module->toUrl('generate-form');
        $form_state->setRedirectUrl($url);
        break;
    }
  }

  /**
   * Get the next entity link after the one for the current form.
   *
   * @return
   *  The name of an entity link.
   */
  protected function getNextLink() {
    // Probably a more elegant way of figuring out where we currently are
    // with routes maybe?
    $operation = $this->getOperation();

    // Special case for add form.
    if ($operation == 'default') {
      $operation = 'edit';
    }

    $operation_relationship = $operation . '-form';
    $entity_relationships = $this->entity->uriRelationships();
    $index = array_search($operation_relationship, $entity_relationships);

    return $entity_relationships[$index + 1];
  }

}
