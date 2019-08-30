<?php
include "cont.php";

$accution = isset($_REQUEST['accution']) ? $_REQUEST['accution'] : "";
$password = isset($_REQUEST['password']) ? $_REQUEST['password'] : "";
$sql = "INSERT INTO user  (uaccount,upassword) VALUES('$accution','$password')";
$res = $conn->query($sql);

echo ($res);
$res->close();
$conn->close();
