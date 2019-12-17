<template>
    <div v-if="ifshow" id="gitalk-container">
    </div>
</template>
<script>
    import Gitalk from 'gitalk';
    import 'gitalk/dist/gitalk.css';

    export default {
        data() {
            return {
                ifshow: true
        }
        },
        mounted() {
            if (this.$site.themeConfig.gitalk) {
                var gitalk = {
                    clientID: this.$site.themeConfig.gitalk.clientID,
                    clientSecret: this.$site.themeConfig.gitalk.clientSecret,
                    repo: `${this.$site.themeConfig.gitalk.githubName}.github.io`,
                    owner: this.$site.themeConfig.gitalk.githubName,
                    admin: [`${this.$site.themeConfig.gitalk.githubName}`],
                    id: location.pathname, // Ensure uniqueness and length less than 50
                    distractionFreeMode: false // Facebook-like distraction free mode
                }
                var gitalk = new Gitalk(gitalk)
                gitalk.render('gitalk-container')
            }else {
                this.ifshow=false;
            }
        }
    }
</script>
 