const path = require('path')
module.exports = {
    theme: path.resolve(__dirname, '../../ting/'),
    title: '雅婷的世界哦～', //网站名称
    description: '用心写代码，不辜负程序员之名', //网站描述
    //head标签
    head: [
        ['link', {
            rel: 'icon',
            type: "image/x-icon",
            href: '/img/logo.ico'
        }]
    ],
    themeConfig: {
        author: '雅婷',
        headImg: '/img/yating.jpeg', //头像
        lastUpdated: 'Last Updated',
        smoothScroll: true,
        live2dModel: '/live2d/model/poi/poi.model.json', //live2d模型路径
    },
    markdown: {
        lineNumbers: true
    },
    // theme: 'ting',
    port: 1234
}