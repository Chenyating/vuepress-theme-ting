<template>
<div class="index-box">
    <div class="index-content">
        <live2d />
        <tingNav />
        <div class="my-name">{{$site.themeConfig.author}}</div>
    </div>
</div>
</template>

<script>
import live2d from "../components/ting-live2d.vue";
import tingNav from '../components/ting-nav.vue'

export default {
    components: {
        live2d,
        tingNav
    },
    name: 'index',
    data() {
        return {

        }
    },
    mounted() {
        console.log('???')
    }
}
</script>

<style lang="stylus" scoped>
.index-box {
    position fixed;
    display flex;
    align-items center;
    justify-content center;
    top 0;
    bottom: 0;
    left 0;
    right 0;

    .index-content {
        position relative;
        margin 0 auto;
        width 100%;

        .my-name {
            position: absolute;
            margin: auto;
            /*水平居中*/
            left: 0;
            right: 0;
            /*垂直居中*/
            top: 0;
            bottom: 0;
            text-align center;
            height 100px;
            line-height 100px;
            font-size 100px;
            z-index -2;
            color black;
            // white-space nowrap;
            text-overflow: clip;
        }
    }
}
</style>
