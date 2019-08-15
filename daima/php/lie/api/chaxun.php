<?php
include "connect.php";
// $id = isset($_REQUEST['id']) ? $_REQUEST['id'] : '';
$name = isset($_REQUEST['name']) ? $_REQUEST['name'] : '';

$sql = "SELECT * FROM liebiao  WHERE name LIKE '%$name%'";
$res = $conn->query($sql);
$content = $res->fetch_all(MYSQLI_ASSOC); //[{},{},{}]

//把数据传给前端:把数据先转成字符串再传给前端
echo json_encode($content, JSON_UNESCAPED_UNICODE); //防止中文转义

//关闭连接
$res->close(); //关闭结果集
$conn->close();//关闭数据库
