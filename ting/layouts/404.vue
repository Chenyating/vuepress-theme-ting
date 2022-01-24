<template>
  <div class="mine">
    <div class="tip">既然来了，就别想回去，留下玩扫雷吧</div>
    <div class="boom begin" v-if="!ifbegin" @click="beginMine">
      <div class="boom-pre">开始</div>
    </div>
    <div v-else>
      <div class="y" v-for="n in height - 2" v-show="all.length" :key="n">
        <!-- x值 -->
        <div
          class="boom"
          v-for="m in width - 2"
          v-show="all[n - 1]"
          @click="click(n, m)"
          :key="m"
        >
          <div
            class="boom-pre"
            :class="{
              leftout: all[n][m][1] >= 0,
              isboom: all[n][m][0] == 2,
            }"
          ></div>
          <div
            class="boom-next"
            :class="{
              leftin: all[n][m][1] >= 0,
              isboom: all[n][m][0] == 2,
            }"
          >
            {{ all[n][m][1] != 0 ? all[n][m][1] : "" }}
          </div>
        </div>
      </div>
      <div class="tip">{{ text }}</div>
    </div>
  </div>
</template>
<script>
export default {
  name: "NotFound",
  data() {
    return {
      width: 12,
      height: 12,
      tempHeight: 14,
      all: [],
      bomb: 0,
      num: 0,
      bombNum: 10,
      ifboom: false,
      text: "休息一下玩个扫雷吧～",
      ifbegin: false,
    };
  },
  methods: {
    // 点击空白
    click(x, y) {
      if (this.ifboom) {
        this.ifboom = false;
        this.randomBegin(20);
        return;
      }
      if (this.all[x][y][0] == 1) {
        this.showBomb();
        console.log("你踩到雷啦！");
        this.text = "踩到雷雷了哦，点击再来一次吧。";
        this.ifboom = true;
        return;
      } else {
        this.ifOk();
        this.andThen(x, y);
      }
    },
    andThen(x, y) {
      this.ifOk();
      if (this.all[x][y][0] == 1 || this.all[x][y][1] > -1) {
        return;
      }
      this.num = 0;
      try {
        if (this.all[x - 1][y - 1][0] == 1) {
          this.num += 1;
        }
        if (this.all[x - 1][y][0] == 1) {
          this.num += 1;
        }
        if (this.all[x - 1][y + 1][0] == 1) {
          this.num += 1;
        }
        if (this.all[x][y - 1][0] == 1) {
          this.num += 1;
        }
        if (this.all[x][y][0] == 1) {
          return;
        }
        if (this.all[x][y + 1][0] == 1) {
          this.num += 1;
        }
        if (this.all[x + 1][y - 1][0] == 1) {
          this.num += 1;
        }
        if (this.all[x + 1][y][0] == 1) {
          this.num += 1;
        }
        if (this.all[x + 1][y + 1][0] == 1) {
          this.num += 1;
        }
        this.$set(this.all, x, this.all[x]);
        this.$set(this.all[x], y, this.all[x][y]);
        this.$set(this.all[x][y], 1, this.num);
        if (this.num == 0) {
          this.andThen(x - 1, y - 1);
          this.andThen(x - 1, y);
          this.andThen(x - 1, y + 1);
          this.andThen(x, y - 1);
          this.andThen(x, y + 1);
          this.andThen(x + 1, y - 1);
          this.andThen(x + 1, y);
          this.andThen(x + 1, y + 1);
        } else {
          this.ifOk();
          return;
        }
      } catch (error) {}
      this.ifOk();
    },
    // 开始随机游戏
    randomBegin(bombNumber) {
      this.text = "扫雷，准备好了吗？开始咯～";

      this.bombNum = bombNumber;
      this.bomb = 0;
      for (let i = 0; i < this.height; i++) {
        for (let j = 0; j < this.width; j++) {
          this.$set(this.all, i, this.all[i]);
          this.$set(this.all[i], j, this.all[i][j]);
          this.$set(this.all[i][j], 0, 0);
          this.$set(this.all[i][j], 1, -1);
        }
      }
      this.$nextTick(() => {
        this.random();
      });
    },
    // 随便上色
    random() {
      var a, b;
      a = parseInt(Math.random() * (this.height - 2) + 1);
      b = parseInt(Math.random() * (this.width - 2) + 1);
      if (this.bomb < this.bombNum) {
        // 如果这个数炸弹，那么重新随机
        if (this.all[a][b][0] == 1) {
          this.random();
        }
        // 否则给他设置为炸弹
        else {
          this.bomb = this.bomb + 1;
          this.$set(this.all, a, this.all[a]);
          this.$set(this.all[a], b, this.all[a][b]);
          this.$set(this.all[a][b], 0, 1);
          this.random();
        }
      } else {
        return;
      }
    },
    ifOk() {
      if (this.ifboom) {
        this.ifboom = false;
        this.randomBegin(20);
        return;
      }
      var lastNum = 0;
      for (var i = 1; i < this.height - 1; i++) {
        for (var j = 1; j < this.width - 1; j++) {
          if (this.all[i][j][1] == -1) {
            lastNum += 1;
          }
        }
      }
      if (lastNum == this.bombNum) {
        this.showBomb();
        this.ifboom = true;
        console.log("完全没有踩到地雷，你好棒棒哦");
        this.text = "完全没有踩到地雷，你好棒棒哦，还来吗？";
      }
    },
    showBomb() {
      for (var i = 1; i < this.height - 1; i++) {
        for (var j = 1; j < this.width - 1; j++) {
          if (this.all[i][j][1] == -1 && this.all[i][j][0] == 1) {
            this.$set(this.all, i, this.all[i]);
            this.$set(this.all[i], j, this.all[i][j]);
            this.$set(this.all[i][j], 0, 2);
          }
        }
      }
    },
    beginMine() {
      this.ifbegin = true;
      this.randomBegin(10);
    },
  },
  beforeMount() {
    for (let i = 0; i < this.height; i++) {
      this.all[i] = [];
      for (let j = 0; j < this.width; j++) {
        this.all[i][j] = [0, -1];
      }
    }
  },
  mounted() {
    console.log(this.all, "??");
  },
};
</script>
<style lang="stylus" scoped>
.tip {
  color: #2e5c77;
  font-size: 1em;
  text-align: center;
  font-weight: bold;
  border-radius: 1em;
  margin: 1em;
}

