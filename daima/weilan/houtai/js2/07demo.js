/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-04 16:26:30
 * @LastEditTime: 2019-09-04 20:58:44
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

    }

    function rendering() {
        $.ajax({
            type: "post",
            url: "../weilan/api/list_read.php",
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
    $('.table').on("click", ".btn-danger", function () {
        let bookid = $(this).parent().parent().children().eq(0).html();
        $.ajax({
            type: "post",
            url: "api/goodmodify.php",
            data: {
                action: 1,
                bookid: bookid
            },

            success: function (response) {
                if (response >= 1) {
                    alert('删除成功！')
                    rendering();
                } else {
                    alert('删除失败！')
                    rendering();
                }

            }
        });
        $(this).parent().parent().remove();
    })
    $('.table').on("click", ".btn-info", function () {
        let bookid = $(this).parent().parent().children().eq(0).html();
        let booktitle = $(this).parent().parent().children().eq(1).html();
        let bookauthor = $(this).parent().parent().children().eq(2).html();
        let pricing = $(this).parent().parent().children().eq(3).html();
        let price = $(this).parent().parent().children().eq(4).html();
        let discount = $(this).parent().parent().children().eq(5).html();
        let stock = $(this).parent().parent().children().eq(6).html();
        let bookdetailbookprice = $(this).parent().parent().children().eq(7).html();
        let bookimg = $(this).parent().parent().children().eq(8).html();
        $.ajax({
            type: "post",
            url: "api/goodmodify.php",
            data: {
                action: 0,
                bookid: bookid,
                booktitle: booktitle,
                bookauthor: bookauthor,
                pricing: pricing,
                price: price,
                discount: discount,
                stock: stock,
                bookdetailbookprice: bookdetailbookprice,
                bookimg: bookimg
            },
            success: function (response) {
                if (response > 0) {
                    alert("修改成功！");
                    rendering();
                } else {
                    alert("修改失败！");
                }
            }
        });
    })

    $(".form-actions").on("click", "input", function () {



        let booktitle = $(".form-horizontal").children().eq(0).find("input").val();
        let bookauthor = $(".form-horizontal").children().eq(1).find("input").val();
        let pricing = $(".form-horizontal").children().eq(2).find("input").val();
        let price = $(".form-horizontal").children().eq(3).find("input").val();
        let discount = $(".form-horizontal").children().eq(4).find("input").val();
        let stock = $(".form-horizontal").children().eq(5).find("input").val();
        let bookdetailbookprice = $(".form-horizontal").children().eq(6).find("input").val();
        let bookimg = $(".form-horizontal").children().eq(7).find("input").val();
        $.ajax({
            type: "post",
            url: "api/goodmodify.php",
            data: {
                action: 2,

                booktitle: booktitle,
                bookauthor: bookauthor,
                pricing: pricing,
                price: price,
                discount: discount,
                stock: stock,
                bookdetailbookprice: bookdetailbookprice,
                bookimg: bookimg
            },
            success: function (response) {
                if (response > 0) {
                    alert("添加成功")
                } else {
                    alert("添加失败")
                }
            }
        });
    })


})();