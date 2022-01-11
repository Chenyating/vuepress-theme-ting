<template>
  <div class="index-page">
    <!-- <SearchBox /> -->
    <tingcatalog />
  </div>
</template>

<script>
import SearchBox from "@SearchBox";
import tingcatalog from "../components/ting-catalog.vue";
import tingType from "../components/ting-type.vue";
import tingContent from "../components/ting-content.vue";
export default {
  components: {
    tingcatalog,
    tingType,
    tingContent,
    SearchBox,
  },
  name: "index",
};
</script>

<style lang="stylus" scoped></style>
