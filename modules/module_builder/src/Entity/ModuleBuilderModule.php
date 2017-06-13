<?php

namespace Drupal\module_builder\Entity;

use Drupal\Core\Config\Entity\ConfigEntityBase;
//use Drupal\module_builder\module_builderInterface;
/*
Drupal\module_builder\Controller\ModuleBuilderComponentListBuilder",
*/


/**
 * Defines the module_builder entity.
 *
 * @ConfigEntityType(
 *   id = "module_builder_module",
 *   label = @Translation("Module"),
 *   handlers = {
 *     "list_builder" = "Drupal\module_builder\ModuleBuilderComponentListBuilder",
 *     "form" = {
 *       "default" = "Drupal\module_builder\Form\ModuleBuilderModuleNameForm",
 *       "add" = "Drupal\module_builder\Form\ModuleBuilderModuleNameForm",
 *       "edit" = "Drupal\module_builder\Form\ModuleBuilderModuleNameForm",
 *       "hooks" = "Drupal\module_builder\Form\ModuleBuilderModuleHooksForm",
 *       "plugins" = "Drupal\module_builder\Form\ModuleBuilderModulePluginsForm",
 *       "misc" = "Drupal\module_builder\Form\ModuleBuilderModuleMiscForm",
 *       "generate" = "Drupal\module_builder\Form\ModuleBuilderComponentGenerateForm",
 *       "delete" = "Drupal\Core\Entity\EntityDeleteForm",
 *     }
 *   },
 *   config_prefix = "component",
 *   admin_permission = "create modules",
 *   entity_keys = {
 *     "id" = "id",
 *     "label" = "name",
 *   },
 *   links = {
 *     "edit-form" = "/admin/config/development/module_builder/{module_builder_module}",
 *     "hooks-form" = "/admin/config/development/module_builder/{module_builder_module}/hooks",
 *     "plugins-form" = "/admin/config/development/module_builder/{module_builder_module}/plugins",
 *     "misc-form" = "/admin/config/development/module_builder/{module_builder_module}/misc",
 *     "generate-form" = "/admin/config/development/module_builder/{module_builder_module}/generate",
 *     "delete-form" = "/admin/config/development/module_builder/{module_builder_module}/delete",
 *     "collection" = "/admin/config/development/module_builder",
 *   }
 * )
 */
class ModuleBuilderModule extends ConfigEntityBase {

  /**
   * The module_builder ID.
   *
   * @var string
   */
  public $id;

  /**
   * The module_builder label.
   *
   * @var string
   */
  public $label;

  // Your specific configuration property get/set methods go here,
  // implementing the interface.
}
