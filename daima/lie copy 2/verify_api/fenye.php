<?php
include "../api/connect.php";
$sql1 = isset($_REQUEST['sql1']) ? $_REQUEST['sql1'] : '';
$sql2 = isset($_REQUEST['sql2']) ? $_REQUEST['sql2'] : '';
$res = $conn->query($sql1);
$cont = $res->fetch_all(MYSQLI_ASSOC);


$res2 = $conn->query($sql2);
// var_dump($res2);
$data = array(
    'data' => $cont,
    'tatol' => $res2->num_rows,

);
// var_dump($data);
echo json_encode($data, JSON_UNESCAPED_UNICODE);
// $res->close(); //关闭结果集
// $res2->close();
$conn->close();//关闭数据库
