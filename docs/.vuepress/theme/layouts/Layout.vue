<template>
<div class="all-box">
    <ting-nav/>
    <ting-content/>
</div>
</template>
<script>
import tingContent from "../components/ting-content.vue";
import tingNav from "../components/ting-nav.vue";
export default {
    components: {
        tingNav,
        tingContent,
    }
};
</script>