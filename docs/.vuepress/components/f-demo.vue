<template>
<div class="demo-box">
    <div class="example-box" :class="yesDark">
        <slot></slot>
    </div>
    <div v-show="ifshowCode">
        <pre v-highlightjs><code class="html">{{code}}</code></pre>
    </div>
    <div class="btn" @click="showCode">
        {{ifshowCode?'隐藏代码':'显示代码'}}
    </div>
</div>
</template>

<script>
export default {
    props: {
        code: {
            type: String
        },
        dark: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            ifshowCode: false
        }
    },
    methods: {
        showCode() {
            this.ifshowCode = !this.ifshowCode;
        }
    },
    computed: {
        yesDark() {
            return [{
                [`dark`]: this.dark
            }]
        }
    }
}
</script>

<style lang="less" scoped>
.demo-box {
    border: solid 1px #3eaf7c;
    box-shadow: 0px 0px 5px #f1f2f4;
    border-bottom-right-radius: 10px;
    border-bottom-left-radius: 10px;
    .example-box {
        padding: 20px;
    }

    .dark {
        background: rgb(20, 19, 19);
    }
}

pre {
    background: #edf6e4;
    border-radius: 0;
    margin: 0;

    code {
        background: #edf6e4;
        color: black;
    }
}

.btn {
    font-size: 14px;
    color: #2c3e50;
    line-height: 32px;
    text-align: center;
    padding: 0 15px;
    cursor: pointer;
    border-top: solid 1px #3eaf7c;
    color: black;
}
</style>
