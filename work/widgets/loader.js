/*=============================================================================

  This file is part of the Umbrella project.
  Copyright (C) The Juston.co Owners - All Rights Reserved.

  For more details, visit http://juston.co/umbrella

=============================================================================*/

/**
 * @fileoverview This file defines the {@code widgets.Loader} class.
 * @author <a href='mailto:bg@juston.co'>The Umbrella Developers</a>
 */

include('widgets/base.js');

/**
 * The loader widget handles load and hashchange events.
 * In case a dom is provided, the widgets assumes the loading
 * process already occurred.
 * This widget provides the following event(s): load.
 *
 * @param {Element=} dom Root element for the widget. If no element is passed,
 *    it assumes the root element is {@code document.body}.
 * @extends {widgets.Base}
 * @constructor
 */
widgets.Loader = function(dom) {
  this.listeners = new Object();
  if (dom) {
    this.dom = dom;
    this.flourish();
  } else {
    this.listen('load', this.onLoad, this);
  }
};
inherit(widgets.Loader, widgets.Base);

/**
 * @inheritDoc
 * @override
 */
widgets.Loader.prototype.listen = function(type, func, obj) {
  switch (type) {
  case 'load':
    this.addListener(type, func, obj);
    window.addEventListener('load', this.listeners[type], false);
    window.addEventListener('hashchange', this.listeners[type], false);
    return;
  case 'resize':
    this.addListener(type, func, obj);
    window.addEventListener('resize', this.listeners[type], false);
    return;
  }
  widgets.Base.prototype.listen.call(this, type, func, obj);
};

/**
 * @inheritDoc
 * @override
 */
widgets.Loader.prototype.unlisten = function(type) {
  switch (type) {
  case 'load':
    window.removeEventListener('load', this.listeners[type], false);
    window.removeEventListener('hashchange', this.listeners[type], false);
    this.removeListener(type, func, obj);
    return;
  case 'resize':
    window.removeEventListener('resize', this.listeners[type], false);
    this.removeListener(type, func, obj);
    return;
  }
  widgets.Base.prototype.unlisten.call(this, type);
};

/**
 * Handler function to update the view content whenever the load and
 * hashchange events occurs.
 *
 * @param {Event} e Event information.
 * @return {void}
 */
widgets.Loader.prototype.onLoad = function(e) {
  if (e.type == 'load') {
    this.dom = document.body;
    this.flourish();
  }
  var hash = window.location.hash.substring(1);
  var args = new Array();
  var arg = '';
  for (var i = 0; i < hash.length; i++) {
    if (hash[i] == '\\' && hash[i+1] == '/') {
      i++;
      arg = arg + '/';
      continue;
    }
    if (hash[i] == '/') {
      args.push(arg);
      arg='';
    } else {
      arg = arg + hash[i];
    }
  }
  if (arg) {
    args.push(arg);
  }
  var viewName = args.shift();
  this.loadView(viewName, args);
};

/**
 * Receives the view name (with its arguments, if any) and updates the view
 * content accordingly.
 *
 * @param {string} viewName View name.
 * @param {Array} args Remaining arguments.
 * @return {void}
 */
widgets.Loader.prototype.loadView = function(viewName, args) {};

/**
 * @inheritDoc
 * @override
 */
widgets.Loader.prototype.destroy = function() {
  this.unlisten('load');
  widgets.Base.prototype.destroy.call(this);
};
