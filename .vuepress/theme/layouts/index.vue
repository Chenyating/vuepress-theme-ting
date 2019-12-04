<template>
    <div>
        <ting-user/>
        <ting-content/>
    </div>
</template>

<script>
    import tingContent from "../components/tingContent.vue";
    import tingUser from "../components/tingUser.vue";
    export default {
        components: {
            tingContent,
            tingUser
        },
        name: 'index'
    }
</script>
