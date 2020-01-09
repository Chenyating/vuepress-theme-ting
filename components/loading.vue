<template>
<div class="loading">
    <div>
        <div class="loader"></div>
        <div class="text">正在加载中~</div>
    </div>
</div>
</template>

<style>
@keyframes typing {
    from {
        width: 0;
    }
}

.text {
    margin-top:2em;
    width: 7em;
    position: absolute;
    font-weight: bold;
    overflow: hidden;
    white-space: nowrap;
    border-right: 0.1em solid;
    animation: typing 5s steps(16) infinite;
}

.loading {
    width: 100%;
    height: 100%;
    left: 0;
    background: #c4deaa;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 11111;
    position: fixed;
}

.loader {
    position: relative;
    width: 5em;
    height: 5em;
    transform: rotate(165deg);
}

.loader:before,
.loader:after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    display: block;
    width: 1em;
    height: 1em;
    border-radius: 0.25em;
    transform: translate(-50%, -50%);
}

.loader:before {
    animation: before 2s infinite;
}

.loader:after {
    animation: after 2s infinite;
}

@keyframes before {
    0% {
        width: 1em;
        box-shadow: 2em -1em rgba(225, 20, 98, 0.75), -2em 1em rgba(111, 202, 220, 0.75);
    }

    35% {
        width: 5em;
        box-shadow: 0 -1em rgba(225, 20, 98, 0.75), 0 1em rgba(111, 202, 220, 0.75);
    }

    70% {
        width: 1em;
        box-shadow: -2em -1em rgba(225, 20, 98, 0.75), 2em 1em rgba(111, 202, 220, 0.75);
    }

    100% {
        box-shadow: 2em -1em rgba(225, 20, 98, 0.75), -2em 1em rgba(111, 202, 220, 0.75);
    }
}

@keyframes after {
    0% {
        height: 1em;
        box-shadow: 1em 2em rgba(61, 184, 143, 0.75), -1em -2em rgba(233, 169, 32, 0.75);
    }

    35% {
        height: 5em;
        box-shadow: 1em 0 rgba(61, 184, 143, 0.75), -1em 0 rgba(233, 169, 32, 0.75);
    }

    70% {
        height: 1em;
        box-shadow: 1em -2em rgba(61, 184, 143, 0.75), -1em 2em rgba(233, 169, 32, 0.75);
    }

    100% {
        box-shadow: 1em 2em rgba(61, 184, 143, 0.75), -1em -2em rgba(233, 169, 32, 0.75);
    }
}

.loader {}
</style>
