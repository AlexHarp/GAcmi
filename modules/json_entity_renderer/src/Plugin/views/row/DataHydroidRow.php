<?php

namespace Drupal\json_entity_renderer\Plugin\views\row;

use Drupal\Core\Form\FormStateInterface;
use Drupal\views\ViewExecutable;
use Drupal\views\Plugin\views\display\DisplayPluginBase;
use Drupal\Core\Entity\EntityManagerInterface;
use Drupal\Core\Language\LanguageManagerInterface;
use Drupal\views\Entity\Render\EntityTranslationRenderTrait;
use Drupal\views\Plugin\views\row\RowPluginBase;
use Symfony\Component\DependencyInjection\ContainerInterface;

/**
 * Plugin which displays entities for Hydroid.
 *
 * @ingroup views_row_plugins
 *
 * @ViewsRow(
 *   id = "data_hydroid",
 *   title = @Translation("Hydroid Entities"),
 *   help = @Translation("Use entites as row data."),
 *   display_types = {"data"}
 * )
 */
class DataHydroidRow extends RowPluginBase {
  use EntityTranslationRenderTrait;
  
  /**
   * {@inheritdoc}
   */
  protected $usesFields = FALSE;

  /**
   * Stores an array of prepared field aliases from options.
   *
   * @var array
   */
  protected $replacementAliases = [];

  /**
   * Stores an array of options to determine if the raw field output is used.
   *
   * @var array
   */
  protected $rawOutputOptions = [];

  protected $custFieldOptions = [];
  /**
   * {@inheritdoc}
   */
  protected $usesOptions = TRUE;
	
  /**
   * Contains the entity type of this row plugin instance.
   *
   * @var \Drupal\Core\Entity\EntityTypeInterface
   */
  protected $entityType;

  /**
   * The entity manager.
   *
   * @var \Drupal\Core\Entity\EntityManagerInterface
   */
  public $entityManager;

  /**
   * The language manager.
   *
   * @var \Drupal\Core\Language\LanguageManagerInterface
   */
  protected $languageManager;

  /**
   * {@inheritdoc}
   *
   * @param \Drupal\Core\Entity\EntityManagerInterface $entity_manager
   *   The entity manager.
   * @param \Drupal\Core\Language\LanguageManagerInterface $language_manager
   *   The language manager.
   */
  public function __construct(array $configuration, $plugin_id, $plugin_definition, EntityManagerInterface $entity_manager, LanguageManagerInterface $language_manager) {
    parent::__construct($configuration, $plugin_id, $plugin_definition);

    $this->entityManager = $entity_manager;
    $this->languageManager = $language_manager;
  }

  /**
   * {@inheritdoc}
   */
  public static function create(ContainerInterface $container, array $configuration, $plugin_id, $plugin_definition) {
    return new static($configuration, $plugin_id, $plugin_definition, $container->get('entity.manager'), $container->get('language_manager'));
  }
   /**
   * {@inheritdoc}
   */
  public function init(ViewExecutable $view, DisplayPluginBase $display, array &$options = NULL) {
    parent::init($view, $display, $options);
/*$varDat = get_class_vars(get_class($this));
foreach($varDat as $varTit => $varTitle){
 // dpm($varTit, "variable title");
}*/
//dpm(get_defined_vars(), "defined vars");
//dpm($types, "type data");
//dpm($this->display, "display data");
dpm($this->options, "options data");
//dpm($options);
 //   if (!empty($this->options['hydroid_options'])) {
      $options = (array) $this->options['hydroid_options'];
      // Prepare a trimmed version of replacement aliases.
      $this->replacementAliases = static::extractFromOptionsArray('rootType', $options);
      dpm($this->replacementAliases, "aliases");
      dpm($options, "post options");
//    this->replacementAliases = array_filter(array_map('trim', $aliases));
      // Pre pare an array of raw output field options.
     // $this->rawOutputOptions = static::extractFromOptionsArray('raw_output', $options);
   // }
  }

  /**
   * {@inheritdoc}
   */
  protected function defineOptions() {
    $options = parent::defineOptions();
    $options['hydroid_options'] = ['default' => []];

    return $options;
  }

  /**
   * {@inheritdoc}
   */
  public function buildOptionsForm(&$form, FormStateInterface $form_state) {
    parent::buildOptionsForm($form, $form_state);

/*$varDat = get_defined_vars();
foreach($GLOBALS["GLOBALS"] as $varTit => $varTitle){
  dpm($GLOBALS, "variable title3");
}*/
//$varDat = get_class_vars(get_class($this));
//foreach($varDat as $varTit => $varTitle){
 // dpm($varTit, "variable title");
//}
//dpm($this->view);//for each it1
dpm("we are building the form");
    $form['hydroid_options'] = [
      '#type' => 'table',
      '#header' => [$this->t('Root node')],/* $this->t('Alias')],*/
      '#empty' => $this->t('You have no fields. Add some to your view.'),
      '#tree' => TRUE,
    ];

    $options = $this->options['hydroid_options'];

    /*if ($fields = $this->view->display_handler->getOption('fields')) {
      foreach ($fields as $id => $field) {
        // Don't show the field if it has been excluded.
        if (!empty($field['exclude'])) {
          continue;
        }
        i/*$form['field_options'][$id]['field'] = [
          '#markup' => $id,
        ];*/	
        $form['hydroid_options']['rootType'] = [
          '#title' => $this->t('Content type to treat as root'),
          '#title_display' => 'invisible',
          '#type' => 'select',
	  '#options' => node_type_get_names(),
	  //'#default_value' => isset($options[$id]['aliasqf']) ? $options[$id]['aliasqf'] : '',
	  '#multiple' => 'FALSE',
	  '#size' => '0',
        ];
        /*$form['field_options'][$id]['raw_output'] = [
          '#title' => $this->t('Raw output for @id', ['@id' => $id]),
          '#title_display' => 'invisible',
          '#type' => 'checkbox',
          '#default_value' => isset($options[$id]['raw_output']) ? $options[$id]['raw_output'] : '',
        ];*/
      //}
    
  }
  public function getRootType(){
    return $this->options;
  }
  /**
   * {@inheritdoc}
   */
  public function render($row) {
    return $this->getEntityTranslation($row->_entity, $row);
  }

  /**
   * {@inheritdoc}
   */
  public function getEntityTypeId() {
    return $this->view->getBaseEntityType()->id();
  }

  /**
   * {@inheritdoc}
   */
  protected function getEntityManager() {
    return $this->entityManager;
  }

  /**
   * {@inheritdoc}
   */
  protected function getLanguageManager() {
    return $this->languageManager;
  }

  /**
   * {@inheritdoc}
   */
  protected function getView() {
    return $this->view;
  }

  /**
   * {@inheritdoc}
   */
  public function query() {
    parent::query();
    $this->getEntityTranslationRenderer()->query($this->view->getQuery());
  }

  
  /**
   * Extracts a set of option values from a nested options array.
   *
   * @param string $key
   *   The key to extract from each array item.
   * @param array $options
   *   The options array to return values from.
   *
   * @return array
   *   A regular one dimensional array of values.
   */
  protected static function extractFromOptionsArray($key, $options) {
    return array_map(function($item) use ($key) {
      return isset($item[$key]) ? $item[$key] : NULL;
    }, $options);
  }

}
