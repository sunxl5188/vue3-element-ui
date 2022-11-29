<template>
  <el-config-provider :locale="locale">
    <nav>
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </nav>
    <router-view />
  </el-config-provider>
</template>
<script lang="ts">
import { ref, computed, defineComponent } from "vue";
import zhCn from "element-plus/dist/locale/zh-cn.mjs";
import en from "element-plus/dist/locale/en.mjs";

export default defineComponent({
  setup() {
    const language = ref("zh-cn");
    const locale = computed((): object =>
      language.value === "zh-cn" ? zhCn : en
    );
    return {
      locale,
    };
  },
});
</script>
<style lang="scss"></style>
