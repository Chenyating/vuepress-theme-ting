<template>
<a href="#top" class="live2d-box">
  <canvas id="live2d" width="280" height="250"></canvas>
</a>
</template>

<script>
import "../public/js/live2d.js";
export default {
  components: {},
  data() {
    return {};
  },
  methods: {},
  mounted() {
    this.url = this.$site.themeConfig.live2dModel;
    if (this.url != undefined) {
      loadlive2d("live2d", this.url);
    }
  },
};
</script>

<style lang="stylus" scoped>
.live2d-box{
  user-select: none;
  position: fixed;
  margin: 1em;
  bottom: 1em;
  z-index: 10000;
  }
#live2d {
  width: 100px;
  font-size: 0;
  transition: all 0.3s ease-in-out;
}
</style>
