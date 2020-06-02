# checkbox

## 基础用法
<ClientOnly>
<f-demo code='
   <if-input v-model="ms"></if-input>'>
<f-checkbox type='1'/>
</f-demo>
</ClientOnly >

## 组合使用
<ClientOnly>
<f-demo code='
   <if-input v-model="ms"></if-input>'>
<f-checkbox type='2'/>
</f-demo>
</ClientOnly >

## 不可使用
<ClientOnly>
<f-demo code='
   <if-input v-model="ms"></if-input>'>
<if-checkbox label='不可用' disabled/>
<f-checkbox type='3'/>
</f-demo>
</ClientOnly >