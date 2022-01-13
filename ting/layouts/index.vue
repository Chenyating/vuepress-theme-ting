<template>
  <div class="index-page">
    <tingType />
    <tingabout/>
    <tingcatalog />
  </div>
</template>

<script>
import SearchBox from "@SearchBox";
import tingcatalog from "../components/ting-catalog.vue";
import tingType from "../components/ting-type.vue";
import tingabout from "../components/ting-about.vue";
import tingContent from "../components/ting-content.vue";
export default {
  components: {
    tingabout,
    tingcatalog,
    tingType,
    tingContent,
    SearchBox,
  },
  name: "index",
};
</script>

<style lang="stylus" scoped></style>
