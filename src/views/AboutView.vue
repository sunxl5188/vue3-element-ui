<template>
  <div style="padding-top: 100px">
    <el-button type="primary" @click="handleClick">Primary</el-button>
    <div
      style="width: 500px; height: 400px"
      id="aa"
      v-loading="loading"
      element-loading-text="数据加载中"
      element-loading-spinner=""
      element-loading-background="rgba(0,0,0,0.2)"
    ></div>
  </div>
</template>

<script lang="ts" setup>
import { Edit, Loading, ArrowDown } from "@element-plus/icons-vue";
import { ElMessage, ElMessageBox, ElLoading } from "element-plus";
import { ref, reactive, h } from "vue";

const pageSize = ref(10);
const activeName = ref("1");
const loading = ref(true);
const textarea = ref(0);
const filterMethod = (e) => {
  console.log(e);
};
const sizeChange = (e) => {
  pageSize.value = e;
};

const handleClick = (e) => {
  console.log(e);
};
const handleChange = (e) => {
  console.log(e);
};

const activities = [
  {
    content: "Event start",
    timestamp: "2018-04-15",
  },
  {
    content: "Approved",
    timestamp: "2018-04-13",
  },
  {
    content: "Success",
    timestamp: "2018-04-11",
  },
];
</script>

<style lang="scss" scoped></style>
