<template>
<div>
    <div v-if="type=='1'">
        <if-checkbox v-model="isTrue" label="QQ" />
        <br />
        <if-checkbox v-model="isTrue" label="QQ" icon='qq' iconColor='#1e9cf0' />
        <br />{{isTrue}}
    </div>
    <div v-if="type=='2'">
        <if-checkbox-group v-model="connect">
            <if-checkbox value="qq" label="QQ" />
            <if-checkbox value="wetchat" label="Wetchat" />
            <if-checkbox value="alipay" label="Alipay" />
        </if-checkbox-group>
        <br />{{connect}}
        <br /><br />
        <if-checkbox-group v-model="msg">
            <if-checkbox label="仙人掌" icon='fish' iconColor='pink' />
            <if-checkbox label="仙人球">仙人球</if-checkbox>
            <if-checkbox label="仙人柱" />
        </if-checkbox-group>
        <br />{{msg}}
    </div>
    <div v-if="type=='3'">
        <if-checkbox v-model="ok" disabled label="CheckBox" />
        <br />{{isTrue}}
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
            ok: true,
            connect: ['qq'],
            msg: ['仙人掌'],
        }
    },
}
</script>
