/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-22 19:51:30
 * @LastEditTime: 2019-08-24 10:09:22
 * @LastEditors: Please set LastEditors
 */
$(function () {
    $("#checkBtn").click(function () {
        if ($("#na").val() == "") {
            alert("请输入账号");
        } else if ($("#psd").val() == "" && $("#na").val()) {
            alert("密码不能为空");
        } else {
            $.ajax({
                type: "get",
                url: "api/login.php",
                data: {
                    name: $("#na").val(),
                    password: $("#psd").val()
                },
                // dataType: "",
                success: function (response) {
                    if (response == 1) {
                        alert("登陆成功");
                        location.href = "01admin.html";
                        sessionStorage.name = $("#na").val();
                    } else {
                        alert("账号或密码错误");
                    }
                }
            });
        }
    });
    $("#login_name").blur(function () {
        let reg = $("#login_name").val();
        if (reg) {
            $.ajax({
                type: "post",
                url: "api/yanzheng.php",
                data: {
                    name: reg
                },
                // dataType: "dataType",
                success: function (response) {
                    console.log(response);
                    if (response == 0) {
                        $("#in_1").html("账号不存").css('color', 'red');
                    }
                }
            });
        } else {
            $("#in_1").html("账号不能为空").css('color', 'red')

        }
    });
    let isto1 = false;
    let isto2 = false;
    $("#new_password").blur(function () {
        let password = $("#new_password").val();
        let istrue1 = checkReg.psweasy(password);
        if (istrue1 == false) {
            $("#in_2").html("密码格式错误").css('color', 'red')

        } else {
            $("#in_2").html("密码格式正确").css('color', '#58bc58')
            isto1 = true;
        }
    });
    $("#new_bgpassword").blur(function () {
        let bgpassword = $("#new_bgpassword").val();
        let password = $("#new_password").val();
        let istrue2 = checkReg.pwwagain(password, bgpassword);
        if (istrue2 == false) {
            $("#in_3").html("两次密码不一致").css('color', 'red')

        } else {
            $("#in_3").html("密码一致").css('color', '#58bc58')
            isto2 = true;
        }
    });
    $("#changePwd").click(function () {
        if (isto1 && isto2) {
            var alter = new Promise(function (resolved) {
                $.ajax({
                    type: "post",
                    url: "api/alter.php",
                    data: {
                        name: $("#new_name").val(),
                        password: $("#new_password").val()
                    },
                    //   dataType: "dataType",
                    success: function (response) {
                        console.log(response);
                        resolved(response);
                    }
                });
            });
            alter.then(function (response) {
                if (response) {
                    alert("修改成功");
                    $("#in_1").html('');
                    $("#in_2").html('');
                    $("#in_3").html('');
                } else {
                    alert("修改失败");
                }
            });
        } else {
            alert("修改失败");
        }
    });


});