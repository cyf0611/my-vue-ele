import App from '../App'

const home = r => require.ensure([], ()=>{r(require('../page'))})