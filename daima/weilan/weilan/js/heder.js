/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-03 21:06:25
 * @LastEditTime: 2019-09-03 21:20:46
 * @LastEditors: Please set LastEditors
 */
(function () {
    console.log(1);

    function ck() {
        let na = $.cookie('name');
        if (na) {
            $(".hy").html(na + "您好，欢迎来到蔚蓝网！")
            $("#lr").html(`<a id="out" href="login.html">安全退出</a>`);
        } else {
            $(".hy").html("您好，欢迎来到蔚蓝网！")
            $("#lr").html(
                `[<a href="login.html">登陆</a>] [<a href="register.html" id='register'>免费注册</a>]`)
        }
    }
    ck();
    $("#out").click(function () {
        window.open('', '_self');
        window.close();
        // $.removeCookie('name', {
        //   path: '/'
        // });
        // $.removeCookie('name', {
        //   domain: 'localhost',
        //   path: '/'
        // });
        // $.cookie("name", '', {
        //   path: "/"
        // })
        $.removeCookie('name', {
            path: '/'
        });
        $("#login").click(function () {
            let url = location.href;

            // url = decodeURIComponent(url, true)
            // sessionStorage.setItem("url", "url");
            // sessionStorage.url = url
            // localStorage.href = url;
            $.cookie('url', url, {
                path: '/',
            });

            // location.href = "../html/login.html";
        })
    })
})()