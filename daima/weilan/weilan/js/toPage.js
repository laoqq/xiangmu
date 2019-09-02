/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2018-09-12 08:27:06
 * @LastEditTime: 2019-09-02 00:15:39
 * @LastEditors: Please set LastEditors
 */
function page_ctrl(data_obj) {
  var obj_box =
    data_obj.obj_box !== undefined ?
    data_obj.obj_box :
    function () {
      return;
    }; //翻页容器dom对象,必要参数
  var total_item =
    data_obj.total_item !== undefined ? Number(data_obj.total_item) : 0; //数据条目总数,默认为0,组件将不加载
  var per_num = data_obj.per_num !== undefined ? Number(data_obj.per_num) : 10; //每页显示条数,默认为10条
  var current_page =
    data_obj.current_page !== undefined ? Number(data_obj.current_page) : 1; //当前页,默认为1
  var total_page = Math.ceil(total_item / per_num); //计算总页数,不足2页,不加载组件
  // if (total_page < 2) {
  //   return;
  // }
  //在指定容器内加载分页数据
  $(obj_box).append('<div class="page_content"></div>');
  //在指定容器内加载分页插件
  $(obj_box).append('<div class="page_ctrl"></div>');

  function page_even() {
    function rendering() {
      $.ajax({
        type: "post",
        url: localStorage.url,
        data: {
          mun: current_page,
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
          if (arr.total == 0) {
            $("#J_template").html("暂没有数据！");
          } else {
            change_content(arr);
          }
        }
      });
    }

    /*加载数据*/

    function change_content(arr) {
      let ht = "";

      if (localStorage.style == "list1") {
        ht += $.map(arr.data, function (ele) {
          return `<div class="search-book-list bookList-text clearfix"  data-id=${ele.bookid}> <a target="_blank" class="a_amtion">
                <div class="bookList-text-img bk-img-box"> <img alt="${
                  ele.booktitle
                }"
                    src="${ele.bookimg}" style="height: 100%;"> </div> <em
                  class="bookList-text-title">${ele.booktitle}</em>
              </a>
              <p class="bookList-text-infor"><a target="_blank"
                  href="###">${ele.bookauthor}</a>
                <span>著</span> <span class="bookList-text-publish">${
                  ele.bookpublish
                }</span> <span
                  class="bookList-text-isbn">${
                    ele.bookisbn
                  }</span> <span class="bookList-text-time">${ele.booktime}</span>
                  </p>
              <p class="bookList-text-detail">
                ${ele.bookdetailbookprice}
              </p>
              <p class="bookList-text-price"> 蔚蓝价：<span class="red" id="nprice">
              ${ele.price}</span> 
              定价：<del id="oldprice">${ele.pricing}</del> <span class="lightRed">省：
              <em>${ele.pricing - ele.price}</em></span> </p>
              <div>
                <p class="btn bookList-text-btn clearfix"> <a target="_blank" class="buy-btn"id="buy_id" data-id=
          ${ele.bookid}></a>
                  <a href="javascript:;" data="8648288" class="save-btn J_addFav"></a> </p>
              </div>
            </div>`;
        }).join("");
      } else {
        ht += $.map(arr.data, function (ele) {
          return `<div class="search-book-item" data-id=${ele.bookid}> <a target="_blank"  class="a_amtion">
                <div class = "search-book-img bk-img-box" > <img src = "${ele.bookimg}"
                    alt = "${ele.booktitle}"
                    style = "height: 100%;" > </div> <em class="search-book-detail">${ele.booktitle}</em >
              </a>
              <p class="search-book-price red">￥${ele.price}（<span>${ele.discount}折</span>）</p>
              <div>
                <p class="btn clearfix"> <a class="buy-btn"data-id=
          ${ele.bookid}></a> <a href="javascript:;"
                    data="8198215" class="save-btn J_addFav"></a> </p>
              </div>
            </div>`;
        }).join("");
      }
      $("#J_template").html(ht);
    }

    rendering();
    var inp_val = current_page == total_page ? 1 : current_page + 1; //跳转页数,input默认显示值
    var append_html = '<button class="prev_page">上一页</button>';
    for (var i = 0; i < total_page - 1; i++) {
      if (total_page > 8 && current_page > 6 && i < current_page - 3) {
        if (i < 2) {
          append_html += '<button class="page_num">' + (i + 1) + "</button>";
        } else if (i == 2) {
          append_html += '<span class="page_dot">•••</span>';
        }
      } else if (
        total_page > 6 &&
        current_page < total_page - 3 &&
        i > current_page + 1
      ) {
        if (current_page > 6 && i == current_page + 2) {
          append_html += '<span class="page_dot">•••</span>';
        } else if (current_page < 7) {
          if (i < 8) {
            append_html += '<button class="page_num">' + (i + 1) + "</button>";
          } else if (i == 8) {
            append_html += '<span class="page_dot">•••</span>';
          }
        }
        //append_html+='<span class="page_dot">•••</span>';
      } else {
        if (i == current_page - 1) {
          append_html +=
            '<button class="page_num current_page">' + (i + 1) + "</button>";
        } else {
          append_html += '<button class="page_num">' + (i + 1) + "</button>";
        }
      }
    }
    if (current_page == total_page) {
      append_html +=
        '<button class="page_num current_page">' + (i + 1) + "</button>";
    } else {
      append_html += '<button class="page_num">' + (i + 1) + "</button>";
    }
    append_html +=
      '<button class="next_page">下一页</button><span class="page_total">共 ' +
      total_page +
      ' 页, 到第</span><input class="input_page_num" type="text" value="' +
      inp_val +
      '"><span class="page_text">页</span><button class="to_page_num">确定</button>';
    $(obj_box)
      .children(".page_ctrl")
      .append(append_html);
    if (current_page == 1) {
      $(obj_box + " .page_ctrl .prev_page")
        .attr("disabled", "disabled")
        .addClass("btn_dis");
    } else {
      $(obj_box + " .page_ctrl .prev_page")
        .removeAttr("disabled")
        .removeClass("btn_dis");
    }
    if (current_page == total_page) {
      $(obj_box + " .page_ctrl .next_page")
        .attr("disabled", "disabled")
        .addClass("btn_dis");
    } else {
      $(obj_box + " .page_ctrl .next_page")
        .removeAttr("disabled")
        .removeClass("btn_dis");
    }
  }
  page_even();
  $(obj_box + " .page_ctrl").on("click", "button", function () {
    var that = $(this);
    if (that.hasClass("prev_page")) {
      if (current_page != 1) {
        current_page--;
        that.parent(".page_ctrl").html("");
        page_even();
      }
    } else if (that.hasClass("next_page")) {
      if (current_page != total_page) {
        current_page++;
        that.parent(".page_ctrl").html("");
        page_even();
      }
    } else if (that.hasClass("page_num") && !that.hasClass("current_page")) {
      current_page = parseInt(that.html());
      that.parent(".page_ctrl").html("");
      page_even();
    } else if (that.hasClass("to_page_num")) {
      current_page = parseInt(that.siblings(".input_page_num").val());
      that.parent(".page_ctrl").html("");
      page_even();
    }
  });
}