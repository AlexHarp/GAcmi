<?php
/**
 * Created by PhpStorm.
 * User: shaun
 * Date: 28/03/17
 * Time: 2:15 PM
 */

namespace Drupal\my_test_module\Plugin\views\style;


use Drupal\rest\Plugin\views\style\Serializer;

/**
 * The style plugin for serialized output formats.
 *
 * @ingroup views_style_plugins
 *
 * @ViewsStyle(
 *   id = "cust_serializer",
 *   title = @Translation("Custom Serializer"),
 *   help = @Translation("Serializes views row data using the Custom Serializer component."),
 *   display_types = {"data"}
 * )
 */
class CustSerializer extends Serializer
{
    /**
     * {@inheritdoc}
     */
     public function render() {
        $render = parent::render();
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
        $render = preg_replace(array("/\Q\u0022\E/"), '"', $render); // stringified " marks
        //dpm("alex we reached here");
        $renderSplits = preg_split('/(\{\"target_id\":\d+?,\"target_type\":\"node\".*?\"\})/', $render, -1, PREG_SPLIT_DELIM_CAPTURE);
        //$renderSplits = preg_split(array('/":\[\{"tattttrget_id":\d+?,"target_type":"node".*?"\}\]/'), $render, -1);
        $retStr = "";
        //dpm("upate");
        dpm(sizeof($renderSplits));
        dpm($renderSplits);
        //dpm("(\":\[\{\"target_id\":\d+?,\"target_type\":\"node\".*?\"\}\])");
        foreach($renderSplits as &$split){
          dpm($split, "split");
          dpm(strncmp($split, "{\"target_id\":", 13), "strcmp");
          if(!strncmp($split, "{\"target_id\":", 13)){
            //dpm("in loop");
            //dpm($split, "loop split");
            $nid = sscanf($split, "{\"target_id\":%d");
            dpm($nid, "nid");

            /*$array = array($nid[0]);
            $view = views_get_view('hydroid_view2');
            $view->set_display("rest_export_1");
            $view->set_arguments($array);
            $view->pre_execute();
            $view->execute();
            $content = $view->render();
            $dpm($content, "content render");*/
            //$viewContent = views_embed_view('hydroid_view2','rest_export_1', $nid[0]);
            //dpm($viewContent, "view Content");rgs = [$tid];
  //$view = Views::getView('hydroid_view2');
  //if (is_object($view)) {
  //dpm($view, "marker");
  /* $view->setArguments($nid);
    $view->setDisplay('rest_export_1');
    $view->preExecute();
    $view->execute();
    $dpm($view);
    */ //$content = $view->buildRenderable("rest_export_1", $nid);
    //dpm($content, "Content");
 // } return "done"; //print_r($content, true);
            $split = $nid[0];
          }
          $retStr .= "\n\n\n\n".$split;
        }//$render = "serp=,\r\n" . $render;
        //******** debug
        if($debugflag){
          $render = preg_replace(array('/,\{\"title\"/'), "\n\n" . '{"title"', $render); // stringified " marks
          $render = preg_replace(array('/\[\{\"nid\"/'), "\n" . '[{"nid"', $render); //hydroid1 spacing
          $render = preg_replace(array('/\{\"nid\"/'), "\n\n" . '{"nid"', $render); //hydroid2 spacing
          $render = preg_replace(array('/,\"/'), ",\n\"", $render); //hydroid2 spacing
        }
        return $retStr;
    }


}
