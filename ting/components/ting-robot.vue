<template>
<div class="robot-box">
    <input type="text" placeholder="回车或点击发送和我聊天吧~" v-model="txt" @keyup.enter="chat" />
    <div class="btn" @click="chat">发送</div>
</div>
</template>

<script>
import $ from 'jQuery';
import tingContent from "../components/ting-content.vue";

export default {
    components: {
        tingContent,
    },
    data() {
        return {
            txt: ''
        }
    },
    methods: {
        chat() {
            if(this.txt==''){
                return;
            }
            var that = this;
            $.ajax({
                url: "http://212.64.92.148:9991/dialogue",
                data: {
                    text: that.txt
                },
                success: function (data) {
                    var text={
                        me:that.txt,
                        you:data.text
                    }
                    that.$emit('getResult',text);
                    that.txt='';
                }
            });
        }
    },
    mounted() {}
}
</script>

<style lang="stylus" scoped>
.robot-box {
    position fixed;
    z-index 99;
    display flex;
    align-content center;
    justify-content center;

    input {
        border-radius 5px;
        margin-right 2px;
        padding 5px 10px;
        outline none;
        border 1px solid #c4deaa;
        font-size 13px;
    }

    .btn {
        font-size: 13px;
        color: #2c3e50;
        line-height: 40px;
        border: solid 1px #c4deaa;
        display: inline-block;
        text-align: center;
        padding: 0 10px;
        border-radius: 4px;
        cursor: pointer;
        border: solid 1px #ffffff;
        background: #c4deaa;
        color: #ffffff;
        box-shadow: 0px 0px 5px #c4deaa;
    }
}
</style>
