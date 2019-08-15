(function () {
    var box = document.getElementById('box');
    var ul1 = document.getElementById('ul1');
    var list1 = document.getElementsByTagName('a');
    var co = document.getElementsByClassName("box1")
    for (var i = 0; i < list1.length; i++) {
        list1[i].index = i;
        list1[i].onmouseover = function () {
            for (var i = 0; i < list1.length; i++) {
                list1[i].style = '';
                co[i].style.display = 'none';
            }
            this.style = ('background: #fff; color: #ff3333; font - weight: bold; width: 150px ; border-top: 2px solid red;');
            co[this.index].style.display = 'block'
        }
    }
})();