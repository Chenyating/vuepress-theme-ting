<template>
  <div>
    <div
      id="carousel"
      class="carousel"
      @touchstart="touchstart"
      @touchend="touchend"
    >
      <div class="Carousel-bd" v-if="tags.length > 0">
        <div
          v-for="(item, index) in list"
          :key="index"
          class="item"
          :class="item.class"
        >
          <div class="tag-name" @click="goCatalog(item.date)">
            {{ index }}
            {{ item.date }}
          </div>
          <div class="tag-num">{{ item.count }}</div>
        </div>
      </div>
    </div>
    <div class="box">
      <div class="tag-box">
        <div class="tag-item" @click="goCatalog('all')">
          <div class="tag-name">全部</div>
          <div class="tag-num">{{ tagList.length }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from "jquery";
export default {
  data() {
    return {
      tagList: [],
      tags: null,
      navLinkList: [],
      catalogList: [],
      //   轮播效果
      times: null,
      mousept: {
        x1: "",
        x2: "",
      },
      list: [],
    };
  },
  methods: {
    goCatalog(tagType) {
      this.$router.push(
        `${this.$site.themeConfig.catalogUrl}.html?type=${tagType}`
      );
    },
    getTag() {
      var list = this.$site.pages;
      list.forEach((element) => {
        var str = element.regularPath;
        var taglist = str.split("/").reverse();
        var l = decodeURIComponent(taglist[1]);
        if (l != "") {
          this.tagList.push(l);
        }
      });
      var arr = [];
      this.tagList.sort();
      for (var i = 0; i < this.tagList.length; ) {
        var count = 0;
        for (var j = i; j < this.tagList.length; j++) {
          if (this.tagList[i] === this.tagList[j]) {
            count++;
          }
        }
        arr.push({
          date: this.tagList[i],
          count: count,
        });
        i += count;
      }
      this.tags = arr;
      this.list = this.judgment(this.tags);
      this.init(this.tags[1].date);
    },
    init(tagType) {
      //获得所有文章
      var length = 0; //记录长度
      var pages = this.$site.pages;
      this.catalogList = pages.filter((element) => {
        var taglist = element.relativePath.split("/").reverse();
        element.tag = decodeURIComponent(taglist[1]);
        if (tagType == "all") {
          length = length + 1;
          return element;
        } else {
          if (tagType == element.tag) {
            length = length + 1;
            return element;
          }
        }
        // }
      });
    },
    // 跳转页面
    searchLink(link) {
      this.$router.push(link).catch((err) => {});
      this.searchKey = null;
    },
    // 轮播
    toleft() {
      return new Promise((resolve, reject) => {
        var num = this.list.length;
        let arr = JSON.parse(JSON.stringify(this.list));
        var item = arr[0];
        for (let i = 0; i < num - 1; i++) {
          this.list[i].class = this.list[i + 1].class;
        }
        this.list[num - 1].class = item.class;
        resolve();
      });
    },
    toright() {
      return new Promise((resolve, reject) => {
        let arr = JSON.parse(JSON.stringify(this.list));
        var item = arr[arr.length - 1];
        for (let i = this.list.length - 1; i > 0; i--) {
          this.list[i].class = this.list[i - 1].class;
        }
        this.list[0].class = item.class;
        resolve();
      });
    },
    touchstart(e) {
      this.mousept.x1 = e.changedTouches[0].pageX;
    },
    touchend(e) {
      this.mousept.x2 = e.changedTouches[0].pageX;
      var distance = this.mousept.x2 - this.mousept.x1;
      if (distance > 50) {
        clearInterval(this.times);
        this.toright().then(() => {
          this.times = setInterval(() => {
            this.toright();
          }, 5000);
        });
      }
      if (-distance > 50) {
        clearInterval(this.times);
        this.toleft().then(() => {
          this.times = setInterval(() => {
            this.toright();
          }, 5000);
        });
      }
    },
    judgment(prolist) {
      var oldlist = JSON.parse(JSON.stringify(prolist));
      var list = JSON.parse(JSON.stringify(prolist));
      if (prolist.length > 5) {
        list[0].class = "item-current-before2";
        list[1].class = "item-current-before1";
        list[2].class = "item-current";
        list[3].class = "item-current-next1";
        list[4].class = "item-current-next2";
        for (let i = 5; i < prolist.length; i++) {
          list[i].class = "";
        }
      } else {
        var times = Math.round(5 / prolist.length);
        var newlist = [];
        newlist = newlist.concat(list);
        for (let j = 0; j < times - 1; j++) {
          newlist = newlist.concat(oldlist);
        }
        var list = JSON.parse(JSON.stringify(newlist));
        list[0].class = "item-current-before2";
        list[1].class = "item-current-before1";
        list[2].class = "item-current";
        list[3].class = "item-current-next1";
        list[4].class = "item-current-next2";
        for (let i = 5; i < this.list.length; i++) {
          list[i].class = "";
        }
      }
      return list;
    },
  },
  mounted() {
    if (this.$site.themeConfig.headImg) {
      this.headImg = this.$site.themeConfig.headImg;
    }
    this.navLinkList = this.$site.themeConfig.nav;
    this.getTag();
    //   轮播
    this.times = setInterval(() => {
      this.toleft();
    }, 5000);
  },
};
</script>

<style lang="stylus" scoped>
.carousel {
  position: relative;
  height: 100%;

  // 每项样式
  .item {
    box-shadow: 0 0 20px #b5ddc7;
    background: #fff;
    font-family: n-txt;
    font-size: 14px;
    color: #2c3e50;
    width: 70%;
    height: 300px;
    box-sizing: border-box;
    display: none;
    position: absolute;
    display: none;
    left: 0;
    right: 0;
    margin: auto;
    transition: all 1s;

    // 当前样式前面弟2个
    &-current-before2 {
      display: block;
      transform: scale(0.8) rotate(30deg) translate3d(140%, 0, 0);
      z-index: 7;
      border:solid 2px #c4deaa;
    }

    // 当前样式前面弟1个
    &-current-before1 {
      display: block;
      transform: scale(0.9) rotate(15deg) translate3d(70%, 0, 0);
      z-index: 8;
      border:solid 2px  #fda6bc;
    }

    // 当前样式
    &-current {
      display: block;
      z-index: 999;
      transform: scale(1) rotate(0) translate3d(0, 0, 0);
      z-index: 9;
     border:solid 2px  #c4deaa;
    }

    // 当前样式后面第1个
    &-current-next1 {
      display: block;
      transform: scale(0.9) rotate(-15deg) translate3d(-70%, 0, 0);
      z-index: 8;
      border:solid 2px #c3dae4;
    }

    // 当前样式后面第2个
    &-current-next2 {
      display: block;
      transform: scale(0.8) rotate(-30deg) translate3d(-140%, 0, 0);
      z-index: 7;
      border:solid 2px #fda6bc;
    }
  }
}
</style>