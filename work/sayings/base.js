/*=============================================================================

  This file is part of the Umbrella project.
  Copyright (C) The Juston.co Owners - All Rights Reserved.

  For more details, visit http://juston.co/umbrella

=============================================================================*/

/**
 * @fileoverview This file defines the {@code _} function.
 * @author <a href='mailto:bg@juston.co'>The Umbrella Developers</a>
 */

/**
 * Hash table containing the actual sayings.
 *
 * @type {Object}
 * @public
 */
var sayings = new Object();

/**
 * Takes a string and retrieves the respective message for the current
 * language.
 *
 * @param {string} key The key message to be translated, if any.
 * @param {string} lg The language to be used.
 * @return {string} The translated message.
 * @public
 */
function say(key, lg) {
  if (lg == undefined) lg = lang;
  if (sayings.hasOwnProperty(lg) &&
      sayings[lg].hasOwnProperty(key)) {
    return sayings[lg][key];
  }
  return key;
}

/**
 * Adds a new saying message to a given language.
 *
 * @param {string} key The key to access the msg.
 * @param {string} msg The message to be added.
 * @param {string} lg The language to be added to.
 * @return {void} Nothing.
 * @public
 */
function addSay(key, msg, lg) {
  if (lg == undefined) lg = lang;
  if (!sayings.hasOwnProperty(lg)) {
    sayings[lg] = new Object();
  }
  sayings[lg][key] = msg;
}
