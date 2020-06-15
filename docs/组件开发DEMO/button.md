# Button

## 基础用法

<ClientOnly>
<f-demo code='
<if-button>Default</if-button>
<if-button type="primary">Primary</if-button>
<if-button type="dashed">Dashed</if-button>
<if-button type="info">Info</if-button>
<if-button type="success">Success</if-button>
<if-button type="warning">Warning</if-button>
<if-button type="error">Error</if-button>'>
<if-button>Default</if-button>
<if-button type="primary">Primary</if-button>
<if-button type="dashed">Dashed</if-button>
<if-button type="info">Info</if-button>
<if-button type="success">Success</if-button>
<if-button type="warning">Warning</if-button>
<if-button type="error">Error</if-button>
</f-demo>
</ClientOnly >

按钮类型有：`默认按钮`、`主按钮`、`虚线按钮`、`辅助按钮`以及四种颜色按钮。

通过设置`type`为`primary`、`dashed`、`text`、`info`、`success`、`warning`、`error`创建不同样式的按钮，不设置为默认样式。

## 幽灵风格

<ClientOnly>
<f-demo code='
<if-button ghost>Default</if-button>
<if-button type="primary" ghost>Primary</if-button>
<if-button type="dashed" ghost>Dashed</if-button>
<if-button type="info" ghost>Info</if-button>
<if-button type="success" ghost>Success</if-button>
<if-button type="warning" ghost>Warning</if-button>
<if-button type="error" ghost>Error</if-button>' :dark='true'>
<if-button ghost>Default</if-button>
<if-button type="primary" ghost>Primary</if-button>
<if-button type="dashed" ghost>Dashed</if-button>
<if-button type="info" ghost>Info</if-button>
<if-button type="success" ghost>Success</if-button>
<if-button type="warning" ghost>Warning</if-button>
<if-button type="error" ghost>Error</if-button>
</f-demo>
</ClientOnly >

幽灵按钮将其他按钮的内容反色，背景变为透明，常用在有色背景上。

## 按钮禁用

<ClientOnly>
<f-demo code='
<if-button >Default</if-button>
<if-button  disable>Default</if-button>
<if-button type="primary" >Primary</if-button>
<if-button type="primary" disable >Primary</if-button>'>
<if-button >Default</if-button>
<if-button  disable>Default</if-button>
<if-button type="primary" >Primary</if-button>
<if-button type="primary" disable >Primary</if-button>
</f-demo>
</ClientOnly >

通过添加disabled属性可将按钮设置为不可用状态。

## 图标按钮
<ClientOnly>
<f-demo code='
<if-button icon="fish" right></if-button>
<if-button icon="qq" right iconColor="#67b5ff">QQ</if-button>
<if-button icon="alipay" iconColor="#02a9f1" right>支付宝</if-button>
<if-button icon="wechat" iconColor="#1aad19" >微信</if-button>'>
<if-button icon="fish" right></if-button>
<if-button icon="qq" right iconColor="#67b5ff">QQ</if-button>
<if-button icon="alipay" iconColor="#02a9f1" right>支付宝</if-button>
<if-button icon="wechat" iconColor="#1aad19" >微信</if-button>
</f-demo>
</ClientOnly >
icon：icon名称，
iconColor：icon的颜色

## 加载按钮
<ClientOnly>
<f-demo code='
<if-button icon="loading"></if-button>
<if-button icon="loading">Loading……</if-button>
<if-button icon="loading" right>Loading……</if-button>
<if-button icon="loading" right iconColor="#2c3e50">Loading……</if-button>'>
<if-button icon="loading"></if-button>
<if-button icon="loading">Loading……</if-button>
<if-button icon="loading" right>Loading……</if-button>
<if-button icon="loading" right iconColor="#2c3e50">Loading……</if-button>
</f-demo>
</ClientOnly >

## 按钮组
<ClientOnly>
<f-demo code='
'>2个按钮：
<if-button-group icon="loading">
<if-button icon="left">prev</if-button>
<if-button icon="right" right>next</if-button>
</if-button-group>
<br/><br/>3个按钮：
<if-button-group icon="loading">
<if-button icon="qq" right iconColor="#67b5ff">QQ</if-button>
<if-button icon="wechat" iconColor="#1aad19" >微信</if-button>
<if-button icon="alipay" iconColor="#02a9f1" right>支付宝</if-button>
</if-button-group>
<br/><br/>4个不同类型按钮：
<if-button-group icon="loading">
<if-button type='primary' icon="left" iconColor="#ffffff">prev</if-button>
<if-button type="dashed" ghost>middle1</if-button>
<if-button type="error">middle2</if-button>
<if-button type="info" icon="right" right iconColor="#ffffff">next</if-button>
</if-button-group>
</f-demo>
</ClientOnly >

