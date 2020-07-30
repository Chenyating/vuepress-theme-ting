<template>
<div id="global-layout" v-cloak>
    <div class="container">
        <div class="container-inner">
            <loading v-show="isloading" />
            <keep-alive>
                <component :is="layout" />
            </keep-alive>
        </div>
    </div>
    <div class="foot"> {{$site.themeConfig.footer?$site.themeConfig.footer:'@YATING vuepress-theme-ting'}}</div>
</div>
</template>

<script>
import loading from "../components/ting-loading.vue";
export default {
    data() {
        return {
            isloading: true
        }
    },
    mounted() {
        this.isloading = false
    },
    components: {
        loading,
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
        background #d7e2d2;

        .container-inner {
            margin: 0 auto;
            min-height: 100%;
            width: 100%;
            max-width 1024px;
            box-sizing: border-box;

        }
    }

    .foot {
        height: 60px;
        text-align center;
        line-height 60px;
        margin-top: -60px;
    }
}
</style>
