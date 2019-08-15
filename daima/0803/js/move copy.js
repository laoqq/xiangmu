window.onload = function () {
    var biger = document.getElementById('biger');
    var main = document.getElementById('main');
    var smaller = document.getElementById('smaller');
    var mask = document.getElementById('mask');
    var wrap = biger.parentNode;
    var imgArr = [{
            path: "images/banner1.jpg"
        },
        {
            path: "images/banner2.jpg"
        },
        {
            path: "images/banner3.jpg"
        },
        {
            path: "images/banner4.jpg"
        },
        {
            path: "images/banner5.jpg"
        }
    ];
    var imgSum = imgArr.length;

    //插入小图
    for (var i = 0; i < imgSum; i++) {
        var a_list = document.createElement('li');
        var a_img = document.createElement('img');
        a_img.src = imgArr[i].path;
        a_list.appendChild(a_img);
        smaller.appendChild(a_list);

    }
    var img1 = document.createElement('img');
    var img2 = document.createElement('img');
    // imgs.src = imgArr[0].path;
    biger.appendChild(img2);
    main.insertBefore(img1, mask);
    var list = smaller.children;
    img2.src = img1.src = list[0].children[0].src;
    for (var i = 0; i < imgSum; i++) {
        list[i].index = i;
        list[i].onmouseover = function () {
            img1.src = list[this.index].children[0].src;
            img2.src = list[this.index].children[0].src;
            // console.log()
        }

    }
    // if (imgSum > 5) {
    //     imgSum = 5;
    // }
    // for (var i = 0; i < imgSum; i++) {
    //     var lis = document.createElement('li');
    //     var imgs = document.createElement('img');
    //     imgs.src = imgArr[i].path;
    //     lis.appendChild(imgs);
    //     smaller.appendChild(lis);
    // }
    // var mainImg = document.createElement('img');
    // var bigImg = document.createElement('img');
    // var liArr = smaller.children;
    // bigImg.src = mainImg.src = liArr[0].children[0].src;
    // main.insertBefore(mainImg, mask);
    // biger.appendChild(bigImg);
    // var bigPic = biger.children[0];
    // liArr[0].className = 'current';
    // for (var i = 0; i < liArr.length; i++) {
    //     liArr[i].index = i;
    //     liArr[i].onclick = function () {
    //         this.className = 'current';
    //         bigPic.src = main.children[0].src = this.children[0].src;
    //         for (var j = 0; j < liArr.length; j++) {
    //             if (this != liArr[j]) {
    //                 liArr[j].removeAttribute('class');
    //                 liArr[j].removeAttribute('className');
    //             }
    //         }
    //     }
    // }
    main.onmouseenter = function () {
        mask.style.display = 'block';
        biger.style.display = 'block';
    }
    main.onmouseleave = function () {
        mask.style.display = 'none';
        biger.style.display = 'none';
    }
    main.onmousemove = function (ev) {
        var e = e || window.event;
        var pagex = e.clientX;
        var pagey = e.clientY;
        pagex = pagex - wrap.offsetLeft -
            mask.offsetWidth / 2;
        pagey = pagey - wrap.offsetTop -
            mask.offsetHeight / 2;
        if (pagex < 0) {
            pagex = 0;

        }
        if (pagey < 0) {
            pagey = 0;
        }
        if (pagex > main.offsetWidth - mask.offsetWidth) {
            pagex = main.offsetWidth - mask.offsetWidth
        }
        if (pagey > main.offsetHeight - mask.offsetHeight) {
            pagey = main.offsetWidth - mask.offsetWidth
        }
        mask.style.left = pagex + 'px';
        mask.style.top = pagey + 'px';
        var x = pagex;
        var y = pagey;
        img2.style.top = -y * 2 + 'px';
        img2.style.left = -x * 2 + 'px';
    }
    //当用户滚动指定的元素时，会发生 scroll 事件。

    // scroll 事件适用于所有可滚动的元素和 window 对象（浏览器窗口）。

    // scroll() 方法触发 scroll 事件，或规定当发生 scroll 事件时运行的函数。
    // main.onmousemove = function (e) {
    //     var e = e || window.event;
    //     var pagex = e.pageX || scroll().left + e.clientX;
    //     var pagey = e.pageY || scroll().top + e.clientY;
    //     pagex = pagex - wrap.offsetLeft - mask.offsetWidth / 2;

    //     pagey = pagey - wrap.offsetTop - mask.offsetHeight / 2;
    //     console.log(pagex, pagey);
    //     if (pagex < 0) {
    //         pagex = 0;
    //     }
    //     if (pagey < 0) {
    //         pagey = 0;
    //     }
    //     if (pagex > main.offsetWidth - mask.offsetWidth) {
    //         pagex = main.offsetWidth - mask.offsetWidth;
    //     }
    //     if (pagey > main.offsetHeight - mask.offsetHeight) {
    //         pagey = main.offsetHeight - mask.offsetHeight;
    //     }

    //     var scale = (bigPic.offsetWidth - biger.offsetWidth) / (main.offsetWidth - mask.offsetWidth) ;

    //     console.log(scale);
    //     var xx = pagex * scale;
    //     var yy = pagey * scale;
    //     bigPic.style.left = -xx + 'px';
    //     bigPic.style.top = -yy + 'px';
    // }
}