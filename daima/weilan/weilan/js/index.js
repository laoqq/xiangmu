/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-24 09:18:22
 * @LastEditTime: 2019-08-31 21:27:13
 * @LastEditors: Please set LastEditors
 */
(function () {

    function ck() {

        let na = $.cookie('name');
        if (na) {
            $(".hy").html(na + "您好，欢迎来到蔚蓝网！")
            $("#lr").html(`<a id="out" href="html/login.html">安全退出</a>`);
        } else {
            $(".hy").html("您好，欢迎来到蔚蓝网！")
            $("#lr").html(`[<a id="login" href="html/login.html">登陆</a>] [<a href=" html/register.html" id='register'>免费注册</a>]`)
        }
    }
    ck();


    $('#index_footer').load('html/footer.html');
    $("#right").load("html/right.html");

    $("#login").click(function () {
        let url = location.href;
        $.cookie('url', url, {
            path: '/'
        });

    })
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
            localStorage.href = url;

            location.href = "../html/login.html";
        })
    })
    let endtime = "2019-09-24 16:16:00";
    let end = Date.parse(endtime);
    let tiemr = setInterval(function () {
        let newtime = Date.now();
        let lead = (end - newtime) / 1000;
        if (lead <= 0) {
            clearInterval(tiemr);

        } else {
            let timeobj = Transformationtime(lead);
            $(".hours").html(toDb(timeobj.hours));
            $(".minutes").html(toDb(timeobj.mins))
            $(".seconds").html(toDb(timeobj.seconds))
        }
    }, 1000)

    function Transformationtime(t) { //时间形式的转换
        var second = parseInt(t % 60);
        var min = parseInt(t / 60 % 60);
        var hour = parseInt(t / 60 / 60);
        return {
            seconds: second,
            mins: min,
            hours: hour

        }
    };

    function action_img(nub) {
        if ((nub - 1) * 4 >= 0 && (nub - 1) * 4 <= 8) {

            for (let i = (nub - 1) * 4; i < nub * 4; i++) {

                $("#J_flashsale").children().eq(i).css({
                    "display": "block",
                    "height": "234px"
                });


            }
            $("#J_flashsale").children().each(function (index, element) {

                if (index < (nub - 1) * 4) {
                    $("#J_flashsale").children().eq(index).css({
                        "display": "none",
                        "height": ""

                    });

                } else if (index >= nub * 4) {
                    $("#J_flashsale").children().eq(index).css({
                        "display": "none",
                        "height": ""

                    });
                }

            });

            $("#J_flashsale").animate({
                height: '243px',

            })
        }



    }
    let nw = 1;
    action_img(1);
    $(".flashsale-pagination").on("click", 'a', function () {
        $("#J_flashsale").css("height", "0px");
        if ($(this).index() == 0) {

            nw--;
        } else if ($(this).index() == 4) {
            nw++;
        } else {

            nw = $(this).index();
        }
        if (nw <= 1) {
            nw = 1;
        } else if (nw > 3) {
            nw = 3;
        }
        $(".flashsale-pagination").children().eq(nw).addClass('active').siblings().removeClass('active');

        action_img(nw);


    });
    $("#J_hot-sort").on("mouseover", "li", function () {
        $(this).addClass('active').siblings().removeClass('active');
        $(this).parent().parent().children('.hot-list').eq($(this).index()).show().siblings('.hot-list').hide();
    });
    $(".hot-list").on("mouseover", "li", function () {
        $(this).addClass('active2').siblings().removeClass('active2 ');
        $(this).children().find('.infor').addClass('infor2');
        $(this).siblings('li').children().find('.infor').removeClass('infor2');
        $(this).children().find('.number').addClass('number2');
        $(this).siblings().children().find('.number').removeClass('number2')
        $(this).children().find('.small-img').show();
        $(this).siblings().children().find('.small-img').hide();
        $(this).children().find('.price').show();
        $(this).siblings().children().find('.price').hide();
    });
    let mySwiper = new Swiper('.swiper-container', {
        loop: true,
        simulateTouch: false,
        autoplay: {
            reverseDirection: true,
        },

        pagination: {
            el: '.swiper-pagination',
            clickable: true,
            renderBullet: function (index, className) {

                return '<span class="' + className + '" >' + (4 - index) + '</span>'; //生成焦点数字
            }
        }
    });

    //此方法为模拟的，hover到分页器的小圆点后自动触发其本身的click事件
    $(".swiper-pagination-bullet").hover(function () {
        $(this).click(); //鼠标划上去之后，自动触发点击事件来模仿鼠标划上去的事件
    });
    $(".imgPlayer").mouseover(function () {
        mySwiper.autoplay.stop();
    });

    $(".imgPlayer").mouseout(function () {
        mySwiper.autoplay.start();
    });



})();