<template>
    <div class="profile_page">
        <head-top :goBack="true" :headTitle="profiletitle"></head-top>
        <section>
            <section class="profile-number">

            </section>
        </section>
    </div>
</template>

<script>
    import headTop from '../../components/header/Head'

    export default {
        name: 'Profile',
        components: {
            headTop
        },
        data() {
            return {
                profiletitle: '我的',
            }
        }
    }
</script>

<style scoped>

</style>