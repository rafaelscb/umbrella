/*=============================================================================

  This file is part of the Umbrella project.
  Copyright (C) The Juston.co Owners - All Rights Reserved.

  For more details, visit http://juston.co/umbrella

=============================================================================*/

/**
 * @fileoverview This file defines the {@code Widgets.TreeItem} class.
 * @author <a href='mailto:bg@juston.co'>The Umbrella Developers</a>
 */

include('Widgets/Base.js');

/**
 * The treeitem widget is to be used as part of the tree widget.
 * All this widget does is inform when it is highlighted and
 * clicked.
 *
 * @param {string} caption Text for the treeitem.
 * @param {boolean} hasSub If true, the treeitem has a sub-tree, otherwise
 *    it is a simple treeitem.
 * @extends {Widgets.Base}
 * @constructor
 */
Widgets.TreeItem = function(caption, hasSub) {
  this.dom = document.createElement('div');
  this.hasSub = hasSub;
  Widgets.Base.call(this, this.dom);
  this.setCaption(caption);
  this.listen('mouseenter', this.onMouseEnter, this);
  this.listen('mouseleave', this.onMouseLeave, this);
  this.listen('click', this.onClick, this);
  if (this.hasSub) {
    this.listen('arrowmouseenter', this.onArrowMouseEnter, this);
    this.listen('arrowmouseleave', this.onArrowMouseLeave, this);
  }
};
inherit(Widgets.TreeItem, Widgets.Base);

/**
 * Flag indicating if it has a sub-tree.
 *
 * @type {boolean}
 * @protected
 */
Widgets.TreeItem.prototype.hasSub;

/**
 * DOM region for the treeitem's inner area.
 *
 * @type {Element}
 * @protected
 */
Widgets.TreeItem.prototype.inner;

/**
 * DOM region for the treeitem's content area.
 *
 * @type {Element}
 * @protected
 */
Widgets.TreeItem.prototype.content;

/**
 * DOM region for the treeitem's arrow area.
 *
 * @type {Element}
 * @protected
 */
Widgets.TreeItem.prototype.arrow;

/**
 * DOM region for the treeitem's body area.
 *
 * @type {Element}
 * @protected
 */
Widgets.TreeItem.prototype.body;

/**
 * Sub-group region.
 *
 * @type {Widgets.Tree}
 * @protected
 */
Widgets.TreeItem.prototype.sub;

/**
 * Gets the aria-expanded value.
 *
 * @return {boolean}
 * @public
 */
Widgets.TreeItem.prototype.getExpanded = function() {
  return this.dom.getAttribute('aria-expanded') == 'true';
};

/**
 * Sets the aria-expanded value.
 *
 * @param {boolean}
 * @public
 */
Widgets.TreeItem.prototype.setExpanded = function(val) {
  this.dom.setAttribute('aria-expanded', !!val);
};

/**
 * Gets the caption.
 *
 * @return {string}
 * @public
 */
Widgets.TreeItem.prototype.getCaption = function() {
  return this.body.children[0].innerHTML;
};

/**
 * Sets the caption.
 *
 * @param {string} val Caption text.
 * @public
 */
Widgets.TreeItem.prototype.setCaption = function(val) {
  this.body.children[0].innerHTML = val;
};

/**
 * Expands the sub-items.
 *
 * @return {void}
 * @public
 */
Widgets.TreeItem.prototype.expand = function() {
  this.setExpanded(true);
  this.sub.setHidden(false);
};

/**
 * Collapses the sub-items.
 *
 * @return {void}
 * @public
 */
Widgets.TreeItem.prototype.collapse = function() {
  this.setExpanded(false);
  this.sub.setHidden(true);
};

/**
 * Occurs when the mouse enters the inner area.
 *
 * @param {Event} e Event information.
 * @protected
 */
Widgets.TreeItem.prototype.onMouseEnter = function(e) {
  this.inner.className = 'inner hovered';
};

/**
 * Occurs when the mouse leaves the inner area.
 *
 * @param {Event} e Event information.
 * @protected
 */
Widgets.TreeItem.prototype.onMouseLeave = function(e) {
  this.inner.className = 'inner';
};

/**
 * Occurs when the mouse is clicked on the menu item.
 *
 * @param {Event} e Event information.
 * @protected
 */
Widgets.TreeItem.prototype.onClick = function(e) {
  if (e.target == this.arrow) {
    if (this.getExpanded()) {
      this.collapse();
    } else {
      this.expand();
    }
  } else {
    this.dispatch('action', this);
  }
};

/**
 * Occurs when the mouse enters the arrow area.
 *
 * @param {Event} e Event information.
 * @protected
 */
Widgets.TreeItem.prototype.onArrowMouseEnter = function(e) {
  this.arrow.className = 'arrow hovered';
};

/**
 * Occurs when the mouse leaves the arrow area.
 *
 * @param {Event} e Event information.
 * @protected
 */
