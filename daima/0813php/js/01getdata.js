(function () {
    let btn = document.getElementById('btn');
    let list = document.getElementById(('list'));

    //点击按钮，获取数据
    btn.onclick = () => {
        //创建ajax对象
        let xhr = new XMLHttpRequest();

        //1.告诉ajax你要什么 : open
        /*
            open()
                * 参数一：发送请求的方式  get  post
                * 参数二：获取数据的路径 url
                * 参数三：是否异步  true异步
        */
        xhr.open('get', '../api/01goolist.php', true);

        //2.ajax帮忙发送请求 : send
        /*
            send()
                * 如果是get方式：写null
                * 如果是post并且需要传数据：数据
        */
       xhr.send(null);

       //3.后端做端口

       //4.接收数据，渲染到页面
       xhr.onreadystatechange = () => {
           if(xhr.readyState == 4) {
               if(xhr.status == 200) {
                   //正确的数据

                   //渲染 -- 获取到的是字符串(responseText)，把它转成对象 -- 用JSON.parse
                   let arr = JSON.parse(xhr.responseText);
                   let html = arr.map(item => {
                       return `<li data-id = "${item.gid}">
                                    <p>${item.name}</p>
                                    <p>${item.price}</p>
                                    <p>${item.color}</p>
                                </li> `;
                   }).join('');
                   list.innerHTML = html; //渲染数据到页面
               }
           }
       }
    }
})();