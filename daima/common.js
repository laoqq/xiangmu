//公共的函数(库)：使用频率比较高的函数，封装好了就可以反复调用。jquery

/*
https://blog.csdn.net/qq_40028324/article/details/82454829 生成注释的插件
 * @Description: 封装生成随机颜色函数:可以生成16进制和rgb格式的
 * @Author: qiguoqing
 * @Date: 2019-07-23 15:21:00
 * @LastEditTime: 2019-09-05 10:24:35
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
function Transformationtime(t) {
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
 * @Description: 正则，表单的验证
 * @Author:
 * @Date: 2019-07-23 20:55:46
 * @LastEditTime: 2019-07-23 20:55:46
 * @LastEditors: Please set LastEditors
 */
var checkReg = {
  trim: function (str) {
    //去掉前后空格
    var reg = /^\s+|\s+$/g;
    return str.replace(reg, "");
  },
  tel: function (str) {
    //电话
    var reg = /^1[3-9]\d{9}$/;
    return reg.test(str);
  },
  email: function (str) {
    //邮箱正则:a_a2-+.s @ a_a+2-.s  .s_a2
    var reg = /^\w+([\-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/; //网上推荐
    return reg.test(str);
  },
  idcard: function (str) {
    //身份证
    var reg = /^(\d{17}|\d{14})[\dX]$/;
    return reg.test(str);
  },
  psweasy: function (str) {
    //6-18位首字母开头
    var reg = /^[a-zA-Z]\w{5,17}$/;
    return reg.test(str);
  },
  pwwagain: function (str1, str2) {
    //确认密码
    return str1 === str2; //全等 恒等
  },
  urladr: function (str) {
    //路径：网址规则
    var reg = /[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+\.?/;
    return reg.test(str);
  },
  name: function (str) {
    //账号字母开头,6-20位
    var reg = /^[a-zA-Z][\w\-]{5,19}$/;
    return reg.test(str);
  },
  chinese: function (str) {
    //中文

    var reg = /^[\u2E80-\u9FFF]+$/;
    return reg.test(str);
  },
  birthday: function (str) {
    //生日
    var reg = /^((((19|20)\d{2})-(0?[13-9]|1[012])-(0?[1-9]|[12]\d|30))|(((19|20)\d{2})-(0?[13578]|1[02])-31)|(((19|20)\d{2})-0?2-(0?[1-9]|1\d|2[0-8]))|((((19|20)([13579][26]|[2468][048]|0[48]))|(2000))-0?2-29))$/;
    return reg.test(str);
  }
};
/*
 * @Description: 封装表单验证

 * @Date: 2019-07-23 15:21:00
 * @LastEditTime: 2019-07-23 16:10:27
 * @LastEditors: Please set LastEditors
 */

function checkInput(ele, reg, inf, meg) {
  /*
                参数一：ele 要正则验证的表单
                参数二：reg 正则不同
                参数三：inf 提示信息节点不同
                参数四：meg 提示信息不同,对象
    */

  ele.onblur = function () {
    var val = ele.value.trim();
    // var index = this.dataset.index; //用自定义属性的值作为开关对象的属性名
    //1.非空验证
    if (val) {
      //2.正则验证
      // var regEmail = /^[\w&%$#!\-]+@[\w&%$#!\-]+\.[a-zA-Z]+$/;
      // var res = regEmail.test(email);
      // eval():把字符串转成js
      // var str = `checkReg.${reg}(val)`; //方法一：借助一个方法eval()
      var res = checkReg[reg](val); //方法二：利用对象属性名可以接收变量的特性实现
      // var res = eval(str);
      // var res = reg(val);//实参
      // console.log(res);
      // var res = checkReg.email(val);
      if (res) {
        //符合规则
        inf.innerHTML = meg.success;
        inf.style.color = "#58bc58";
        ele.istrue = true;
      } else {
        //不符合规则
        inf.innerHTML = meg.failure;
        inf.style.color = "red";
        ele.istrue = false;
      }
    } else {
      inf.innerHTML = meg.null;
      inf.style.color = "red";
      ele.istrue = false;
    }
  };
}
/*
	运动框架封装：startMove()过渡    jq animate()
	最终版：多对象，多属性，链式运动框架(运动队列)
	参数一：对象名
	参数二：属性，目标值  键名：属性名，键值：目标值    {'width':200,'heigth':400}  实现：宽度和高度一起改变，宽度变成200，高度变成400
	参数三：回调函数(可选参数)
 */

function startMove(obj, json, fnend) {

  clearInterval(obj.timer); //防止定时器叠加
  obj.timer = setInterval(function () {

    var istrue = true;

    //1.获取属性名，获取键名：属性名->初始值
    for (var key in json) { //key:键名   json[key] :键值
      //			console.log(key); //width heigth opacity
      var cur = 0; //存初始值

      if (key == 'opacity') { //初始值
        cur = css(obj, key) * 100; //透明度
      } else {
        cur = parseInt(css(obj, key)); // 300px  300  width heigth borderwidth px为单位的

      }

      //2.根据初始值和目标值，进行判断确定speed方向，变形：缓冲运动
      //距离越大，速度越大,下面的公式具备方向
      var speed = (json[key] - cur) / 6; //出现小数
      speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed); //不要小数部分，没有这句话或晃动

      //保证上一个属性全部都达到目标值了
      if (cur != json[key]) { //width 200 heigth 400
        istrue = false; //如果没有达到目标值，开关false
      } else {
        istrue = true; //true true
      }

      //3、运动
      if (key == 'opacity') {
        obj.style.opacity = (cur + speed) / 100; //0-1
        obj.style.filter = 'alpha(opacity:' + (cur + speed) + ')'; //0-100
      } else {
        obj.style[key] = cur + speed + 'px'; //针对普通属性 left  top height 
      }

    }

    //4.回调函数:准备一个开关,确保以上json所有的属性都已经达到目标值,才能调用这个回调函数
    if (istrue) { //如果为true,证明以上属性都达到目标值了
      clearInterval(obj.timer);
      if (fnend) { //可选参数的由来
        fnend();
      }
    }

  }, 30); //obj.timer 每个对象都有自己定时器

}
/*
 * @Description:
 * @Author:
 *
 * @LastEditors: Please set LastEditors
 */

function ajax(opt) {
  //默认参数
  let defaultData = {
    data: '',
    asyn: true,
    failure: null
  }

  Object.assign(defaultData, opt); //用默认参数

  let xhr = new XMLHttpRequest();
  if (defaultData.type.toLowerCase() == 'get') {
    //get方式
    if (defaultData.data) {
      defaultData.data = objToStr(defaultData.data);
      defaultData.url += '?' + defaultData.data;
    }
    xhr.open('get', defaultData.url, defaultData.asyn);
    xhr.send(null);
  } else if (defaultData.type.toLowerCase() == 'post') {
    //post方式
    xhr.open('post', defaultData.url, defaultData.asyn);
    xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
    defaultData.data = objToStr(defaultData.data);
    xhr.send(defaultData.data);
  }

  xhr.onreadystatechange = () => {
    if (xhr.readyState == 4) {
      if (xhr.status == 200 || xhr.status == 304) {
        //成功了
        let data = xhr.responseText;
        defaultData.success(data); //实参
      } else {
        //失败
        if (defaultData.failure) {
          //写了这个回调
          defaultData.failure(xhr.status);
        }
      }
    }
  }
}

/*
 * @Description:
 * @Author:
 *
 * @LastEditors: Please set LastEditors
 */
function setCookie(key, val, iDay) {
  //key：键名；val：键值；iDay：失效时间
  var now = new Date();
  now.setDate(now.getDate() + iDay);
  document.cookie = key + '=' + val + ';expires=' + now.toUTCString() + ';path=/'; //设置一个站点内的文件可以共享此cookie
}

function getCookie(key) { //获取cookie值
  var cookies = document.cookie; //name=malin; pwd=123456
  var arr = cookies.split('; '); //['name=malin','pwd=123456']
  for (var i = 0; i < arr.length; i++) {
    var arr2 = arr[i].split('='); //['name','malin'
    if (key == arr2[0]) {
      return arr2[1];
    }
  };
}

function removeCookie(key) { //删除：设置失效时间为过去的时间，立即失效
  setCookie(key, '', -1);
};
// var cookies = {

//   setCookie: function (key, val, iDay) {
//     //key：键名；val：键值；iDay：失效时间
//     var now = new Date();
//     now.setDate(now.getDate() + iDay);
//     document.cookie = key + '=' + val + ';expires=' + now.toUTCString() + ';path=/'; //设置一个站点内的文件可以共享此cookie
//   },
//   getCookie: functiona(key) { //获取cookie值
//     var cookies = document.cookie; //name=malin; pwd=123456
//     var arr = cookies.split('; '); //['name=malin','pwd=123456']
//     for (var i = 0; i < arr.length; i++) {
//       var arr2 = arr[i].split('='); //['name','malin'
//       if (key == arr2[0]) {
//         return arr2[1];
//       }
//     }
//   },

//   removeCookie: function (key) { //删除：设置失效时间为过去的时间，立即失效
//     setCookie(key, '', -1);

//   }

// }