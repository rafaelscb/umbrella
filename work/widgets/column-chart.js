/*=============================================================================

  This file is part of the Umbrella project.
  Copyright (C) The Juston.co Owners - All Rights Reserved.

  For more details, visit http://juston.co/umbrella

=============================================================================*/

/**
 * @fileoverview This file defines the {@code widgets.ColumnChart} class.
 * @author <a href='mailto:bg@juston.co'>The Umbrella Developers</a>
 */

include('widgets/canvas.js');
include('utils/nice-scale.js');
include('utils/number.js');

/**
 * The column chart widget is to be used in reports that require column
 * x bar perspective.
 *
 * @param {Element} dom Root element for the column char widget.
 * @extends {widgets.Canvas}
 * @constructor
 */
widgets.ColumnChart = function(dom) {
  widgets.Canvas.call(this, dom, '2d');
  this.title = 'Hello World';
  this.niceScale = new utils.NiceScale(5);
};
inherit(widgets.ColumnChart, widgets.Canvas);

/**
 * To be used to calculate a nice scale.
 *
 * @type {utils.NiceScale}
 * @protected
 */
widgets.ColumnChart.prototype.niceScale;

/**
 * Nice minimum value.
 *
 * @type {double}
 * @protected
 */
widgets.ColumnChart.prototype.niceMin;

/**
 * Nice maximum value.
 *
 * @type {double}
 * @protected
 */
widgets.ColumnChart.prototype.niceMax;

/**
 * Nice iterator value.
 *
 * @type {double}
 * @protected
 */
widgets.ColumnChart.prototype.niceIt;


/**
 * Title information.
 *
 * @type {string}
 * @public
 */
widgets.ColumnChart.prototype.title;

/**
 * Draws the title.
 *
 * @return {void}
 * @protected
 */
widgets.ColumnChart.prototype.drawTitle = function() {
  var ctx = this.context;
  ctx.font = 'bold 25px Calibri, Arial, Georgia, serif';
  ctx.textAlign = 'center';
  ctx.fillStyle = '#494949';
  ctx.fillText(this.title, this.width/2, 30);
};

/**
 * Resets the scale values.
 *
 * @return {void}
 * @protected
 */
widgets.ColumnChart.prototype.resetScale = function() {
  this.niceScale.reset(0, 80000);
  this.niceMin = this.niceScale.minimum;
  this.niceMax = this.niceScale.maximum;
  this.niceIt = this.niceScale.tickIt;
};

/**
 * Draws the scale lines.
 *
 * @return {void}
 * @protected
 */
widgets.ColumnChart.prototype.drawScaleLines = function() {
  var ctx = this.context;
  this.resetScale();

  var topPos = 30;
  var botPos = this.height - 43;
  var pixelUnit = (botPos - topPos) * this.niceIt / this.niceMax;

  ctx.fillStyle = '#666';
  ctx.strokeStyle = '#afafaf';
  ctx.font = 'normal 13px Calibri, Arial, Georgia, serif';
  ctx.textBaseline = 'middle';
  ctx.textAlign = 'right';
  ctx.lineWidth = 2;

  var metrics = ctx.measureText(numberWithCommas(this.niceMax));
  var lefPos = 20 + metrics.width;
  var rigPos = this.width - 20;

  var val = this.niceMax;

  for (var i = topPos; i <= botPos; i += pixelUnit) {
    ctx.beginPath();
    ctx.fillText(numberWithCommas(val), 10 + metrics.width, i);
    val -= this.niceIt;
    ctx.moveTo(lefPos - 5, i);
    ctx.lineTo(rigPos, i);
    ctx.stroke();
  }

  ctx.beginPath();
  ctx.moveTo(20 + metrics.width, topPos);
  ctx.lineTo(20 + metrics.width, botPos);
  ctx.stroke();

  var tstCols = 5;
  var colUnit = (rigPos - lefPos) / 5;

  ctx.textAlign = 'center';

  var labels = ['Venezuela', 'Saudi', 'Canada', 'Iran', 'Russia'];
  var colors = ['red', 'blue', 'yellow', 'green', '#ccf'];

  val = lefPos - (colUnit / 2);

  var div = (colUnit / 1.15);
  console.log(div);

  for (var i = 0; i < 5; i++) {
    val += colUnit;
    ctx.beginPath();
    ctx.moveTo(val, botPos);
    ctx.lineTo(val, botPos + 5);
    ctx.fillStyle = '#666';
    ctx.fillText(labels[i], val, botPos + 15);
    ctx.stroke();

    ctx.beginPath();
    ctx.fillStyle = colors[i];
    ctx.fillRect(val - (div/2), botPos - 100, div, 100);
    ctx.stroke();
  }
};

/**
 * @inheritDoc
 * @override
 */
widgets.ColumnChart.prototype.draw = function() {
  var ctx = this.context;
  ctx.fillStyle = 'rgb(200, 0, 0)';

  this.drawScaleLines();

  /*
  ctx.beginPath();
  ctx.arc(75, 75, 50, 0, Math.PI*2, true); // Outer circle
  ctx.moveTo(110, 75);
  ctx.arc(75, 75, 35, 0, Math.PI, false); // Mouth (clockwise)
  ctx.moveTo(65, 65);
  ctx.arc(60, 65, 5, 0, Math.PI*2, true); // Left eye
  ctx.moveTo(95, 65);
  ctx.arc(90, 65, 5, 0, Math.PI*2, true); // Right eye
  ctx.stroke();
  */
};
