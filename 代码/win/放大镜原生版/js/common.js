//公共的函数(库)：使用频率比较高的函数，封装好了就可以反复调用。jquery

/*
https://blog.csdn.net/qq_40028324/article/details/82454829 生成注释的插件
 * @Description: 封装生成随机颜色函数:可以生成16进制和rgb格式的
 * @Author: 良哥
 * @Date: 2019-07-23 15:21:00
 * @LastEditTime: 2019-08-05 16:01:54
 * @LastEditors: Please set LastEditors
 */
function randomColor(type) {
    var color = '';//存结果
    if (type == 16) {
        //生成16进制随机颜色
        color += '#';//#
        var html = '0987654321abcdef';
        for (var i = 0; i < 6; i++) {
            var num = parseInt(Math.random() * 16);
            color += html[num];
        }
        // console.log(color);

    } else if (type == 'rgb') {
        //生成rgb格式的颜色
        var r = parseInt(Math.random() * 256);//0-255
        var g = parseInt(Math.random() * 256);//0-255
        var b = parseInt(Math.random() * 256);//0-255
        color = 'rgb(' + r + ', ' + g + ', ' + b + ')';
        // console.log(color);
    }
    return color;
}

/*
 * @Description: 封装生成4位随机验证码：72Uk，数字和字母组合的随机验证码
 * @Author: 良哥
 * @Date: 2019-07-23 15:21:00
 * @LastEditTime: 2019-07-23 16:10:27
 * @LastEditors: Please set LastEditors
 */

function randomCode() {
    var html = '0987654321zxcvbnmlkjhgfdsaqwertyuiopZXCVBNMLKJHGFDSAQWERTYUIOP';
    //生成四个随机数
    var res = '';
    for (var i = 0; i < 4; i++) {
        var num = parseInt(Math.random() * html.length);//0- html.length-1
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
    //1 * max - min + min
    return parseInt(Math.random() * (max - min + 1)) + min;//0-1
}

/*
* @Description: 封装函数实现通过id查找元素
* @Author: 良哥
* @Date: 2019-07-23 15:21:00
* @LastEditTime: 2019-07-23 16:10:27
* @LastEditors: Please set LastEditors
*/

function getid(id) {
    return document.getElementById(id);
}

/*
* @Description: 封装把参数变成对象
* @Author: 良哥
* @Date: 2019-07-23 15:21:00
* @LastEditTime: 2019-07-23 16:10:27
* @LastEditors: Please set LastEditors
*/

function strToObj(str) {//name=laoxie&age=18&sex=male
    var obj = {};
    var arr = str.split('&');//["name=laoxie", "age=18", "sex=male"]
    arr.forEach(function (item) {
        var arr2 = item.split('=');
        obj[arr2[0]] = arr2[1];
    });
    return obj;
}

/*
 * @Description: 封装把对象变成参数
 * @Author: 良哥
 * @Date: 2019-07-23 15:21:00
 * @LastEditTime: 2019-07-23 16:10:27
 * @LastEditors: Please set LastEditors
 */

function objToStr(obj) {
    var str = '';
    for (var key in obj) {
        str += key + '=' + obj[key] + '&';
    }
    return str.slice(0, -1);
}

/*
 * @Description: 封装补零函数
 * @Author: 良哥
 * @Date: 2019-07-23 15:21:00
 * @LastEditTime: 2019-07-23 16:10:27
 * @LastEditors: Please set LastEditors
 */

function toDb(num) {
    if (num < 10) {
        return '0' + num;
    } else {
        return '' + num;
    }
}

/*
 * @Description: 封装设置和获取样式
 * @Author: 良哥
 * @Date: 2019-07-23 15:21:00
 * @LastEditTime: 2019-07-23 16:10:27
 * @LastEditors: Please set LastEditors
 */

function css() {
    if (arguments.length == 2) {
        //获取样式
        if (getComputedStyle(arguments[0], false)) {
            //高级浏览器
            return getComputedStyle(arguments[0], false)[arguments[1]];
            //getComputedStyle(h1, false)['top'];
        } else {
            //IE8-
            return arguments[0].currentStyle[arguments[1]];
        }
    } else if (arguments.length == 3) {
        //设置样式  ele.style.width = '200px'
        arguments[0].style[arguments[1]] = arguments[2];
    }
}


/*
 * @Description: 封装事件绑定函数
 * @Author: 良哥
 * @Date: 2019-07-23 15:21:00
 * @LastEditTime: 2019-07-23 16:10:27
 * @LastEditors: Please set LastEditors
 */

function bind(ele, type, fn) {
    if (ele.addEventListener) {
        //主流浏览器
        ele.addEventListener(type, fn, false);//false:冒泡
    } else {
        ele.attachEvent('on' + type, fn);
    }
}