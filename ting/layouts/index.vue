<template>
  <div class="index-layout">
    <ting-nav @changenav="haha" />
    <ting-about v-show="contid != 1"/>
    <div class="cont-list">
      <div class="cont" v-show="contid == 0">
        <div>博客分类</div>
        <ting-type />
      </div>
      <div class="cont" v-show="contid == 1">
        <ting-catalog />
      </div>
      <div class="cont" v-show="contid == 2">
        <ting-content />
      </div>
      <div class="cont" v-show="contid == 3">
        <ting-gitalk />
      </div>
    </div>
  </div>
</template>

<script>
import tingNav from "../components/ting-nav.vue";
import tingGitalk from "../components/ting-gitalk.vue";
import tingCatalog from "../components/ting-catalog.vue";
import tingType from "../components/ting-type.vue";
import tingAbout from "../components/ting-about.vue";
import tingContent from "../components/ting-content.vue";
export default {
  components: {
    tingNav,
    tingContent,
    tingGitalk,
    tingAbout,
    tingCatalog,
    tingType,
  },
  name: "index",
  data() {
    return {
      contid: 0,
    };
  },
  methods: {
    haha(val) {
      this.contid = val;
    },
  },
};
</script>

<style lang="stylus" scoped>
.index-layout {
  max-width: 900px;
  margin: 0 auto;
  position: relative;
}

.cont-list {
  position: relative;

  .cont {
    transition: all 0.3s ease;
  }
}
</style>
