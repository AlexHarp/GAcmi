<?php
/**
 * Created by PhpStorm.
 * User: Alexis
 * Date: 28/03/17
 * Time: 2:15 PM
 */

namespace Drupal\json_entity_renderer\Plugin\views\style;

use Drupal\rest\Plugin\views\style\Serializer;
use Drupal\views\Views;

/**
 * The style plugin for serialized output formats.
 *
 * @ingroup views_style_plugins
 *
 * @ViewsStyle(
 *   id = "nested_serializer",
 *   title = @Translation("Nested Serializer"),
 *   help = @Translation("Serializes views row data using the Custom Serializer component."),
 *   display_types = {"data"}
 * )
 */
class NestedSerializer extends Serializer
{
  protected $contextArg;
  
    public function query() {
      parent::query();
      $this->view->query->where = [];//remove the contextual filter so we can still grab all for recursion
    }

    public function preRender($result) {
      if (!empty($this->view->rowPlugin)) {
        $this->view->rowPlugin->preRender($result);
      }
    }
  
    private function expand(&$nodeMap, $expandId){
      $retStr = "";

      $expandCount = 0;
      foreach($nodeMap[$expandId] as &$row){
	if(preg_match('/%&\d+%&$/', $row)){
	   $row = substr($row, 2);
	   $nid = sscanf($row, "%d");
           if($expandCount > 0) //add comment if an expand is before it
	     $row = ",";
           else
	     $row = "";
	   $row .= $this->expand($nodeMap, $nid[0]); //if single expand we need to kill the tail comma of te node
	   $expandCount++;
	   $retStr .= $row;
   	} else {
	  $retStr .=$row;
	  $expandCount = 0;
	}
      }
      return $retStr;
    }

    /**
     * {@inheritdoc}
     */
    public function render() {
	$render = parent::render();
        $oldRender = $render;
        $debugflag = false;
        print_r($render);
        // Add separator definition so Microsoft Word would know how to open the csv
        // file.
        //$render = preg_replace(array('/\":\"\[/'), '":[', $render); //start of array
        if($debugflag){
          $render = preg_replace(array('/\}\]\",/'), '}],' . "\n", $render); //end of sub array }]", -> }],
        }else{
        //  $render = preg_replace(array('/\}\]\",/'), '}],', $render); //end of sub array }]", -> }],
        }
        //$render = preg_replace(array('/\]\"\},/'), ']},', $render); //end of root array ]"}, -> ]},
        //find all areas to expand and nod ids for indexing
        $renderSplits = preg_split('/(\<target_id\>\d+?\<\/target_id\>\<target_type>node\<\/target_type>.*?\<\/url>|\<nid\>\<value\>\d+\<\/value\>\<\/nid\>)/', $render, -1, PREG_SPLIT_DELIM_CAPTURE);
        $retStr = "";
//Build node map
	$nodeMap = array();
	$nodeStartIndex = -1;
	$currNode = "";
dpm("running");
	$nodeContents = array();
	for($c = 1; $c < sizeof($renderSplits); $c++){
          dpm($renderSplits[$c], "split");
          //dpm(strncmp($renderSplits[$c], "{\"target_id\":", 13), "strcmp");
          if(!strncmp($renderSplits[$c], "<target_id>", 11)){
            //dpm("in loop");
            //dpm($split, "loop split");
            $nid = sscanf($renderSplits[$c], "{<target_id\":%d");
	    $nid[0] = "%&" . $nid[0] . "%&";
            //dpm($nid, "nid");
            $renderSplits[$c] = $nid[0];
          }  
	  if(!strncmp($renderSplits[$c], "<nid><value>", 12)){
 	    if($nodeStartIndex == -1){
	      $currNode = sscanf($renderSplits[$c], "<nid><value>%d");
              $nodeContents[] = $renderSplits[$c];
	      $nodeStartIndex = 1; //[1] as [0]m == {
	    } else {
	      $nodeMap[$currNode[0]] = $nodeContents;
	      $currNode = sscanf($renderSplits[$c], "<nid><value>%d");
	      $nodeContents = array();
              $nodeContents[] = $renderSplits[$c];
//wont find last node ?? is this still a thing
	    }
	  } else {
            $nodeContents[] = $renderSplits[$c];
	  }
          $retStr .= "\n\n\n\n".$renderSplits[$c];
        }
//expand nodes
dpm($this->view->args[0], "json-arg");
	$retStr = "";
	foreach($nodeMap as &$node){
          if(preg_match('/\<type\>\<target_id\>(\w+)/', $node[1], $matches)){
	    if(!strcmp($matches[1], $this->view->rowPlugin->getRootType())){
	      $expandNid = sscanf($node[0], "<nid><value>%d");
	      if($this->view->args[0]){
	        if($this->view->args[0] == $expandNid[0])
		  $retStr .= $this->expand($nodeMap, $expandNid[0]);
              } else {
		$retStr .= $this->expand($nodeMap, $expandNid[0]);
              }
            }
          }
	}
        //******** debug
        if($debugflag){
          $render = preg_replace(array('/,\{\"title\"/'), "\n\n" . '{"title"', $render); // stringified " marks
          $render = preg_replace(array('/\[\{\"nid\"/'), "\n" . '[{"nid"', $render); //hydroid1 spacing
          $render = preg_replace(array('/\{\"nid\"/'), "\n\n" . '{"nid"', $render); //hydroid2 spacing
          $render = preg_replace(array('/,\"/'), ",\n\"", $render); //hydroid2 spacing
        }
//	$retStr = rtrim($retStr,", ");
//	$retStr .= "]";
        return $retStr;
    }
}
