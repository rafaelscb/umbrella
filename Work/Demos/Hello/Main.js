/*=============================================================================

  This file is part of the Umbrella project.
  Copyright (C) The Juston.co Owners - All Rights Reserved.

  For more details, visit http://juston.co/umbrella

=============================================================================*/

include("Demos/Global/Reset.css");
include("Demos/Global/Style.css");
include("Widgets/Application.js");
// Panels...
include("Demos/Hello/Button/Panel.js");
include("Demos/Hello/Checkbox/Panel.js");
include("Demos/Hello/Radio/Panel.js");
include("Demos/Hello/Textbox/Panel.js");
include("Demos/Hello/Menu/Panel.js");
include("Demos/Hello/Listbox/Panel.js");
include("Demos/Hello/Combobox/Panel.js");
include("Demos/Hello/SpinButton/Panel.js");
include("Demos/Hello/Select/Panel.js");
include("Demos/Hello/MaskedEdit/Panel.js");
include("Demos/Hello/DatePicker/Panel.js");
include("Demos/Hello/Tree/Panel.js");
include("Demos/Hello/Notif/Panel.js");
include("Demos/Hello/Poster/Panel.js");

/**
 * The main class for the Demos/Hello application. The Hello application
 * simply shows a hello message followed by some information about the
 * arguments that were sent.
 *
 * @extends {Widgets.Application}
 * @constructor
 */
Demos.Hello.Main = function() {
  Widgets.Application.call(this);
};
inherit(Demos.Hello.Main, Widgets.Application);

/**
 * Contains the collection of panels.
 *
 * @type {Array.<Demos.Hello.Common.Panel>}
 * @protected
 */
Demos.Hello.Main.prototype.panels;

/**
 * @inheritDoc
 * @override
 */
Demos.Hello.Main.prototype.flourish = function() {
  this.dom.className = "app";

  var elem;

  elem = document.createElement("div");
  elem.style.width = "400px";
  elem.style.marginBottom = "20px";
  elem.innerHTML = "\
    <a href='#button'>Button</a>, <a href='#checkbox'>Checkbox</a>,\
    <a href='#radio'>Radio</a>, <a href='#textbox'>Textbox</a>,\
    <a href='#menu'>Menu</a>, <a href='#listbox'>Listbox</a>,\
    <a href='#combobox'>Combobox</a>, <a href='#spinbutton'>Spin Button</a>,\
    <a href='#select'>Select</a>, <a href='#maskededit'>Masked Edit</a>,\
    <a href='#datepicker'>Date Picker</a>, <a href='#tree'>Tree</a>,\
    <a href='#notif'>Notif</a>, <a href='#poster'>Poster</a>,\
  ";
  this.dom.appendChild(elem);

  this.panels = new Array();

  elem = document.createElement("div");
  elem.id = "button";
  this.panels.push(new Demos.Hello.Button.Panel(elem));
  this.dom.appendChild(elem);

  var elem = document.createElement("div");
  elem.id = "checkbox";
  this.panels.push(new Demos.Hello.Checkbox.Panel(elem));
  this.dom.appendChild(elem);

  var elem = document.createElement("div");
  elem.id = "radio";
  this.panels.push(new Demos.Hello.Radio.Panel(elem));
  this.dom.appendChild(elem);

  var elem = document.createElement("div");
  elem.id = "textbox";
  this.panels.push(new Demos.Hello.Textbox.Panel(elem));
  this.dom.appendChild(elem);

  var elem = document.createElement("div");
  elem.id = "menu";
  elem.style.height = "115px";
  this.panels.push(new Demos.Hello.Menu.Panel(elem));
  this.dom.appendChild(elem);

  var elem = document.createElement("div");
  elem.id = "listbox";
  this.panels.push(new Demos.Hello.Listbox.Panel(elem));
  this.dom.appendChild(elem);

  var elem = document.createElement("div");
  elem.id = "combobox";
  this.panels.push(new Demos.Hello.Combobox.Panel(elem));
  this.dom.appendChild(elem);

  var elem = document.createElement("div");
  elem.id = "spinbutton";
  this.panels.push(new Demos.Hello.SpinButton.Panel(elem));
  this.dom.appendChild(elem);

  var elem = document.createElement("div");
  elem.id = "select";
  this.panels.push(new Demos.Hello.Select.Panel(elem));
  this.dom.appendChild(elem);

  var elem = document.createElement("div");
  elem.id = "maskededit";
  this.panels.push(new Demos.Hello.MaskedEdit.Panel(elem));
  this.dom.appendChild(elem);

  var elem = document.createElement("div");
  elem.id = "datepicker";
  this.panels.push(new Demos.Hello.DatePicker.Panel(elem));
  this.dom.appendChild(elem);

  var elem = document.createElement("div");
  elem.id = "tree";
  this.panels.push(new Demos.Hello.Tree.Panel(elem));
  this.dom.appendChild(elem);

  var elem = document.createElement("div");
  elem.id = "notif";
  this.panels.push(new Demos.Hello.Notif.Panel(elem));
  this.dom.appendChild(elem);

  var elem = document.createElement("div");
  elem.id = "poster";
  this.panels.push(new Demos.Hello.Poster.Panel(elem));
  this.dom.appendChild(elem);
};

/**
 * @inheritDoc
 * @override
 */
Demos.Hello.Main.prototype.load = function() {
  var section = this.pageName ? this.pageName : "button";

  for (var i = 0; i < this.panels.length; i++) {
    this.panels[i].setHidden(section != this.panels[i].dom.id);
  }
};

// ---
var app = new Demos.Hello.Main();
