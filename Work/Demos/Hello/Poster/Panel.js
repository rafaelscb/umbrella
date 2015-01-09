/*=============================================================================

  This file is part of the Umbrella project.
  Copyright (C) The Juston.co Owners - All Rights Reserved.

  For more details, visit http://juston.co/umbrella

=============================================================================*/

include("Demos/Hello/Common/Panel.js");
include("Widgets/Poster.js");
include("Widgets/Button.js");

/**
 * Presents the poster widget.
 *
 * @param {Element} dom The root element for the poster panel.
 * @extends {Demos.Hello.Common.Panel}
 * @constructor
 */
Demos.Hello.Poster.Panel = function(dom) {
  Demos.Hello.Common.Panel.call(this, "Poster", dom);
};
inherit(Demos.Hello.Poster.Panel, Demos.Hello.Common.Panel);

/**
 * Contains the poster widget.
 *
 * @type {Widgets.Poster}
 * @protected
 */
Demos.Hello.Poster.Panel.prototype.poster;

/**
 * Contains the button to call the poster.
 *
 * @type {Widgets.Button}
 * @protected
 */
Demos.Hello.Poster.Panel.prototype.submitButton;

/**
 * Contains the button to clear the status information.
 *
 * @type {Widgets.Button}
 * @protected
 */
Demos.Hello.Poster.Panel.prototype.clearButton;

/**
 * Contains the status information.
 *
 * @type {Element}
 * @protected
 */
Demos.Hello.Poster.Panel.prototype.posterStatus;

/**
 * @inheritDoc
 * @override
 */
Demos.Hello.Poster.Panel.prototype.flourish = function() {
  Demos.Hello.Common.Panel.prototype.flourish.call(this);

  this.poster = new Widgets.Poster("Global/Test.txt");
  this.poster.listen("response", this.onPosterResponse, this);
  this.poster.listen("progress", this.onPosterProgress, this);

  var elem;

  elem = document.createElement("div");
  elem.id = "poster-status";
  this.posterStatus = elem;
  this.container.appendChild(elem);

  elem = document.createElement("div");
  this.submitButton = new Widgets.Button(elem, "Post...");
  this.submitButton.listen("click", this.onSubmitButtonClick, this);
  this.container.appendChild(elem);

  elem = document.createElement("div");
  this.clearButton = new Widgets.Button(elem, "Clear...");
  this.clearButton.listen("click", this.onClearButtonClick, this);
  this.container.appendChild(elem);
};

Demos.Hello.Poster.Panel.prototype.onSubmitButtonClick = function(e) {
  this.poster.post("testing...");
};
Demos.Hello.Poster.Panel.prototype.onClearButtonClick = function(e) {
  this.posterStatus.innerHTML = "";
};
Demos.Hello.Poster.Panel.prototype.onPosterResponse = function(e) {
  this.posterStatus.innerHTML += "<b>" + e.type + ":</b>" +
    e.target.responseText + "<br>";
};
Demos.Hello.Poster.Panel.prototype.onPosterProgress = function(e) {
  this.posterStatus.innerHTML += '<b>' + e.type + ':</b>' +
    e.target.responseText + '<br>';
};
