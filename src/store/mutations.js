import {
    RECORD_ADDRESS,
    ADD_CART,
    REDUCE_CART,
    INIT_BUYCART,
    CLEAR_CART,
    RECORD_SHOPDETAIL,
    RECORD_USERINFO,
    GET_USERINFO,
    CONFIRM_REMARK,
    CONFIRM_INVOICE,
    CHOOSE_SEARCH_ADDRESS,
    SAVE_GEOHASH,
    CONFIRM_ADDRESS,
    CHOOSE_ADDRESS,
    NEED_VALIDATION,
    SAVE_CART_ID_SIG,
    SAVE_ORDER_PARAM,
    CHANGE_ORDER_PARAM,
    ORDER_SUCCESS,
    SAVE_SHOPID,
    SAVE_ORDER,
    OUT_LOGIN,
    RETSET_NAME,
    SAVE_AVANDER,
    SAVE_ADDRESS,
    SAVE_ADDDETAIL,
    SAVE_QUESTION,
    ADD_ADDRESS,
    BUY_CART,
} from './mutation-types.js'

import { getStore, setStore } from '../config/mUtils'
import { localapi, proapi } from '../config/env'
export default {
    //获取用户信息存入vuex
    [GET_USERINFO](state, info) {
        if (state.userInfo && (state.userInfo.username !== info.username)) {
            return
        }
        if(!state.login) {
            return
        }
        if (!info.message) {
            state.userInfo = {...info};
        } else {
            state.userInfo = null;
        }
        
    },
    //记录用户名
    [RECORD_USERINFO](state, info) {
        state.userInfo = info;
        state.login = true;
        setStore('user_id', info.user_id);
    },
    //退出登录
    [OUT_LOGIN](state) {
        state.userInfo = {}
        state.login = false
    },
    //保存图片
    [SAVE_AVANDER](state, imgPath) {
        state.imgPath = imgPath
    },
    //修改用户名
    [RETSET_NAME](state,username) {
        state.userInfo = Object.assign({}, state.userInfo,{username})
    },
    //删除地址列表
    [SAVE_ADDRESS](state, newAdress) {
        state.removeAddress = newAdress
    },
    //添加地址name
    [SAVE_ADDDETAIL](state, addAddress){
        state.addAddress=addAddress;
    },
    //增加地址
    [ADD_ADDRESS](state, obj) {
        state.removeAddress = [obj, ...state.removeAddress];
    },
    //保存所选问题标题和详情
    [SAVE_QUESTION](state, question) {
        state.question = {...question};
    },
    //下单成功，保存订单返回信息
    [ORDER_SUCCESS](state, order) {
        state.cartPrice = null;
        state.orderMessage = order;
    },
    //会员卡价格纪录
    [BUY_CART](state, price) {
        state.cartPrice = price;
    },
    // 记录当前经度纬度
    [RECORD_ADDRESS](state, {
        latitude,
        longitude
    }) {
        state.latitude = latitude;
        state.longitude = longitude;
        console.log('latitude', latitude);
    },
    //保存geohash
    [SAVE_GEOHASH](state, geohash) {
        state.geohash = geohash;
        
    },
}
