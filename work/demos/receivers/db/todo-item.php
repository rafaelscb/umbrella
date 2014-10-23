<?php
/*=============================================================================

  This file is part of the Umbrella project.
  Copyright (C) The Juston.co Owners - All Rights Reserved.

  For more details, visit http://juston.co/umbrella

=============================================================================*/

/**
 * Database class that represents the todo_item table.
 */
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
