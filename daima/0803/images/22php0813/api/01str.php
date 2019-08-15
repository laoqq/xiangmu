<?php
    //防止中文乱码
    header("Content-type:text/html;charset=utf-8");

    //utf-8：字母、数字、符号都是占一个字节，汉字占3个字节；gb2312：字母、数字、符号都是占一个字节，汉字占2个字节

    $str1 = 'lemon新';
    echo strlen($str1);//5 字节数 ：https://zhidao.baidu.com/question/1546124012033241467.html
    echo '<br>'.mb_strlen($str1);//长度？ 6 length
    echo '<br>'.strpos($str1,'e');//? 1 找到返回下标，找不到返回false
    // echo '中国香港';


?>