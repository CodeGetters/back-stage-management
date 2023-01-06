<template>
  <div>后台首页</div>
  {{ $store.state.user }}
</template>

<script setup>
// Element-plus
import {toast} from '../composables/util.js';
import {ElNotification} from 'element-plus';

</script>