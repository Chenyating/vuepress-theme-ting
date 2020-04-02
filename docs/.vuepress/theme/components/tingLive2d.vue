<template>
<div v-if="url" id="landlord">
    <div class="hide-button" @click="show">{{ifShow?"隐藏":"显示"}}</div>
    <div v-show="ifShow">
        <div class="message" id="live2deMessage" style="opacity:1">hello~</div>
        <canvas id="live2d" width="280" height="250" class="live2d"></canvas>
    </div>
</div>
</template>

<script>
export default {
    data() {
        return {
            url: null,
            ifShow: true
        }
    },
    methods: {
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
        if (this.url) {
            this.loadJs("https://www.yating.online/res/js/message.js")
            this.loadJs("https://www.yating.online/res/js/live2d.js")
            window.onload = () => {
                loadlive2d("live2d", this.url);
            };
        }
    }
};
</script>

<style scoped>
@import url("../public/css/live2d.css");
</style>
