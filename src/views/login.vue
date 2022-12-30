<template>
  <el-row :gutter="20" class="container">

    <el-col :span="18" class="left">
      <div class="welText">
        <h1>欢迎光临</h1>
        <span>Vite + Vue + Element-plus + Vue-Router + Less</span>
      </div>
    </el-col>

    <el-col :span="6" class="right">
      <h2>欢迎回来</h2>
      <span>账号密码登录</span>
      <el-form
          ref="ruleFormRef"
          :model="ruleForm"
          status-icon
          :rules="rules"
          label-width="120px"
          class="demo-ruleForm"
      >
        <el-form-item prop="uname">
          <el-input v-model="ruleForm.uname" autocomplete="off" placeholder="请输入账号"/>
        </el-form-item>
        <el-form-item prop="passwd">
          <el-input
              v-model="ruleForm.passwd"
              type="password"
              autocomplete="off"
              placeholder="请输入密码"
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm(ruleFormRef)"
          >登录
          </el-button
          >
          <!--          <el-button @click="resetForm(ruleFormRef)">注册</el-button>-->
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>

<script lang="ts" setup>
import {reactive, ref} from 'vue'
import type {FormInstance} from 'element-plus'

const ruleFormRef = ref<FormInstance>()


// 账号
const username = (rule: any, value: string, callback: any) => {
  if (value === '') {
    callback(new Error('请输入账号'))
  } else {
    if (ruleForm.uname !== '') {
      if (!ruleFormRef.value) return
      ruleFormRef.value.validateField('uname', () => null)
    }
    callback()
  }
}

// 密码
const password = (rule: any, value: string, callback: any) => {
  if (value === '') {
    callback(new Error('请输入密码'))
  } else {
    if (ruleForm.passwd !== '') {
      if (!ruleFormRef.value) return
      ruleFormRef.value.validateField('passwd', () => null)
    }
    callback()
  }
}

// 校验规则
const ruleForm = reactive({
  uname: '',
  passwd: '',
})

const rules = reactive({
  username: [{validator: username, trigger: 'blur'}],
  password: [{validator: password, trigger: 'blur'}]
})
// 提交
const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
      console.log('登录成功!')
    } else {
      console.log('登录失败!')
      return false
    }
  })
}

</script>

<style lang="less" scoped>
.container {
  width: 100%;
  height: 100%;
  min-height: 100vh;

  .left {
    background-color: #0ea5e9;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    color: #fff;

    h1 {
      font-size: 3em;
      margin-bottom: 10px;
    }
  }

  .right {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;


  }
}
</style>