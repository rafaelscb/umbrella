/*=============================================================================

  This file is part of the Umbrella project.
  Copyright (C) The Juston.co Owners - All Rights Reserved.

  For more details, visit http://juston.co/umbrella

=============================================================================*/

/**
 * @fileoverview This file defines numeric related functions.
 * @author <a href='mailto:bg@juston.co'>The Umbrella Developers</a>
 */

/**
 * Formats the number with commas.
 *
 * @param {number} num Raw number.
 * @return {string} The number with commas.
 */
function numberWithCommas(num) {
  var parts = num.toString().split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return parts.join(".");
};
