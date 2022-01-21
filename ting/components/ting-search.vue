<template>
  <div class="search-box">
    <input
      autofocus="autofocus"
      v-model="searchKey"
      placeholder="找找关键词哦～"
    />
    <div
      :class="searchKey && searchTitles.length ? 'show' : 'hide'"
      class="result-list"
    >
      <div
        class="result-item"
        v-for="(item, index) in searchTitles"
        @click="searchLink(item)"
        :key="index"
      >
        <span class="result-item-tit">{{ item.title }} </span>
        <span class="result-item-header">{{ item.header }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchKey: "",
      allHeader: [],
      headerList: [],
    };
  },
  computed: {
    searchTitles: function () {
      var list = this.headerList.filter((item, index) => {
        if (
          item.header.toLowerCase().indexOf(this.searchKey.toLowerCase()) !=
            -1 ||
          item.title.toLowerCase().indexOf(this.searchKey.toLowerCase()) != -1
        ) {
          return item;
        }
      });
      var newList = [];
      var len = list.length > 6 ? 6 : list.length;
      for (var i = 0; i < len; i++) {
        newList.push(list[i]);
      }
      return newList;
    },
  },
  methods: {
    // 跳转页面
    searchLink(item) {
      this.$router
        .push({
          path: item.road,
        })
        .catch((err) => {});
      this.searchKey = null;
    },
    // 处理header到一个列表里
    resolveHeader(arr) {
      arr.forEach((element) => {
        if (element.headers) {
          this.headerList.push({
            road: element.path,
            header: "",
            href: element.regularPath,
            title: element.title == undefined ? "" : element.title,
          });
          var headers = element.headers;
          //遍历文章里面的header
          headers.forEach((head) => {
            var href = head.slug;
            var road = element.path + "#" + href;
            this.headerList.push({
              road: road,
              header: head.title,
              href: href,
              title: element.title == undefined ? "" : element.title,
            });
          });
        }
      });
    },
  },
  mounted() {
    this.resolveHeader(this.$site.pages);
  },
};
</script>

<style lang="stylus" scoped>
.search-box {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  position: relative;
  font-size: 1em;
  margin: 1em;

  input {
    border-radius: 1em;
    padding: 0.5em 1em;
    display: block;
    outline: none;
    border: 2px solid #fda6bc;
    box-shadow: 0 2px 7px rgba(0, 0, 0, 0.15);
    margin: 1em 0;
    box-sizing: border-box;
    position: relative;
  }

  .result-list {
    position: absolute;
    left: 0;
    transition: 1s all;
    right: 0;
    margin: 1em;
    margin-top: 3.5em;
    background: #ffffff;
    border: 2px dashed #fda6bc;
    z-index: 9;
    box-shadow: 0 2px 7px rgba(0, 0, 0, 0.15);

    &:after {
      content: ' ';
      position: absolute;
      top: -1em;
      left: 0;
      right: 0;
      width: 0;
      height: 0;
      margin: auto;
      border: solid 0.5em #fda6bc;
      border-top: transparent 0.5em solid;
      border-right: transparent 0.5em solid;
      border-left: transparent 0.5em solid;
    }

    .result-item {
      border-bottom: solid 1px #f1f2f4;
      padding: 10px;

      &-tit {
        font-weight: bold;
        max-width: 6em;
      }

      &-header {
        font-size: 0.8em;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
  }
}
</style>