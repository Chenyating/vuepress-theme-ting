<template>
<div class="nav-box">
    <SidebarButton @toggle-sidebar="$emit('click-menu')" />
    <div class="nav">
        <div class="link-item" v-for="(item,index) in navLinkList" :key="index">
            <a :href="item.link" v-if="item.type=='url'">
                {{item.text}}
            </a>
            <router-link tag='a' v-else :to="item.link">{{item.text}}</router-link>
        </div>
    </div>
    <SearchBox class="search-box" />
</div>
</template>

<script>
import SidebarButton from '@theme/components/SidebarButton.vue'
import SearchBox from '@SearchBox'

export default {
    components: {
        SidebarButton,
        SearchBox
    },
    data() {
        return {
            navLinkList: []
        }
    },
    methods: {
        goCatalog(tagType) {
            this.$router.push(`${this.$site.themeConfig.catalogUrl}.html?type=${tagType}`);
        }
    },
    mounted() {
        this.navLinkList = this.$site.themeConfig.nav;
    }
}
</script>

<style lang="stylus">
.nav-box {
    position fixed;
    width 100%;
    max-width 1024px;
    box-sizing border-box;
    z-index 99;
    margin 0 auto;
    background url('../public/img/my-bg.jpg');
    background-size cover;
    padding 10px;
    padding-bottom 0;
    display flex;
    align-items center;
    justify-content flex-end;

    .sidebar-button {
        color white !important;
    }

    .nav {
        z-index 4;
        position relative;
        max-width 900px;
        height auto;
        display: flex;
        justify-content: center;
        align-items: flex-start;
        font-weight bold;

        .link-item {
            @media (max-width $MQNarrow) {
                a {
                    width 1.2em;
                    height 1.2em;
                }
            }

            a {
                overflow: hidden;
                writing-mode: vertical-lr;
                /*从左向右 从右向左是 writing-mode: vertical-rl;*/
                writing-mode: tb-lr;
                text-decoration: none;
                font-weight bold;
                out-line: none;
                color #fff;
                text-shadow 1px 1px #000;

                &:hover {
                    color #ffffff;
                }
            }

            cursor pointer;
            font-size 1em;
            //文字垂直
            text-align center;
            padding 0.5em;
            border-top 0;
            vertical-align bottom;
            margin-bottom 0;
            letter-spacing 5px;
            font-weight bold;
        }
    }

    .search-box {
        z-index 999;
    }
}
</style>
