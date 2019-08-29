<?php
header('Content-type:text/html;charset=utf-8'); //防止中文乱码
$servername = "localhost";
$username = "root";
$password = "123";
$dama = "xiangmu";
// 创建连接



$conn = mysqli_connect($servername, $username, $password, $dama);
$conn->set_charset('utf8');
// 检测连接
if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
};
