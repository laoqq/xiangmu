/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-30 15:05:28
 * @LastEditTime: 2019-09-02 18:01:27
 * @LastEditors: Please set LastEditors
 */
(function () {
    $("#shopping_header").load("header.html");
    $("#shopping_footer").load("footer.html");
    $("#shopping_right").load("right.html");



    function shopp() {
        if (!$.cookie(name)) {
            $.ajax({
                type: "post",
                url: "../api/shoppingcart.php",
                data: {
                    shoppinglist: localStorage.arr,
                    name: $.cookie(name)
                },

                success: function (response) {

                }
            });
        }
        let str1 = [];
        let str2 = [];
        $("#J_price").html(localStorage.tall)
        $('#J_total').html(localStorage.tall)
        $("#J_thriftPrice").html(Number(localStorage.ptall) - Number(localStorage.tall))
        let arr = []
        if (localStorage.arr) {
            arr = localStorage.arr.split(',');
        }


        for (let i = 0; i < arr.length; i++) {
            if (!str1.includes(arr[i])) {
                str1.push(arr[i]);
            }

        }
        for (let j = 0; j < str1.length; j++) {
            let s = new RegExp(str1[j], 'g');

            str2[j] = localStorage.arr.match(s).length;
        }

        var html = '';
        for (let m = 0; m < str1.length; m++) {

            $.ajax({
                type: "post",
                url: "../api/details.php",
                data: {
                    id: str1[m]
                },
                dataType: "json",
                success: function (response) {

                    html += scart(response, str2[m]);
                    $(".cart-list").html(html);
                }
            });

        }
    }


    function scart(data, nub) {
        return ` <fieldset id="group" class="cart-group cart-group-0 data-id="${data[0].bookid} >
                            <table class="cart-detail">
                                <tbody>
                                    <tr class="cart-list-tr" style="border-bottom:0px;">
                                        <td class="col-cover" width="460">
                                            <div class = "cover-info" > <input type = "checkbox"
                                            id = "selt"
                                            style = "position: absolute; top:40px;left: 15px;" > <a href = "###"
                                                    class="book-cover"> <img
                                                        src = "${data[0].bookimg}"
                                                        alt = "书籍封面" >
                                                    <input type="hidden" class="J_bookId" name="bookId" value="9110821">
                                                </a> <a class="book-name" title="漫画美的人（上）"
                                                    href="###" target="_blank">${data[0].booktitle}</a> </div>
                                        </td>
                                        <td class="col-credit">3</td>
                                        <td class="col-wl-price common-price" style="padding-top:0;" id="pr" prc=" ${data[0].price}">
                                         ${data[0].price} </td>
                                        <td class="col-discount common-price" drc="${Number(data[0].pricing) - Number(data[0].price)}" id='dr'> ${Number(data[0].pricing) - Number(data[0].price)} </td>
                                        <td class="col-buy-num">
                                            <div class="num-panel" index= ${data[0].bookid}> <a href="javascript:;" class="minus"></a> <input type="text" class="buy-num" value="${nub}"> <a href="javascript:;" class="plus"></a> </div>
                                        </td>
                                        <td class="col-op"> <a href="javascript:;" class="J_collect">收藏</a> <a href="###" class="J_del" id="del" index= ${data[0].bookid}>删除</a> </td>
                                    </tr>
                                </tbody>
                            </table>
                        </fieldset>`
    }
    shopp();
    $("#J_empty").click(function () {
        console.log(1)
        let ok = confirm('您确定要清空购物车吗？');
        if (ok) {
            // $("#J_price").html('')
            // $('#J_total').html('')
            localStorage.removeItem('arr');
            localStorage.removeItem('tall');
            localStorage.removeItem('ptall');
            $(".cart-list").html('');
            location.reload();
        }
    })


    $(".dlg-close").click(function () {
        $("#dlg").css('display', 'none');
    })

    function com() {
        $("#dlg").css('display', 'block');

        $(".dlg-footer").children().eq(0).click(function () {
            // ist = ;
            localStorage.ok = 1;

            $("#dlg").css('display', 'none');

        })


    }
    $(".dlg-footer").children().eq(1).click(function () {
        $("#dlg").css('display', 'none');
    })
    $(".cart-list").on("click", "#del", function () {

        let isok = confirm('您确定不购买该商品？')

        if (isok) {
            let data = $(this).attr("index");
            let nprice = $(this).parent().prev().prev().prev().attr("prc");
            let dprice = $(this).parent().prev().prev().attr("drc")
            console.log(data);
            localStorage.tall = Number(localStorage.tall) - Number(nprice);
            localStorage.ptall = Number(localStorage.ptall) - Number(nprice) - Number(dprice);
            let s = localStorage.arr;
            let reg = new RegExp(data, 'g');
            let reg2 = /,{2,}/g;
            let ns = s.replace(reg, '');
            ns = ns.replace(reg2, '');

            let ar = ns.split(',');
            if (ar[0] == '') {
                ar.shift()
            } else if (ar[ar.length - 1] == '') {
                ar.pop();
            }

            localStorage.removeItem('arr');
            if (ar.length == 0) {
                localStorage.removeItem('tall');
                localStorage.removeItem('ptall');
                $("#J_price").html('');
                $('#J_total').html('');
                $("#J_thriftPrice").html('');
                $(".cart-list").html('');


            } else {
                $("#J_price").html('');
                $('#J_total').html('');
                localStorage.arr = ar;
                shopp();
            }
        }
    })

    function mun(num) {

    }
    //封装出问题 封装后功能不管用
    $('.cart-list').on("change", ".buy-num", function () {

        let num = 0;
        if ($(this).val() * 1 > 28) {
            alert('你购买的数量超过库存量')
            $(this).val(28);
            num = 28;
        } else {
            num = $(this).val();
        }

        let str1 = [];
        let str2 = [];
        // $("#J_price").html(localStorage.tall)
        // $('#J_total').html(localStorage.tall)
        // $("#J_thriftPrice").html(Number(localStorage.ptall) - Number(localStorage.tall))
        let arr = []
        if (localStorage.arr) {
            arr = localStorage.arr.split(',');
        }

        for (let i = 0; i < arr.length; i++) {
            if (!str1.includes(arr[i])) {
                str1.push(arr[i]);
            }
        }
        for (let j = 0; j < str1.length; j++) {
            let s = new RegExp(str1[j], 'g');
            str2[j] = localStorage.arr.match(s).length;
        }
        let id = $(this).parent().attr("index");
        let inx = str1.indexOf(id);
        let nub = str2[inx];
        str2[inx] = num;
        let newarr = [];
        for (let i = 0; i < str1.length; i++) {
            for (let j = 0; j < str2[i]; j++) {
                newarr.push(str1[i]);
            }
        }
        localStorage.arr = newarr;
        let nprice = $(this).parent().parent().prev().prev().html();
        let dprice = $(this).parent().parent().prev().html();
        localStorage.tall = localStorage.tall - nprice * nub + nprice * num;
        localStorage.ptall = localStorage.ptall - (dprice * 1 + nprice * 1) * nub + (dprice * 1 + nprice * 1) * num;
        shopp();
    })

    $('.cart-list').on("click", ".plus", function () {


        let num = $(this).prev().val() * 1;
        num++;

        $(this).prev().val(num);
        if (num > 28) {
            alert('你购买的数量超过库存量')


            $(this).val(28);
            num = 28;
        }

        let str1 = [];
        let str2 = [];
        // $("#J_price").html(localStorage.tall)
        // $('#J_total').html(localStorage.tall)
        // $("#J_thriftPrice").html(Number(localStorage.ptall) - Number(localStorage.tall))
        let arr = []
        if (localStorage.arr) {
            arr = localStorage.arr.split(',');
        }

        for (let i = 0; i < arr.length; i++) {
            if (!str1.includes(arr[i])) {
                str1.push(arr[i]);
            }
        }
        for (let j = 0; j < str1.length; j++) {
            let s = new RegExp(str1[j], 'g');
            str2[j] = localStorage.arr.match(s).length;
        }
        let id = $(this).parent().attr("index");
        let inx = str1.indexOf(id);
        let nub = str2[inx];
        str2[inx] = num;
        let newarr = [];
        for (let i = 0; i < str1.length; i++) {
            for (let j = 0; j < str2[i]; j++) {
                newarr.push(str1[i]);
            }
        }
        localStorage.arr = newarr;
        let nprice = $(this).parent().parent().prev().prev().html();
        let dprice = $(this).parent().parent().prev().html();
        localStorage.tall = localStorage.tall - nprice * nub + nprice * num;
        localStorage.ptall = localStorage.ptall - (dprice * 1 + nprice * 1) * nub + (dprice * 1 + nprice * 1) * num;
        shopp();
    })
    $('.cart-list').on("click", ".minus", function () {


        let num = $(this).next().val() * 1;
        num--;

        $(this).next().val(num);
        if (num < 1) {



            $(this).val(1);
            num = 1;
        }

        let str1 = [];
        let str2 = [];
        // $("#J_price").html(localStorage.tall)
        // $('#J_total').html(localStorage.tall)
        // $("#J_thriftPrice").html(Number(localStorage.ptall) - Number(localStorage.tall))
        let arr = []
        if (localStorage.arr) {
            arr = localStorage.arr.split(',');
        }

        for (let i = 0; i < arr.length; i++) {
            if (!str1.includes(arr[i])) {
                str1.push(arr[i]);
            }
        }
        for (let j = 0; j < str1.length; j++) {
            let s = new RegExp(str1[j], 'g');
            str2[j] = localStorage.arr.match(s).length;
        }
        let id = $(this).parent().attr("index");
        let inx = str1.indexOf(id);
        let nub = str2[inx];
        str2[inx] = num;
        let newarr = [];
        for (let i = 0; i < str1.length; i++) {
            for (let j = 0; j < str2[i]; j++) {
                newarr.push(str1[i]);
            }
        }
        localStorage.arr = newarr;
        let nprice = $(this).parent().parent().prev().prev().html();
        let dprice = $(this).parent().parent().prev().html();
        localStorage.tall = localStorage.tall - nprice * nub + nprice * num;
        localStorage.ptall = localStorage.ptall - (dprice * 1 + nprice * 1) * nub + (dprice * 1 + nprice * 1) * num;
        shopp();
    })
})()