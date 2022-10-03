<template>
  <div>
    <el-table :data="aricleList" border style="width: 100%"  row-key="id" :tree-props="{children: 'children'}">
      <template v-for="item in aricleListMess">
        <el-table-column
          v-if="item.type == 'index'"
          :type="item.type"
          :label="item.label"
          v-bind="item"
        >
        </el-table-column>
        <el-table-column
          v-else-if="item.type === 'function' && item.prop === 'ispublic'"
          :prop="item.prop"
          :label="item.label"
        >
          <template slot-scope="scope">
            <el-tag
              :type="scope.row.ispublic == 0 ? 'success' : 'danger'"
              v-html="item.callback(scope.row.ispublic)"
            >
            </el-tag>
          </template>
        </el-table-column>

        <el-table-column
          v-else-if="item.type === 'img'"
          :prop="item.prop"
          :label="item.label"
        >
          <template slot-scope="scope">
            <img :src="scope.row.imageUrl" alt="" />
          </template>
        </el-table-column>

        <el-table-column
          v-else-if="
            item.type === 'function' && item.prop === 'status' && item.category
          "
          :prop="item.prop"
          :label="item.label"
        >
          <template slot-scope="scope">
            <el-tag
              :type="scope.row.status == 0 ? 'danger' : 'success'"
              v-html="item.callback(scope.row.status)"
            >
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column
          v-else-if="item.type === 'function' && item.prop === 'status'"
          :prop="item.prop"
          :label="item.label"
        >
          <template slot-scope="scope">
            <el-tag
              :type="arr[scope.row.status]"
              v-html="item.callback(scope.row.status)"
            >
            </el-tag>
          </template>
        </el-table-column>


<el-table-column
          v-else-if="item.type === 'type'"
          :prop="item.prop"
          :label="item.label"
        >
          <template slot-scope="scope">
           <span>{{item.callback(scope.row.type)}}</span>
          </template>
        </el-table-column>


        <el-table-column
          v-else
          :prop="item.prop"
          :label="item.label"
          v-bind="item"
        >
        </el-table-column>
      </template>
      <el-table-column fixed="right" label="操作" width="250">
        <template slot-scope="scope">
          <slot name="exam" :row="scope.row"></slot>

          <slot
            v-if="scope.row.status == 0"
            name="audit"
            :row="scope.row"
          ></slot>

          <slot v-if="scope.row.status != 3" name="del" :row="scope.row"></slot>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  props: {
    aricleList: {
      type: Array,
      default: () => [],
    },
    aricleListMess: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      arr: {
        0: "",
        1: "success",
        2: "warning",
        3: "danger",
      },
    };
  },
};
</script>

<style>
img {
  width: 80px;
  height: 50px;
}
</style>
