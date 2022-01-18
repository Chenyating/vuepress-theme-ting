<template>
  <div class="index-page">
    <ting-nav @changenav="haha" />
    <div class="cont-list">
      <div class="cont" v-show="contid == 0">
        <!-- <tingabout /> -->
        <tingType />
      </div>
      <div class="cont" v-show="contid == 1">
        <tingcatalog />
      </div>
      <div class="cont" v-show="contid == 2">
        <tingcontent />
      </div>
      <div class="cont" v-show="contid == 3">
        <tingGitalk />
      </div>
    </div>
  </div>
</template>

<script>
import tingcontent from "../components/ting-content.vue";
import tingNav from "../components/ting-nav.vue";
import tingGitalk from "../components/ting-gitalk.vue";
// import SearchBox from "@SearchBox";
import tingcatalog from "../components/ting-catalog.vue";
import tingType from "../components/ting-type.vue";
import tingabout from "../components/ting-about.vue";
import tingContent from "../components/ting-content.vue";
export default {
  components: {
    tingNav,
    tingcontent,
    tingGitalk,
    tingabout,
    tingcatalog,
    tingType,
    tingContent,
    // SearchBox,
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
.cont-list {
  position: relative;

  .cont {
    transition: all 0.3s ease;
  }
}
</style>
