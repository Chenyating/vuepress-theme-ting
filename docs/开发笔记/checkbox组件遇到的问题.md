# checkbox组件遇到的问题

1. 跟radio性质差不多。

2. 当为checkbox组的时候，值的类型为array；

3. 判断当单个值的时候。
先判断value是否存在，再判断是否为boolean，选中取反。值为label；

## 修改样式
checkbox`无法直接改变样式`只能通过连接到`label标签`来改变checkbox的样式.

> 当点击的有for属性的label标签时，对应的Checkbox复选框会被选中。这意味着，我们可以通过label的点击事件来处理我们的Checkbox复选框。

```html
    <input type="checkbox" :id="id"/>
    <label :for="id">{{label}}</label>
```

原来input[type=checkbox] 要隐藏掉；
对label做样式修改；
```css
    input[type=checkbox] {
        display: none;
    }

    label {
        cursor: pointer;
    }

    label:before {
        content: '';
        display: inline-block;
        vertical-align: middle;
        width: 30px;
        height: 20px;
        background: @white;
        line-height: 20px;
        cursor: pointer;
        /*改变复选框的边框颜色也可以不要边框*/
        border: solid 2px @c-light-primary;
        border-top: 0;
        border-bottom: 0;
        border-radius: 20px;
    }

    input:checked+label:before {
        /*before为伪元素可以在元素之后添加内容*/
        display: inline-block;
        /*	css3中的content字符编码*/
        content: "\2618";
        /*	复选框里面的&radic;居中*/
        text-align: center;
        /*	复选框里面的&radic;大小*/
        font-size: 20px;
        /*	字体的颜色*/
        color: @c-primary;
        /*  复选框勾选后的背景颜色*/
    }
```

## 全选和反选(待解决)
这个要怎么解决？
1. 在checkbox-group里
2. 在checkbox-group外面