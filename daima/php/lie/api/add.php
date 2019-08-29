<?php
header('Content-type:text/html;charset=utf-8'); //防止中文乱码
$page = isset($_REQUEST['page']) ? $_REQUEST['page'] : ''; //页数，哪一页
$num = isset($_REQUEST['num']) ? $_REQUEST['num'] : '';
$data = isset($_REQUEST['data']) ? $_REQUEST['data'] : '';
$index = ($page - 1) * $num;
include "connect.php";
// $id = isset($_REQUEST['id']) ? $_REQUEST['id'] : '';
$sql = "SELECT * FROM liebiao  ORDER BY liebiao.price $data LIMIT $index,$num";
$res = $conn->query($sql);
$content = $res->fetch_all(MYSQLI_ASSOC); //[{},{},{}]

//把数据传给前端:把数据先转成字符串再传给前端
echo json_encode($content, JSON_UNESCAPED_UNICODE); //防止中文转义

//关闭连接
$res->close(); //关闭结果集
$conn->close();//关闭数据库
