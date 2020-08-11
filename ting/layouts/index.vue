<template>
<div class="index-box">
    <tingType />
    <live2d class="live2d pc-box" />
</div>
</template>

<script>
import live2d from "../components/ting-live2d.vue";
import tingType from "../components/ting-type.vue";
import tingAbout from "../components/ting-about.vue";
import SearchBox from '@SearchBox'

export default {
    components: {
        live2d,
        tingType,
        tingAbout,
        SearchBox
    },
    name: 'index',
}
</script>

<style lang="stylus" scoped>
.index-box {
    position fixed;
    left 0;
    top 0;
    right 0;
    width: 100%;
    max-width 1024px;
    margin 0 auto;
    height 100%;
    display flex;
    align-items center;

    .live2d {
        position absolute;
        left 0;
        right 0;
    }
}
</style>
