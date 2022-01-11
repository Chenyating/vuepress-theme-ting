<template>
    <div class="content-box">
        <div class="catalog ">
            <!-- 标题-->
            <div v-if="preTitle.title" @click="goArticle(preTitle)" class="levelTitle">上一篇:《{{preTitle.title}}》</div>
            <div class="level1">{{nowTitle}}</div>
            <a :class="[item.level==2?'level2':'level3',{'select':item.slug==selectTitle}]"
               v-for="(item,index) in $page.headers" :key="index" :href="'#'+item.slug" nofollow>{{item.title}}</a>
            <div v-if="nextTitle.title" @click="goArticle(nextTitle)" class="levelTitle">下一篇：《{{nextTitle.title}}》</div>
        </div>
    </div>
</template>

<script>
    import $ from 'jquery'
    export default {
        data() {
            return {
                positionList: [],//锚点
                selectTitle: '',
                showTop: false,
                nowPosition:0,
                preTitle:{},
                nextTitle:{},
                nowTitle:null,
                titleIndex:0,
            }
        },
        watch:{
            nowPosition(val){
                this.showTop = val >= 200 ? true : false;
            },
            titleIndex(val){
                this.init();
            }
        },
        computed:{
            showCatalog(){
                if(this.$page.path=='/'){
                    return false
                }else{
                    return true
                }
            }
        },
        methods: {
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
                window.onscroll = () => {
                    var position = document.scrollingElement.scrollTop ;
                    this.nowPosition=position;
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
                }
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
                this.preTitle={};
                this.nextTitle={};
                if(pages.length==1){
                    return;
                }else{
                    for (let i = 0; i < pages.length; i++) {
                        if(this.nowTitle==pages[i].title){
                            this.titleIndex=i;
                            break;
                        }
                    }
                    if(this.titleIndex==0){
                        this.nextTitle=pages[this.titleIndex+1];
                        this.nextTitle.index=this.titleIndex+1;
                    }else if(this.titleIndex==pages.length-1){
                        this.preTitle=pages[this.titleIndex-1];
                        this.preTitle.index=this.titleIndex-1;
                    }else{
                        this.nextTitle=pages[this.titleIndex+1];
                        this.preTitle=pages[this.titleIndex-1];
                        this.nextTitle.index=this.titleIndex+1;
                        this.preTitle.index=this.titleIndex-1;
                        }
                }
            },
              goArticle(item) {
                this.titleIndex=item.index;
                 this.nowTitle=item.title;
                this.$router.push(item.path);
            },
        },
        mounted() {
            this.clickTitle();
            this.scrollTitle();
            this.styleOperation();
            this.nowTitle=this.$page.title;
            this.init();
        }
    }
</script>

<style lang="stylus" scoped>
    // catalog
    .catalog {
        a{
            color rgba(0,0,0,.75);
            margin 10px 0;
        }
        position fixed;
        margin auto;
        top 5em;
        transform translateX(900px);
        width 200px;
        height 70%;
        overflow-y auto
        color #b6c3d0;
        padding-left 20px;
    }
    .catalog::-webkit-scrollbar {
        display: none;
    }
    .level1 {
        font-size 1.5em
        padding-left 0.5em
    }
    .level2 {
        font-size 1em
        padding-left 1.5em;
    }
    .level3 {
        font-size 0.8em
        line-height 2em
        padding-left 3em
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