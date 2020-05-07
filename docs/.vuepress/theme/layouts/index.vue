<template>
<div class="index-box">
    <ting-about />
    <ting-type />
    <ting-content/>
</div>
</template>

<script>
import tingAbout from "../components/ting-about.vue";
import tingType from "../components/ting-type.vue";
import tingSearch from '../components/ting-search.vue'
import tingContent from '../components/ting-content.vue'
export default {
    components: {
        tingAbout,
        tingType,
        tingSearch,
        tingContent
    },
    name: 'index'
}
</script>

<style lang="stylus" scoped>
.index-box {
    background #ffffff;
}
</style>
