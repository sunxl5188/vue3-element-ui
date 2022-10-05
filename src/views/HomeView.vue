<template>
  <div>
    <el-button
      v-for="(o, index) in girl"
      :key="o"
      @click="girlFun(index)"
      type="primary"
    >
      <div :data-id="index">{{ "List item " + o }}</div>
    </el-button>
    <h6>{{ selectGirl }}</h6>
    <MyTable :source="source" :columns="columns" @onSelect="handleSelect">
      <template #status="{ row }">{{
        row.status === 1 ? "开启" : "关闭"
      }}</template>
    </MyTable>
  </div>
</template>

<script lang="ts">
import api from "@/api";
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
import MyTable from "@/components/MyTable.vue";

interface dataProps {
  girl: string[];
  selectGirl: string;
  girlFun: (index: number) => void;
  source: object[];
  columns: object[];
  handleSelect: (e: any) => void;
}

export default defineComponent({
  components: { MyTable },
  setup() {
    console.log("1-开始创建组件-----setup()");
    const data: dataProps = reactive({
      title: "我是了组件",
      girl: ["大脚", "小闫", "小妹"],
      selectGirl: "",
      girlFun: (id: number) => {
        data.selectGirl = data.girl[id];
      },
      source: [
        {
          id: 1,
          title: "标题1",
          status: 1,
          createTime: "2022-10-10 10:10:10",
        },
        {
          id: 1,
          title: "标题2",
          status: 2,
          createTime: "2022-10-10 10:10:10",
        },
        {
          id: 1,
          title: "标题3",
          status: 1,
          createTime: "2022-10-10 10:10:10",
        },
        {
          id: 1,
          title: "标题4",
          status: 1,
          createTime: "2022-10-10 10:10:10",
        },
        {
          id: 1,
          title: "标题5",
          status: 1,
          createTime: "2022-10-10 10:10:10",
        },
        {
          id: 1,
          title: "标题6",
          status: 1,
          createTime: "2022-10-10 10:10:10",
        },
        {
          id: 1,
          title: "标题7",
          status: 1,
          createTime: "2022-10-10 10:10:10",
        },
        {
          id: 1,
          title: "标题8",
          status: 1,
          createTime: "2022-10-10 10:10:10",
        },
        {
          id: 1,
          title: "标题9",
          status: 1,
          createTime: "2022-10-10 10:10:10",
        },
        {
          id: 1,
          title: "标题10",
          status: 1,
          createTime: "2022-10-10 10:10:10",
        },
        {
          id: 1,
          title: "标题1",
          status: 1,
          createTime: "2022-10-10 10:10:10",
        },
        {
          id: 1,
          title: "标题1",
          status: 1,
          createTime: "2022-10-10 10:10:10",
        },
      ],
      columns: [
        {
          label: "选择",
          type: "selection",
          fixed: true,
        },
        {
          label: "标题",
          prop: "title",
          type: "filter",
          width: 200,
          filters: [
            { text: "标题1", value: "标题1" },
            { text: "标题2", value: "标题2" },
          ],
        },
        {
          label: "状态",
          customRender: "status",
          sortable: "custom",
          width: 200,
        },
        {
          label: "创建时间",
          prop: "createTime",
          width: 300,
        },
      ],
      handleSelect: (e): void => {
        console.log(e);
      },
    });
    onBeforeMount(() => {
      console.log("2-组件挂载到页面之前执行-----onBeforeMount");
    });
    onMounted(() => {
      console.log(api);
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
      ...toRefs(data),
    };
  },
});
</script>
