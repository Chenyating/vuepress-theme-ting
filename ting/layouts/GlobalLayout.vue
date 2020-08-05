<template>
<div id="global-layout" v-cloak>
    <div class="container">
        <div class="container-inner">
            <tingNav />
            <keep-alive>
                <component class="page" :is="layout" />
            </keep-alive>
        </div>
    </div>
    <div class="foot"> {{$site.themeConfig.footer?$site.themeConfig.footer:'@YATING vuepress-theme-ting'}}</div>
</div>
</template>

<script>
import tingNav from '../components/ting-nav.vue'

export default {
    data() {
        return {
        }
    },
    mounted() {
    },
    components: {
        tingNav
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
            padding-top 60px;
            margin: 0 auto;
            width: 100%;
            box-sizing: border-box;
        }
    }

    .foot {
        height: 60px;
        text-align right;
        line-height 60px;
        margin-top: -60px;
        font-weight light;
        font-size 12px;
        padding-right 2em;
    }
}
</style>
