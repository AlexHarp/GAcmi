<?php

namespace Drupal\module_builder\Form;

use Drupal\Core\Form\FormBase;
use Drupal\Core\Form\FormStateInterface;
use Drupal\module_builder\ExceptionHandler;
use DrupalCodeBuilder\Exception\SanityException;

/**
 * TODO  .
 */
class ProcessForm extends FormBase {

  /**
   * {@inheritdoc}
   */
  public function getFormId() {
    return 'module_builder_process';
  }

  /**
   * {@inheritdoc}
   */
  public function buildForm(array $form, FormStateInterface $form_state) {
    \Drupal\module_builder\LibraryWrapper::loadLibrary();

    try {
      $mb_task_handler_report = \DrupalCodeBuilder\Factory::getTask('ReportHookDataFolder');
    }
    catch (SanityException $e) {
      ExceptionHandler::handleSanityException($e);
      return $form;
    }

    // The task handler returns sane values for these even if there's no hook
    // data.
    $last_update = $mb_task_handler_report->lastUpdatedDate();
    $directory = \DrupalCodeBuilder\Factory::getEnvironment()->getHooksDirectory();

    $form['intro'] = array(
      '#markup' => '<p>' . t("Module builder analyses your current code to find data about Drupal components such as hooks and plugins. This processed data is stored in your local filesystem.") . '</p>',
    );

    $form['last_update'] = array(
      '#markup' => '<p>' . (
        $last_update ?
          t('Your last data update was %date.', array(
            '%date' => format_date($last_update, 'large'),
          )) :
          t('The hook documentation has not yet been downloaded.')
        ) . '</p>',
    );

    if ($last_update) {
      $form['text'] = array(
        '#markup' => '<p>' . t('You have the following data saved in %dir: ', array(
          '%dir' => $directory,
        )) . '</p>',
      );

      $hook_files = $mb_task_handler_report->listHookFiles();
      $form['hooks'] = [
        '#type' => 'details',
        '#title' => t("Hooks definition files"),
        '#open' => TRUE,
      ];
      $form['hooks']['files'] = [
        '#theme' => 'item_list',
        '#items' => $hook_files,
      ];

      $task_handler_plugin = \DrupalCodeBuilder\Factory::getTask('ReportPluginData');
      $plugin_data = $task_handler_plugin->listPluginNamesOptions();
      $form['plugins'] = [
        '#type' => 'details',
        '#title' => t("Plugin definitions"),
        '#open' => TRUE,
      ];
      $items = [];
      foreach ($plugin_data as $id => $label) {
        $items[] = $id;
      }
      $form['plugins']['items'] = [
        '#theme' => 'item_list',
        '#items' => $items,
      ];

      $task_handler_services = \DrupalCodeBuilder\Factory::getTask('ReportServiceData');
      $service_data = $task_handler_services->listServiceNamesOptions();
      $form['services'] = [
        '#type' => 'details',
        '#title' => t("Service definitions"),
        '#open' => TRUE,
      ];
      $items = [];
      foreach ($service_data as $id => $info) {
        $items[] = $id;
      }
      $form['services']['items'] = [
        '#theme' => 'item_list',
        '#items' => $items,
      ];
    }

    $form['submit'] = array(
      '#type' => 'submit',
      '#value' => t('Update data'),
    );

    return $form;
  }

  /**
   * {@inheritdoc}
   */
  public function submitForm(array &$form, FormStateInterface $form_state) {
    \Drupal\module_builder\LibraryWrapper::loadLibrary();

    // Safe to do this without exception handling: it's already been checked in
    // the form builder.
    $mb_task_handler_collect = \DrupalCodeBuilder\Factory::getTask('Collect');
    $mb_task_handler_collect->collectComponentData();
  }

}