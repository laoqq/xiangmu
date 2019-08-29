<?php
include "../api/connect.php";

$sql = isset($_REQUEST['sql']) ? $_REQUEST['sql'] : "";

$res = $conn->query($sql);

if ($res->num_rows >= 1) {
    echo 1;
} else {
    echo 0;
}
$res->close();
$conn->close();
