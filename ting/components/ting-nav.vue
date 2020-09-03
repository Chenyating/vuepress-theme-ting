<template>
<div class="nav-box">
    <SidebarButton @toggle-sidebar="$emit('click-menu')" />
    <div class="flex-rc">
        <div class="pc-box">
            <span class="link-item" v-for="(item,index) in navLinkList" :key="index">
                <a :href="item.link" v-if="item.type=='url'">
                    {{item.text}}
                </a>
                <router-link tag='a' v-else :to="item.link">{{item.text}}</router-link>
            </span>
        </div>
        <SearchBox class="search-box" />
        <img class="pc-box myphone" :src="$site.themeConfig.headImg" />
    </div>
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
    box-sizing border-box;
    z-index 99;
    background #24292E;
    background-size cover;
    height 4em;
    left 0;
    top 0;
    display flex;
    align-items center;
    justify-content flex-end;
    .sidebar-button {
        color white !important;
    }

    .myphone {
        width 2em;
        height 2em;
        border-radius 100%;
        margin 0 1em;
    }

    .pc-box {
        .link-item {
            font-weight bold;
            margin-right 1em;
            display inline-block;

            a {
                color white;
            }
        }
    }

    .search-box {
        z-index 999;

        input {
            background-color: hsla(0, 0%, 100%, .125);
            color white;
        }
    }
}
</style>
