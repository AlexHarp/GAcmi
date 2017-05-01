<?php

/* core/modules/layout_discovery/layouts/onecol/layout--onecol.html.twig */
class __TwigTemplate_e67c4deece3b00cb31efb2807066e95e1695c8c06ec1c6e9f3e1918a9ae2f819 extends Twig_Template
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
        $tags = array("set" => 14, "if" => 18);
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

        // line 14
        $context["classes"] = array(0 => "layout--onecol");
        // line 18
        if ((isset($context["content"]) ? $context["content"] : null)) {
            // line 19
            echo "<div";
            echo $this->env->getExtension('sandbox')->ensureToStringAllowed($this->env->getExtension('drupal_core')->escapeFilter($this->env, $this->getAttribute((isset($context["attributes"]) ? $context["attributes"] : null), "addClass", array(0 => (isset($context["classes"]) ? $context["classes"] : null)), "method"), "html", null, true));
            echo ">
  <div class=\"layout-region layout-region--content\">
    ";
            // line 21
            echo $this->env->getExtension('sandbox')->ensureToStringAllowed($this->env->getExtension('drupal_core')->escapeFilter($this->env, $this->getAttribute((isset($context["content"]) ? $context["content"] : null), "content", array()), "html", null, true));
            echo "
  </div>
</div>
";
        }
    }

    public function getTemplateName()
    {
        return "core/modules/layout_discovery/layouts/onecol/layout--onecol.html.twig";
    }

    public function isTraitable()
    {
        return false;
    }

    public function getDebugInfo()
    {
        return array (  53 => 21,  47 => 19,  45 => 18,  43 => 14,);
    }

    public function getSource()
    {
        return "{#
/**
 * @file
 * Default theme implementation to display a one-column layout.
 *
 * Available variables:
 * - content: The content for this layout.
 * - attributes: HTML attributes for the layout <div>.
 *
 * @ingroup themeable
 */
#}
{%
set classes = [
'layout--onecol',
]
%}
{% if content %}
<div{{ attributes.addClass(classes) }}>
  <div class=\"layout-region layout-region--content\">
    {{ content.content }}
  </div>
</div>
{% endif %}
";
    }
}
