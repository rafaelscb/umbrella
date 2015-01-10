/*=============================================================================

  This file is part of the Umbrella project.
  Copyright (C) The Juston.co Owners - All Rights Reserved.

  For more details, visit http://juston.co/umbrella

=============================================================================*/

/**
 * @fileoverview This file defines the {@code Posters.Base} class.
 * @author <a href='mailto:bg@juston.co'>The Umbrella Developers</a>
 */

include('Widgets/Poster.js');

/**
 * In the application level, a poster is the edge between the visual elements
 * and the client/server rules.
 *
 * Normally, we will have the following workflow:
 *   1 - POSTER: Check if the request is in good standing. If it is,
 *       post it to the server.
 *   2 - SERVER: Check if the request is in good standing. If it is,
 *       executes the requested operation and retrieves a response.
 *   3 - POSTER: Digest the response and send it to the caller (most
 *       likely a widget).
 *
 * @param {string} controller The controller that receives the dispatches
 *    the message in the server side.
 * @param {string} application The application name.
 * @extends {Widgets.Poster}
 * @constructor
 */
Posters.Base = function(controller, application) {
  Widgets.Poster.call(this, controller);
  this.application = application;
  this.validations = new Object();
  this.validations['integer'] = this.isInteger;
  this.validations['greaterthan'] = this.isGreaterThan;
  this.validations['greaterthanoreq'] = this.isGreaterThanOrEqual;
  this.validations['lessthan'] = this.isLessThan;
  this.validations['lessthanoreq'] = this.isLessThanOrEq;
  this.validations['equal'] = this.isEqual;
  this.validations['between'] = this.isBetween;
  this.validations['notnull'] = this.isNotNull;
  this.validations['uppercase'] = this.isUpperCase;
  this.validations['lowercase'] = this.isLowerCase;
  this.validations['size'] = this.hasSize;
  this.validations['sizestrict'] = this.hasSizeStrict;
  this.validations['minimumsize'] = this.hasMinimumSize;
  this.validations['email'] = this.isEmail;
  this.validations['enum'] = this.isEnum;
  this.validations['date'] = this.isDate;
  this.validations['datetime'] = this.isDateTime;
  this.validations['currency'] = this.isCurrency;
};
inherit(Posters.Base, Widgets.Poster);

/**
 * The name of the current application.
 *
 * @type {string}
 * @protected
 */
Posters.Base.prototype.application;

/**
 * Constraints. Each action has a set of constraints.
 *
 * @type {Object}
 * @protected
 */
Posters.Base.prototype.constraints;

/**
 * Validations.
 *
 * @type {Object}
 * @protected
 */
Posters.Base.prototype.validations;

/**
 * Errors. Each action can generate errors.
 *
 * @type {Object}
 * @public
 */
Posters.Base.prototype.errors;

/**
 * @inheritDoc
 * @override
 */
Posters.Base.prototype.onResponse = function(e) {
  var pack = {};
  if (e.type == 'load') {
    pack = JSON.parse(e.target.responseText);
  } else {
    pack['code'] = 'REQUEST-ERROR';
    pack['from'] = ''; pack['action'] = '';
    pack['message'] = null;
  }
  this.dispatch('response', pack['code'],
      pack['from'], pack['action'], pack['message']);
};

/**
 * @inheritDoc
 * @override
 */
Posters.Base.prototype.onProgress = function(e) {
  this.dispatch('progress', e.loaded, e.total);
};

/**
 * Formats the message and posts it.
 *
 * @param {string} to The address of the receiver.
 * @param {string} action The action to be called.
 * @param {Object} message The message to be sent.
 * @param {string=} conk The constraint key.
 * @return {void}
 * @public
 */
Posters.Base.prototype.post = function(to, action, message, conk) {
  conk = conk || action;
  this.errors = {};

  if (this.constraints && this.constraints[conk]) {
    if (!this.validate(message, conk)) {
      this.dispatch('response', 'VALIDATION-ERROR',
          to, action, this.errors);
      return;
    }
  }

  Widgets.Poster.prototype.post.call(this, 
      'app=' + this.application +
      '&to=' + to +
      '&action=' + action +
      '&message=' + JSON.stringify(message));
};

/**
 * Validates a set of fields. This is to be used when we want
 * to make sure a message is well formed before we actually
 * post it. The poster doesn't impose anything by default. The
 * caller is free to use it as they wish.
 *
 * @param {Object} data Data to be validated.
 * @param {Object} conk The constraint key to be used.
 * @return {boolean} true if validation passes; false otherwise.
 * @protected
 */
