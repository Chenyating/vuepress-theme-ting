const path = require('path')
var gitalkConfig = require('./config/gitalk.js')
var navConfig = require('./config/nav.js')
module.exports = {
    port: '1234',
    theme: path.resolve(__dirname, '../../ting/'),
    title: 'YATING', //网站名称
    description: '用心写代码，不辜负程序员之名', //网站描述
    //head标签
    head: [
        ['link', { rel: 'icon', type: "image/x-icon", href: '/img/logo.ico' }],
        ['script', { src: 'https://cdn.bootcss.com/jquery/3.4.1/jquery.js' }]
    ],
    themeConfig: {
        author: '雅婷',
        headImg: '/img/yating.jpg', //头像
        //导航栏
        nav: navConfig,
        catalogUrl: '/catalog', //必填
        lastUpdated: 'Last Updated',
        smoothScroll: true,
        pageNum: 10, //目录每页显示条数
        // live2dModel: '/live2d/model/poi/poi.model.json', //live2d模型路径
        //gitalk留言设置
        gitalk: gitalkConfig,
        footer: '粤ICP备案号：18150247号'
    },
    markdown: {
        lineNumbers: true
    },
    // theme: 'ting'
}