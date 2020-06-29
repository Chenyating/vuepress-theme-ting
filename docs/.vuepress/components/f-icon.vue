<template>
<f-demo :code='code'>
    <div class="icon-box">
        <div class="icon-detail" v-for="(item,index) in iconList" :key="index">
            <if-icon :type='item.name' :color='item.color' :size='item.size' />
            <div>{{item.name}}</div>
        </div>
    </div>
</f-demo>
</template>

<script>
import fDemo from './f-demo.vue'
export default {
    props: {
        code: {
            type: String
        }
    },
    components: {
        fDemo
    },
    data() {
        return {
            iconList: [{
                    name: 'left',
                },
                {
                    name: 'right',
                },
                {
                    name: 'up',
                },
                {
                    name: 'down',
                },
                {
                    name: 'add',
                },
                {
                    name: 'false',
                },
                {
                    name: 'true',
                },
                {
                    name: 'collected',
                },
                {
                    name: 'collect',
                },
                {
                    name: 'liked',
                },
                {
                    name: 'like',
                },
                {
                    name: 'close',
                },
                {
                    name: 'people',
                },
                {
                    name: 'home',
                },
                {
                    name: 'alipay',
                },
                {
                    name: 'loading',
                },
                {
                    name: 'wechat',
                },
                {
                    name: 'qq',
                },
                {
                    name: 'appled',
                },
                {
                    name: 'apple',
                },
                {
                    name: 'fish',
                }
            ]
        }
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

<style lang="less">
.icon-box {
    display: grid;
    grid-template-columns: repeat(auto-fit, 150px);
    justify-content: center;

    .icon-detail {
        border: solid 1px green;
        text-align: center;
        padding: 50px;
    }
}
</style>
