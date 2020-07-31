<template>
<div>
    <div class="grid">
        <div class="grid__item" v-for="(item,index) in list" :key="index">
            <div class="pantone-card">
               <slot/>
            </div>
        </div>
    </div>
</div>
</template>

<style lang="stylus" scoped>
.pantone-card {
}

.grid {
    display: grid;
    grid-auto-flow: dense;
    grid-gap: 40px;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    grid-template-rows: repeat(30, 150px);

    &__item {
        &:nth-child(2n) {
            grid-column: span 2; // Tells item to span rows
            grid-row: span 2;
        }
    }
}
</style>
