<?php
$id = isset($_POST['id']) ? $_POST['id'] : '';

$path = 'weibo.json';

$file = fopen($path, 'r');
$con = fread($file, filesize($path));
$arr = json_decode($con, true);
for ($i = 0; $i < count($arr); $i++) {
    if ($arr[$i]['id'] == $id) {
        $arr[$i]['good']++;
        echo ($arr[$i]['good']);
    }
};
$flie = fopen($path, 'w');
$data = json_encode($arr);
fwrite($flie, $data);
fclose($flie);
