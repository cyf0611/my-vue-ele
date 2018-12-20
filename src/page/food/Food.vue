<template>
    <div class="food_container">
        <head-top :head-title="headTitle" go-back="true"></head-top>
        <section class="sort_container">
            <div class="sort_item" :class="{choose_type:sortBy=='food'}">
                <div class="sort_item_container" @click="chooseType('food')">
                    <div class="sort_item_border">
                        <span :class="{category_title: sortBy=='food'}">{{foodTitle}}</span>
                        <svg width="10" height="10" xmlns="http://www.w3.org/2000/svg" version="1.1" class="sort_icon">
                            <polygon points="0,3 10,3 5,8"/>
                        </svg>
                    </div>
                </div>
                <transition name="showlist" v-show="category">
                    <section v-show="sortBy=='food'" class="category_container sort_detail_type">
                        <section class="category_left">
                            <ul>
                                <li v-for="(item, index) in category" :key="index" class="category_left_li" @click="selectCategoryName(item.id, index)" :class="{category_active: restaurant_category_id == item.id}">
                                    <section>
                                        <img :src="getImgPath(item.image_url)" alt="" class="category_icon">
                                        <span>{{item.name}}</span>
                                    </section>
                                    <section>
                                        <span class="category_count">{{item.count}}</span>
                                        <svg v-if="item.sub_categories.length" width="8" height="8" xmlns="http://www.w3.org/2000/svg" version="1.1" class="category_arrow" >
                                            <path d="M0 0 L6 4 L0 8"  stroke="#bbb" stroke-width="1" fill="none"/>
                                        </svg>
                                    </section>
                                </li>
                            </ul>
                        </section>
                        <section class="category_right">
                            <ul>
                                <li v-for="(item, index) in categoryDetail" :key="index" class="category_right_li" @click="getCategoryIds(item.id, item.name)" :class="{category_right_choosed: restaurant_category_ids == item.id}">
                                    <span>{{item.name}}</span>
                                    <span>{{item.count}}</span>
                                </li>
                            </ul>
                        </section>
                    </section>
                </transition>
            </div>
            <div class="sort_item" :class="{choose_type:sortBy=='sort'}">
                <div class="sort_item_container" @click="chooseType('sort')">
                    <div class="sort_item_border">
                        <span :class="{category_title: sortBy == 'sort'}">排序</span>
                        <svg width="10" height="10" xmlns="http://www.w3.org/2000/svg" version="1.1" class="sort_icon">
                            <polygon points="0,3 10,3 5,8"/>
                        </svg>
                    </div>
                </div>
                <transition name="showlist">
                    <section class="sort_detail_type" v-show="sortBy == 'sort'">
                        <ul class="sort_list_container">
                            <li class="sort_list_li" v-for="item in sortList" :key="item.sortByType" @click="sortClick(item.sortByType)">
                                <svg>
                                    <use xmlns:xlink="http://www.w3.org/1999/xlink" :xlink:href="'#'+item.href"></use>
                                </svg>
                                <p :class="{sort_select: sortByType == item.sortByType}">
                                    <span>{{item.name}}</span>
                                    <svg v-if="sortByType == item.sortByType">
                                        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#selected"></use>
                                    </svg>
                                </p>
                            </li>
                        </ul>
                    </section>
                </transition>
            </div>
            <div class="sort_item" :class="{choose_type:sortBy=='activity'}">
                <div class="sort_item_container" @click="chooseType('activity')">
                    <span :class="{category_title: sortBy == 'activity'}">筛选</span>
                    <svg width="10" height="10" xmlns="http://www.w3.org/2000/svg" version="1.1" class="sort_icon">
                        <polygon points="0,3 10,3 5,8"/>
                    </svg>
                </div>
                <transition name="showlist">
                    <section v-show="sortBy=='activity'" class="sort_detail_type filter_container">
                        <section>
                            <header class="filter_header_style">配送方式</header>
                            <ul class="filter_ul">
                                <li v-for="(item, index) in delivery" :key="item.id" class="filter_li" @click="deliveryAndActivitySelect(deliveryList[index])">
                                    <svg>
                                        <use xmlns:xlink="http://www.w3.org/1999/xlink" :xlink:href="deliveryList[index] && deliveryList[index].status? '#selected':'#fengniao'"></use>
                                    </svg>
                                    <span :class="{selected_filter: deliveryList[index] && deliveryList[index].status}">{{item.text}}</span>
                                </li>
                            </ul>
                        </section>
                        <section>
                            <header class="filter_header_style">商家属性（可以多选）</header>
                            <ul class="filter_ul">
                                <li v-for="(item, index) in activity" :key="item.id" @click="deliveryAndActivitySelect(activityList[index])" class="filter_li">
                                    <svg v-show="activityList[index].status" class="activity_svg">
                                        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#selected"></use>
                                    </svg>
                                    <span class="filter_icon" :style="{color: '#' + item.icon_color, borderColor: '#' + item.icon_color}" v-show="!activityList[index].status">{{item.icon_name}}</span>
                                    <span :class="{selected_filter: activityList[index].status}">{{item.name}}</span>
                                </li>
                            </ul>
                        </section>
                        <footer class="confirm_filter">
                            <div class="clear_all filter_button_style" @click="clearSelect">清空</div>
                            <div class="confirm_select filter_button_style" @click="confirmSelectFun">确定<span v-show="filterNum">({{filterNum}})</span></div>
                        </footer>
                    </section>
                </transition>
            </div>
        </section>
        <transition name="showcover">
            <div class="back_cover" v-show="sortBy"></div>
        </transition>
        <section class="shop_list_container">
            <shop-list v-if="latitude" :geohash="geohash" :restaurantCategoryId="restaurant_category_id" :restaurantCategoryIds="restaurant_category_ids" :selectStatus="selectStatus" :supportIds="activityList" :deliveryMode="deliveryList[0] && deliveryList[0].id" :sortByType="sortByType"></shop-list>
        </section>
    </div>
