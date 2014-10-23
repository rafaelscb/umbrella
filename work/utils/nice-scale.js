/*=============================================================================

  This file is part of the Umbrella project.
  Copyright (C) The Juston.co Owners - All Rights Reserved.

  For more details, visit http://juston.co/umbrella

=============================================================================*/

/**
 * @fileoverview This file defines the {@code utils.NiceScale} class.
 * @author <a href='mailto:bg@juston.co'>The Umbrella Developers</a>
 */

/**
 * This util class is to be used when we want to get a nice scale. This is to
 * be used with charts and widgets that requires some scale.
 *
 * @param {double} maxTicks The maximum number of ticks.
 * @param {double?} min The minimum value.
 * @param {double?} max The maximum value.
 * @constructor
 */
utils.NiceScale = function(maxTicks, min, max) {
  this.maxTicks = maxTicks || 10; this.maxTicks--;
  this.minimum = this.maximum = this.tickIt = 0;

  if (min && max) {
    this.reset(min, max);
  }
};

/**
 * Contains the maximum number of ticks.
 *
 * @type {double}
 * @protected
 */
utils.NiceScale.prototype.maxTicks;

/**
 * Contains the value that represents the space between
 * ticks.
 *
 * @type {double}
 * @protected
 */
utils.NiceScale.prototype.tickIt;

/**
 * Contains the nice minimum value.
 *
 * @type {double}
 * @protected
 */
utils.NiceScale.prototype.minimum;

/**
 * Contains the nice maximum value.
 *
 * @type {double}
 * @protected
 */
utils.NiceScale.prototype.maximum;

/**
 * Reset the values.
 *
 * @param {double} min The minimum data point on the axis.
 * @param {double} max The maximum data point on the axis.
 * @return {void} Nothing.
 * @public
 */
utils.NiceScale.prototype.reset = function(min, max) {
  this.tickIt = this.niceNum(
      this.niceNum(max - min, false) / (this.maxTicks), true);
  this.mininum = Math.floor(min / this.tickIt) * this.tickIt;
  this.maximum = Math.ceil(max / this.tickIt) * this.tickIt;
};

/**
 * Returns a nice number approximately equal to the range. Rounds the
 * number if round = true; Takes the ceiling if round = false.
 *
 * @param {double} range The data range.
 * @param {boolean} round Whether to round the result.
 * @return {double} A nice number to be used for the data range.
 * @protected
 */
utils.NiceScale.prototype.niceNum = function(range, round) {
  var exponent; /** exponent of range */
  var fraction; /** fractional part of range */
  var niceFraction; /** nice, rounded fraction */

  /* Math.log10(range) = Math.log(range) / Math.LN10 */
  exponent = Math.floor(Math.log(range) / Math.LN10);
  fraction = range / Math.pow(10, exponent);

  if (round) {
    if (fraction < 1.5) niceFraction = 1;
    else if (fraction < 3) niceFraction = 2;
    else if (fraction < 7) niceFraction = 5;
    else niceFraction = 10;
  } else {
    if (fraction <= 1) niceFraction = 1;
    else if (fraction <= 2) niceFraction = 2;
    else if (fraction <= 5) niceFraction = 5;
    else niceFraction = 10;
  }

  return niceFraction * Math.pow(10, exponent);
};
