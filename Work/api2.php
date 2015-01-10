<?php
/*=============================================================================

  This file is part of the Umbrella project.
  Copyright (C) The Juston.co Owners - All Rights Reserved.

  For more details, visit http://juston.co/umbrella

=============================================================================*/

/**
 * @fileoverview This file defines the Umbrella Controller.
 * @author <a href='mailto:bg@juston.co'>The Umbrella Developers</a>
 */

define("BASE_PATH", realpath("./"));

if (!isset($_POST) ||
    !isset($_POST["app"]) ||
    !isset($_POST["to"]) ||
    !isset($_POST["action"]) ||
    !isset($_POST["message"]) ||
    !define("APP_PATH", realpath("./".$_POST["app"])) ||
    !include(BASE_PATH."/".$_POST["app"]."/Receivers/".$_POST["to"].".php")) {
  echo json_encode(array(
    "code" => "REQUEST-ERROR",
    "message" => ""
  ));
}
