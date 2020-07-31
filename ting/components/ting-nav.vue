<template>
<div class="nav">
    <div class="link-item btn-4" @mouseenter="changeText(item.text)" v-for="(item,index) in navLinkList" :key="index">
        <a :href="item.link" v-if="item.type=='url'">
            {{item.text}}
        </a>
        <router-link tag='a' v-else :to="item.link">{{item.text}}</router-link>
    </div>
</div>
</template>

<script>
import tingSearch from '../components/ting-search.vue'
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
        },
        changeText(txt) {
            console.log()
            var text = document.getElementById('bgText');
            if (text) {
                text.innerText = txt;
            }
        }
    },
    mounted() {
        this.navLinkList = this.$site.themeConfig.nav;
    }
}
</script>

<style lang="stylus" scoped>
.nav {
    z-index 4;
    margin 0 auto;
    position relative;
    height auto;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    font-weight bold;

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
</style>
