<template>
    <div class="rating_page">
        <head-top :head-title="name" go-back="true"></head-top>
        <section class="header_img">
            <img :src="imgBaseUrl + image_path" class="food_img">
            <div class="cover"></div>
        </section>
        <p class="description">{{description}}</p>
        <section class="detail_container">
            <section class="detail_left">
                <p>{{name}}</p>
                <div class="rating_sale">
                    <span>评分</span>
                    <rating-star :rating='rating'></rating-star>
                    <span>{{rating.toFixed(1)}}</span>
                </div>
                <p>
                    <span>月售 {{month_sales}}单</span>
                    <span>售价 ¥{{foods.specfoods[0].price}}</span>
                    <span v-if="foods.specfoods.length">起</span>
                </p>
                <p>
                    <span>评论数 {{rating_count}}</span>
                    <span>好评率 {{satisfy_rate}}%</span>
                </p>
            </section>
            <buy-cart :shopId='shopId'  :foods='foods' @showMoveDot="showMoveDotFun"></buy-cart>
        </section>
        <transition appear @before-appear="beforeEnter" @after-appear="afterEnter" v-for="(item, index) in showMoveDot" :key="index">
            <span class="move_dot" v-if="item">
                <svg class="move_liner">
                    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#cart-add"></use>
                </svg>
            </span>
        </transition>
    </div>
</template>

<script>
    import headTop from 'src/components/header/Head'
    import ratingStar from 'src/components/common/RatingStart'
    import buyCart from 'src/components/common/BuyCart'

    import { mapMutations } from 'vuex'
    import {imgBaseUrl} from '../../../config/env'

    export default {
        name: 'FoodDetail',
        data() {
            return {
                image_path: null,
                description: null,
                month_sales: null,
                name: null,
                rating: null,
                rating_count: null,
                satisfy_rate: null,
                foods: null,
                shopId: null,
                imgBaseUrl,
                elLeft: '',
                elBottom: '',
                showMoveDot: [], //控制下落的小圆点显示隐藏
                //receiveInCart: false,
            }
        },
        components: {
            headTop,
            ratingStar,
            buyCart
        },
        created() {
            let queryData = this.$route.query;
            this.image_path = queryData.image_path;
            this.description = queryData.description;
            this.month_sales = queryData.month_sales;
            this.name = queryData.name;
            this.rating = queryData.rating;
            this.rating_count = queryData.rating_count;
            this.satisfy_rate = queryData.satisfy_rate;
            this.foods = queryData.food;
            this.shopId = queryData.shopId;
        },
        methods: {
            ...mapMutations([
                'SAVE_RECEIVEINCART'
            ]),
            showMoveDotFun(showMoveDot, elLeft, elBottom) {
                this.showMoveDot = [...this.showMoveDot, ...showMoveDot];
                this.elLeft = elLeft;
                this.elBottom = elBottom;
            },
            beforeEnter(el) {
                el.style.transform = `translate3d(0,${37 + this.elBottom - window.innerHeight}px,0)`;
                el.children[0].style.transform = `translate3d(${this.elLeft - 30}px,0,0)`;
                el.children[0].style.opacity = 0;
            },
            afterEnter(el) {
                el.style.transform = 'translate3d(0,0,0)';
                el.children[0].style.transform = `translate3d(0,0,0)`;
                el.style.transition = 'transform .55s cubic-bezier(0.3, -0.25, 0.7, -0.15)';
                el.children[0].style.transition = 'transform .55s linear';
                this.showMoveDot = this.showMoveDot.map(item => false);
                el.children[0].style.opacity = 1;

                el.children[0].addEventListener('transitionend', () => {
                    this.listenInCart();
                })
                el.children[0].addEventListener('webkitAnimationEnd', () => {
                    this.listenInCart();
                })
            },
            //监听圆点是否进入购物车
            listenInCart(){
                if (!this.receiveInCart) {
                    this.SAVE_RECEIVEINCART(true);
                    setTimeout(() => {
                        this.SAVE_RECEIVEINCART(false);
                    }, 500)
                }
            },
        }
    }
</script>


<style lang="scss" scoped>
    @import 'src/style/mixin';

    .rating_page{
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: #fff;
        z-index: 12;
        padding-top: 1.95rem;
        p, span{
            font-family: Helvetica Neue,Tahoma,Arial;
        }
    }
    .header_img{
        position: relative;
        .food_img{
            width: 100%;
            display: block;
        }
        .cover{
            position: absolute;
            @include wh(100%, 100%);
            top: 0;
            left: 0;
        }
    }
    .description{
        @include sc(.6rem, #666);
        margin-top: .5rem;
        line-height: .8rem;
        bottom: .2rem;
        padding: 0 .4rem;
    }
    .detail_container{
        padding: .5rem;
        @include fj;
        align-items: center;
        .detail_left{
            p:nth-of-type(1){
                @include sc(.7rem, #333);
                margin-bottom: .2rem;
            }
            .rating_sale{
                display: flex;
                align-items: center;
                span:nth-of-type(1){
                    @include sc(.6rem, #666);
                    margin-right: .2rem;
                }
                span:nth-of-type(2){
                    @include sc(.55rem, #f60);
                    margin-left: .2rem;
                }
                span:nth-of-type(3){
                    @include sc(.6rem, #666);
                    margin-left: .4rem;
                }
            }
            p:nth-of-type(2){
                font-size: 0;
                margin-top: .3rem;
                span:nth-of-type(1){
                    @include sc(.6rem, #666);
                    margin-right: .4rem;
                }
                span:nth-of-type(2),span:nth-of-type(3){
                    @include sc(.6rem, #f60);
                    margin-right: .2rem;
                }
            }
            p:nth-of-type(3){
                span{
                    @include sc(.6rem, #666);
                }
            }
        }
    }
    .move_dot{
        position: fixed;
        bottom: 30px;
        left: 30px;

        svg{
            @include wh(.9rem, .9rem);
            fill: #3190e8;
        }
    }
</style>
