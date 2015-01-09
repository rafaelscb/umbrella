/*=============================================================================

  This file is part of the Umbrella project.
  Copyright (C) The Juston.co Owners - All Rights Reserved.

  For more details, visit http://juston.co/umbrella

=============================================================================*/

include("Widgets/Base.js");

/**
 * Class to be extended when we want to create a sample panel.
 *
 * @param {string} title The title of the given panel.
 * @param {Element} dom The root element for the panel.
 * @extends {Widgets.Base}
 * @constructor
 */
Demos.Hello.Common.Panel = function(title, dom) {
  Widgets.Base.call(this, dom);
  this.title.innerHTML = title;
};
inherit(Demos.Hello.Common.Panel, Widgets.Base);

/**
 * Contains the title information.
 *
 * @type {Element}
 * @protected
 */
Demos.Hello.Common.Panel.prototype.title;

/**
 * Contains the container for the panel.
 *
 * @type {Element}
 * @protected
 */
Demos.Hello.Common.Panel.prototype.container;

/**
 * @inheritDoc
 * @override
 */
Demos.Hello.Common.Panel.prototype.flourish = function() {
  this.dom.className = "panel";

  this.title = document.createElement("h2");
  this.dom.appendChild(this.title);

  this.container = document.createElement("div");
  this.dom.appendChild(this.container);
};
