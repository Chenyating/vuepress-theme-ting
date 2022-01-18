<template>
  <div class="global-layout">
    <!-- <ting-bg /> -->
    <div id="top"></div>
    <SearchBox/>
    <loading v-show="isloading"/>
    <component :is="layout" />
    <ting-live2d/>
  </div>
</template>

<script>
import SearchBox from "@SearchBox";
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
  methods:{
  },
  mounted() {
    this.isloading = false;
  },
  components: {
    loading,
    tingLive2d,
    tingNav,
    tingBg,
    SearchBox
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
