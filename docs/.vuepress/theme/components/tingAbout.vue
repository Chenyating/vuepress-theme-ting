<template>
<div class="my-bg">
    <div class="info-box">
        <img class="my-phone" :src="headImg" />
        <div class="info">
            <div class="my-name">{{$site.themeConfig.author}}</div>
            <div class="des">{{$site.description}}</div>
        </div>
    </div>
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
.my-bg{
    background url('../public/img/my-bg.jpg');
    background-size cover;
    padding-top 120px;
}
.info-box {
    background #ffffff;
    margin 0 30px;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;

    .my-phone {
        width 80px;
        height 80px;
        border solid 3px #ffffff;
        border-radius: 80px;
        transform translateY(-40px);
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
</style>
