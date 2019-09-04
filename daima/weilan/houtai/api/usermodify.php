<?php

include "cot.php";
$id = isset($_REQUEST['id']) ? $_REQUEST['id'] : "";
$name = isset($_REQUEST['name']) ? $_REQUEST['name'] : "";
$password = isset($_REQUEST['pd']) ? $_REQUEST['pd'] : "1";
$action = isset($_REQUEST['action']) ? $_REQUEST['action'] : "";
if ($action == 1) {
    $sql = "DELETE FROM user WHERE uid = $id";
} else if ($action == 0) {
    $sql = "UPDATE  user SET uaccount = '$name' , upassword ='$password' WHERE uid = $id";
}
$res = $conn->query($sql);
echo $res;
$conn->close();
