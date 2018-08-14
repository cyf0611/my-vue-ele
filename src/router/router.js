import App from '../App'

const home = r => require.ensure([], () => {r(require('../page/home/Home'))}, 'home');
const city = r => require.ensure([], () => {r(require('../page/city/City'))}, 'city');
const login = r => require.ensure([], () => {r(require('../page/login/Login'))}, 'login');
const forget = r => require.ensure([], () => {r(require('../page/forget/Forget'))}, 'forget')

export default [{
    path: '/',
    component: App, //顶层路由,对应index.html
    children: [// 二级路由,对应 App.vue
        //地址为空 跳转到home
        {
            path: '',
            redirect: '/home'
        },
        //首页城市列表
        {
            path: '/home',
            component: home
        },
        {
            path: '/city/:cityid',
            component: city
        },
        {
            path: '/login',
            component: login
        },
        {
            path: '/forget',
            component: forget
        }
        
    ]
}]