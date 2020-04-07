<template>
<div class="index-box">
    <ting-about />
    <ting-type />
</div>
</template>

<script>
import tingAbout from "../components/tingAbout.vue";
import tingType from "../components/tingType.vue";
import SearchBox from '@SearchBox'
export default {
    components: {
        tingAbout,
        tingType,
        SearchBox
    },
    name: 'index'
}
</script>

<style lang="stylus" scoped>
.index-box {
    background #ffffff;
    .search {
        position relative;
        top 0;
        right 0;
        margin 0 10px;
    }
}
</style>
