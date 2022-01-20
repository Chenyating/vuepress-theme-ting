<template>
  <div class="page-catalog">
    <div class="menu">
      <div class="menu-item cur" @click="showcatalog">目录</div>
      <div class="menu-item" @click="gohome">首页</div>
      <div class="menu-item"><a href="#top"> 顶部</a></div>
    </div>
    <div :class="['catalog', { show: h5catalog }]">
      <div v-if="preTitle.title" @click="goArticle(preTitle)" class="title">
        上一篇:《{{ preTitle.title }}》
      </div>
      <h1 class="curtitle">{{ nowTitle }}</h1>
      <a
        :class="[
          item.level == 2 ? 'level2' : 'level3',
          { select: item.slug == selectTitle },
        ]"
        v-for="(item, index) in $page.headers"
        :key="index"
        :href="'#' + item.slug"
        nofollow
        >{{ item.title }}</a
      >
      <div v-if="nextTitle.title" @click="goArticle(nextTitle)" class="title">
        下一篇：《{{ nextTitle.title }}》
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectTitle: "",
      preTitle: {},
      nextTitle: {},
      nowTitle: null,
      titleIndex: 0,
      h5catalog: false,
    };
  },
  watch: {
    titleIndex(val) {
      this.init();
    },
  },
  computed: {},
  methods: {
    gohome() {
      this.$router.push("/");
    },
    showcatalog() {
      console.log("???");
      this.h5catalog = !this.h5catalog;
    },
    // 点击a以后获得改变的hash路由
    clickTitle() {
      window.onhashchange = (e) => {
        this.selectTitle = decodeURIComponent(location.hash).replace("#", "");
      };
    },
    styleOperation() {
      var allTitle = document.getElementsByClassName("header-anchor");
      for (var i = 0; i < allTitle.length; i++) {
        allTitle[i].innerHTML = " ";
      }
    },
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
        } else if (this.titleIndex == pages.length - 1) {
          this.preTitle = pages[this.titleIndex - 1];
          this.preTitle.index = this.titleIndex - 1;
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
    this.clickTitle();
    this.styleOperation();
    this.nowTitle = this.$page.title;
    this.init();
  },
};
</script>

<style lang="stylus" scoped>
.page-catalog {
  position: fixed;
  margin: auto;
  top: 5em;
  transform: translateX(910px);
  max-height: 70%;
  z-index: 90;
  padding-top: 3.5em;

  &::-webkit-scrollbar {
    display: none;
  }

  .catalog {
    max-height: 60vh;
    overflow-y: auto;
    line-height: 1.5em;
    color: #b6c3d0;
    scroll-behavior: smooth;
    border: 2px dashed #c4deaa;
    padding: 1em;
    background: #fff;
    border-radius: 1em;
  }

  .menu {
    height: 3em;
    position: absolute;
    top: 0;
    display: flex;

    &-item {
      width: 3em;
      height: 3em;
      font-weight: bold;
      font-size: 1em;
      margin: 0.5em;
      color: #2e5c77;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all ease-in 0.3s;
      position: relative;

      a {
        text-align: center;
        font-weight: bold;
        font-size: 1em;
      }

      &.cur {
        animation: opacitying 3s ease-in infinite;
      }

      &:before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: #c4deaa;
        transform: rotateZ(45deg);
        z-index: -1;
        border-radius: 10px;
      }

      &:nth-child(1) {
        &:before {
          background: #fda6bc;
        }
      }
    }
  }

  a {
    color: rgba(0, 0, 0, 0.75);
    margin: 10px 0;
    display: block;
    width: 10em;
    color: #2e5c77;
    white-space: nowrap;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;

    &.select {
      color: #2b89d4;
      position: relative;
      font-weight: bold;

      &:before {
        content: ' ';
        position: absolute;
        width: 0;
        height: 0;
        top: 0;
        bottom: 0;
        margin: auto;
        left: 0;
        border: solid 0.5em #fda6bc;
        border-right: transparent 0.5em solid;
      }
    }
  }
}

.level1 {
  font-size: 1.2em;
}

.level2 {
  font-size: 1em;
  text-indent: 2em;
}

.level3 {
  font-size: 0.8em;
  text-indent: 4em;
}

.title {
  color: #2e5c77;
  font-weight: bold;
  position: relative;
  margin-left: -1em;
  width: 10em;
  display: flex;

  &:before {
    content: ' ';
    width: 1em;
    margin: auto;
    border: solid 0.5em #c4deaa;
    border-top: transparent 0.5em solid;
    border-right: transparent 0.5em solid;
    border-bottom: transparent 0.5em solid;
  }
}

.curtitle {
  color: #fda6bc;
  font-weight: bold;
  font-size: 1em;
  width: 10em;
}

@media (max-width: 1000px) {
  .page-catalog {
    transform: translateX(100vw);
    transition: all ease-in 0.5s;

    .menu {
      transform: translateX(-100%) translateY(-100%);
      display: block;
    }

    .catalog {
      transition: all ease-in 0.3s;

      &.show {
        transform: translateX(-100%);
      }
    }
  }
}
</style>