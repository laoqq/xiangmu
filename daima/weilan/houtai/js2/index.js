/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-23 10:16:43
 * @LastEditTime: 2019-08-23 10:29:53
 * @LastEditors: Please set LastEditors
 */
$(function () {
    if (sessionStorage.name == null) {
        location.href = '09login.html';
    }
    let name = `欢迎您：${sessionStorage.name}`;
    $("#span_name").html(name);
    $("#admin_ecs").click(function () {
        sessionStorage.removeItem("name");

    });

})