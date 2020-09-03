<template>
<div class="catalog-page">
    <tingNav @click-menu="showTag" />
    <div style="padding-top:70px;">
        <div class="tag-list " :class="tagClass">
            <if-tag :fill="nowTag=='all'?false:true" dot color="#24292E" @click="changeType('all')">全部</if-tag>
            <if-tag :fill="nowTag==item?false:true" dot color="#24292E" @click="changeType(item)" v-for="item in tagList" :key="item">{{item}}</if-tag>
        </div>
        <div class="catalog-box">
            <if-card v-show="item" class="catalog-item" @click="goArticle(item.path)" v-for="(item,index) in list" :key="index">
                <div>
                    <div class="title">{{item.title?item.title:'未命名'}}</div>
                    <if-divider dashed />
                    <div class="time"> {{item.lastUpdated?item.lastUpdated:item.title}}</div>
                    <if-tag dot fill>
                        {{item.tag }}
                    </if-tag>
                </div>

                <img v-if="item.frontmatter.img" class="catalog-img" :src="item.frontmatter.img" />
            </if-card>
        </div>
    </div>
    <if-page class="page-box" @change="haha" :every='everyPageNumber' showTotal :total='catalogList.length' />
</div>
</template>

<script>
import tingNav from '../components/ting-nav.vue'

export default {
    name: 'catalog',
    components: {
        tingNav
    },
    data() {
        return {
            catalogList: [],
            pageId: 1,
            pageNum: null, //分页
            list: [],
            nowList: [],
            everyPageNumber: 10, //每页多少个
            tagList: [],
            nowTag: 'all',
            showTagList: false
        }
    },
    computed: {
        tagClass() {
            return [{
                [`slider-box-show`]: this.showTagList,
                [`slider-box`]: !this.showTagList,
            }]
        }
    },
    methods: {
        showTag() {
            this.showTagList = !this.showTagList;
        },
        haha(i) {
            this.choosePage(i - 1)
        },
        changeType(val) {
            this.nowTag = val;
            this.init(val);
            this.choosePage(0);
        },
        choosePage(num) {
            console.log(num)
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
        this.nowTag = 'all';
        this.init(this.nowTag);
        this.choosePage(0);
        this.getTag();
        console.log(this.$page)
    }
}
</script>

<style lang="stylus" scoped>
.catalog-page {

    .tag-list {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        max-width: 1024px;
        margin: 0 auto;
        padding: 10px;

        .if-tag {
            cursor pointer;
            margin 5px;
            border: 1px solid #24292E;
            
        }
    }

    .catalog-box {
        display: flex;
        flex-wrap: wrap;
        flex-grow: 1;
        max-width: 1024px;
        margin: 0 auto;

        .catalog-item {
            flex-grow: 1;
            max-width 100%;
            background: #fff;
            margin: 10px;
            cursor: pointer;
            display: grid;
            grid-gap: 10px;
            grid-template-columns: repeat(auto-fit, minmax(30%, 1fr));

            .title {
                display: block;
                width: inherit;
                font-size: 25px;
                letter-spacing: 3px;
                color: #2e5c77;
                margin-left: 10px;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space nowrap;
            }

            .time {
                width: 100%;
                color: green;
                margin: 10px;
                font-size: .8em;
                display: flex;

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

            .catalog-img {
                width: 100%;
                height: 100%;
                min-height: 100px;
                -o-object-fit: cover;
                object-fit: cover;
            }

        }
    }

    .page-box {
        display flex;
        margin 0 auto;
        justify-content center;
    }
}
</style>
