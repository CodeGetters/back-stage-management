<template>
  <el-row style="margin: 0" class="container">
    <el-col :md="12" :lg="12" class="left"
    >
      <div class="leftCon">
        <video src="../assets/video/login.mp4" autoplay loop muted></video>
      </div>
    </el-col>
    <el-col :md="12" :lg="12" class="right"
    >
      <h2>欢迎回来 程序猿</h2>
      <div class="greetText">
        <span class="line"></span>
        <span class="text">账号密码登录</span>
        <span class="line"></span>
      </div>
      <el-form
          ref="ruleFormRef"
          :model="ruleForm"
          status-icon
          :rules="rules"
          label-width="55px"
          class="demo-ruleForm"
      >
        <el-form-item label="用户名" prop="username">
          <el-input v-model="ruleForm.username" autocomplete="off">
            <template #prefix>
              <el-icon>
                <User/>
              </el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
              v-model="ruleForm.password"
              type="password"
              autocomplete="off"
              show-password
          >
            <template #prefix>
              <el-icon>
                <Lock/>
              </el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm(ruleFormRef)"
          >登录
          </el-button
          >
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>

<script setup lang="ts">

</script>

<style scoped>
@import url(../style/login.css);
</style>