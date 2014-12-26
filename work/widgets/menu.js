/*=============================================================================

  This file is part of the Umbrella project.
  Copyright (C) The Juston.co Owners - All Rights Reserved.

  For more details, visit http://juston.co/umbrella

=============================================================================*/

/**
 * @fileoverview This file defines the {@code Widgets.Menu} class.
 * @author <a href='mailto:bg@juston.co'>The Umbrella Developers</a>
 */

include('Widgets/Base.js');

/**
 * The menu widget is to be used with a list of menuitems.
 * This widget provides the following event(s): action.
 *
 * @param {Element} dom Root element for the menu.
 * @extends {Widgets.Base}
 * @constructor
 */
Widgets.Menu = function(dom) {
  this.items = new Array();
  this.indexHigh = -1;
  Widgets.Base.call(this, dom);
};
inherit(Widgets.Menu, Widgets.Base);

/**
 * Contains the collection of menu items.
 *
 * @type {Array.<Widgets.MenuItem|Widgets.MenuSeparator>}
 * @public
 */
Widgets.Menu.prototype.items;

/**
 * Contains the index of the highlighted item.
 *
 * @type {number}
 * @public
 */
Widgets.Menu.prototype.indexHigh;

/**
 * Adds a new item to the items collection.
 *
 * @param {Widgets.MenuItem|Widgets.MenuSeparator} item A new item to be added.
 * @param {number} index The index position where the item will be added to. If
 *    no value is specified, it adds the item to the end of the list.
 * @return {void}
 */
Widgets.Menu.prototype.addItem = function(item, index) {
  index = (index == undefined) ? this.items.length : index;
  this.items.splice(index, 0, item);
  this.dom.insertBefore(item.dom, this.dom.children[index]);
  item.listen('highlight', this.onItemHighlight, this);
  item.listen('action', this.listeners['action']);
};

/**
 * Removes a given item from the items collection.
 *
 * @param {number} index The index position where the item will be removed
 *    from. If no value is specified, it removes the item from the end of the
 *    list.
 * @return {void}
 */
Widgets.Menu.prototype.removeItem = function(index) {
  index = (index == undefined) ? this.items.length-1 : index;
  this.items[index].unlisten('highlight');
  this.items[index].unlisten('action');

  this.dom.removeChild(this.items[index].dom);

  this.items[index].destroy();
  this.items.splice(index, 1);
};

/**
 * Removes a given item by id, from the items collection.
 *
 * @param {string} id IDREF of the item to be removed.
 * @return {void}
 */
Widgets.Menu.prototype.removeItemById = function(id) {
  for (var i = 0; i < this.items.length; i++) {
    if (id == this.items[i].dom.id) {
      this.removeItem(i);
      return;
    }
  }
};

/**
 * Resets the menu state.
 *
 * @return {void}
 */
Widgets.Menu.prototype.reset = function() {
  var hItem = this.items[this.indexHigh];
  if (hItem) {
    hItem.highlight(false);
    if (hItem.getHasPopup()) {
      hItem.closeSub();
    }
  }
  this.indexHigh = -1;
};

/**
 * @inheritDoc
 * @override
 */
Widgets.Menu.prototype.listen = function(type, func, obj) {
  switch (type) {
  case 'action':
    this.addListener(type, func, obj);
    for (var i = 0; i < this.items.length; i++) {
      if (this.items[i] instanceof Widgets.MenuItem) {
        this.items[i].listen(type, func, obj);
      }
    }
    return;
  }
  Widgets.Base.prototype.listen.call(this, type, func, obj);
};

/**
 * @inheritDoc
 * @override
 */
Widgets.Menu.prototype.unlisten = function(type) {
  switch (type) {
  case 'action':
    this.removeListeners(type);
    for (var i = 0; i < this.items.length; i++) {
      if (this.items[i] instanceof Widgets.MenuItem) {
        this.items[i].unlisten(type);
      }
    }
    return;
  }
  Widgets.Base.prototype.unlisten.call(this, type);
};

/**
 * Occurs when a given item is highlighted.
 *
 * @param {Event} e Event information.
 * @return {void}
 */
Widgets.Menu.prototype.onItemHighlight = function(item) {
  var prevItem = this.items[this.indexHigh];
  if (prevItem) {
    prevItem.highlight(false);
    if (prevItem.getHasPopup()) {
      prevItem.closeSub();
    }
  }
  for (var i = 0; i < this.items.length; i++) {
    if (this.items[i].dom == item.dom) {
      this.indexHigh = i;
      if (item.getHasPopup()) {
        item.openSub();
      }
    }
  }
};

/**
 * @inheritDoc
 * @override
 */
Widgets.Menu.prototype.flourish = function() {
  this.dom.setAttribute('role', 'menu');
  this.dom.innerHTML = "";
};

/**
 * @inheritDoc
 * @override
 */
Widgets.Menu.prototype.destroy = function() {
  this.unlisten('mouseover');
  this.unlisten('click');

  for (var i = this.items.length-1; i >= 0; i--) {
    this.removeItem();
  }

  this.items = null;
  this.indexHigh = null;

  Widgets.Base.prototype.destroy.call(this);
};