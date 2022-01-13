<template>
  <div class="me">
    <div class="me-img">
      <img :src="headImg"/>
    </div>
    <div class="me-name">{{ $site.themeConfig.author }}</div>
    <div class="me-desc">{{ $site.description }}</div>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      headImg: "https://avatars.githubusercontent.com/u/29857880?v=4",
      navLinkList: [],
    };
  },
  mounted() {
    if (this.$site.themeConfig.headImg) {
      this.headImg = this.$site.themeConfig.headImg;
    }

    this.navLinkList = this.$site.themeConfig.nav;
  },
};
</script>

<style lang="stylus" scoped>
.me {
  width: 100%;
  position: relative;
  padding: 30px 20px;
  padding-left: 150px;
  margin: 0 auto;
  box-sizing:border-box;

  &-img {
    width: 100px;
    height: 100px;
    border-radius: 100%;
    position: absolute;
    left: 10px;
    top: 0;
    bottom: 0;
    margin: auto;
    display: block;

    &:before {
      content: '';
      width: 100px;
      height: 100px;
      border-radius: 100%;
      position: absolute;
      transform: translateX(10px) translateY(-5px);
      background: #c4deaa;
      z-index: -1;
    }
    img{
      width 100%;
      height: 100%;
      border-radius: 100%;
      border: solid 5px #c4deaa;
      box-sizing: border-box;
    }
  }

  &-name {
    width: inherit;
    font-size: 2em;
    color: #2e5c77;
    overflow: hidden;
    font-weight: bold;
  }

  &-desc {
    font-size: 1em;
    color: #2e5c77;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
</style>
