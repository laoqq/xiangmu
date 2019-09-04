<?php

include "cot.php";

$name = isset($_REQUEST['name']) ? $_REQUEST['name'] : "";
$password = isset($_REQUEST['password']) ? $_REQUEST['password'] : "";

$sql = "UPDATE admin SET apassword = '$password'  WHERE acct='$name' ";
$res = $conn->query($sql);
echo ($res);
// if ($res->num_rows) {
//     echo 1;
// } else {
//     echo 0;
// }
$res->close();
$conn->close();
