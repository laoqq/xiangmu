<?php 
    /*
        数组：
            * 数值数组：类似js的数组，var arr = []
            * 关联数组：类似js的对象，var obj = {}
            * 多维数组：[{},{},{}]
        
        全栈：
            * 在html页面：前端，写页面，接收数据，渲染页面
            * 在php页面：后端，做接口(做数据)，传给前端
    */

    //数值数组
    $arr1 = array('jingjing','tingge','tiantian');
    // echo $arr1;//echo 只能打印基本类型
    print_r($arr1);
    var_dump($arr1);//一般用于检测代码，相当于js的打印控制台
    echo $arr1[0];//通过下标打印
    echo '<br>长度'.count($arr1).'<br>';//打印长度
    //in_array() 判断某个值是否存在数组中
    echo in_array('rrr',$arr1);
    //array_rand() 随机获取索引值
    echo array_rand($arr1);

    //关联数组
    $arr2 = array(
        'id' => 10,
        'color' => '红色',
        'price' => 8999
    );       //php里面不能省略分号
    
    var_dump($arr2);
    echo $arr2['id'];//通过键名取键值，记得不能用.获取

    

?>