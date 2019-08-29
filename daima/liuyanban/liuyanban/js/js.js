/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-16 11:25:35
 * @LastEditTime: 2019-08-16 20:23:37
 * @LastEditors: Please set LastEditors
 */
(function () {
    /*
        需求：留言板
            用户名验证；
            注册
            登陆
            退出
            发帖
            顶贴
            踩贴
            点击加载更多
    */

    let username1 = document.getElementById('username1');
    let verifyUserNameMsg = document.getElementById('verifyUserNameMsg');
    let btnReg = document.getElementById('btnReg');
    let password1 = document.getElementById('password1');

    /*
验证用户名
get
    guestbook/index.php
        m : index
        a : verifyUserName
        username : 要验证的用户名
    返回
        {
            code : 返回的信息代码 0 = 没有错误，1 = 有错误 2=已经存在
            message : 返回的信息具体返回信息
        }
*/
    username1.onblur = () => {
        ajax({
            type: 'get',
            url: 'guestbook/index.php',
            data: {
                m: 'index',
                a: 'verifyUserName',
                username: username1.value
            },
            success: str => {
                // console.log(str);
                let arr = JSON.parse(str);
                if (!arr.code) {
                    //可以注册
                    css(verifyUserNameMsg, 'color', '#58bc58');
                } else {
                    css(verifyUserNameMsg, 'color', 'red');
                }
                verifyUserNameMsg.innerHTML = arr.message;
                // console.log(arr);
            }
        });
    }

    /*
        用户注册
        get/post
            guestbook/index.php
                m : index
                a : reg
                username : 要注册的用户名
                password : 注册的密码
            返回
                {
                    code : 返回的信息代码 0 = 没有错误，1 = 有错误
                    message : 返回的信息 具体返回信息
                }
     */
    let username2 = document.getElementById('username2');
    let password2 = document.getElementById('password2');
    let btnLogin = document.getElementById('btnLogin');

    btnReg.onclick = () => {
        ajax({
            type: 'post',
            url: 'guestbook/index.php',
            data: {
                m: 'index',
                a: 'reg',
                username: username1.value,
                password: password1.value
            },
            success: str => {
                // console.log(str);
                let arr = JSON.parse(str);
                console.log(arr);
                alert(arr.message);
                //清空并聚焦
                username1.value = '';
                password1.value = '';
                username2.focus();
            }
        });
    }

    /*
        用户登陆
        get/post
            guestbook/index.php
                m : index
                a : login
                username : 要登陆的用户名
                password : 登陆的密码
            返回
                {
                    code : 返回的信息代码 0 = 没有错误，1 = 有错误
                    message : 返回的信息 具体返回信息
                }
    */
    btnLogin.onclick = () => {
        +
        ajax({
            type: 'post',
            url: 'guestbook/index.php',
            data: {
                m: 'index',
                a: 'login',
                username: username2.value,
                password: password2.value
            },
            success: str => {
                // console.log(str);
                let arr = JSON.parse(str);
                console.log(arr);
                alert(arr.message)
                updateStatus();
            }
        });
    }

    let reg = document.getElementById('reg');
    let login = document.getElementById('login');
    let user = document.getElementById('user');
    let userinfo = document.getElementById('userinfo');

    //跟新面板：如果登陆成功，隐藏注册和登陆面板，显示退出面板
    function updateStatus() {
        // console.log(document.cookie);
        //uid如果是非0整数，证明目前是有用户正在登陆的
        let uid = getcookie('uid');
        if (uid) {
            //登陆中
            css(reg, 'display', 'none');
            css(login, 'display', 'none');
            css(user, 'display', 'block');
            userinfo.innerHTML = getcookie('username');
        } else {
            //登出中
            css(reg, 'display', 'block');
            css(login, 'display', 'block');
            css(user, 'display', 'none');
            userinfo.innerHTML = '';
        }
        // console.log(uid);
    }

    updateStatus(); //刷新面板的状态

    function getcookie(key) {
        let data = document.cookie; //uid=2; username=taotao
        let arr = data.split('; '); //['uid=2','username=taotao']
        for (let ele of arr) {
            let arr2 = ele.split('='); //['uid','2']
            if (key == arr2[0]) {
                return arr2[1];
            }
        }
    }

    /*
        用户退出
        get/post
            guestbook/index.php
                m : index
                a : logout
            返回
                {
                    code : 返回的信息代码 0 = 没有错误，1 = 有错误
                    message : 返回的信息 具体返回信息
                }
        */
    let logout = document.getElementById('logout');
    logout.onclick = () => {
        verifyUserNameMsg.innerHTML = '';
        ajax({
            type: 'post',
            url: 'guestbook/index.php',
            data: {
                m: 'index',
                a: 'logout'
            },
            success: str => {
                // console.log(str);
                let arr = JSON.parse(str);
                console.log(arr);
                alert(arr.message)
                updateStatus(); //刷新面板的状态
            }
        });
    }
    /*
    留言
    post
        guestbook/index.php
            m : index
            a : send
            content : 留言内容
        返回
            {
                code : 返回的信息代码 0 = 没有错误，1 = 有错误
                data : 返回成功的留言的详细信息
                    {
                        cid : 留言id	
                        content : 留言内容 
                        uid : 留言人的id
                        username : 留言人的名称
                        dateline : 留言的时间戳(秒)
                        support : 当前这条留言的顶的数量
                        oppose : 当前这条留言的踩的数量
                    }
                message : 返回的信息 具体返回信息
            }
    */
    let btnpost = document.getElementById('btnPost');
    let content = document.getElementById('content');
    let list1 = document.getElementById('list');
    great = (list) => {
        // updateStatus();
        let time = newdata(list.dateline * 1000);
        let html = `<dl data-id="${list.cid}">
                		<dt>
                			<strong>${list.username}</strong> 说 :
                		</dt>
                		<dd> 内容${list.content} 发布时间： ${time.years}- ${toDb(time.months)}-${toDb(time.days)} ${toDb(time.hours)}:${toDb(time.secs)}:${toDb(time.minutes)} </dd>
                		<dd class="t">
                			<a href="javascript:;" class="support">顶(<span>${list.support}</span>)</a>
                			|
                			<a href="javascript:;" class="oppose">踩(<span>${list.oppose}</span>)</a>
                		</dd>
                    </dl>`;

        list1.innerHTML += html;

    }

    btnpost.onclick = () => {
        ajax({
            type: 'post',
            url: 'guestbook/index.php',
            data: {
                m: 'index',
                a: 'send',
                content: content.value
            },
            success: str => {

                console.log(str);
                let arr = JSON.parse(str);
                let lis = arr.data;
                let time = newdata(lis.dateline * 1000);
                let html = `<dl data-id="${lis.cid}">
                		<dt>
                			<strong>${lis.username}</strong> 说 :
                		</dt>
                		<dd> 内容${lis.content} 发布时间： ${time.years}- ${toDb(time.months)}-${toDb(time.days)} ${toDb(time.hours)}:${toDb(time.secs)}:${toDb(time.minutes)} </dd>
                		<dd class="t">
                			<a href="javascript:;" class="support">顶(<span>${lis.support}</span>)</a>
                			|
                			<a href="javascript:;" class="oppose">踩(<span>${lis.oppose}</span>)</a>
                		</dd>
                    </dl>`;

                list1.innerHTML = html + list1.innerHTML;

                // great(arr.data);

                alert(arr.message)
            }
        });

    }


    // function showList() {
    /*
    初始化留言列表
    get
        guestbook/index.php
            m : index
            a : getList
            page : 获取的留言的页码，默认为1
            n : 每页显示的条数，默认为10
        返回
            {
                code : 返回的信息代码 0 = 没有错误，1 = 有错误
                data : 返回成功的留言的详细信息
                    {
                        count : 总条数	
                        pages : 页数 
                        page : 当前页
                        n : 每页显示条数
                        list : [
                                {
                                    cid : 留言id	
                                    content : 留言内容 
                                    uid : 留言人的id
                                    username : 留言人的名称
                                    dateline : 留言的时间戳(秒)
                                    support : 当前这条留言的顶的数量
                                    oppose : 当前这条留言的踩的数量
                                },
                                {
                                    cid : 留言id	
                                    content : 留言内容 
                                    uid : 留言人的id
                                    username : 留言人的名称
                                    dateline : 留言的时间戳(秒)
                                    support : 当前这条留言的顶的数量
                                    oppose : 当前这条留言的踩的数量
                                }
                        ]
                    	
                    }
                message : 返回的信息 具体返回信息
            }
    */
    let page = 1;
    let num = 5;


    function showList() {
        ajax({
            type: 'post',
            url: 'guestbook/index.php',
            data: {
                m: 'index',
                a: 'getList',
                page: page,
                n: num
            },
            success: str => {

                let arr = JSON.parse(str);
                if (arr.data.pages <= 1 || arr.data.pages == page) {
                    showMore.style.display = 'none';
                } else {
                    showMore.style.display = 'block';
                }
                for (let ite of arr.data.list) {
                    great(ite);
                }

            }
        });
    }
    showList();
    showMore.onclick = () => {
        //点击更多，加载下一页内容渲染
        page++;
        showList();
    }
    /*post
    guestbook / index.php
    m: index
    a: doSupport
    cid: 对应帖子的id
    返回 {
        code: 返回的信息代码 0 = 没有错误， 1 = 有错误
        message: 返回的信息 具体返回信息
    }*/
    list1.onclick = (e) => {
        if (e.target.className == 'support') {
            let cid = e.target.parentNode.parentNode.dataset.id;
            ajax({
                type: 'post',
                url: 'guestbook/index.php',
                data: {
                    m: 'index',
                    a: 'doSupport',
                    cid: cid
                },
                success: str => {

                    e.target.children[0].innerHTML++;
                }
            });
        } else if (e.target.className == 'oppose') {
            let cid = e.target.parentNode.parentNode.dataset.id;
            ajax({
                type: 'post',
                url: 'guestbook/index.php',
                data: {
                    m: 'index',
                    a: 'doOppose',
                    cid: cid
                },
                success: str => {

                    e.target.children[0].innerHTML++;
                }
            });
        }
    }
    /*
    踩贴
    post
    guestbook / index.php
    m: index
    a: doOppose
    cid: 对应帖子的id
    返回 {
        code: 返回的信息代码 0 = 没有错误， 1 = 有错误
        message: 返回的信息 具体返回信息
    }
    */

})();