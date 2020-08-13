<template>
<div class="content-box" >
    <div tabindex="0" style="outline:0" @blur="ifshowCatalog=false">
        <tingNav @click-menu="ClickshowCatalog" />
        <div :class="className" class="m-box m-catalog-sider">
            <!-- 标题-->
            <div v-if="preTitle.title" @click="goArticle(preTitle)" class="levelTitle">上一篇:《{{preTitle.title}}》</div>
            <div class="level1">{{$page.title}}</div>
            <a :class="[item.level==2?'level2':'level3',{'select':item.slug==selectTitle}]" v-for="(item,index) in $page.headers" :key="index" :href="'#'+item.slug" nofollow>{{item.title}}</a>
            <div v-if="nextTitle.title" @click="goArticle(nextTitle)" class="levelTitle">下一篇：《{{nextTitle.title}}》</div>
        </div>
    </div>
    <div class="pc-box pc-catalog-sider">
        <!-- 标题-->
        <div v-if="preTitle.title" @click="goArticle(preTitle)" class="levelTitle">上一篇:《{{preTitle.title}}》</div>
        <div class="level1">{{$page.title}}</div>
        <a :class="[item.level==2?'level2':'level3',{'select':item.slug==selectTitle}]" v-for="(item,index) in $page.headers" :key="index" :href="'#'+item.slug" nofollow>{{item.title}}</a>
        <div v-if="nextTitle.title" @click="goArticle(nextTitle)" class="levelTitle">下一篇：《{{nextTitle.title}}》</div>
    </div>
    <div class="content-all">
        <div class="title">
            {{$page.title}}
        </div>
        <div class="article-time">
            {{$page.lastUpdated}}
        </div>
        <if-divider dashed />
        <!--内容-->
        <div class="content">
            <Content />
        </div>
        <div v-if="showCatalog&&preTitle.title" @click="goArticle(preTitle)" class="phone-pre">上一篇：《{{preTitle.title}}》</div>
        <div v-if="showCatalog&&nextTitle.title" @click="goArticle(nextTitle)" class="phone-next">下一篇：《{{nextTitle.title}}》</div>
        <tingGitalk />
    </div>
</div>
</template>

<script>
import tingGitalk from "../components/ting-gitalk.vue";
import tingNav from "../components/ting-nav.vue";

import $ from 'jquery'
export default {
    components: {
        tingGitalk,
        tingNav
    },
    data() {
        return {
            positionList: [], //锚点
            selectTitle: '',
            showTop: false,
            ifshowCatalog: false,
            nowPosition: 0,
            preTitle: {},
            nextTitle: {},
            titleIndex: 0,
        }
    },
    watch: {
        nowPosition(val) {
            this.showTop = val >= 200 ? true : false;
        },
        titleIndex(val) {
            this.init();
        }
    },
    computed: {
        showCatalog() {
            if (this.$page.path == '/') {
                return false
            } else {
                return true
            }
        },
        className() {
            return [{
                [`slider-box-show`]: this.ifshowCatalog,
                [`slider-box`]: !this.ifshowCatalog,
            }]
        }
    },
    methods: {
        ClickshowCatalog() {
            this.ifshowCatalog = !this.ifshowCatalog;
        },
        // 点击a以后获得改变的hash路由
        clickTitle() {
            window.onhashchange = (e) => {
                this.selectTitle = decodeURIComponent(location.hash).replace('#', '');
            };
        },
        // 路由随鼠标滚动而改变，对应标题列表改变样式
        scrollTitle() {
            var list = $('.header-anchor');
            this.positionList = this.positionList.concat(list);
            this.$refs.content.addEventListener('scroll', () => {
                var position = document.scrollingElement.scrollTop;
                this.nowPosition = position;
                var small = 100;
                var titleId;
                // 滚动，url变化
                for (var i = 0; i < this.positionList[0].length; i++) {
                    var now = this.positionList[0][i].offsetTop;
                    if (Math.abs(now - position) < small) {
                        titleId = i;
                        small = Math.abs(now - position)
                    }
                }
                if (titleId >= 0) {
                    this.selectTitle = decodeURIComponent(this.positionList[0][titleId].hash).replace('#', '');
                    window.history.replaceState({}, " ", this.positionList[0][titleId]);
                }
            })
        },
        styleOperation() {
            var allTitle = document.getElementsByClassName('header-anchor')
            for (var i = 0; i < allTitle.length; i++) {
                allTitle[i].innerHTML = ' '
            }
        },
        backTop() {
            document.scrollingElement.scrollTop = 0;
        },
        init() {
            //获得所有文章
            var pages = this.$site.pages;
            this.preTitle = {};
            this.nextTitle = {};
            if (pages.length == 1) {
                return;
            } else {
                for (let i = 0; i < pages.length; i++) {
                    if (this.$page.title == pages[i].title) {
                        this.titleIndex = i;
                        break;
                    }
                }
                if (this.titleIndex == 0) {
                    this.nextTitle = pages[this.titleIndex + 1];
                    this.nextTitle.index = this.titleIndex + 1;
                } else if (this.titleIndex == pages.length - 1) {
                    this.preTitle = pages[this.titleIndex - 1];
                    this.preTitle.index = this.titleIndex - 1;
                } else {
                    this.nextTitle = pages[this.titleIndex + 1];
                    this.preTitle = pages[this.titleIndex - 1];
                    this.nextTitle.index = this.titleIndex + 1;
                    this.preTitle.index = this.titleIndex - 1;
                }
            }
        },
        goArticle(item) {
            this.titleIndex = item.index;
            this.$router.push(item.path);
        },
    },
    mounted() {
        this.clickTitle();
        this.scrollTitle();
        this.styleOperation();
        this.init();
    }
}
</script>

