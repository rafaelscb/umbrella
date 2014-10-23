/*=============================================================================

  This file is part of the Umbrella project.
  Copyright (C) The Juston.co Owners - All Rights Reserved.

  For more details, visit http://juston.co/umbrella

=============================================================================*/

/**
 * @fileoverview This file defines the {@code widgets.Document} class.
 * @author <a href='mailto:bg@juston.co'>The Umbrella Developers</a>
 */

include('widgets/loader.js');

/**
 * This widget represents the {@code document} role and provides the following
 * event(s): load.
 *
 * @param {Element=} dom Root element for the widget. If no element is passed,
 *    it assumes the root element is {@code document.body}.
 * @extends {widgets.Loader}
 * @constructor
 */
widgets.Document = function(dom) {
  widgets.Loader.call(this, dom);
};
inherit(widgets.Document, widgets.Loader);

/**
 * @inheritDoc
 * @override
 */
widgets.Document.prototype.flourish = function() {
  this.dom.setAttribute('role', 'document');
};
