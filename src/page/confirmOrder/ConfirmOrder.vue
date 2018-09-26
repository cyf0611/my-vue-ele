<template>
    <div class="confirmOrderContainer">
        <section v-if="!showLoading">
            <headTop go-back="true" head-title="确认订单"></headTop>
        </section>

        <transition name="router-slid" mode="out-in">
            <router-view></router-view>
        </transition>
    </div>
</template>

<script>
    import headTop from 'src/components/header/Head'

    export default {
        name: 'ConfirmOrder',
        components: {
            headTop
        },
        data() {
            return {
                showLoading: true,
            }
        }
    }
</script>

<style scoped>

</style>