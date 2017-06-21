<?php

/* themes/GATheme/templates/page-title.html.twig */
class __TwigTemplate_502876d02fef886d62371f773ec936eb93dfd2070455e37b038d8eaaed0def7b extends Twig_Template
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
        $tags = array("if" => 19);
        $filters = array("render" => 19, "length" => 20, "slice" => 20);
        $functions = array();

        try {
            $this->env->getExtension('sandbox')->checkSecurity(
                array('if'),
                array('render', 'length', 'slice'),
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
        if ($this->env->getExtension('drupal_core')->renderVar((isset($context["title"]) ? $context["title"] : null))) {
            // line 20
            echo "    ";
            if ((((twig_length_filter($this->env, (isset($context["title"]) ? $context["title"] : null)) > 5)) ? ((twig_slice($this->env, (isset($context["title"]) ? $context["title"] : null), 0, 6) == "Search")) : (""))) {
                // line 21
                echo "
    ";
            } else {
                // line 23
                echo "        <h1";
                echo $this->env->getExtension('sandbox')->ensureToStringAllowed($this->env->getExtension('drupal_core')->escapeFilter($this->env, $this->getAttribute((isset($context["title_attributes"]) ? $context["title_attributes"] : null), "addClass", array(0 => "page-header"), "method"), "html", null, true));
                echo ">";
                echo $this->env->getExtension('sandbox')->ensureToStringAllowed($this->env->getExtension('drupal_core')->escapeFilter($this->env, (isset($context["title"]) ? $context["title"] : null), "html", null, true));
                echo "</h1>
    ";
            }
        }
    }

    public function getTemplateName()
    {
        return "themes/GATheme/templates/page-title.html.twig";
    }

    public function isTraitable()
    {
        return false;
    }

    public function getDebugInfo()
    {
        return array (  52 => 23,  48 => 21,  45 => 20,  43 => 19,);
    }

    public function getSource()
    {
        return "{#
/**
 * @file
 * Default theme implementation for page titles.
 *
 * Available variables:
 * - title_attributes: HTML attributes for the page title element.
 * - title_prefix: Additional output populated by modules, intended to be
 *   displayed in front of the main title tag that appears in the template.
 * - title: The page title, for use in the actual content.
 * - title_suffix: Additional output populated by modules, intended to be
 *   displayed after the main title tag that appears in the template.
 *
 * @ingroup templates
 *
 * @see template_preprocess_page_title()
 */
#}
{% if title | render %}
    {% if title | length > 5 ? title | slice(0,6) == 'Search' %}

    {% else %}
        <h1{{ title_attributes.addClass('page-header') }}>{{ title }}</h1>
    {%  endif %}
{% endif %}
";
    }
}
