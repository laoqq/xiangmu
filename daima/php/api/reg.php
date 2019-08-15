<?php
// $ur = $_REQUEST["name"];
// $pd = $_REQUEST["pasd"];

// $servername = "localhost";
// $username = "root";
// $password = "123";
// $dama = "wangzhan";
// // 创建连接


// $conn = mysqli_connect($servername, $username, $password, $dama);

// // 检测连接
// if (!$conn) {
//     die("Connection failed: " . mysqli_connect_error());
// } else {
//     // echo "连接成功";
// };
include '../api/connect.php';
$na = isset($_POST['name']) ? $_POST['name'] : '';
$pasd = isset($_POST['pasd']) ? $_POST['pasd'] : '';
// $nam = $na;
// $word = $pasd;
$sql = "INSERT INTO user  (username,userpassword)VALUES('$na','$pasd')";

$re = $conn->query($sql);
if ($re) {
    // 输出数据
    // while ($row = $re->fetch_assoc()) {
    //     echo "id: " . $row["id"] .  "<br>";
    // }
    echo "1";
} else {
    echo "0";
}
// print_r($conn->query($sql));
// echo $re;
// var_dump($re);
$conn->close();
