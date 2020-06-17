# radio组件遇到的问题

## 互斥问题
相同radio的name一致的时候可以实现互斥问题。

- name取名字：
```js
const now = Date.now();
let num = 0;
const radomName = () => {
    return `ifRadio_${now}_${num++}`
}
```

## radio-group互斥问题
可以用this.$parent.name来传给子组件。

1. 先判断外层this.$parent.name有没有存在；
2. 再判断内层组件有没有自己的name；

## value的变化。
1. 当存在一个组的时候，先判断一下是否存在value，value为null时，默认值为label，否则为value；
然后调用父级组件的方法
```js
    this.$parent.changeMethod(this.value==null?this.label:this.value)
```

2. 当单个radio时，判断是否存在value，value为null，默认值为label，否则为value；
```js
    this.value==null?this.label:this.value
```

## 样式问题

可以用label，用content来定义，有很多图标：utf-8。