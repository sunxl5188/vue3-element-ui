<template>
  <div>
    <el-table
      :data="source"
      :height="height"
      :border="border"
      style="width: 100%"
      :default-expand-all="false"
      row-key="id"
      @selection-change="handleSelect"
      @sort-change="handleSortChange"
      @expand-change="handleExpandChange"
    >
      <template v-for="(item, index) in columns" :key="index">
        <!--序号-->
        <el-table-column
          v-if="item.type === 'idx'"
          :label="item.label"
          type="index"
          width="460"
          :align="'center'"
          :index="indexMethod"
          :fixed="item.fixed || false"
        >
          <template v-slot="scope">
            {{ scope.row }}
          </template>
        </el-table-column>
        <!--选择字段-->
        <el-table-column
          v-if="item.type === 'selection'"
          type="selection"
          width="60"
          :align="'center'"
          :fixed="item.fixed || false"
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
          :fixed="item.fixed || false"
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
          :fixed="item.fixed || false"
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
    <el-pagination
      class="myPage"
      background
      layout="total, prev, pager, next, jumper"
      :default-page-size="pageSize"
      :default-current-page="currentPage"
      :total="total"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from "vue";

interface dataType {
  indexMethod: (index: number) => number;
  handleSelect: (data: any) => void;
  handleSortChange: (data: object) => void;
  handleFilter: (value: string, row: object) => boolean;
  handleCurrentChange: (page: number) => void;
  handleExpandChange: (row: object, expanded: boolean) => void;
}

export default defineComponent({
  props: {
    source: {
      type: Array,
      required: true,
    },
    columns: {
      type: Array as any,
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
        console.log(index);

        return (props.currentPage - 1) * props.pageSize + index + 1;
      },
      // 选择单选，全选触发
      handleSelect: (data: any): void => {
        context.emit("onSelect", data);
      },
      // 排序
      handleSortChange: (data): void => {
        context.emit("onSortable", data);
      },
      // 筛选数据
      handleFilter: (value: string, row: any): boolean => {
        return value === row.title;
      },
      // 分页
      handleCurrentChange: (page: number) => {
        // console.log(page);
        context.emit("onPageChange", page);
      },
      // 当用户对某一行展开或者关闭的时候会触发该事件
      handleExpandChange: (row: object, expanded: boolean) => {
        console.log(row);
        console.log(expanded);
      },
    });

    return { ...toRefs(data) };
  },
});
</script>

<style scoped lang="scss">
.myPage {
  justify-content: flex-end;
  padding: 15px 0;
}
</style>
