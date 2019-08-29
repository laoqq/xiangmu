/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-22 15:58:03
 * @LastEditTime: 2019-08-22 16:05:20
 * @LastEditors: Please set LastEditors
 */
function login(name, password) {
    $.ajax({
        type: "post",
        url: "api/verfy.php",
        data: {
            slq1: `SELECT * FROM user_table WHERE uname= '${name}' AND upassword=${password}`,

        },

        success: function (response) {
            if (response == 1) {

            } else {

            }
        }
    });
}

function yz(name) {
    $.ajax({
        type: "post",
        url: "api/verfy.php",
        data: {
            slq1: `SELECT * FROM user_table WHERE uname= '${name}'`,

        },

        success: function (response) {
            if (response) {

            } else {

            }
        }
    });
}

function login(name, password) {
    $.ajax({
        type: "post",
        url: "api/verfy.php",
        data: {
            slq1: `SELECT * FROM user_table WHERE uname= '${name}' AND upassword=${password}`,

        },

        success: function (response) {
            if (response == 1) {

            } else {

            }
        }
    });
}