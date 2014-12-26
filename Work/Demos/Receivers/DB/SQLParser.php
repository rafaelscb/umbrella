<?php
/*=============================================================================

  This file is part of the Umbrella project.
  Copyright (C) The Juston.co Owners - All Rights Reserved.

  For more details, visit http://juston.co/umbrella

=============================================================================*/

/**
 * Generates SQL queries based on the user information.
 */
function generateSQLQuery($userQuery, $dictionary) {
  $sql = "";

  $statements = array_map('trim', explode(';', $userQuery));
  foreach ($statements as $statement) {
    if (!empty($sql)) {
      $sql .= " AND ";
    }
    $sql .= resolveStatement($statement, $dictionary);
  }

  return $sql;
}

/**
 * Generates SQL orders based on the user information.
 */
function generateSQLOrder($order, $dictionary) {
  $sql = "";

  foreach ($order as $key=>$dir) {
    $fields = resolveFields($key, $dictionary);
    foreach ($fields as $field) {
      if (!empty($sql)) {
        $sql .= ", ";
      }
      $sql .= $field . ' ' . $dir;
    }
  }

  return $sql;
}

function resolveStatement($statement, $dictionary) {
  if (strpos($statement, '=') === FALSE) {
    $statement = "*=" . $statement;
  }

  $keyValue = array_map('trim', explode('=', $statement));
  $key = $keyValue[0];
  $value = $keyValue[1];

  $fields = resolveFields($key, $dictionary);
  $values = resolveValue($value);

  $statement = "";
  foreach ($fields as $field) {
    foreach ($values as $value) {
      if (empty($statement)) {
        $statement .= "(";
      } else {
        $statement .= " OR ";
      }
      $statement .= $field . $value;
    }
  }

  if (!empty($statement)) {
    $statement .= ")";
  } else {
    $statement .= "(TRUE)";
  }

  return $statement;
}

function resolveFields($key, $dictionary) {
  if ($key == "*" || !array_key_exists($key, $dictionary)) {
    $fields = array();
    foreach ($dictionary as $dk=>$dv) {
      $fields = array_merge($fields, $dv);
    }
    return $fields;
  }

  return $dictionary[$key];
}

function resolveValue($value) {
  $isNot = false;
  $isLike = false;

  $value = str_replace(array("'", '"', "\\"), "", $value);
  $value = array_map('trim', explode(',', $value));

  $values = array();

  foreach ($value as $val) {
    if (!empty($val)) {
      if ($val[0] === '|') {
        $isNot = true;
        $val = substr($val, 1);
      }

      if (strpos($val, '*') !== false) {
        $isLike = true;
        $val = str_replace('*', '%', $val);
      }

      if ($isNot && $isLike) {
        $val = " NOT LIKE '$val'";
      } else if ($isNot && !$isLike) {
        $val = " != '$val'";
      } else if (!$isNot && $isLike) {
        $val = " LIKE '$val'";
      } else {
        $val = " = '$val'";
      }

      $values[] = $val;
    }
  }

  return $values;
}
