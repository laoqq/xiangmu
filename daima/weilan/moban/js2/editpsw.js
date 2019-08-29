/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-23 10:35:57
 * @LastEditTime: 2019-08-24 09:47:15
 * @LastEditors: Please set LastEditors
 */

$(function () {
    var istrue1 = false;
    var istrue2 = false;
    $("#pwd").blur(function () {
        let password = $.trim($("#pwd").val());
        if (password) {
            let istrue = checkReg.psweasy(password);
            if (istrue == false) {
                $("#inf_1").html("密码格式错误");
                $("#inf_1").css('color', 'red');
            } else {
                $("#inf_1").html("密码格式正确");
                $("#inf_1").css('color', '#58bc58');
                istrue1 = true;
            }
        } else {
            $("#inf_1").html("密码不能为空");
            $("#inf_1").css('color', 'red');
        }
    });
    $("#pwd2").blur(function () {
        let bgpassword = $.trim($("#pwd2").val());
        let password = $.trim($("#pwd").val());
        let istrue = checkReg.pwwagain(password, bgpassword);
        if (bgpassword) {
            if (istrue == false) {
                $("#inf_2").html("两次密码不一致");
                $("#inf_2").css('color', 'red');
            } else {
                $("#inf_2").html("密码一致");
                $("#inf_2").css('color', '#58bc58');
                istrue2 = true;
            }
        } else {
            $("#inf_2").html("密码不能为空");
            $("#inf_2").css('color', 'red');
        }
    });

    $("#success_btn").click(function () {

        let password = $("#pwd").val();
        let name = sessionStorage.name;
        if (istrue1 && istrue2) {
            $.ajax({
                type: "post",
                url: "api/alter.php",
                data: {
                    name: name,
                    password: password
                },
                success: function (res) {
                    if (res) {
                        sessionStorage.removeItem("name");
                        alert('修改成功请重新登陆');
                        window.opener = null;
                        window.open('', '_self');
                        window.close();
                        window.open('09login.html');
                    } else {
                        alert("修改失败");
                    }
                }
            });


        } else {
            alert('请正确的输入密码')
        }


    });
})