<?php

/* themes/bootstrap/templates/bootstrap/bootstrap-dropdown.html.twig */
class __TwigTemplate_172bb4a6878690f9b20535c2171ff0bb2674caf933386533e9febc68b47bceeb extends Twig_Template
{
    public function __construct(Twig_Environment $env)
    {
        parent::__construct($env);

        $this->parent = false;

        $this->blocks = array(
        );
    }

    protected function doDisplay(array $context, array $blocks = array())
    {
        $tags = array("set" => 17);
        $filters = array("clean_class" => 19);
        $functions = array();

        try {
            $this->env->getExtension('sandbox')->checkSecurity(
                array('set'),
                array('clean_class'),
                array()
            );
        } catch (Twig_Sandbox_SecurityError $e) {
            $e->setTemplateFile($this->getTemplateName());

            if ($e instanceof Twig_Sandbox_SecurityNotAllowedTagError && isset($tags[$e->getTagName()])) {
                $e->setTemplateLine($tags[$e->getTagName()]);
            } elseif ($e instanceof Twig_Sandbox_SecurityNotAllowedFilterError && isset($filters[$e->getFilterName()])) {
                $e->setTemplateLine($filters[$e->getFilterName()]);
            } elseif ($e instanceof Twig_Sandbox_SecurityNotAllowedFunctionError && isset($functions[$e->getFunctionName()])) {
                $e->setTemplateLine($functions[$e->getFunctionName()]);
            }

            throw $e;
        }

        // line 17
        $context["classes"] = array(0 => "btn-group", 1 => ((        // line 19
(isset($context["alignment"]) ? $context["alignment"] : null)) ? (("drop" . \Drupal\Component\Utility\Html::getClass((isset($context["alignment"]) ? $context["alignment"] : null)))) : ("dropdown")));
        // line 22
        echo "<div";
        echo $this->env->getExtension('sandbox')->ensureToStringAllowed($this->env->getExtension('drupal_core')->escapeFilter($this->env, $this->getAttribute((isset($context["attributes"]) ? $context["attributes"] : null), "addClass", array(0 => (isset($context["classes"]) ? $context["classes"] : null)), "method"), "html", null, true));
        echo ">
  ";
        // line 23
        echo $this->env->getExtension('sandbox')->ensureToStringAllowed($this->env->getExtension('drupal_core')->escapeFilter($this->env, (isset($context["toggle"]) ? $context["toggle"] : null), "html", null, true));
        echo "
  ";
        // line 24
        echo $this->env->getExtension('sandbox')->ensureToStringAllowed($this->env->getExtension('drupal_core')->escapeFilter($this->env, (isset($context["items"]) ? $context["items"] : null), "html", null, true));
        echo "
</div>
";
    }

    public function getTemplateName()
    {
        return "themes/bootstrap/templates/bootstrap/bootstrap-dropdown.html.twig";
    }

    public function isTraitable()
    {
        return false;
    }

    public function getDebugInfo()
    {
        return array (  55 => 24,  51 => 23,  46 => 22,  44 => 19,  43 => 17,);
    }

    public function getSource()
    {
        return "{#
/**
 * @file
 * Default theme implementation to display a Bootstrap Dropdown component.
 *
 * Available variables:
 * - alignment: (optional) The alignment of the dropdown menu.
 * - attributes: An array of HTML attributes intended to be added to the main
 *   container tag of this template.
 * - items: The dropdown menu items.
 * - toggle: The toggle element.
 *
 * @ingroup templates
 */
#}
{%
  set classes = [
    'btn-group',
    alignment ? 'drop' ~ alignment|clean_class : 'dropdown',
  ]
%}
<div{{ attributes.addClass(classes) }}>
  {{ toggle }}
  {{ items }}
</div>
";
    }
}
