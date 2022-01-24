<template>
  <div class="global-layout">
    <ting-bg />
    <loading v-show="isloading" />
    <div :class="!isloading?'show':'hide'">
      <div id="top"></div>
      <component :is="layout" />
      <ting-live2d />
    </div>
  </div>
</template>

<script>
import tingNav from "../components/ting-nav.vue";
import tingLive2d from "../components/ting-live2d.vue";
import loading from "../components/ting-loading.vue";
import tingBg from "../components/ting-bg.vue";
export default {
  data() {
    return {
      isloading: true,
    };
  },
  methods: {},
  mounted() {
    setTimeout(() => {
      this.isloading = false;
    }, 2000);
  },
  components: {
    loading,
    tingLive2d,
    tingNav,
    tingBg,
  },
  computed: {
    layout() {
      if (this.$page.path) {
        if (this.$frontmatter.layout) {
          // 你也可以像默认的 globalLayout 一样首先检测 layout 是否存在
          return this.$frontmatter.layout;
        }
        return "Layout";
      }
      return "NotFound";
    },
  },
};
</script>

<style lang="stylus" scoped>
.global-layout {
  max-width: 900px;
  margin: 0 auto;
  position: relative;
}
</style>
