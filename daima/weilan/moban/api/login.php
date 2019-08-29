<?php

include "cot.php";

$name = isset($_REQUEST['name']) ? $_REQUEST['name'] : "";
$password = isset($_REQUEST['password']) ? $_REQUEST['password'] : "";
$sql = "SELECT * FROM admin WHERE acct= '$name' AND apassword='$password' ";
$res = $conn->query($sql);

if ($res->num_rows >= 1) {
    echo 1;
} else {
    echo 0;
}
$res->close();
$conn->close();
