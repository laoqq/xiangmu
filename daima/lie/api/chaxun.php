<?php
include "connect.php";
// $id = isset($_REQUEST['id']) ? $_REQUEST['id'] : '';
$name = isset($_REQUEST['name']) ? $_REQUEST['name'] : '';
$page = isset($_REQUEST['page']) ? $_REQUEST['page'] : '';
$mun = isset($_REQUEST['mun']) ? $_REQUEST['mun'] : '';
$paixu = isset($_REQUEST['paixu']) ? $_REQUEST['paixu'] : '';
$index = ($page - 1) * $mun;
if ($index == '') {
    $sql = "SELECT * FROM liebiao WHERE `name`LIKE '%$name%' LIMIT $index,$mun";
    $sql2 = "SELECT * FROM liebiao WHERE `name`LIKE '%$name%'";
} else {
    $sql = "SELECT * FROM liebiao WHERE `name`LIKE '%$name%' ORDER BY price $paixu LIMIT $index,$mun";
    $sql2 = "SELECT * FROM liebiao WHERE `name`LIKE '%$name%' ORDER BY price";
}




$res = $conn->query($sql);
$cont = $res->fetch_all(MYSQLI_ASSOC);
$res2 = $conn->query($sql2);
// var_dump($res2);
$data = array(
    'data' => $cont,
    'tatol' => $res2->num_rows,
    'pages' => $page,
    'mun' => $mun
);
// var_dump($data);
echo json_encode($data, JSON_UNESCAPED_UNICODE);

//关闭连接
$res->close(); //关闭结果集
$conn->close();//关闭数据库
