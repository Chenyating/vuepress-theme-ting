<template>
<div>
    <ting-nav />
    <!-- <if-page class="catalog-page" :every='everyPageNumber' :total='catalogList.length' @change="choosePage" verySimple show-sizer /> -->
    <if-timeAxis :show="nowTag==item.date?true:false" @click="changeType(item.date)" v-for="(item,index) in tags" :key="index" :title="item.date+'('+item.count+')'">
        <if-timeAxis-item @click="goArticle(item.path)" v-if="item&&item.frontmatter.layout!='catalog'" v-for="(item,index) in list" :key="index" :time="new Date(item.lastUpdated).toLocaleString()">
            <div class="info-box">
                <div v-if="item.frontmatter.img" class="img-box">
                    <img class="catalog-img" :src="item.frontmatter.img" />
                </div>
                <div>
                    <div>
                        《 {{item.title?item.title:'未命名' }} 》
                    </div>
                    <div>
                        可能有介绍的话之类的；
                    </div>
                </div>
            </div>
        </if-timeAxis-item>
    </if-timeAxis>

</div>
</template>

<script>
import tingNav from "../components/ting-nav.vue";
export default {
    components: {
        tingNav,
    },
    name: 'catalog',
    data() {
        return {
            catalogList: [],
            pageId: 1,
            pageNum: null, //分页
            list: [],
            nowList: [],
            everyPageNumber: 30, //每页多少个
            tagList: [],
            tags: [],
            nowTag: 'Blogs',
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
            if (this.list[0].lastUpdated) {
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
        this.everyPageNumber = 30;
        this.nowTag = this.$route.query.type ? this.$route.query.type : 'all';
        this.init(this.nowTag);
        this.choosePage(0);
        this.getTag();
    }
}
</script>

<style lang="stylus" scoped>
.info-box {
    display flex;
    flex-wrap wrap;

    .img-box {
        text-align center;
        width 100px;

        .catalog-img {
            object-fit fill;
            width 100%;
            height auto;

        }
    }
}
</style>
