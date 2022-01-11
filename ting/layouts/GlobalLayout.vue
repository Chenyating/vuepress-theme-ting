<template>
  <div id="global-layout">
    <tingNav />
    <!-- <loading v-show="isloading" />
    <live2d /> -->
    <component :is="layout" />
  </div>
</template>

<script>
import tingNav from "../components/ting-nav.vue";
import live2d from "../components/ting-live2d.vue";
import loading from "../components/ting-loading.vue";
export default {
  data() {
    return {
      isloading: true,
    };
  },
  mounted() {
    this.isloading = false;
  },
  components: {
    loading,
    live2d,
    tingNav,
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

<style lang="stylus">
.foot {
  text-align: center;
  font-size: 0.8em;
  margin: 0.5em;
}

#global-layout {
  width: 100vw;
  height: 100vh;
  position: relative;

  &:before {
    content: '';
    width: 100%;
    height: 100%;
    position: fixed;
    left: 0;
    top: 0;
    z-index: -8;
    background: url('../public/img/bg.jpg');
    background-size: cover;
    background-position: center center;
    transform: rotateY(180deg);
  }
}
</style>
