<?php

//多维数组 [{},{},{}]

// //数值数组
$arr1 = array('华为', '小米', '锤子', '诺基亚', '三星', 'oppo', 'vivo', '苹果', '摩托罗拉');
$arr2 = array('7999', '2999', '899', '299', '4999', '2999', '3999', '8999', '1599');
$arr3 = array('土豪金', '玫瑰金', '白色', '天空蓝', '红色', '星空灰', '骚粉', '绿色', '黄色');


// //多维数组
// $goodlist = array(); //相当于js var arr = []
// for ($i = 0; $i < 50; $i++) {
//     $good = array( //关联数组
//         'gid' => 'g' . ($i + 1),
//         'title' => $arr1[array_rand($arr1)],
//         'price' => $arr2[array_rand($arr2)],
//         'color' => $arr3[array_rand($arr3)]
//     );
//     $goodlist[] = $good; //相当于js中的push()
// }
$gooodlist = array();
for ($i = 0; $i < 50; $i++) {
    $good = array(
        'gid' => 'g' . ($i + 1),
        'title' => $arr1[array_rand($arr1)],
        'price' => $arr2[array_rand($arr2)],
        'color' => $arr3[array_rand($arr3)]
    );
    $gooodlist[$i] = $good;
}
// var_dump($gooodlist);
echo count($gooodlist) . '<br>';
var_dump(date('h'));
// //遍历数值数组：for循环
// $cars = array("Volvo", "BMW", "Toyota");
// $arrlength = count($cars);
// for ($x = 0; $x < $arrlength; $x++) {
//     echo $cars[$x] . "<br>";
// }
// echo $_SERVER['PHP_SELF'];
// echo "<br>";
// echo $_SERVER['SERVER_NAME'];
// echo "<br>";
// echo $_SERVER['HTTP_HOST'];
// echo "<br>";
// echo $_SERVER['HTTP_REFERER'];
// echo "<br>";
// echo $_SERVER['HTTP_USER_AGENT'];
// echo "<br>";
// echo $_SERVER['SCRIPT_NAME'];


// //遍历关联数组：foreach..as
// $age = array("Peter" => "35", "Ben" => "37", "Joe" => "43");
// foreach ($age as $x => $x_value) {
// echo "Key=" . $x . ", Value=" . $x_value;
// echo "<br>";
// }
// // var_dump($goodlist);//做好的假数据传给前端,echo有两个作用，第一个作用是打印数据，第二个作用：把数据传给前端,但是先要把数据转成字符串才能传给前端

// //把数据转成字符串，echo给前端
// echo json_encode($goodlist, JSON_UNESCAPED_UNICODE); //使用JSON_UNESCAPED_UNICODE防止中文转义

//全栈：如果我在php这边，我就是后端，做数据接口，传给前端
//回到html页面，我就是前端，切图布局，拿到数据渲染到页面

// $num = array_rand($arr1);
// echo $arr1[$num];//随机下标
// phpinfo();
$servername = "localhost";
$username = "root";
$password = "123";
$dama = "shop";
// 创建连接
$conn = mysqli_connect($servername, $username, $password, $dama);
$sql = 'SELECT id FROM sysuser  ';


// 检测连接
if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}
echo "连接成功";
$re = $conn->query($sql);
if ($re->num_rows > 0) {
    // 输出数据
    while ($row = $re->fetch_assoc()) {
        echo "id: " . $row["id"] .  "<br>";
    }
} else {
    echo "0 结果";
}
// print_r($conn->query($sql));
// echo $re;
// var_dump($re);
$conn->close();
// try {
// //解析config.ini文件
// // $config = parse_ini_file(realpath(dirname(__FILE__) . '/config/config.ini'));
// //对mysqli类进行实例化
// $mysqli = new mysqli($config['servername'], $config['username'], $config['password'], $config['dama']);
// if (mysqli_connect_errno()) { //判断是否成功连接上MySQL数据库
// throw new Exception('数据库连接错误！'); //如果连接错误，则抛出异常
// } else {
// echo '数据库连接成功！'; //打印连接成功的提示
// }
// } catch (Exception $e) { //捕获异常
// echo $e->getMessage(); //打印异常信息
// }

// $name = "runoob";
// $a = <<<EOF "abc" <br>$name
//     <br>
//     "123"
//     EOF;
//     // 结束需要独立一行且前后不能空格
//     echo $a;
//     $name = "变量会被解析";
//     $a = <<<EOF $name<br><a>html格式会被解析</a><br />双引号和Html格式外的其他内容都不会被解析
//         "双引号外所有被排列好的格式都会被保留"
//         "但是双引号内会保留转义符的转义效果,比如table:\t和换行：\n下一行"
//         EOF;
//         echo $a;
