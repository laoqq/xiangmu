<?php

include "cont.php";

$name = isset($_REQUEST['name']) ? $_REQUEST['name'] : "";
$price = isset($_REQUEST['price']) ? $_REQUEST['price'] : "";
$oldprice = isset($_REQUEST['oldprice']) ? $_REQUEST['oldprice'] : "";
$sk = isset($_REQUEST['sk']) ? $_REQUEST['sk'] : "";
$shoppinglist = isset($_REQUEST['shoppinglist']) ? $_REQUEST['shoppinglist'] : "";
if ($sk == 0) {
    $sql = "INSERT INTO shpcart (gid,account,price,oldprice) VALUES('$shoppinglist','$name',$price,$oldprice)";
} else if ($sk == 1) {
    $sql = "UPDATE  shpcart SET gid='$shoppinglist' ,price=$price,oldprice=$oldprice WHERE account='$name'";
}

$res = $conn->query($sql);

if ($res->num_rows >= 1) {
    echo 1;
} else {
    echo 0;
}
$res->close();
$conn->close();
