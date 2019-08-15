<?php
    /*
        多维数组：[{},{},{}]
    */

    $name = array('小米','华为','苹果','魅族');
    $price = array('1999','2999','3000','8999');
    $color = array('红色','黑色','绿色','粉红色','土豪金');

    $goodslist = array();//var arr = [];
    for($i = 0; $i < 50; $i++) {
        $good = array(
            'gid' => $i + 1,
            'name' =>  $name[array_rand($name)],
            'price' =>  $price[array_rand($price)],
            'color' =>  $color[array_rand($color)]
        );
        $goodslist[] = $good;//相当于js的push功能
    }

    // var_dump($goodslist);//多维数组

    echo json_encode($goodslist);//数组转成字符串：echo除了打印数据之外，还可以把数据传给前端
?>