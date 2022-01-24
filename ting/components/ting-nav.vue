<template>
  <div class="nav-list">
    <div
      class="nav"
      v-for="(item, index) in navlist"
      :key="index"
      @click="changenav(index)"
    >
      <div class="nav-pre" :class="curindex == index ? 'rightout' : 'leftin'">
        {{ item }}
      </div>
      <div class="nav-next" :class="curindex == index ? 'rightin' : 'leftout'">
        {{ item }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      navlist: ["首页", "文章", "关于"],
      curindex: 1,
    };
  },
  methods: {
    changenav(index) {
      this.curindex = index;
      // 把值传给父组件去。
      this.$emit("changenav", index);
    },
  },
  mounted() {
    if (this.$site.themeConfig.gitalk) {
      this.navlist.push('留言板')
    }
    this.changenav(this.curindex)
  },
};
</script>

<style lang="stylus" scoped>
.nav-list {
  display: flex;
  align-items: center;
  margin: 1em;

  .nav {
    margin-right: 1em;
    padding: 2em;
    box-sizing: border-box;
    position: relative;
    text-align: center;

    &:hover {
      .nav-pre {
        transition: all ease-in 0.3s;
        transform-origin: center center;
        transform: rotateY(90deg) !important;
        z-index: 10;
      }

      .nav-next {
        transition: all ease-in 0.3s 0.3s;
        transform-origin: center center;
        transform: rotateY(0deg) !important;
        z-index: 10;
      }
    }

    &-pre {
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      transform: rotateY(0deg);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1em;
      font-weight: bold;
      width: 2em;

      &:before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: #c3dae4;
        transform: rotateZ(45deg);
        z-index: -1;
        border-radius: 10px;
      }
    }

    &-next {
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      transform: rotateY(90deg);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1em;
      font-weight: bold;
      width: 2em;

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
    }

    .leftin {
      transition: all ease-in 0.3s 0.3s;
      transform-origin: center center;
      transform: rotateY(0deg) !important;
      z-index: 10;
    }

    .leftout {
      transition: all ease-in 0.3s;
      transform-origin: center center;
      transform: rotateY(90deg);
    }

    .rightout {
      transition: all ease-in 0.3s;
      transform: rotateY(-90deg);
      transform-origin: center center;
    }

    .rightin {
      z-index: 10;
      transform: rotateY(0deg);
      transition: all ease-in 0.3s 0.3s;
      transform-origin: center center;
    }
  }
}
</style>
