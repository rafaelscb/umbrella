/*=============================================================================

  This file is part of the Umbrella project.
  Copyright (C) The Juston.co Owners - All Rights Reserved.

  For more details, visit http://juston.co/umbrella

=============================================================================*/

/**
 * @fileoverview This file defines the {@code Widgets.MenuItem} class.
 * @author <a href='mailto:bg@juston.co'>The Umbrella Developers</a>
 */

include('Widgets/base.js');

/**
 * The menuitem widget is to be used as part of the menu widget.
 * All this widget does is inform when it is highlighted and
 * clicked.
 *
 * @param {string} caption Text for the menuitem.
 * @param {boolean} hasPopup value for the {@code aria-haspopup} menu. If true,
 *    the menuitem has a sub-menu, otherwise it is a simple menuitem.
 * @extends {Widgets.Base}
 * @constructor
 */
Widgets.MenuItem = function(caption, hasPopup) {
  this.dom = document.createElement('div');
  Widgets.Base.call(this, this.dom);
  this.setCaption(caption);
  this.setHasPopup(hasPopup);  
  this.listen('mouseover', this.onMouseOver, this);
  this.listen('click', this.onClick, this);
};
inherit(Widgets.MenuItem, Widgets.Base);

/**
 * Sub-Menu.
 *
 * @type {Widgets.Menu}
 * @protected
 */
Widgets.MenuItem.prototype.subMenu;

/**
 * DOM region for the menuitem content.
 *
 * @type {Element}
 * @protected
 */
Widgets.MenuItem.prototype.content;

/**
 * Highlights the menuitem.
 *
 * @param {boolean} val true = highlight; false = obfuscate;
 * @return {void}
 */
Widgets.MenuItem.prototype.highlight = function(val) {
  if (!!val) {
    this.dom.className = 'highlight';
    this.dispatch('highlight', this);
  } else {
    this.dom.className = '';
  }
};

/**
 * Gets the caption (content).
 * menuitem > menuitem-content > #text
 *
 * @return {string}
 * @public
 */
Widgets.MenuItem.prototype.getCaption = function() {
  return this.content.childNodes[0].nodeValue;
};

/**
 * Sets the caption (content).
 * menuitem > menuitem-content > #text
 *
 * @param {string} val Content value.
 * @public
 */
Widgets.MenuItem.prototype.setCaption = function(val) {
  this.content.childNodes[0].nodeValue = val;
};

/**
 * Gets the {@code aria-haspopup} attribute.
 *
 * @return {boolean} 'true' = true; 'false' = false.
 * @public
 */
Widgets.MenuItem.prototype.getHasPopup = function() {
  return this.dom.getAttribute('aria-haspopup') === 'true';
};

/**
 * Sets the {@code aria-haspopup} attribute.
 *
 * @param {boolean} hasPopup true = 'true'; false = 'false'.
 * @public
 */
Widgets.MenuItem.prototype.setHasPopup = function(hasPopup) {
  this.dom.setAttribute('aria-haspopup', (hasPopup = !!hasPopup));
  if (hasPopup) {
    if (!this.content.childNodes[1]) {
      this.content.appendChild(document.createElement('span'));
      this.content.childNodes[1].className = 'submenu-arrow';
    }
    this.content.childNodes[1].innerHTML = '&#x25B6;';
    this.addSub();
  } else if (this.content.childNodes[1]) {
    this.content.removeChild(this.content.childNodes[1]);
    this.dom.removeChild(this.dom.childNodes[1]);
    this.subMenu = null;
  }
};

/**
 * Creates sub-menu.
 *
 * @return {void}
 */
Widgets.MenuItem.prototype.addSub = function() {
  this.subMenu = new widgets.Menu(document.createElement('div'));
  this.subMenu.listen('action', this.listeners['action']);
  this.dom.appendChild(this.subMenu.dom);
  this.closeSub();
};

/**
 * Opens the sub-menu.
 *
 * @return {void}
 */
Widgets.MenuItem.prototype.openSub = function() {
  var prect = this.dom.parentNode.getBoundingClientRect();
  var rect = this.dom.getBoundingClientRect();
  
  this.subMenu.dom.style.top = (rect.top - prect.top - 1) + 'px';
  this.subMenu.dom.style.left = (prect.width - 2) + 'px';
  this.subMenu.setHidden(false);
};

/**
 * Closes the sub-menu.
 *
 * @return {void}
 */
Widgets.MenuItem.prototype.closeSub = function() {
  this.subMenu.reset();
  this.subMenu.setHidden(true);
};

/**
 * @inheritDoc
 * @override
 */
Widgets.MenuItem.prototype.listen = function(type, func, obj) {
  switch (type) {
  case 'action':
    this.addListener(type, func, obj);
    if (this.subMenu) {
      this.subMenu.listen(type, func, obj);
    }
    return;
  case 'highlight':
    this.addListener(type, func, obj);
    return;
  }
  Widgets.Base.prototype.listen.call(this, type, func, obj);
};

/**
 * @inheritDoc
 * @override
 */
Widgets.MenuItem.prototype.unlisten = function(type) {
  switch (type) {
  case 'action':
    this.removeListener(type);
    if (this.subMenu) {
      this.subMenu.unlisten(type);
    }
    return;
  case 'highlight':
    this.removeListener(type);
    return;
  }
  Widgets.Base.prototype.unlisten.call(this, type);
};

/**
 * Occurs when the mouse is over the element.
 *
 * @param {Event} e Event information.
 * @return {void}
 */
Widgets.MenuItem.prototype.onMouseOver = function(e) {
  if (this.dom.className != 'highlight') {
    this.highlight(true);    
  }
};

/**
 * Occurs when the element is clicked.
 *
 * @param {Event} e Event information.
 * @return {void}
 */
Widgets.MenuItem.prototype.onClick = function(e) {
  if (this.getHasPopup() == false) {
    this.dispatch('action', this);
  }
};

/**
 * @inheritDoc
 * @override
 */
Widgets.MenuItem.prototype.flourish = function() {
  this.dom.setAttribute('role', 'menuitem');
  this.dom.innerHTML = "<div class='menuitem-content'> </div>";
  this.content = this.dom.children[0];
};

/**
 * @inheritDoc
 * @override
 */
Widgets.MenuItem.prototype.destroy = function() {
  this.unlisten('mouseover');
  this.unlisten('click');

  if (this.subMenu) {
    this.subMenu.unlisten('action');
  }
  this.subMenu.destroy();
  this.subMenu = null;
  this.content = null;

  Widgets.Base.prototype.destroy.call(this);
};