</template>

<script>
    import headTop from '../../components/header/Head'
    import { mapState, mapMutations } from 'vuex'
    import {msiteAdress, foodCategory, foodActivity, foodDelivery} from '../../service/getDate'
    import {getImgPath} from 'src/components/common/mixin'
    import shopList from 'src/components/common/ShopList'

    export default {
        name: 'Food',
        data() {
            return {
                headTitle: '',
                geohash: '',
                sortBy: '',
                foodTitle: '',
                restaurant_category_id: '', // 食品类型id值
                category: null, // category分类左侧数据
                categoryDetail: null, // category分类右侧的详细数据
                restaurant_category_ids: '', //筛选类型的id
                restaurant_category_id_last: '', //上一个为跳转的食品类型id值
                sortByType: null, // 根据何种方式排序
                sortList: [{name: '智能排序',sortByType: 0, href: 'default'}, {name: '距离最近',sortByType: 5, href: 'distance'},{name: '销量最高',sortByType: 6, href: 'hot'},{name: '起送价最低',sortByType: 1, href: 'price'},{name: '配送速度最快',sortByType: 2, href: 'speed'},{name: '评分最高',sortByType: 3, href: 'rating'}],
                delivery: null, // 配送方式数据
                activity: null, // 商家支持活动数据
                deliveryList: [], //配送方式map
                activityList: [], //商家活动map
                filterNum: 0, // 所选中的所有标签数量
                selectStatus: false, // 三个菜单的选择状态
            }
        },
        components: {
            headTop,
            shopList
        },
        mounted() {
            this.initData();

        },
        computed: {
            ...mapState([
                'latitude', 'longitude'
            ])
        },
        mixins: [getImgPath],
        methods: {
            ...mapMutations([
                'RECORD_ADDRESS'
            ]),
            async initData() {
                //获取上一个页面传递的参数
                this.headTitle = this.$route.query.title;
                this.geohash = this.$route.query.geohash;
                this.foodTitle = this.headTitle;
                this.restaurant_category_id = this.$route.query.restaurant_category_id;
                if(!this.latitude) {
                    let res = await msiteAdress(this.geohash);
                    this.RECORD_ADDRESS(res);
                }

                //获取左侧数据
                this.category = await foodCategory(this.latitude, this.longitude);
                this.category.forEach(item => {
                    if(item.id === this.restaurant_category_id) {
                        this.categoryDetail = item.sub_categories;
                    }
                })

                //获取配送方式
                this.delivery = await foodDelivery(this.latitude, this.longitude);
                //获取商铺活动
                this.activity = await foodActivity(this.latitude, this.longitude);

                this.delivery.forEach(item => {
                    this.deliveryList.push({status: false, id: item.id})
                });

                this.activity.forEach(item => {
                    this.activityList.push({status: false, id: item.id})
                })
            },
            chooseType(type) {
                if(this.sortBy !== type) {//第一次点击
                    let that = this;
                    this.sortBy = type;
                    if(type == 'food') {
                        this.foodTitle = '分类';
                        //该标题所在的行高亮  显示对应的右侧列表
                        if(this.restaurant_category_id_last) {
                            this.restaurant_category_id = this.restaurant_category_id_last;
                        }
                        this.category.forEach(item => {
                            if(item.id == this.restaurant_category_id) {
                                this.categoryDetail = item.sub_categories;
                                return;
                            }
                        })
                    }else {

                    }
                }else {//第二次点击
                    this.sortBy = '';
                    if(type == 'food') {
                        this.foodTitle = this.headTitle;
                    }
                }
            },
            selectCategoryName(id, index) {
                this.restaurant_category_id = id;
                if(index!==7) {
                    this.categoryDetail = this.category[index].sub_categories;
                }else {
                    this.headTitle = this.foodTitle = this.category[index].name;
                    this.restaurant_category_ids = null;
                    this.sortBy = '';
                    this.restaurant_category_id_last = id;
                    this.selectStatus = !this.selectStatus;
                }
            },
            getCategoryIds(id, name) {
                this.restaurant_category_ids = id;
                this.foodTitle = this.headTitle = name;
                this.sortBy = '';
                this.restaurant_category_id_last = this.restaurant_category_id;
                this.selectStatus = !this.selectStatus;
            },
            //排序点击事件
            sortClick(type) {
                this.sortByType= type;
                this.sortBy = '';
                this.selectStatus = !this.selectStatus;
            },
            //清空选择的活动
            clearSelect() {
                this.activityList.forEach(item => {
                    item.status = false;
                })
                this.deliveryList.forEach(item => {
                    item.status = false;
                })
                this.filterNum = 0;
            },
            //选择配送方式和活动事件
            deliveryAndActivitySelect(obj) {
                obj.status = !obj.status
                if(obj.status) {
                    this.filterNum ++;
                }else {
                    this.filterNum --;
                }
            },
            //筛选的确定事件
            confirmSelectFun() {
                this.sortBy = '';
                this.selectStatus = !this.selectStatus;
            }

        }
    }
