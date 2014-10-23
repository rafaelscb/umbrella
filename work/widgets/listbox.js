/*=============================================================================

  This file is part of the Umbrella project.
  Copyright (C) The Juston.co Owners - All Rights Reserved.

  For more details, visit http://juston.co/umbrella

=============================================================================*/

/**
 * @fileoverview This file defines the {@code widgets.Listbox} class.
 * @author <a href='mailto:bg@juston.co'>The Umbrella Developers</a>
 */

include('widgets/base.js');

/**
 * The listbox widget is to be used when we want the user to select
 * on or more options.
 *
 * @param {Element} dom Root element for the listbox.
 * @extends {widgets.Base}
 * @constructor
 */
widgets.Listbox = function(dom) {
  this.index = this.index2 = -1;
  this.options = new Array();
  widgets.Base.call(this, dom);
  this.listen('keydown', this.onKeyDown, this);
};
inherit(widgets.Listbox, widgets.Base);

/**
 * Lower cursor.
 *
 * @type {number}
 * @public
 */
widgets.Listbox.prototype.index;

/**
 * Higher cursor.
 *
 * @type {number}
 * @public
 */
widgets.Listbox.prototype.index2;

/**
 * Contains the collection of options.
 *
 * @type {Array.<widgets.Option>}
 * @public
 */
widgets.Listbox.prototype.options;

/**
 * Adds a new option to the options collection.
 *
 * @param {widgets.Option} option A new option to be added.
 * @param {number} index The index position where the item will be added to. If
 *    no value is specified, it adds the option to the end of the list.
 * @return {void}
 */
widgets.Listbox.prototype.addOption = function(option, index) {
  index = (index == undefined) ? this.options.length : index;
  this.options.splice(index, 0, option);

  option.listen('mouseover', this.onOptionHover, this);
  option.listen('mousedown', this.onOptionClick, this);

  this.dom.insertBefore(option.dom, this.dom.children[index]);
};

/**
 * Removes a given option from the options collection.
 *
 * @param {number} index The index position where the option will be removed
 *    from. If no value is specified, it removes the option from the end of the
 *    list.
 * @return {void}
 */
widgets.Listbox.prototype.removeOption = function(index) {
  index = (index == undefined) ? this.options.length-1 : index;

  this.options[index].unlisten('mousedown');
  this.options[index].unlisten('mouseover');

  this.dom.removeChild(this.options[index].dom);

  this.options[index].destroy();
  this.options.splice(index, 1);
};

/**
 * Removes a given option by id, from the options collection.
 *
 * @param {string} id IDREF of the option to be removed.
 * @return {void}
 */
widgets.Listbox.prototype.removeOptionById = function(id) {
  for (var i = 0; i < this.options.length; i++) {
    if (id == this.options[i].dom.id) {
      this.removeItem(i);
      return;
    }
  }
};

/**
 * Occurs when a key is pressed down, we're only interested in up/down
 * for now.
 *
 * @param {Event} e Event information.
 * @return {boolean} false = to stop the flow, true to pass the event.
 */
