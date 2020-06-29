<template>
<if-form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
    <if-form-item label="Name" prop="name">
        <if-input v-model="formValidate.name" placeholder="Enter your name"></if-input>
    </if-form-item>
    <if-form-item label="E-mail" prop="mail">
        <if-input v-model="formValidate.mail" placeholder="Enter your e-mail"></if-input>
    </if-form-item>
    <if-form-item label="City" prop="city">
        <if-select v-model="formValidate.city" placeholder="Select your city">
            <if-option value="beijing">New York</if-option>
            <if-option value="shanghai">London</if-option>
            <if-option value="shenzhen">Sydney</if-option>
        </if-select>
    </if-form-item>
    <if-form-item label="Gender" prop="gender">
        <if-radio-group v-model="formValidate.gender">
            <if-radio label="male">Male</if-radio>
            <if-radio label="female">Female</if-radio>
        </if-radio-group>
    </if-form-item>
    <if-form-item label="Hobby" prop="interest">
        <if-checkbox-group v-model="formValidate.interest">
            <if-checkbox label="Eat"></if-checkbox>
            <if-checkbox label="Sleep"></if-checkbox>
            <if-checkbox label="Run"></if-checkbox>
            <if-checkbox label="Movie"></if-checkbox>
        </if-checkbox-group>
    </if-form-item>
    <if-form-item label="Desc" prop="desc">
        <if-input v-model="formValidate.desc" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="Enter something..."></if-input>
    </if-form-item>
    <if-form-item>
        <if-button type="primary" @click="handleSubmit('formValidate')">Submit</if-button>
        <if-button @click="handleReset('formValidate')" style="margin-left: 8px">Reset</if-button>
    </if-form-item>
    {{formValidate}}
</if-form>
</template>

<script>
export default {
    data() {
        return {
            formValidate: {
                name: '',
                mail: '',
                city: '',
                gender: '',
                interest: [],
                time: '',
                desc: ''
            },
            ruleValidate: {
                name: [{
                    required: true,
                    message: '名字不能为空！',
                    trigger: 'blur'
                }],
                mail: [{
                        required: true,
                        message: 'Mailbox cannot be empty',
                        trigger: 'blur'
                    },
                    {
                        type: 'email',
                        message: 'Incorrect email format',
                        trigger: 'blur'
                    }
                ],
                city: [{
                    required: true,
                    message: 'Please select the city',
                    trigger: 'change'
                }],
                gender: [{
                    required: true,
                    message: 'Please select gender',
                    trigger: 'change'
                }],
                interest: [{
                        required: true,
                        type: 'array',
                        min: 1,
                        message: 'Choose at least one hobby',
                        trigger: 'change'
                    },
                    {
                        type: 'array',
                        max: 2,
                        message: 'Choose two hobbies at best',
                        trigger: 'change'
                    }
                ],
                time: [{
                    required: true,
                    type: 'string',
                    message: 'Please select time',
                    trigger: 'change'
                }],
                desc: [{
                        required: true,
                        message: 'Please enter a personal introduction',
                        trigger: 'blur'
                    },
                    {
                        type: 'string',
                        min: 20,
                        message: 'Introduce no less than 20 words',
                        trigger: 'blur'
                    }
                ]
            }
        }
    },
    methods: {
        handleSubmit(name) {
            this.$refs[name].validate((valid) => {
                if (valid) {
                    console.log('yes')
                } else {
                    console.log('false')
                }
            })
        },
        handleReset(name) {
            this.$nextTick(()=>{
                this.formValidate = {
                    name: '',
                    mail: '',
                    city: '',
                    gender: '',
                    interest: [],
                    time: '',
                    desc: ''
                }
            })
        }
    }
}
</script>
