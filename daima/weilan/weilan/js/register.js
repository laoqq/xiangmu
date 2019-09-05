/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @J_pwd_email: 2019-08-30 11:38:31
 * @LastEditTime: 2019-09-05 10:31:57
 * @LastEditors: Please set LastEditors
 */
let isto1 = false;
let isto2 = false;
let isto3 = false;
(function () {
    $("#register_footer").load("footer.html");
    $(".register-email").click(function () {
        $(this).addClass('register-type-selected').siblings().removeClass('register-type-selected');
        $("#J_signInFormToEmail").css("display", "block");
        $("#J_signInForm").css("display", "none");
    })
    $(".register-phone").click(function () {
        $(this).addClass('register-type-selected').siblings().removeClass('register-type-selected');
        $("#J_signInFormToEmail").css("display", "none");
        $("#J_signInForm").css("display", "block");
    })

    $("#J_email").blur(function () {
        let reg = $("#J_email").val();
        if (reg) {
            console.log(reg);
            let istrue = checkReg.email(reg);
            if (istrue) {
                $.ajax({
                    type: "post",
                    url: "../api/account.php",
                    data: {
                        name: reg
                    },
                    // dataType: "dataType",
                    success: function (response) {
                        console.log(response);
                        if (response == 1) {
                            $("#inf1").html("该邮箱已被注册").addClass("error-content");

                        } else {
                            $("#inf1").html('').addClass("success-content");
                            isto1 = true;
                        }
                    }
                });
            } else {
                $("#inf1").html("邮箱格式错误").addClass("error-content")

            }
        } else {
            $("#inf1").html("邮箱不能为空").addClass("error-content");

        }
    });
    $("#J_pwd_email").blur(function () {
        let password = $("#J_pwd_email").val();
        let istrue1 = checkReg.psweasy(password);
        if (istrue1 == false) {
            $("#inf2").html("请输入长为6-20个字符的密码，必须包含数字、字母").addClass("error-content");

        } else {
            $("#inf2").html("").addClass("success-content");
            isto2 = true;
        }
    });
    $("#J_pwd_email2").blur(function () {
        let password1 = $("#J_pwd_email2").val();
        let password2 = $("#J_pwd_email").val();
        let istrue1 = checkReg.pwwagain(password1, password2);
        if (istrue1 == false || isto2 == false) {
            $("#inf3").html("两次输入密码不匹配").addClass("error-content");

        } else {
            $("#inf3").html("").addClass("success-content");
            isto3 = true;
        }
    });
    $("#inst_btn").click(function () {
        if (isto1 && isto2 && isto3) {

            let reg = $("#J_email").val();
            let password = $("#J_pwd_email").val();
            $.ajax({
                type: "post",
                url: "../api/register.php",
                data: {

                    accution: reg,
                    password: password
                },
                // dataType: "dataType",
                success: function (response) {
                    if (response) {

                        location.href = "login.html";
                    }
                }
            });
        } else {
            if (isto1 == false) {
                $("#inf1").html("邮箱不能为空").addClass("error-content");
            } else if (isto2 == false) {
                $("#inf2").html("密码不能为空").addClass("error-content");
            } else {
                $("#inf3").html("两次输入密码不匹配").addClass("error-content");
            }
        }

    });
    let arr = [];

    $("#J_phone").blur(function () {
        let phone = $(this).val();
        if (phone == '') {
            $("#in1").html('手机号不能为空！').addClass("error-content");

        } else {
            if (checkReg.tel(phone)) {
                arr.push(1);
                $("#in1").html('').addClass("success-content");
            } else {
                $("#in1").html('手机号格式错误！').addClass("error-content");
            }
        }
    })
    $("#J_pwd").blur(function () {

    })
    var show_num = [];
    draw(show_num);
    $("#J_validCodes").blur(function () {
        let val = $(this).val().toLowerCase();
        let num = show_num.join("");

        if (val == '') {
            $("#in4").html('验证码不能为空！').addClass("error-content")
        } else if (val == num) {
            $("#in4").html("").addClass("success-content");
            // $(this).val('');
            draw(show_num);

        } else {
            $("#in4").html('验证码错误！请重新输入！').addClass("error-content")

            $(this).val('');
            draw(show_num);
        }
    })


    $("#canvas").on('click', function () {
        draw(show_num);
    })

    function draw(show_num) {
        var canvas_width = $('#canvas').width();
        var canvas_height = $('#canvas').height();
        var canvas = document.getElementById("canvas"); //获取到canvas的对象，演员
        var context = canvas.getContext("2d"); //获取到canvas画图的环境，演员表演的舞台
        canvas.width = canvas_width;
        canvas.height = canvas_height;
        var sCode = "A,B,C,E,F,G,H,J,K,L,M,N,P,Q,R,S,T,W,X,Y,Z,1,2,3,4,5,6,7,8,9,0";
        var aCode = sCode.split(",");
        var aLength = aCode.length; //获取到数组的长度

        for (var i = 0; i <= 3; i++) {
            var j = Math.floor(Math.random() * aLength); //获取到随机的索引值
            var deg = Math.random() * 30 * Math.PI / 180; //产生0~30之间的随机弧度
            var txt = aCode[j]; //得到随机的一个内容
            show_num[i] = txt.toLowerCase();
            var x = 10 + i * 20; //文字在canvas上的x坐标
            var y = 20 + Math.random() * 8; //文字在canvas上的y坐标
            context.font = "bold 23px 微软雅黑";

            context.translate(x, y);
            context.rotate(deg);

            context.fillStyle = randomColor();
            context.fillText(txt, 0, 0);

            context.rotate(-deg);
            context.translate(-x, -y);
        }
        for (var i = 0; i <= 5; i++) { //验证码上显示线条
            context.strokeStyle = randomColor();
            context.beginPath();
            context.moveTo(Math.random() * canvas_width, Math.random() * canvas_height);
            context.lineTo(Math.random() * canvas_width, Math.random() * canvas_height);
            context.stroke();
        }
        for (var i = 0; i <= 30; i++) { //验证码上显示小点
            context.strokeStyle = randomColor();
            context.beginPath();
            var x = Math.random() * canvas_width;
            var y = Math.random() * canvas_height;
            context.moveTo(x, y);
            context.lineTo(x + 1, y + 1);
            context.stroke();
        }
    }

    function randomColor() { //得到随机的颜色值
        var r = Math.floor(Math.random() * 256);
        var g = Math.floor(Math.random() * 256);
        var b = Math.floor(Math.random() * 256);
        return "rgb(" + r + "," + g + "," + b + ")";
    }

})();