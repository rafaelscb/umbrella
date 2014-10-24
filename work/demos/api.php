<?php
/*=============================================================================

  This file is part of the Umbrella project.
  Copyright (C) The Juston.co Owners - All Rights Reserved.

  For more details, visit http://juston.co/umbrella

=============================================================================*/

/**
 * @fileoverview This file defines the controller for the Umbrella demos.
 * @author <a href='mailto:bg@juston.co'>The Umbrella Developers</a>
 */

define('BASE_PATH', realpath("./receivers/")); 

if (!isset($_POST) ||
    !isset($_POST['to']) ||
    !isset($_POST['action']) ||
    !include(BASE_PATH.'/'.$_POST['to'].'.php')) {
  echo json_encode(array(
    'code' => 'REQUEST-ERROR',
    'to' => '', 'action' => '',
    'message' => ''
  ));
}
