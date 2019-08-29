<?php
include "../api/connect.php";
$sql = isset($_REQUEST['sql']) ? $_REQUEST['sql'] : '';
$res = $conn->query($sql);
echo ($res);
// if ($res) {
//     echo 1;
// } else {
//     echo 0;
// }
$res->close();
$conn->close();
