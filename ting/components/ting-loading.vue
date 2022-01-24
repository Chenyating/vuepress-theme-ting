<template>
  <div class="loading">
    <div class="text">正在加载中</div>
  </div>
</template>
<style>
@keyframes typing {
  from {
    width: 0;
  }
}

.text {
  width: 6em;
  height: 1.2em;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
  overflow: hidden;
  white-space: nowrap;
  border-right: 0.1em solid;
  font-weight: bold;
  animation: typing 2s steps(6) infinite ; 

}

.loading {
  width: 100vw;
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 11111;
  pointer-events: none;
}
</style>
