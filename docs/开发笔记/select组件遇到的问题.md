# select组件遇到的问题

思路：单选跟多选，就是radio跟checkbox的结合体；

条件判断，是否可以多选。
## z-index 

失效的原因：
1. 父级元素position可能是relative，或者是没有position；
2. 元素存在float属性

解决办法：
1. position设置部位relative
2. 去掉float，清除浮动，浮动元素设置position；
3. overflow设置为auto；

## tabindex 
按tab建的时候顺序触发,可以有blur事件跟focus事件；

## 展示
1. 显示项目（已经选中的框）（框）
2. 下拉列表项目（已选中项的状态）

## .sync 就是一个语法糖
```html
<parent @click="father()">点击以后子组件出现</parent>
<children :hehe.sync='ifshow' v-if="ifshow"/>

<!-- children -->
<div @click="children">点击以后子组件消失</div>
```

- 子向父传参数，通常我都是这么写的：
```
this.$emit('funcName','false')

<children @eventName='funcName'>

funcName(value){
    this.ifshow=value
}
```

- 但其实可以这么写：

```
this.$emit('update:Name','false')

<children @update:Name='towho'>

等同于=>@update：Name=function(value){towho=value}

等同于=>@update:Name=value=>towho=value

等同于=>:Name.sync=towho

<children :Name.sync='towho'/>
```
