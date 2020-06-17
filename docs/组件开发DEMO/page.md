# Page

## 基础用法
<ClientOnly>
<f-demo code='
   <if-input v-model="ms"></if-input>'>
<if-page/><br/>
<if-page circular/>
</f-demo>
</ClientOnly >

## 每页数量
<ClientOnly>
<f-demo code='
   <if-input v-model="ms"></if-input>'>
<if-page show-sizer/>
</f-demo>
</ClientOnly >

## 显示总数
<ClientOnly>
<f-demo code='
   <if-input v-model="ms"></if-input>'>
<if-page show-total show-sizer/>
</f-demo>
</ClientOnly >

## 简单写法
<ClientOnly>
<f-demo code='
   <if-input v-model="ms"></if-input>'>
<if-page simple/>
</f-demo>
</ClientOnly >

## 简单混合写法
<ClientOnly>
<f-demo code='
   <if-input v-model="ms"></if-input>'>
<if-page simple show-total show-sizer/>
</f-demo>
</ClientOnly >