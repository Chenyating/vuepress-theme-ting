<template>
<div class="all-box">
    <pagecatalog/> 
    <ting-content/>
</div>
</template>
<script>
import pagecatalog from "../components/ting-pagecatalog.vue";
import tingContent from "../components/ting-content.vue";
export default {
    components: {
        tingContent,
        pagecatalog,
    }
};
</script>