Posters.Base.prototype.validate = function(data, conk) {
  var result = true;
  var iResult = true;
  var isRequired = false;
  var value;

  for (var field in this.constraints[conk]) {
    if (!data.hasOwnProperty(field) || !data[field]) {
      isRequired = this.constraints[conk][field][0] == 'required';
      result = result && !isRequired;
      if (isRequired) {
        this.addError(field, {
          'message': 'validate_required_error',
          'args': []
        });
      }
      continue;
    } else {
      value = data[field];
    }
    iResult = this.validateValue(value, conk, field);
    result = result && iResult;
  }
  return result;
};

/**
 * Validates a given field with its value.
 *
 * @param {*} value Value to be validated.
 * @param {string} conk Constraint key to be used.
 * @param {string} field Field to be used.
 * @return {boolean} true if validation passed; false otherwise.
 * @public
 */
Posters.Base.prototype.validateValue = function(value, conk, field) {
  var rules = this.constraints[conk][field];
  var rule, args, func;
  var result = true, iResult = true;

  if (this.validateValue.caller !== this.validate) {
    this.errors = {};
  }

  for (var i = 1; i < rules.length; i++) {
    args = rules[i].split('_');
    rule = args[0];
    args[0] = value;

    func = this.validations[rule];
    if (!(iResult = func.apply(this, args))) {
      args.shift();
      this.addError(field, {
        'message': 'validate_'+rule+'_error',
        'args': args
      });
    }

    result = result && iResult;
  }
  return result;
};

/**
 * Validates if a value is an integer.
 *
 * @param {*} value The value to be validated.
 * @return {boolean} true if the value is an integer; false otherwise.
 * @protected
 */
Posters.Base.prototype.isInteger = function(value) {
  return value == parseInt(value);
};

/**
 * Validates if a value is greater than some other value.
 *
 * @param {*} value The value to be validated.
 * @param {*} other the other value to be used.
 * @return {boolean} true if the value is greater than the other one;
 *    false otherwise.
 * @protected
 */
Posters.Base.prototype.isGreaterThan = function(value, other) {
  return value > other;
};

/**
 * Validates if a value is greater than or equal some other value.
 *
 * @param {*} value The value to be validated.
 * @param {*} other The other value to be used.
 * @return {boolean} true if the value is greater or equal than the
 *    other one; false otherwise.
 * @protected
 */
Posters.Base.prototype.isGreaterThanOrEqual = function(value, other) {
  return value >= other;
};

/**
 * Validates if a value is less than some other value.
 *
 * @param {*} value The value to be validated.
 * @param {*} other The other value to be used.
 * @return {boolean} true if the value is less than the other one;
 *    false otherwise.
 * @protected
 */
Posters.Base.prototype.isLessThan = function(value, other) {
  return value < other;
};

/**
 * Validates if a value is less than or equal some other value.
 *
 * @param {*} value The value to be validated.
 * @param {*} other The other value to be used.
 * @return {boolean} true if the value is less than or equal than the
 *    other one; false otherwise.
 * @protected
 */
Posters.Base.prototype.isLessThanOrEqual = function(value, other) {
  return value <= other;
};

/**
 * Validates if a value is equal some other value.
 *
 * @param {*} value The value to be validated.
 * @param {*} other The other value to be used.
 * @return {boolean} true if the value is equal the other; false otherwise.
 * @protected
 */
Posters.Base.prototype.isEqual = function(value, other) {
  return value === other;
};

/**
 * Validates if a value is between a min and max.
 *
 * @param {*} value The value to be validated.
 * @param {*} min The minimum value.
 * @param {*} max The maximum value.
 * @return {boolean} true if the value is between the min and max;
 *    false otherwise.
 * @protected
 */
Posters.Base.prototype.isBetween = function(value, min, max) {
  return value >= min && value <= max;
};

/**
 * Validates if a value is a string.
 *
 * @param {*} value The value to be validated.
 * @return {boolean} true if the value is a string; false otherwise.
 * @protected
 */
Posters.Base.prototype.isString = function(value) {
  return (typeof value == 'string' || value instanceof String);
};

/**
 * Validates if a value is an uppercase string.
 *
 * @param {string} value The value to be validated.
 * @return {boolean} true if the value is an uppercase string;
 *    false otherwise.
 * @protected
 */
Posters.Base.prototype.isUpperCase = function(value) {
  return value.toUpperCase() == value;
};

/**
 * Validates if a value is a lowercase string.
 *
 * @param {string} value The value to be validated.
 * @return {boolean} true if the value is a lowercase string;
 *    false otherwise.
 * @protected
 */
Posters.Base.prototype.isLowerCase = function(value) {
  return value.toLowerCase() == value;
};

