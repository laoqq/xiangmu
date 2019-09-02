<?php

include "cont.php";

$name = isset($_REQUEST['name']) ? $_REQUEST['name'] : "";

$shoppinglist = isset($_REQUEST['shoppinglist']) ? $_REQUEST['shoppinglist'] : "";
$sql = "INSERT INTO shpcart (gid,account) VALUES('$shoppinglist','$name')";
$res = $conn->query($sql);

if ($res->num_rows >= 1) {
    echo 1;
} else {
    echo 0;
}
$res->close();
$conn->close();
