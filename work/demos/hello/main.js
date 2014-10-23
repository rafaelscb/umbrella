/*=============================================================================

  This file is part of the Umbrella project.
  Copyright (C) The Juston.co Owners - All Rights Reserved.

  For more details, visit http://juston.co/umbrella

=============================================================================*/

/**
 * @fileoverview This file defines the {@code demos.hello.Main} class.
 * @author <a href='mailto:bg@juston.co'>The Umbrella Developers</a>
 */

include('demos/assets/style.css');
include('widgets/application.js');
include('widgets/button.js');
include('widgets/toggle-button.js');
include('widgets/checkbox.js');
include('widgets/radio-group.js');
include('widgets/textbox.js');
include('widgets/combobox.js');
include('widgets/menu.js');
include('widgets/menu-item.js');
include('widgets/menu-separator.js');
include('widgets/listbox.js');
include('widgets/option.js');
include('widgets/combobox.js');
include('widgets/spin-button.js');
include('widgets/select.js');
include('widgets/masked-edit.js');
include('widgets/date-picker.js');
include('widgets/tree.js');
include('widgets/tree-item.js');
include('widgets/notif.js');
include('widgets/poster.js');
include('demos/hello/todo-ac.js');
include('sayings/base.js');
include('widgets/canvas.js');
include('widgets/column-chart.js');
include('widgets/smooth-wheel.js');

/**
 * The main class for the Hello application. The Hello application
 * simply shows a hello message followed by some information about
 * the arguments that were sent.
 *
 * @extends {widgets.Application}
 * @constructor
 */
demos.hello.Main = function() {
  widgets.Loader.call(this);
};
inherit(demos.hello.Main, widgets.Application);

/**
 * Element where the arguments are written to.
 *
 * @type {Element}
 */
demos.hello.Main.prototype.argsArea;

/**
 * Button object.
 *
 * @type {widgets.Button}
 */
demos.hello.Main.prototype.clickHere;

/**
 * Toggle button object.
 *
 * @type {widgets.Button}
 */
demos.hello.Main.prototype.pressHere;

/**
 * Checkbox object.
 *
 * @type {widgets.Checkbox}
 */
demos.hello.Main.prototype.check;

/**
 * Checkbox object 2.
 *
 * @type {widgets.Checkbox}
 */
demos.hello.Main.prototype.check2;

/**
 * Checkbox object 3.
 *
 * @type {widgets.Checkbox}
 */
demos.hello.Main.prototype.check3;

/**
 * RadioGroup object.
 *
 * @type {widgets.RadioGroup}
 */
demos.hello.Main.prototype.rgroup;

/**
 * Textbox object.
 *
 * @type {widgets.Textbox}
 */
demos.hello.Main.prototype.txt1;

/**
 * Textbox object 2.
 *
 * @type {widgets.Textbox}
 */
demos.hello.Main.prototype.txt2;

/**
 * Combobox object 1.
 *
 * @type {widgets.Combobox}
 */
demos.hello.Main.prototype.cmb1;

/**
 * It will add a static hello message, with a div to dynamically add
 * the arguments information.
 *
 * @return {void}
 */
