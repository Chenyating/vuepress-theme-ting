<template>
<div class="nav-box">
    <tingSearch />
    <div class="nav">
        <div class="link-item" v-for="(item,index) in navLinkList" :key="index">
            <a :href="item.link" v-if="item.type=='url'">
                {{item.text}}
            </a>
            <router-link tag='a' v-else :to="item.link">{{item.text}}</router-link>
        </div>
    </div>
</div>
</template>

<script>
import tingSearch from '../components/tingSearch.vue'
export default {
    components: {
        tingSearch,
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
    display flex;
    justify-content flex-end;
    max-width 900px;
    margin 0 auto;

    .nav {
        z-index 4;
        position relative;
        max-width 900px;
        height 196px;
        display: flex;
        justify-content: center;
        align-items: flex-start;
        font-weight bold;

        .link-item {
            a {
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
            -webkit-writing-mode: vertical-rl;
            writing-mode: vertical-rl;
            padding 0.5em;
            marigin 2em;
            border-top 0;
            vertical-align bottom;
            margin-bottom 0;
            letter-spacing 5px;
            font-weight bold;
        }
    }
}
</style>