</script>


<style lang="scss" scoped>
    @import 'src/style/mixin';
    .food_container{
        padding-top: 3.6rem;
    }
    .sort_container{
        background-color: #fff;
        border-bottom: 0.025rem solid #f1f1f1;
        position: fixed;
        top: 1.95rem;
        right: 0;
        width: 100%;
        display: flex;
        z-index: 13;
        box-sizing: border-box;
        .sort_item{
            @include sc(0.55rem, #444);
            @include wh(33.3%, 1.6rem);
            text-align: center;
            line-height: 1rem;
            .sort_item_container{
                @include wh(100%, 100%);
                position: relative;
                z-index: 14;
                background-color: #fff;
                box-sizing: border-box;
                padding-top: .3rem;
                .sort_item_border{
                    height: 1rem;
                    border-right: 0.025rem solid $bc;
                }
            }
            .sort_icon{
                vertical-align: middle;
                transition: all .3s;
                fill:#666;
            }

        }
        .choose_type{
            .sort_item_container{

                .category_title{
                    color: $blue;
                }
                .sort_icon{
                    transform: rotate(180deg);
                    fill:$blue;
                }
            }
        }
        .showlist-enter-active, .showlist-leave-active {
            transition: all .3s;
            transform: translateY(0);
        }
        .showlist-enter, .showlist-leave-active {
            opacity: 0;
            transform: translateY(-100%);
        }
        .sort_detail_type{
            width: 100%;
            position: absolute;
            display:flex;
            top: 1.6rem;
            left: 0;
            border-top: 0.025rem solid $bc;
            background-color: #fff;
        }
        .category_container{
            .category_left{
                flex: 1;
                background-color: #f1f1f1;
                height: 16rem;
                overflow-y: auto;
                span{
                    @include sc(0.5rem, #666);
                    line-height: 1.8rem;
                }
                .category_left_li{
                    @include fj;
                    padding:0 0.5rem;
                    .category_icon{
                        @include wh(.8rem, .8rem);
                        vertical-align: middle;
                        margin-right: .2rem;
                    }
                    .category_count{
                        background-color: #ccc;
                        @include sc(.4rem, #fff);
                        padding: 0 .1rem;
                        border: 0.025rem solid #ccc;
                        border-radius: 0.8rem;
                        vertical-align: middle;
                        margin-right: 0.25rem;
                    }
                    .category_arrow{
                        vertical-align: middle;
                    }
                }
                .category_active{
                    background-color: #fff;
                }
            }
            .category_right{
                flex: 1;
                background-color: #fff;
                padding-left: 0.5rem;
                height: 16rem;
                overflow-y: auto;
                .category_right_li{
                    @include fj;
                    height: 1.8rem;
                    line-height: 1.8rem;
                    padding-right: 0.5rem;
                    border-bottom: 0.025rem solid $bc;
                    span{
                        color: #666;
                    }
                }
                .category_right_choosed{
                    span{
                        color: $blue;
                    }
                }
            }
        }
        .sort_list_container{
            width: 100%;
            .sort_list_li{
                height: 2.5rem;
                display: flex;
                align-items: center;
                svg{
                    @include wh(0.7rem, 0.7rem);
                    margin:0 .3rem 0 .8rem;
                }
                p{
                    line-height: 2.5rem;
                    flex: auto;
                    text-align: left;
                    text-indent: 0.25rem;
                    border-bottom: 0.025rem solid $bc;
                    @include fj;
                    align-items: center;
                    span{
                        color: #666;
                    }
                }
                .sort_select{
                    span{
                        color: $blue;
                    }
                }
            }
        }
        .filter_container{
            flex-direction: column;
            align-items: flex-start;
            min-height: 10.6rem;
            background-color: #f1f1f1;
            .filter_header_style{
                @include sc(0.4rem, #333);
                line-height: 1.5rem;
                height: 1.5rem;
                text-align: left;
                padding-left: .5rem;
                background-color: #fff;
            }
            .filter_ul{
                display: flex;
                flex-wrap: wrap;
                padding: 0 0.5rem;
                background-color: #fff;
                .filter_li{
                    display: flex;
                    align-items: center;
                    border: 0.025rem solid #eee;
                    @include wh(4.7rem, 1.4rem);
                    margin-right: 0.25rem;
                    border-radius: 0.125rem;
                    padding: 0 0.25rem;
                    margin-bottom: 0.25rem;
                    svg{
                        @include wh(.8rem, .8rem);
                        margin-right: 0.125rem;
                    }
                    span{
                        @include sc(0.4rem, #333);
                    }
                    .filter_icon{
                        @include wh(.8rem, .8rem);
                        font-size: 0.5rem;
                        border: 0.025rem solid $bc;
                        border-radius: 0.15rem;
                        margin-right: 0.25rem;
                        line-height: .8rem;
                        text-align: center;
                    }
                    .activity_svg{
                        margin-right: .25rem;
                    }
                    .selected_filter{
                        color: $blue;
                    }
                }
            }
            .confirm_filter{
                display: flex;
                background-color: #f1f1f1;
                width: 100%;
                padding: .3rem .2rem;
                .filter_button_style{
                    @include wh(50%, 1.8rem);
                    font-size: 0.8rem;
                    line-height: 1.8rem;
                    border-radius: 0.2rem;
                }
                .clear_all{
                    background-color: #fff;
                    margin-right: .5rem;
                    border: 0.025rem solid #fff;
                }
                .confirm_select{
                    background-color: #56d176;
                    color: #fff;
                    border: 0.025rem solid #56d176;
                    span{
                        color: #fff;
                    }
                }
            }
        }
    }
    .showcover-enter-active, .showcover-leave-active {
        transition: opacity .3s
    }
    .showcover-enter, .showcover-leave-active {
        opacity: 0
    }
    .back_cover{
        position: fixed;
        @include wh(100%, 100%);
        z-index: 10;
        background-color: rgba(0,0,0,0.3);
    }
</style>
