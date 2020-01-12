module.exports = {
    title: 'YATING',//网站名称
    description: '用心写代码，不辜负程序员之名',//网站描述
    //head标签
    head: [
        ['link', { rel: 'icon', type:"image/x-icon", href: '/img/logo.ico' }],
        ['script', { src: 'https://cdn.bootcss.com/jquery/3.4.1/jquery.js' }]
    ],
    themeConfig: {
        author:'tinger',
        headImg:'/img/yating.jpg',//头像
        //导航栏
        nav: [
            { text: '魚兒', link: '/' },
            { text: '目次',link:'/catalog'},
            { text: '遨游太空', link: '/connect' },
            { text: 'Github',type:'url', link: 'https://github.com/Chenyating' },
        ],
        catalogUrl:'/catalog',//必填
        lastUpdated: 'Last Updated',
        smoothScroll: true,
        pageNum:10,//目录每页显示条数
        live2dModel:'/live2d/model/poi/poi.model.json',//live2d模型路径
        //gitalk留言设置
        gitalk:{
            clientID: '5b8613cfe15e02db85b7',
            clientSecret: 'd4129094c33b8da73e873470fb89aea53dfaf396',
            githubName:'Chenyating'
        },
        footer:'粤ICP备案号：18150247号'
    },
    markdown: {
        lineNumbers: true
      },
    //   theme:'ting'
}