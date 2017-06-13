Module Builder
==============

Welcome to Module Builder!

Module Builder is a system that simplifies the process of creating code, by
creating files complete with scaffold code that can be filled in.

For example, for generating a custom module, simply fill out the form, select
the hooks you want and the script will automatically generate a skeleton module
file for you, along with PHPDoc comments and function definitions. This saves
you the trouble of looking at api.drupal.org 50 times a day to remember what
arguments and what order different hooks use. Score one for laziness! ;)

What Module Builder can create
------------------------------

Module builder can generate the following for a module:
- code files, containing hook implementations
- info file (.info.yml on Drupal 8)
- README file
- test case classes
- plugin classes

Furthermore, complex subcomponents can generate multiple code elements:
- an admin settings form adds form builder functions and an admin permission
- router paths add menu/router items
- permission names add the scaffold for the permission definition (on D7 and,
  earlier, hook_permission(), on D8 a permissions.yml file)

Module builder can also build themes and install profiles, though these are
currently still experimental.

Installing Module Builder
-------------------------

This module is just a UI, and needs the Drupal Code Builder library to function.
Download this from https://github.com/drupal-code-builder/drupal-code-builder,
and place it in the top-level libraries folder, so you have a directory
structure like this:
  libraries/drupal-code-builder

This is a temporary measure! Composer and/or Libraries API support will be added
soon.

Using Module Builder
--------------------

1. Go to Administration › Configuration › Development › Module Builder.
   (Note: you will require 'create modules' privileges to see this link.)
2. Enter a module name, description, and so on. Save the form.
3. Select from one of the available hook groupings to automatically
   select hook choices for you, or expand the fieldsets and choose
   hooks individually.
4. Click the "Submit" button and watch your module's code generated
   before your eyes! ;)
5. Copy and paste the code into a files called <your_module>.module,
   <your_module>.info and <your_module>.install and save them to
   a <your_module> directory under one of the modules directories.
6. Start customizing it to your needs; most of the tedious work is
   already done for you! ;)

Todo/wishlist
-------------

* Maybe some nicer theming/swooshy boxes on hook descriptions or
  something to make the form look nicer/less cluttered
* I would like to add the option to import help text from a Drupal.org
  handbook page, to help encourage authors to write standardized
  documentation in http://www.drupal.org/handbook/modules/

CONTRIBUTORS
------------
* Owen Barton (grugnog2), Chad Phillips (hunmonk), and Chris Johnson
  (chrisxj) for initial brainstorming stuff @ OSCMS in Vancouver
* Jeff Robbins for the nice mockup to work from and some great suggestions
* Karthik/Zen/|gatsby| for helping debug some hairy Forms API issues
* Steven Wittens and David Carrington for their nice JS checkbox magic
* jsloan for the excellent "automatically generate module file" feature
* Folks who have submitted bug reports and given encouragement, thank you
  so much! :)
