/*=============================================================================

  This file is part of the Umbrella project.
  Copyright (C) The Juston.co Owners - All Rights Reserved.

  For more details, visit http://juston.co/umbrella

=============================================================================*/

include("Demos/Hello/Common/Panel.js");
include("Widgets/Notif.js");
include("Widgets/Button.js");

/**
 * Presents the notif widget.
 *
 * @param {Element} dom The root element for the notif panel.
 * @extends {Demos.Hello.Common.Panel}
 * @constructor
 */
Demos.Hello.Notif.Panel = function(dom) {
  Demos.Hello.Common.Panel.call(this, "Notif", dom);
};
inherit(Demos.Hello.Notif.Panel, Demos.Hello.Common.Panel);

/**
 * Contains the notif widget.
 *
 * @type {Widgets.Notif}
 * @protected
 */
Demos.Hello.Notif.Panel.prototype.notif;

/**
 * Contains the button to call the notification.
 *
 * @type {Widgets.Button}
 * @protected
 */
Demos.Hello.Notif.Panel.prototype.button;

/**
 * @inheritDoc
 * @override
 */
Demos.Hello.Notif.Panel.prototype.flourish = function() {
  Demos.Hello.Common.Panel.prototype.flourish.call(this);

  var elem;

  elem = document.createElement("div");
  elem.id = "notif-area";
  this.notif = new Widgets.Notif(elem);
  this.container.appendChild(elem);

  elem = document.createElement("div");
  this.button = new Widgets.Button(elem, "NOTIFY");
  this.button.listen("click", this.onButtonClick, this);
  this.container.appendChild(elem);
};

/**
 * Occurs every time the button is clicked.
 *
 * @type {Event} e Event information.
 * @return {void}
 * @protected
 */
Demos.Hello.Notif.Panel.prototype.onButtonClick = function() {
  this.notif.show("Notifying user...");
};
