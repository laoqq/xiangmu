//公共的函数(库)：使用频率比较高的函数，封装好了就可以反复调用。jquery

/*
https://blog.csdn.net/qq_40028324/article/details/82454829 生成注释的插件
 * @Description: 封装生成随机颜色函数:可以生成16进制和rgb格式的
 * @Author: qiguoqing
 * @Date: 2019-07-23 15:21:00
 * @LastEditTime: 2019-08-14 17:25:41
 * @LastEditors: Please set LastEditors
 */
function randomColor(type) {
  var color = ""; //存结果
  if (type == 16) {
    //生成16进制随机颜色
    color += "#"; //#
    var html = "0123456789abcdef";
    for (var i = 0; i < 6; i++) {
      var num = parseInt(Math.random() * 16);
      color += html[num];
    }
    // console.log(color);
  } else if (type == "rgb") {
    //生成rgb格式的颜色
    var r = parseInt(Math.random() * 256); //0-255
    var g = parseInt(Math.random() * 256); //0-255
    var b = parseInt(Math.random() * 256); //0-255
    color = "rgb(" + r + ", " + g + ", " + b + ")";
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
  var html = "0123456789abcdefglimnopqrstvuwxyzABCDEFGLIMNOPQRSTUVWXWZ";
  //生成四个随机数
  var res = "";
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
  var arr = ["fuck", "草", "操", "滚"];
  for (var i = 0; i < arr.length; i++) {
    var ar = arr[i];
    var set = new RegExp(ar, "ig");
    str = str.replace(set, "**");
    console.log(set);
  }
  return str;
}
/*
 * @Description: 切割
 * @Author:
 * @Date: 2019-07-23 20:55:46
 * @LastEditTime: 2019-07-23 20:55:46
 * @LastEditors: Please set LastEditors
 */
function incision(str) {
  var arr = str.split("&");
  var obj = {};

  arr.forEach(function (item) {
    var a = item.split("=");
    obj[a[0]] = a[1];
  });
  return obj;
}
/*
 * @Description: 拼接
 * @Author:
 * @Date: 2019-07-23 20:55:46
 * @LastEditTime: 2019-07-23 20:55:46
 * @LastEditors: Please set LastEditors
 */
function tojoint(obj) {
  var ht = "";
  for (key in obj) {
    ht += key + "=" + obj[key] + "&";
  }
  ht = ht.slice(0, -1);
  return ht;
}
/*
 * @Description: 补零
 * @Author:
 * @Date: 2019-07-23 20:55:46
 * @LastEditTime: 2019-07-23 20:55:46
 * @LastEditors: Please set LastEditors
 */
function toDb(num) {
  if (num < 10) {
    return "0" + num;
  } else {
    return "" + num;
  }
}
/*
 * @Description: 将时间转换成年月日时分秒的形式
 * @Author:
 * @Date: 2019-07-23 20:55:46
 * @LastEditTime: 2019-07-23 20:55:46
 * @LastEditors: Please set LastEditors
 */
function newdata(t) {
  //将时间转换成年月日的形式
  var tt = new Date(t); //时间形式的转换
  var year = tt.getFullYear(); //年

  var month = tt.getMonth() + 1; //月

  var day = tt.getDate(); //日
  var hour = tt.getHours();
  var minute = tt.getMinutes();
  var seconds = tt.getSeconds();

  return {
    years: year,

    months: month,

    days: day,
    hours: hour,
    secs: seconds,
    minutes: minute
  };
}
/*
 * @Description: 能够获取元素的样式(行内和非行内)， 还能设置元素的样式（ 行内）
 * @Author:
 * @Date: 2019-07-23 20:55:46
 * @LastEditTime: 2019-07-23 20:55:46
 * @LastEditors: Please set LastEditors
 */
function css() {
  var ele = arguments[0];
  var attr = arguments[1];
  if (arguments.length == 2) {
    //获取样式
    if (getComputedStyle(ele, false)) {
      //证明在主流浏览器下：IE9+ 和 主流的浏览器
      return getComputedStyle(ele, false)[attr];
    } else {
      //低版本IE:IE678
      return ele.currentStyle(attr);
    }
  } else if (arguments.length == 3) {
    //设置样式
    // box.style.display = 'block';
    var val = arguments[2];
    ele.style[attr] = val;
  }
}
/*
 * @Description: post 和 gest
 * @Author:
 * @Date: 2019-07-23 20:55:46
 * @LastEditTime: 2019-07-23 20:55:46
 * @LastEditors: Please set LastEditors
 */
function ajax(opt) {
  let dafaultData = {
    data: "",
    asyn: true,
    failure: null
  };

  dafaultData = Object.assign(dafaultData, opt);

  let xhr = new XMLHttpRequest();

  if (dafaultData.type.toLowerCase() == "get") {
    if (dafaultData.data) {
      dafaultData.data = tojoint(dafaultData.data);
      dafaultData.url += "?" + dafaultData.data;
    }
    xhr.open("get", dafaultData.url, dafaultData.asyn);
    xhr.send(null);
  } else if (dafaultData.type.toLowerCase() == "post") {
    xhr.open("post", dafaultData.url, dafaultData.asyn);
    xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
    console.log(dafaultData.Date);
    dafaultData.Date = tojoint(dafaultData.data);
    console.log(tojoint(dafaultData.data));
    xhr.send(dafaultData.Date);
  }
  xhr.onreadystatechange = () => {
    if (xhr.readyState == 4) {
      if (xhr.status == 200 || xhr.status == 304) {
        let data = xhr.responseText;

        dafaultData.success(data);
      } else {
        //失败
        if (defaultData.failure) {
          //写了这个回87
          defaultData.failure(xhr.status);
        }
      }
    }
  };
}