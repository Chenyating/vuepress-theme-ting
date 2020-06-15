<<<<<<< HEAD:ting/enhanceApp.js
// import ifresh from 'ifresh-ui';
// import 'ifresh-ui/lib/ifresh-ui.css'
=======
// 注册组件库
import VueHighlightJS from 'vue-highlightjs'
import ifresh from 'ifresh-ui';
import 'ifresh-ui/lib/ifresh-ui.css'
>>>>>>> ed411ff5ee20294f54c65447bb90a1422883d5f9:docs/.vuepress/enhanceApp.js


export default ({
    Vue, // VuePress 正在使用的 Vue 构造函数
    options, // 附加到根实例的一些选项
    router, // 当前应用的路由实例
    siteData // 站点元数据
}) => {
<<<<<<< HEAD:ting/enhanceApp.js
    // Vue.use(ifresh)
=======
    Vue.use(ifresh)
    Vue.use(VueHighlightJS)
>>>>>>> ed411ff5ee20294f54c65447bb90a1422883d5f9:docs/.vuepress/enhanceApp.js
}