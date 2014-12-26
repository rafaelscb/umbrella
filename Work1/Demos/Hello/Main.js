/*=============================================================================

  This file is part of the Umbrella project.
  Copyright (C) The Juston.co Owners - All Rights Reserved.

  For more details, visit http://juston.co/umbrella

=============================================================================*/

/**
 * @fileoverview This file defines the {@code Demos.Hello.Main} class.
 * @author <a href='mailto:bg@juston.co'>The Umbrella Developers</a>
 */

include('Demos/Global/Style.css');
include('Widgets/Application.js');
include('Widgets/Button.js');
include('Widgets/ToggleButton.js');
include('Widgets/Checkbox.js');
include('Widgets/RadioGroup.js');
include('Widgets/Textbox.js');
include('Widgets/Combobox.js');
include('Widgets/Menu.js');
include('Widgets/MenuItem.js');
include('Widgets/MenuSeparator.js');
include('Widgets/Listbox.js');
include('Widgets/Option.js');
include('Widgets/Combobox.js');
include('Widgets/SpinButton.js');
include('Widgets/Select.js');
include('Widgets/MaskedEdit.js');
include('Widgets/DatePicker.js');
include('Widgets/Tree.js');
include('Widgets/TreeItem.js');
include('Widgets/Notif.js');
include('Widgets/Poster.js');
include('Demos/Hello/ToDoAutoComplete.js');
include('Sayings/Base.js');
include('widgets/Canvas.js');
include('Widgets/ColumnChart.js');
include('Widgets/SmoothWheel.js');

/**
 * The main class for the Hello application. The Hello application
 * simply shows a hello message followed by some information about
 * the arguments that were sent.
 *
 * @extends {Widgets.Application}
 * @constructor
 */
Demos.Hello.Main = function() {
  Widgets.Loader.call(this);
}; inherit(Demos.Hello.Main, Widgets.Application);

/**
 * Element where the arguments are written to.
 *
 * @type {Element}
 */
Demos.Hello.Main.prototype.argsArea;

/**
 * Button object.
 *
 * @type {Widgets.Button}
 */
Demos.Hello.Main.prototype.clickHere;

/**
 * Toggle button object.
 *
 * @type {Widgets.Button}
 */
Demos.Hello.Main.prototype.pressHere;

/**
 * Checkbox object.
 *
 * @type {Widgets.Checkbox}
 */
Demos.Hello.Main.prototype.check;

/**
 * Checkbox object 2.
 *
 * @type {Widgets.Checkbox}
 */
Demos.hello.Main.prototype.check2;

/**
 * Checkbox object 3.
 *
 * @type {Widgets.Checkbox}
 */
Demos.Hello.Main.prototype.check3;

/**
 * RadioGroup object.
 *
 * @type {Widgets.RadioGroup}
 */
Demos.Hello.Main.prototype.rgroup;

/**
 * Textbox object.
 *
 * @type {Widgets.Textbox}
 */
Demos.Hello.Main.prototype.txt1;

/**
 * Textbox object 2.
 *
 * @type {Widgets.Textbox}
 */
Demos.Hello.Main.prototype.txt2;

/**
 * Combobox object 1.
 *
 * @type {Widgets.Combobox}
 */
Demos.Hello.Main.prototype.cmb1;

/**
 * It will add a static hello message, with a div to dynamically add
 * the arguments information.
 *
 * @return {void}
 */
