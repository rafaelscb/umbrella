/*=============================================================================

  This file is part of the Umbrella project.
  Copyright (C) The Juston.co Owners - All Rights Reserved.

  For more details, visit http://juston.co/umbrella

=============================================================================*/

/**
 * @fileoverview This file defines the {@code Widgets.Loader} class.
 * @author <a href='mailto:bg@juston.co'>The Umbrella Developers</a>
 */

include("Widgets/Base.js");

/**
 * The loader widget handles load and hashchange events.
 * In case a dom is provided, the widgets assumes the loading
 * process already occurred.
 * This widget provides the following event(s): load.
 *
 * @param {Element=} dom Root element for the widget. If no element is passed,
 *    it assumes the root element is {@code document.body}.
 * @extends {Widgets.Base}
 * @constructor
 */
Widgets.Loader = function(dom) {
  this.listeners = new Object();
  if (dom) {
    this.dom = dom;
    this.flourish();
  } else {
    this.listen("load", this.onLoad, this);
    this.listen("hashchange", this.onHashChange, this);
  }
};
inherit(Widgets.Loader, Widgets.Base);

/**
 * Contains the view name.
 *
 * @type {string}
 * @protected
 */
Widgets.Loader.prototype.viewName;

/**
 * Contains the remaining arguments for the view.
 *
 * @type {Array}
 * @protected
 */
Widgets.Loader.prototype.args;

/**
 * Gets the view name.
 *
 * @return {string}
 * @public
 */
Widgets.Loader.prototype.getViewName = function() {
  return this.viewName;
};

/**
 * Gets the arguments.
 *
 * @return {Array}
 * @public
 */
Widgets.Loader.prototype.getArgs = function() {
  return this.args;
};

/**
 * @inheritDoc
 * @override
 */
Widgets.Loader.prototype.listen = function(type, func, obj) {
  switch (type) {
  case "load":
    this.addListener(type, func, obj);
    window.addEventListener("load", this.listeners[type], false);
    return;
  case "hashchange":
    this.addListener(type, func, obj);
    window.addEventListener("hashchange", this.listeners[type], false);
    return;
  case "resize":
    this.addListener(type, func, obj);
    window.addEventListener("resize", this.listeners[type], false);
    return;
  }
  Widgets.Base.prototype.listen.call(this, type, func, obj);
};

/**
 * @inheritDoc
 * @override
 */
Widgets.Loader.prototype.unlisten = function(type) {
  switch (type) {
  case "load":
    window.removeEventListener("load", this.listeners[type], false);
    this.removeListener(type, func, obj);
    return;
  case "hashchange":
    window.removeEventListener("hashchange", this.listeners[type], false);
    this.removeListener(type, func, obj);
    return;
  case "resize":
    window.removeEventListener("resize", this.listeners[type], false);
    this.removeListener(type, func, obj);
    return;
  }
  Widgets.Base.prototype.unlisten.call(this, type);
};

/**
 * Resets the arguments.
 *
 * @return {void}
 * @protected
 */
Widgets.Loader.prototype.resetArguments = function() {
  this.args = new Array();

  var hash = window.location.hash.substring(1);
  var arg = "";

  for (var i = 0; i < hash.length; i++) {
    if (hash[i] == "\\" && hash[i+1] == "/") {
      i++;
      arg = arg + "/";
      continue;
    }

    if (hash[i] == "/") {
      this.args.push(arg);
      arg='';
    } else {
      arg = arg + hash[i];
    }
  }

  if (arg) {
    this.args.push(arg);
  }

  this.viewName = this.args.shift();  
};

/**
 * Occurs every time the page is loaded.
 *
 * @param {Event} e Event information.
 * @return {void}
 */
Widgets.Loader.prototype.onLoad = function(e) {
  this.dom = document.body;
  this.flourish();

  this.resetArguments();
  this.initialize();
  this.load();
};

/**
 * Occurs every time the hash address has changed.
 *
 * @param {Event} e Event information.
 * @return {void}
 */
Widgets.Loader.prototype.onHashChange = function(e) {
  this.resetArguments();
  this.load();
};

/**
 * Initializes any informatino need by the app.
 *
 * @param {Event} e Event information.
 * @return {void}
 */
Widgets.Loader.prototype.initialize = function() {};

/**
 * Receives the view name (with its arguments, if any) and updates the view
 * content accordingly.
 *
 * @return {void}
 */
Widgets.Loader.prototype.load = function() {};

/**
 * @inheritDoc
 * @override
 */
Widgets.Loader.prototype.destroy = function() {
  this.unlisten("load");
  this.unlisten("hashchange");
  Widgets.Base.prototype.destroy.call(this);
};