// themePath/index.js
const moment = require('moment');

module.exports = {
    navbar: true,
    extend: '@vuepress/theme-default',
    plugins: ['@vuepress/nprogress', '@vuepress/blog', { '@vuepress/back-to-top': true },
        ['@vuepress/search', {
            searchMaxSuggestions: 10
        }],
        ['@vuepress/last-updated',
            {
                transformer: (timestamp, lang) => {
                    // 不要忘了安装 moment
                    const moment = require('moment')
                    moment.locale(lang)
                    return moment(timestamp).format('LL');
                }
            }
        ],
    ]
}