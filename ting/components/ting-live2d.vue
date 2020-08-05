<template>
<div id="landlord">
    <robot/>
    <audio id="mp3" controls="controls" controlsList="nodownload" hidden>
        <source type="audio/mp3"></audio>
    <canvas id="live2d" width="280" height="250" class="live2d"></canvas>
    <!-- <div class="chat-box">
        <div v-for="(item,index) in chatList" :key="index">
            <div class="me">我：{{item.me}}</div>
            <div class="robot">机器人：{{item.you}}</div>
        </div>
    </div> -->
</div>
</template>

<script>
import $ from 'jQuery';
import robot from "../components/ting-robot.vue";
export default {
    components: {
        robot,
    },
    data() {
        return {
            url: null,
            chatList: [],
            content: ''
        }
    },
    methods: {
        reciveResult(txt) {
            this.content = txt.you;
            this.chatList.push(txt);
            var audio = document.getElementById('mp3');
            audio.setAttribute("src", 'https://yating.online/mm/speech?text=' + txt.you);
            audio.play();
        },
        loadJs(url, callback) {
            var script = document.createElement('script');
            script.type = "text/javascript";
            if (typeof (callback) != "undefined") {
                if (script.readyState) {
                    script.onreadystatechange = function () {
                        if (script.readyState == "loaded" || script.readyState == "complete") {
                            script.onreadystatechange = null;
                            callback();
                        }
                    }
                } else {
                    script.onload = function () {
                        callback();
                    }
                }
            }
            script.src = url;
            document.body.appendChild(script);
        },
        show() {
            this.ifShow = !this.ifShow;
        }
    },
    mounted() {
        this.url = this.$site.themeConfig.live2dModel
        if (this.url != undefined) {
            this.loadJs("https://www.yating.online/res/js/live2d.js")
            window.onload = () => {
                loadlive2d("live2d", this.url);
            }
        }
    }

};
</script>

<style lang="stylus" scoped>
@import url("../public/css/live2d.css");

.chat-box {
    font-size 13px;
    line-height 20px;
    position fixed;
    height 100%;

    .me {
        color #949593;
        background #0000000d;
        padding 10px;
        border-radius 10px;
        display inline-block;
        white-space nowrap;
    }

    .robot {
        display inline-block;
        margin 10px auto;
        white-space nowrap;
        border-radius 10px;
        padding 10px;
        background #0000000d;
        color black;
        position absolute;
        top 50px;
        display flex;
    }
}
</style>
