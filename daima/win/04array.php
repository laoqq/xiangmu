<?php

    //防止中文乱码
    header("Content-type:text/html;charset:utf-8");

    /*
        数组：
            * 数值数组：类似js中的数组  []
            * 关联数组：类似js中json对象  {}
            * 多维数组：类似js中的数据  [{},{},{}]
    */

    //数值数组
    $arr = array('apple','boy','cat');
    // echo $arr;echo只能打印基本类型，数组是复合类型，不能用echo打印

    // print_r($arr);
    var_dump($arr);//推荐使用这种方式，打印数据比较详细，一般调试代码比较方便
    echo $arr[2];//通过下标读取数组的值

    //关联数组
    $arr2 = array(
        'name' => '三金哥',
        'age' => 18,
        'adr' => '海南'
    );

    var_dump($arr2);
    echo $arr2['adr'];//通过键名取键值,不能再用.读取值，因为.在php是拼接的意思


    

?>