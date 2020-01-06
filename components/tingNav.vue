<template>
    <div class="nav-box">
        <div class="nav-name">{{$site.title}}</div>
        <div class="search-box">
            <div class="search-key">
                <img class="img" src="../public/icon/search.png">
                <input autofocus="autofocus" v-model="searchKey" placeholder="搜索"/>
            </div>
            <div v-if="searchKey" class="result-list">
                <div class="result-item" v-for="(item,index) in searchTitles" @click="searchLink(item.road)"
                     :key="index">
                    <div class="title">《 {{item.title}} 》</div>
                    <div class="search-header">{{item.header}}</div>
                </div>
            </div>
        </div>
        <div  class="link-item"  v-for="(item,index) in navLinkList" :key="index">
            <a :href="item.link" v-if="item.type=='url'">
                {{item.text}}
            </a>
            <router-link tag="div" :to="item.link" v-else>{{item.text}}</router-link>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                navLinkList: [],
                searchKey: '',
                allHeader: [],
                headerList: [],
                navId:0
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
            // 跳转页面
            searchLink(link) {
                this.$router.push(link).catch(err => {
                })
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
            this.resolveHeader(this.$site.pages);
            this.navLinkList = this.$site.themeConfig.nav;
        }
    }
</script>
<style lang="stylus">
    .nav-name {
        //文字垂直
        -webkit-writing-mode: vertical-rl;
        writing-mode: vertical-rl;
        padding 0.5em;
        border-left: 5px solid #a8c4d4
        border-right: 5px solid #a8c4d4
        border-bottom 0;
        font-weight bold;
        font-size 1.5em;
        text-align center;
        color #a8c4d4;
    }

    .nav-box {
        z-index 4
        position relative;
        max-width 900px;
        height 196px;
        display: flex;
        justify-content: space-around;
        align-items: flex-end;
        background: url("../public/icon/lo.png") no-repeat, url("../public/icon/nav.png") no-repeat;
        background-size: 40px 40px, 167px 196px;
        background-position left, right;
        border-bottom: 5px solid #a8c4d4
        margin 0 auto;

        &:after {
            content: " ";
            display: block;
            height 20px;
            width 100%
            background: url("../public/icon/line.png");
            background-repeat repeat-x;
            background-size 300px 20px;
            margin 10px;
            position absolute;
            bottom -40px;
        }
    }

    .link-item {

        a {
            text-decoration: none
            out-line: none;
            color black;
        }
        cursor pointer;
        font-size 1em;
        //文字垂直
        text-align center;
        -webkit-writing-mode: vertical-rl;
        writing-mode: vertical-rl;
        padding 0.5em;
        border: 5px solid #a8c4d4
        border-bottom 0;
        vertical-align bottom;
        margin-bottom 0;
        letter-spacing 5px;
        font-weight bold;
        background:#ffffff;
        &:hover {
            background #f5f9fc;
        }
    }

    .search-box {
        height 1em;
        position absolute;
        margin 0 auto;
        top 0;
        display flex;
        flex-direction column;
        align-items center;
        z-index 6;
        input {
            border: 0; // 去除未选中状态边框
            outline: none; // 去除选中状态边框
            font-size 15px;
            background-color transparent;
        }
        input:

        :-webkit-input-placeholder {
            padding-left: 10px;
            opacity: 0.5;
            font-size 12px;
        }
    }

    .search-key {
        height 1em;
        padding: 10px;

        img {
            width 20px;
            height 20px;
            vertical-align middle;
        }
    }

    .result-list {
        background-color white;
        z-index 78;
        width 100%;
        border dotted 1px green;

    }

    .result-item {
        display flex;
        z-index 99
        color green;
        border-bottom dotted 1px green;
        padding 10px;
        background-color white;
        align-items center;
        overflow: hidden; /*超出部分隐藏*/
        text-overflow: ellipsis; /* 超出部分显示省略号 */

        &:hover {
            box-shadow: 0px 0px 10px #ececec;
            border-bottom dotted 1px blue;

            .search-header {
                color #2e5c77;
                white-space nowrap;
                overflow: hidden; /*超出部分隐藏*/
                text-overflow: ellipsis; /* 超出部分显示省略号 */
                font-size 12px;
            }
        }

        .title {
            max-width 150px;
            font-size 15px;
            color #2e5c77;;
            font-weight bold;
            white-space nowrap;
            overflow: hidden; /*超出部分隐藏*/
            text-overflow: ellipsis; /* 超出部分显示省略号 */
        }

        .search-header {
            max-width 200px;
            white-space nowrap;
            overflow: hidden; /*超出部分隐藏*/
            text-overflow: ellipsis; /* 超出部分显示省略号 */
            font-size 12px;
        }
    }
</style>