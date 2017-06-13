<?php

namespace Drupal\module_builder\Form;

use Drupal\Core\Entity\EntityForm;
use Drupal\Core\Entity\EntityInterface;
use Drupal\Core\Entity\EntityTypeInterface;
use Drupal\Core\Form\FormStateInterface;
use Drupal\Core\Url;

/**
 * Class ModuleBuilderModuleNameForm
 *
 * Form for editing basic information, and also for adding new module entities.
 */
class ModuleBuilderModuleNameForm extends ModuleBuilderComponentFormBase {

   /**
   * {@inheritdoc}
   */
  public function form(array $form, FormStateInterface $form_state) {
    $form = parent::form($form, $form_state);

    $module = $this->entity;

    // The name.
    $form['name'] = array(
      '#type' => 'textfield',
      '#title' => $this->t('Readable name'),
      '#maxlength' => 255,
      '#default_value' => isset($module->name) ? $module->name : '',
      '#description' => $this->t("The form of the module name that appears in the UI."),
      '#required' => TRUE,
    );

    // The machine name.
    $form['id'] = array(
      '#type' => 'machine_name',
      '#title' => $this->t('Name'),
      '#description' => $this->t("The module's machine name, used in function and file names. May only contain lowercase letters, numbers, and underscores."),
      '#maxlength' => 32,
      '#default_value' => $module->id,
      '#machine_name' => array(
        'exists' => '\Drupal\module_builder\Entity\ModuleBuilderModule::load',
        'source' => ['name'],
        'standalone' => TRUE,
      ),
    );

    // List of component properties this form uses.
    $component_properties_to_use = [
      'short_description',
      'module_package',
      'module_dependencies',
    ];
    $form = $this->componentPropertiesForm($form, $form_state, $component_properties_to_use);

    return $form;
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

    // Set the base properties.
    foreach (['name', 'id'] as $key) {
      $entity->set($key, $values[$key]);

      // Remove so it doesn't end up in the $entity->data array.
      unset($values[$key]);
    }

    // Call the parent to set the data array properties.
    parent::copyFormValuesToEntity($entity, $form, $form_state);
  }

}
