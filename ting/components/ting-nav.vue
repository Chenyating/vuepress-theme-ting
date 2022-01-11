<template>
  <div class="nav-list">
    <div class="nav" v-for="(item, index) in navLinkList" :key="index">
      <a :href="item.link" v-if="item.type == 'url'">
        {{ item.text }}
      </a>
      <router-link tag="a" v-else :to="item.link">{{ item.text }}</router-link>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      navLinkList: [],
    };
  },
  methods: {
    goCatalog(tagType) {
      this.$router.push(
        `${this.$site.themeConfig.catalogUrl}.html?type=${tagType}`
      );
    },
  },
  mounted() {
    this.navLinkList = this.$site.themeConfig.nav;
  },
};
</script>

<style lang="stylus" scoped>
.nav-list {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;

  .nav {
    width: 100px;
    height: 50px;
    background: #c3dae4;
    border-top-right-radius: 50px;
    border-top-left-radius: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 20px;
    &:nth-child(2n) {
      background: #c4deaa;
    }

    &:nth-child(3n) {
      background: #fda6bc;
    }

    a {
      overflow: hidden;
      text-decoration: none;
      font-weight: bold;
      out-line: none;
      color: #fff;

      &:hover {
        color: #ffffff;
      }
    }

    font-size: 1em;
    // 文字垂直
    text-align: center;
    border-top: 0;
    vertical-align: bottom;
    margin-bottom: 0;
    font-weight: bold;
  }
}
</style>
