/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-30 18:39:53
 * @LastEditTime: 2019-08-30 18:59:21
 * @LastEditors: Please set LastEditors
 */
require.config({
    'paths': {
        'jq': '../lib/jquery-1.10.1.min',
        'jqc': '../lib/jquery.cookie',
        'jqs': '../lib/swiper'
    },
    'shim': {
        'index': ['common', 'jq', 'jqs', 'jqc'],
        'jqs': ['jq'],
        'jqc': ['jq']
    }
})