<?php

/* themes/GATheme/templates/page.html.twig */
class __TwigTemplate_00c0995271092a8cfad3eeba0c4171a2c8859cf69a0c0bea0257b4a9eebd745a extends Twig_Template
{
    public function __construct(Twig_Environment $env)
    {
        parent::__construct($env);

        $this->parent = false;

        $this->blocks = array(
            'navbar' => array($this, 'block_navbar'),
            'main' => array($this, 'block_main'),
            'header' => array($this, 'block_header'),
            'sidebar_first' => array($this, 'block_sidebar_first'),
            'highlighted' => array($this, 'block_highlighted'),
            'breadcrumb' => array($this, 'block_breadcrumb'),
            'action_links' => array($this, 'block_action_links'),
            'help' => array($this, 'block_help'),
            'content' => array($this, 'block_content'),
            'sidebar_second' => array($this, 'block_sidebar_second'),
            'footer' => array($this, 'block_footer'),
        );
    }

    protected function doDisplay(array $context, array $blocks = array())
    {
        $tags = array("if" => 2, "block" => 3, "set" => 5);
        $filters = array("clean_class" => 8, "t" => 21);
        $functions = array();

        try {
            $this->env->getExtension('sandbox')->checkSecurity(
                array('if', 'block', 'set'),
                array('clean_class', 't'),
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

        // line 2
        if (($this->getAttribute((isset($context["page"]) ? $context["page"] : null), "navigation", array()) || $this->getAttribute((isset($context["page"]) ? $context["page"] : null), "navigation_collapsible", array()))) {
            // line 3
            echo "    ";
            $this->displayBlock('navbar', $context, $blocks);
        }
        // line 41
        echo "
<div class=\"strap-container\">
    <div class=\"col-md-12 col-xs-12\">
        <div class=\"strap-blue\">
        </div>
        <div class=\"strap-white\">
        </div>
        <div class=\"strap-red\">
        </div>
    </div>
</div>

";
        // line 54
        $this->displayBlock('main', $context, $blocks);
        // line 146
        echo "

";
        // line 148
        if ($this->getAttribute((isset($context["page"]) ? $context["page"] : null), "footer", array())) {
            // line 149
            echo "    ";
            $this->displayBlock('footer', $context, $blocks);
        }
        // line 178
        echo "

";
    }

    // line 3
    public function block_navbar($context, array $blocks = array())
    {
        // line 4
        echo "        ";
        // line 5
        $context["navbar_classes"] = array(0 => "navbar", 1 => (($this->getAttribute($this->getAttribute(        // line 7
(isset($context["theme"]) ? $context["theme"] : null), "settings", array()), "navbar_inverse", array())) ? ("navbar-inverse") : ("navbar-default")), 2 => (($this->getAttribute($this->getAttribute(        // line 8
(isset($context["theme"]) ? $context["theme"] : null), "settings", array()), "navbar_position", array())) ? (("navbar-" . \Drupal\Component\Utility\Html::getClass($this->getAttribute($this->getAttribute((isset($context["theme"]) ? $context["theme"] : null), "settings", array()), "navbar_position", array())))) : ((isset($context["container"]) ? $context["container"] : null))));
        // line 11
        echo "        <header";
        echo $this->env->getExtension('sandbox')->ensureToStringAllowed($this->env->getExtension('drupal_core')->escapeFilter($this->env, $this->getAttribute((isset($context["navbar_attributes"]) ? $context["navbar_attributes"] : null), "addClass", array(0 => (isset($context["navbar_classes"]) ? $context["navbar_classes"] : null)), "method"), "html", null, true));
        echo " id=\"navbar\" role=\"banner\">
            ";
        // line 12
        if ( !$this->getAttribute((isset($context["navbar_attributes"]) ? $context["navbar_attributes"] : null), "hasClass", array(0 => "container"), "method")) {
            // line 13
            echo "            <div class=\"container\">
                ";
        }
        // line 15
        echo "                <div class=\"navbar-header\">
                    ";
        // line 16
        echo $this->env->getExtension('sandbox')->ensureToStringAllowed($this->env->getExtension('drupal_core')->escapeFilter($this->env, $this->getAttribute((isset($context["page"]) ? $context["page"] : null), "navigation", array()), "html", null, true));
        echo "

                    ";
        // line 19
        echo "                    ";
        if ($this->getAttribute((isset($context["page"]) ? $context["page"] : null), "navigation_collapsible", array())) {
            // line 20
            echo "                        <button type=\"button\" class=\"navbar-toggle\" data-toggle=\"collapse\" data-target=\"#navbar-collapse\">
                            <span class=\"sr-only\">";
            // line 21
            echo $this->env->getExtension('sandbox')->ensureToStringAllowed($this->env->getExtension('drupal_core')->renderVar(t("Toggle navigation")));
            echo "</span>
                            <span class=\"icon-bar\"></span>
                            <span class=\"icon-bar\"></span>
                            <span class=\"icon-bar\"></span>
                        </button>
                    ";
        }
        // line 27
        echo "                </div>

                ";
        // line 30
        echo "                ";
        if ($this->getAttribute((isset($context["page"]) ? $context["page"] : null), "navigation_collapsible", array())) {
            // line 31
            echo "                    <div id=\"navbar-collapse\" class=\"navbar-collapse collapse\">
                        ";
            // line 32
            echo $this->env->getExtension('sandbox')->ensureToStringAllowed($this->env->getExtension('drupal_core')->escapeFilter($this->env, $this->getAttribute((isset($context["page"]) ? $context["page"] : null), "navigation_collapsible", array()), "html", null, true));
            echo "
                    </div>
                ";
        }
        // line 35
        echo "                ";
        if ( !$this->getAttribute((isset($context["navbar_attributes"]) ? $context["navbar_attributes"] : null), "hasClass", array(0 => "container"), "method")) {
            // line 36
            echo "            </div>
            ";
        }
        // line 38
        echo "        </header>
    ";
    }

    // line 54
    public function block_main($context, array $blocks = array())
    {
        // line 55
        echo "    <div class=\"container-fluid mainView\">
        <div role=\"main\" class=\"main-container container-fluid js-quickedit-main-content\">
            <div class=\"row\">

                ";
        // line 60
        echo "                ";
        if ($this->getAttribute((isset($context["page"]) ? $context["page"] : null), "header", array())) {
            // line 61
            echo "                    ";
            $this->displayBlock('header', $context, $blocks);
            // line 75
            echo "                ";
        }
        // line 76
        echo "
                ";
        // line 78
        echo "                ";
        if ($this->getAttribute((isset($context["page"]) ? $context["page"] : null), "sidebar_first", array())) {
            // line 79
            echo "                    ";
            $this->displayBlock('sidebar_first', $context, $blocks);
            // line 86
            echo "                ";
        }
        // line 87
        echo "
                ";
        // line 89
        echo "                ";
        // line 90
        $context["content_classes"] = array(0 => ((($this->getAttribute(        // line 91
(isset($context["page"]) ? $context["page"] : null), "sidebar_first", array()) && $this->getAttribute((isset($context["page"]) ? $context["page"] : null), "sidebar_second", array()))) ? ("col-sm-6") : ("")), 1 => ((($this->getAttribute(        // line 92
(isset($context["page"]) ? $context["page"] : null), "sidebar_first", array()) && twig_test_empty($this->getAttribute((isset($context["page"]) ? $context["page"] : null), "sidebar_second", array())))) ? ("col-sm-9") : ("")), 2 => ((($this->getAttribute(        // line 93
(isset($context["page"]) ? $context["page"] : null), "sidebar_second", array()) && twig_test_empty($this->getAttribute((isset($context["page"]) ? $context["page"] : null), "sidebar_first", array())))) ? ("col-sm-9") : ("")), 3 => (((twig_test_empty($this->getAttribute(        // line 94
(isset($context["page"]) ? $context["page"] : null), "sidebar_first", array())) && twig_test_empty($this->getAttribute((isset($context["page"]) ? $context["page"] : null), "sidebar_second", array())))) ? ("col-sm-12") : ("")));
        // line 97
        echo "                <section";
        echo $this->env->getExtension('sandbox')->ensureToStringAllowed($this->env->getExtension('drupal_core')->escapeFilter($this->env, $this->getAttribute((isset($context["content_attributes"]) ? $context["content_attributes"] : null), "addClass", array(0 => (isset($context["content_classes"]) ? $context["content_classes"] : null)), "method"), "html", null, true));
        echo ">

                    ";
        // line 100
        echo "                    ";
        if ($this->getAttribute((isset($context["page"]) ? $context["page"] : null), "highlighted", array())) {
            // line 101
            echo "                        ";
            $this->displayBlock('highlighted', $context, $blocks);
            // line 104
            echo "                    ";
        }
        // line 105
        echo "
                    ";
        // line 107
        echo "                    ";
        if ((isset($context["breadcrumb"]) ? $context["breadcrumb"] : null)) {
            // line 108
            echo "                        ";
            $this->displayBlock('breadcrumb', $context, $blocks);
            // line 111
            echo "                    ";
        }
        // line 112
        echo "
                    ";
        // line 114
        echo "                    ";
        if ((isset($context["action_links"]) ? $context["action_links"] : null)) {
            // line 115
            echo "                        ";
            $this->displayBlock('action_links', $context, $blocks);
            // line 118
            echo "                    ";
        }
        // line 119
        echo "
                    ";
        // line 121
        echo "                    ";
        if ($this->getAttribute((isset($context["page"]) ? $context["page"] : null), "help", array())) {
            // line 122
            echo "                        ";
            $this->displayBlock('help', $context, $blocks);
            // line 125
            echo "                    ";
        }
        // line 126
        echo "
                    ";
        // line 128
        echo "                    ";
        $this->displayBlock('content', $context, $blocks);
        // line 132
        echo "                </section>

                ";
        // line 135
        echo "                ";
        if ($this->getAttribute((isset($context["page"]) ? $context["page"] : null), "sidebar_second", array())) {
            // line 136
            echo "                    ";
            $this->displayBlock('sidebar_second', $context, $blocks);
            // line 141
            echo "                ";
        }
        // line 142
        echo "            </div>
        </div>
    </div>
";
    }

    // line 61
    public function block_header($context, array $blocks = array())
    {
        // line 62
        echo "                        <div class=\"search-wrapper\">
                            <div class=\"row searchBoxFullContainer\">
                                <div>
                                    <div class=\"input-group col-lg-6 col-sm-12 searchBoxInputContainer col-lg-offset-2\">
                                        ";
        // line 66
        echo $this->env->getExtension('sandbox')->ensureToStringAllowed($this->env->getExtension('drupal_core')->escapeFilter($this->env, $this->getAttribute((isset($context["page"]) ? $context["page"] : null), "header", array()), "html", null, true));
        echo "
                                    </div>
                                    ";
        // line 69
        echo "
                                    ";
        // line 71
        echo "                                </div>
                            </div>
                        </div>
                    ";
    }

    // line 79
    public function block_sidebar_first($context, array $blocks = array())
    {
        // line 80
        echo "                        <aside class=\"col-sm-3\" role=\"complementary\">
                            <div class=\"well region region-sidebar-first\">
                                ";
        // line 82
        echo $this->env->getExtension('sandbox')->ensureToStringAllowed($this->env->getExtension('drupal_core')->escapeFilter($this->env, $this->getAttribute((isset($context["page"]) ? $context["page"] : null), "sidebar_first", array()), "html", null, true));
        echo "
                            </div>
                        </aside>
                    ";
    }

    // line 101
    public function block_highlighted($context, array $blocks = array())
    {
        // line 102
        echo "                            <div class=\"highlighted\">";
        echo $this->env->getExtension('sandbox')->ensureToStringAllowed($this->env->getExtension('drupal_core')->escapeFilter($this->env, $this->getAttribute((isset($context["page"]) ? $context["page"] : null), "highlighted", array()), "html", null, true));
        echo "</div>
                        ";
    }

    // line 108
    public function block_breadcrumb($context, array $blocks = array())
    {
        // line 109
        echo "                            ";
        echo $this->env->getExtension('sandbox')->ensureToStringAllowed($this->env->getExtension('drupal_core')->escapeFilter($this->env, (isset($context["breadcrumb"]) ? $context["breadcrumb"] : null), "html", null, true));
        echo "
                        ";
    }

    // line 115
    public function block_action_links($context, array $blocks = array())
    {
        // line 116
        echo "                            <ul class=\"action-links\">";
        echo $this->env->getExtension('sandbox')->ensureToStringAllowed($this->env->getExtension('drupal_core')->escapeFilter($this->env, (isset($context["action_links"]) ? $context["action_links"] : null), "html", null, true));
        echo "</ul>
                        ";
    }

    // line 122
    public function block_help($context, array $blocks = array())
    {
        // line 123
        echo "                            ";
        echo $this->env->getExtension('sandbox')->ensureToStringAllowed($this->env->getExtension('drupal_core')->escapeFilter($this->env, $this->getAttribute((isset($context["page"]) ? $context["page"] : null), "help", array()), "html", null, true));
        echo "
                        ";
    }

    // line 128
    public function block_content($context, array $blocks = array())
    {
        // line 129
        echo "                        <a id=\"main-content\"></a>
                        ";
        // line 130
        echo $this->env->getExtension('sandbox')->ensureToStringAllowed($this->env->getExtension('drupal_core')->escapeFilter($this->env, $this->getAttribute((isset($context["page"]) ? $context["page"] : null), "content", array()), "html", null, true));
        echo "
                    ";
    }

    // line 136
    public function block_sidebar_second($context, array $blocks = array())
    {
        // line 137
        echo "                        <aside class=\"col-sm-3\" role=\"complementary\">
                            ";
        // line 138
        echo $this->env->getExtension('sandbox')->ensureToStringAllowed($this->env->getExtension('drupal_core')->escapeFilter($this->env, $this->getAttribute((isset($context["page"]) ? $context["page"] : null), "sidebar_second", array()), "html", null, true));
        echo "
                        </aside>
                    ";
    }

    // line 149
    public function block_footer($context, array $blocks = array())
    {
        // line 150
        echo "        <div class=\"navbar navbar-fixed-bottom hidden-xs\" id=\"ga-footer-rights\">
            <ul>
                <li><a href=\"http://creativecommons.org/licenses/by/4.0/legalcode\" target=\"_blank\"><img src=\"/";
        // line 152
        echo $this->env->getExtension('sandbox')->ensureToStringAllowed($this->env->getExtension('drupal_core')->escapeFilter($this->env, (isset($context["directory"]) ? $context["directory"] : null), "html", null, true));
        echo "/images/by.png\" alt=\"Creative Commons Logo\" width=\"88\"></a></li>
                <li><a href=\"http://www.ga.gov.au/copyright\">Copyright</a></li>
                <li><a href=\"http://www.ga.gov.au/disclaimer\">Disclaimer</a></li>
                <li><a href=\"http://www.ga.gov.au/privacy\">Privacy</a></li>
                <li><a href=\"http://www.ga.gov.au/accessibility\">Accessibility</a></li>
                <li><a href=\"http://www.ga.gov.au/sitemap\">Sitemap</a></li>
                <li><a href=\"http://www.ga.gov.au/ips\">Information Publication Scheme</a></li>
                <li><a href=\"http://www.ga.gov.au/ips/foi\">Freedom of Information</a></li>
                <a href=\"http://www.ga.gov.au/contact-us\" class=\"btn btn-primary searchRelatedButton\" style=\"border-top: none;\">Contact us <span class=\"glyphicon glyphicon-menu-right\"></span></a>
            </ul>
        </div>
        <div class=\"visible-xs footer-sm\">
            <ul>
                <li><a href=\"http://creativecommons.org/licenses/by/4.0/legalcode\" target=\"_blank\"><img src=\"/";
        // line 165
        echo $this->env->getExtension('sandbox')->ensureToStringAllowed($this->env->getExtension('drupal_core')->escapeFilter($this->env, (isset($context["directory"]) ? $context["directory"] : null), "html", null, true));
        echo "/images/by.png\" alt=\"Creative Commons Logo\" width=\"88\"></a></li>
                <li><a href=\"http://www.ga.gov.au/copyright\">Copyright</a></li>
                <li><a href=\"http://www.ga.gov.au/disclaimer\">Disclaimer</a></li>
                <li><a href=\"http://www.ga.gov.au/privacy\">Privacy</a></li>
                <li><a href=\"http://www.ga.gov.au/accessibility\">Accessibility</a></li>
                <li><a href=\"http://www.ga.gov.au/sitemap\">Sitemap</a></li>
                <li><a href=\"http://www.ga.gov.au/ips\">Information Publication Scheme</a></li>
                <li><a href=\"http://www.ga.gov.au/ips/foi\">Freedom of Information</a></li>
                <a href=\"http://www.ga.gov.au/contact-us\" class=\"btn btn-primary searchRelatedButton\" style=\"border-top: none;\">Contact us <span class=\"glyphicon glyphicon-menu-right\"></span></a></p>
            </ul>
        </div>
    ";
    }

    public function getTemplateName()
    {
        return "themes/GATheme/templates/page.html.twig";
    }

    public function isTraitable()
    {
        return false;
    }

    public function getDebugInfo()
    {
        return array (  408 => 165,  392 => 152,  388 => 150,  385 => 149,  378 => 138,  375 => 137,  372 => 136,  366 => 130,  363 => 129,  360 => 128,  353 => 123,  350 => 122,  343 => 116,  340 => 115,  333 => 109,  330 => 108,  323 => 102,  320 => 101,  312 => 82,  308 => 80,  305 => 79,  298 => 71,  295 => 69,  290 => 66,  284 => 62,  281 => 61,  274 => 142,  271 => 141,  268 => 136,  265 => 135,  261 => 132,  258 => 128,  255 => 126,  252 => 125,  249 => 122,  246 => 121,  243 => 119,  240 => 118,  237 => 115,  234 => 114,  231 => 112,  228 => 111,  225 => 108,  222 => 107,  219 => 105,  216 => 104,  213 => 101,  210 => 100,  204 => 97,  202 => 94,  201 => 93,  200 => 92,  199 => 91,  198 => 90,  196 => 89,  193 => 87,  190 => 86,  187 => 79,  184 => 78,  181 => 76,  178 => 75,  175 => 61,  172 => 60,  166 => 55,  163 => 54,  158 => 38,  154 => 36,  151 => 35,  145 => 32,  142 => 31,  139 => 30,  135 => 27,  126 => 21,  123 => 20,  120 => 19,  115 => 16,  112 => 15,  108 => 13,  106 => 12,  101 => 11,  99 => 8,  98 => 7,  97 => 5,  95 => 4,  92 => 3,  86 => 178,  82 => 149,  80 => 148,  76 => 146,  74 => 54,  60 => 41,  56 => 3,  54 => 2,);
    }

    public function getSource()
    {
        return "{# Navbar #}
{% if page.navigation or page.navigation_collapsible %}
    {% block navbar %}
        {%
        set navbar_classes = [
        'navbar',
        theme.settings.navbar_inverse ? 'navbar-inverse' : 'navbar-default',
        theme.settings.navbar_position ? 'navbar-' ~ theme.settings.navbar_position|clean_class : container,
        ]
        %}
        <header{{ navbar_attributes.addClass(navbar_classes) }} id=\"navbar\" role=\"banner\">
            {% if not navbar_attributes.hasClass('container') %}
            <div class=\"container\">
                {% endif %}
                <div class=\"navbar-header\">
                    {{ page.navigation }}

                    {# .btn-navbar is used as the toggle for collapsed navbar content #}
                    {% if page.navigation_collapsible %}
                        <button type=\"button\" class=\"navbar-toggle\" data-toggle=\"collapse\" data-target=\"#navbar-collapse\">
                            <span class=\"sr-only\">{{ 'Toggle navigation'|t }}</span>
                            <span class=\"icon-bar\"></span>
                            <span class=\"icon-bar\"></span>
                            <span class=\"icon-bar\"></span>
                        </button>
                    {% endif %}
                </div>

                {# Navigation (collapsible) #}
                {% if page.navigation_collapsible %}
                    <div id=\"navbar-collapse\" class=\"navbar-collapse collapse\">
                        {{ page.navigation_collapsible }}
                    </div>
                {% endif %}
                {% if not navbar_attributes.hasClass('container') %}
            </div>
            {% endif %}
        </header>
    {% endblock %}
{% endif %}

<div class=\"strap-container\">
    <div class=\"col-md-12 col-xs-12\">
        <div class=\"strap-blue\">
        </div>
        <div class=\"strap-white\">
        </div>
        <div class=\"strap-red\">
        </div>
    </div>
</div>

{# Main #}
{% block main %}
    <div class=\"container-fluid mainView\">
        <div role=\"main\" class=\"main-container container-fluid js-quickedit-main-content\">
            <div class=\"row\">

                {# Header #}
                {% if page.header %}
                    {% block header %}
                        <div class=\"search-wrapper\">
                            <div class=\"row searchBoxFullContainer\">
                                <div>
                                    <div class=\"input-group col-lg-6 col-sm-12 searchBoxInputContainer col-lg-offset-2\">
                                        {{ page.header }}
                                    </div>
                                    {#<div class=\"col-sm-12\" role=\"heading\">#}

                                    {#</div>#}
                                </div>
                            </div>
                        </div>
                    {% endblock %}
                {% endif %}

                {# Sidebar First #}
                {% if page.sidebar_first %}
                    {% block sidebar_first %}
                        <aside class=\"col-sm-3\" role=\"complementary\">
                            <div class=\"well region region-sidebar-first\">
                                {{ page.sidebar_first }}
                            </div>
                        </aside>
                    {% endblock %}
                {% endif %}

                {# Content #}
                {%
                set content_classes = [
                page.sidebar_first and page.sidebar_second ? 'col-sm-6',
                page.sidebar_first and page.sidebar_second is empty ? 'col-sm-9',
                page.sidebar_second and page.sidebar_first is empty ? 'col-sm-9',
                page.sidebar_first is empty and page.sidebar_second is empty ? 'col-sm-12'
                ]
                %}
                <section{{ content_attributes.addClass(content_classes) }}>

                    {# Highlighted #}
                    {% if page.highlighted %}
                        {% block highlighted %}
                            <div class=\"highlighted\">{{ page.highlighted }}</div>
                        {% endblock %}
                    {% endif %}

                    {# Breadcrumbs #}
                    {% if breadcrumb %}
                        {% block breadcrumb %}
                            {{ breadcrumb }}
                        {% endblock %}
                    {% endif %}

                    {# Action Links #}
                    {% if action_links %}
                        {% block action_links %}
                            <ul class=\"action-links\">{{ action_links }}</ul>
                        {% endblock %}
                    {% endif %}

                    {# Help #}
                    {% if page.help %}
                        {% block help %}
                            {{ page.help }}
                        {% endblock %}
                    {% endif %}

                    {# Content #}
                    {% block content %}
                        <a id=\"main-content\"></a>
                        {{ page.content }}
                    {% endblock %}
                </section>

                {# Sidebar Second #}
                {% if page.sidebar_second %}
                    {% block sidebar_second %}
                        <aside class=\"col-sm-3\" role=\"complementary\">
                            {{ page.sidebar_second }}
                        </aside>
                    {% endblock %}
                {% endif %}
            </div>
        </div>
    </div>
{% endblock %}


{% if page.footer %}
    {% block footer %}
        <div class=\"navbar navbar-fixed-bottom hidden-xs\" id=\"ga-footer-rights\">
            <ul>
                <li><a href=\"http://creativecommons.org/licenses/by/4.0/legalcode\" target=\"_blank\"><img src=\"/{{ directory }}/images/by.png\" alt=\"Creative Commons Logo\" width=\"88\"></a></li>
                <li><a href=\"http://www.ga.gov.au/copyright\">Copyright</a></li>
                <li><a href=\"http://www.ga.gov.au/disclaimer\">Disclaimer</a></li>
                <li><a href=\"http://www.ga.gov.au/privacy\">Privacy</a></li>
                <li><a href=\"http://www.ga.gov.au/accessibility\">Accessibility</a></li>
                <li><a href=\"http://www.ga.gov.au/sitemap\">Sitemap</a></li>
                <li><a href=\"http://www.ga.gov.au/ips\">Information Publication Scheme</a></li>
                <li><a href=\"http://www.ga.gov.au/ips/foi\">Freedom of Information</a></li>
                <a href=\"http://www.ga.gov.au/contact-us\" class=\"btn btn-primary searchRelatedButton\" style=\"border-top: none;\">Contact us <span class=\"glyphicon glyphicon-menu-right\"></span></a>
            </ul>
        </div>
        <div class=\"visible-xs footer-sm\">
            <ul>
                <li><a href=\"http://creativecommons.org/licenses/by/4.0/legalcode\" target=\"_blank\"><img src=\"/{{ directory }}/images/by.png\" alt=\"Creative Commons Logo\" width=\"88\"></a></li>
                <li><a href=\"http://www.ga.gov.au/copyright\">Copyright</a></li>
                <li><a href=\"http://www.ga.gov.au/disclaimer\">Disclaimer</a></li>
                <li><a href=\"http://www.ga.gov.au/privacy\">Privacy</a></li>
                <li><a href=\"http://www.ga.gov.au/accessibility\">Accessibility</a></li>
                <li><a href=\"http://www.ga.gov.au/sitemap\">Sitemap</a></li>
                <li><a href=\"http://www.ga.gov.au/ips\">Information Publication Scheme</a></li>
                <li><a href=\"http://www.ga.gov.au/ips/foi\">Freedom of Information</a></li>
                <a href=\"http://www.ga.gov.au/contact-us\" class=\"btn btn-primary searchRelatedButton\" style=\"border-top: none;\">Contact us <span class=\"glyphicon glyphicon-menu-right\"></span></a></p>
            </ul>
        </div>
    {% endblock %}
{% endif %}


";
    }
}
