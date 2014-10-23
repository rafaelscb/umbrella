/*=============================================================================

  This file is part of the Umbrella project.
  Copyright (C) The Juston.co Owners - All Rights Reserved.

  For more details, visit http://juston.co/umbrella

=============================================================================*/

/**
 * @fileoverview This file defines the {@code widgets.Menu} class.
 * @author <a href='mailto:bg@juston.co'>The Umbrella Developers</a>
 */

include('widgets/base.js');

/**
 * The menu widget is to be used with a list of menuitems.
 * This widget provides the following event(s): action.
 *
 * @param {Element} dom Root element for the menu.
 * @extends {widgets.Base}
 * @constructor
 */
widgets.Menu = function(dom) {
  this.items = new Array();
  this.indexHigh = -1;
  widgets.Base.call(this, dom);
};
inherit(widgets.Menu, widgets.Base);

/**
 * Contains the collection of menu items.
 *
 * @type {Array.<widgets.MenuItem|widgets.MenuSeparator>}
 * @public
 */
widgets.Menu.prototype.items;

/**
 * Contains the index of the highlighted item.
 *
 * @type {number}
 * @public
 */
widgets.Menu.prototype.indexHigh;

/**
 * Adds a new item to the items collection.
 *
 * @param {widgets.MenuItem|widgets.MenuSeparator} item A new item to be added.
 * @param {number} index The index position where the item will be added to. If
 *    no value is specified, it adds the item to the end of the list.
 * @return {void}
 */
widgets.Menu.prototype.addItem = function(item, index) {
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
widgets.Menu.prototype.removeItem = function(index) {
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
widgets.Menu.prototype.removeItemById = function(id) {
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
widgets.Menu.prototype.reset = function() {
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
widgets.Menu.prototype.listen = function(type, func, obj) {
  switch (type) {
  case 'action':
    this.addListener(type, func, obj);
    for (var i = 0; i < this.items.length; i++) {
      if (this.items[i] instanceof widgets.MenuItem) {
        this.items[i].listen(type, func, obj);
      }
    }
    return;
  }
  widgets.Base.prototype.listen.call(this, type, func, obj);
};

/**
 * @inheritDoc
 * @override
 */
widgets.Menu.prototype.unlisten = function(type) {
  switch (type) {
  case 'action':
    this.removeListeners(type);
    for (var i = 0; i < this.items.length; i++) {
      if (this.items[i] instanceof widgets.MenuItem) {
        this.items[i].unlisten(type);
      }
    }
    return;
  }
  widgets.Base.prototype.unlisten.call(this, type);
};

/**
 * Occurs when a given item is highlighted.
 *
 * @param {Event} e Event information.
 * @return {void}
 */
widgets.Menu.prototype.onItemHighlight = function(item) {
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
widgets.Menu.prototype.flourish = function() {
  this.dom.setAttribute('role', 'menu');
  this.dom.innerHTML = "";
};

/**
 * @inheritDoc
 * @override
 */
widgets.Menu.prototype.destroy = function() {
  this.unlisten('mouseover');
  this.unlisten('click');

  for (var i = this.items.length-1; i >= 0; i--) {
    this.removeItem();
  }

  this.items = null;
  this.indexHigh = null;

  widgets.Base.prototype.destroy.call(this);
};
