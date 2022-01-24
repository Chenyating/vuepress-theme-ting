<template>
  <div
    id="carousel"
    class="carousel"
    @touchstart="touchstart"
    @touchend="touchend"
  >
    <div class="carousel-bd">
      <div
        v-for="(item, index) in list"
        :key="index"
        class="item"
        :class="item.class"
      >
        <img v-if="item.img" :src="item.img" />
        <div>
          {{ item.txt }}
        </div>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  name: "",
  data() {
    return {
      times: null,
      mousept: {
        x1: "",
        x2: "",
      },
      list: [],
      infolist: [],
    };
  },
  methods: {
    toleft() {
      return new Promise((resolve, reject) => {
        var num = this.list.length;
        let arr = JSON.parse(JSON.stringify(this.list));
        var item = arr[0];
        for (let i = 0; i < num - 1; i++) {
          this.list[i].class = this.list[i + 1].class;
        }
        this.list[num - 1].class = item.class;
        resolve();
      });
    },
    toright() {
      return new Promise((resolve, reject) => {
        let arr = JSON.parse(JSON.stringify(this.list));
        var item = arr[arr.length - 1];
        for (let i = this.list.length - 1; i > 0; i--) {
          this.list[i].class = this.list[i - 1].class;
        }
        this.list[0].class = item.class;
        resolve();
      });
    },
    touchstart(e) {
      this.mousept.x1 = e.changedTouches[0].pageX;
    },
    touchend(e) {
      this.mousept.x2 = e.changedTouches[0].pageX;
      var distance = this.mousept.x2 - this.mousept.x1;
      if (distance > 50) {
        clearInterval(this.times);
        this.toright().then(() => {
          this.times = setInterval(() => {
            this.toright();
          }, 3000);
        });
      }
      if (-distance > 50) {
        clearInterval(this.times);
        this.toleft().then(() => {
          this.times = setInterval(() => {
            this.toright();
          }, 3000);
        });
      }
    },
    judgment() {
      this.infolist = this.$site.themeConfig.author.infolist;
      var oldlist = JSON.parse(JSON.stringify(this.infolist));
      var list = JSON.parse(JSON.stringify(this.infolist));
      if (this.infolist.length > 5) {
        list[0].class = "item-current-1";
        list[1].class = "item-current-2";
        list[2].class = "item-current-3";
        list[3].class = "item-current-4";
        list[4].class = "item-current-5";
        for (let i = 5; i < this.infolist.length; i++) {
          list[i].class = "";
        }
        this.list = list;
      } else {
        var times = Math.round(5 / this.infolist.length);
        var newlist = [];
        newlist = newlist.concat(list);
        for (let j = 0; j < times - 1; j++) {
          newlist = newlist.concat(oldlist);
        }
        var list = JSON.parse(JSON.stringify(newlist));
        list[0].class = "item-current-1";
        list[1].class = "item-current-2";
        list[2].class = "item-current-3";
        list[3].class = "item-current-4";
        list[4].class = "item-current-5";
        for (let i = 5; i < this.list.length; i++) {
          list[i].class = "";
        }
        this.list = list;
      }
      this.times = setInterval(() => {
        this.toleft();
      }, 3000);
    },
  },
  mounted() {
    this.judgment();
  },
};
</script>
<style lang="stylus" scoped>
.carousel {
  width: 100%;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;

  &-bd {
    width: 100%;
    position: relative;
    height: 100%;
  }

  // 每项样式
  .item {
    transition: all 1s;
    width: 40%;
    height: auto;
    position: absolute;
    opacity: 0;
    // left: 0;
    right: 0;
    margin: auto;

    // 当前样式前面弟2个
    &-current-1 {
      opacity: 0;
      transform: scale(0.8) rotate(20deg) translate3d(250%, 0, 0);
    }

    // 当前样式前面弟1个
    &-current-2 {
      opacity: 0;
      transform: scale(0.9) rotate(10deg) translate3d(150%, 0, 0);
    }

    // 当前样式
    &-current-3 {
      z-index: 999;
      opacity: 1;
      transform: scale(1) rotate(0) translate3d(-10%, 0, 0);
    }

    // 当前样式后面第1个
    &-current-4 {
      opacity: 0;
      transform: scale(0.9) rotate(-10deg) translate3d(-150%, 0, 0);
    }

    // 当前样式后面第2个
    &-current-5 {
      opacity: 0;
      transform: scale(0.8) rotate(-20deg) translate3d(-250%, 0, 0);
    }
  }
}

.item {
  display: flxe;
  color: #2e5c77;
  padding: 1em;
  font-size: 1em;
  text-align: center;
  font-weight: bold;
  background: rgba(#fff, 0.9);
  border: 2px dashed #fda6bc;
  border-radius: 1em;
  position: relative;

  &:after {
    content: ' ';
    position: absolute;
    bottom: 0;
    top: 0;
    height: 0;
    left: -2em;
    margin: auto;
    border: solid 1em #fda6bc;
    border-bottom: transparent 1em solid;
    border-left: transparent 1em solid;
    border-top: transparent 1em solid;
  }

  img {
    width: 100%;
    height: 200px;
    object-fit: contain;
  }
}
</style>