Demos.Hello.Main.prototype.flourish = function() {
  Widgets.Application.prototype.flourish.call(this);

  this.dom.innerHTML = "\
  <div id='notif-area'></div>\
  <div id='demo-area'>\
    <div style='margin: 10px'>\
    <h2>Hello from <code>Demos.Hello.*</code></h2>\
    <h3 id='column-chart-area'><code>Widgets.ColumnChart</code></h3>\
    <canvas id='column-chart-container' width='450' height='300' style='border:solid 1px; background-color: white;'></canvas>\
    <h3><code>Widgets.Application</code></h3>\
    <div id='args-area'></div>\
    <h3 id='button-area'><code>Widgets.Button</code> and <code>Widgets.ToggleButton</code></h3>\
    <span id='click-here'></span>\
    <span id='press-here'></span>\
    <h3 id='checkbox-area'><code>Widgets.Checkbox</code></h3>\
    <span id='check'></span>\
    <span id='check2'></span>\
    <span id='check3'></span>\
    <h3 id='radio-area'><code>Widgets.RadioGroup</code> and <code>Widgets.Radio</code></h3>\
    <ul id='rgroup' role='radiogroup' aria-owns='rbutton4 rbutton5' style='list-style: none'>\
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
    </ul>\
    <h3 id='textbox-area'><code>Widgets.Textbox</code></h3>\
    Simple:<br><input type='text' id='txt1'/><br>\
    Multiple:<br><textarea id='txt2'></textarea><br>\
    <h3 id='menu-area'><code>Widgets.Menu</code></h3>\
    <div id='mnu' tabindex='0'></div>\
    <br><br><br><br><br><br>\
    <h3 id='listbox-area'><code>Widgets.Listbox</code></h3>\
    <div id='lstbox' tabindex='0'></div>\
    <h3 id='combobox-area'><code>Widgets.Combobox</code></h3>\
    <div id='cmb'></div>\
    <h3 id='spin-area'><code>Widgets.SpinButton</code></h3>\
    <div id='spin'></div> | <div id='spin2'></div>\
    <h3 id='select-area'><code>Widgets.Select</code></h3>\
    <div id='ddl'></div>\
    <h3 id='masked-edit-area'><code>Widgets.MaskedEdit</code></h3>\
    <div style='margin-bottom: 7px'>Phone (Ex: (999) 999-9999):</div>\
    <input type='text' id='mkedit' style='width: 100px' />\
    <div style='margin-top: 7px; margin-bottom: 7px'>Date (Ex: 12/31/2014):</div>\
    <input type='text' id='mkedit2' style='width: 80px' />\
    <div style='margin-top: 7px; margin-bottom: 7px'>Price (Ex: 1000,00):</div>\
    <input type='text' id='mkedit3' style='width: 70px' />\
    <div style='margin-top: 7px; margin-bottom: 7px'>Currency (Ex: BRL):</div>\
    <input type='text' id='mkedit4' style='width: 30px' />\
    <h3 id='date-picker-area'><code>Widgets.DatePicker</code></h3>\
    <div id='dtp'></div> | <div id='dtp1'></div>\
    <br><h3 id='autocomplete-demo-area' name='autocomplete-demo-area'><code>Widgets.AutoComplete</code></h3>\
    Todo:<br><input type='text' id='ac1'/><br>\
    <h3 id='tree-area' name='tree-area'><code>widgets.Tree</code> and <code>Widgets.TreeItem</code></h3>\
    <div id='ti'></div>\
    <div id='tv'></div>\
    <h3 id='notif-demo-area' name='notif-demo-area'><code>Widgets.Notif</code></h3>\
    <div id='notif-btn'></div>\
    <h3 id='poster-demo-area'><code>Widgets.Poster</code></h3>\
    <div id='poster-btn'></div>&nbsp;<div id='clear-poster-status-btn'></div>\
    <div id='poster-status' style='background: #666; color: #eee; width: 500px; padding: 10px; margin-top: 10px; border: solid 1px #eaa; height: 150px; overflow-y: scroll;'></div>\
    <h3 id='smooth-wheel-demo-area'><code>Widgets.SmoothWheel</code></h3>\
    <div id='wrapper'>\
      <div id='container'>\
        <div id='box1' class='box'></div>\
        <div id='box2' class='box'></div>\
        <div id='box3' class='box'></div>\
      </div>\
    </div>\
    <h3 id='canvas-demo-area'><code>Widgets.Canvas</code></h3>\
    <canvas id='canvas-container' style='width: 500px; height: 400px'></canvas>\
    <br><br><br><br><br>\
    <br><br><br><br><br>\
    </div>\
  </div>";
};

/**
 * Here is where we handle the view loading process.
 *
 * @return {void}
 */
