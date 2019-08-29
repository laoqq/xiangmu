<?php
    //需求：接收数据，查询数据，制作成字符串，echo给前端

    $page = isset($_GET['page']) ? $_GET['page'] : '1';
    $num = isset($_GET['num']) ? $_GET['num'] : '5';
    // echo $page;
    // echo $num;//拿到前端的数据，在往下写代码！！！！！

    include 'conn.php';

    /*
        拿到： 页面  条数    index     limit m,n;   m:下标  n:数量
                1     10     0
                2     10     10
                3     10     20
            
        index = (page - 1) * num
    */

    //1.写sql语句
    $index = ($page - 1) * $num;
    $sql = "SELECT * FROM goodslist LIMIT $index,$num";
    $sql2 = 'SELECT * FROM goodslist';

    //2.执行语句
    $res = $conn->query($sql);
    $res2 = $conn->query($sql2);
    
    // var_dump($res2->num_rows);

    //3.提取数据
    $arr = $res->fetch_all(MYSQLI_ASSOC);//对象

    $data = array(
        'total' => $res2->num_rows,
        'data' => $arr,
        'page' => $page,
        'num' => $num
    );

    // //4.把对象转成字符串，echo给前端
    echo json_encode($data,JSON_UNESCAPED_UNICODE);

    $conn->set_charset('utf8');

?>