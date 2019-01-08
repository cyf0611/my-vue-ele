import App from '../App'

const home = r => require.ensure([], () => {r(require('../page/home/Home'))}, 'home');
const city = r => require.ensure([], () => {r(require('../page/city/City'))}, 'city');
const login = r => require.ensure([], () => {r(require('../page/login/Login'))}, 'login');
const forget = r => require.ensure([], () => {r(require('../page/forget/Forget'))}, 'forget')
const profile = r => require.ensure([], () => {r(require('../page/profile/Profile'))}, 'profile')
const info = r => require.ensure([], () => {r(require('../page/profile/children/Info'))}, 'info')
const setusername = r => require.ensure([], () => {r(require('../page/profile/children/children/Setusername'))}, 'setusername')
const address = r => require.ensure([], () => {r(require('../page/profile/children/children/Address'))}, 'address')
const add = r => require.ensure([], () => {r(require('../page/profile/children/children/children/Add'))}, 'add')
const addDetail = r => require.ensure([], () => {r(require('../page/profile/children/children/children/chilren/AddDetail'))}, 'addDetail')

const balance = r => require.ensure([], () => {r(require('../page/balance/Balance'))}, 'balance')
const balanceDetail = r => require.ensure([], () => {r(require('../page/balance/children/Detail'))}, 'balanceDetail')

const points = r => require.ensure([], () => {r(require('../page/points/Points'))}, 'points')
const pointsDetail = r => require.ensure([], () => {r(require('../page/points/children/Detail'))}, 'pointsDetail')

const benefit = r => require.ensure([], () => {r(require('../page/benefit/Benefit'))}, 'benefit')
const hbDescription = r => require.ensure([], () => {r(require('../page/benefit/children/HbDescription'))}, 'hbDescription')
const coupon = r => require.ensure([], () => {r(require('../page/benefit/children/Coupon'))}, 'coupon')
const hbHistory = r => require.ensure([], () => {r(require('../page/benefit/children/HbHistory'))}, 'hbHistory')
const exchange = r => require.ensure([], () => {r(require('../page/benefit/children/Exchange'))}, 'exchange')
const commend = r => require.ensure([], () => {r(require('../page/benefit/children/Commend'))}, 'commend')
const service = r => require.ensure([], () => {r(require('../page/service/Service'))}, 'service')
const questionDetail = r => require.ensure([], () => {r(require('../page/service/children/QuestionDetail'))}, 'questionDetail')
const vipcard = r => require.ensure([], () => {r(require('../page/vipcard/Vipcard'))}, 'vipcard')
const vipDescription = r => require.ensure([], () => {r(require('../page/vipcard/children/VipDescription'))}, 'vipDescription')
const useCard = r => require.ensure([], () => {r(require('../page/vipcard/children/UseCard'))}, 'useCard')
const invoiceRecord = r => require.ensure([], () => {r(require('../page/vipcard/children/InvoiceRecord'))}, 'invoiceRecord')

const confirmOrder = r => require.ensure([], () => {r(require('../page/confirmOrder/ConfirmOrder'))}, 'confirmOrder')
const payment = r => require.ensure([], () => {r(require('../page/confirmOrder/children/Payment'))}, 'payment')
const chooseAddress = r => require.ensure([], () => {r(require('../page/confirmOrder/children/ChooseAddress'))}, 'chooseAddress')
const remark = r => require.ensure([], () => {r(require('../page/confirmOrder/children/Remark'))}, 'remark')
const invoice = r => require.ensure([], () => {r(require('../page/confirmOrder/children/Invoice'))}, 'invoice')
const addAddress = r => require.ensure([], () => {r(require('../page/confirmOrder/children/children/AddAddress'))}, 'addAddress')
const searchAddress = r => require.ensure([], () => {r(require('../page/confirmOrder/children/children/children/SearchAddress'))}, 'searchAddress')

const order = r => require.ensure([], () => {r(require('../page/order/Order'))}, 'order')

