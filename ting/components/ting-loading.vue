<template>
<transition name="fade">
    <div class="loading">
        <p class="my-name ">
            <span>
                {{$site.themeConfig.author}}
            </span><br />
        </p>
        <span class="text">正在加载中~</span>
    </div>
</transition>
</template>

<style lang="stylus" scoped>
.fade-enter-active,
.fade-leave-active {
    transition: opacity .5s;
}

.fade-enter,
.fade-leave-to {
    opacity: 0;
}

.my-name {
    position: absolute;
    text-transform: uppercase;
    letter-spacing: 0.5em;
    padding: 1.5em 0em;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    margin: 0 auto;
    text-align: center;
    z-index -1;
    font-size 2em;
    display: flex;
    justify-content: center;
    align-items: center;

    span {

        font: 700 4em/1 "Oswald", sans-serif;
        letter-spacing: 0;
        padding: .25em 0 .325em;
        display: block;
        margin: 0 auto;
        text-shadow: 0 0 80px rgba(255, 255, 255, .5);

        /* Clip Background Image */

        background: url(http://f.cl.ly/items/010q3E1u3p2Q0j1L1S1o/animated_text_fill.png) repeat-y;
        -webkit-background-clip: text;
        background-clip: text;

        /* Animate Background Image */

        -webkit-text-fill-color: transparent;
        -webkit-animation: aitf 80s linear infinite;

        /* Activate hardware acceleration for smoother animations */

        -webkit-transform: translate3d(0, 0, 0);
        -webkit-backface-visibility: hidden;
    }
}

/* Animate Background Image */

@-webkit-keyframes aitf {
    0% {
        background-position: 0% 50%;
    }

    100% {
        background-position: 100% 50%;
    }
}

@keyframes typing {
    from {
        width: 0;
    }
}

.text {
    margin-top: 2em;
    width: 7em;
    position: absolute;
    font-weight: bold;
    overflow: hidden;
    white-space: nowrap;
    border-right: 0.1em solid;
    animation: typing 5s steps(16) infinite;
    margin-top 100px;
}

.loading {
    width: 100%;
    height: 100%;
    left: 0;
    background: #d7e2d2;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 11111;
    position: fixed;
}
</style>
