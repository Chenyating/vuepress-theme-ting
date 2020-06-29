<template>
<span class="card" :style="style">
    <slot>
        <div>
            {{color}}
        </div>
        <div>
            {{text}}
        </div>
    </slot>
</span>
</template>

<script>
export default {
    props: {
        color: {
            type: String,
            default: '#000000'
        },
        text: {
            type: String,
            default: '颜色名称'
        }
    },
    data() {
        return {}
    },
    computed: {
        style() {
            let style = {};
            if (this.color) {
                style = {
                    background: this.color,
                };
            }
            return style;
        }
    }
}
</script>

<style lang="less" scoped>
.card {
    width: 100px;
    height: 100px;
    display: inline-block;
    text-align: center;
    border: 1px solid #f1f2f4;
    margin: 10px;
    color: #ffffff;
    padding: 20px 0;
}
</style>
