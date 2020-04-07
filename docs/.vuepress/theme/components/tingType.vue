<template>
<div>
    <!-- pc -->
    <div class="nav-box">
        <div class="search-box">
            <input autofocus="autofocus" v-model="searchKey" placeholder="搜索" />
            <div v-if="searchKey" class="result-list">
                <div class="result-item" v-for="(item,index) in searchTitles" @click="searchLink(item.road)" :key="index">
                    <div class="title">《 {{item.title}} 》</div>
                    <div class="search-header">{{item.header}}</div>
                </div>
            </div>
        </div>
        <div class="nav-name">{{$site.title}}</div>
        <div class="link-item" v-for="(item,index) in navLinkList" :key="index">
            <a :href="item.link" v-if="item.type=='url'">
                {{item.text}}
            </a>
            <router-link tag="div" :to="item.link" v-else>{{item.text}}</router-link>
        </div>
    </div>
    <div class="tag-box">
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
                // var str = item.header.toLowerCase()
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
        this.getTag();
    }
}
</script>

<style lang="stylus">
.tag-box {
    padding-top 20px;
    background #ffffff;
    display grid;
    grid-template-columns 1fr 1fr 1fr;

    .tag-item {
        text-align center;
        padding 10px;

        .tag-name {
            font-size 16px;
        }

        .tag-num {
            font-weight bold;
            font-size 30px;
        }

    }
}
.search-box{
    margin 0 atuo;
}
</style>
