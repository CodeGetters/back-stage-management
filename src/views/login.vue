<template>
  <el-row :gutter="20" class="login-container" style="margin:0">

    <el-col :lg="18" :md="12" class="left">
      <div class="welText">
        <h1>欢迎光临</h1>
        <span>Vite + Vue + Element-plus + Vue-Router + Less</span>
      </div>
    </el-col>

    <el-col :lg="6" :md="12" class="right">
      <h2>欢迎回来</h2>
      <div class="text-indent">
        <span class="text-inline"></span>
        <span>账号密码登录</span>
        <span class="text-inline"></span>
      </div>
      <el-form
          ref="ruleFormRef"
          :model="ruleForm"
          status-icon
          :rules="rules"
      >
        <el-form-item prop="username">
          <el-input v-model="ruleForm.username" placeholder="请输入用户名">
            <!--自动导入-->
            <template #prefix>
              <el-icon>
                <ElIconUser/>
              </el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
              v-model="ruleForm.password"
              type="password"
              show-password
              autocomplete="on"
              placeholder="请输入密码"
          >
            <!--自动导入-->
            <template #prefix>
              <el-icon>
                <ElIconLock/>
              </el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm"
          >登录
          </el-button
          >
          <!--<el-button @click="resetForm">注册</el-button>-->
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>

<script lang="ts" setup>

import {reactive, ref} from 'vue'
import type {FormInstance, FormRules} from 'element-plus'

const ruleFormRef = ref<FormInstance>(null)

const ruleForm = reactive({
  username: '',
  password: ''
})

// 验证规则
const rules = reactive<FormRules>({
  // 用户名
  username: [
    {
      // 必填
      required: true,
      message: '账号不能为空',
      // 失去焦点时触发
      trigger: 'blur'
    },
    {
      min: 3,
      max: 15,
      message: '用户名长度必须在 3-15 之间',
      trigger: 'blur'
    }
  ],
  // 密码
  password: [
    {
      // 必填
      required: true,
      message: '密码不能为空',
      // 失去焦点时触发
      trigger: 'blur'
    },
    {
      min: 6,
      max: 10,
      message: '密码长度必须在 3-10 之间',
      trigger: 'blur'
    }
  ]
})
const submitForm = () => {
  ruleFormRef.value.validate((isValid) => {
    console.log(isValid)
  })
}
</script>

<style lang="less" scoped>
.login-container {
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

    span {
      color: #d9d3d3;
    }
  }

  .right {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    h2 {
      font-size: 2em;
      color: #989494;
    }

    .text-indent {
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 15px 0;
      color: #d1d5db;

      span {
        margin: 0 5px;
      }

      .text-inline {
        height: 1px;
        width: 64px;
        background-color: #e5e7eb;
      }
    }

    .el-form {

      .el-button {
        width: 250px;
        border-radius: 25px;
        background-color: #0ea5e9;
      }

      .el-button:hover {
        background-color: #38bdf8;
        border: none;
      }
    }
  }
}
</style>