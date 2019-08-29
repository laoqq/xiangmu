<?php
include 'cont.php';
$mun = isset($_REQUEST['mun']) ? $_REQUEST['mun'] : "";
$pages = isset($_REQUEST['pages']) ? $_REQUEST['pages'] : "";
$pend = isset($_REQUEST['pend']) ? $_REQUEST['pend'] : "";
$pbegin = isset($_REQUEST['pbegin']) ? $_REQUEST['pbegin'] : "";
$bbegin = isset($_REQUEST['bbegin']) ? $_REQUEST['bbegin'] : "";
$bend = isset($_REQUEST['bend']) ? $_REQUEST['bend'] : "";
$order = isset($_REQUEST['order']) ? $_REQUEST['order'] : "";
$action = isset($_REQUEST['action']) ? $_REQUEST['action'] : "";
$index = ($mun - 1) * $pages;
if ($action == -1) {
    $sql1 = "SELECT * FROM book WHERE discount BETWEEN $bbegin AND $bend ORDER BY $order DESC LIMIT $index,$pages";
    $sql2 = "SELECT * FROM book WHERE discount BETWEEN $bbegin AND $bend";
} else if ($action == -2) {
    $sql1 = "SELECT * FROM book  ORDER BY $order DESC LIMIT $index,$pages";
    $sql2 = "SELECT * FROM book  ORDER BY $order DESC  ";
} else if ($action == -3) {
    $sql1 = "SELECT * FROM book WHERE  discount BETWEEN $bbegin AND $bend ORDER BY $order DESC LIMIT $index,$pages";
    $sql2 = "SELECT * FROM book WHERE  discount BETWEEN $bbegin AND $bend";
} else if ($action == 1) {
    $sql1 = "SELECT * FROM book WHERE price BETWEEN $pbegin  AND $pend ORDER BY $order DESC LIMIT  $index,$pages";
    $sql2 = "SELECT * FROM book WHERE price  BETWEEN $pbegin  AND $pend ";
} else if ($action == 2) {
    $sql1 = "SELECT * FROM book WHERE price  BETWEEN $pbegin AND $pend  ORDER BY $order DESC LIMIT $index,$pages";
    $sql2 = "SELECT * FROM book WHERE price  BETWEEN $pbegin AND $pend ";
} else if ($action == 3) {
    $sql1 = "SELECT * FROM book WHERE price  BETWEEN $pbegin AND $pend AND discount BETWEEN $bbegin AND $bend ORDER BY $order DESC LIMIT $index,$pages";
    $sql2 = "SELECT * FROM book WHERE price  BETWEEN $pbegin AND $pend AND discount BETWEEN $bbegin AND $bend";
}

$res1 = $conn->query($sql1);
$res2 = $conn->query($sql2);
$cont = $res1->fetch_all(MYSQLI_ASSOC);
$data = array(
    'data' => $cont,
    'total' => $res2->num_rows
);
echo json_encode($data, JSON_UNESCAPED_UNICODE);
$res1->close();
$res2->close();

$conn->close();//关闭数据库
