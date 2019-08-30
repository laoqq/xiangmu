<?php
include 'cont.php';
$id = isset($_REQUEST['id']) ? $_REQUEST['id'] : '';
$sql = "SELECT * FROM book WHERE bookid =$id";
$res = $conn->query($sql);
$cont = $res->fetch_all(MYSQLI_ASSOC);
echo json_encode($cont, JSON_UNESCAPED_UNICODE);
$conn->close();
