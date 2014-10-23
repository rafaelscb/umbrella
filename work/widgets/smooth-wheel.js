/*=============================================================================

  This file is part of the Umbrella project.
  Copyright (C) The Juston.co Owners - All Rights Reserved.

  For more details, visit http://juston.co/umbrella

=============================================================================*/

/**
 * @fileoverview This file defines the {@code widgets.SmoothWheel} class.
 * @author <a href='mailto:bg@juston.co'>The Umbrella Developers</a>
 */

include('widgets/base.js');

/**
 * This widget takes a given container and adds the smooth scrolling
 * effect.
 *
 * @param {Element} dom Root element to add the smooth scrolling.
 * @extends {widgets.Base}
 * @constructor
 */
widgets.SmoothWheel = function(dom) {
  widgets.Base.call(this, dom);

  this.friction = 0.95;
  this.vy = 0;
  this.stepAmt = 1;
  this.minMovement = 0.1;
  this.ts = 0.1;

  if (!('ontouchstart' in window)) {
    this.listen('mousewheel', this.onMouseWheel, this);

    this.targetY = this.oldY = this.dom.scrollTop;
    this.currentY = -this.targetY;
    this.minScrollTop = this.dom.clientHeight - this.dom.scrollHeight;

    this.running = true;
    this.animateLoop();
  }
};
inherit(widgets.SmoothWheel, widgets.Base);

/**
 * Flag to identify if the wheel is running.
 *
 * @type {boolean}
 * @protected
 */
widgets.SmoothWheel.prototype.running;
widgets.SmoothWheel.prototype.currentY;
widgets.SmoothWheel.prototype.targetY;
widgets.SmoothWheel.prototype.oldY;
widgets.SmoothWheel.prototype.maxScrollTop;
widgets.SmoothWheel.prototype.minScrollTop;
widgets.SmoothWheel.prototype.direction;
widgets.SmoothWheel.prototype.friction;
widgets.SmoothWheel.prototype.vy;
widgets.SmoothWheel.prototype.stepAmt;
widgets.SmoothWheel.prototype.minMovement;
widgets.SmoothWheel.prototype.ts;

/**
 * Animates the loop.
 *
 * @return {void}
 * @protected
 */
widgets.SmoothWheel.prototype.animateLoop = function() {
  if (!this.running) return;
  requestAnimFrame(this.animateLoop.bind(this));
  this.render();
};

/**
 * Occurs every time the mouse wheel is rolled.
 *
 * @param {Event} e Event information.
 * @return {void}
 */
widgets.SmoothWheel.prototype.onMouseWheel = function(e) {
  var delta = e.detail ? e.detail * -1 : e.wheelDelta / 40;
  var dir = delta < 0 ? -1 : 1;
  if (dir != this.direction) {
    this.vy = 0;
    this.direction = dir;
  }

  this.currentY = -this.dom.scrollTop;
  this.updateScrollTarget(delta);
};

/**
 * Updates the scroll target.
 *
 * @param {number} amt delta amount.
 * @return {void}
 * @protected
 */
widgets.SmoothWheel.prototype.updateScrollTarget = function(amt) {
  this.targetY += amt;
  this.vy += (this.targetY - this.oldY) * this.stepAmt;
  this.oldY = this.targetY;
};

/**
 * Renders the scroll.
 *
 * @return {void}
 * @protected
 */
widgets.SmoothWheel.prototype.render = function() {
  if (this.vy < -(this.minMovement) || this.vy > this.minMovement) {
    this.currentY = (this.currentY + this.vy);
    if (this.currentY > this.maxScrollTop) {
      this.currentY = this.vy = 0;
    } else if (this.currentY < this.minScrollTop) {
      this.vy = 0;
      this.currentY = this.minScrollTop;
    }

    this.dom.scrollTop = -this.currentY;

    this.vy *= this.friction;

    this.dispatch('render');
  }
};

/**
 * Normalizes the wheel delta. Keep a distribution of observed values, and scale by the
 * 33rd percentile.
 *
 * @return {Function}
 */
widgets.SmoothWheel.prototype.normalizeWheelDelta = function() {
  var distribution = [], done = null, scale = 30;
  return function(n) {
    // Zeroes don't count.
    if (n == 0) return n;
    // After 500 samples, we stop sampling and keep current factor.
    if (done != null) return n * done;
    var abs = Math.abs(n);
    // Insert value (sorted in ascending order).
    outer: do { // Just used for break goto
      for (var i = 0; i < distribution.length; i++) {
        if (abs <= distribution[i]) {
          distribution.splice(i, 0, abs);
          break outer;
        }
      }
      distribution.push(abs);
    } while (false);
    // Factor is scale divided by 33rd percentile.
    var factor = scale / distribution[Math.floor(distribution.length / 3)];
    if (distribution.length == 500) done = factor;
    return n * factor;
  };
}();

/**
 * @inheritDoc
 * @override
 */
widgets.SmoothWheel.prototype.listen = function(type, func, obj) {
  switch (type) {
  case 'mousewheel':
    this.addListener(type, func, obj);
    this.dom.addEventListener('mousewheel', this.listeners[type], false);
    this.dom.addEventListener('DOMMouseScroll', this.listeners[type], false);
    return;
  }
  widgets.Base.prototype.listen.call(this, type, func, obj);
};

/**
 * @inheritDoc
 * @override
 */
widgets.SmoothWheel.prototype.unlisten = function(type, func, obj) {
  switch (type) {
  case 'mousewheel':
    this.dom.removeEventListener('DOMMouseScroll', this.listeners[type], false);
    this.dom.removeEventListener('mousewheel', this.listeners[type], false);
    this.removeListener(type, func, obj);
    return;
  }
  widgets.Base.prototype.unlisten.call(this, type, func, obj);
};

/**
 * @inheritDoc
 * @override
 */
widgets.SmoothWheel.prototype.destroy = function() {
  this.unlisten('mousewheel');
  widgets.Base.prototype.destroy.call(this);
};

/**
 * Creates the custom request animate frame in the window object.
 */
window.requestAnimFrame = (function() {
  return window.requestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.mozRequestAnimationFrame ||
  window.oRequestAnimationFrame ||
  window.msRequestAnimationFrame ||
  function(callback) {
    window.setTimeout(callback, 1000 / 60);
  };
})();