.mine {
  width: 600px;
  height: 600px;
  position: fixed;
  left: 0;
  right: 0;
  top: 2em;
  margin: auto;
}

.y {
  display: flex;
  justify-content: center;
}

.isboom:before {
  background: pink !important;
  transition: all ease-in 0.3s;
}

.boom {
  height: 60px;
  width: 60px;
  position: relative;
  text-align: center;
  display: inline-block;
  box-sizing: border-box;
  color: #fff;
  font-weight: bold;

  &-pre {
    position: absolute;
    top: 0;
    left: 0;
    transform: rotateY(0deg);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1em;
    font-weight: bold;
    width: 100%;
    height: 100%;

    &:before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: #c3dae4;
      z-index: -1;
      border: 2px dashed #fff;
      box-sizing: border-box;
      border-radius: 1px;
      transition: all ease-in 0.3s;
    }
  }

  &-next {
    position: absolute;
    top: 0;
    left: 0;
    transform: rotateY(90deg);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1em;
    font-weight: bold;
    width: 100%;
    height: 100%;

    &:before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: #c4deaa;
      z-index: -1;
      border: 2px dashed #fff;
      box-sizing: border-box;
      border-radius: 1px;
      transition: all ease-in 0.3s;
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

@media (max-width: 750px) {
  .mine {
    width: 100vw;
    height: 100vw;
  }

  .boom {
    height: 8vw;
    width: 8vw;
  }
}

.begin {
  transform: scale(2);
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
  font-size :.5em;
}
</style>