<template>
    <div class="page">
        <span @click="gotoPay" class="rem_time" style="color: orange;border-width: 1px;border-style: solid;border-color: orange;">
            {{remaining}}
        </span>
        <alert-tip v-if="showAlert" @closeTip="showAlert = false" :alertText="alertText"></alert-tip>
    </div>
</template>

<script>
    import alertTip from 'src/components/common/AlertTip'

    export default {
        name: 'ComputeTime',
        data() {
            return {
                showAlert: false,
                alertText: '',
                countNum: 900,
            }
        },
        components: {
            alertTip,

        },
        mounted() {
            console.log(this.numTime);
            this.countNum = this.numTime;
            this.remainingTime();
        },
        computed: {
            //转换时间成分秒
            remaining() {
                let minute = parseInt(this.countNum/60);
                let second = parseInt(this.countNum%60);
                if (minute < 10) {
                    minute = '0' + minute;
                }
                if (second < 10) {
                    second = '0' + second;
                }
                return '去支付(还剩' + minute + '分' + second + '秒)';
            },
            //订单返回时间秒分分别处理
            numTime() {
                if(this.time.toString().includes('分钟')) {
                    return parseInt(this.time) * 60;
                }else {
                    return parseInt(this.time);
                }
            },

        },
        props: ['time'],
        methods: {
            gotoPay() {
                this.showAlert = true;
                this.alertText = '暂不开放支付接口';
            },
            //计算时间
            remainingTime() {
                clearInterval(this.timer);
                this.timer = setInterval(() => {
                    this.countNum --;
                    if (this.countNum == 0) {
                        clearInterval(this.timer);
                        this.showAlert = true;
                        this.alertText = '支付超时';
                    }
                }, 1000);
            },
        }
    }
</script>

<style lang="scss" scoped>
    @import 'src/style/mixin';
    .page{
        display: inline-block;
        .rem_time{
            @include sc(.55rem, #orange);
            padding: .1rem .2rem;
            border-radius: .15rem;
        }
    }
</style>