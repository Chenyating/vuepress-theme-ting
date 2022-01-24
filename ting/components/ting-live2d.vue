<template>
  <div id="landlord" class="live2d-box">
    <div class="message show" id="live2deMessage">喵喵喵～</div>
    <canvas v-if="url" id="live2d" width="280" height="250"></canvas>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      url:''
    };
  },
  methods: {
    loadJs(url, callback) {
      var script = document.createElement("script");
      script.type = "text/javascript";
      if (typeof callback != "undefined") {
        if (script.readyState) {
          script.onreadystatechange = function () {
            if (
              script.readyState == "loaded" ||
              script.readyState == "complete"
            ) {
              script.onreadystatechange = null;
              callback();
            }
          };
        } else {
          script.onload = function () {
            callback();
          };
        }
      }
      script.src = url;
      document.body.appendChild(script);
    },
  },
  mounted() {
    this.url = this.$site.themeConfig.live2dModel;
    if (this.url != undefined) {
      this.loadJs("https://yating.world/js/live2d.js");
      this.loadJs("https://yating.world/js/message.js");
      window.onload = () => {
        loadlive2d("live2d", this.url);
      };
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
  width: 25vw;
  z-index: 10000;
}

#live2d {
  width: 25vw;
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
    left: 0;
    right: 0;
    width:0;
    margin: auto;
    border: solid 0.5em #fda6bc;
    border-bottom: transparent 0.5em solid;
    border-right: transparent 0.5em solid;
    border-left: transparent 0.5em solid;
  }
}
</style>
