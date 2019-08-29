/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-16 20:37:53
 * @LastEditTime: 2019-08-21 13:52:30
 * @LastEditors: Please set LastEditors
 */
(function () {
  //假数据

  // //节点
  let lst = document.getElementById("lst");
  let li = document.getElementById("li");
  let paixu = "";
  let page = 1;
  let mun = 4;
  let index = (page - 1) * mun;
  let nb1 = "";
  let nb2 = "";

  let istrue = false;
  // sessionstorage.tite = 1;
  lie = (url, sql, sql2) => {

    ajax({
      type: "post",
      url: url,
      data: {
        sql: sql,
        sql2: sql2
      },
      success: str => {
        console.log(str);
        let arr = JSON.parse(str);
        // let i = 0;
        let tal = Math.ceil(arr.tatol / mun);
        great(arr);
        pa(tal);

      }
    });
  };

  function great(arr) {
    let i = 0;
    let html = "";
    arr.data.forEach(item => {
      img(item.id, i);
      console.log(item.id, i);
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
    lst.innerHTML = html;
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
        // let st = '';
        let st = document.createElement("img");
        st.className = "img1";
        st.src = arr3[0].img;
        lst.children[i].children[0].appendChild(st);
        arr3.forEach(it => {
          str += `<li>
          <img class="img2" src="${it.img}" alt="">
        </li>`;
        });
        lst.children[i].children[1].innerHTML = str;
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

    li.innerHTML = list_a;
    li.children[page - 1].className = "active";
  }

  function inti() {
    let sql = `SELECT * FROM liebiao LIMIT ${index},${mun}`;
    let sql2 = `SELECT * FROM liebiao`;
    lie("../api/list.php", sql, sql2);
  }
  inti();

  let text1 = document.getElementById("text1");

  li.onclick = e => {


    if (e.target.tagName.toLowerCase() == "a") {
      for (let m = 0; m < li.children.length; m++) {
        li.children[m].className = "";
      }
      // e.target.className = 'active';
      page = e.target.innerHTML;
      index = (page - 1) / mun;


      inti();

      // if (istrue) {
      //   lie("../api/chaxun.php", text1.value);
      // } else {

      // }
    }
  };
  let btn = document.getElementById("btn");
  let text2 = document.getElementById("text2");
  let text3 = document.getElementById("text3");
  btn.onclick = () => {
    lst.innerHTML = "";
    page = 1;
    lie("../api/chaxun.php", text1.value);
    istrue = true;
  };
  //升序
  let add = document.querySelector(".add");
  add.onclick = () => {
    li.innerHTML = "";
    paixu = "asc";
    page = 1;
    if (text1.value) {
      lie("../api/chaxun.php", "");
    } else {
      lst.innerHTML = "";
      inti();
    }
  };
  //降序
  let upd = document.querySelector(".upd");
  upd.onclick = () => {
    lst.innerHTML = "";
    paixu = "desc";
    if (text1.value) {
      lie("../api/chaxun.php", "");
    } else {
      lst.innerHTML = "";
      inti();
    }
  };
  let sch = document.getElementById("sch");

  sch.onclick = () => {
    nb1 = Number(text2.value);
    nb2 = Number(text3.value);
    page = 1;
    lst.innerHTML = "";
    inti();
  };
})();