<template>
  <div class="box-catalog">
    <div class="pc book">
      <div
        v-for="(item, index) in list"
        :class="[item.class, { leftin: index == 0 }]"
        class="book-page"
        :key="index"
        :style="
          index % 2 == 1
            ? 'z-index:' + (list.length - index)
            : 'z-index:' + index
        "
        @click="clickpage(index)"
      >
        <div
          class="catalog"
          v-if="catalog && catalog.frontmatter.layout != 'catalog'"
          @click="goArticle(catalog.path)"
          v-for="(catalog, index) in item.list"
          :key="index"
        >
          <!-- 标题 -->
          <span class="catalog-tit">{{
            catalog.title ? catalog.title : "未命名"
          }}</span>
          <div class="catalog-time" v-if="catalog.lastUpdated">
            {{ new Date(catalog.lastUpdated).toLocaleString() }}
          </div>
        </div>
        <div class="pagebtn-box">
          <div
            class="pagebtn pre"
            v-if="index > 0 && index % 2 == 0"
            @click="clickpage(index)"
          >
            上
          </div>
          <div class="pagebtn cur">第{{ index + 1 }}/{{ pageNum }}页</div>
          <div
            class="pagebtn next"
            v-if="index < pageNum - 1 && index % 2 == 1"
            @click="clickpage(index)"
          >
            下
          </div>
        </div>
      </div>
    </div>
    <div class="h5 book">
      <div
        v-for="(item, index) in list"
        :class="item.class"
        class="book-page"
        :key="index"
        :style="'z-index:' + index"
      >
        <div
          v-if="catalog && catalog.frontmatter.layout != 'catalog'"
          @click="goArticle(catalog.path)"
          v-for="(catalog, index) in item.list"
          :key="index"
          class="catalog"
        >
          <span class="catalog-tit">{{
            catalog.title ? catalog.title : "未命名"
          }}</span>
          <div class="catalog-time" v-if="catalog.lastUpdated">
            {{ new Date(catalog.lastUpdated).toLocaleString() }}
          </div>
        </div>
        <div class="pagebtn-box">
          <div
            class="pagebtn pre"
            v-show="index > 0"
            @click="h5clickpage(pageId - 1)"
          >
            上
          </div>
          <div class="pagebtn cur">{{ index + 1 }}/{{ pageNum }}</div>
          <div
            class="pagebtn next"
            v-show="index < pageNum - 1"
            @click="h5clickpage(pageId + 1)"
          >
            下
          </div>
        </div>
      </div>
    </div>
    <div class="tag-list">
      <div class="tag-inner-list">
        <div
          class="tag"
          :class="{ 'tag-select': nowTag == 'all' }"
          @click="changeType('all')"
        >
          全部
        </div>
        <div
          class="tag"
          @click="changeType(item.date)"
          :class="{ 'tag-select': nowTag == item.date }"
          v-for="(item, index) in tags"
          :key="index"
        >
          {{ item.date }}
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
    tingType,
  },
  name: "catalog",
  props: {
    curtag: {
      type: String,
      default: "all",
    },
  },
  data() {
    return {
      catalogList: [],
      pageId: 0,
      pageNum: null, //分页
      nowList: [],
      everyPageNumber: 6, //每页多少个
      tagList: [],
      tags: [],
      nowTag: "all",
      showCatalog: false,
      list: [],
    };
  },
  watch: {
    curtag(val) {
      this.changeType(val);
    },
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
      var list = this.catalogList.filter((element, index) => {
        if (index >= startIndex && index <= endIndex) {
          return element;
        }
      });
      if (list[0].lastUpdated) {
        list.sort(function (a, b) {
          var x = new Date(a["lastUpdated"]).valueOf();
          var y = new Date(b["lastUpdated"]).valueOf();
          return x > y ? -1 : x < y ? 1 : 0;
        });
      }
      return list;
    },
    goArticle(link) {
      this.$router.push(link);
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
    },
    init(tagType) {
      //获得所有文章
      var length = 0; //记录长度
      var pages = this.$site.pages;
      this.catalogList = pages.filter((element) => {
        // if (element.title != 'Home') {
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
      this.pageNum = Math.ceil(length / this.everyPageNumber);
      var list = [];
      for (let i = 0; i < this.pageNum; i++) {
        list[i] = {
          class: "",
          list: this.choosePage(i),
        };
      }
      this.pageId = 0;
      this.list = list;
    },
    // 翻书
    clickpage(id) {
      if (id > 0 && id != this.list.length) {
        if (id % 2 == 0) {
          this.list[id].class = "leftout";
          this.list[id - 1].class = "rightin";
          this.choosePage(id);
        } else {
          this.list[id + 1].class = "leftin";
          this.list[id].class = "rightout";
          this.choosePage(id + 1);
        }
      }
    },
    h5clickpage(id) {
      console.log(id, this.pageId);
      if (id > this.pageId && id < this.list.length) {
        this.list[id].class = "leftin";
        this.choosePage(id);
      }
      if (id < this.pageId && id > -1) {
        this.list[id + 1].class = "leftout";
        this.choosePage(id);
      }
    },
  },
  mounted() {
    this.nowTag = this.$route.query.type ? this.$route.query.type : "all";
    this.getTag();
    this.init(this.nowTag);
  },
};
</script>

