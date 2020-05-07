<template>
<div>
    <ting-nav/>
    <div class="catalog-big">
        <div class="catalog-list">
            <div v-if="item&&item.frontmatter.layout!='catalog'" class="catalog-item-big" @click="goArticle(item.path)" v-for="(item,index) in list" :key="index">
                <div class="catalog-item">
                    <!-- 更新时间 -->
                    <img v-if="item.frontmatter.img" class="catalog-icon" :src="item.frontmatter.img" />
                    <div class="catalog-info">
                        <!-- 标题 -->
                        <span class="tag">{{item.tag=='undefined'?'导航':item.tag}}</span>
                        <span class="title">{{item.title?item.title:'未命名'}}</span>
                        <div class="time" v-if="item.lastUpdated"> {{new Date(item.lastUpdated).toLocaleString()}}</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="page">
            <div class="type-box">
                <div class="my-tag" v-if="showCatalog">
                    <div class="tag-box">
                        <div class="tag-item" @click="changeType('all')">
                            <div class="tag-name">全部</div>
                            <div class="tag-num">{{tagList.length}}</div>
                        </div>
                        <div class="tag-item" @click="changeType(item.date)" v-for="(item,index) in tags" :key="index">
                            <div class="tag-name">{{item.date}}</div>
                            <div class="tag-num">{{item.count}}</div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="page-item" @click="ifshowCatalog">类别</div>
            <div @click="choosePage(item-1)" class="page-item" :class="{'page-select':pageId==item-1}" v-for="item in pageNum">{{item}}
            </div>
        </div>
    </div>
</div>
</template>

<script>
import tingType from "../components/ting-type.vue";
import tingNav from "../components/ting-nav.vue";
export default {
    components: {
        tingNav,
        tingType
    },
    name: 'catalog',
    data() {
        return {
            catalogList: [],
            pageId: 1,
            pageNum: null, //分页
            list: [],
            nowList: [],
            everyPageNumber: 10, //每页多少个
            tagList: [],
            tags: [],
            nowTag: 'all',
            showCatalog: false,
        }
    },
    methods: {
        ifshowCatalog() {
            this.showCatalog = !this.showCatalog;
        },
        changeType(val) {
            this.nowTag = val;
            this.init(val);
            this.choosePage(0);
            this.showCatalog = false;
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
            if(this.list[0].lastUpdated){
                this.list.sort((function (a, b) {
                    var x = new Date(a['lastUpdated']).valueOf();
                    var y = new Date(b['lastUpdated']).valueOf();
                    return x > y ? -1 : x < y ? 1 : 0;
                }))
            }
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
        init(tagType) {
            //获得所有文章
            var length = 0; //记录长度
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
        this.everyPageNumber = this.$site.themeConfig.pageNum ? this.$site.themeConfig.pageNum : 10;
        this.nowTag = this.$route.query.type ? this.$route.query.type : 'all';
        this.init(this.nowTag);
        this.choosePage(0);
        this.getTag();
    }
}
</script>

<style lang="stylus" scoped>
.catalog-list {
    background #fff;
    width 100%;

    .catalog-item-big {
        height: auto;
        box-shadow: 0px 0px 5px #ececec;
        border-left 2px solid #c4deaa;
        background white;
        flex-grow 1;
        cursor pointer;
        display: flex;
        // align-items center;
        margin-left 1em;

        .tag {
            padding 4px;
            color green;
            font-size 0.8em;
            color #fff;
            font-weight bold;
            background #c3dae4;
            position relative;
            left -1em;
        }

        &::before {
            content "";
            width 9px;
            height 9px;
            background #c4deaa;
            border-radius 10px;
            transform translateX(-5px) translateY(12px)
        }

        &:nth-child(2n) {
            // animation moveing infinite 15s alternate;
        }

        &:hover {
            background #f5f9fc;
        }
    }

    .catalog-item {
        display flex;
        padding 1em;
        padding-left 0;
        width 100%;
        background: url("../public/icon/li.png") no-repeat;
        background-size: 50px 50px;
        background-position right top;
        justify-content flex-start;

        &::before {
            content "";
            width 50px;
            height 2px;
            background #c4deaa;
            border-radius 10px;
            transform translateX(-5px)
        }
    }
}

.type-box {
    position absolute;
    max-width 500px;
    z-index 9;
    right 35px;

    .my-tag {
        background #fff;
        box-shadow: 0 2px 7px rgba(0, 0, 0, .15);

        .tag-box {
            display grid;
            grid-template-columns 1fr 1fr 1fr 1fr;
            background: url("../public/icon/lo.png") no-repeat, url("../public/icon/nav.png") no-repeat;
            background-size: 40px 40px, 167px 196px;
            background-position left,
            right bottom;

            .tag-item {
                text-align center;
                padding .5em;
                width 4em;
                border: solid 1px #f1f2f450;

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
    }
}

.catalog-icon {
    height 120px;
    border-radius 5px;
    margin-right 1em;
    transform translateX(-10px) translateY(-5px);
    border 2px solid #f1f2f4;
}

.select-box-top {
    display flex;
    flex-wrap wrap;
    align-items center;
    max-width 900px;
    padding-top 20px;
    padding-left 20px;
    padding-bottom 10px;

    .select-type {
        padding 5px 10px;
        color #009688;
        font-weight bold;
        text-shadow 1px 1px 10px #FFEB3B;
        cursor: pointer;
    }

    .type-catalog {
        text-shadow 1px 1px 10px white;
        padding 5px 10px;
        cursor: pointer;
    }
}

.title-box {
    display flex;
    flex-direction column;
    justify-content: center;
}

.page-select {
    font-weight bold;
    height 50px !important;
}

.catalog-big {
    display flex;
    position relative;
    width 100%;
    align-items flex-start;
    justify-content space-between;
    max-width 900px;
}

.page {
    position fixed;
    z-index 9;
    right 0;
    bottom 0;
    padding-top 2%;
    padding-left 5px;
    display flex;
    flex-direction column;
    justify-content flex-end;
    flex-wrap wrap;

    .page-item {
        width 30px;
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
    max-height 120px;
    padding 10px;
    border: 1px solid green;
    border-bottom 0;
    border-top 0;
    vertical-align bottom;
    margin 5px;
    margin-right 0;
    margin-bottom 0;
    letter-spacing 5px;
    /*color #a8c4d4;*/
    color green;
    display flex;
    font-size 12px;
    justify-content center;
    overflow: hidden;
    /*超出部分隐藏*/
    text-overflow: ellipsis;
    /* 超出部分显示省略号 */
}

.title {
    font-weight bold;
    display block;
    width inherit;
    font-size 1em;
    letter-spacing 3px;
    color #2e5c77 margin-left 10px;
    overflow: hidden;
    /*超出部分隐藏*/
    text-overflow: ellipsis;
    display flex;
    margin 1em 0;

    /* 超出部分显示省略号 */
    &:after {
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

.time {
    height 50px;
    color #2c3e50 font-size 12px;
    overflow: hidden;
    font-size 1em;
    /*超出部分隐藏*/
    text-overflow: ellipsis;
    /* 超出部分显示省略号 */
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
