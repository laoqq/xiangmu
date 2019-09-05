/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-30 15:05:28
 * @LastEditTime: 2019-09-05 15:16:08
 * @LastEditors: Please set LastEditors
 */
(function () {
    $("#shopping_header").load("header.html");
    $("#shopping_footer").load("footer.html");
    $("#shopping_right").load("right.html");

    function scart(data, nub) {

        return ` <fieldset id="group" class="cart-group"
       data-id=${data[0].bookid}>
                            <table class="cart-detail">
                                <tbody>
                                    <tr class="cart-list-tr" style="border-bottom:0px;">
                                        <td class="col-cover" width="460">
                                            <div class = "cover-info" > <input deid=${data[0].bookid} type = "checkbox"
                                            class= "selt"
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

    function na() {
        // $.cookie('name').name
        $.ajax({
            type: "post",
            url: "../api/shop.php",
            data: {
                name: $.cookie(name).name
            },
            dataType: "json",
            success: function (response) {

                localStorage.arr = response[0].gid;
                localStorage.tall = response[0].price;
                localStorage.ptall = response[0].oldprice;

            }
        });
        shop();
    }


    function cu() {
        console.log(1);
        if ($.cookie(name).name) {
            let me = $.cookie(name).name;
            let prm = new Promise(function (resolved) {
                $.ajax({
                    type: "post",
                    url: "../api/act.php",
                    data: {
                        name: me
                    },
                    // dataType: "json",
                    success: function (response) {
                        resolved(response);

                    }
                });
            })
            prm.then(function (response) {
                let na = $.cookie(name).name;

                if (response == 1) {
                    $.ajax({
                        type: "post",
                        url: "../api/shoppingcart.php",
                        data: {
                            shoppinglist: (localStorage.arr),
                            price: (localStorage.tall),
                            oldprice: (localStorage.ptall),
                            name: na,
                            sk: 1
                        },
                        success: function (response) {
                            localStorage.removeItem('tall');
                            localStorage.removeItem('ptall');
                            localStorage.removeItem('arr');
                        }
                    });
                } else {
                    $.ajax({
                        type: "post",
                        url: "../api/shoppingcart.php",
                        data: {
                            shoppinglist: (localStorage.arr),
                            price: (localStorage.tall),
                            oldprice: (localStorage.ptall),
                            name: na,
                            sk: 0
                        },
                        success: function (response) {

                        }
                    });
                }

            })

        }
    }

    function shopp() {

        cu()
        $("#J_price").html(localStorage.tall)
        $('#J_total').html(localStorage.tall)
        $("#J_thriftPrice").html(Number(localStorage.ptall) - Number(localStorage.tall))
    }

    function shop() {
        cu();
        $("#J_price").html(localStorage.tall)
        $('#J_total').html(localStorage.tall)
        $("#J_thriftPrice").html(Number(localStorage.ptall) - Number(localStorage.tall))
        let str1 = [];
        let str2 = [];
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

    function action() {
        if ($.cookie(name).length >= 1 && localStorage.arr == null) {
            na()

        } else {
            shop();
        }
    }
    action()

    function cl() {
        $.ajax({
            type: "post",
            url: "../api/clean.php",
            data: {
                name: $.cookie(name).name
            },

            success: function (response) {

            }
        });
    }
    $("#J_empty").click(function () {

        let ok = confirm('您确定要清空购物车吗？');
        if (ok) {
            // $("#J_price").html('')
            // $('#J_total').html('')
            localStorage.removeItem('arr');
            localStorage.removeItem('tall');
            localStorage.removeItem('ptall');
            $(".cart-list").html('');
            location.reload();
            cl()
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
                cl();
                shop()

            } else {
                $("#J_price").html('');
                $('#J_total').html('');
                localStorage.arr = ar;
                shop()
            }
        }
    })
    //封装
    function mun(t, num) {
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
        str1.sort();
        for (let j = 0; j < str1.length; j++) {
            let s = new RegExp(str1[j], 'g');
            str2[j] = localStorage.arr.match(s).length;
        }
        let id = t.parent().attr("index");
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
        let nprice = t.parent().parent().prev().prev().html();
        let dprice = t.parent().parent().prev().html();
        localStorage.tall = localStorage.tall - nprice * nub + nprice * num;
        localStorage.ptall = localStorage.ptall - (dprice * 1 + nprice * 1) * nub + (dprice * 1 + nprice * 1) * num;
        shopp();
    }

    $('.cart-list').on("change", ".buy-num", function () {

        let num = 0;
        if ($(this).val() * 1 > 28) {
            alert('你购买的数量超过库存量')
            $(this).val(28);
            num = 28;
        } else {
            num = $(this).val();
        }
        mun($(this), num)

    })

    $('.cart-list').on("click", ".plus", function () {


        let num = $(this).prev().val() * 1;
        num++;


        if (num > 28) {
            alert('你购买的数量超过库存量')
            $(this).val(28);
            num = 28;
        } else {
            $(this).prev().val(num);
        }

        // let str1 = [];
        // let str2 = [];
        // // $("#J_price").html(localStorage.tall)
        // // $('#J_total').html(localStorage.tall)
        // // $("#J_thriftPrice").html(Number(localStorage.ptall) - Number(localStorage.tall))
        // let arr = []
        // if (localStorage.arr) {
        //     arr = localStorage.arr.split(',');
        // }

        // for (let i = 0; i < arr.length; i++) {
        //     if (!str1.includes(arr[i])) {
        //         str1.push(arr[i]);
        //     }
        // }
        // str1.sort();
        // for (let j = 0; j < str1.length; j++) {
        //     let s = new RegExp(str1[j], 'g');
        //     str2[j] = localStorage.arr.match(s).length;
        // }
        // let id = $(this).parent().attr("index");
        // let inx = str1.indexOf(id);
        // let nub = str2[inx];
        // str2[inx] = num;
        // let newarr = [];
        // for (let i = 0; i < str1.length; i++) {
        //     for (let j = 0; j < str2[i]; j++) {
        //         newarr.push(str1[i]);
        //     }
        // }
        // localStorage.arr = newarr;
        // let nprice = $(this).parent().parent().prev().prev().html();
        // let dprice = $(this).parent().parent().prev().html();
        // localStorage.tall = localStorage.tall - nprice * nub + nprice * num;
        // localStorage.ptall = localStorage.ptall - (dprice * 1 + nprice * 1) * nub + (dprice * 1 + nprice * 1) * num;
        // shopp();
        mun($(this), num)
    })
    $('.cart-list').on("click", ".minus", function () {

        let num = $(this).next().val() * 1;
        num--;

        if (num < 1) {
            $(this).val(1);
            num = 1;
        } else {
            $(this).next().val(num);
        }
        // let str1 = [];
        // let str2 = [];
        // // $("#J_price").html(localStorage.tall)
        // // $('#J_total').html(localStorage.tall)
        // // $("#J_thriftPrice").html(Number(localStorage.ptall) - Number(localStorage.tall))
        // let arr = []
        // if (localStorage.arr) {
        //     arr = localStorage.arr.split(',');
        // }

        // for (let i = 0; i < arr.length; i++) {
        //     if (!str1.includes(arr[i])) {
        //         str1.push(arr[i]);
        //     }
        // }
        // for (let j = 0; j < str1.length; j++) {
        //     let s = new RegExp(str1[j], 'g');
        //     str2[j] = localStorage.arr.match(s).length;
        // }

        // let id = $(this).parent().attr("index");
        // let inx = str1.indexOf(id);
        // let nub = str2[inx];
        // str2[inx] = num;
        // console.log(str2);
        // let newarr = [];
        // for (let i = 0; i < str1.length; i++) {
        //     for (let j = 0; j < str2[i]; j++) {
        //         newarr.push(str1[i]);
        //     }
        // }
        // console.log(newarr)
        // localStorage.arr = newarr;
        // let nprice = $(this).parent().parent().prev().prev().html();
        // let dprice = $(this).parent().parent().prev().html();
        // localStorage.tall = localStorage.tall - nprice * nub + nprice * num;
        // localStorage.ptall = localStorage.ptall - (dprice * 1 + nprice * 1) * nub + (dprice * 1 + nprice * 1) * num;
        // shopp();
        mun($(this), num)
    })
    $("#J_select").click(function () {

        for (let i = 0; i < $('.cart-list').find('.selt').length; i++)
            if ($('.cart-list').find('.selt').eq(i).prop('checked')) {
                let data = $('.cart-list').find('.selt').eq(i).attr("deid");
                // let nprice = $(this).parent().parent().next().next().attr("prc");
                // let dprice = $(this).parent().parent().next().next().next().attr("drc")
                $.ajax({
                    type: "post",
                    url: "../api/details.php",
                    data: {
                        id: data
                    },
                    dataType: "json",
                    success: function (response) {
                        let nprice = response[0].price
                        let dprice = response[0].pricing
                        localStorage.tall = Number(localStorage.tall) - Number(nprice);
                        localStorage.ptall = Number(localStorage.ptall) - Number(nprice) - Number(dprice);
                    }
                });


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
                    shop()
                    localStorage.removeItem('tall');
                    localStorage.removeItem('ptall');
                    $("#J_price").html('');
                    $('#J_total').html('');
                    $("#J_thriftPrice").html('');
                    $(".cart-list").html('');
                    cl();
                    location.reload();

                } else {
                    $("#J_price").html('');
                    $('#J_total').html('');
                    localStorage.arr = ar;
                    shop()
                }
            }

    })
    $('#select').click(function () {
        // console.log($('.cart-list').find('.selt').length.length)
        for (let i = 0; i < $('.cart-list').find('.selt').length; i++) {
            let isture = $('.cart-list').find('.selt').eq(i).prop('checked')
            $('.cart-list').find('.selt').eq(i).prop('checked', !isture);


        }
    })
})()