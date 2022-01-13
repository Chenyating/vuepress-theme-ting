<template>
  <canvas id="stage" :width="canvasWidth" :height="canvasHeight"></canvas>
</template>

<script>
var acolor = ["#c9e5ac", "#d7eef9", "#fcec91", "#ebf5f9", "#87c095"];
function betweenRandom(min, max) {
  return Math.random() * (max - min) + min;
}

var mouseX, mouseY;
function getMouseXY(id) {
  $(id).mousemove(function (e) {
    mouseX = e.clientX || 0;
    mouseY = e.clientY || 0;
    console.log(mouseX, mouseY);
  });
}
// 创建一个球的构造函数
function ballline(maxWidth, maxHeight, ctx) {
  // 绘制环境对象
  this.ctx = ctx;
  // 绘制的宽度范围
  this.maxWidth = maxWidth;
  // 绘制的高度范围
  this.maxHeight = maxHeight;
}
// 创建方法
ballline.prototype = {
  // 配置
  init: function () {
    // 随机配置
    this.x = betweenRandom(0, this.maxWidth);
    this.y = betweenRandom(0, this.maxHeight);
    this.r = betweenRandom(1, 10);
    this.beiyongR = this.r;
    this.color = acolor[Math.floor(betweenRandom(0, 5))];
    // 运动方向
    this.vx = betweenRandom(-1, 1);
    // 运动方向
    this.vy = betweenRandom(-1, 1);
    this.beizhi = false; //小球是否在鼠标周围
  },
  // 绘制
  draw: function () {
    this.ctx.beginPath();
    this.ctx.fillStyle = this.color;
    this.ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    this.ctx.fill();
  },
  // 移动
  move: function () {
    this.x += this.vx;
    this.y += this.vy;
    // console.log(this.x,this.y)
    // 判断边界
    var distance = Math.sqrt((mouseX - this.x) ** 2 + (this.y - mouseY) ** 2);
    if (distance > 100) {
      this.vx = -this.vx;
      this.vy = -this.vy;
    }
    if (this.x <= 0 || this.x >= this.maxWidth) {
      this.vx = -this.vx;
    }
    if (this.y <= 0 || this.y >= this.maxHeight) {
      this.vy = -this.vy;
    }

    this.draw();
  },
};
import tingNav from "../components/ting-nav.vue";
export default {
  name: "NotFound",
  components: {
    tingNav,
  },
  data() {
    return {
      ctx: null,
      canvasWidth: null,
      canvasHeight: null,
      balls: [],
    };
  },
  methods: {
    drawline(from, to) {
      // 判断距离
      var a = from.x - to.x;
      var b = from.y - to.y;
      var c = Math.sqrt(a * a + b * b);
      if (c > 50) {
        return;
      } else {
        // 绘制亮点距离
        this.ctx.beginPath();
        this.ctx.moveTo(from.x, from.y);
        this.ctx.lineTo(to.x, to.y);
        // 绘制渐变色
        var grd = this.ctx.createLinearGradient(from.x, from.y, to.x, to.y);
        grd.addColorStop(0, from.color);
        grd.addColorStop(1, to.color);
        this.ctx.strokeStyle = grd;
        this.ctx.stroke();
      }
    },
    begin(num) {
      for (let i = 0; i < num; i++) {
        var qiu = new ballline(this.canvasWidth, this.canvasHeight, this.ctx);
        qiu.init();
        qiu.draw();
        qiu.id = i;
        this.balls.push(qiu);
      }

      setInterval(() => {
        this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
        for (let a = 0; a < this.balls.length; a++) {
          this.beginDraw();
          this.balls[a].move();
        }
      }, 1000 / 50);
    },
    d() {
      this.begin(50);
    },
    beginDraw() {
      for (let j = 0; j <= this.balls.length - 1; j++) {
        for (let k = j + 1; k <= this.balls.length - 1; k++) {
          this.drawline(this.balls[j], this.balls[k]);
        }
      }
    },
  },
  mounted() {
    this.canvasWidth = Math.floor(document.body.clientWidth);
    this.canvasHeight = Math.ceil(document.body.clientHeight);
    window.onresize = () => {
      this.canvasWidth = Math.floor(document.body.clientWidth);
      this.canvasHeight = Math.ceil(document.body.clientHeight);
    };
    var c = document.getElementById("stage");
    this.ctx = c.getContext("2d");
    this.begin(40);
  },
};
</script>

<style lang="stylus" scoped>
#stage {
  position: fixed;
  width: 100vw;
  height: 100vh;
  /* 水平居中 */
  left: 0;
  /* 垂直居中 */
  top: 0;
  pointer-events: none;
}
</style>
