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
  animation: typing 5s steps(6) infinite ; 

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
</style>
