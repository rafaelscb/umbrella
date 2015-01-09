/*=============================================================================

  This file is part of the Umbrella project.
  Copyright (C) The Juston.co Owners - All Rights Reserved.

  For more details, visit http://juston.co/umbrella

=============================================================================*/

include("Demos/Hello/Common/Panel.js");
include("Widgets/Menu.js");
include("Widgets/MenuItem.js");
include("Widgets/MenuSeparator.js");

/**
 * Presents the menu widget.
 *
 * @param {Element} dom The root element for the menu panel.
 * @extends {Demos.Hello.Common.Panel}
 * @constructor
 */
Demos.Hello.Menu.Panel = function(dom) {
  Demos.Hello.Common.Panel.call(this, "Menu", dom);
};
inherit(Demos.Hello.Menu.Panel, Demos.Hello.Common.Panel);

/**
 * Contains the menu widget.
 *
 * @type {Widgets.Menu}
 * @protected
 */
Demos.Hello.Menu.Panel.prototype.mnu1;

/**
 * @inheritDoc
 * @override
 */
Demos.Hello.Menu.Panel.prototype.flourish = function() {
  Demos.Hello.Common.Panel.prototype.flourish.call(this);

  var elem;

  elem = document.createElement("div");
  elem.tabIndex = 0;
  this.mnu1 = new Widgets.Menu(elem);
  this.mnu1.listen("action", this.onMnu1Action, this);
  this.mnu1.listen("mouseover", this.onMnu1MouseOver, this);
  this.mnu1.listen("blur", this.onMnu1Blur, this);
  this.container.appendChild(elem);

  var item = null;
  item = new Widgets.MenuItem("Test1");
  item.dom.id = "test1";
  this.mnu1.addItem(item);

  item = new Widgets.MenuItem("Test2");
  item.dom.id = "test2";
  this.mnu1.addItem(item);

  item = new Widgets.MenuSeparator();
  item.dom.id = "sep1";
  this.mnu1.addItem(item, 2);

  item = new Widgets.MenuItem("Test3");
  item.dom.id = "test3";
  item.setHasPopup(true);
  this.mnu1.addItem(item);

  item.subMenu.addItem(new Widgets.MenuItem("Sub-Menu1"));
  item.subMenu.addItem(new Widgets.MenuItem("Sub-Menu2"));
  item.subMenu.addItem(new Widgets.MenuItem("Sub-Menu3"));
  item.subMenu.addItem(new Widgets.MenuItem("Sub-Menu4"));

  item.subMenu.items[0].setHasPopup(true);
  item.subMenu.items[0].subMenu.addItem(new Widgets.MenuItem('Sub-Sub-Menu1'));
  item.subMenu.items[0].subMenu.addItem(new Widgets.MenuItem('Sub-Sub-Menu2'));
  item.subMenu.items[0].subMenu.addItem(new Widgets.MenuItem('Sub-Sub-Menu3'));
  item.subMenu.items[0].subMenu.addItem(new Widgets.MenuItem('Sub-Sub-Menu4'));
};

/**
 * Occurs every time the mnu1 receives action.
 *
 * @type {Widgets.MenuItem} item Event information.
 * @return {void}
 * @protected
 */
Demos.Hello.Menu.Panel.prototype.onMnu1Action = function(item) {
  console.log(item);
  this.mnu1.reset();
};

/**
 * Occurs every time the mnu1 receives mouse over.
 *
 * @type {Event} e Event information.
 * @return {void}
 * @protected
 */
Demos.Hello.Menu.Panel.prototype.onMnu1MouseOver = function(e) {
  this.mnu1.dom.focus();
};

/**
 * Occurs every time the mnu1 receives blur.
 *
 * @type {Event} e Event information.
 * @return {void}
 * @protected
 */
Demos.Hello.Menu.Panel.prototype.onMnu1Blur = function(e) {
  this.mnu1.reset();
};
