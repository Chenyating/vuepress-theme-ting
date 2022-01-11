<template>
  <div class="box-catalog">
    <div class="pc-book book">
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
            上一页
          </div>
          <div
            class="pagebtn next"
            v-if="index < pageNum - 1 && index % 2 == 1"
            @click="clickpage(index)"
          >
            下一页
          </div>
          <div class="pagebtn cur">第{{ index + 1 }}/{{ pageNum }}页</div>
        </div>
      </div>
    </div>
    <div class="h5-book book">
      <div
        v-for="(item, index) in list"
        :class="item.class"
        class="book-page"
        :key="index"
        :style="'z-index:' + index"
      >
        <div class="tagtit-box">
          <div class="tagtit-tit">{{ nowTag == "all" ? "全部" : nowTag }}</div>
          <div class="tagtit-num">{{ catalogList.length }}</div>
        </div>
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
            v-if="index > 0"
            @click="h5clickpage(pageId - 1)"
          >
            上一页
          </div>
          <div class="pagebtn cur">第{{ pageId + 1 }}/{{ pageNum }}页</div>
          <div
            class="pagebtn next"
            v-if="index < pageNum - 1"
            @click="h5clickpage(pageId + 1)"
          >
            下一页
          </div>
        </div>
      </div>
    </div>
    <div class="tag-list">
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
  data() {
    return {
      catalogList: [],
      pageId: 0,
      pageNum: null, //分页
      nowList: [],
      everyPageNumber: 5, //每页多少个
      tagList: [],
      tags: [],
      nowTag: "all",
      showCatalog: false,
      list: [],
    };
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
    this.init(this.nowTag);
    this.getTag();
  },
};
</script>

<style lang="stylus" scoped>
.tagtit {
  &-box {
    position: absolute;
    top: 20px;
    right: 20px;
    margin: 0 auto;
    display: flex;
    flex-wrap: nowrap;
    justify-content: center;
  }

  &-tit {
    text-align: center;
    width: inherit;
    font-size: 2em;
    color: #2e5c77;
    overflow: hidden;
    font-weight: bold;
    text-overflow: ellipsis;
  }

  &-num {
    font-size: 1em;
    color: #2e5c77;
    font-weight: bold;
  }
}

.pagebtn {
  width: 80px;
  height: 30px;
  color: #fff;
  position: absolute;
  text-align: center;
  font-size: 1em;
  line-height: 30px;
  border-radius: 10px;

  &-box {
    position: absolute;
    bottom: 50px;
    width: 100%;
    height: 30px;
    left: 0;
    bottom: 20px;
  }

  &.pre {
    left: 10%;
    background: #c3dae4;
  }

  &.cur {
    left: 0;
    right: 0;
    margin: 0 auto;
    color: #2e5c77;
  }

  &.next {
    right: 10%;
    background: #c4deaa;
  }
}

.box-catalog {
  position: relative;
  display: flex;
  justify-content: center;

  .tag-list {
    .tag {
      text-align: center;
      color: #fff;
      font-size: 0.2em;
      padding: 5px;
      margin: 5px 0;
      transition: all 1s;
      cursor: pointer;
      background: #c3dae4;
      text-align: right;
      white-space: nowrap;
      transform: translateX(-20px);

      &-select {
        transform: translateX(30px);
        position: relative;
        text-align: left;
        z-index: 10;
      }

      &:nth-child(2n) {
        background: #c4deaa;
      }

      &:nth-child(3n) {
        background: #fda6bc;
      }
    }
  }

  .catalog {
    position: relative;
    height: 80px;
    padding-left: 40px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;

    &-tit {
      font-weight: 700;
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
      font-weight: 700;
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
    width: 800px;
    position: relative;
    z-index: 2;
    display: flex;
    box-sizing: border-box;
    border: 2px solid #c4deaa;
    background: #fff;

    &.pc-book {
      .book-page {
        position: absolute;
        width: 50%;
        height: 100%;
        background: #fff;
        box-sizing: border-box;
        text-align: left;
        padding-top 40px;

        &:nth-child(odd) {
          position: absolute;
          width: 50%;
          height: 100%;
          left: 0;
          transform-origin: right;
          transform: rotateY(90deg);
          text-align: right;
          border-right: 2px solid #c4deaa;
        }

        &:nth-child(even) {
          position: absolute;
          width: 50%;
          height: 100%;
          right: 0;
          transform-origin: left;
        }
      }
    }

    &.h5-book {
      .book-page {
        position: absolute;
        width: 100%;
        height: 100%;
        background: #fff;
        text-align: left;
        transform: rotateY(90deg);
        transform-origin: left center;
        padding-top: 60px;
        padding-bottom: 40px;
        box-sizing: border-box;
        transition: all 0.3s ease-in;
        overflow: hidden;
        border: 2px solid #c4deaa;

        &:first-child {
          transform-origin: right center;
          transform: rotateY(0deg);
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
