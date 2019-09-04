/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-03 23:02:55
 * @LastEditTime: 2019-09-04 16:17:55
 * @LastEditors: Please set LastEditors
 */
(function () {
    function page(arr) {

        $(".page_1").html("");
        var obj_1 = {
            obj_box: ".page_1", //翻页容器
            total_item: arr.total, //条目总数
            per_num: 10, //每页条目数
            current_page: 1 //当前页
        };
        /*调用分页方法,初始化数据*/
        page_ctrl(obj_1);
        // if (obj_1.total_item <= 10) {
        //     $(".page_1").css("display", "none");
        // } else {
        //     $(".page_1").css("display", "block");
        // }
    }

    function rendering() {
        $.ajax({
            type: "post",
            url: "api/userlist.php",
            data: {
                mun: 1,
                pages: 20
            },
            dataType: "json",
            success: function (response) {
                page(response)

            }
        });

    }
    rendering();
    // $(".table").on("change", '.pw', function () {
    //     console.log(1);
    //     if ($(this).html()) {
    //         let isture = checkReg.psweasy($(this).html());
    //         if (isture) {
    //             alert('密码格式错误！')
    //         }                                                                    
    //     } else {
    //         alert("密码不能为空！")
    //     }
    // })
    $('.table').on("click", ".btn-success", function () {
        let id = $(this).parent().prev().prev().prev().html();
        let password = $(this).parent().prev().prev().html();
        let email = $(this).parent().prev().html();
        console.log(password, email)
        if (password == '' || email == '') {
            alert('邮箱或密码不能为空！');
        } else {
            let psture = checkReg.psweasy(password);
            let emture = checkReg.email(email);
            if (psture && emture) {
                $.ajax({
                    type: "post",
                    url: "api/usermodify.php",
                    data: {
                        id: id,
                        action: 0,
                        name: email,
                        pd: password
                    },
                    // dataType: "dataType",
                    success: function (response) {
                        console.log(response);
                        if (response >= 1) {
                            alert("修改成功");
                            rendering();
                        }
                    }
                });
            } else {
                alert('邮箱或密码格式不正确！' + '     ' + '密码格式为6-18位且首字母开头');
            }


        }
    })
    $('.table').on("click", ".btn-danger", function () {
        let id = $(this).parent().prev().prev().prev().html() * 1;
        $.ajax({
            type: "post",
            url: "api/usermodify.php",
            data: {
                id: id,
                action: 1
            },
            success: function (response) {}
        });
        $(this).parent().parent().remove();
    })
})();