widgets.Listbox.prototype.onKeyDown = function(e) {
  if (e.altKey) return true;
  var process = false, diff = 0, total = 0;

  if (e.ctrlKey && e.keyCode == 65) { // ctrl + a
    this.index = 0;
    this.index2 = this.options.length - 1;
    process = true;
  } else if (e.keyCode == 38 || e.keyCode == 33) { // up
    if (e.keyCode == 38) {
      this.index = (this.index > 0) ? this.index - 1 : 0;
    } else {
      while (this.index > 0) {
        total += this.options[this.index].dom.offsetHeight;
        if (total > this.dom.offsetHeight) {
          break;
        }
        this.index--;
      }
    }
    if (!e.shiftKey) {
      this.index2 = this.index;
    }
    diff = this.options[this.index].dom.offsetTop - 
        (this.dom.offsetTop + this.dom.scrollTop);
    diff = (diff < 0) ? diff-1 : 0;    
    process = true;
  } else if (e.keyCode == 40 || e.keyCode == 34) { // down
    if (e.keyCode == 40) {
      this.index = (this.index < (this.options.length - 1))
          ? this.index + 1 : (this.options.length - 1);
    } else {
      while (this.index < (this.options.length - 1)) {
        total += this.options[this.index].dom.offsetHeight;
        if (total > this.dom.offsetHeight) {
          break;
        }
        this.index++;
      }
    }
    if (!e.shiftKey) {
      this.index2 = this.index;
    }
    diff = (this.options[this.index].dom.offsetTop + 
            this.options[this.index].dom.offsetHeight) -
           ((this.dom.offsetTop + this.dom.scrollTop) + this.dom.offsetHeight);
    diff = (diff > 0) ? diff+1 : 0;
    process = true;    
  }

  if (process) {
    this.dom.scrollTop += diff;
    for (var i = 0; i < this.options.length; i++) {
      if (this.index < this.index2) {
        this.options[i].setSelected(i >= this.index && i <= this.index2);
      } else {
        this.options[i].setSelected(i >= this.index2 && i <= this.index);
      }
    }

    e.preventDefault();
    e.stopPropagation();
    return false;
  }
};

/**
 * Occurs when the mouse is over an option.
 *
 * @param {Event} e Event information.
 * @public
 */
widgets.Listbox.prototype.onOptionHover = function(e) {
  if (e.which == 1 && (e.buttons == 1 || 
      e.buttons == 3 || e.buttons == undefined)) {
    this.index = -1;
    for (var i = 0; i < this.options.length; i++) {
      if (e.currentTarget == this.options[i].dom) {
        this.index = i;
        if (e.ctrlKey) {
          this.options[i].setSelected(!this.options[i].getSelected());
          break;
        }        
      }
      if (!e.ctrlKey) {
        if (this.index < 0) {
          this.options[i].setSelected(i >= this.index2);
        } else if (this.index < this.index2) {
          this.options[i].setSelected(i >= this.index && i <= this.index2);
        } else {
          this.options[i].setSelected(i >= this.index2 && i <= this.index);
        }
      }
    }
  }
};

/**
 * Occurs when the element is clicked.
 *
 * @param {Event} e Event information.
 * @public
 */
widgets.Listbox.prototype.onOptionClick = function(e) {
  if (e.which == 1) {
    this.index = -1;
    if (!e.shiftKey) {
      this.index2 = -1;
    }
    for (var i = 0; i < this.options.length; i++) {
      if (e.currentTarget == this.options[i].dom) {
        this.index = i;
        if (this.index2 == -1 || !e.shiftKey) {
          this.index2 = this.index;            
        }
        if (e.ctrlKey) {
          this.options[i].setSelected(!this.options[i].getSelected());
          break;
        }
      }
      if (!e.ctrlKey) {
        if (this.index < 0 && e.shiftKey) {
          this.options[i].setSelected(i >= this.index2);
        } else if (this.index < this.index2) {
          this.options[i].setSelected(i >= this.index && i <= this.index2);
        } else {
          this.options[i].setSelected(i >= this.index2 && i <= this.index);
        }
      }
    }
  }
};

/**
 * @inheritDoc
 * @override
 */
widgets.Listbox.prototype.flourish = function() {
  this.dom.setAttribute('role', 'listbox');
  if (!this.dom.hasAttribute('tabindex')) {
    this.dom.setAttribute('tabindex', '0');
  }
  this.dom.innerHTML = "";
};

/**
 * @inheritDoc
 * @override
 */
widgets.Listbox.prototype.destroy = function() {
  this.unlisten('keydown');
  for (var i = this.options.length-1; i >= 0; i--) {
    this.removeOption();
  }
  this.index = null;
  this.index2 = null;
  this.options = null;

  widgets.Base.prototype.destroy.call(this);
};
