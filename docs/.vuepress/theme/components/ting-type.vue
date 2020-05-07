<template>
<div class="box">
    <div class="tag-box">
        <div class="tag-item" @click="goCatalog('all')">
            <div class="tag-name">全部</div>
            <div class="tag-num">{{tagList.length}}</div>
        </div>
        <div class="tag-item" @click="goCatalog(item.date)" v-for="(item,index) in tags" :key="index">
            <div class="tag-name">{{item.date}}</div>
            <div class="tag-num">{{item.count}}</div>
        </div>
    </div>
</div>
</template>

<script>
import $ from 'jquery'
export default {
    data() {
        return {
            tagList: [],
            tags: null,
            navLinkList: []
        }
    },
    methods: {
        goCatalog(tagType) {
            this.$router.push(`${this.$site.themeConfig.catalogUrl}.html?type=${tagType}`);
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
        },
        // 跳转页面
        searchLink(link) {
            this.$router.push(link).catch(err => {})
            this.searchKey = null;
        },
    },
    mounted() {
        if (this.$site.themeConfig.headImg) {
            this.headImg = this.$site.themeConfig.headImg;
        }
        this.navLinkList = this.$site.themeConfig.nav;
        this.getTag();
    }
}
</script>

<style lang="stylus" scoped>
.box{
    background #fff;
    padding-top 40px;
    .tag-box {
        padding-top 20px;
        background #ffffff;
        display grid;
        grid-template-columns 1fr 1fr 1fr;
        background: url("../public/icon/lo.png") no-repeat, url("../public/icon/nav.png") no-repeat;
        background-size: 40px 40px, 167px 196px;
        background-position left,right bottom;
        .tag-item {
            text-align center;
            padding 10px;
            &:hover {
                box-shadow: 0 2px 7px rgba(0, 0, 0, .15);
            }
            .tag-name {
                font-size 16px;
            }
            .tag-num {
                font-weight bold;
                font-size 30px;
            }
        }
    }
    .search-box {
        margin 0 atuo;
    }
}
</style>