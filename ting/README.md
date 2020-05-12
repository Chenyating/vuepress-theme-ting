# vuepress-theme-ting
[github项目](https://github.com/Chenyating/vuepress-theme-ting)
> 这是一个vuepress主题，主要功能有博客归档分类，以及留言，个人展示等；主题追求极简，根据 vuepress 的默认主题修改而成，官方的主题配置仍然适用；
这是一个看板娘小清新vuepress主题，主要功能有博客归档分类，以及留言，个人展示等；主题追求极简，根据 vuepress 的默认主题修改而成，官方的主题配置仍然适用；

## 预览地址
[预览地址](https://www.yating.online/)

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200512101419420.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2xlbWlzaQ==,size_16,color_FFFFFF,t_70)

## 版本
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


## 新增功能

### 默认换装看板娘2.x.x
自动换装88套衣服，琳琅满目~，截图不过来了。
- ![在这里插入图片描述](https://img-blog.csdnimg.cn/20200512094327396.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2xlbWlzaQ==,size_16,color_FFFFFF,t_70)![在这里插入图片描述](https://img-blog.csdnimg.cn/20200512094251815.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2xlbWlzaQ==,size_16,color_FFFFFF,t_70)![在这里插入图片描述](https://img-blog.csdnimg.cn/20200512094223485.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2xlbWlzaQ==,size_16,color_FFFFFF,t_70)![在这里插入图片描述](https://img-blog.csdnimg.cn/20200512094104514.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2xlbWlzaQ==,size_16,color_FFFFFF,t_70)![在这里插入图片描述](https://img-blog.csdnimg.cn/20200512101028930.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2xlbWlzaQ==,size_16,color_FFFFFF,t_70)

### 自定义看板娘
- 本主题支持看板娘，由于live2d读取模型文件，你可以选择自己喜欢的看板娘，在配置时填写路径就可以了。
如果你不喜欢默认的看板娘模型，可以在config.js里增加看板娘路径。
```
module.exports = {
    ……
    head: [
    ……
    ],
    themeConfig: {
 		……
        live2dModel: '/live2d/model/poi/poi.model.json', //live2d模型路径
        ……
    }
}
```
- 其他待补充

### 图灵对话机器人2.x.x
可以与机器人聊天，并且播放语音；
- ![在这里插入图片描述](https://img-blog.csdnimg.cn/2020051210373373.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2xlbWlzaQ==,size_16,color_FFFFFF,t_70)
#### 鸣谢
|支持者|支持内容|
|-|-|
|[mumudadi](https://github.com/mumudadi)|提供图灵机器人后台技术支持。|


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
npm i
```

- 目录结构
```
project
│ 
├─ docs
│
├─ package.json
│
└─  node_modules
```

---

## 配置
> 在docs目录下新建README.md、catalog.md、.vuepress文件夹；在.vuepress文件下新建config.js文件；

```
project
│ 
├─ docs
│   │
│   ├─ README.md
│   │
│   ├─ catalog.md
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
    description: '用心写代码，不辜负程序员之名',//网站描述
    themeConfig: {
        nav: [//导航栏
            { text: '主页', link: '/' },
            { text: '目录',link:'/catalog'}
        ],
        catalogUrl:'/catalog',//必填 目录路径
        lastUpdated: 'Last Updated',//必填：文章显示最新修改时间
    },
    theme:'ting'//必填：使用vuepress-theme-ting 主题
}
```

- README.md
```yaml
---
layout: index
title: Home
showMessage: false
---

# vuepress-theme-ting

> 如果你喜欢这个主题可以给我一个start，谢谢

## 欢迎使用
```

- catalog.md
```yaml
---
layout: catalog
---
layout:表示当前使用catalog页面；
title：md文件标题，注意：命名为Home本主题均自动忽略；

```

## 指令操作

- 本地预览
```
npm run dev
```

最终效果图如下：

- ![在这里插入图片描述](https://img-blog.csdnimg.cn/20200112231356298.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2xlbWlzaQ==,size_16,color_FFFFFF,t_70)![在这里插入图片描述](https://img-blog.csdnimg.cn/20200112231426474.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2xlbWlzaQ==,size_16,color_FFFFFF,t_70)

- 打包
```
npm run build
```


## 预览地址
[预览地址](https://www.yating.online/)

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200106225330395.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2xlbWlzaQ==,size_16,color_FFFFFF,t_70)

## 文档设置

md文档抬头以下列格式为例：
```yaml
---
layout: index
title: Home
showMessage: false
---
```

layout：默认值为空，为文章内容页
```yaml
catalog：表示当前页为目录页面；
index：表示为主页；
layout：默认文章内容（无需设置）
```

当前文章属性
```yaml
---
img:url
title：文章标题
showMessage：是否显示留言栏，侧边栏；默认为true
---
```

注意：文章的图片若保存在`.vuepress/public/img/hello.jpg`路径下，对应图片将在目录中展示；
则相应的，请将img的值设置为：`/img/hello.jpg`

对应图片效果为：
- ![在这里插入图片描述](https://img-blog.csdnimg.cn/20191217001346640.png)


## 注意
例如以下目录结构：
```
project
│ 
├─ docs
│   │
│   ├─ README.md
│   │
│   ├─ catalog.md
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

## 效果图
### 主页
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200106225330395.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2xlbWlzaQ==,size_16,color_FFFFFF,t_70)

### 目录
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200106225600826.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2xlbWlzaQ==,size_16,color_FFFFFF,t_70)

### 内容
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200106225521690.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2xlbWlzaQ==,size_16,color_FFFFFF,t_70)

