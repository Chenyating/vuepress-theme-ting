<template>
<div class="all-box">
    <ting-nav/>
    <pagecatalog/>
    <!-- <ting-content/> -->
</div>
</template>
<script>
import pagecatalog from "../components/ting-pagecatalog.vue";
import tingContent from "../components/ting-content.vue";
import tingNav from "../components/ting-nav.vue";
export default {
    components: {
        tingNav,
        tingContent,
        pagecatalog
    }
};
</script>