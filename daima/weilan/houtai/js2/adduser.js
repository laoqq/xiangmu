/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-23 15:05:52
 * @LastEditTime: 2019-09-04 16:36:43
 * @LastEditors: Please set LastEditors
 */
let isto1 = false;
let isto2 = false;
(function () {

    $("#accution").blur(function () {
        let reg = $("#accution").val();
        if (reg) {
            console.log(reg);
            let istrue = checkReg.email(reg);
            if (istrue) {
                $.ajax({
                    type: "post",
                    url: "api/yanzheng.php",
                    data: {
                        name: reg
                    },
                    // dataType: "dataType",
                    success: function (response) {
                        console.log(response);
                        if (response == 1) {
                            $("#inuser_1").html("邮箱已存在").css('color', 'red');

                        } else {
                            $("#inuser_1").html("邮箱可以添加").css('color', '#58bc58');
                            isto1 = true;
                        }
                    }
                });
            } else {
                $("#inuser_1").html("邮箱格式错误").css('color', 'red')

            }
        } else {
            $("#inuser_1").html("邮箱不能为空").css('color', 'red')

        }
    });
    $("#date").blur(function () {
        let password = $("#date").val();
        let istrue1 = checkReg.psweasy(password);
        if (istrue1 == false) {
            $("#inuser_2").html("密码格式错误").css('color', 'red')

        } else {
            $("#inuser_2").html("密码格式正确").css('color', '#58bc58')
            isto2 = true;
        }
    });
    $("#inst_btn").click(function () {
        if (isto1 && isto2) {
            let required = $("#required").val()
            let reg = $("#accution").val();
            let password = $("#date").val();
            $.ajax({
                type: "post",
                url: "api/adduser.php",
                data: {
                    required: required,
                    accution: reg,
                    password: password
                },
                // dataType: "dataType",
                success: function (response) {
                    if (response) {
                        $("#inuser_3").html("添加成功").css('color', '#58bc58')

                    } else {
                        $("#inuser_3").html("添加失败").css('color', 'red')
                    }
                }
            });
        } else {
            $("#inuser_3").html("添加失败").css('color', 'red')
        }

    });

})();