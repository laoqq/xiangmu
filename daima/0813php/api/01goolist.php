<?php
    /*
        多维数组：[{},{}.{}]
     */

    $name = array('小米','华为','苹果','魅族');
    $price = array('1999','2999','3999','8999');
    $color = array('红色','黑色','绿色','粉红色');

    $googslist = array(); //空数组
    for($i = 0; $i < 50; $i++) {
        $good = array(
            'gid' => $i + 1,
            'name' => $name[array_rand($name)],
            'price' => $price[array_rand($price)],
            'color' => $color[array_rand($color)]
        );
        $googslist[] = $good; //相当于js的push功能
    }
    echo json_encode($googslist); //json_encode();把数组转成字符串

?>