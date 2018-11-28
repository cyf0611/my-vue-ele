<template>
    <div class="paddingTop search_page">
        <head-top head-title="搜索" goBack="true"></head-top>
        <form action="" class="search_form">
            <input type="search" name="search" placeholder="请输入商家或美食名称" class="search_input" v-model="searchValue" @input="checkInput">
            <input type="submit" name="submit" class="search_submit" @click.prevent="searchTarget">
        </form>
    </div>
</template>

<script>
    import headTop from 'src/components/header/Head'

    export default {
        name: 'Search',
        components: {
            headTop
        },
        data() {
            return {
                searchValue: '',
                searchHistory: [], // 搜索历史记录
                showHistory: true, // 是否显示历史记录，只有在返回搜索结果后隐藏
                emptyResult: false, // 搜索结果为空时显示
                restaurantList: [], // 搜索返回的结果
            }
        },
        mounted() {

        },
        computed: {

        },
        methods: {
            checkInput() {
                if(this.searchValue === '') {
                    this.showHistory = true; //显示历史记录
                    this.restaurantList = []; //清空搜索结果
                    this.emptyResult = false; //隐藏搜索为空提示
                }
            },
            async searchTarget() {

            }
        }
    }
</script>

<style lang="scss" scoped>
    @import '../../style/mixin';

    .search_page{
        margin-bottom: 2rem;
    }
    .search_form{
        background-color: #fff;
        padding: 0.5rem;
        display: flex;
        input{
            height: 1.5rem;
        }
        .search_input{
            flex: 4;
            border: 0.025rem solid $bc;
            @include sc(0.65rem, #333);
            border-radius: 0.125rem;
            background-color: #f2f2f2;
            font-weight: bold;
            padding: 0 0.25rem;
        }
        .search_submit{
            flex: 1;
            border: 0.025rem solid $blue;
            margin-left: .2rem;
            @include sc(0.65rem, #fff);
            border-radius: 0.125rem;
            background-color: $blue;
            font-weight: bold;
            padding: 0 0.25rem;
        }
    }
    .title_restaurant{
        font-size: 0.6rem;
        line-height: 2rem;
        text-indent: 0.5rem;
        font-weight: bold;
        color: #666;
    }
    .list_container{
        background-color: #fff;
    }
    .list_li{
        display: flex;
        justify-content: 'center';
        padding: 0.5rem;
        border-bottom: 0.025rem solid $bc;
        .item_left{
            margin-right: 0.25rem;
            .restaurant_img{
                @include wh(1.7rem, 1.7rem);
            }
        }
        .item_right{
            font-size: 0.55rem;
            flex: 1;
            .item_right_text{
                padding-bottom: 0.25rem;
                border-bottom: 0.025rem solid $bc;
                p{
                    line-height: .9rem;
                }
                .pay_icon{
                    margin-bottom: -0.08rem;
                }
            }
            .item_right_detail{
                margin-top: 0.25rem;
                li{
                    font-size: 0;
                    span{
                        font-size: .5rem;
                        vertical-align: middle;
                        display: inline-block;
                        margin-bottom: 0.2rem;
                    }
                    .activities_icon{
                        @include sc(.5rem, #fff);
                        font-weight: bold;
                        padding: .04rem;
                        border-radius: 0.15rem;
                        margin-right: 0.125rem;
                    }
                    .only_phone{
                        color: #FF6000;
                    }
                }
            }
        }
    }
    .search_history{
        .history_list{
            background-color: #fff;
            border-bottom: 0.025rem solid $bc;
            @include font(0.7rem, 2rem);
            padding: 0 0.3rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
            .history_text{
                display: inline-block;
                width: 80%;
            }
            .delete_icon{
                @include wh(1rem, 1rem);
            }
        }
        .clear_history{
            background-color: #fff;
            color: $blue;
            @include font(.7rem, 2rem);
            font-weight: bold;
            text-align: center;
        }
    }
    .search_none{
        margin: 0 auto;
        @include font(0.65rem, 1.75rem);
        color: #333;
        background-color: #fff;
        text-align: center;
        margin-top: 0.125rem;
    }
</style>
