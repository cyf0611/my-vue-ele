<template>
   <header id="head_top">
       <slot name="logo"></slot>
       <slot name="search"></slot>
       <section class="head_back" v-if="goBack" @click="$route.go(-1)">
           <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" version="1.1">
               <polyline points="12,18 4,9 12,0" style="fill:none;stroke:rgb(255,255,255);stroke-width:2"/>
           </svg>
       </section>
       <router-link :to="user">

       </router-link>
   </header>
</template>

<script>
    import { mapState, mapActions } from 'vuex'
    export default {
        name: 'Header',
        mounted() {

        },
        methods: {

        },
        props: ['goBack']
    }
</script>

<style scoped>

</style>