<template>
<div>
    <Navbar class="nav-top " @toggle-sidebar='showLink()' />
    <div class="sidebar" :class="className">
        <NavLinks />
        <div>
            <!-- <div v-if="preTitle.title" @click="goArticle(preTitle)" class="levelTitle">上一篇:《{{preTitle.title}}》</div>
            <div class="level1">{{nowTitle}}</div> -->
            <a v-for="(item,index) in $page.headers" :key="index" :href="'#'+item.slug" nofollow>{{item.title}}</a>
            <!-- <div v-if="nextTitle.title" @click="goArticle(nextTitle)" class="levelTitle">下一篇：《{{nextTitle.title}}》</div> -->
            <tingType/>
        </div>
    </div>
</div>
</template>

<script>
import Navbar from '@theme/components/Navbar.vue'
import NavLinks from '@theme/components/NavLinks.vue'
import tingType from "../components/ting-type.vue";


export default {
    components: {
        Navbar,
        NavLinks,
        tingType
    },
    data() {
        return {
            navLinkList: [],
            ifshow: false,
        }
    },
    computed: {
          className() {
            return [ {
                [`sider-hide`]: this.ifshow,
            }]
        },
        showCondition(){
            return false
        }
    },
    methods: {
        showLink() {
            this.ifshow = !this.ifshow;
        },
        goCatalog(tagType) {
            this.$router.push(`${this.$site.themeConfig.catalogUrl}.html?type=${tagType}`);
        },
        changeLink() {
            this.ifshow = false;
        }
    },
    mounted() {
        this.navLinkList = this.$site.themeConfig.nav;
    }
}
</script>

<style lang="stylus" scoped>
.sider-hide{
    transform translateX(0);
}
.nav-box {
    .nav-top {
        z-index 99;

    }

    .link-list {

        .link-item {
            border-radius 20px;

            a {
                color white;
                text-decoration: shade;
            }

            text-align center;
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
            margin 5px;
        }
    }

}
</style>
