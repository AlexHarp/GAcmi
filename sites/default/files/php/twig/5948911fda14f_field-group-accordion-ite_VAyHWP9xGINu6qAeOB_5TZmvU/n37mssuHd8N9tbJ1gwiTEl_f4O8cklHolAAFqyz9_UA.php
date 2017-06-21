<?php

/* modules/field_group/templates/field-group-accordion-item.html.twig */
class __TwigTemplate_e811abe6fc8a8cac630a8d92421f1570c315907899d5cd6953f6b47baa0f3563 extends Twig_Template
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
        $tags = array("set" => 19, "if" => 37);
        $filters = array();
        $functions = array();

        try {
            $this->env->getExtension('sandbox')->checkSecurity(
                array('set', 'if'),
                array(),
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

        // line 19
        $context["label_classes"] = array(0 => "field-group-format-toggler", 1 => "accordion-item", 2 => ((        // line 22
(isset($context["open"]) ? $context["open"] : null)) ? ("field-group-accordion-active") : ("")));
        // line 26
        echo "
";
        // line 28
        $context["classes"] = array(0 => "field-group-format-wrapper");
        // line 32
        echo "
<h3 ";
        // line 33
        echo $this->env->getExtension('sandbox')->ensureToStringAllowed($this->env->getExtension('drupal_core')->escapeFilter($this->env, $this->getAttribute((isset($context["label_attributes"]) ? $context["label_attributes"] : null), "addClass", array(0 => (isset($context["label_classes"]) ? $context["label_classes"] : null)), "method"), "html", null, true));
        echo ">
  <a href=\"#\">";
        // line 34
        echo $this->env->getExtension('sandbox')->ensureToStringAllowed($this->env->getExtension('drupal_core')->escapeFilter($this->env, (isset($context["title"]) ? $context["title"] : null), "html", null, true));
        echo "</a>
</h3>
<div ";
        // line 36
        echo $this->env->getExtension('sandbox')->ensureToStringAllowed($this->env->getExtension('drupal_core')->escapeFilter($this->env, $this->getAttribute((isset($context["attributes"]) ? $context["attributes"] : null), "addClass", array(0 => (isset($context["classes"]) ? $context["classes"] : null)), "method"), "html", null, true));
        echo ">
  ";
        // line 37
        if ((isset($context["description"]) ? $context["description"] : null)) {
            echo "<div class=\"description\"></div>";
        }
        // line 38
        echo "  ";
        echo $this->env->getExtension('sandbox')->ensureToStringAllowed($this->env->getExtension('drupal_core')->escapeFilter($this->env, (isset($context["children"]) ? $context["children"] : null), "html", null, true));
        echo "
</div>";
    }

    public function getTemplateName()
    {
        return "modules/field_group/templates/field-group-accordion-item.html.twig";
    }

    public function isTraitable()
    {
        return false;
    }

    public function getDebugInfo()
    {
        return array (  71 => 38,  67 => 37,  63 => 36,  58 => 34,  54 => 33,  51 => 32,  49 => 28,  46 => 26,  44 => 22,  43 => 19,);
    }

    public function getSource()
    {
        return "{#
/**
 * @file
 * Default theme implementation for a fieldgroup accordion item.
 *
 * Available variables:
 * - title: Title of the group.
 * - children: The children of the group.
 * - label_attributes: A list of HTML attributes for the label.
 * - attributes: A list of HTML attributes for the group wrapper.
 *
 * @see template_preprocess_field_group_accordion()
 *
 * @ingroup themeable
 */
#}
{%

  set label_classes = [
    'field-group-format-toggler',
    'accordion-item',
    open ? 'field-group-accordion-active',
  ]

%}

{%
  set classes = [
    'field-group-format-wrapper',
  ]
%}

<h3 {{ label_attributes.addClass(label_classes) }}>
  <a href=\"#\">{{ title }}</a>
</h3>
<div {{ attributes.addClass(classes) }}>
  {% if description %}<div class=\"description\"></div>{% endif %}
  {{children}}
</div>";
    }
}
