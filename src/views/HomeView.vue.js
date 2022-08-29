import {
  reactive,
  toRefs,
  onBeforeMount,
  onMounted,
  onUnmounted,
  onBeforeUpdate,
  onUpdated,
  onBeforeUnmount,
  onErrorCaptured,
  defineComponent,
} from "vue";
export default defineComponent({
  setup() {
    console.log("1-开始创建组件-----setup()");
    const data = reactive({
      girl: ["大脚", "小闫", "小妹"],
      selectGirl: "",
      girlFun: (id) => {
        data.selectGirl = data.girl[id];
      },
    });
    const refData = toRefs(data);
    onBeforeMount(() => {
      console.log("2-组件挂载到页面之前执行-----onBeforeMount");
    });
    onMounted(() => {
      console.log("3-组件挂载到页面之后执行-----onMounted");
    });
    onUnmounted(() => {
      console.log("7-在组件实例被卸载之后执行-----onUnmounted");
    });
    onBeforeUpdate(() => {
      console.log("5-组件状态变更而更新其 DOM 树之前执行===>onBeforeUpdate");
    });
    onUpdated(() => {
      console.log("6-组件更新后调用---onUpdated");
    });
    onBeforeUnmount(() => {
      console.log("4-组件实例被卸载之前调用--->onBeforeUnmount");
    });
    onErrorCaptured((err) => {
      console.log("捕获了后代组件传递的错误时调用", err);
    });
    return {
      ...refData,
    };
  },
});
//# sourceMappingURL=HomeView.vue.js.map
