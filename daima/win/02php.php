<?php

    //输出
    $num = 88;
    echo $num;//输出
    echo '<h1>how old are you!</h1><br>';
    //拼接:用.拼接
    echo 'hi'.$num.'<br>';

    //函数:作用域
    $price = 789;
    $now = 56;
    function show() {
        $num = 666;
        echo $num.'<br>';//出错了：全局和局部的都不能直接互相访问
        echo $GLOBALS['price'];//超级变量
        echo '<br>';
        global $now,$price;//第二种方式：通过global关键字将全局变量的作用域延时到这里
        echo $now;
        echo $price;
    }

    show();

    //定义常量
    define('PI',3.14);
    
    //循环语句
    for($i = 0; $i < 8; $i++) {
        echo $i.'<br>';
    }

    echo 'hegood';
    echo 'ssd';//最后一句可以不加分号，但是不建议省略

?>