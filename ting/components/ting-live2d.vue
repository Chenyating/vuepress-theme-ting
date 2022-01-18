<template>
<div id="landlord">
    <canvas id="live2d" width="280" height="250" class="live2d"></canvas>
</div>
</template>

<script>
export default {
    components: {
    },
    data() {
        return {
            url: null,
            chatList: []
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
        if (this.url != undefined) {
            this.loadJs("https://cdn.jsdelivr.net/gh/stevenjoezhang/live2d-widget/autoload.js")
            window.onload = () => {
                loadlive2d("live2d", this.url);
            }
        }
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