const download = r => require.ensure([], () => {r(require('../page/download/Download'))}, 'download')


const search = r => require.ensure([], () => {r(require('../page/search/Search'))}, 'search')

const msite = r => require.ensure([], () => {r(require('../page/msite/Msite'))}, 'msite')
const food =r => require.ensure([], () => {r(require('../page/food/Food'))}, 'food')
const shop = r => require.ensure([], () => {r(require('../page/shop/Shop'))}, 'food')
const foodDetail = r => require.ensure([], () => {r(require('../page/shop/children/FoodDetail'))}, 'foodDetail')
const shopDetail = r => require.ensure([], () => {r(require('../page/shop/children/ShopDetail'))}, 'shopDetail')
const shopSafe = r => require.ensure([], () => {r(require('../page/shop/children/children/ShopSafe'))}, 'shopSafe')

export default [{
    path: '/',
    component: App, //顶层路由,对应index.html
    children: [// 二级路由,对应 App.vue
        //地址为空 跳转到home
        {
            path: '',
            redirect: '/home',
        },
        //首页城市列表
        {
            path: '/home',
            component: home,
        },
        {
            path: '/city/:cityid',
            component: city,
        },
        {
            path: '/login',
            component: login,
        },
        {
            path: '/forget',
            component: forget,
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
                            component: setusername,
                        },
                        {
                            path: 'address',
                            component: address,
                            children: [
                                {
                                    path: 'add',
                                    component: add,
                                    children: [
                                        {
                                            path: 'addDetail',
                                            component: addDetail,
                                        },
                                    ],
                                },
                            ],
                        },
                    ],
                },
            
            ],
        },
        {
            path: '/balance',
            component: balance,
            children: [
                {
                    path: 'detail',
                    component: balanceDetail,
                },
            ],
        },
        {
            path: '/points',
            component: points,
            children: [
                {
                    path: 'detail',
                    component: pointsDetail,
                },
            ],
        },
        {
            path: '/benefit',
            component: benefit,
            children: [
                {
                    path: 'hbDescription',
                    component: hbDescription,
                },
                {
                    path: 'coupon',
                    component: coupon,
                },
                {
                    path: 'hbHistory',
                    component: hbHistory,
                },
                {
                    path: 'exchange',
                    component: exchange,
                },
                {
                    path: 'commend',
                    component: commend,
                },
            ],
        },
        {
            path: '/download',
            component: download,
        },
        {
            path: '/order',
            component: order,
        },
        {
            path: '/service',
            component: service,
            children: [
                {
                    path: 'questionDetail',
                    component: questionDetail,
                },
            ],
        },
        {
            path: '/vipcard',
            component: vipcard,
            children: [
                {
                    path: 'vipDescription',
                    component: vipDescription,
                },
                {
                    path: 'useCard',
                    component: useCard,
                },
                {
                    path: 'invoiceRecord',
                    component: invoiceRecord,
                },
            ],
        },
        {
            path: '/confirmOrder',
            component: confirmOrder,
            children: [
                {
                    path: 'payment',
                    component: payment,
                },
                {
                    path: 'chooseAddress',
                    component: chooseAddress,
                    children: [
                        {
                            path: 'addAddress',
                            component: addAddress,
                            children: [
                                {
                                    path: 'searchAddress',
                                    component: searchAddress
                                }
                            ]
                        }
                    ]
                },
                {
                    path: 'remark',
                    component: remark,
                },
                {
                    path: 'invoice',
                    component: invoice,
                }
            ],
        },
        {
            path: '/search/:geohash',
            component: search,
        },
        {
            path: '/msite',
            component: msite,
            meta: {keepAlive: true}
        },
        {
            path: '/food',
            component: food,
        },
        {
            path: '/shop',
            component: shop,
            children: [{
                path: 'foodDetail',
                component: foodDetail
            }, {
                path: 'shopDetail',
                component: shopDetail,
                children: [
                    {
                        path: 'shopSafe',
                        component: shopSafe
                    }
                ]
            }]
        }
    ],
}]