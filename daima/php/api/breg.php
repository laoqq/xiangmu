<?php
include "../api/connect.php";
$name = isset($_REQUEST['name']) ? $_REQUEST['name'] : '';
$sql = "SELECT * FROM `user`WHERE username='$name'";
echo $name;
$res = $conn->query($sql);
if ($res->n ows > 0) {
    echo 'no';
} else {
    echo 'yes';
}
