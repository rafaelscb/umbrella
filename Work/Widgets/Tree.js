/*=============================================================================

  This file is part of the Umbrella project.
  Copyright (C) The Juston.co Owners - All Rights Reserved.

  For more details, visit http://juston.co/umbrella

=============================================================================*/

/**
 * @fileoverview This file defines the {@code Widgets.Tree} class.
 * @author <a href='mailto:bg@juston.co'>The Umbrella Developers</a>
 */

include('Widgets/Base.js');
include('Widgets/TreeItem.js');

/**
 * The tree widget is to be used when we want hierarchical and selectable items
 * to be presented.
 *
 * @param {Element} dom Root element for the tree.
 * @extends {Widgets.Base}
 * @constructor
 */
Widgets.Tree = function(dom) {
  this.items = new Array();
  Widgets.Base.call(this, dom);
};
inherit(Widgets.Tree, Widgets.Base);

/**
 * Contains the collection of tree items.
 *
 * @type {Array.<Widgets.TreeItem>}
 * @protected
 */
Widgets.Tree.prototype.items;

/**
 * Selected item.
 *
 * @type {Widgets.TreeItem}
 * @protected
 */
Widgets.Tree.prototype.selectedItem;

/**
 * Gets the selected item.
 *
 * @return {Widgets.TreeItem}
 * @public
 */
Widgets.Tree.prototype.getSelectedItem = function() {
  return this.selectedItem;
};

/**
 * Sets the selected item.
 *
 * @param {Widgets.TreeItem} item The item to be selected.
 * @return {void}
 * @public
 */
Widgets.Tree.prototype.setSelectedItem = function(item) {
  if (this.selectedItem) {
    this.selectedItem.dom.className = '';
  }
  if (item) item.dom.className = 'selected';
  this.selectedItem = item;
};

/**
 * Selects a given item.
 *
 * @param {string} key The name of the attribute.
 * @param {string} value The value of the attribute.
 * @return {void} Nothing.
 * @public
 */
Widgets.Tree.prototype.selectItem = function(key, value) {
  for (var i = 0; i < this.items.length; i++) {
    if (this.items[i].dom.getAttribute(key) == value) {
      var elem = this.items[i].dom;
      while (elem && elem.getAttribute('role') != 'tree') {
        if (elem.getAttribute('role') == 'group') {
          elem.setAttribute('aria-hidden', 'false');
          elem = elem.previousSibling;
          elem.setAttribute('aria-expanded', 'true');
        }
        elem = elem.parentNode;
      }
      this.setSelectedItem(this.items[i]);
      return;
    }
    this.items[i].selectItem(key, value);
  }
};

/**
 * Unselects a given item.
 *
 * @param {string} key The name of the attribute.
 * @param {string} value The value of the attribute.
 * @return {void} Nothing.
 * @public
 */
Widgets.Tree.prototype.unselectItem = function(key, value) {
  for (var i = 0; i < this.items.length; i++) {
    if (this.items[i].dom.getAttribute(key) == value) {
      this.selectedItem = this.items[i];
      this.setSelectedItem(null);
      return;
    }
    this.items[i].unselectItem(key, value);
  }
};

/**
 * Adds a new item to the items collection.
 *
 * @param {Widgets.TreeItem} item A new item to be added.
 * @param {number} index The index position where the item will be added to. If
 *    no value is specified, it adds the item to the end of the list.
 * @return {void}
 */
Widgets.Tree.prototype.addItem = function(item, index) {
  index = (index == undefined) ? this.items.length : index;
  this.items.splice(index, 0, item);
  this.dom.insertBefore(item.dom, this.items[index+1]);
  if (item.hasSub) {
    this.dom.insertBefore(item.sub.dom, this.items[index+1]);
  }
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
Widgets.Tree.prototype.removeItem = function(index) {
  index = (index == undefined) ? this.items.length-1 : index;
  this.items[index].unlisten('action');
  this.dom.removeChild(this.items[index].dom);
  this.items[index].destroy();
  this.items.splice(index, 1);
};

/**
 * Remove all items.
 *
 * @return {void}
 * @protected
 */
Widgets.Tree.prototype.clearAll = function() {
  this.selectedItem = null;
  for (var i = this.items.length-1; i >= 0; i--) {
    this.removeItem();
  }
  this.dom.innerHTML = '';
};

/**
 * Occurs when the action is called. Only the 'tree' should use this function,
 * because treeitems and groups (sub-tree) should only dispatch action but not
 * treat them.
 *
 * @param {Event} e Event information.
 * @return {void}
 * @protected
 */
Widgets.Tree.prototype.onAction = function(item) {
  this.dispatch('extended_action', item);
  this.setSelectedItem(item);
};

/**
 * Occurs when the mouse enters the tree area.
 *
 * @param {Event} e Event information.
 * @return {void}
 * @protected
 */
Widgets.Tree.prototype.onMouseEnter = function(e) {
  this.dom.style.overflowY = 'auto';
};

/**
 * Occurs when the mouse leaves the tree area.
 *
 * @param {Event} e Event information.
 * @return {void}
 * @protected
 */
Widgets.Tree.prototype.onMouseLeave = function(e) {
  this.dom.style.overflowY = 'hidden';
};

/**
 * @inheritDoc
 * @override
 */
Widgets.Tree.prototype.listen = function(type, func, obj) {
  switch (type) {
  case 'action':
    if (!this.listeners[type]) {
      this.addListener(type, func, obj);
      for (var i = 0; i < this.items.length; i++) {
        this.items[i].listen(type, func, obj);
      }
    } else {
      this.addListener('extended_action', func, obj);
    }
    return;
  }
  Widgets.Base.prototype.listen.call(this, type, func, obj);
};

/**
 * @inheritDoc
 * @override
 */
Widgets.Tree.prototype.unlisten = function(type) {
  switch (type) {
  case 'action':
    this.removeListener(type);
    this.removeListener('extended_action');
    for (var i = 0; i < this.items.length; i++) {
      this.items[i].unlisten(type);
    }
    return;
  }
  Widgets.Base.prototype.unlisten.call(this, type);
};

/**
 * @inheritDoc
 * @override
 */
Widgets.Tree.prototype.flourish = function() {
  if (!this.dom.getAttribute('role')) {
    this.dom.setAttribute('role', 'tree');
    this.listen('action', this.onAction, this);
    this.listen('mouseenter', this.onMouseEnter, this);
    this.listen('mouseleave', this.onMouseLeave, this);  
  }
  this.dom.innerHTML = "";
};

/**
 * @inheritDoc
 * @override
 */
Widgets.Tree.prototype.destroy = function() {
  this.unlisten('action');
  this.unlisten('mouseenter');
  this.unlisten('mouseleave');

  for (var i = this.items.length-1; i >= 0; i--) {
    this.removeItem();
  }

  this.items = null;
  this.selectedItem = null;

  this.dom.removeAttribute('role');

  Widgets.Base.prototype.destroy.call(this);
};