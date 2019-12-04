<template>
    <div>
        <div class="select-box">
            <div class="select-tip">类别:</div>
                <div :class="nowTag=='all'?'select-type':'type-catalog'" @click="changeType('all')" >全部</div>
                <div :class="nowTag==item?'select-type':'type-catalog'"  @click="changeType(item)"  v-for="item in tagList" :key="item">{{item}}</div>
        </div>
        <div class="catalog-big">
            <div class="page-box">
                <div @click="choosePage(item-1)" class="page-item" :class="{'page-select':pageId==item-1}"
                     v-for="item in pageNum">{{item}}
                </div>
            </div>
            <div class="catalog-box">
                <div class="catalog-item-big" @click="goArticle(item.path)" v-if="item"
                     v-for="(item,index) in list"
                     :key="index">
                    <div class="catalog-item">
                        <!-- 更新时间 -->
                        <div class="article-time">
                            {{item.tag }}
                        </div>
                        <!-- 标题 -->
                        <div>
                            <div class="title">{{item.title?item.title:'未命名'}}</div>
                            <div class="tag"> {{item.lastUpdated?item.lastUpdated:item.title}}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'catalog',
        data() {
            return {
                catalogList: [],
                pageId: 1,
                pageNum: null,//分页
                list: [],
                nowList: [],
                everyPageNumber: null,//每页多少个
                tagList: [],
                nowTag: 'all'
            }
        },
        methods: {
            changeType(val) {
                this.nowTag=val;
                this.init(val);
                this.choosePage(0);
            },
            choosePage(num) {
                this.pageId = num;
                var startIndex = this.pageId * this.everyPageNumber;
                var endIndex = startIndex + this.everyPageNumber - 1;
                this.list = this.catalogList.filter((element, index) => {
                    if (index >= startIndex && index <= endIndex) {
                        return element;
                    }
                })
            },
            goArticle(link) {
                this.$router.push(link)
            },
            getTag() {
                var list = this.$site.pages;
                list.forEach(element => {
                    var str = element.regularPath;
                    var taglist = str.split('/').reverse();
                    var l = decodeURIComponent(taglist[1]);
                    if (l != '' && l != 'config') {
                        this.tagList.push(l);
                    }
                })
                this.tagList = new Set(this.tagList);
            },
            init(tagType) {
                //获得所有文章
                this.everyPageNumber = this.$site.themeConfig.pageNum;
                var length = 0;//记录长度
                var pages = this.$site.pages;
                this.catalogList = pages.filter((element) => {
                    // if (element.title != 'Home') {
                        var taglist = element.relativePath.split('/').reverse();
                        element.tag = decodeURIComponent(taglist[1]);
                        if (tagType == 'all') {
                            length = length + 1;
                            return element;
                        } else {
                            if (tagType == element.tag) {
                                length = length + 1;
                                return element;
                            }
                        }
                    // }
                })
                this.pageNum = Math.ceil(length / this.everyPageNumber);
            }
        },
        mounted() {
            this.nowTag = 'all';
            this.init(this.nowTag);
            this.choosePage(0);
            this.getTag();
        }
    }
</script>
<style lang="stylus" scoped>
    .select-box {
        display flex;
        flex-wrap wrap;
        align-items center;
        max-width 1024px;
        margin 0 auto;
        padding-top 20px;
        padding-left 20px;
        padding-bottom 10px;

        .select-tip {
            margin-right 5px;
            font-size 1em;
            font-weight bold;
            color #6aa57b;
        }
        .select-type{
            padding 5px 10px;
            color #2e5c77;
            text-shadow 1px 1px 10px #2e5c77;
            cursor: pointer;
        }
        .type-catalog{
            text-shadow 1px 1px 10px white;
            padding 5px 10px;
            cursor: pointer;
        }
    }

    .tag {
        width 100%;
        color green;
        margin 10px;
        font-size 0.8em;
        display flex;

        &:before {
            content: " ";
            display: block;
            height 20px;
            width 20px;
            background: url("../public/icon/lo.png");
            background-repeat repeat-x;
            background-size 20px 20px;
            bottom 0px;
            margin-right 5px;
        }
    }

    .page-select {
        font-weight bold;
        height 50px !important;
    }

    .catalog-big {
        display flex;
        align-items flex-start;
        max-width 1024px;
        margin 0 auto;
    }

    .page-box {
        padding-top 4%;
        padding-left 5px;
        display flex;
        flex-direction column;
        justify-content flex-end;
        flex-wrap wrap;
        flex-flow 1

        .page-item {
            width 30px;
            height 30px;
            background #c3dae4;
            text-align center;
            line-height 30px;
            color white;
            margin-bottom 5px;
            transition: all 1s;
            cursor pointer;

            &:hover {
                height 50px;
                animation pageCart 1s;
            }
            &:nth-child(2n) {
                background #c4deaa;
            }

            &:nth-child(3n) {
                background #fda6bc;
            }
        }
    }

    .article-time {
        -webkit-writing-mode: vertical-rl;
        writing-mode: vertical-rl;
        max-height 100px;
        padding 10px;
        border: 1px solid green
        border-bottom 0;
        border-top 0;
        vertical-align bottom;
        margin 5px;
        margin-bottom 0;
        letter-spacing 5px;
        /*color #a8c4d4;*/
        color green;
        display flex;
        font-size 12px;
        justify-content center;
        overflow: hidden; /*超出部分隐藏*/
        text-overflow: ellipsis; /* 超出部分显示省略号 */
    }

    .title {
        display block;
        width inherit;
        font-size 25px;
        letter-spacing 3px;
        color #2e5c77
        margin-left 10px;
        overflow: hidden; /*超出部分隐藏*/
        text-overflow: ellipsis; /* 超出部分显示省略号 */
    }

    .text {
        height 50px;
        color #2c3e50
        font-size 12px;
        overflow: hidden; /*超出部分隐藏*/
        text-overflow: ellipsis; /* 超出部分显示省略号 */
    }

    .catalog-item-big {
        height: auto;
        margin: 2%;
        box-shadow: 0px 0px 10px #ececec;
        padding: 2%;
        background white;
        flex-grow 1;
        cursor pointer;
        &:nth-child(2n) {
            animation moveing infinite 15s alternate;
        }
        &:hover{
            background #f5f9fc;
        }
    }

    .catalog-item {
        background: url("../public/icon/li.png") no-repeat;
        background-size: 50px 50px;
        background-position right top;
        display flex;
        align-items stretch;
    }

    .catalog-box {
        display flex;
        flex-wrap wrap;
        flex-grow 1
        max-width: 1024px;
        margin: 0 auto
    }
    @keyframes pageCart {
        from {
            height 30px;
            transform scaleY(30px)
        }
        to {
            height 50px;
            transform scaleY(50px)
        }
    }

</style>