Demos.Hello.Main.prototype.loadView = function(viewName, args) {
  // Hello! We're styling statically, cause it is just a demo
  this.argsArea = document.getElementById('args-area');
  this.argsArea.style.background = 'tomato';
  this.argsArea.style.padding = '10px';
  this.argsArea.innerHTML = '<b>View</b> = ' + viewName + '<br>' +
                            '<b>Arguments</b> = ' + args.toString();

  this.pressHere = new Widgets.ToggleButton('press-here', 'PRESS HERE', false);
  this.pressHere.listen('toggle', function (pressed) {
    console.log('PRESS HERE: ' + pressed);
    console.log(arguments);
  }, this);

  this.check = new Widgets.Checkbox('check', false);
  this.check.listen('change', function () {
    console.log(arguments);
  }, this);

  this.check2 = new Widgets.Checkbox('check2', null);
  this.check2.listen('change', function () {
    var val = this.pressHere.getDisabled();
    this.pressHere.setDisabled(!val);

    val = this.check.getDisabled();
    this.check.setDisabled(!val);

    val = this.rgroup.radios[0].getDisabled();
    this.rgroup.radios[0].setDisabled(!val);

    val = this.txt1.getHidden();
    this.txt1.setHidden(!val);
  }, this);

  this.check3 = new Widgets.Checkbox('check3', true);
  this.check3.listen('change', function () {
    console.log(arguments);
  }, this);

  this.rgroup = new Widgets.RadioGroup('rgroup');
  this.rgroup.listen('change', function (e) {
    console.log(this.rgroup.getOption());
  }, this);

  this.pressHere.setDisabled(true);
  this.check.setDisabled(true);
  this.rgroup.radios[0].setDisabled(true);

  this.txt1 = new Widgets.Textbox('txt1');
  this.txt1.dom.maxLength = 30;
  this.txt1.listen('focus', function (e) {
    console.log('"this" in "txt1" is = ' + this);
  });
  this.txt2 = new Widgets.Textbox('txt2');
  this.txt2.dom.maxLength = 100;
  this.txt2.listen('focus', function (e) {
    console.log('"this" in "txt2" is = ' + this);
  }, this);

  var mnu = new Widgets.Menu('mnu');
  mnu.listen('action', function (item) {
    // do action and close
    console.log(item);
    mnu.reset();
  }, this);
  mnu.listen('mouseover', function (e) {
    // focus to blur later
    mnu.dom.focus();
  }, this);
  mnu.listen('blur', function (e) {
    // just close
    mnu.reset();
  }, this);

  var item = null;
  item = new Widgets.MenuItem('Test1');
  item.dom.id = 'test1';
  mnu.addItem(item);

  item = new Widgets.MenuItem('Test2');
  item.dom.id = 'test2';
  mnu.addItem(item);

  item = new Widgets.MenuSeparator();
  item.dom.id = 'sep1';
  mnu.addItem(item, 2);

  item = new Widgets.MenuItem('Test3');
  item.dom.id = 'test3';
  item.setHasPopup(true);
  mnu.addItem(item);

  item.subMenu.addItem(new Widgets.MenuItem('Sub-Menu1'));
  item.subMenu.addItem(new Widgets.MenuItem('Sub-Menu2'));
  item.subMenu.addItem(new Widgets.MenuItem('Sub-Menu3'));
  item.subMenu.addItem(new Widgets.MenuItem('Sub-Menu4'));

  item.subMenu.items[0].setHasPopup(true);
  item.subMenu.items[0].subMenu.addItem(new Widgets.MenuItem('Sub-Sub-Menu1'));
  item.subMenu.items[0].subMenu.addItem(new Widgets.MenuItem('Sub-Sub-Menu2'));
  item.subMenu.items[0].subMenu.addItem(new Widgets.MenuItem('Sub-Sub-Menu3'));
  item.subMenu.items[0].subMenu.addItem(new Widgets.MenuItem('Sub-Sub-Menu4'));

  this.clickHere = new Widgets.Button('click-here', 'CLICK HERE');
  this.clickHere.listen('click', function () {
    alert('clicked...');
  }, this);

  var opt;
  var lstbox = new Widgets.Listbox('lstbox');

  opt = new Widgets.Option('Option N1');
  opt.dom.id = 'opt1';
  lstbox.addOption(opt);

  opt = new Widgets.Option('Option N2');
  opt.dom.id = 'opt2';
  lstbox.addOption(opt);

  opt = new Widgets.Option('Option N3');
  opt.dom.id = 'opt3';
  lstbox.addOption(opt);

  opt = new Widgets.Option('Option N4');
  opt.dom.id = 'opt4';
  lstbox.addOption(opt);

  opt = new Widgets.Option('Option N5');
  opt.dom.id = 'opt5';
  lstbox.addOption(opt);

  opt = new Widgets.Option('Option N6');
  opt.dom.id = 'opt6';
  lstbox.addOption(opt);

  opt = new Widgets.Option('Option N7');
  opt.dom.id = 'opt7';
  lstbox.addOption(opt);

  opt = new Widgets.Option('Option N8');
  opt.dom.id = 'opt8';
  lstbox.addOption(opt);

  opt = new Widgets.Option('Option N9');
  opt.dom.id = 'opt9';
  lstbox.addOption(opt);

  var cmb = new Widgets.Combobox('cmb', 'list');
  cmb.listen('change', function (obj) {
    console.log(obj.chosen);
  }, this);

  opt = new Widgets.Option('Option N1');
  opt.dom.id = 'opt1';
  cmb.addOption(opt);

  opt = new Widgets.Option('Option N2');
  opt.dom.id = 'opt2';
  cmb.addOption(opt);

  opt = new Widgets.Option('Option N3');
  opt.dom.id = 'opt3';
  cmb.addOption(opt);

  opt = new Widgets.Option('Option N4');
  opt.dom.id = 'opt4';
  cmb.addOption(opt);

  opt = new Widgets.Option('Option N5');
  opt.dom.id = 'opt5';
  cmb.addOption(opt);

  opt = new Widgets.Option('Option N6');
  opt.dom.id = 'opt6';
  cmb.addOption(opt);

  opt = new Widgets.Option('Option N7');
  opt.dom.id = 'opt7';
  cmb.addOption(opt);

  opt = new Widgets.Option('Option N8');
  opt.dom.id = 'opt8';
  cmb.addOption(opt);

  opt = new Widgets.Option('Option N9');
  opt.dom.id = 'opt9';
  cmb.addOption(opt);

  opt = new Widgets.Option('Maria Moraes');
  opt.dom.id = 'opt10';
  cmb.addOption(opt);

  opt = new Widgets.Option('Maria Angela');
  opt.dom.id = 'opt11';
  cmb.addOption(opt);

  opt = new Widgets.Option('Michael Jackson');
  opt.dom.id = 'opt8';
  cmb.addOption(opt);

  opt = new Widgets.Option('Michael Jordan');
  opt.dom.id = 'opt9';
  cmb.addOption(opt);

  spin = new Widgets.SpinButton('spin', -10, 100, 1, 10, 0);
  spin2 = new Widgets.SpinButton('spin2', 0, 100, 0.1, 0.5, 0);

  var ddl = new Widgets.Select('ddl', 0);
  ddl.listen('change', function (obj) {
    //console.log(obj);
  }, this);
  opt = new Widgets.Option('Option N1');
  opt.dom.id = 'opt1';
  ddl.addOption(opt);

  opt = new Widgets.Option('Option N2');
  opt.dom.id = 'opt2';
  ddl.addOption(opt);

  opt = new Widgets.Option('Option N3');
  opt.dom.id = 'opt3';
  ddl.addOption(opt);

  opt = new Widgets.Option('Option N4');
  opt.dom.id = 'opt4';
  ddl.addOption(opt);

  opt = new Widgets.Option('Option N5');
  opt.dom.id = 'opt5';
  ddl.addOption(opt);

  opt = new Widgets.Option('Option N6');
  opt.dom.id = 'opt6';
  ddl.addOption(opt);

  opt = new Widgets.Option('Option N7');
  opt.dom.id = 'opt7';
  ddl.addOption(opt);

  opt = new Widgets.Option('Option N8');
  opt.dom.id = 'opt8';
  ddl.addOption(opt);

  opt = new Widgets.Option('Option N9');
  opt.dom.id = 'opt9';
  ddl.addOption(opt);

  opt = new Widgets.Option('Maria Moraes');
  opt.dom.id = 'opt10';
  ddl.addOption(opt);

  opt = new Widgets.Option('Maria Angela');
  opt.dom.id = 'opt11';
  ddl.addOption(opt);

  opt = new Widgets.Option('Michael Jackson');
  opt.dom.id = 'opt8';
  ddl.addOption(opt);

  opt = new Widgets.Option('Michael Jordan');
  opt.dom.id = 'opt9';
  ddl.addOption(opt, 0);

  // phone number
  var mkedit = new Widgets.MaskedEdit('mkedit', '(###) ###-####');
  // date
  var mkedit2 = new Widgets.MaskedEdit('mkedit2', '##/##/####');
  // amount
  var mkedit3 = new Widgets.MaskedEdit('mkedit3', '$ ####,##');
  // currency
  var mkedit4 = new Widgets.MaskedEdit('mkedit4', 'AAA');

  var dtp = new Widgets.DatePicker('dtp');
  var dtp1 = new Widgets.DatePicker('dtp1');

  var item = null;

  var tv = new Widgets.Tree('tv');
  tv.listen('action', function (e) {
    console.log(e);
  }, this);

  item = new Widgets.TreeItem('Test5');
  item.dom.id = 'test5';
  tv.addItem(item);

  item = new Widgets.TreeItem('Test6');
  item.dom.id = 'test6';
  tv.addItem(item);

  item = new Widgets.TreeItem('Test7', true);
  item.dom.id = 'test7';
  tv.addItem(item);
  var sitem = null;
  item.sub.addItem(sitem = new Widgets.TreeItem('SubTest1'));
  sitem.dom.id = 'subtest1';
  item.sub.addItem(sitem = new Widgets.TreeItem('SubTest2'));
  sitem.dom.id = 'subtest2';
  item.sub.addItem(sitem = new Widgets.TreeItem('SubTest3', true));
  sitem.dom.id = 'subtest3';
  var ssitem = null;
  sitem.sub.addItem(ssitem = new Widgets.TreeItem('SubSubTest1'));
  ssitem.dom.id = 'subsubtest1';
  sitem.sub.addItem(ssitem = new Widgets.TreeItem('SubSubTest2'));
  ssitem.dom.id = 'subsubtest2';

  item = new Widgets.TreeItem('Test8');
  item.dom.id = 'test8';
  tv.addItem(item);

  // Notif

  var notifArea = new Widgets.Notif('notif-area');
  var notifBtn = new Widgets.Button('notif-btn', 'Notify...');
  notifBtn.listen('click', function (e) {
    notifArea.show('Notifying user...');
  }, this);

  // Poster

  var poster = new Widgets.Poster('Receivers/Test.txt');
  var posterStatus = document.getElementById('poster-status');
  var posterBtn = new Widgets.Button('poster-btn', 'Post...');
  posterBtn.listen('click', function (e) {
    poster.post('testing...');
  }, this);
  var clearPosterBtn = new Widgets.Button(
      'clear-poster-status-btn', 'Clear...');
  clearPosterBtn.listen('click', function (e) {
    posterStatus.innerHTML = '';
  }, this);
  poster.listen('response', function (e) {
    posterStatus.innerHTML += '<b>' + e.type + ':</b>' +
        e.target.responseText + '<br>';
  }, this);
  poster.listen('progress', function (e) {
    posterStatus.innerHTML += '<b>' + e.type + ':</b>' +
        e.target.responseText + '<br>';
  }, this);

  // AutoComplete

  var ac1 = new Demos.Hello.TodoAutoComplete('ac1');

  // Canvas

  var canvas = new Widgets.Canvas('canvas-container', '2d');
  canvas.draw();

  // Column Chart

  var columnChart = new Widgets.ColumnChart('column-chart-container');
  columnChart.draw();
};

// ---
var app = new Demos.Hello.Main();