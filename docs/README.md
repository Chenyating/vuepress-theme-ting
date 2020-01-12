---
layout: index
showMessage: false
---
# vuepress-theme-ting

这是一个vuepress主题，主要功能有博客归档分类，以及留言，个人展示等；主题追求极简，根据 vuepress 的默认主题修改而成，官方的主题配置仍然适用；


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
            githubName:'Chenyating'
        },
        footer:'粤ICP备案号：18150247号'//选填
    },
    theme:'ting'//必填：使用vuepress-theme-ting 主题
}
```

## 感谢阅读
如果你喜欢这个主题，请给我一个start，给予我一个鼓励吧~蟹蟹~
[github主页](https://github.com/Chenyating)[github项目](https://github.com/Chenyating/Chenyating.github.io)


## 其他
如果你在使用过程中遇到什么问题，可以与我联系，记得给我个start哟~

## FAQ
- 看板娘问题：
本主题支持看板娘，由于live2d读取模型文件，必须同源，你可以选择自己喜欢的看板娘，在配置时填写路径就可以了。

- 其他待补充
