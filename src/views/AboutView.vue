<template>
  <div style="padding-top: 100px">
    <el-dropdown split-button type="primary" @click="handleClick">
      Dropdown List
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item>Action 1</el-dropdown-item>
          <el-dropdown-item>Action 2</el-dropdown-item>
          <el-dropdown-item>Action 3</el-dropdown-item>
          <el-dropdown-item>Action 4</el-dropdown-item>
          <el-dropdown-item>Action 5</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script lang="ts" setup>
import { Edit, Loading, ArrowDown } from "@element-plus/icons-vue";
import { ref, reactive } from "vue";

const pageSize = ref(10);
const currentPage = ref(1);
const endTime = ref();
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
