<?php

namespace Drupal\module_builder\Form;

use Drupal\Core\Form\FormStateInterface;

/**
 * Class ModuleBuilderModuleMiscForm
 *
 * Form for selecting other components to implement.
 */
class ModuleBuilderModuleMiscForm extends ModuleBuilderComponentFormBase {

   /**
   * {@inheritdoc}
   */
  public function form(array $form, FormStateInterface $form_state) {
    $form = parent::form($form, $form_state);

    // List of component properties this form uses.
    $component_properties_to_use = [
      'module_help_text',
      'readme',
      'api',
      'settings_form',
      'forms',
      'permissions',
      'services',
      'router_items',
      'theme_hooks',
    ];
    $form = $this->componentPropertiesForm($form, $form_state, $component_properties_to_use);

    // Change the help text form element to a textarea.
    $form['data']['module_help_text']['#type'] = 'textarea';

    return $form;
  }

}
