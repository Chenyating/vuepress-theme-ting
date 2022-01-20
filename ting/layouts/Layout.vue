<template>
  <div class="layout">
    <ting-search/>
    <ting-content />
    <ting-pagecatalog />
    <ting-gitalk />
  </div>
</template>
<script>
import tingSearch from "../components/ting-search.vue";
import tingGitalk from "../components/ting-gitalk.vue";
import tingPagecatalog from "../components/ting-pagecatalog.vue";
import tingContent from "../components/ting-content.vue";
export default {
  components: {
    tingSearch,
    tingContent,
    tingPagecatalog,
    tingGitalk,
  },
  methods: {},
  mounted() {
    if (this.$route.hash) {
      document
        .querySelector(`${decodeURIComponent(location.hash)}`)
        .scrollIntoView(true);
    }
  },
};
</script>
<style lang="stylus" scoped>
.layout {
  max-width: 900px;
  margin: 0 auto;
  position: relative;
}
</style>
