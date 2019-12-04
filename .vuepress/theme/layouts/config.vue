<template>
    <div>
        <tingFeel/>
        <tingContent/>
    </div>
</template>

<script>
    import tingFeel from "../components/tingFeel.vue";
    import tingContent from "../components/tingContent.vue";

    export default {
        components: {
            tingFeel,
            tingContent
        },
        name: 'config',
    }
</script>

