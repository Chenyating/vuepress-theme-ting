<template>
<div id="landlord">
    <div class="chat-box">
        <div v-for="(item,index) in chatList" :key="index">
            <div class="me">我：{{item.me}}</div><br />
            <div class="robot">机器人：{{item.you}}</div>
        </div>
    </div>
    <audio id="mp3" controls="controls" controlsList="nodownload" hidden>
        <source type="audio/mp3"></audio>
    <robot class="robot" @getResult='reciveResult($event)' />
    <!-- <div class="message" id="live2deMessage" style="opacity:1">hello~</div> -->
    <canvas id="live2d" width="280" height="250" class="live2d"></canvas>
</div>
</template>

<script>
import $ from 'jQuery';
import robot from "../components/ting-robot.vue";
export default {
    components: {
        robot
    },
    data() {
        return {
            url: null,
            chatList: []
        }
    },
    methods: {
        reciveResult(txt) {
            this.chatList.push(txt);
            var audio = document.getElementById('mp3');
            audio.setAttribute("src", 'http://yating.online/mm/speech?text=' + txt.you);
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
            console.log(this.ifShow)
        }
    },
    mounted() {
        this.url = this.$site.themeConfig.live2dModel
        // console.log(this.url, "???????")
        // if (this.url != undefined) {
        //     // this.loadJs("https://www.yating.online/res/js/message.js")
        //     this.loadJs("https://www.yating.online/res/js/live2d.js")
        //     window.onload = () => {
        //         loadlive2d("live2d", this.url);
        //     }
        // } else {
            this.loadJs("https://www.yating.online/res/js/live2d.js")
            // this.loadJs("/live2d/live2d.js")
            window.onload = () => {
                let r = Math.floor(Math.random() * 88);
                loadlive2d("live2d", "https://cdn.jsdelivr.net/gh/mumudadi/live2dw@latest/assets/live2d-widget-model-Pio/assets/" + r + ".json");
            };
        // }
    }

};
</script>

<style lang="stylus" scoped>
@import url("../public/css/live2d.css");

.live-2d-box {
    position: fixed;
    z-index: 9999;
}

.chat-box {
    position relative;
    font-size 13px;
    line-height 20px;

    .me {
        color #949593;
        background #0000000d;
        padding 10px;
        border-radius 10px;
        display inline-block;
    }

    .robot {
        display inline-block;
        margin 10px 0;
        border-radius 10px;
        padding 10px;
        background #0000000d;
        color black;
    }
}

.robot {
    z-index: 99;
    margin: 0 auto;
}
</style>
