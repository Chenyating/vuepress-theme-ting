---
layout: index
---

# vuepress-theme-ting
[github项目](https://github.com/Chenyating/vuepress-theme-ting)
> 这是一个vuepress主题，主要功能有博客归档分类，以及留言，个人展示等；主题追求极简，根据 vuepress 的默认主题修改而成，官方的主题配置仍然适用；

## 预览地址
[预览地址](https://www.yating.world/)

## 版本

### 第三版：3.0.0
- 如果你喜欢当前页面的版本
```
npm i vuepress-theme-ting
```

### 第一版1.4.5
看板娘需在配置目录下设置路径。
- ![在这里插入图片描述](https://img-blog.csdnimg.cn/20200106225330395.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2xlbWlzaQ==,size_16,color_FFFFFF,t_70)

- 如果你喜欢最初风格的版本：为1.4.5
```
npm i vuepress-theme-ting@1.4.5
```

### 第二版2.x.x
- 支持默认换装看板娘
- 图灵对话机器人
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200512101419420.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2xlbWlzaQ==,size_16,color_FFFFFF,t_70)

```
npm i vuepress-theme-ting
```
UI风格我个人感觉还有待改进，我个人不是很喜欢哈哈哈~

最近在致力于编写一个小清新风格的ui组件库要运用到本主题中，所以进度会比较慢。

## 导语
> 你是否喜欢这个vuepress主题呢？`按照步骤来`，你也可以使用这样的主题哦。以下是具体的配置使用过程。

---

## 前期工作
> 新建项目project，在project下新建一个docs文件夹和一个package.json文件

- 文件目录
```
project
│
├─── docs
│
└─── package.json
```

- package.json内容
```json
{
  "name": "demo",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "directories": {
    "doc": "docs"
  },
  "scripts": {
    "dev": "vuepress dev docs",
    "build": "vuepress build docs"
  },
  "keywords": [],
  "author": "",
  "license": "ISC"
}
```

---

## 下载主题

```cmd
npm i vuepress-theme-ting
```

- 目录结构
```
project
│ 
├─ docs  //你放置md文档的地方
│
├─ package.json  //你的依赖包json
│
└─  node_modules   //依赖包
```

---

## 配置
> 在docs目录下新建README.md、.vuepress文件夹；在.vuepress文件下新建config.js文件；

```
project
│ 
├─ docs
│   │
│   ├─ README.md
│   │
│   │
│   └─.vuepress
│       │
│       └─config.js
│
├─ package.json
│
└─  node_modules
```

- config.js内容
```js
module.exports = {
    title: 'YATING',//网站名称
    themeConfig: {
        lastUpdated: 'Last Updated',//必填：文章显示最新修改时间
        smoothScroll: true,
    },
    theme:'ting'//必填：使用vuepress-theme-ting 主题
}
```
## 指令操作

- 本地预览
```
npm run dev
```

- 打包
```
npm run build
```


## 预览地址
[预览地址](https://www.yating.world/)

## 注意
例如以下目录结构：
```
project
│ 
├─ docs
│   │
│   ├─ README.md
│   │
│   └─.vuepress
│   │   │
│   │   └─config.js
│   └─ 你的文档
│
├─ package.json
│
└─  node_modules
```

## 全部配置
```js
// .vuepress/config.js
module.exports = {
    title: 'YATING',//网站名称
    //head标签
    head: [
        ['link', { rel: 'stylesheet', href: '/img/logo.ico' }],//注意"/"就是public资源目录。标签的logo
        ['script', { src: 'https://cdn.bootcss.com/jquery/3.4.1/jquery.js' }]
    ],
    themeConfig: {
        lastUpdated: 'Last Updated',//必填：文章显示最新修改时间
        smoothScroll: true,//选填
        //选填/live2d模型路径
        live2dModel:'/live2d/model/poi/poi.model.json',
        gitalk:{//选填：gitalk留言设置
            clientID: '5b8613cfe15e02db85b7',
            clientSecret: 'd4129094c33b8da73e873470fb89aea53dfaf396',
            repo: 'Chenyating.github.io',
            owner: 'chenyating',
            admin: ['Chenyating'],
            distractionFreeMode: false // Facebook-like distraction free mode
        },
        author :{
            name: "YaTing",
            description: '用心写代码，不辜负程序员之名', //网站描述
            headImg: '/img/yating.jpeg', //头像
            // 首页轮播描述信息
            infolist: [{
                txt: "做的小布丁",
                img: "/img/tutu.jpg"
            },
            {
                txt: "我做的",
                img: "/img/nuomizi.jpg"
            },
            {
                txt: "欢迎来我的世界哦",
            },
    ]
}
    },
    theme:'ting'//必填：使用vuepress-theme-ting 主题
}
```

## 感谢阅读
如果你喜欢这个主题，请给我一个start，给予我一个鼓励吧~蟹蟹~
[github项目](https://github.com/Chenyating/vuepress-theme-ting)


## 其他
如果你在使用过程中遇到什么问题，可以与我联系哟～