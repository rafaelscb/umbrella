/*=============================================================================

  This file is part of the Umbrella project.
  Copyright (C) The Juston.co Owners - All Rights Reserved.

  For more details, visit http://juston.co/umbrella

=============================================================================*/

include("Demos/Hello/Common/Panel.js");
include("Widgets/RadioGroup.js");

/**
 * Presents the radio widget.
 *
 * @param {Element} dom The root element for the radio panel.
 * @extends {Demos.Hello.Common.Panel}
 * @constructor
 */
Demos.Hello.Radio.Panel = function(dom) {
  Demos.Hello.Common.Panel.call(this, "Radio", dom);
};
inherit(Demos.Hello.Radio.Panel, Demos.Hello.Common.Panel);

/**
 * Contains the radio group.
 *
 * @type {Widgets.RadioGroup}
 * @protected
 */
Demos.Hello.Radio.Panel.prototype.rgroup;

/**
 * @inheritDoc
 * @override
 */
Demos.Hello.Radio.Panel.prototype.flourish = function() {
  Demos.Hello.Common.Panel.prototype.flourish.call(this);

  var elem;

  elem = document.createElement("ul");
  elem.setAttribute("role", "radiogroup");
  elem.setAttribute("aria-owns", "rbutton4 rbutton5");
  elem.style.listStyle = "none";
  elem.innerHTML = "\
    <li><b>Category 1</b><br><br></li>\
    <li>\
      <span id='rbutton1' role='radio'></span>\
      Option 1\
    </li>\
    <li>\
      <span id='rbutton2' role='radio'></span>\
      Option 2\
    </li>\
    <li>\
      <span id='rbutton3' role='radio'></span>\
      Option 3\
    </li>\
    <li><br><b>Category 2</b><br><br></li>\
    <li>\
      <span id='rbutton4' role='radio'></span>\
      Option 4\
    </li>\
    <li>\
      <span id='rbutton5' role='radio'></span>\
      Option 5\
    </li>\
    <li>\
      <span id='rbutton6' role='radio'></span>\
      Option 6\
    </li>\
  ";
  this.rgroup = new Widgets.RadioGroup(elem);
  this.rgroup.listen("change", this.onRadioGroupChange, this);
  this.container.appendChild(elem);
};

/**
 * Occurs every time the radios are changed.
 *
 * @type {Event} e Event information.
 * @return {void}
 * @protected
 */
Demos.Hello.Radio.Panel.prototype.onRadioGroupChange = function(e) {
  console.log(this.rgroup.getOption());
};
