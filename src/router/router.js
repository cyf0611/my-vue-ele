import App from '../App'

const home = r => require.ensure([], () => {r(require('../page/home/Home'))}, 'home');
const city = r => require.ensure([], () => {r(require('../page/city/City'))}, 'city');
const login = r => require.ensure([], () => {r(require('../page/login/Login'))}, 'login');
const forget = r => require.ensure([], () => {r(require('../page/forget/Forget'))}, 'forget')
const profile = r => require.ensure([], () => {r(require('../page/profile/Profile'))}, 'profile')
const info = r => require.ensure([], () => {r(require('../page/profile/children/Info'))}, 'info')
const setusername = r => require.ensure([], () => {r(require('../page/profile/children/children/Setusername'))}, 'setusername')
const address = r => require.ensure([], () => {r(require('../page/profile/children/children/Address'))}, 'address')
const addAddress = r => require.ensure([], () => {r(require('../page/profile/children/children/children/Add'))}, 'addAddress')
const addDetail = r => require.ensure([], () => {r(require('../page/profile/children/children/children/chilren/AddDetail'))}, 'addDetail')

const balance = r => require.ensure([], () => {r(require('../page/balance/Balance'))}, 'balance')
const balanceDetail = r => require.ensure([], () => {r(require('../page/balance/children/Detail'))}, 'balanceDetail')

const points = r => require.ensure([], () => {r(require('../page/points/Points'))}, 'points')
const pointsDetail = r => require.ensure([], () => {r(require('../page/points/children/Detail'))}, 'pointsDetail')




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
        },
        {
            path: '/profile',
            component: profile,
            children: [
                {
                    path: 'info',
                    component: info,
                    children: [
                        {
                            path: 'setusername',
                            component: setusername
                        },
                        {
                            path: 'address',
                            component: address,
                            children: [
                                {
                                    path: 'add',
                                    component: addAddress,
                                    children: [
                                        {
                                            path: 'addDetail',
                                            component: addDetail
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                },
                
            ]
        },
        {
            path: '/balance',
            component: balance,
            children: [
                {
                    path: 'detail',
                    component: balanceDetail
                }
            ]
        },
        {
            path: '/points',
            component: points,
            children: [
                {
                    path: 'detail',
                    component: pointsDetail
                }
            ]
        }
        
    ]
}]