### 其他
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200106225644433.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2xlbWlzaQ==,size_16,color_FFFFFF,t_70)

### 手机端预览效果
- ![在这里插入图片描述](https://img-blog.csdnimg.cn/20191217001515195.png)![在这里插入图片描述](https://img-blog.csdnimg.cn/2019121700154317.png)![在这里插入图片描述](https://img-blog.csdnimg.cn/20191217001553253.png)![在这里插入图片描述](https://img-blog.csdnimg.cn/20191217001614921.png)

## 全部配置
```js
// .vuepress/config.js
module.exports = {
 title: 'YATING',//网站名称
    description: '用心写代码，不辜负程序员之名',//网站描述
    //head标签
    head: [
        ['link', { rel: 'stylesheet', href: '/img/logo.ico' }],//注意"/"就是public资源目录。标签的logo
        ['script', { src: 'https://cdn.bootcss.com/jquery/3.4.1/jquery.js' }]
    ],
    themeConfig: {
        author:'tinger',
        headImg:'https://yating.online/res/img/yating.jpg',//选填：头像
        //导航栏
        nav: [
            { text: '主页', link: '/' },
            { text: '目录',link:'/config/catalog'},
            { text: '项目列表', link: '/config/about' },
            { text: 'Github',type:'url', link: 'https://github.com/Chenyating' },
        ],
        catalogUrl:'/catalog',//必填 目录路径
        lastUpdated: 'Last Updated',//必填：文章显示最新修改时间
        smoothScroll: true,//选填
        //选填/live2d模型路径
        live2dModel:'/live2d/model/poi/poi.model.json',
        pageNum:5,//选填：目录每页显示条数
        gitalk:{//选填：gitalk留言设置
            clientID: '5b8613cfe15e02db85b7',
            clientSecret: 'd4129094c33b8da73e873470fb89aea53dfaf396',
            repo: 'Chenyating.github.io',
            owner: 'chenyating',
            admin: ['Chenyating'],
            distractionFreeMode: false // Facebook-like distraction free mode
        },
        footer:'粤ICP备案号：18150247号'//选填
    },
    theme:'ting'//必填：使用vuepress-theme-ting 主题
}
```

## 感谢阅读
如果你喜欢这个主题，请给我一个start，给予我一个鼓励吧~蟹蟹~
[github项目](https://github.com/Chenyating/vuepress-theme-ting)


## 其他
如果你在使用过程中遇到什么问题，可以与我联系，记得给我个start哟~