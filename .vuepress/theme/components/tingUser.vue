<template>
<div class="user-box">
    <div class="img-box">
        <div>————</div>
        <img class="header-img" :src='headImg' />
        <div>————</div>
    </div>
    <div class="des">{{$site.description}}</div>
    <div class="tag-box">
        <div @click="goCatalog(item.date)" class="tag" v-for="(item,index) in tags" :key="index">
            <div>{{item.date}}
            </div>
            <div>{{item.count}}</div>
        </div>
    </div>
</div>
</template>

<script>
import $ from 'jquery'

export default {
    data() {
        return {
            headImg: "https://yating.online/res/img/yating.jpg",
            tagList: [],
            tags: null,
        }
    },
    methods: {
        goCatalog(tagType) {
            this.$router.push(`/config/catalog`);
        },
        getTag() {
            var list = this.$site.pages;
            list.forEach(element => {
                var str = element.regularPath;
                var taglist = str.split('/').reverse();
                var l = decodeURIComponent(taglist[1]);
                if (l != '') {
                    this.tagList.push(l);
                }
            })
            // this.tagList = new Set(this.tagList);

            var arr = [];
            this.tagList.sort()
            for (var i = 0; i < this.tagList.length;) {
                var count = 0;
                for (var j = i; j < this.tagList.length; j++) {
                    if (this.tagList[i] === this.tagList[j]) {
                        count++;
                    }
                }
                arr.push({
                    date: this.tagList[i],
                    count: count
                })
                i += count;
            }
            this.tags = arr;

        },
        ajaxFun() {
            $.ajax({
                    url: 'http://localhost:3000/github?num=12&page=1', //跨域请求的地址，也可用相对路径js/data.js
                    type: 'get',
                    dataType: 'jsonp', //使用jsonp跨域请求
                    jsonpCallback: 'callbackFunction'
                })
                .done((data) => {
                    this.list = data;
                    console.log(data)
                })
                .fail(function () {
                    console.log("error");
                });
        }
    },
    mounted() {
        if (this.$site.themeConfig.headImg) {
            this.headImg = this.$site.themeConfig.headImg;
        }
        this.getTag();
    }
}
</script>

<style lang="stylus">
.tag-box {
    max-width 1024px;
    margin 0 auto;
    display flex;
    flex-wrap wrap;
    text-align center;
    font-weight bold;
    text-shadow 2px 2px 5px black;

    .tag {
        flex-grow 1;
        padding 20px;
        margin 10px;
        background #c3dae4;
        color white;
        transition: all 1s;
        position relative;
        cursor pointer;

        &:after {
            content: " ";
            width: 15px;
            height 20px;
            background: url("../public/icon/flower-r.png") no-repeat;
            background-size: 100% 100%;
            position absolute;
            left 0;
            top 0;
        }

        &:before {
            content: " ";
            width: 15px;
            height 20px;
            background: url("../public/icon/flower-l.png") no-repeat;
            background-size: 100% 100%;
            position absolute;
            right 0;
            bottom 0;
        }

        &:hover {
            box-shadow: 0px 0px 10px #ececec;
            animation tagChange 1s alternate;
            color black;
            background #f5f9fc;
            text-shadow 2px 2px 5px white;
        }

        &:nth-child(2n) {
            background #c4deaa;
            animation: moveing 15s infinite;
        }

        &:nth-child(3n) {
            background #fda6bc;
            animation: moveing 15s infinite alternate;
        }
    }
}

.my-content {
    width 96%;
    padding 1%;
    margin 1%;
    height 100px;
    background red;
    background #d6eef9;
    color white;
    margin-bottom 5px;
    margin-right 20px;

    &:nth-child(2n) {
        background #c9e5ac;
    }

    &:nth-child(3n) {
        background #f3cbd5;
    }
}

.user-box {
    max-width 1024px;
    margin 0 auto;
    background: rgba(255, 255, 255, 0.95);
}

.des {
    text-align center;
    margin-bottom 20px;
}

.img-box {
    display: flex;
    justify-content: center;
    align-items center;
    padding 30px;
    color green;

    .header-img {
        width: 5em;
        height: 5em;
        border-radius: 40px;
        border: dotted 1px green;
    }
}
</style>
