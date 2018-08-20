import fetch from '../config/fetch'
import { getStore } from '../config/mUtils'

/**
 *获取用户信息
 **/
export const getUser = () => fetch('/v1/user', {user_id: getStore('user_id')});

/**
 * 获取首页默认地址
 */

export const cityGuess = () => fetch('/v1/cities', {
    type: 'guess'
});

/**
 * 获取首页热门城市
 */

export const hotcity = () => fetch('/v1/cities', {
    type: 'hot'
});
/**
 * 获取首页所有城市
 */

export const groupcity = () => fetch('/v1/cities', {
    type: 'group'
});


/**
 * 获取当前所在城市
 */
export const currentcity = (number) => fetch('/v1/cities/' + number);

/**
 * 获取搜索地址
 */

export const searchplace = (cityid, value) => fetch('/v1/pois', {
    type: 'search',
    city_id: cityid,
    keyword: value
})
/**
 * 获取图片验证码
 */
export const getcaptchas = () => fetch('/v1/captchas', {}, 'post');

/**
 * 账号密码登录
 */
export const accountLogin = (username, password, captcha_code) => fetch('/v2/login', {username, password, captcha_code}, 'post');

/**
 * 改密码
 */
export const changePassword = (username, oldpassWord, newpassword, confirmpassword, captcha_code) => fetch('/v2/changepassword', {username, oldpassWord, newpassword, confirmpassword, captcha_code}, 'POST');

/**
 * 退出登录
 */
export const signout = () => fetch('/v2/signout');

/**
 * 删除地址
 */

export const deleteAddress = (userid, addressid) => fetch( '/v1/users/' + userid + '/addresses/' + addressid, {}, 'DELETE')
























