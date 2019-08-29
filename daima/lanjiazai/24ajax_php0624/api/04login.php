<?php

    //接收用户名和密码，验证是否为已注册的用户，返回验证信息给前端

    $name = isset($_POST['name']) ? $_POST['name'] : '';
    $pwd = isset($_POST['pwd']) ? $_POST['pwd'] : '';

    // echo $name,$pwd;
    include 'conn.php';//连接数据库

    $sql = "SELECT * FROM userinf WHERE `name`='$name' AND pwd='$pwd'";

    //执行语句
    $res = $conn->query($sql);

    //查询到数据就是能登陆
    if($res->num_rows) {
        //查到数据：允许登陆
        echo 'yes';
    }else{
        echo 'no';
    }

    //关闭连接
    $res->close();
    $conn->close();
?>