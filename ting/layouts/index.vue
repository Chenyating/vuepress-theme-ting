<template>
  <div class="index-layout">
    <ting-nav @changenav="showcont" />
    <ting-about v-show="contid != 1" />
    <div class="cont-list">
      <div class="cont" v-show="contid == 0">
        <ting-type @clicktag="showcatalog" />
      </div>
      <div class="cont" v-show="contid == 1">
        <ting-search />
        <ting-catalog :curtag="curtype" />
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
import tingSearch from "../components/ting-search.vue";
import tingNav from "../components/ting-nav.vue";
import tingGitalk from "../components/ting-gitalk.vue";
import tingCatalog from "../components/ting-catalog.vue";
import tingType from "../components/ting-type.vue";
import tingAbout from "../components/ting-about.vue";
import tingContent from "../components/ting-content.vue";
export default {
  components: {
    tingSearch,
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
      curtype: "all",
    };
  },
  methods: {
    showcatalog(val) {
      this.contid = 1;
      this.curtype = val;
    },
    showcont(val) {
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