<style lang="stylus" scoped>
.pagebtn {
  height: 2em;
  color: #fff;
  text-align: center;
  font-size: 1em;
  line-height: 2em;
  border-radius: 1em;
  padding: 0 1em;
  margin: 0 1em;

  &-box {
    width: 100%;
    height: 2em;
    display: flex;
    justify-content: flex-end;
  }

  &.pre {
    background: #c3dae4;
  }

  &.cur {
    color: #2c3e50;
  }

  &.next {
    background: #c4deaa;
  }
}

.box-catalog {
  .tag-list {
    scroll-behavior: smooth;
    width: 20%;
    height: 70vh;
    position: absolute;
    right: 0;
    overflow: hidden;

    &:before {
      content: '';
      position: absolute;
      width: 200%;
      height: 2em;
      background: linear-gradient(#fff,rgba(255,255,255,0));
      border-bottom-left-radius: 100%;
      top: 0;
      right: 0;
      z-index :1;
    }
    &:after {
      content: '';
      position: absolute;
      width: 200%;
      height: 2em;
      background: linear-gradient(rgba(255,255,255,0),#fff);
      border-top-left-radius: 100%;
      bottom: 0;
      right: 0;
      z-index :1;
    }

    .tag-inner-list {
      height: 100%;
      width: 100%;
      overflow-y: auto;
      overflow-x: hidden;
    }

    .tag {
      text-align: center;
      color: #fff;
      font-size: 1em;
      padding: 0.5em 1em;
      margin: 1em 0;
      cursor: pointer;
      background: #c3dae4;
      text-align: right;
      transform: rotateZ(-30deg) translateX(-20px);
      border-radius: 1em;
      transition: all 1s;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;

      &-select {
        transform: rotateZ(-30deg) translateX(30px);
        background: #fda6bc;
      }
    }
  }

  .catalog {
    position: relative;
    height: 15%;
    padding-left: 2em;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;

    &:hover {
      opacity: 0.8;
    }

    &-tit {
      display: block;
      width: inherit;
      font-size: 1em;
      color: #2e5c77;
      overflow: hidden;
      text-overflow: ellipsis;
      display: flex;
      position: relative;
      padding-top: 10px;
      z-index: 4;
    }

    &-time {
      display: block;
      width: inherit;
      font-size: 0.5em;
      color: #2e5c77;
      overflow: hidden;
      text-overflow: ellipsis;
      display: flex;
      margin: 1em 0;
    }
  }

  .book {
    height: 70vh;
    position: relative;
    z-index: 2;
    float: left;
    display: flex;
    box-sizing: border-box;

    &.pc {
      width: 90%;
      height: 70vh;
      min-height: 550px;
      background: #c4deaa;
      border: 2px dashed #c4deaa;
      box-shadow: 0 2px 7px rgba(0, 0, 0, 0.15);

      &:after {
        content: '喵呜～无';
        position: absolute;
        font-size: 0.8em;
        right: 0;
        top: 0;
        color: #2e5c77;
        border: 2px dashed #fda6bc;
        padding: 0.5em;
        margin: 1em;
        background: rgba(255, 255, 255, 0.8);
        border-radius: 1em;
        transform-origin: center center;
        -webkit-animation: rorating 2s ease-in infinite;
        animation: rorating 2s ease-in infinite;
        z-index: -1;
      }

      .book-page {
        position: absolute;
        width: 50%;
        height: 100%;
        background: #fff;
        box-sizing: border-box;
        text-align: left;

        &:nth-child(odd) {
          position: absolute;
          width: 50%;
          height: 100%;
          left: 0;
          transform-origin: right;
          transform: rotateY(90deg);
          text-align: right;
          border-right: 2px dashed #c4deaa;
          border-top-right-radius: 1em;
          border-bottom-right-radius: 1em;
          box-shadow: inset -1em 0 1em rgba(#c4deaa, 0.5);
        }

        &:nth-child(even) {
          position: absolute;
          width: 50%;
          height: 100%;
          right: 0;
          transform-origin: left;
          border-top-left-radius: 1em;
          border-bottom-left-radius: 1em;
          box-shadow: inset 1em 0 1em rgba(#c4deaa, 0.5);

          .pagebtn-box {
            justify-content: flex-start;
          }
        }
      }
    }

    &.h5 {
      width: 80%;
      box-shadow: 0 2px 7px rgba(0, 0, 0, 0.15);
      border-radius: 1em;

      .book-page {
        position: absolute;
        width: 100%;
        height: 100%;
        background: #fff;
        text-align: left;
        transform: rotateY(90deg);
        transform-origin: left center;
        box-sizing: border-box;
        transition: all 0.3s ease-in;
        overflow: hidden;
        border: 2px dashed #c4deaa;
        border-top-right-radius: 1em;
        border-bottom-left-radius: 1em;
        box-shadow: inset 1em 0 1em rgba(#c4deaa, 0.5);

        &:first-child {
          transform-origin: right center;
          transform: rotateY(0deg);
        }

        .pagebtn-box {
          justify-content: center;
        }
      }
    }

    .leftin {
      transition: all ease-in 0.3s 0.3s;
      transform-origin: right center;
      transform: rotateY(0deg) !important;
    }

    .leftout {
      transition: all ease-in 0.3s;
      transform-origin: right center;
      transform: rotateY(90deg);
    }

    .rightout {
      transition: all ease-in 0.3s;
      transform: rotateY(-90deg);
      transform-origin: left center;
    }

    .rightin {
      transform: rotateY(0deg);
      transition: all ease-in 0.3s 0.3s;
      transform-origin: left center;
    }
  }
}
</style>
