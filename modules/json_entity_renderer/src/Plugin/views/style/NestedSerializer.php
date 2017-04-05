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
    private function expand(&$nodeMap, $expandId){
      //dpm($expandId, "entered expand ID");
      $retStr = "";
      $expandCount = 0;
      foreach($nodeMap[$expandId] as &$row){
	if(preg_match('/%&\d+%&$/', $row)){
	   $row = substr($row, 2);
	   //dpm($row, "row");
	   $nid = sscanf($row, "%d");
	   //dpm($nid);
           if($expandCount > 0) //add comment if an expand is before it
	     $row = ",";
           else
	     $row = "";
	   $row .= rtrim($this->expand($nodeMap, $nid[0]),","); //if single expand we need to kill the tail comma of te node
	   $expandCount++;
           //dpm($row, "Row after:");
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
        // Add separator definition so Microsoft Word would know how to open the csv
        // file.
        $render = preg_replace(array('/\":\"\[/'), '":[', $render); //start of array
        if($debugflag){
          $render = preg_replace(array('/\}\]\",/'), '}],' . "\n", $render); //end of sub array }]", -> }],
        }else{
          $render = preg_replace(array('/\}\]\",/'), '}],', $render); //end of sub array }]", -> }],
        }
        $render = preg_replace(array('/\]\"\},/'), ']},', $render); //end of root array ]"}, -> ]},
        //$render = preg_replace(array("/\Q\u0022\E/"), '"', $render); // stringified " marks
        //dpm("alex we reached here");
        //$renderSplits = preg_split('/(\{\"target_id\":\d+?,\"target_type\":\"node\".*?\"\})/', $render, -1, PREG_SPLIT_DELIM_CAPTURE);
        $renderSplits = preg_split('/(\{\"target_id\":\d+?,\"target_type\":\"node\".*?\"\}|\{\"nid\":\[\{"value\":\d+\})/', $render, -1, PREG_SPLIT_DELIM_CAPTURE);
        //$renderSplits = preg_split(array('/":\[\{"tattttrget_id":\d+?,"target_type":"node".*?"\}\]/'), $render, -1);
        $retStr = "";
        //dpm("upate");
        //dpm(sizeof($renderSplits), "size of");
        //dpm($renderSplits, "render splits");
        //dpm("(\":\[\{\"target_id\":\d+?,\"target_type\":\"node\".*?\"\}\])");
//Build node map
	$nodeMap = array();
	$nodeStartIndex = -1;
	$currNode = "";
	$nodeContents = array();
	for($c = 1; $c < sizeof($renderSplits); $c++){
          //dpm($renderSplits[$c], "split");
          //dpm(strncmp($renderSplits[$c], "{\"target_id\":", 13), "strcmp");
          if(!strncmp($renderSplits[$c], "{\"target_id\":", 13)){
            //dpm("in loop");
            //dpm($split, "loop split");
            $nid = sscanf($renderSplits[$c], "{\"target_id\":%d");
	    $nid[0] = "%&" . $nid[0] . "%&";
            //dpm($nid, "nid");
            $renderSplits[$c] = $nid[0];
          }  
	  if(!strncmp($renderSplits[$c], "{\"nid\":[{\"value\":", 17)){
//dpm($renderSplits[$c], "strcmp nid");
 	    if($nodeStartIndex == -1){
	      $currNode = sscanf($renderSplits[$c], "{\"nid\":[{\"value\":%d");
              $nodeContents[] = $renderSplits[$c];
	      $nodeStartIndex = 1; //[1] as [0]m == {
//dpm($currNode, "init nid");
	    } else {
//$dpm($currNode, "currNode");
//$dpm($nodeContents, "node str mapping");
	      $nodeMap[$currNode[0]] = $nodeContents;
	      $currNode = sscanf($renderSplits[$c], "{\"nid\":[{\"value\":%d");
	      $nodeContents = array();
              $nodeContents[] = $renderSplits[$c];
//wont find last node
	    }
	  } else {
            $nodeContents[] = $renderSplits[$c];
	  }
          $retStr .= "\n\n\n\n".$renderSplits[$c];
        }
//	dpm($nodeMap["
	//dpm($nodeMap, "node map");
//expand nodes
	//do this better
	$retStr = "[";
	foreach($nodeMap as &$node){
	  $expandNid = sscanf($node[0], "{\"nid\":[{\"value\":%d");
	  $retStr .= $this->expand($nodeMap, $expandNid[0]);
	}
        //******** debug
        if($debugflag){
          $render = preg_replace(array('/,\{\"title\"/'), "\n\n" . '{"title"', $render); // stringified " marks
          $render = preg_replace(array('/\[\{\"nid\"/'), "\n" . '[{"nid"', $render); //hydroid1 spacing
          $render = preg_replace(array('/\{\"nid\"/'), "\n\n" . '{"nid"', $render); //hydroid2 spacing
          $render = preg_replace(array('/,\"/'), ",\n\"", $render); //hydroid2 spacing
        }
        dpm($oldRender, "older Render");
	$retStr = rtrim($retStr,", ");
	$retStr .= "]";
        return $retStr;
    }
}
