<template>
<div class="search-box">
    <input autofocus="autofocus" v-model="searchKey" placeholder="搜索" />
    <div v-if="searchKey&&searchTitles.length" class="result-list">
        <div class="result-item" v-for="(item,index) in searchTitles" @click="searchLink(item.road)" :key="index">
            <span class="title">{{item.title}} </span>
            <span class="to" v-if="item.header">></span>
            <span class="search-header">{{item.header}}</span>
        </div>
    </div>
</div>
</template>

<script>
import $ from 'jquery'

export default {
    data() {
        return {
            navLinkList: [],
            searchKey: '',
            allHeader: [],
            headerList: [],
            navId: 0
        }
    },
    computed: {
        searchTitles: function () {
            var list = this.headerList.filter((item, index) => {
                if (item.header.toLowerCase().indexOf(this.searchKey.toLowerCase()) != -1 || item.title.toLowerCase().indexOf(this.searchKey.toLowerCase()) != -1) {
                    return item
                }
            })
            var newList = [];
            var len = list.length > 6 ? 6 : list.length;
            for (var i = 0; i < len; i++) {
                newList.push(list[i]);
            }
            return newList;
        }
    },
    methods: {
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
        // 处理header到一个列表里
        resolveHeader(arr) {
            arr.forEach((element) => {
                if (element.headers) {
                    this.headerList.push({
                        road: element.path,
                        header: '',
                        href: element.regularPath,
                        title: element.title == undefined ? '' : element.title
                    })
                    var headers = element.headers;
                    //遍历文章里面的header
                    headers.forEach((head) => {
                        var href = head.slug;
                        var road = element.path + '#' + href;
                        this.headerList.push({
                            road: road,
                            header: head.title,
                            href: href,
                            title: element.title == undefined ? '' : element.title
                        })
                    })
                }
            })
        }
    },
    mounted() {
        if (this.$site.themeConfig.headImg) {
            this.headImg = this.$site.themeConfig.headImg;
        }
        this.resolveHeader(this.$site.pages);
        this.navLinkList = this.$site.themeConfig.nav;
    }
}
</script>

<style lang="stylus" scoped>
.search-box {
    display flex;
    height 2em;
    flex-wrap wrap;
    justify-content center;
    position relative;

    input {
        border-radius 20px;
        padding 5px 10px;
        display block;
        margin 0 auto;
        background url("../public/icon/fish.png") no-repeat;
        background-size 20px 20px;
        background-color white;
        background-position 3px;
        padding-left 30px;
        outline none;
        border 1px solid #f1f2f4;
    }

    .result-list {
        position absolute;
        left  0;
        margin 0 auto;
        margin-top 40px;
        background #ffffff;
        border solid 1px #f1f2f4;
        z-index 9;
        box-shadow:0 2px 7px rgba(0,0,0,.15);

        .result-item {
            border-bottom solid 1px #f1f2f4;
            padding 10px;

            .title {
                font-weight bold;
                max-width 50%
            }
            .to {
                color #3eaf7c;
                margin 0 10px;
            }

            .search-header {
                font-size 0.8em;
            }
        }
    }
}
</style>
