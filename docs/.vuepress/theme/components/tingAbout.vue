<template>
<tingNav>
    <div slot='expand' class="info-box">
        <img class="my-phone" :src="headImg" />
        <div class="info">
            <div class="my-name">{{$site.themeConfig.author}}</div>
            <div class="des">{{$site.description}}</div>
        </div>
    </div>
    </div>
</tingNav>
</template>

<script>
import tingNav from "../components/tingNav.vue";
export default {
    components: {
        tingNav,
    },
    data() {
        return {
            headImg: "https://yating.online/res/img/yating.jpg",
            navLinkList: [],
        }
    },
    mounted() {
        if (this.$site.themeConfig.headImg) {
            this.headImg = this.$site.themeConfig.headImg;
        }

        this.navLinkList = this.$site.themeConfig.nav;

    }
}
</script>

<style lang="stylus" scoped>
.info-box {
    background #ffffff;
    margin 0 20px;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    .my-phone {
        transform translateY(-40px);
        width 80px;
        height 80px;
        border solid 3px #ffffff;
        border-radius: 80px;
        display block;
        margin 0 auto;
    }

    .info {
        transform translateY(-30px);

        .my-name {
            font-weight bold;
            font-size 20px;
            text-align center;
            margin-bottom 10px;
        }

        .des {
            text-align center;
        }
    }
}

@media (max-width $MQNarrow) {
    .info-box {
        transform translateY(50px);
    }

}
</style>
