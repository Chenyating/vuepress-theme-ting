<template>
<div>
    <div class="title-box">
        <div @click="changePageId()" class="change">换一批</div>
        <div @click="goMyweb('https://www.yating.online')" class="feel-title">心情</div>
    </div>
    <!-- 说说-->
    <div class="shuoshuo-box">
        <div class="shuo-box" v-for=" (item,index) in sList" :key="index">
            <div>
                <img class="headImg" :src="item.headImg" />
                <div class="user-name">{{item.user}}</div>
            </div>
            <div class="sContent-box">
                <div class="sContent">
                    {{item.content}}
                </div>
                <div class="time">
                    
                    
                </div>
            </div>
        </div>
    </div>
    <div class="title-box">
        <div @click="goMyweb('https://www.yating.online/message')" class="title">留言</div>
        <div @click="changeMessage()" class="change">换一批</div>
    </div>
    <!-- 说说-->
    <div class="shuoshuo-box">
        <div class="shuo-box" v-for=" (item,index) in messageList" :key="index">
            <div class="sContent-box">
                <div class="message-name">{{item.name}}</div>
                <div class="sContent">
                    {{item.content}}
                </div>
                <div class="time">
                    {{item.createTime}}
                </div>
                <div class="sContent">
                    楼主回复：{{item.returnContent}}
                </div>
                <div class="time">
                    {{item.createTime}}
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import $ from 'jQuery';
import tingContent from "../components/tingContent.vue";

export default {
    components: {
        tingContent,
    },
    name: 'config',
    data() {
        return {
            pageId: 1,
            messageId: 0,
            sList: [],
            messageList: [],
            webUrl: 'https://www.yating.online/api/github'
        }
    },
    methods: {
        changePageId() {
            this.getJson(`${this.webUrl}?num=5&page=${this.pageId}`, 'shuoshuo').then(data => {
                this.sList = data;
                if (data.length < 5) {
                    this.pageId = 0;
                }
            })
            this.pageId++;
        },
        goMyweb(link) {
            // window.location.href = link;
        },
        changeMessage() {
            this.getJson(`${this.webUrl}/messageList?num=10&page=${this.messageId}`, 'message').then(data => {
                this.messageList = data;
                if (data.length < 10) {
                    this.messageId = 0;
                }
            })
            this.messageId++;
        },
        getJson(url, callbackFun) {
            return new Promise((resolve, reject) => {
                $.ajax({
                        url: url,
                        type: 'get',
                        dataType: 'jsonp', //使用jsonp跨域请求
                        jsonpCallback: callbackFun
                    })
                    .done(function (data) {
                        resolve(data)
                    })
                    .fail(function () {
                        reject()
                    });
            })
        }
    },
    mounted() {
        this.changePageId();
        this.changeMessage();
    }
}
</script>

<style lang="stylus" scoped>
.message-name {
    font-size 0.8em;
    font-weight bold;
    color green;
}

.title-box {
    padding 30px;
    padding-bottom 0px;
    display flex;
    justify-content space-between;
    align-items: flex-end;

    .feel-title {
        font-size 2em;
        color #7aaac6;
        text-align center;
        cursor pointer;
    }

    .change {
        color #7aaac6;
        font-size 0.8em;
        display flex;
        cursor pointer;

        &:before {
            content: " ";
            width: 20px;
            height 20px;
            background: url("../public/icon/refresh.png") no-repeat;
            background-size: 100% 100%;
            margin-right 10px;
        }
    }
}

.shuoshuo-box {
    display flex;
    flex-wrap wrap;
}

.shuo-box {
    animation moveing infinite 15s;
    box-shadow: 0px 0px 10px #ececec;
    flex-grow 1;
    background: rgba(255, 255, 255, 0.95);
    margin 10px;
    padding 10px;
    display flex;
    border-radius 10px;
    align-items center;

    &:hover {
        background #f5f9fc
    }

    &:nth-child(2n) {
        animation moveing infinite 10s alternate;
    }

    .sContent-box {
        padding-left 10px;

        .time {
            max-height 100px;
            vertical-align bottom;
            /*color #a8c4d4;*/
            color green;
            display flex;
            font-size 12px;
            overflow: hidden;
            /*超出部分隐藏*/
            text-overflow: ellipsis;
            /* 超出部分显示省略号 */
        }

        .sContent {
            font-size 0.8em;
            margin 10px 0;
        }

    }
}

.headImg {
    width 50px;
    height 50px;
    border-radius 50px;
    border 1px dotted green;
}

.user-name {
    font-size 0.6em;
    text-align center;
    color green;
}
</style>
