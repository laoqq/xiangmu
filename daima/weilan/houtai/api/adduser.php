<?php

include "cot.php";
$required = isset($_REQUEST['required']) ? $_REQUEST['required'] : "";
$accution = isset($_REQUEST['accution']) ? $_REQUEST['accution'] : "";
$password = isset($_REQUEST['password']) ? $_REQUEST['password'] : "";
$sql = "INSERT INTO admin (aname,acct,apassword) VALUES('$required','$accution','$password')";
$res = $conn->query($sql);

echo ($res);
$res->close();
$conn->close();
