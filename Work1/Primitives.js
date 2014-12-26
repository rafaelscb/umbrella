/*=============================================================================

  This file is part of the Umbrella project.
  Copyright (C) The Juston.co Owners - All Rights Reserved.

  For more details, visit http://juston.co/umbrella

=============================================================================*/

/**
 * @fileoverview This file has some global primitives.
 * @author <a href='mailto:bg@juston.co'>The Umbrella Developers</a>
 */

/**
 * Contains the dependency nodes.
 *
 * @type {Object}
 * @private
 */
var deps = new Object();

/**
 * A flag to indicate when the include function was run.
 *
 * @type {boolean}
 * @private
 */
var included = false;

/**
 * Path where the source files are.
 *
 * @type {string}
 * @private
 * @const
 */
var SRC_PATH;

/**
 * Path where the resource files are for a given application.
 *
 * @type {string}
 * @private
 * @const
 */
var RES_PATH;

/**
 * Contains the current language, by default sets this variable to
 * en, but we can overwrite it in our application at any moment.
 *
 * @type {string}
 * @public
 */
var lang = "en";

/**
 * Extends a given child class to have the same methods and properties fo the
 * parent class.
 *
 * @param {Function} childCtor Child class.
 * @param {Function} parentCtor Parent class.
 * @return {void} Nothing.
 */
function inherit(childCtor, parentCtor) {
  /** @constructor */
  function tempCtor() {};
  tempCtor.prototype = parentCtor.prototype;
  childCtor.prototype = new tempCtor();
  /** @override */
  childCtor.prototype.constructor = childCtor;
};

/**
 * Includes a given JavaScript (and its dependencies) into the head of the
 * current application. It is useful when we want to lazy-load the scripts.
 * It works similarly to C/C++'s include directive.
 *
 * @param {string} jsFile The relative path to the JavaScript file to be added.
 * @return {void} Nothing.
 */
function include(file) {
  if (!included) {
    included = true;

    var files = Array();
    var add = function (arr, elem) {
      if (arr.indexOf(elem) < 0) {
        arr.push(elem);
      }
    };

    (function incRecur(f) {
      if (deps[f]) {
        for (var i = 0; i < deps[f].length; i++) {
          incRecur(deps[f][i]);
        }
      }
      add(files, f);
    })(file);

    for (var i = 0; i < files.length; i++) {
      if (files[i].split('.').pop() == 'js') {
        document.write('<script type="text/javascript" src="' +
            SRC_PATH + '/' + files[i] + '"></script>');
      } else {
        document.write('<link rel="stylesheet" type="text/css" href="' +
            SRC_PATH + '/' + files[i] + '">');
      }
    }
  }
};

/**
 * Adds a dependency node into the deps global variable.
 *
 * @param {string} jsFile The relative path to the JavaScript file.
 * @param {Array} files The subsequent files that jsFile includes.
 * @return {void} Nothing.
 */
function addDep(jsFile, files) {
  deps[jsFile] = files;

  var nsp = jsFile.split('/');
  var obj = window;
  var i = 0;

  for (; i<(nsp.length-1); i++) {
    if (!obj[nsp[i]]) {
      obj[nsp[i]] = new Object();
    }
    obj = obj[nsp[i]];
  }
};

/**
 * Function to format strings.
 *
 * While JavaScript doesn't provide a format function, we're
 * appending our own function.
 *
 * @param {...string} var_args A set of arguments to be added in the
 *    respective order.
 * @return {void} Nothing.
 */
if (!String.prototype.format) {
  String.prototype.format = function() {
    var args = arguments;
    return this.replace(/{(\d+)}/g, function(match, number) {
      return typeof args[number] != 'undefined'
        ? args[number]
        : match;
    });
  };
}

/**
 * Function to pad a given string to the left.
 *
 * While JavaScript doesn't provide a pad function, we're 
 * appending our own function.
 *
 * @param {string} paddingValue The padding value.
 * @return {string} The resulting value.
 */
if (!String.prototype.paddingLeft) {
  String.prototype.paddingLeft = function(paddingValue) {
    return String(paddingValue + this).slice(-paddingValue.length);
  };
}
