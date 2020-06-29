import ifresh from 'ifresh-ui';
import 'ifresh-ui/lib/ifresh-ui.css'
import VueHighlightJS from 'vue-highlightjs'
import 'highlight.js/styles/paraiso-light.css'
export default ({
    Vue, // VuePress 正在使用的 Vue 构造函数
    options, // 附加到根实例的一些选项
    router, // 当前应用的路由实例
    siteData // 站点元数据
}) => {
    Vue.use(ifresh)
    Vue.use(VueHighlightJS)

}