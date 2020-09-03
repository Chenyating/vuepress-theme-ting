<template>
<div id="global-layout" v-cloak>
    <div class="container">
        <div class="container-inner" ref="content">
            <!-- <tingLoading v-show='isok' /> -->
            <keep-alive>
                <component :is="layout" />
            </keep-alive>
        </div>
    </div>
    <div class="foot"> {{$site.themeConfig.footer?$site.themeConfig.footer:'@YATING vuepress-theme-ting'}}</div>
</div>
</template>

<script>
import tingNav from '../components/ting-nav.vue'
import tingLoading from '../components/ting-loading.vue'

export default {
    data() {
        return {
            isok: true
        }
    },
    mounted() {
        this.isok = false;
    },
    components: {
        tingNav,
        tingLoading
    },
    computed: {
        layout() {
            if (this.$page.path) {
                if (this.$frontmatter.layout) {
                    return this.$frontmatter.layout
                }
                return 'Layout'
            }
            return 'NotFound'
        }
    }
}
</script>

<style lang="stylus" scoped>
[v-cloak] {
    display: none;
}

// 粘连布局
#global-layout {
    height: 100%;
    width: 100%;
    margin 0 auto;

    .container {
        min-height: 100%;
        width: 100%;
        padding-bottom: 60px;
        box-sizing: border-box;

        .container-inner {
            margin: 0 auto;
            width 100%
            box-sizing: border-box;
        }
    }

    .foot {
        height: 60px;
        text-align center;
        line-height 60px;
        margin-top: -60px;
        font-weight light;
        font-size 12px;
        padding-right 2em;
        color white;
        /*从左向右 从右向左是 writing-mode: vertical-rl;*/
        text-decoration: none;
        letter-spacing 2px;
        out-line: none;
        text-shadow 1px 1px #000;
    }
}
</style>
