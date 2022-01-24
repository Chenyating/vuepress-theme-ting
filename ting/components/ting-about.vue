<template>
  <div>
    <tingCaroulse v-if="this.$site.themeConfig.author.infolist"/>
    <div class="me">
      <div class="me-img">
        <img v-if="this.$site.themeConfig.author.headImg" :src="$site.themeConfig.author.headImg" />
      </div>
      <div class="me-name">{{ $site.themeConfig.author.name?$site.themeConfig.author.name:'vuepress-theme-ting' }}</div>
      <div class="me-desc">{{ $site.themeConfig.author.description?$site.themeConfig.author.description:'一个小清新风格的vuepress主题' }}</div>
    </div>
  </div>
</template>

<script>
import tingCaroulse from "../components/ting-caroulse.vue";

export default {
  components: {
    tingCaroulse,
  },
};
</script>

<style lang="stylus" scoped>
.me {
  position: relative;
  padding: 1.5em 1em;
  padding-left: 150px;
  margin: 2em 1em;
  box-sizing: border-box;

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
    background: #c4deaa;

    &:before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 20px;
      height: 20px;
      border-radius: 100%;
      position: absolute;
      background: #c4deaa;
    }

    &:after {
      content: '';
      position: absolute;
      top: 0;
      right: 0;
      width: 20px;
      height: 20px;
      border-radius: 100%;
      position: absolute;
      background: #c4deaa;
    }

    img {
      width: 100%;
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
