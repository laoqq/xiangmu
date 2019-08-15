(function () {
    var list = document.getElementById("list");
    var box = document.getElementById("box");
    var li = list.getElementsByTagName("li");
    var co = box.getElementsByClassName("bo");
    for (var i = 0; i < li.length; i++) {
        li[i].index = i;
        li[i].onclick = function () {

            for (var j = 0; j < li.length; j++) {
                li[j].className = '';
                co[j].style.display = 'none'
            }
            this.className = 'active';
            co[this.index].style = 'display:block';
        }
    }
})();