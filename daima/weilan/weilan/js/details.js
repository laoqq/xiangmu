/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-29 11:18:41
 * @LastEditTime: 2019-09-02 17:20:31
 * @LastEditors: Please set LastEditors
 */
(function () {
  $("#details_header").load("header.html");
  $("#details_footer").load("footer.html");
  $("#details_right").load("right.html");
  $("#J_closeTrigger").click(function () {
    $(".buy-popup").css("display", "none");
  });
  let id = location.search.slice(1);
  id = id.split("=")[1];

  function details() {
    $.ajax({
      type: "post",
      url: "../api/details.php",
      data: {
        id: id
      },
      dataType: "json",
      success: function (response) {
        ac_details(response);
      }
    });
  }

  function ac_details(arr) {
    let ht = `  <div class="book-intro" data-id=${arr[0].bookid}>
                          
                              <div class = "bgimg" > <img class="bgimg_remove" src = " ${arr[0].bookimg}"
                              style = "height: 300%; width:300%" > </div>
          
                                <h1 class="book-title">
                                   ${arr[0].booktitle}
                                </h1>
                                <div class = "book-cover">
                                  <div class = "reimg" > </div>
                                    <a class="cover-show bk-img-box" id="J_sx"
                                        href="###" >
                                        <img src = " ${arr[0].bookimg}"
                                        style = "height: 100%;" >
                                    </a>
                                    
                                </div>
                                <div class = "book-sale-info" >
                                    <div class="book-price">
                                        <p> 蔚蓝价：<span class="yuan">  ${arr[0].price} </span>
                                        </p>
                                        <p> 定&nbsp;&nbsp;价：<span
                                                class="old-price"> ${arr[0].pricing}</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                            折扣：  ${arr[0].discount} </p>
                                        <p>
                                            vip(2-3星)：
                                            <span
                                                class="common-emprice">5.0</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                            svip(4-5星):<span class="common-emprice">5.0</span>
                                        </p>
                                    </div>
                                    <div class="book-other-info">
                                        <p>
                                            <span>作&nbsp;&nbsp;&nbsp;&nbsp;者：</span>

                                            <a class="blue" href="###"> ${arr[0].bookauthor}</a>著
                                        </p>
                                        <p>
                                            <span>出&nbsp;版&nbsp;社：</span>
                                            <a href="###"> ${arr[0].bookpublish}</a>
                                        </p>
                                        <p>
                                            <span>出版时间：</span>
                                             ${arr[0].booktime}
                                        </p>
                                        <p>
                                            <span>I&nbsp;S&nbsp;B&nbsp;N&nbsp;：</span>
                                           ${arr[0].bookisbn}
                                        </p>
                                    </div>
                                    <div class="book-word-count">
                                        <p>
                                            字数： ${arr[0].words}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                            页数： ${arr[0].pages}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                            开本： ${arr[0].format}开&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                            包装： ${arr[0].pack}
                                        </p>
                                    </div>
                                    <form class="buy-panel" method="post">
                                        <p> 我要买
                                            <input name="count" type="text" id="J_buyNumField" class="good-num" onkeyup="count.value=(this.value=this.value.replace(/\D/g,'').substring(0,6)).substring(0,3)"
                                                value="1">件</p>
                                        <p class="buy-wrapper clearfix">
                                            <a href="javascript:;" class="add-to-cart sell" id="J_addToCart">加入购物车</a>
                                            <a class="add-to-fav" id="J_addToFav" href="javascript:;">我要收藏</a>
                                        </p>
                                    </form>
                                </div>
                            </div>`;
    $("#book_info").html(ht);
  }

  details();

  window.onscroll = function () {
    let ony = window.scrollY;

    if (ony >= 1007 && ony <= 1970) {
      $("#J_bookTab").css("position", "fixed");
      $("#J_bookTab").addClass("fixe");
    } else {
      $("#J_bookTab").removeClass("fixe");
      $("#J_bookTab").css("position", "");
    }
  };
  $("#J_bookTab").on("click", "li", function () {
    $(this)
      .addClass("current")
      .siblings()
      .removeClass("current");
    $(this)
      .children()
      .addClass("a_active");
    $(this)
      .siblings()
      .children()
      .removeClass("a_active");

    if ($(this).data("id") == 1) {
      window.scrollTo(0, 1007);
    } else if ($(this).data("id") == 2) {
      window.scrollTo(0, 1745);
    } else if ($(this).data("id") == 3) {
      window.scrollTo(0, 1900);
    }
  });

  $("#book_info").on("mouseover", ".book-cover", function () {
    $(".reimg").css("display", "block");
    $(".bgimg").css("display", "block");
  });
  $("#book_info").on("mouseout", ".book-cover", function () {
    $(".reimg").css("display", "none");
    $(".bgimg").css("display", "none");
  });
  $("#book_info").on("mousemove", ".book-cover", function (event) {
    let left =
      event.pageX - $(".book-info").offset().left - $(".reimg").width() / 2;
    let top =
      event.pageY - $(".book-info").offset().top - $(".reimg").height() / 2;

    if (left <= 0) {
      left = 0;
    } else if (left >= $(".book-cover").width() - $(".reimg").width()) {
      left = $(".book-cover").width() - $(".reimg").width();
    }
    if (top <= 0) {
      top = 0;
    } else if (top >= $(".book-cover").height() - $(".reimg").height()) {
      top = $(".book-cover").height() - $(".reimg").height();
    }
    let scalx = left / ($(".book-cover").width() - $(".reimg").width());
    let scaly = top / ($(".book-cover").height() - $(".reimg").height());
    let x = ($(".bgimg_remove").width() - $(".bgimg").width()) * scalx;
    let y = ($(".bgimg_remove").height() - $(".bgimg").height()) * scaly;
    $(".bgimg_remove").css({
      left: -x,
      top: -y
    });
    $(".reimg").css({
      left: left,
      top: top
    });
  });

  $("#book_info").on("change", "#J_buyNumField", function () {
    console.log(1);
    if ($("#J_buyNumField").val() >= 28) {
      $("#J_buyNumField").val(28);
      $("#J_bookDetailPopup")
        .css("display", "block")
        .children()
        .find("#J_lowStockTip")
        .css("display", "block")
        .siblings()
        .css("display", "none");
    }
  });
  $("#book_info").on("click", "#J_addToCart", function () {
    let name = $.cookie("name");
    let id = $(".book-intro").data("id");
  });
  $("#J_continueBuy").click(function () {
    $("#J_bookDetailPopup").css("display", "none");
  });
  $("#J_closeLowStockTip").click(function () {
    $("#J_bookDetailPopup").css("display", "none");
  });
  let arr = [];

  let tall = 0;
  let ptall = 0;

  function gopi() {
    $("#J_cartBookCount").html(arr.length);
    $("#J_totalPrice").html(localStorage.tall);
  }

  function ar() {
    if (localStorage.arr) {
      arr = localStorage.arr.split(",");
    }


    let price = $(".yuan").html();
    let oldprice = $(".old-price").html();
    if (localStorage.ptall && localStorage.tall) {
      localStorage.ptall = Number(localStorage.ptall) + Number(oldprice);

      localStorage.tall = Number(localStorage.tall) + Number(price);
    } else {
      localStorage.ptall = Number(oldprice);
      localStorage.tall = Number(price);
    }

    if ($("#J_buyNumField").val() >= 2) {
      for (let i = 0; i < $("#J_buyNumField").val(); i++) {
        arr.push(id);
      }
    } else {
      arr.push(id);
    }


    localStorage.arr = arr;
  }
  $("#book_info").on("click", "#J_addToCart", function () {
    let arr = [];
    if (localStorage.arr) {
      arr = localStorage.arr.split(",");
    } else {
      arr.push(localStorage.arr)
    }
    let id = $(".book-intro").data("id");
    $("#J_bookDetailPopup").css("display", "block");
    if (arr.length <= 1) {
      $("#J_bookDetailPopup")
        .find("#J_buySuccessTip")
        .css("display", "block");
      ar()
      gopi();
    } else if (arr.length >= 2 && arr.includes('id') == true) {
      $("#J_bookDetailPopup")
        .find("#J_buyAgainTip")
        .css("display", "block");
      $("#J_bookDetailPopup")
        .find("#J_buySuccessTip")
        .css("display", "none");
    } else if (arr.length >= 2 && arr.includes(id) == false) {
      $("#J_bookDetailPopup")
        .find("#J_buySuccessTip")
        .css("display", "block");
      ar()
      gopi();
    }
  });
  $("#J_buyAgainCfm").click(function () {
    $("#J_bookDetailPopup")
      .find("#J_buyAgainTip")
      .css("display", "none");
    $("#J_bookDetailPopup")
      .find("#J_buySuccessTip")
      .css("display", "block");
    ar()
    gopi();
  });
})();