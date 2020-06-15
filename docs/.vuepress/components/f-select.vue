<template>
<div>
    <div v-if="type==1">
        {{model1}}
        <br /><br />
        <if-select v-model="model1" style="width:200px">
            <if-option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</if-option>
        </if-select>
    </div>
    <div v-if="type==2">
        {{model2}}
        <br /><br />
        <if-select v-model="model2" more style="width:200px">
            <if-option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</if-option>
        </if-select>
    </div>
    <div v-if="type==3">
        {{model1}}
        <br /><br />
        <if-select v-model="model1" disabled style="width:200px">
            <if-option value="不可选" disabled>不可选</if-option>
            <if-option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</if-option>
        </if-select>
    </div>
    <div v-if="type==4">
        {{model1}}
        <br /><br />
        <if-select v-model="model1" style="width:200px">
            <div slot="preIcon">
                <if-icon class="select-icon" type="home" size="20" />
            </div>
            <if-option value="不可选" disabled>不可选</if-option>
            <if-option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</if-option>
        </if-select>
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
            ifshow: false,
            cityList: [{
                    value: 'New York',
                    label: 'New111 York'
                },
                {
                    value: 'London',
                    label: 'London'
                },
                {
                    value: 'Sydney',
                    label: 'Sydney'
                },
                {
                    value: 'Ottawa',
                    label: 'Ottawa'
                },
                {
                    value: 'Paris',
                    label: 'Paris'
                },
                {
                    value: 'Canberra',
                    label: 'Canberra'
                }
            ],
            model1: 'Canberra',
            model2: ['New York']
        }
    }
}
</script>
