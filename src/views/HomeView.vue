<template>
  <div @click="data.girlFun($event)">
    <el-button v-for="(o, index) in data.girl" :key="o" type="primary">
      <div :data-id="index">{{ "List item " + o }}</div>
    </el-button>
    <h6>{{ data.selectGirl }}</h6>
  </div>
</template>

<script lang="ts">
import {
  reactive,
  onBeforeMount,
  onMounted,
  onUnmounted,
  onBeforeUpdate,
  onUpdated,
} from "vue";

export default {
  setup() {
    console.log("1-开始创建组件-----setup()");
    const data = reactive({
      girl: ["大脚", "小闫", "小妹"],
      selectGirl: "",
      girlFun: (e: any) => {
        data.selectGirl = data.girl[e.target.dataset.id];
      },
    });
    onBeforeMount(() => {
      console.log("2-组件挂载到页面之前执行-----onBeforeMount");
    });
    onMounted(() => {
      console.log("3-组件挂载到页面之后执行-----onMounted");
    });
    onUnmounted(() => {
      console.log("4-在组件实例被卸载之后执行-----onUnmounted");
    });
    onBeforeUpdate(() => {
      console.log("5-组件状态变更而更新其 DOM 树之前执行===>onBeforeUpdate");
    });
    onUpdated(() => {
      console.log("6-组件更新后调用---onUpdated");
    });
    return {
      data,
    };
  },
};
</script>