demos.hello.Main.prototype.flourish = function() {
  widgets.Application.prototype.flourish.call(this);

  this.dom.innerHTML = "\
  <div id='notif-area'></div>\
  <div id='demo-area'>\
    <div style='margin: 10px'>\
    <h2>Hello from <code>demos.hello.*</code></h2>\
    <h3 id='column-chart-area'><code>widgets.ColumnChart</code></h3>\
    <canvas id='column-chart-container' width='450' height='300' style='border:solid 1px; background-color: white;'></canvas>\
    <h3><code>widgets.Application</code></h3>\
    <div id='args-area'></div>\
    <h3 id='button-area'><code>widgets.Button</code> and <code>widgets.ToggleButton</code></h3>\
    <span id='click-here'></span>\
    <span id='press-here'></span>\
    <h3 id='checkbox-area'><code>widgets.Checkbox</code></h3>\
    <span id='check'></span>\
    <span id='check2'></span>\
    <span id='check3'></span>\
    <h3 id='radio-area'><code>widgets.RadioGroup</code> and <code>widgets.Radio</code></h3>\
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
    <h3 id='textbox-area'><code>widgets.Textbox</code></h3>\
    Simple:<br><input type='text' id='txt1'/><br>\
    Multiple:<br><textarea id='txt2'></textarea><br>\
    <h3 id='menu-area'><code>widgets.Menu</code></h3>\
    <div id='mnu' tabindex='0'></div>\
    <br><br><br><br><br><br>\
    <h3 id='listbox-area'><code>widgets.Listbox</code></h3>\
    <div id='lstbox' tabindex='0'></div>\
    <h3 id='combobox-area'><code>widgets.Combobox</code></h3>\
    <div id='cmb'></div>\
    <h3 id='spin-area'><code>widgets.SpinButton</code></h3>\
    <div id='spin'></div> | <div id='spin2'></div>\
    <h3 id='select-area'><code>widgets.Select</code></h3>\
    <div id='ddl'></div>\
    <h3 id='masked-edit-area'><code>widgets.MaskedEdit</code></h3>\
    <div style='margin-bottom: 7px'>Phone (Ex: (999) 999-9999):</div>\
    <input type='text' id='mkedit' style='width: 100px' />\
    <div style='margin-top: 7px; margin-bottom: 7px'>Date (Ex: 12/31/2014):</div>\
    <input type='text' id='mkedit2' style='width: 80px' />\
    <div style='margin-top: 7px; margin-bottom: 7px'>Price (Ex: 1000,00):</div>\
    <input type='text' id='mkedit3' style='width: 70px' />\
    <div style='margin-top: 7px; margin-bottom: 7px'>Currency (Ex: BRL):</div>\
    <input type='text' id='mkedit4' style='width: 30px' />\
    <h3 id='date-picker-area'><code>widgets.DatePicker</code></h3>\
    <div id='dtp'></div> | <div id='dtp1'></div>\
    <br><h3 id='autocomplete-demo-area' name='autocomplete-demo-area'><code>widgets.AutoComplete</code></h3>\
    Todo:<br><input type='text' id='ac1'/><br>\
    <h3 id='tree-area' name='tree-area'><code>widgets.Tree</code> and <code>widgets.TreeItem</code></h3>\
    <div id='ti'></div>\
    <div id='tv'></div>\
    <h3 id='notif-demo-area' name='notif-demo-area'><code>widgets.Notif</code></h3>\
    <div id='notif-btn'></div>\
    <h3 id='poster-demo-area'><code>widgets.Poster</code></h3>\
    <div id='poster-btn'></div>&nbsp;<div id='clear-poster-status-btn'></div>\
    <div id='poster-status' style='background: #666; color: #eee; width: 500px; padding: 10px; margin-top: 10px; border: solid 1px #eaa; height: 150px; overflow-y: scroll;'></div>\
    <h3 id='smooth-wheel-demo-area'><code>widgets.SmoothWheel</code></h3>\
    <div id='wrapper'>\
      <div id='container'>\
        <div id='box1' class='box'></div>\
        <div id='box2' class='box'></div>\
        <div id='box3' class='box'></div>\
      </div>\
    </div>\
    <h3 id='canvas-demo-area'><code>widgets.Canvas</code></h3>\
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
demos.hello.Main.prototype.loadView = function(viewName, args) {
  // Hello! We're styling statically, cause it is just a demo
  this.argsArea = document.getElementById('args-area');
  this.argsArea.style.background = 'tomato';
  this.argsArea.style.padding = '10px';
  this.argsArea.innerHTML = '<b>View</b> = ' + viewName + '<br>' +
                            '<b>Arguments</b> = ' + args.toString();

  this.pressHere = new widgets.ToggleButton('press-here', 'PRESS HERE', false);
  this.pressHere.listen('toggle', function (pressed) {
    console.log('PRESS HERE: ' + pressed);
    console.log(arguments);
  }, this);

  this.check = new widgets.Checkbox('check', false);
  this.check.listen('change', function () {
    console.log(arguments);
  }, this);

  this.check2 = new widgets.Checkbox('check2', null);
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

  this.check3 = new widgets.Checkbox('check3', true);
  this.check3.listen('change', function () {
    console.log(arguments);
  }, this);

  this.rgroup = new widgets.RadioGroup('rgroup');
  this.rgroup.listen('change', function (e) {
    console.log(this.rgroup.getOption());
  }, this);

  this.pressHere.setDisabled(true);
  this.check.setDisabled(true);
  this.rgroup.radios[0].setDisabled(true);

  this.txt1 = new widgets.Textbox('txt1');
  this.txt1.dom.maxLength = 30;
  this.txt1.listen('focus', function (e) {
    console.log('"this" in "txt1" is = ' + this);
  });
  this.txt2 = new widgets.Textbox('txt2');
  this.txt2.dom.maxLength = 100;
  this.txt2.listen('focus', function (e) {
    console.log('"this" in "txt2" is = ' + this);
  }, this);

  var mnu = new widgets.Menu('mnu');
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
  item = new widgets.MenuItem('Test1');
  item.dom.id = 'test1';
  mnu.addItem(item);

  item = new widgets.MenuItem('Test2');
  item.dom.id = 'test2';
  mnu.addItem(item);

  item = new widgets.MenuSeparator();
  item.dom.id = 'sep1';
  mnu.addItem(item, 2);

  item = new widgets.MenuItem('Test3');
  item.dom.id = 'test3';
  item.setHasPopup(true);
  mnu.addItem(item);

  item.subMenu.addItem(new widgets.MenuItem('Sub-Menu1'));
  item.subMenu.addItem(new widgets.MenuItem('Sub-Menu2'));
  item.subMenu.addItem(new widgets.MenuItem('Sub-Menu3'));
  item.subMenu.addItem(new widgets.MenuItem('Sub-Menu4'));

  item.subMenu.items[0].setHasPopup(true);
  item.subMenu.items[0].subMenu.addItem(new widgets.MenuItem('Sub-Sub-Menu1'));
  item.subMenu.items[0].subMenu.addItem(new widgets.MenuItem('Sub-Sub-Menu2'));
  item.subMenu.items[0].subMenu.addItem(new widgets.MenuItem('Sub-Sub-Menu3'));
  item.subMenu.items[0].subMenu.addItem(new widgets.MenuItem('Sub-Sub-Menu4'));

  this.clickHere = new widgets.Button('click-here', 'CLICK HERE');
  this.clickHere.listen('click', function () {
    alert('clicked...');
  }, this);

  var opt;
  var lstbox = new widgets.Listbox('lstbox');

  opt = new widgets.Option('Option N1');
  opt.dom.id = 'opt1';
  lstbox.addOption(opt);

  opt = new widgets.Option('Option N2');
  opt.dom.id = 'opt2';
  lstbox.addOption(opt);

  opt = new widgets.Option('Option N3');
  opt.dom.id = 'opt3';
  lstbox.addOption(opt);

  opt = new widgets.Option('Option N4');
  opt.dom.id = 'opt4';
  lstbox.addOption(opt);

  opt = new widgets.Option('Option N5');
  opt.dom.id = 'opt5';
  lstbox.addOption(opt);

  opt = new widgets.Option('Option N6');
  opt.dom.id = 'opt6';
  lstbox.addOption(opt);

  opt = new widgets.Option('Option N7');
  opt.dom.id = 'opt7';
  lstbox.addOption(opt);

  opt = new widgets.Option('Option N8');
  opt.dom.id = 'opt8';
  lstbox.addOption(opt);

  opt = new widgets.Option('Option N9');
  opt.dom.id = 'opt9';
  lstbox.addOption(opt);

  var cmb = new widgets.Combobox('cmb', 'list');
  cmb.listen('change', function (obj) {
    console.log(obj.chosen);
  }, this);

  opt = new widgets.Option('Option N1');
  opt.dom.id = 'opt1';
  cmb.addOption(opt);

  opt = new widgets.Option('Option N2');
  opt.dom.id = 'opt2';
  cmb.addOption(opt);

  opt = new widgets.Option('Option N3');
  opt.dom.id = 'opt3';
  cmb.addOption(opt);

  opt = new widgets.Option('Option N4');
  opt.dom.id = 'opt4';
  cmb.addOption(opt);

  opt = new widgets.Option('Option N5');
  opt.dom.id = 'opt5';
  cmb.addOption(opt);

  opt = new widgets.Option('Option N6');
  opt.dom.id = 'opt6';
  cmb.addOption(opt);

  opt = new widgets.Option('Option N7');
  opt.dom.id = 'opt7';
  cmb.addOption(opt);

  opt = new widgets.Option('Option N8');
  opt.dom.id = 'opt8';
  cmb.addOption(opt);

  opt = new widgets.Option('Option N9');
  opt.dom.id = 'opt9';
  cmb.addOption(opt);

  opt = new widgets.Option('Maria Moraes');
  opt.dom.id = 'opt10';
  cmb.addOption(opt);

  opt = new widgets.Option('Maria Angela');
  opt.dom.id = 'opt11';
  cmb.addOption(opt);

  opt = new widgets.Option('Michael Jackson');
  opt.dom.id = 'opt8';
  cmb.addOption(opt);

  opt = new widgets.Option('Michael Jordan');
  opt.dom.id = 'opt9';
  cmb.addOption(opt);

  spin = new widgets.SpinButton('spin', -10, 100, 1, 10, 0);
  spin2 = new widgets.SpinButton('spin2', 0, 100, 0.1, 0.5, 0);

  var ddl = new widgets.Select('ddl', 0);
  ddl.listen('change', function (obj) {
    //console.log(obj);
  }, this);
  opt = new widgets.Option('Option N1');
  opt.dom.id = 'opt1';
  ddl.addOption(opt);

  opt = new widgets.Option('Option N2');
  opt.dom.id = 'opt2';
  ddl.addOption(opt);

  opt = new widgets.Option('Option N3');
  opt.dom.id = 'opt3';
  ddl.addOption(opt);

  opt = new widgets.Option('Option N4');
  opt.dom.id = 'opt4';
  ddl.addOption(opt);

  opt = new widgets.Option('Option N5');
  opt.dom.id = 'opt5';
  ddl.addOption(opt);

  opt = new widgets.Option('Option N6');
  opt.dom.id = 'opt6';
  ddl.addOption(opt);

  opt = new widgets.Option('Option N7');
  opt.dom.id = 'opt7';
  ddl.addOption(opt);

  opt = new widgets.Option('Option N8');
  opt.dom.id = 'opt8';
  ddl.addOption(opt);

  opt = new widgets.Option('Option N9');
  opt.dom.id = 'opt9';
  ddl.addOption(opt);

  opt = new widgets.Option('Maria Moraes');
  opt.dom.id = 'opt10';
  ddl.addOption(opt);

  opt = new widgets.Option('Maria Angela');
  opt.dom.id = 'opt11';
  ddl.addOption(opt);

  opt = new widgets.Option('Michael Jackson');
  opt.dom.id = 'opt8';
  ddl.addOption(opt);

  opt = new widgets.Option('Michael Jordan');
  opt.dom.id = 'opt9';
  ddl.addOption(opt, 0);

  // phone number
  var mkedit = new widgets.MaskedEdit('mkedit', '(###) ###-####');
  // date
  var mkedit2 = new widgets.MaskedEdit('mkedit2', '##/##/####');
  // amount
  var mkedit3 = new widgets.MaskedEdit('mkedit3', '$ ####,##');
  // currency
  var mkedit4 = new widgets.MaskedEdit('mkedit4', 'AAA');

  var dtp = new widgets.DatePicker('dtp');
  var dtp1 = new widgets.DatePicker('dtp1');

  var item = null;

  var tv = new widgets.Tree('tv');
  tv.listen('action', function (e) {
    console.log(e);
  }, this);

  item = new widgets.TreeItem('Test5');
  item.dom.id = 'test5';
  tv.addItem(item);

  item = new widgets.TreeItem('Test6');
  item.dom.id = 'test6';
  tv.addItem(item);

  item = new widgets.TreeItem('Test7', true);
  item.dom.id = 'test7';
  tv.addItem(item);
  var sitem = null;
  item.sub.addItem(sitem = new widgets.TreeItem('SubTest1'));
  sitem.dom.id = 'subtest1';
  item.sub.addItem(sitem = new widgets.TreeItem('SubTest2'));
  sitem.dom.id = 'subtest2';
  item.sub.addItem(sitem = new widgets.TreeItem('SubTest3', true));
  sitem.dom.id = 'subtest3';
  var ssitem = null;
  sitem.sub.addItem(ssitem = new widgets.TreeItem('SubSubTest1'));
  ssitem.dom.id = 'subsubtest1';
  sitem.sub.addItem(ssitem = new widgets.TreeItem('SubSubTest2'));
  ssitem.dom.id = 'subsubtest2';

  item = new widgets.TreeItem('Test8');
  item.dom.id = 'test8';
  tv.addItem(item);

  // Notif

  var notifArea = new widgets.Notif('notif-area');
  var notifBtn = new widgets.Button('notif-btn', 'Notify...');
  notifBtn.listen('click', function (e) {
    notifArea.show('Notifying user...');
  }, this);

  // Poster

  var poster = new widgets.Poster('receivers/test.txt');
  var posterStatus = document.getElementById('poster-status');
  var posterBtn = new widgets.Button('poster-btn', 'Post...');
  posterBtn.listen('click', function (e) {
    poster.post('testing...');
  }, this);
  var clearPosterBtn = new widgets.Button(
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

  var ac1 = new demos.hello.TodoAc('ac1');

  // Canvas

  var canvas = new widgets.Canvas('canvas-container', '2d');
  canvas.draw();

  // Column Chart

  var columnChart = new widgets.ColumnChart('column-chart-container');
  columnChart.draw();
};

// ---
var app = new demos.hello.Main();