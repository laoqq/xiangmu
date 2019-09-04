<?php

include "cont.php";

$name = isset($_REQUEST['name']) ? $_REQUEST['name'] : "";

$sql = "DELETE FROM shpcart WHERE account='$name'";
$res = $conn->query($sql);

if ($res->num_rows >= 1) {
    echo 1;
} else {
    echo 0;
}
$res->close();
$conn->close();
