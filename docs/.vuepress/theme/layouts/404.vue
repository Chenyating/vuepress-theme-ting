<template>
<div class="notfound-box">
    <tingNav />
    <div class="tip-info">
        <img class="notfound-icon" src="../public/icon/fish.png" />
        404 你想要的我给不了
    </div>
    <canvas id="stage" :width="canvasWidth" :height="canvasHeight"></canvas>
</div>
</template>

<script>
function betweenRandom(min, max) {
    return Math.random() * (max - min) + min;
}
var acolor = ["#c9e5ac", "#d7eef9", "#fcec91", "#ebf5f9", "#87c095"];
var mouseX = -500,
    mouseY = -500;

function getMouseXY() {
    $("#stage").mousemove(function (e) {
        mouseX = e.clientX || 0;
        mouseY = e.clientY || 0;
    })
}
// 创建一个球的构造函数
function mother(maxWidth, maxHeight, ctx) {
    this.ctx = ctx;
    this.maxWidth = maxWidth;
    this.maxHeight = maxHeight;
}
// 创建方法
mother.prototype = {
    // 配置
    // -pi<=t<=pi 或 0<=t<=2*pi
    // x=a*(2*cos(t)-cos(2*t))
    // y=a*(2*sin(t)-sin(2*t))
    // 心形坐标
    // 半径为a
    init: function () {
        // 随机配置
        // this.x = betweenRandom(0, this.maxWidth);
        // this.y = betweenRandom(0, this.maxHeight);
        this.t = (betweenRandom(0, 360) / 180) * Math.PI;
        this.r = betweenRandom(1, 10);
        this.x = 50 * (2 * Math.cos(this.t) - Math.cos(2 * this.t)) + (this.maxWidth / 2);
        this.y = 50 * (2 * Math.sin(this.t) - Math.sin(2 * this.t)) + (this.maxHeight / 2);
        this.beiyongR = this.r;
        this.color = acolor[Math.floor(betweenRandom(0, 5))];
        this.vx = betweenRandom(-1, 1);
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
        // 在鼠标周围就放大
        if (this.x - this.r < 0 || this.x + this.r > this.maxWidth) {
            this.vx = -this.vx;
        }
        if (this.y - this.r < 0 || this.y + this.r > this.maxHeight) {
            this.vy = -this.vy;
        }
        var distance = Math.sqrt((mouseX - this.x) ** 2 + (this.y - mouseY) ** 2)

        //心形2 快速
        var dlta_x = this.x - mouseX
        var dlta_y = this.y - mouseY
        var a = 12500 * 4
        var jiange = 500 * 4

        var distance = 5 * (dlta_x ** 2) + 6 * Math.abs(dlta_x) * (dlta_y) + 5 * (dlta_y ** 2)
        if (distance < a - jiange) {
            for (var i = 0; i < 10; i++) {
                this.x += this.vx;
                this.y += this.vy;
            }
            if (this.r < 50) {
                this.r++
            }
        } else if (distance > a + jiange) {
            this.x += this.vx;
            this.y += this.vy;
            if (this.r > this.beiyongR) {
                this.r--
            }
        } else {
            if (this.r > 15) {
                this.r--;
            }
        }
        this.draw()
    }
}

import tingNav from "../components/tingNav.vue";
export default {
    components: {
        tingNav
    },
    data() {
        return {
            ctx: null,
            canvasWidth: null,
            canvasHeight: null,
            balls: []
        };
    },
    methods: {
        begin(num) {
            for (let i = 0; i < num; i++) {
                var qiu = new mother(this.canvasWidth, this.canvasHeight, this.ctx);
                qiu.init();
                qiu.draw();
                this.balls.push(qiu);
            }
            setInterval(() => {
                this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
                for (const item of this.balls) {
                    item.move();
                }
            }, 1000 / 60);
        }
    },
    mounted() {
        this.canvasWidth = document.body.offsetWidth;
        this.canvasHeight = screen.height;
        console.log(this.canvasHeight, "|||")
        var c = document.getElementById("stage");
        this.ctx = c.getContext("2d");
        this.begin(100);
    }
};
</script>

<style lang="stylus" scoped>
.notfound-icon {
    width 40px;
    height 40px;
}

.tip-info {
    position: absolute;
    margin: 0 auto;
    width 1.5em;
    /*水平居中*/
    left: 0;
    right: 0;
    /*垂直居中*/
    top: 0;
    bottom: 0;
    font-weight bold;
    color #87c095;
    text-align center;
    font-size 1.5em;
    text-shadow: 0px 0px 10px white;
    z-index 9;
    writing-mode: vertical-lr;
    /*从左向右 从右向左是 writing-mode: vertical-rl;*/
    writing-mode: tb-lr;
    text-align center;
    letter-spacing 10px;
}

#stage {
    position fixed;
    max-width 900px;
    width 100%;
    display block;
    z-index -1;
    /*水平居中*/
    left: 0;
    right: 0;
    /*垂直居中*/
    top: 0;
    bottom: 0;
    margin 0 auto;
}
</style>
