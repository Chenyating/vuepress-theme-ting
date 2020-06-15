# Tag

## 基础用法
<ClientOnly>
<f-demo code='
   <if-input v-model="ms"></if-input>'>
<if-tag>标签一</if-tag>
<if-tag color='pink'>标签二</if-tag>
<if-tag color='#7aaac6'>标签三</if-tag>
</f-demo>
</ClientOnly >

## 点样式
<ClientOnly>
<f-demo code='
   <if-input v-model="ms"></if-input>'>
<if-tag dot>标签一</if-tag>
<if-tag dot color='pink'>标签二</if-tag>
<if-tag dot color='#7aaac6'>标签三</if-tag>
</f-demo>
</ClientOnly >

## 颜色填充
<ClientOnly>
<f-demo code='
   <if-input v-model="ms"></if-input>'>
<if-tag fill>标签一</if-tag>
<if-tag fill color='pink'>标签二</if-tag>
<if-tag fill dot color='#7aaac6'>标签三</if-tag>
</f-demo>
</ClientOnly >

## 可关闭
<ClientOnly>
<f-demo code='
   <if-input v-model="ms"></if-input>'>
<if-tag closable>标签一</if-tag>
<if-tag closable dot color='#7aaac6'>标签三</if-tag>
<if-tag fill closable color='pink'>标签二</if-tag>
<if-tag fill closable dot color='#7aaac6'>标签三</if-tag>
</f-demo>
</ClientOnly >