<template>
  <div class="article">
    <Content />
    <div v-if="preTitle.title" @click="goArticle(preTitle)" class="article-pre">
      上一篇：《{{ preTitle.title }}》
    </div>
    <div
      v-if="nextTitle.title"
      @click="goArticle(nextTitle)"
      class="article-next"
    >
      下一篇：《{{ nextTitle.title }}》
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      preTitle: {},
      nextTitle: {},
      nowTitle: null,
      titleIndex: 0,
    };
  },
  watch: {
    titleIndex(val) {
      this.init();
    },
  },
  methods: {
    init() {
      //获得所有文章
      var pages = this.$site.pages;

      this.preTitle = {};
      this.nextTitle = {};
      if (pages.length == 1) {
        return;
      } else {
        for (let i = 0; i < pages.length; i++) {
          if (this.nowTitle == pages[i].title) {
            this.titleIndex = i;
            break;
          }
        }
        if (this.titleIndex == 0) {
          this.nextTitle = pages[this.titleIndex + 1];
          this.nextTitle.index = this.titleIndex + 1;
          this.preTitle = null;
        } else if (this.titleIndex == pages.length - 1) {
          this.preTitle = pages[this.titleIndex - 1];
          this.preTitle.index = this.titleIndex - 1;
          this.nextTitle = null;
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
      this.nowTitle = item.title;
      this.$router.push(item.path);
    },
  },
  mounted() {
    this.init();
  },
};
</script>

<style lang="stylus" scoped>
.article {
  background: rgba(255, 255, 255, 0.9);
  padding: 0 1em;
  padding-bottom: 6em;
  position: relative;

  &-pre {
    bottom: 3em;
    position: absolute;
    left: 1em;
    background: #c3dae4;
    line-height: 1.5em;
    border-radius: 1em;
    padding-right: 1em;
    white-space: nowrap;

    &:before {
      content: '';
      width: 0;
      height: 0;
      border: solid 0.5em #c3dae4;
      border-left: transparent 0.5em solid;
    }
  }

  &-next {
    line-height: 1.5em;
    bottom: 1em;
    padding-left: 1em;
    position: absolute;
    right: 1em;
    border-radius: 1em;
    background: #c4deaa;
    white-space: nowrap;

    &:after {
      content: '';
      width: 0;
      height: 0;
      border: solid 0.5em #c4deaa;
      border-right: transparent 0.5em solid;
    }
  }
}
</style>