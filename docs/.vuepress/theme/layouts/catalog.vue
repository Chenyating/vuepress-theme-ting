<template>
<div class="catalog-box">
    <tingNav class="catalog-nav">
    <div  slot="expand"  class="type-box">
        <div class="page-item" @click="ifshowCatalog">类别</div>
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
    </tingNav>
    <div class="catalog-big">
        <div class="catalog-box">
            <div v-if="item&&item.frontmatter.layout!='catalog'" class="catalog-item-big" @click="goArticle(item.path)" v-for="(item,index) in list" :key="index">
                <div class="catalog-item">
                    <!-- 更新时间 -->
                    <img v-if="item.frontmatter.img" class="catalog-icon" :src="item.frontmatter.img" />
                    <div v-else class="article-time">
                        {{item.tag=='undefined'?'导航':item.tag}}
                    </div>
                    <!-- 标题 -->
                    <div class="title-box">
                        <div class="title">{{item.title?item.title:'未命名'}}</div>
                        <div class="tag"> {{item.lastUpdated?item.lastUpdated:item.title}}</div>
                    </div>
                    <div v-if="item.frontmatter.img" class="article-time">
                        {{item.tag=='undefined'?'导航':item.tag}}
                    </div>
                </div>
            </div>
        </div>
        <div class="page">
            <div @click="choosePage(item-1)" class="page-item" :class="{'page-select':pageId==item-1}" v-for="item in pageNum">{{item}}
            </div>
        </div>
    </div>
</div>
</template>

<script>
import tingType from "../components/tingType.vue";
import tingNav from "../components/tingNav.vue";
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
.catalog-nav{
    width 100%;
}
.type-box {
    position absolute;
    max-width 500px;
    z-index 9;
    .my-tag {
        background #fff;
        box-shadow: 0 2px 7px rgba(0, 0, 0, .15);

        .tag-box {
            display grid;
            grid-template-columns 1fr 1fr 1fr;
            background: url("../public/icon/lo.png") no-repeat, url("../public/icon/nav.png") no-repeat;
            background-size: 40px 40px, 167px 196px;
            background-position left,
            right bottom;

            .tag-item {
                text-align center;
                padding 10px;
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
    width 100%;
    align-items flex-start;
    justify-content space-between;
    max-width 900px;
}

.page {
    position fixed;
    right 0;
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
    max-height 100px;
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
    display block;
    width inherit;
    font-size 25px;
    letter-spacing 3px;
    color #2e5c77 margin-left 10px;
    overflow: hidden;
    /*超出部分隐藏*/
    text-overflow: ellipsis;
    /* 超出部分显示省略号 */
}

.text {
    height 50px;
    color #2c3e50 font-size 12px;
    overflow: hidden;
    /*超出部分隐藏*/
    text-overflow: ellipsis;
    /* 超出部分显示省略号 */
}

.catalog-item-big {
    height: auto;
    margin: 2%;
    box-shadow: 0px 0px 5px #ececec;
    padding: 2%;
    background white;
    flex-grow 1;
    cursor pointer;
    display: flex;

    &:nth-child(2n) {
        animation moveing infinite 15s alternate;
    }

    &:hover {
        background #f5f9fc;
    }
}

.catalog-item {
    background: url("../public/icon/li.png") no-repeat;
    background-size: 50px 50px;
    background-position right top;
    display flex;
    align-items stretch;
    width 100%;
}

.catalog-box {
    display flex;
    flex-wrap wrap;
    flex-grow 1;
    max-width: 900px;
    margin: 0 auto;
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
