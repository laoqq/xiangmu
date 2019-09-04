<?php
include 'cot.php';
$mun = isset($_REQUEST['mun']) ? $_REQUEST['mun'] : "";
$pages = isset($_REQUEST['pages']) ? $_REQUEST['pages'] : "";
$index = ($mun - 1) * $pages;

$sql1 = "SELECT * FROM user LIMIT $index,$pages";
$sql2 = "SELECT * FROM user ";
$res1 = $conn->query($sql1);
$res2 = $conn->query($sql2);
$cont = $res1->fetch_all(MYSQLI_ASSOC);
$data = array(
    'data' => $cont,
    'total' => $res2->num_rows
);
echo json_encode($data, JSON_UNESCAPED_UNICODE);
$conn->close();//关闭数据库
