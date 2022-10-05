<template>
  <el-table
    :data="source"
    :height="height"
    :border="border"
    style="width: 100%"
    @selection-change="handleSelect"
    @sort-change="handleSortChange"
  >
    <template v-for="(item, index) in columns" :key="index">
      <!--序号-->
      <el-table-column
        v-if="item.type === 'idx'"
        :label="item.label"
        type="index"
        width="60"
        align="center"
        :index="indexMethod"
        :fixed="item.fixed || null"
      ></el-table-column>
      <!--选择字段-->
      <el-table-column
        v-if="item.type === 'selection'"
        type="selection"
        width="60"
        align="center"
        :fixed="item.fixed || null"
      >
      </el-table-column>
      <!--正常字段与插槽-->
      <el-table-column
        v-if="
          item.type === undefined ||
          item.type === 'prop' ||
          item.type === 'slot'
        "
        :label="item.label"
        :fixed="item.fixed || null"
        :width="item.width || null"
        :align="item.align || null"
        :sortable="item.sortable || false"
        :show-overflow-tooltip="item.tooltip || false"
      >
        <template #default="scope">
          <slot :name="item.customRender" :row="scope.row">
            {{ scope.row[item.prop] }}
          </slot>
        </template>
      </el-table-column>
      <!--筛选加插槽-->
      <el-table-column
        v-if="item.type === 'filter'"
        :label="item.label"
        :fixed="item.fixed || null"
        :width="item.width || null"
        :align="item.align || null"
        :sortable="item.sortable || false"
        :show-overflow-tooltip="item.tooltip || false"
        :filters="item.filters || []"
        :filter-method="handleFilter"
      >
        <template #default="scope">
          <slot :name="item.customRender" :row="scope.row">
            {{ scope.row[item.prop] }}
          </slot>
        </template>
      </el-table-column>
    </template>
  </el-table>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from "vue";

interface dataType {
  indexMethod: (index: number) => number;
  handleSortChange: (data: object) => void;
  handleFilter: ({
    value,
    row,
    column,
  }: {
    value: string;
    row: object;
    column: object;
  }) => boolean;
}

export default defineComponent({
  props: {
    source: {
      type: Array,
      required: true,
    },
    columns: {
      type: Array,
      required: true,
    },
    currentPage: {
      type: Number,
      default: 1,
    },
    pageSize: {
      type: Number,
      default: 10,
    },
    total: {
      type: Number,
      default: 0,
    },
    height: {
      type: Number || String,
      default: null,
    },
    border: {
      type: Boolean,
      default: true,
    },
  },
  setup(props, context) {
    const data: dataType = reactive({
      // 索引
      indexMethod: (index) => {
        return (props.currentPage - 1) * props.pageSize + index + 1;
      },
      // 选择单选，全选触发
      handleSelect: (data): void => {
        context.emit("onSelect", data);
      },
      // 排序
      handleSortChange: (data): void => {
        context.emit("onSortable", data);
      },
      // 筛选数据
      handleFilter: ({ value, row, column }): boolean => {
        console.log(value, row, column);
        // const dataArr = props.source.filter((val) => 1);
        return true;
      },
    });

    return { ...toRefs(data) };
  },
});
</script>

<style scoped></style>
