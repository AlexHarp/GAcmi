<?php

namespace Drupal\module_builder\Form;

use Drupal\Core\Entity\EntityForm;
use Drupal\Core\Entity\EntityInterface;
use Drupal\Core\Form\FormStateInterface;
use Drupal\Core\Render\Element;
use Drupal\module_builder\ExceptionHandler;
use Drupal\module_builder\LibraryWrapper;
use DrupalCodeBuilder\Exception\SanityException;

/**
 * Class ModuleBuilderComponentGenerateForm
 *
 * Form showing generated component code.
 */
class ModuleBuilderComponentGenerateForm extends EntityForm {

  /**
   * {@inheritdoc}
   */
  public function form(array $form, FormStateInterface $form_state) {
    $form = parent::form($form, $form_state);

    // Load our library.
    LibraryWrapper::loadLibrary();

    $module = $this->entity;
    $component_data = $module->get('data');
    //dsm($component_data);

    // Add in the component root name and readable name.
    $component_data['root_name'] = $module->id;
    $component_data['readable_name'] = $module->label;

    try {
      // Get our task handler.
      $mb_task_handler_generate = \DrupalCodeBuilder\Factory::getTask('Generate', 'module');
    }
    catch (SanityException $e) {
      ExceptionHandler::handleSanityException($e);
      return $form;
    }

    // Get the component data info.
    $component_data_info = $mb_task_handler_generate->getRootComponentDataInfo();

    // Build list.
    // The UI always gets the full code.
    $component_data['requested_build'] = array('all' => TRUE);

    // Get the files.
    $files = $mb_task_handler_generate->generateComponent($component_data);

    // Get the path to the module if it's previously been written.
    $existing_module_path = $this->getExistingModule();

    $form['code'] = array(
      '#type' => 'vertical_tabs',
    );

    // Why can't these be nested under the vertical_tabs element?
    $form['files']['#tree'] = TRUE;

    foreach ($files as $filename => $code) {
      $form['files'][$filename] = array(
        '#type' => 'details',
        '#title' => $filename,
        '#group' => 'code',
      );

      $title = t('@filename code', [
        '@filename' => $filename,
      ]);
      if (file_exists($existing_module_path . '/' . $filename)) {
        $title .= ' ' . t("(File already exists)");
      }

      $form['files'][$filename]['module_code_'  . $filename] = array(
        '#type' => 'textarea',
        '#title' => $title,
        '#rows' => count(explode("\n", $code)),
        '#default_value' => $code,
        '#prefix' => '<div class="module-code">',
        '#suffix' => '</div>',
      );
    }

    return $form;
  }

  /**
   * {@inheritdoc}
   */
  protected function actions(array $form, FormStateInterface $form_state) {
    $actions = [];

    if (count(Element::children($form['files']))) {
      $actions['write'] = array(
        '#type' => 'submit',
        '#value' => $this->t('Write files'),
        '#submit' => array('::write'),
      );
    }

    return $actions;
  }

  /**
   * Returns the path to the module if it has previously been written.
   *
   * @return
   *  A Drupal-relative path to the module folder.
   */
  protected function getExistingModule() {
    $module_name = $this->entity->id();

    if (\Drupal::moduleHandler()->moduleExists($module_name)) {
      return drupal_get_path('module', $module_name);
    }

    if (file_exists('modules/custom/' . $module_name)) {
      return 'modules/custom/' . $module_name;
    }

    if (file_exists('modules/' . $module_name)) {
      return 'modules/' . $module_name;
    }
  }

  /**
   * Submit callback to write the module files.
   */
  public function write(array $form, FormStateInterface $form_state) {
    $values = $form_state->getValues();

    $module_name = $this->entity->id();

    if (file_exists('modules/custom')) {
      $modules_dir = 'modules/custom';
    }
    else {
      $modules_dir = 'modules';
    }

    $drupal_relative_module_dir = $modules_dir . '/' . $module_name;

    file_prepare_directory($path, FILE_CREATE_DIRECTORY);

    foreach ($values['files'] as $module_relative_filepath => $file_contents) {
      // The files are keyed by a filepath relative to the future module folder,
      // e.g. src/Plugins/Block/Foo.php.
      // Extract the directory.
      $module_relative_dir = dirname($module_relative_filepath);
      $filename = basename($module_relative_filepath);

      $drupal_relative_dir      = $drupal_relative_module_dir . '/' . $module_relative_dir;
      $drupal_relative_filepath = $drupal_relative_module_dir . '/' . $module_relative_filepath;
      file_prepare_directory($drupal_relative_dir, FILE_CREATE_DIRECTORY);

      file_put_contents($drupal_relative_filepath, $file_contents);
    }

    drupal_set_message(t("Written @count files to folder @folder.", [
      '@count'  => count($values['files']),
      '@folder' => $drupal_relative_module_dir,
    ]));
  }

}
