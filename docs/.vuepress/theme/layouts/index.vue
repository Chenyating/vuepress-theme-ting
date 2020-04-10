<template>
<div class="index-box">
    <ting-about />
    <ting-type />
    <tingContent/>
</div>
</template>

<script>
import tingAbout from "../components/tingAbout.vue";
import tingType from "../components/tingType.vue";
import tingSearch from '../components/tingSearch.vue'
import tingContent from '../components/tingContent.vue'
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