<style lang="stylus">
.content-box {
    overflow scroll;
}

.arcticle-catalog {
    float: right;
    position: -webkit-sticky;
    position: sticky;
    margin: auto;
    top: 0;
    transform: translateX(100%);
    width: 200px;
    height: 70%;
    overflow-y: auto color #b6c3d0;
    padding-left: 20px;
}

//conten
.content-all {
    width 100%;
    box-sizing border-box;
    font-size 15px;
    background white;
    box-shadow 0 1px 1px 0 rgba(0, 0, 0, .1);
    padding 1em;
    padding-top 100px;

    .title {
        text-align center;
        width: 100%;
        font-size: 40px;
        letter-spacing 3px;
        color #2e5c77 margin-left 10px;
        overflow: hidden;
        /*超出部分隐藏*/
        text-overflow: ellipsis;
        /* 超出部分显示省略号 */
    }

    .article-time {
        width: 100%;
        color: green;
        font-size: 1em;
        display: flex;
        justify-content flex-end;

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

    .content {
        padding 1em;
        width 100%;
        padding 0 1em;
        box-sizing border-box;

        .catalog-item-big {
            padding-top 50px;
        }

        //code
        li {
            img {
                width 100%;
                padding 0 5px;
                margin 0 auto;
            }
        }

        hr {
            border 0;

            &:after {
                content: " ";
                display: block;
                height 20px;
                width 100%;
                background: url("../public/icon/line.png");
                background-repeat repeat-x;
                background-size 300px 20px;
                margin 10px;
            }
        }

        .extra-class {
            margin 10px 0;
        }

        div[class*="language-"] {
            font-size 14px;
        }

        h2,
        h3,
        h4 {
            font-weight: normal;
            display flex;
            color: #7aaac6;
            border-bottom: 0px solid #eaecef;
            padding-top 30px;
            cursor pointer;

            &:before {
                content: " ";
                display: block;
                width: 20px;
                height 20px;
                background: url("../public/icon/flower.gif") no-repeat;
                background-size: 100% 100%;
                margin-right 20px;
                margin-top 5px;
            }

            &:hover {
                color #2e5c77;
                text-shadow: 2px 2px 10px #7aaac6;
            }
        }

        h1 {
            display none;
        }

        img {
            width: 100%;
        }
    }

    .phone-pre {
        color #88c1ea;
        padding 2px 10px;
    }

    .phone-next {
        color #88c1ea;
        padding 2px 10px;
    }
}

.level1 {
    font-size 1.5em;
    padding-left 0.5em
}

.level2 {
    font-size 1em;
    padding-left 1.5em;
}

.level3 {
    font-size 0.8em;
    line-height 2em;
    padding-left 3em
}

//m-box catalog 
.m-catalog-sider {
    a {
        color rgba(0, 0, 0, .75);
        margin 10px 0;
    }

    z-index 98;
    background white;
    position absolute;
    height 100%;
    margin auto;
    overflow-y scroll;
    color #b6c3d0;
    padding: 20px;
    padding-top 60px;
    top 0px;
    box-sizing: border-box;
    border solid 1px #f1f2f4;
}

//pc-box catalog 
.pc-catalog-sider {
    a {
        color rgba(0, 0, 0, .75);
        margin 10px 0;
    }

    position fixed;
    margin auto;
    top 5em;
    transform translateX(1024px);
    width 200px;
    height 70%;
    overflow-y auto color #b6c3d0;
    padding-left 20px;
}

//over
.over {
    width: 40px;
    height: 40px;
    border: 1px solid rgb(0, 0, 1);
    border-radius: 50%;
    margin-left: auto;
    margin-right: auto;
    text-align: center;
    line-height: 40px;
    margin-top 20px;
    margin-bottom: 5px;
}

.block {
    width: 10px;
    height: 10px;
    margin-top: -12px;
    background-color: rgb(255, 255, 255);
    left: 0;
}

.select {
    color: #2b89d4 !important;

    &:before {
        content: " ";
        display: block;
        width: 26px;
        height 26px;
        background: url("../public/icon/flower.gif") no-repeat;
        background-size: 100% 100%;
        position absolute;
        left 0px;
    }
}

.level1 {
    color: #88c1ea;
    font-weight bold;
}

.levelTitle {
    color: #2c3e50;
    line-height 2em;
    cursor pointer;

    &:hover {
        color: #88c1ea
    }
}

a {
    display: block;
    color: #2c3e50;
}

a:hover {
    color: #88c1ea
}
</style>
