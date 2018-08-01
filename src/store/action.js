import { getUser } from '../service/getDate'
import {
    GET_USERINFO,
    SAVE_ADDRESS
} from './mutation-types.js'

export default {
    async getUserInfo({commit, state}) {
        let res = await getUser();
        commit(GET_USERINFO, res)
    }
}


