<template>
    <div class="page">
        <headTop go-back="true" head-title="兑换红包"></headTop>
        <form action="" class="exchange_code">
            <input type="text" placeholder="请输入兑换码" v-model="exchangeCode" class="exchange_input">
            <section class="input_container captcha_code_container">
                <input type="text" placeholder="验证码" maxlength="4" v-model="codeNumber">
                <div class="img_change_img">
                    <img :src="captchaCodeImg" v-show="captchaCodeImg">
                    <div class="change_img" @click="getCaptchaCode">
                        <p>看不清</p>
                        <p>换一张</p>
                    </div>
                </div>
            </section>
        </form>
        <div class="determine" @click="exchange" :class="{active: status}">兑换</div>

        <alertTip v-if="showAlert" :alert-text="alertText" @closeTip="showAlert=false"></alertTip>
    </div>
</template>

<script>
    import headTop from 'src/components/header/Head'
    import { mapState } from 'vuex'
    import {getcaptchas, exChangeHongbao} from '../../../service/getDate'
    import alertTip from 'src/components/common/AlertTip'

    export default {
        name: 'Exchange',
        components: {
            headTop,
            alertTip
        },
        mounted() {
            this.getCaptchaCode();
        },
        data() {
            return {
                exchangeCode: null,
                codeNumber: '',
                captchaCodeImg: false,
                showAlert: false,
                alertText: null
            }
        },
        computed: {
            ...mapState([
                'userInfo'
            ]),
            status() {
                let status = (/^\d+$/gi.test(this.exchangeCode)) && (/^\w{4}$/gi.test(this.codeNumber))
                return status;
            }
        },
        methods: {
            async getCaptchaCode () {
                let res = await getcaptchas();
                this.captchaCodeImg = res.code;
            },
            async exchange () {
                if(this.status) {
                    let res = await exChangeHongbao(this.userInfo.user_id, this.exchangeCode, this.codeNumber);
                    //不成功则弹出提示框
                    if(res.message) {
                        this.getCaptchaCode();
                        this.showAlert = true;
                        this.alertText = res.message;
                    }
                }
            }
        }
    }
</script>


<style lang="scss" scoped>
    @import 'src/style/mixin';

    .page{
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        overflow-y: auto;
        padding-top: 1.95rem;
        z-index: 203;
        background-color: #f1f1f1;
        p, span{
            font-family: Helvetica Neue,Tahoma,Arial;
        }
    }
    .determine{
        background-color: #ccc;
        @include sc(.7rem, #fff);
        text-align: center;
        margin: 0 .7rem;
        line-height: 1.8rem;
        border-radius: 0.2rem;
        margin-top: 0.7rem;
    }
    .active{
        background-color: #4cd964;
    }
    .exchange_code{
        margin-top: 0.7rem;
        padding: 0 .5rem;
        .exchange_input{
            width: 100%;
            @include sc(.7rem, #666);
            padding: .6rem .4rem;
            border-radius: .15rem;
        }
    }
    .captcha_code_container{
        height: 2.2rem;
        display: flex;
        margin-top: .7rem;
        input{
            @include sc(.7rem, #666);
            padding: .4rem;
            border-radius: .15rem;
            flex: 3;
        }
        .img_change_img{
            display: flex;
            align-items: center;
            flex: 2;
            margin-left: .3rem;
            background-color: #fff;
            padding-left: .2rem;
            border-radius: .15rem;
            img{
                @include wh(3.5rem, 1.5rem);
                margin-right: .2rem;
            }
            .change_img{
                display: flex;
                flex-direction: 'column';
                flex-wrap: wrap;
                width: 2rem;
                justify-content: center;
                p{
                    @include sc(.55rem, #666);
                }
                p:nth-of-type(2){
                    color: #3b95e9;
                    margin-top: .2rem;
                }
            }
        }
    }
</style>
