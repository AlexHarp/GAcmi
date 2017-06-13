<?php

namespace Drupal\module_builder\Form;

use Drupal\Core\Render\Element;
use Drupal\Core\Entity\EntityForm;
use Drupal\Core\Entity\EntityInterface;
use Drupal\Core\Form\FormStateInterface;
use Drupal\Core\Url;

/**
 * Class ModuleBuilderModulePluginsForm
 *
 * Form for selecting plugins to implement.
 */
class ModuleBuilderModulePluginsForm extends ModuleBuilderComponentFormBase {

   /**
   * {@inheritdoc}
   */
  public function form(array $form, FormStateInterface $form_state) {
    $form = parent::form($form, $form_state);

    // List of component properties this form uses.
    $component_properties_to_use = [
      'plugins',
    ];
    $form = $this->componentPropertiesForm($form, $form_state, $component_properties_to_use);

    return $form;
  }

}