Widgets.TreeItem.prototype.onArrowMouseLeave = function(e) {
  this.arrow.className = 'arrow';
};

/**
 * @inheritDoc
 * @override
 */
Widgets.TreeItem.prototype.listen = function(type, func, obj) {
  switch (type) {
  case 'action':
    this.addListener(type, func, obj);
    if (this.hasSub) {
      this.sub.listen(type, func, obj);
    }
    return;
  case 'mouseenter':
    this.addListener(type, func, obj);
    if (this.hasSub) {
      this.body.addEventListener('mouseenter', this.listeners[type], false);
    } else {
      this.inner.addEventListener('mouseenter', this.listeners[type], false);
    }
    return;
  case 'mouseleave':
    this.addListener(type, func, obj);
    if (this.hasSub) {
      this.body.addEventListener('mouseleave', this.listeners[type], false);
    } else {
      this.inner.addEventListener('mouseleave', this.listeners[type], false);
    }
    return;
  case 'arrowmouseenter':
    this.addListener(type, func, obj);
    this.arrow.addEventListener('mouseenter', this.listeners[type], false);
    return;
  case 'arrowmouseleave':
    this.addListener(type, func, obj);
    this.arrow.addEventListener('mouseleave', this.listeners[type], false);
    return;
  }
  Widgets.Base.prototype.listen.call(this, type, func, obj);
};

/**
 * @inheritDoc
 * @override
 */
Widgets.TreeItem.prototype.unlisten = function(type) {
  switch (type) {
  case 'action':
    this.removeListener(type);
    if (this.hasSub) {
      this.sub.unlisten(type);
    }
    return;
  case 'mouseenter':
    if (this.hasSub) {
      this.body.removeEventListener('mouseenter', this.listeners[type], false);
    } else {
      this.inner.removeEventListener(
          'mouseenter', this.listeners[type], false);
    }
    this.removeListener(type);
    return;
  case 'mouseleave':
    if (this.hasSub) {
      this.body.removeEventListener('mouseleave', this.listeners[type], false);
    } else {
      this.inner.removeEventListener(
          'mouseleave', this.listeners[type], false);
    }
    this.removeListener(type);
    return;
  case 'arrowmouseenter':
    this.arrow.removeEventListener('mouseenter', this.listeners[type], false);
    this.removeListener(type);
    return;
  case 'arrowmouseleave':
    this.arrow.removeEventListener('mouseleave', this.listeners[type], false);
    this.removeListener(type);
    return;
  }
  Widgets.Base.prototype.unlisten.call(this, type);
};

/**
 * @inheritDoc
 * @override
 */
Widgets.TreeItem.prototype.flourish = function() {
  this.dom.setAttribute('role', 'treeitem');
  if (this.hasSub) {
    this.dom.innerHTML = "\
      <div class='inner'>\
        <div class='content'>\
          <div class='arrow'></div>\
          <div class='body'><span></span></div>\
        </div>\
      </div>";

    this.inner = this.dom.children[0];
    this.content = this.inner.children[0];
    this.arrow = this.content.children[0];
    this.body = this.content.children[1];
    this.flourishSub();
    this.collapse();
  } else {
    this.dom.innerHTML = "\
      <div class='inner'>\
        <div class='content'>\
          <div class='body'><span></span></div>\
        </div>\
      </div>";

    this.inner = this.dom.children[0];
    this.content = this.inner.children[0];
    this.body = this.content.children[0];
  }
};

/**
 * Flourishes the sub-tree.
 *
 * @return {void}
 * @protected
 */
Widgets.TreeItem.prototype.flourishSub = function() {
  var subElem = document.createElement('div');
  subElem.setAttribute('role', 'group');
  this.sub = new Widgets.Tree(subElem);
};

/**
 * Selects a given item.
 *
 * @param {string} key The name of the attribute.
 * @param {string} value The value of the attribute.
 * @return {void} Nothing.
 * @public
 */
Widgets.TreeItem.prototype.selectItem = function(key, value) {
  if (this.hasSub) {
    this.sub.selectItem(key, value);
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
Widgets.TreeItem.prototype.unselectItem = function(key, value) {
  if (this.hasSub) {
    this.sub.unselectItem(key, value);
  }
};

/**
 * @inheritDoc
 * @override
 */
Widgets.TreeItem.prototype.destroy = function() {
  this.unlisten('mouseenter');
  this.unlisten('mouseleave');
  this.unlisten('click');
  if (this.hasSub) {
    this.unlisten('arrowmouseenter');
    this.unlisten('arrowmouseleave');
    this.sub.unlisten('action');
    this.sub.destroy();
  }
  this.hasSub = null;
  this.inner = null;
  this.content = null;
  this.arrow = null;
  this.body = null;
  this.sub = null;

  Widgets.Base.prototype.destroy.call(this);
};
