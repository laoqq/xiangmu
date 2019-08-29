/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-16 20:37:53
 * @LastEditTime: 2019-08-22 19:45:23
 * @LastEditors: Please set LastEditors
 */
$(function () {
  //假数据

  // //节点
  let lst = document.getElementById("lst");
  let li = document.getElementById("li");
  let paixu = "";
  let page = 1;
  let mun = 4;
  let index = 0;
  let nb1 = "";
  let nb2 = "";
  let istrue = false;
  lie = (url, sql1, sql2) => {
    $.ajax({
      type: "post",
      url: url,
      data: {
        sql1: sql1,
        sql2: sql2
      },
      // dataType: "dataType",
      success: function (str) {
        console.log(str);
        let arr = JSON.parse(str);
        great(arr);
        let tal = Math.ceil(arr.tatol / mun);
        pa(tal);
      }
    });

  };


  function great(arr) {
    let i = 0;
    let html = "";
    arr.data.forEach(item => {
      img(item.id, i);
      i++;
      html += ` <div class="bul">
                 <div class="bu12">
              <div class="bu13">
                  <a href="">找相似</a><a href="">找同款</a>
                </div>
                 </div>
                    <ul class="list">
                    </ul>
                     <div class="box1">
                          <p class="p1">
                    <span class="span1">￥${item.price} </span>
                      <span class="span2">${item.more}</span>
                      </p>
                 <p class="p2">
              <span class="span3">包邮</span> ${item.name}</p>  
              <p class="p3">
            <i class="iconfont icon-liebiao-copy-copy-copy"></i>
            <span>${item.address}</span>
            <span class="span4">${item.city}</span> 
            </p> 
            </div>
      </div> `;
    });
    $('#lst').html(html);
    // lst.innerHTML = html;
  }

  // 拼接图
  img = (id, i) => {
    ajax({
      type: "post",
      url: "../api/img.php",
      data: {
        id: id
      },
      success: str => {
        let arr3 = JSON.parse(str);
        var str = "";

        let st = document.createElement("img");
        st.className = "img1";
        st.src = arr3[0].img;
        // let st = $(`<img class="img1" src="${arr3[0].img}" alt="">`)
        // $("#li").children().eq(i).children().eq(0).append(st)
        lst.children[i].children[0].appendChild(st);
        arr3.forEach(it => {
          str += `<li>
          <img class="img2" src="${it.img}" alt="">
        </li>`;
        });
        // $("#li").children().eq(i).children().eq(1).html(str);

        $("#lst").children('.bul').eq(i).find('.list').html(str);
        // lst.children[i].children[1].innerHTML = str;
      }
    });
  };
  //   lie("../api/liebiao.php", "");
  //拼接
  //

  function pa(tal) {
    let list_a = "";
    for (let j = 1; j <= tal; j++) {
      list_a += `<a href="###" id='lista'>${j}</a>`;
    }
    console.log(tal);
    $("#lil").html(list_a);
    // $("#li").children('a').eq(page - 1).addClass('active').siblings().removeClass('active');

  }


  function inti() {
    index = (page - 1) * mun
    let sql1 = `SELECT * FROM liebiao LIMIT ${index},${mun}`;
    let sql2 = `SELECT * FROM liebiao`;
    lie("../verify_api/fenye.php", sql1, sql2);
  }
  inti();

  // let text1 = document.getElementById("text1");
  //查询
  let txt = sessionStorage.title;
  let nub = sessionStorage.mub;
  refer = () => {
    // let txt = getCookie('title');
    let txt = sessionStorage.title;
    index = (page - 1) * mun
    let sql1 = `SELECT * FROM liebiao WHERE name LIKE '%${txt}%' LIMIT ${index},${mun}`;
    let sql2 = `SELECT * FROM liebiao WHERE name LIKE '%${txt}%'`
    lie("../verify_api/fenye.php", sql1, sql2);
  }
  //降序升序
  ad = (action) => {
    index = (page - 1) * mun
    let sql1 = `SELECT * FROM liebiao ORDER BY price ${action} LIMIT ${index},${mun}`;
    let sql2 = `SELECT * FROM liebiao`
    lie("../verify_api/fenye.php", sql1, sql2);
  }
  //价格区间
  price = () => {
    index = (page - 1) * mun
    //   nb1 = Number(text2.value);
    //   nb2 = Number(text3.value);
    let nb1 = Number($("#text2").val());
    let nb2 = Number($("#text3").val());
    let sql1 = `SELECT * FROM liebiao WHERE price BETWEEN ${nb1} AND ${nb2} LIMIT ${index},${mun}`;
    let sql2 = `SELECT * FROM liebiao WHERE price BETWEEN ${nb1} AND ${nb2}`;
    lie("../verify_api/fenye.php", sql1, sql2);
  }


  price2_ad = (action) => {
    index = (page - 1) * mun
    //   nb1 = Number(text2.value);
    //   nb2 = Number(text3.value);
    let nb1 = Number($("#text2").val());
    let nb2 = Number($("#text3").val());
    let sql1 = `SELECT * FROM liebiao WHERE ORDER BY price  ${action}  price BETWEEN ${nb1} AND ${nb2} LIMIT ${index},${mun}`;
    let sql2 = `SELECT * FROM liebiao WHERE ORDER BY price  ${action} price BETWEEN ${nb1} AND ${nb2}`;
    lie("../verify_api/fenye.php", sql1, sql2);
  }
  //查询_降序升序

  refer_ad = (action) => {

    index = (page - 1) * mun
    let sql1 = `SELECT * FROM liebiao WHERE name LIKE '%${txt}%' ORDER BY price ${action}xs LIMIT ${index},${mun}`;
    let sql2 = `SELECT * FROM liebiao WHERE name LIKE '%${txt}%' ORDER BY price  ${action}`;
    lie("../verify_api/fenye.php", sql1, sql2);
  }
  //查询_降序升序 价格区间
  // refer_ad_price = (action) => {
  //   let nb1 = Number($("#text2").val());
  //   let nb2 = Number($("#text3").val());
  //   index = (page - 1) * mun
  //   let sql1 = `SELECT * FROM liebiao WHERE  price BETWEEN ${nb1} AND ${nb2} AND name LIKE '%${txt}%'  ORDER BY price ${action} LIMIT${index}, ${mun} `;
  //   let sql2 = `SELECT * FROM liebiao WHERE  price BETWEEN ${nb1} AND ${nb2} AND name LIKE '%${txt}%'  ORDER BY price ${action} `;
  //   lie("../verify_api/fenye.php", sql1, sql2);
  // }
  //功能
  $("#btn").click(function () {
    console.log($("#text1").val());
    page = 1;
    if ($("#text1").val() != '') {
      let txt = $("#text1").val().trim();
      sessionStorage.title = txt;
      refer();
    }
  })

  $(".add").click(function () {
    // if ($("#text1".val == null)) {
    //   sessionStorage.title = null;
    // }
    // if ($("#text2").val() == null || $("#text3").val() == null) {
    //   sessionStorage.nub = null;
    // }
    sessionStorage.action = 'asc'
    if (txt == null & nub == null) {
      ad('asc');
    } else if (txt != null & nub == null) {
      refer_ad('asc')
    }
    // else if (txt == null & nub != null) {
    //   price2_ad('asc')
    // }
  });
  $(".upd").click(function () {
    sessionStorage.action = 'desc'
    if (txt == null & nub == null) {
      ad('desc');
    } else if (txt != null & nub == null) {
      refer_ad('desc')
    }
    //  else if (txt == null & nub != null) {
    //   price2_ad('desc')
    // }
  });

  $("#sch").click(function () {
    sessionStorage.mub = 1;
    price();
  });
  //分页按钮
  $("#lil").on('click', 'a', function () {
    // e.target.className = 'active';
    $(this).addClass("active").siblings().removeClass("active")
    page = $(this).index() + 1;
    let data1 = sessionStorage.title;
    let action = sessionStorage.action

    console.log(nub);
    if (data1 != null && action == null && nub == null) {
      refer();
    } else if (data1 == null && action != null && nub == null) {
      ad(action);
    } else if (data1 == null && action == null && nub != null) {
      price();
    } else if (data1 != null && action != null && nub == null) {
      refer_ad(action);
    } else {
      inti();
    }

  });


  // let btn = document.getElementById("btn");
  // let text2 = document.getElementById("text2");
  // let text3 = document.getElementById("text3");
  // btn.onclick = () => {
  //   lst.innerHTML = "";
  //   page = 1;
  //   lie("../api/chaxun.php", text1.value);
  //   istrue = true;
  // };
  // //升序
  // let add = document.querySelector(".add");
  // add.onclick = () => {
  //   li.innerHTML = "";
  //   paixu = "asc";
  //   page = 1;
  //   if (text1.value) {
  //     lie("../api/chaxun.php", "");
  //   } else {
  //     lst.innerHTML = "";
  //     inti();
  //   }
  // };
  // //降序
  // let upd = document.querySelector(".upd");
  // upd.onclick = () => {
  //   lst.innerHTML = "";
  //   paixu = "desc";
  //   if (text1.value) {
  //     lie("../api/chaxun.php", "");
  //   } else {
  //     lst.innerHTML = "";
  //     inti();
  //   }
  // };
  // let sch = document.getElementById("sch");

  // sch.onclick = () => {
  //   nb1 = Number(text2.value);
  //   nb2 = Number(text3.value);
  //   page = 1;
  //   lst.innerHTML = "";
  //   inti();
  // };

});