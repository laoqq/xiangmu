<?php

include "cont.php";

$name = isset($_REQUEST['name']) ? $_REQUEST['name'] : "";

$sql = "SELECT * FROM  shpcart WHERE account= '$name'";
$res = $conn->query($sql);
$cont = $res->fetch_all(MYSQLI_ASSOC);
echo json_encode($cont, JSON_UNESCAPED_UNICODE);


$res->close();
$conn->close();
