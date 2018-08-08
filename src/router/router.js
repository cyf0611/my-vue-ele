import App from '../App'

const home = r => require.ensure([], () => {r(require('../page/home/Home'))}, 'home')


export default [{
    path: '/',
    component: App, //顶层路由,对应index.html
    children: [// 二级路由,对应 App.vue
        //地址为空 跳转到home
        {
            path: '',
            redirect: '/home'
        }
        
    ]
}]