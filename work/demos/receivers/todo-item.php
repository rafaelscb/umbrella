<?php
/*=============================================================================

  This file is part of the Umbrella project.
  Copyright (C) The Juston.co Owners - All Rights Reserved.

  For more details, visit http://juston.co/umbrella

=============================================================================*/

/**
 * @fileoverview This file contains service rules for the todo_item entity.
 * @author <a href='mailto:bg@juston.co'>The Umbrella Developers</a>
 */

include('db/sql-parser.php');
include('db/base.php');
include('db/todo-item.php');

function read($query, $order, $p, $rpp, $total) {
  static $dictionary = array(
    'id' => array('todo_item.id'),
    'desc' => array('todo_item.description'),
    'status' => array('todo_item.status')
  );

  $dbItem = new db_TodoItem();
  $rows = $dbItem->read($query, $order, $p, $rpp, $dictionary, $total);

  return array(
    'code' => 'OK',
    'message' => $rows
  );
}

function write($id, $desc, $status) {
  $dbItem = new db_TodoItem();
  $data = array(
    'id' => $id,
    'description' => $desc,
    'status' => $status
  );
  $result = $dbItem->write($data);

  return array(
    'code' => 'OK',
    'message' => $data
  );
}

function remove($id) {
  $dbItem = new db_TodoItem();
  $result = $dbItem->remove($id);

  return array(
    'code' => 'OK',
    'message' => $result
  );
}

/**
 * Handles action.
 */
$result = call_user_func_array(
  $_POST['action'], json_decode(stripslashes($_POST['message'])));
if (!$result) {
  $result = array(
    'code' => 'UNKNOWN-ACTION',
    'message' => ''
  );
}

echo json_encode(array(
  'code' => $result['code'],
  'from' => $_POST['to'],
  'action' => $_POST['action'],
  'message' => $result['message']
));
