<template>
<div class="layout">
    <SearchBox/>
    <ting-content/>
    <ting-pagecatalog/> 
    <ting-gitalk/>
</div>
</template>
<script>
import SearchBox from "@SearchBox";
import tingGitalk from "../components/ting-gitalk.vue";
import tingPagecatalog from "../components/ting-pagecatalog.vue";
import tingContent from "../components/ting-content.vue";
export default {
    components: {
        SearchBox,
        tingContent,
        tingPagecatalog,
        tingGitalk
    }
};
</script>
<style lang="stylus" scoped>
.layout {
  max-width: 900px;
  margin: 0 auto;
  position: relative;
}
</style>
