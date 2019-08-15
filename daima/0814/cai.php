<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-14 13:07:41
 * @LastEditTime: 2019-08-14 13:08:07
 * @LastEditors: Please set LastEditors
 -->
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>

<body>
    <?php
    $q = isset($_GET['q']) ? htmlspecialchars($_GET['q']) : '';
    if ($q) {
        if ($q == 'RUNOOB') {
            echo '菜鸟教程<br>http://www.runoob.com';
        } else if ($q == 'GOOGLE') {
            echo 'Google 搜索<br>http://www.google.com';
        } else if ($q == 'TAOBAO') {
            echo '淘宝<br>http://www.taobao.com';
        }
    } else {
        ?>
    <form action="" method="get">
        <select name="q">
            <option value="">选择一个站点:</option>
            <option value="RUNOOB">Runoob</option>
            <option value="GOOGLE">Google</option>
            <option value="TAOBAO">Taobao</option>
        </select>
        <input type="submit" value="提交">
    </form>
    <?php
    }
    ?>

</body>

</html>