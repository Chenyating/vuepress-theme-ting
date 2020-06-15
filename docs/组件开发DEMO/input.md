# Input

## 基础用法
<ClientOnly>
<f-demo code='
   <if-input v-model="ms"></if-input>'>
<f-input/>
</f-demo>
</ClientOnly >

## 只读
<ClientOnly>
<f-demo code=''>
<if-input readonly value='这段话你只能读的说'/>
<if-input type="textarea" readonly value='这段话只能只读'/>
</f-demo>
</ClientOnly >

## 可删除用法
<ClientOnly>
<f-demo code='
   <if-input clearable></if-input>'>
<if-input clearable/>
<if-input type="textarea" clearable/>
</f-demo>
</ClientOnly >

## 不可填写
<ClientOnly>
<f-demo code='
   <if-input disabled></if-input>'>
<if-input disabled/>
<if-input type="textarea" disabled/>
</f-demo>
</ClientOnly >

## 带icon的输入框
<ClientOnly>
<f-demo code='
 <if-input icon="apple"/>
<if-input>
   <if-icon type="alipay" slot="preIcon" size="20"/>
</if-input>
<if-input>
   <if-icon type="wechat" slot="nextIcon" size="20"/>
</if-input>
<if-input>
   <if-icon type="qq" slot="preIcon" size="20"/>
   <if-icon type="true" slot="nextIcon" size="20"/>
</if-input>'>
<if-input type='password' icon="eye"/>
<if-input>
   <if-icon type="alipay" color='dark' slot="preIcon" size="20"/>
</if-input>
<if-input>
   <if-icon type="wechat" slot="nextIcon" size="20"/>
</if-input>
<br/><br/>
<if-input>
   <if-icon type="qq" slot="preIcon" size="20"/>
   <if-icon type="true" slot="nextIcon" size="20"/>
</if-input>
</f-demo>
</ClientOnly >

## 输入长度限制
<ClientOnly>
<f-demo code='
   <if-input maxlength="20"/>'>
<if-input maxlength="20"/><br/><br/>
<if-input maxlength="20" type="textarea"/>
</f-demo>
</ClientOnly >

## 文本域
<ClientOnly>
<f-demo code='
   <if-input maxlength="20"/>'>
<if-input type="textarea"/>
<if-input type="textarea" rows='2' cols='20'/>
<if-input type="textarea" rows='2' cols='20' maxlength="20"/>
</f-demo>
</ClientOnly >

## 文本域
<ClientOnly>
<f-demo code='
   <if-input maxlength="20"/>'>
<if-input type="password"/>
</f-demo>
</ClientOnly >
