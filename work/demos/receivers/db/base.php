<?php
/*=============================================================================

  This file is part of the Umbrella project.
  Copyright (C) The Juston.co Owners - All Rights Reserved.

  For more details, visit http://juston.co/umbrella

=============================================================================*/

/**
 * A class to be extended by database classes. A database class should
 * represent the maintenance and structure of one or more entities.
 */
class db_Base {
  static $dbh = false;

  var $errors;

  function __construct() { }
  function connect() {
    if (!self::$dbh) {
      self::$dbh = new PDO('sqlite:'.BASE_PATH.'/DB/DB.sqlite');
      self::$dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    }
  }

  function sqlRead($cols, $joins,
      $query, $group, $order, $p, $rpp, $total, $data=null) {
    $this->connect();

    if ($group) {
      $sqlGroup = "GROUP BY $group";
    } else {
      $sqlGroup = "";
    }

    if ($order) {
      $sqlOrder = "ORDER BY $order";
    } else {
      $sqlOrder = "";
    }

    if ($rpp > 0) {
      $page = ($p - 1) * $rpp;
      $sqlLimit = "LIMIT $page, $rpp";
    } else {
      $sqlLimit = "";
    }

    $rows = self::$dbh->query("
      SELECT $cols FROM $joins
      WHERE $query $sqlGroup
      $sqlOrder $sqlLimit")->fetchAll();
    //$rows = $stmt->fetchAll(PDO::FETCH_ASSOC);

    if ($total) {
      $total = self::$dbh->query("
        SELECT COUNT(*)
        FROM $joins
        WHERE $query")->fetchColumn();
    } else {
      $total = -1;
    }

    return array(
      'rows' => $rows,
      'total' => $total
    );
  }

  function sqlWrite($table, &$data, $query=null) {
    $this->connect();

    $getId = false;
    if (isset($data['id']) && empty($query)) {
      $getId = empty($data['id']);
    }

    $sets = ""; $cols = ""; $vals = "";
    foreach ($data as $k=>$v) {
      if ($getId === true &&
          $k === "id") continue;
      if (!empty($sets)) {
        $sets .= ",";
        $cols .= ",";
        $vals .= ",";
      }
      $sets .= "`$k`=:$k";
      $cols .= "`$k`";
      $vals .= ":$k";
    }

    if ($getId) {
      $sql = "
        INSERT INTO `$table` ($cols)
        VALUES ($vals)";
    } else if (!empty($query)) {
      $sql = "
        UPDATE `$table`
        SET $sets
        WHERE $query";
    } else {
      $sql = "
        INSERT INTO `$table` ($cols)
        VALUES ($vals)
        ON DUPLICATE KEY
        UPDATE $sets";
    }

    $stmt = self::$dbh->prepare($sql);
    foreach ($data as $k=>$v) {
      if ($getId === true &&
          $k === "id") continue;
      $stmt->bindValue(":$k", $v);
    }

    $result = $stmt->execute();
    if ($getId) {
      $data['id'] = self::$dbh->lastInsertId();
    }

    return $result;
  }

  function sqlRemove($table, $data, $query) {
    $this->connect();

    $stmt = self::$dbh->prepare("
      DELETE FROM `$table` WHERE $query");
    $result = $stmt->execute($data);
  }

  function parseQuery($query, $dictionary) {
    $sql = "";

    $statements = array_map('trim', explode(';', $query));
    foreach ($statements as $statement) {
      if (!empty($sql)) {
        $sql .= " AND ";
      }
      $sql .= $this->parseStatement($statement, $dictionary);
    }

    return $sql;
  }

  function parseOrder($order, $dictionary) {
    if ($order) {
      $sql = "";

      foreach ($order as $key=>$dir) {
        $fields = $this->parseFields($key, $dictionary);
        foreach ($fields as $field) {
          if (!empty($sql)) {
            $sql .= ", ";
          }
          $sql .= $field.' '.$dir;
        }
      }
    } else {
      $sql = "1";
    }

    return $sql;
  }

  function parseStatement($statement, $dictionary) {
    if (strpos($statement, '=') === false) {
      $statement = "*=" . $statement;
    }

    $keyValue = array_map('trim', explode('=', $statement));
    $key = $keyValue[0];
    $value = $keyValue[1];

    $fields = $this->parseFields($key, $dictionary);
    $values = $this->parseValue($value);

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

  function parseFields($key, $dictionary) {
    if ($key == "*" || !array_key_exists($key, $dictionary)) {
      $fields = array();
      foreach ($dictionary as $dk=>$dv) {
        $fields = array_merge($fields, $dv);
      }
      return $fields;
    }

    return $dictionary[$key];
  }

  function parseValue($value) {
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

  function validate(&$data, $dictionary) {
    $result = true;
    $iResult = true;
    $isRequired = null;
    $method = "";
    $value = null;

    $this->errors = array();

    foreach ($dictionary as $field=>$constraints) {
      $isRequired = (array_shift($constraints) == "required");
      if (!array_key_exists($field, $data) || $data[$field] == '' /*|| empty($data[$field])*/) {
        $result = $result && !$isRequired;
        if ($isRequired) {
          $this->addError($field, array(
            'message' => 'validate_required_error',
            'args' => array()));
        }
        continue;
      } else {
        $value = $data[$field];
      }
      foreach ($constraints as $constraint) {
        $constraint = explode('_', $constraint);
        $method = "validate_".array_shift($constraint);
        if (!($iResult = $this->$method($value, $constraint))) {
          $error = array(
            'message' => "{$method}_error",
            'args' => $constraint
          );
          $this->addError($field, $error);
        }
        $result = $result && $iResult;
      }
    }
    return $result;
  }

  function validate_integer($value, $args=null) {
    return is_int($value * 1);
  }

  function validate_greaterthan($value, $args=null) {
    return $value > $args[0];
  }

  function validate_greaterthaneq($value, $args=null) {
    return $value >= $args[0];
  }

  function validate_lessthan($value, $args=null) {
    return $value < $args[0];
  }

  function validate_lessthaneq($value, $args=null) {
    return $value <= $args[0];
  }

  function validate_equal($value, $args=null) {
    return $value == $args[0];
  }

  function validate_between($value, $args=null) {
    return $value >= $args[0] && $value <= $args[1];
  }

  function validate_string($value, $args=null) {
    return is_string($value);
  }

  function validate_uppercase($value) {
    return strtoupper($value) == $value;
  }

  function validate_lowercase($value) {
    return strtolower($value) == $value;
  }

  function validate_notnull($value, $args=null) {
    return $value !== null;
  }

  function validate_size($value, $args=null) {
    if (is_string($value)) {
      return strlen($value) <= $args[0];
    } else if (is_array($value)) {
      return count($value) <= $args[0];
    }
    return false;
  }

  function validate_sizestrict($value, $args=null) {
    if (is_string($value)) {
      return strlen($value) == $args[0];
    } else if (is_array($value)) {
      return count($value) == $args[0];
    }
    return false;
  }

  function validate_minimumsize($value, $args=null) {
    if (is_string($value)) {
      return strlen($value) >= $args[0];
    } else if (is_array($value)) {
      return count($value) >= $args[0];
    }
    return false;
  }

  function validate_email($value) {
    $pattern = '/^(("[\w-+\s]+")|([\w-+]+(?:\.[\w-+]+)*)|("[\w-+\s]+")([\w-+]+(?:\.[\w-+]+)*))(@((?:[\w-+]+\.)*\w[\w-+]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][\d]\.|1[\d]{2}\.|[\d]{1,2}\.))((25[0-5]|2[0-4][\d]|1[\d]{2}|[\d]{1,2})\.){2}(25[0-5]|2[0-4][\d]|1[\d]{2}|[\d]{1,2})\]?$)/i';
    return preg_match($pattern, $value) == 1;
  }

  function validate_date($value) {
    $pattern = '/^(19|20)\d\d[- .\/](0[1-9]|1[012])[- .\/](0[1-9]|[12][0-9]|3[01])$/';
    return preg_match($pattern, $value) == 1;
  }

  function validate_enum($value, $options) {
    $options = explode(',', $options[0]);
    for ($i = 0; $i < count($options); $i++) {
      if (strcmp($value, $options[$i]) === 0) return true;
    }
    return false;
  }

  function validate_currency($value) {
    $pattern = '/^\d+(?:\.\d{0,2})$/';
    return preg_match($pattern, $value) == 1;
  }

  function addError($field, $error) {
    if (!isset($this->errors[$field])) {
      $this->errors[$field] = array();
    }
    array_push($this->errors[$field], $error);
  }
}