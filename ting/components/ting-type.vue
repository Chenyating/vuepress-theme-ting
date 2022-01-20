<template>
  <div>
    <div class="taglist">
      <div class="tag" @click="clicktag('all')">
        <div class="tag-face">全部</div>
        <div class="tag-left">
          <div class="tag-left-cont">全部</div>
        </div>
        <div class="tag-right">{{ tagList.length }}</div>
      </div>
      <div
        class="tag"
        @click="clicktag(item.tagname)"
        v-for="(item, index) in tags"
        :key="index"
      >
        <div class="tag-face">
          {{ item.tagname }}
        </div>
        <div class="tag-left">
          <div class="tag-left-cont">{{ item.tagname }}</div>
        </div>
        <div class="tag-right">{{ item.count }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tagList: [],
      tags: null,
      tagname: "",
    };
  },
  methods: {
    clicktag(tagname) {
      this.tagname=tagname;
      // 把值传给父组件去。
      this.$emit("clicktag", tagname);
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
          tagname: this.tagList[i],
          count: count,
        });
        i += count;
      }
      this.tags = arr;
      this.init(this.tags[1].date);
    },
    init(tagType) {
      //获得所有文章
      var length = 0; //记录长度
      var pages = this.$site.pages;
      pages.filter((element) => {
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
      });
    },
  },
  mounted() {
    this.getTag();
  },
};
</script>

<style lang="stylus" scoped>
.taglist {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;

  .tag {
    margin: 5%;
    padding: 1em;
    width: 4em;
    height: 4em;
    box-sizing: border-box;
    position: relative;
    text-align: center;
    transition: all ease-in 1s;
    transform-origin: center center;
    font-size: 1em;

    &:hover {
      transform: translateX(50%);

      .tag-face {
        transition: all ease-in 0.3s;
        transform-origin: left center;
        transform: rotateY(90deg) skewX(-20deg) !important;
        z-index: 10;
      }

      .tag-left {
        transition: all ease-in 0.3s 0.3s;
        transform-origin: left center;
        transform: rotateY(180deg) !important;
        z-index: 10;
      }
    }

    &-face {
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      transform-origin: left center;
      transform: rotateY(0deg);
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: bold;
      background: #c3dae4;
      border-radius: 20px;
      font-size: 0.8em;
      transition: all ease-in 0.3s 0.3s;
      box-shadow: 0 2px 7px rgba(0, 0, 0, 0.15);
    }

    &-left {
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      transform-origin: left center;
      transform: rotateY(90deg);
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all ease-in 0.3s;
      background: #fda6bc;
      border-radius: 20px;
      font-size: 0.8em;
      box-shadow: 0 2px 7px rgba(0, 0, 0, 0.15);

      &-cont {
        transform: rotateY(180deg);
      }
    }

    &-right {
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      transform-origin: left center;
      transform: rotateY(0deg);
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all ease-in 0.3s;
      z-index: -1;
      background: #c4deaa;
      border-radius: 20px;
      box-shadow: 0 2px 7px rgba(0, 0, 0, 0.15);
    }
  }
}
</style>