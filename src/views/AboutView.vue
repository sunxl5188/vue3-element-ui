<template>
  <div class="about">
    <h1>This is an about page</h1>
    <MyListVue :title="{ a: '11111' }"></MyListVue>
  </div>
</template>

<script lang="ts">
import { reactive, toRefs } from "vue";
import MyListVue from "./MyList.vue";

export default {
  components: {
    MyListVue,
  },
  setup() {
    const state = reactive({
      count: 0,
    });

    return {
      ...toRefs(state),
    };
  },
};
</script>

<style lang="scss" scoped></style>
