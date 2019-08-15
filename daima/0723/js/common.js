//公共的函数(库)：使用频率比较高的函数，封装好了就可以反复调用。jquery

/*
https://blog.csdn.net/qq_40028324/article/details/82454829 生成注释的插件
 * @Description: 封装生成随机颜色函数:可以生成16进制和rgb格式的
 * @Author: qiguoqing
 * @Date: 2019-07-23 15:21:00
 * @LastEditTime: 2019-07-27 13:55:01
 * @LastEditors: Please set LastEditors
 */
function randomColor(type) {
    var color = ''; //存结果
    if (type == 16) {
        //生成16进制随机颜色
        color += '#'; //#
        var html = '0123456789abcdef';
        for (var i = 0; i < 6; i++) {
            var num = parseInt(Math.random() * 16);
            color += html[num];
        }
        // console.log(color);

    } else if (type == 'rgb') {
        //生成rgb格式的颜色
        var r = parseInt(Math.random() * 256); //0-255
        var g = parseInt(Math.random() * 256); //0-255
        var b = parseInt(Math.random() * 256); //0-255
        color = 'rgb(' + r + ', ' + g + ', ' + b + ')';
        // console.log(color);
    }
    return color;

}

/*
 * @Description: 封装生成4位随机验证码：72Uk，数字和字母组合的随机验证码
 * @Author: 
 * @Date: 2019-07-23 15:21:00
 * @LastEditTime: 2019-07-23 16:10:27
 * @LastEditors: Please set LastEditors
 */

function randomCode() {
    var html = '0123456789abcdefglimnopqrstvuwxyzABCDEFGLIMNOPQRSTUVWXWZ';
    //生成四个随机数
    var res = '';
    for (var i = 0; i < 4; i++) {
        var num = parseInt(Math.random() * html.length); //0- html.length-1
        res += html[num];
    }
    return res;
}

/*
 * @Description: 封装获取某个范围内随机数的方法:10-50数字
 * @Author: 良哥
 * @Date: 2019-07-23 15:21:00
 * @LastEditTime: 2019-07-23 16:10:27
 * @LastEditors: Please set LastEditors
 */

function ranNum(min, max) {

    return parseInt(Math.random() * (max - min + 1)) + min; //0-1
}

/*
 * @Description: 求最大数
 * @Author:
 * @Date: 2019-07-23 20:55:46
 * @LastEditTime: 2019-07-23 20:55:46
 * @LastEditors: Please set LastEditors
 */
function sun(arr) {

    for (var i = 0; i < arr.length - 1; i++) {
        for (var j = 0; j < arr.length - 1; j++) {
            if (Number(arr[j]) < Number(arr[j + 1])) {
                var m = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = m;
            }
        }
    }


    text2.value = arr[0];

}
/*
 * @Description: 简单的过滤敏感词
 * @Author:
 * @Date: 2019-07-23 20:55:46
 * @LastEditTime: 2019-07-23 20:55:46
 * @LastEditors: Please set LastEditors
 */
function filtration(str) {
    var arr = ['fuck', '草', '操', '滚'];
    for (var i = 0; i < arr.length; i++) {
        var ar = arr[0];
        var set = new RegExp(ar, 'ig');
        str = str.replace(set, '**');
    }
    return str;
}