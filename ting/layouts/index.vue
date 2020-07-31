<template>
<div class="index-box">
    <div class="index-content">
        <live2d />
        <tingNav />
        <p class="my-name ">
            <span id='bgText'>
                {{$site.themeConfig.author}}
            </span>
        </p>
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
            text-transform: uppercase;
            letter-spacing: 0.5em;
            padding: 1.5em 0em;
            top: 0;
            bottom: 0;
            right: 0;
            left: 0;
            margin: 0 auto;
            text-align: center;
            z-index -1;
            font-size 2em;

            span {

                font: 700 4em/1 "Oswald", sans-serif;
                letter-spacing: 0;
                padding: .25em 0 .325em;
                display: block;
                margin: 0 auto;
                text-shadow: 0 0 80px rgba(255, 255, 255, .5);

                /* Clip Background Image */

                background: url(http://f.cl.ly/items/010q3E1u3p2Q0j1L1S1o/animated_text_fill.png) repeat-y;
                -webkit-background-clip: text;
                background-clip: text;

                /* Animate Background Image */

                -webkit-text-fill-color: transparent;
                -webkit-animation: aitf 80s linear infinite;

                /* Activate hardware acceleration for smoother animations */

                -webkit-transform: translate3d(0, 0, 0);
                -webkit-backface-visibility: hidden;

            }
        }

        /* Animate Background Image */

        @-webkit-keyframes aitf {
            0% {
                background-position: 0% 50%;
            }

            100% {
                background-position: 100% 50%;
            }
        }
    }
}
</style>
