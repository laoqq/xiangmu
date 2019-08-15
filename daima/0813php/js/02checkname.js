/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-13 20:17:45
 * @LastEditTime: 2019-08-13 20:23:26
 * @LastEditors: Please set LastEditors
 */
(function () {
    //找节点
    let name = document.getElementById('name');
    let inf = document.getElementById('inf');

    name.onblur = () => {
        //创建ajax对象
        let xhr = new XMLHttpRequest();

        //1.设置参数：open
        /*
               open():如果是get方式，用url传输数据，如果是post方式，用send传输
                   * 参数一：发送请求的方式  get  post
                   * 参数二：获取数据的路径 url?+参数  name=jingjing&psw=123456
                   * 参数三：是否异步  true异步
        */

        let url = '../api/02checkname.php?username=' + name.value;
        xhr.open('get', url, true);

        //2.发送请求：send
        /*
               send()
                   * 如果是get方式：写null
                   * 如果是post并且需要传数据：数据
        */
        xhr.send(null);
        console.log(1);
        //3.制作接口

        //4.接收后端的数据做渲染
        xhr.onreadystatechange = () => {
            if (xhr.readyState == 4) {
                if (xhr.status == 200) {
                    let data = xhr.responseText;
                    if (data == 'yes') {
                        inf.innerHTML = '可以注册';
                        inf.style.display = '#58bc58';
                    } else {
                        inf.innerHTML = '该用户名太受欢迎啦，请换一个~';
                        inf.style.display = 'red';
                    }
                }
            }
        }

    }
})();