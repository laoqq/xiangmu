<?php
include "cont.php";
$name = isset($_REQUEST['name']) ? $_REQUEST['name'] : '';
$password = isset($_REQUEST['password']) ? $_REQUEST['password'] : '';
if ($password == '') {
    $sql = "SELECT * FROM `user` WHERE username='$name' and userpassword='$password' ";
}
$res = $conn->query($sql);
$arr = $res->fetch_all(MYSQLI_ASSOC);
if ($res->num_rows >= 1) {
    echo 1;
} else {
    echo 0;
}

$conn->close();
