/*=============================================================================

  This file is part of the Umbrella project.
  Copyright (C) The Juston.co Owners - All Rights Reserved.

  For more details, visit http://juston.co/umbrella

=============================================================================*/

include("Demos/Hello/Common/Panel.js");
include("Widgets/Tree.js");
include("Widgets/TreeItem.js");

/**
 * Presents the tree widget.
 *
 * @param {Element} dom The root element for the tree panel.
 * @extends {Demos.Hello.Common.Panel}
 * @constructor
 */
Demos.Hello.Tree.Panel = function(dom) {
  Demos.Hello.Common.Panel.call(this, "Tree", dom);
};
inherit(Demos.Hello.Tree.Panel, Demos.Hello.Common.Panel);

/**
 * Contains the tree widget.
 *
 * @type {Widgets.Tree}
 * @protected
 */
Demos.Hello.Tree.Panel.prototype.tree1;

/**
 * @inheritDoc
 * @override
 */
Demos.Hello.Tree.Panel.prototype.flourish = function() {
  Demos.Hello.Common.Panel.prototype.flourish.call(this);

  var elem;

  elem = document.createElement("div");
  this.tree1 = new Widgets.Tree(elem);
  this.tree1.listen("action", this.onTree1Action, this);
  this.container.appendChild(elem);

  var item = null, subItem;
  item = new Widgets.TreeItem("Test5");
  this.tree1.addItem(item);

  item = new Widgets.TreeItem("Test6");
  this.tree1.addItem(item);

  item = new Widgets.TreeItem("Test7", true);
  this.tree1.addItem(item);
  item.sub.addItem(new Widgets.TreeItem("SubTest1"));
  item.sub.addItem(new Widgets.TreeItem("SubTest2"));
  item.sub.addItem(subItem = new Widgets.TreeItem("SubTest3", true));
  subItem.sub.addItem(new Widgets.TreeItem("SubSubTest1"));
  subItem.sub.addItem(new Widgets.TreeItem("SubSubTest2"));

  item = new Widgets.TreeItem("Test8");
  this.tree1.addItem(item);
};

/**
 * Occurs every time the tree1 receives action.
 *
 * @type {Widgets.TreeItem} item Event information.
 * @return {void}
 * @protected
 */
Demos.Hello.Tree.Panel.prototype.onTree1Action = function(item) {
  console.log(item);
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
