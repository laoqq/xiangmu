<?php
    //防止中文乱码
    header("Content-type:text/html;charset:utf-8");

    // echo '坤坤';

    //字符串的方法
    $str = 'hi中';
    echo strlen($str);//得到的字符的字节数 5，英文、数字、标点符号占一个字节，中文占3个字节。utf-8
    echo mb_strlen($str);//?长度 相当于js的lenght
    echo strpos($str,'i');//1

?>