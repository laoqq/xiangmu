/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @J_pwd_email: 2019-08-30 11:38:31
 * @LastEditTime: 2019-08-30 14:59:58
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
})();