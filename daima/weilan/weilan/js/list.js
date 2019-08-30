/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-26 19:34:40
 * @LastEditTime: 2019-08-30 11:00:14
 * @LastEditors: Please set LastEditors
 */
(function () {
  $("#list_header").load("header.html");

  $("#list_footer").load("footer.html");
  $("#list_right").load("right.html");


  let isture = true;
  $("#categoriesTree_1_switch").click(function () {
    if (isture) {
      $(this).addClass("root_open");
      $("#categoriesTree_1_ul").slideDown();

      isture = false;
    } else {
      isture = true;
      $(this).addClass("root_close");
      $("#categoriesTree_1_ul").slideUp();
    }
    let isture2 = true;

    $("#categoriesTree_2_switch").click(function () {
      if (isture2) {
        isture2 = false;
        $(this).addClass("root_open");
        $("#categoriesTree_2_ul").slideDown();
      } else {
        isture2 = true;
        $(this).addClass("root_close");
        $("#categoriesTree_2_ul").slideUp();
      }
    });
  });
  let pages = 20;
  let mun = 1;

  localStorage.url = "../api/list_read.php";

  localStorage.order = "volume";
  localStorage.action = 0;
  localStorage.pbegin = null;
  localStorage.pend = null;
  localStorage.bbegin = null;
  localStorage.bend = null;

  function rendering() {
    $.ajax({
      type: "post",
      url: localStorage.url,
      data: {
        mun: mun,
        pages: 20,
        pbegin: localStorage.pbegin,
        pend: localStorage.pend,
        bbegin: localStorage.bbegin,
        bend: localStorage.bend,
        order: localStorage.order,
        action: localStorage.action
      },
      // dataType: "json",
      success: function (response) {
        let arr = JSON.parse(response);
        page(arr);
      }
    });
  }

  function page(arr) {
    $(".page_1").html("");
    var obj_1 = {
      obj_box: ".page_1", //翻页容器
      total_item: arr.total, //条目总数
      per_num: 20, //每页条目数
      current_page: 1 //当前页
    };
    /*调用分页方法,初始化数据*/
    page_ctrl(obj_1);
    if (obj_1.total_item <= 20) {
      $(".page_1").css("display", "none");
    } else {
      $(".page_1").css("display", "block");
    }
  }
  rendering();

  $(".byPrice").on("click", "span", function () {
    $(this)
      .addClass("active")
      .siblings()
      .removeClass("active");

    if ($(this).attr("end") == "" && localStorage.bbegin == "null") {
      localStorage.pbegin = null;
      localStorage.pend = null;
      localStorage.url = "../api/list_read.php";
      rendering();
    } else if ($(this).attr("end") == "" && localStorage.bbegin != "null") {
      localStorage.pbegin = null;
      localStorage.pend = null;
      localStorage.action = -1;
      localStorage.url = "../api/price.php";
      rendering();
    } else if ($(this).attr("end") == "" && localStorage.bbegin == "null") {
      localStorage.pbegin = null;
      localStorage.pend = null;
      localStorage.action = -2;
      localStorage.url = "../api/price.php";
      rendering();
    } else if ($(this).attr("end") == "" && localStorage.bbegin != "null") {
      localStorage.pbegin = null;
      localStorage.pend = null;
      localStorage.action = -3;
      localStorage.url = "../api/price.php";
      rendering();
    } else {
      localStorage.pbegin = Number($(this).attr("begin"));
      localStorage.pend = Number($(this).attr("end"));
      if (localStorage.bbegin == "null") {
        localStorage.action = 1;
        localStorage.url = "../api/price.php";
        rendering();
        // localStorage.action = action;
      } else if (localStorage.bbegin != "null") {
        localStorage.action = 3;
        localStorage.url = "../api/price.php";
        rendering();
      } else if (localStorage.bbegin == "null") {
        localStorage.action = 2;
        localStorage.url = "../api/price.php";
        rendering();
      } else if (localStorage.bbegin != "null") {
        localStorage.action = 3;
        localStorage.url = "../api/price.php";
        rendering();
      }
    }
  });
  $(".byDiscount").on("click", "span", function () {
    $(this)
      .addClass("active")
      .siblings()
      .removeClass("active");
    if ($(this).attr("end") == "" && localStorage.pend == "null") {
      localStorage.bbegin = null;
      localStorage.bend = null;
      localStorage.url = "../api/list_read.php";
      rendering();
    } else if ($(this).attr("end") == "" && localStorage.pend != "null") {
      localStorage.bbegin = null;
      localStorage.bend = null;
      localStorage.action = 1;
      localStorage.url = "../api/price.php";
      rendering();
    } else {
      localStorage.bbegin = Number($(this).attr("begin"));
      localStorage.bend = Number($(this).attr("end"));
      if (localStorage.pend == "null") {
        localStorage.action = -3;
        localStorage.url = "../api/price.php";
        rendering();
      } else if (localStorage.pend != "null") {
        localStorage.action = 3;
        localStorage.url = "../api/price.php";
        rendering();
      }
    }

    // if (localStorage.pend == 'null' && localStorage.order == 'volume') {
    //   localStorage.action = 4;
    //   localStorage.url = "../api/price.php";
    //   rendering();
    // }

    // }
  });
  $("#J_sortHolder").on("click", ".down", function () {
    $(this)
      .addClass("activeup")
      .siblings()
      .removeClass("activeup");

    if (localStorage.pend == "null" && localStorage.bend == "null") {
      localStorage.action = -2;
      localStorage.order = $(this).attr("order");
      localStorage.url = "../api/price.php";
      rendering();
    } else if (localStorage.pend != "null" && localStorage.bend == "null") {
      localStorage.action = 1;
      localStorage.order = $(this).attr("order");
      localStorage.url = "../api/price.php";
      rendering();
    } else if (localStorage.pend == "null" && localStorage.bend != "null") {
      localStorage.action = -3;
      localStorage.order = $(this).attr("order");
      localStorage.url = "../api/price.php";
      rendering();
    } else if (localStorage.pend != "null" && localStorage.bend != "null") {
      localStorage.action = 3;
      localStorage.order = $(this).attr("order");
      localStorage.url = "../api/price.php";
      rendering();
    }
  });
  localStorage.style = "list1";

  $("#list1").click(function () {
    localStorage.style = "list1";
    $(this).addClass("list-pic");
    $("#list2").removeClass("list-pic");
    rendering();
  });
  $("#list2").click(function () {
    localStorage.style = "list2";
    $(this).addClass("list-pic");
    $("#list1").removeClass("list-pic");
    rendering();
  });

  $("#J_template ").on("click", ".buy-btn", function () {
    $(".box").css("display", "block");
    $(".cpt-dlg-outer").css("display", "block");
  });
  $(".dlg-holder").on("click", ".dlg-close", function () {
    $(".box").css("display", "none");
    $(".cpt-dlg-outer").css("display", "none");
  });
  $(".dlg-holder").on("click", "button", function () {
    $(".box").css("display", "none");
    $(".cpt-dlg-outer").css("display", "none");
  });
  $("#J_template ").on("click", ".save-btn", function () {
    $(".box").css("display", "block");
    $(".cpt-dlg-outer").css("display", "block");
    $(".dlg-holder")
      .find(".min")
      .html("收藏成功");
    $(".dlg-holder")
      .find(".alert-ico")
      .css("background-position", "0");
  });
  $("#J_template ").on("click", ".a_amtion", function () {
    let id = $(this)
      .parent(".search-book-list")
      .data("id");

    window.open("details.html?id=" + id);
    // $(".box").css("display", "block");
    // $(".cpt-dlg-outer").css("display", "block");
  });
})();