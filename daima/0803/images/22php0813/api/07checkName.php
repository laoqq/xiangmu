<?php

    //接收前端的用户名，判断是否存在,无论是否存在都给前端返回查询结果
    $name = $_GET['username'];

    $arr = array('admin','malin','laoxie','jingjing');

    //判断传过来的用户名是否存在
    if(in_array($name,$arr)) {
        //存在：不给注册
        echo 'no';
    }else {
        echo 'yes';
    }

?>