<template>
  <div>
    <tingCaroulse />
    <div class="me">
      <div class="me-img">
        <img :src="headImg" />
      </div>
      <div class="me-name">{{ $site.themeConfig.author.name }}</div>
      <div class="me-desc">{{ $site.themeConfig.author.description }}</div>
    </div>
  </div>
</template>

<script>
import tingCaroulse from "../components/ting-caroulse.vue";

export default {
  components: {
    tingCaroulse,
  },
  data() {
    return {
      headImg: "",
    };
  },
  mounted() {
    if (this.$site.themeConfig.author) {
      this.headImg = this.$site.themeConfig.author.headImg;
    }
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
      background: linear-gradient(to #fda6bc, #c3dae4, #c4deaa);
      animation: huecolor 6s linear infinite;
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
      background: linear-gradient(to #fda6bc, #c3dae4, #c4deaa);
      animation: huecolor 6s linear infinite;
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
