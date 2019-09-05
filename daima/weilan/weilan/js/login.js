/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-29 23:27:46
 * @LastEditTime: 2019-09-05 15:57:57
 * @LastEditors: Please set LastEditors
 */
(function () {
    $("#login_footer").load("footer.html");
    let ac;
    $("#J_loginBtn").click(function () {

        if ($.cookie('name') == $("#J_userName").val()) {
            alert("你已登陆");
            let url = decodeURIComponent($.cookie('url'));

            if (url != undefined) {
                window.open(url);
            } else {
                window.open('../index.html');
            }
        } else {
            let name = $("#J_userName").val();


            if (name) {
                ac = new Promise(function (resolved) {




                    $.ajax({
                        type: "post",
                        url: "../api/account.php",
                        data: {
                            name: name
                        },

                        success: function (response) {
                            resolved(response);

                        }
                    });

                });
                ac.then(function (response) {
                    response = JSON.parse(response)
                    console.log(response)
                    if (response == 1) {
                        login();
                    } else {
                        $("#J_loginErrorTip").html("账号不存在");
                    }
                })
            } else {
                $("#J_loginErrorTip").html("账号不能为空");
            }
        }
    });



    let lg;

    function login() {
        let name = $("#J_userName").val();
        let password = $("#J_pwd").val();
        let isture = $('#J_rememberMe').prop('checked');

        if (password) {

            lg = new Promise(function (resolved) {
                $.ajax({
                    type: "post",
                    url: "../api/login.php",
                    data: {
                        name: name,
                        password: password
                    },
                    dataType: "json",
                    success: function (response) {
                        console.log(response)
                        resolved(response);

                    }
                });
            })

        } else {
            $("#J_loginErrorTip").html("密码不能为空！");
        }
        lg.then(function (response) {
            if (response > 0) {
                let url = decodeURIComponent($.cookie('url'));

                if (url != undefined) {

                    if (isture) {
                        $.cookie('name', name, {
                            path: '/',
                            expires: 7
                        })
                    } else {
                        $.cookie('name', name, {
                            path: '/'
                        })
                    }
                    window.open(url);
                } else {

                    if (isture) {
                        $.cookie('name', name, {
                            path: '/',
                            expires: 7
                        })
                    } else {
                        $.cookie('name', name, {
                            path: '/'
                        })
                    }
                    window.open('../index.html');

                }


            } else {
                $("#J_loginErrorTip").html("密码错误！");
            }
        })
    }

})();