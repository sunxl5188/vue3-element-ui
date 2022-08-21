<template>
  <div>
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span>Card name</span>
          <el-button class="button" text>Operation button</el-button>
        </div>
      </template>
      <div v-for="o in 4" :key="o" class="text item">
        {{ "List item " + o }}
      </div>
    </el-card>
  </div>
</template>

<script lang="ts">
import { ref } from "vue";

export default {
  setup() {
    const girl = ref(["大脚", "小闫", "小妹"]);
    const selectGirl = ref("");
    const girlFun = ref((e: any) => {
      // selectGirl.value = girl.value[index];
      console.log(e.target.dataset.id);
      console.log(e);
    });
    return {
      girl,
      selectGirl,
      girlFun,
    };
  },
};
</script>
