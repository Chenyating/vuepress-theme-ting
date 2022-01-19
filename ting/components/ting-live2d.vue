<template>
  <div id="landlord" class="live2d-box">
    <div class="message" id="live2deMessage" style="opacity: 1">
      喵喵喵～
    </div>
      <canvas id="live2d" width="280" height="250"></canvas>
  </div>
</template>

<script>
import "../public/js/live2d.js";
import "../public/js/message.js";
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
.live2d-box {
  user-select: none;
  pointer-events: none;
  position: fixed;
  bottom: 0;
  left: 0;
  width:100px;
  z-index: 10000;
}

#live2d {
  width: 100px;
  font-size: 0;
  transition: all 0.3s ease-in-out;
}

.message {
  font-size: 0.8em;
  color: #2e5c77;
  scroll-behavior: smooth;
  border: 2px dashed #fda6bc;
  padding: 0.5em;
  margin: 1em;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 1em;
  position: relative;
  transform-origin: center center;
  animation: rorating 2s ease-in infinite;
  pointer-events: none;

  &:after {
    content: ' ';
    position: absolute;
    bottom: -1em;
    left: 1.5em;
    margin: auto;
    border: solid 0.5em #fda6bc;
    border-bottom: transparent 0.5em solid;
    border-right: transparent 0.5em solid;
    border-left: transparent 0.5em solid;
  }
}
</style>
