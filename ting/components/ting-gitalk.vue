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
                var gitalk = this.$site.themeConfig.gitalk;
                gitalk.id=location.pathname;
                var newgitalk = new Gitalk(gitalk)
                newgitalk.render('gitalk-container')
            }else {
                this.ifshow=false;
            }
        }
    }
</script>
<style scoped>
#gitalk-container{
    margin: 1em;
}
</style>
 