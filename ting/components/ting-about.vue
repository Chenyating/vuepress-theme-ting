<template>
<div class="info-box">
    <img class="my-phone" :src="headImg" />
    <div class="my-name">{{$site.themeConfig.author}}</div>
    <div class="des">{{$site.description}}</div>
</div>
</template>

<script>
export default {
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
    width 100%;
    background #d7e2d2;
    padding 50px 0;
    text-align center;
    box-sizing border-box;
    border solid 3px #ffffff;

    .my-phone {
        width 200px;
        height 200px;
        border solid 3px #ffffff;
        border-radius: 200px;
    }

    .my-name {
        margin-top 30px;
        font-weight bold;
        font-size 60px;
        margin-bottom 10px;
    }

    .des {
        font-size 16px;
        font-weight lighter;
    }
}
</style>
