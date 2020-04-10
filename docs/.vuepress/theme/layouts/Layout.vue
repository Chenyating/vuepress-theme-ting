<template>
<div class="all-box">
    <tingNav/>
    <tingContent/>
</div>
</template>
<script>
import tingContent from "../components/tingContent.vue";
import tingNav from "../components/tingNav.vue";
export default {
    components: {
        tingNav,
        tingContent,
    }
};
</script>