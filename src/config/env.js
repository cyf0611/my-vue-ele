/**
 * 配置编译环境和线上环境之间的切换
 *
 * baseUrl: 域名地址
 * routerMode: 路由模式
 * imgBaseUrl: 图片所在域名地址
 *
 */
var config = require('../../config')
var configs = process.env.NODE_ENV === 'production' ? config.pro : config.dev;

let baseUrl = configs.proxypath;
let routerMode = 'history';
let imgBaseUrl = configs.imgBaseUrl;

console.log(process.env.NODE_ENV,'env.js');
// if (process.env.NODE_ENV == 'development') {
//     baseUrl = 'http://cangdu.org:8001'
//     imgBaseUrl = ''
//     //imgBaseUrl = 'http://localhost:8001/img/'
// }else if(process.env.NODE_ENV == 'production'){
//
//     // baseUrl = 'http://cangdu.org:8001';
// }
export {
    baseUrl,
    routerMode,
    imgBaseUrl,
}