<?php
$page = isset($_REQUEST['page']) ? $_REQUEST['page'] : '';
$mun = isset($_REQUEST['mun']) ? $_REQUEST['mun'] : '';
$paixu = isset($_REQUEST['paixu']) ? $_REQUEST['paixu'] : '';
$nb1 = isset($_REQUEST['nb1']) ? $_REQUEST['nb1'] : '';
$nb2 = isset($_REQUEST['nb2']) ? $_REQUEST['nb2'] : '';
include "connect.php";
$index = ($page - 1) * $mun;
if ($paixu == '' && $nb1 == '' && $nb2 == '') {
    $sql = "SELECT * FROM liebiao  LIMIT $index,$mun";
    $sql2 = "SELECT * FROM liebiao";
} else if ($paixu == '' && $nb1 != '' && $nb2 != '') {
    $sql = "SELECT * FROM liebiao WHERE price BETWEEN $nb1 AND $nb2 LIMIT $index,$mun";
    $sql2 = "SELECT * FROM liebiao WHERE price BETWEEN $nb1 AND $nb2";
} else {
    $sql = "SELECT * FROM liebiao  ORDER BY price $paixu LIMIT $index,$mun";
    $sql2 = "SELECT * FROM liebiao";
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
// $res->close(); //关闭结果集
// $res2->close();
$conn->close();//关闭数据库
