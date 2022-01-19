const path = require('path')
var gitalkConfig = require('./config/gitalk.js')
var author = require('./config/author.js')

module.exports = {
    theme: path.resolve(__dirname, '../../ting/'),
    title: 'word', //网站名称
    //head标签
    head: [
        ['link', {
            rel: 'icon',
            type: "image/x-icon",
            href: '/img/logo.ico'
        }]
    ],
    themeConfig: {
        lastUpdated: 'Last Updated',
        smoothScroll: true,
        author: author,
        live2dModel: '/live2d/tororo/tororo.model.json', //live2d模型路径
        gitalk:gitalkConfig,
        
    },
    markdown: {
        lineNumbers: true
    },
    // theme: 'ting',
    port: 1234
}