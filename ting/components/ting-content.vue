<template>
  <div class="content-box">
    <Content />
    <div v-if="preTitle" @click="goArticle(preTitle)" class="phone-pre">
      上一篇：《{{ preTitle.title }}》
    </div>
    <div v-if="nextTitle" @click="goArticle(nextTitle)" class="phone-next">
      下一篇：《{{ nextTitle.title }}》
    </div>
    <a></a>
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
      console.log(this.preTitle.index, this.nextTitle.index);
    },
    goArticle(item) {
      this.$router.push(item.path);
      this.titleIndex = item.index;
      this.init();
    },
  },
  mounted() {
    this.init();
  },
};
</script>

<style lang="stylus" scoped>
.content-box {
  background: #fff;
  padding: 1em;
}
</style>