<template>
  <div class="taglist">
    <div class="tag">
      <div class="tag-name">全部</div>
      <div class="tag-count">{{ tagList.length }}</div>
    </div>
    <div
      class="tag"
      v-for="(item, index) in tags"
      :key="index"
    >
      <div class="tag-name">
        {{ item.tagname }}
      </div>
      <div class="tag-count">{{ item.count }}</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tagList: [],
      tags: null,
    };
  },
  methods: {
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
    margin: 0em;
    padding: 1.5em;
    font-weight: bold;
    position: relative;
    white-space: nowrap;
    border-radius: 100%;
    background: transparent;
    transform: skewX(0deg) scale(0.7);
    border: 2px dashed #c4deaa;
    transition: all ease-in 0.3s;
    background: #fff;

    &-name {
      font-size: 1em;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
    }

    &-count {
      position: absolute;
      font-size: 1.5em;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      z-index :20;
    }

    &:after {
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      margin: auto;
      content: '';
      width: 100%;
      height: 100%;
      border: 2px dashed #c4deaa;
      box-sizing: border-box;
      border-radius: 100%;
      transform: skewX(30deg);
      transition: all ease-in 0.3s;
    }

    &:before {
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      margin: auto;
      content: '';
      width: 100%;
      height: 100%;
      border: 2px dashed #c4deaa;
      transform: skewX(-30deg);
      transition: all ease-in 0.3s;
      border-radius: 100%;
      box-sizing: border-box;
    }

    &:hover{
      border-color: #fda6bc;
      transition: all ease-in 0.3s;
      transform: skewX(0deg) scale(1);

      &:after {
        transform: skewX(30deg) scale(0.8);
        transition: all ease-in 0.3s;
        border-color: #fda6bc;
      }

      &:before {
        transform: skewX(-30deg) scale(0.9);
        transition: all ease-in 0.3s;
        border-color: #fda6bc;
      }
    }
  }
}
</style>