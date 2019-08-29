<?php
$page = isset($_REQUEST['page']) ? $_REQUEST['page'] : ''; //页数，哪一页
$num = isset($_REQUEST['num']) ? $_REQUEST['num'] : ''; //一页数据有4条
include "connect.php";
$index = ($page - 1) * $num;
$sql = "SELECT * FROM liebiao  LIMIT $index,$num";
//SELECT * FROM goodslist ORDER BY price desc LIMIT 0,10;

//执行sql语句
$res = $conn->query($sql); //得到结果集
$content = $res->fetch_all(MYSQLI_ASSOC); //[{},{},{}]

//把数据传给前端:把数据先转成字符串再传给前端
echo json_encode($content, JSON_UNESCAPED_UNICODE); //防止中文转义

//关闭连接
$res->close(); //关闭结果集
$conn->close();//关闭数据库
