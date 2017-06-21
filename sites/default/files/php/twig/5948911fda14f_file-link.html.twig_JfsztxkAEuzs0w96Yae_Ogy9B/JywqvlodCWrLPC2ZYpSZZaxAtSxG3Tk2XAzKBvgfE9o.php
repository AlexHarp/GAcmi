<?php

/* themes/bootstrap/templates/file/file-link.html.twig */
class __TwigTemplate_7dfb9ff97ff65da28ba21473d6c17593fd11038832df49f73a1d8cd52f34b1c5 extends Twig_Template
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
        $tags = array("spaceless" => 18, "set" => 20, "if" => 26);
        $filters = array("clean_class" => 22);
        $functions = array();

        try {
            $this->env->getExtension('sandbox')->checkSecurity(
                array('spaceless', 'set', 'if'),
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

        // line 18
        ob_start();
        // line 19
        echo "  ";
        // line 20
        $context["classes"] = array(0 => ((        // line 21
(isset($context["icon_only"]) ? $context["icon_only"] : null)) ? ("icon-only") : ("")), 1 => (( !        // line 22
(isset($context["icon_only"]) ? $context["icon_only"] : null)) ? (("icon-" . \Drupal\Component\Utility\Html::getClass((isset($context["icon_position"]) ? $context["icon_position"] : null)))) : ("")));
        // line 25
        echo "  <span";
        echo $this->env->getExtension('sandbox')->ensureToStringAllowed($this->env->getExtension('drupal_core')->escapeFilter($this->env, $this->getAttribute((isset($context["attributes"]) ? $context["attributes"] : null), "addClass", array(0 => (isset($context["classes"]) ? $context["classes"] : null)), "method"), "html", null, true));
        echo ">
    ";
        // line 26
        if ((isset($context["icon_only"]) ? $context["icon_only"] : null)) {
            // line 27
            echo "      <span class=\"file-icon\">";
            echo $this->env->getExtension('sandbox')->ensureToStringAllowed($this->env->getExtension('drupal_core')->escapeFilter($this->env, (isset($context["icon"]) ? $context["icon"] : null), "html", null, true));
            echo "</span>
      <span class=\"sr-only\">
        <span class=\"file-link\">";
            // line 29
            echo $this->env->getExtension('sandbox')->ensureToStringAllowed($this->env->getExtension('drupal_core')->escapeFilter($this->env, (isset($context["link"]) ? $context["link"] : null), "html", null, true));
            echo "</span>
        <span class=\"file-size\">";
            // line 30
            echo $this->env->getExtension('sandbox')->ensureToStringAllowed($this->env->getExtension('drupal_core')->escapeFilter($this->env, (isset($context["file_size"]) ? $context["file_size"] : null), "html", null, true));
            echo "</span>
      </span>
    ";
        } else {
            // line 33
            echo "      ";
            if (((isset($context["icon_position"]) ? $context["icon_position"] : null) == "after")) {
                // line 34
                echo "        <span class=\"file-link\">";
                echo $this->env->getExtension('sandbox')->ensureToStringAllowed($this->env->getExtension('drupal_core')->escapeFilter($this->env, (isset($context["link"]) ? $context["link"] : null), "html", null, true));
                echo "</span><span class=\"file-size\">";
                echo $this->env->getExtension('sandbox')->ensureToStringAllowed($this->env->getExtension('drupal_core')->escapeFilter($this->env, (isset($context["file_size"]) ? $context["file_size"] : null), "html", null, true));
                echo "</span><span class=\"file-icon\">";
                echo $this->env->getExtension('sandbox')->ensureToStringAllowed($this->env->getExtension('drupal_core')->escapeFilter($this->env, (isset($context["icon"]) ? $context["icon"] : null), "html", null, true));
                echo "</span>
      ";
            } else {
                // line 36
                echo "        <span class=\"file-icon\">";
                echo $this->env->getExtension('sandbox')->ensureToStringAllowed($this->env->getExtension('drupal_core')->escapeFilter($this->env, (isset($context["icon"]) ? $context["icon"] : null), "html", null, true));
                echo "</span><span class=\"file-link\">";
                echo $this->env->getExtension('sandbox')->ensureToStringAllowed($this->env->getExtension('drupal_core')->escapeFilter($this->env, (isset($context["link"]) ? $context["link"] : null), "html", null, true));
                echo "</span><span class=\"file-size\">";
                echo $this->env->getExtension('sandbox')->ensureToStringAllowed($this->env->getExtension('drupal_core')->escapeFilter($this->env, (isset($context["file_size"]) ? $context["file_size"] : null), "html", null, true));
                echo "</span>
      ";
            }
            // line 38
            echo "    ";
        }
        // line 39
        echo "  </span>
";
        echo trim(preg_replace('/>\s+</', '><', ob_get_clean()));
    }

    public function getTemplateName()
    {
        return "themes/bootstrap/templates/file/file-link.html.twig";
    }

    public function isTraitable()
    {
        return false;
    }

    public function getDebugInfo()
    {
        return array (  100 => 39,  97 => 38,  87 => 36,  77 => 34,  74 => 33,  68 => 30,  64 => 29,  58 => 27,  56 => 26,  51 => 25,  49 => 22,  48 => 21,  47 => 20,  45 => 19,  43 => 18,);
    }

    public function getSource()
    {
        return "{#
/**
 * @file
 * Theme override for a link to a file.
 *
 * Available variables:
 * - attributes: The HTML attributes for the containing element.
 * - link: A link to the file.
 * - icon: An icon.
 * - icon_only: Flag to display only the icon and not the label.
 * - icon_position: Where an icon should be displayed.
 *
 * @ingroup templates
 *
 * @see \\Drupal\\bootstrap\\Plugin\\Preprocess\\FileLink::preprocessVariables
 */
#}
{% spaceless %}
  {%
    set classes = [
      icon_only ? 'icon-only',
      not icon_only ? 'icon-' ~ icon_position|clean_class
    ]
  %}
  <span{{ attributes.addClass(classes) }}>
    {% if icon_only %}
      <span class=\"file-icon\">{{ icon }}</span>
      <span class=\"sr-only\">
        <span class=\"file-link\">{{ link }}</span>
        <span class=\"file-size\">{{ file_size }}</span>
      </span>
    {% else %}
      {% if icon_position == 'after' %}
        <span class=\"file-link\">{{ link }}</span><span class=\"file-size\">{{ file_size }}</span><span class=\"file-icon\">{{ icon }}</span>
      {% else %}
        <span class=\"file-icon\">{{ icon }}</span><span class=\"file-link\">{{ link }}</span><span class=\"file-size\">{{ file_size }}</span>
      {% endif %}
    {% endif %}
  </span>
{% endspaceless %}
";
    }
}
