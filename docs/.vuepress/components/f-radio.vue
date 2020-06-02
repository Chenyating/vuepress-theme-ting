<template>
<div>
    <div v-if="type=='1'">
        <if-radio v-model="isTrue" label="QQ" />
        <br />
        <if-radio v-model="isTrue" label="QQ" icon='qq' iconColor='#1e9cf0' />
        <br />{{isTrue}}
    </div>
    <div v-if="type=='2'">
        <if-radio-group v-model="connect">
            <if-radio value="qq" label="QQ" />
            <if-radio value="wetchat" label="Wetchat" />
            <if-radio value="alipay" label="Alipay" />
        </if-radio-group>
        <br />{{connect}}
        <br /><br />
        <if-radio-group v-model="msg">
            <if-radio label="仙人掌" icon='fish' iconColor='pink' />
            <if-radio label="仙人球">仙人球</if-radio>
            <if-radio label="仙人柱" />
        </if-radio-group>
        <br />{{msg}}
    </div>
    <div v-if="type=='3'">
        <if-radio v-model="yes" disabled label="不可使用" />
        <if-radio v-model="no" disabled label="不可使用" />
    </div>
    <div v-if="type=='4'">
        <if-radio-group v-model="msg" type='button'>
            <if-radio label="仙人掌" icon='fish'/>
            <if-radio label="仙人球" disabled/>
            <if-radio label="仙人柱" />
        </if-radio-group>
        <br />{{msg}}
    </div>
</div>
</template>

<script>
export default {
    props: {
        type: {
            type: String,
            default: '1'
        }
    },
    data() {
        return {
            isTrue: false,
            yes: true,
            no: false,
            connect: 'wetchat',
            msg: '仙人球',
        }
    },
    methods: {
        haha(e) {
            console.log(e, '???')
        }
    }
}
</script>
