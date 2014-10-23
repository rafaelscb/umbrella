/*=============================================================================

  This file is part of the Umbrella project.
  Copyright (C) The Juston.co Owners - All Rights Reserved.

  For more details, visit http://juston.co/umbrella

=============================================================================*/

/**
 * @fileoverview This file defines the {@code widgets.Graphics} class.
 * @author <a href='mailto:bg@juston.co'>The Umbrella Developers</a>
 */

include('widgets/base.js');

/**
 * The canvas widget is to be used when we want to draw something
 * in the canvas area.
 *
 * @param {Element} dom Root element for the canvas widget.
 * @param {string} dim Dimensional level.
 * @extends {widgets.Base}
 * @constructor
 */
widgets.Canvas = function(dom, dim) {
  widgets.Base.call(this, dom);
  this.context = this.dom.getContext(dim);
  this.width = this.dom.width;
  this.height = this.dom.height;
};
inherit(widgets.Canvas, widgets.Base);

/**
 * Context object.
 *
 * @type {object}
 * @public
 */
widgets.Canvas.prototype.context;

/**
 * Width in pixels.
 *
 * @type {number}
 * @protected
 */
widgets.Canvas.prototype.width;

/**
 * Height in pixels.
 *
 * @type {number}
 * @protected
 */
widgets.Canvas.prototype.height;

/**
 * Draw anything on the canvas using the
 * current context.
 *
 * @return {void} Nothing.
 * @public
 */
widgets.Canvas.prototype.draw = function() { };