/**
 * Validates if a value is not null.
 *
 * @param {*} value The value to be validated.
 * @return {boolean} true if the value is not null; false otherwise.
 * @protected
 */
Posters.Base.prototype.isNotNull = function(value) {
  return value != null && value != undefined && value != '';
};

/**
 * Validates if a value has a given size.
 *
 * @param {array|string} value The value to be validated.
 * @param {number} size The size to be compared to.
 * @return {boolean} true if value has the given size; false otherwise.
 * @protected
 */
Posters.Base.prototype.hasSize = function(value, size) {
  if (typeof value.length !== 'undefined') {
    return value.length <= size;
  }
  return false;
};

/**
 * Validates if a value has a given strict size. The value must have the
 * exact size.
 *
 * @param {array|string} value The value to be validated.
 * @param {number} size The size to be compared to.
 * @return {boolean} true if value has the exact size; false otherwise.
 * @protected
 */
Posters.Base.prototype.hasSizeStrict = function(value, size) {
  if (typeof value.length !== 'undefined') {
    return value.length == size;
  }
  return false;
};

/**
 * Validates if a value has a given minimum size. The value must have the
 * exact size.
 *
 * @param {array|string} value The value to be validated.
 * @param {number} size The size to be compared to.
 * @return {boolean} true if value has the minimum size; false otherwise.
 * @protected
 */
Posters.Base.prototype.hasMinimumSize = function(value, size) {
  if (typeof value.length !== 'undefined') {
    return value.length >= size;
  }
  return false;
};

/**
 * Validates if a value is a valid e-mail address.
 *
 * @param {string} value The value to be validated.
 * @return {boolean} true if value is an e-mail address; false otherwise.
 * @protected
 */
Posters.Base.prototype.isEmail = function(value) {
  var pattern = new RegExp(/^(("[\w-+\s]+")|([\w-+]+(?:\.[\w-+]+)*)|("[\w-+\s]+")([\w-+]+(?:\.[\w-+]+)*))(@((?:[\w-+]+\.)*\w[\w-+]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][\d]\.|1[\d]{2}\.|[\d]{1,2}\.))((25[0-5]|2[0-4][\d]|1[\d]{2}|[\d]{1,2})\.){2}(25[0-5]|2[0-4][\d]|1[\d]{2}|[\d]{1,2})\]?$)/i);
  return pattern.test(value);
};

/**
 * Validates if a value is a valid date. We always assume that a correct
 * date has the format YYYY-MM-DD.
 *
 * @param {string} value The value to be validated.
 * @return {boolean} true if value is a date; false otherwise.
 * @protected
 */
Posters.Base.prototype.isDate = function(value) {
  var pattern = new RegExp(/^(19|20)\d\d[- .\/](0[1-9]|1[012])[- .\/](0[1-9]|[12][0-9]|3[01])$/);
  return pattern.test(value);
};

/**
 * Validates if a value is a valid datetime. We always assume that a correct
 * datetime has the format YYYY-MM-DD HH:MM:SS.
 *
 * @param {string} value The value to be validated.
 * @return {boolean} true if value is a date; false otherwise.
 * @protected
 */
Posters.Base.prototype.isDateTime = function(value) {
  var pattern = new RegExp(/^(19|20)\d\d[- .\/](0[1-9]|1[012])[- .\/](0[1-9]|[12][0-9]|3[01])[T ]([01][0-9]|2[0-3]):([0-5][0-9])(:([0-5][0-9]))?$/);
  return pattern.test(value);
};

/**
 * Validates if a value is in a given set of values.
 *
 * @param {string} value The value to be validated.
 * @param {string} options The enum values.
 * @return {boolean} true if in the enum; false otherwise.
 * @protected
 */
Posters.Base.prototype.isEnum = function(value, options) {
  options = options.split(',');
  for (var i = 0; i < options.length; i++) {
    if (value == options[i]) return true;
  }
  return false;
};

/**
 * Validates if a value is a currency number.
 *
 * @param {string} value The value to be validated.
 * @return {boolean} true if it is a currency; false otherwise.
 * @protected
 */
Posters.Base.prototype.isCurrency = function(value) {
  var pattern = /^\d+(?:\.\d{0,2})$/;
  return pattern.test(value);
};

/**
 * Writes an error message to a given field.
 *
 * @param {string} field The name of the field.
 * @param {string} error The error to be used. By default it contains a
 *    message and args.
 * @return {void}
 * @protected
 */
Posters.Base.prototype.addError = function(field, error) {
  if (!this.errors.hasOwnProperty(field)) {
    this.errors[field] = [];
  }
  this.errors[field].push(error);
};
