<?php
/*=============================================================================

  This file is part of the Umbrella project.
  Copyright (C) The Juston.co Owners - All Rights Reserved.

  For more details, visit http://juston.co/umbrella

=============================================================================*/

/**
 * A class that represents the arm_address table with its business rules.
 */
class db_ToDoItem extends db_Base {
  function read($query, $order, $p, $rpp, $total=true) {
    $dictionary = array(
      'id' => array('todo_item.id'),
      'desc' => array('todo_item.description'),
      'status' => array('todo_item.status')
    );

    $pQuery = $this->parseQuery($query, $dictionary);
    $pOrder = $this->parseOrder($order, $dictionary);

    return $this->sqlRead(
      /* Columns */
      "todo_item.id,
       todo_item.description,
       todo_item.status",
      /* Joins,Query */
      "todo_item",
      $pQuery,
      /* Group,Order,Paging,Total */
      false, $pOrder, $p, $rpp, $total);
  }

  function detail($id) {
    return $this->sqlRead(
      /* Columns */
      "todo_item.id,
       todo_item.description,
       todo_item.status",
      /* Joins,Query */
      "todo_item",
      "todo_item.id=:id",
      /* Group,Order,Paging,Total */
      false, false, 0, 0, false,
      /* Data */
      array(':id' => $id));
  }

  function write(&$data) {
    return $this->sqlWrite(
      "todo_item", $data,
      (!empty($data['id']) ? "id = :id" : ""));
  }

  function remove($id) {
    return $this->sqlRemove(
      "todo_item", array('id' => $id), "id = :id");
  }
}

/*=============================================================================

  This file is part of the Umbrella project.
  Copyright (C) The Juston.co Owners - All Rights Reserved.

  For more details, visit http://juston.co/umbrella

=============================================================================*/

/**
 * Database class that represents the todo_item table.
 */
 /*
class db_TodoItem extends db_Base {
  function __construct() {
    $this->sqlColumns = "
      todo_item.id, todo_item.description, todo_item.status";
    $this->sqlTables = "
      todo_item";
    $this->sqlUpdate = "
      UPDATE todo_item
      SET description = :description,
          status = :status
      WHERE id = :id";
    $this->sqlInsert = "
      INSERT INTO todo_item (description, status)
      VALUES (:description, :status)";
    $this->sqlDelete = "
      DELETE FROM todo_item WHERE id = :id";
  }
}
*/
