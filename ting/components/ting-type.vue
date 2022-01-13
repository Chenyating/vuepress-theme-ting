<template>
  <div class="taglist">
    <div class="tag" v-for="(item, index) in tags">
      <div class="tag-front">
        {{ item.tagname }}
      </div>
      <div class="tag-back">
        {{ item.count }}
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
      console.log(this.tags, "???");
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

  .tag {
    width: 100px;
    height: 100px;
    position: relative;

    &:before {
      content: '';
      width: 100px;
      height: 100px;
      position: absolute;
      left: 0;
      top: 0;
      right: 0;
      bottom: 0;
      margin: auto;
      background: #c3dae4;
      transform: rotateZ(45deg);
      z-index: -1;
    }
  }
}
</style>