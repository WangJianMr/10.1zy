<template>
  <div>
    <el-form :inline="true" :model="value" class="demo-form-inline">
      <template v-for="item in formList">
        <el-form-item
          v-if="item.type === 'input'"
          :label="item.label"
          v-bind="item"
        >
          <el-input v-model="value[item.prop]"></el-input>
        </el-form-item>
        <el-form-item
          v-if="item.type === 'select'"
          :label="item.label"
          v-bind="item"
        >
          <el-select v-model="value[item.prop]">
            <el-option
              v-for="(ele, index) in item.children"
              :label="ele.label"
              :value="ele.value"
            ></el-option>
          </el-select>
        </el-form-item>
      </template>
      <slot name="button"></slot>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "fom",
  props: {
    formList: {
      type: Array,
      default: () => [],
    },
    value: {
      type: Object,
      default: () => {},
    },
  },
};
</script>

<style></style>
