<template>
  <div class="advert">
    <isForm :formList="formList" v-model="forms" ref="forms">
      <template v-slot:button="" scope>
        <el-button
          type="primary"
          icon="el-icon-search"
          size="mini"
          @click="skip"
          >查询</el-button
        >
        <el-button icon="el-icon-refresh" size="mini" @click="reset"
          >重置</el-button
        >
        <el-button
          icon="el-icon-circle-plus-outline"
          size="mini"
          type="primary"
          @click="increase"
          >新增</el-button
        >
      </template>
    </isForm>
    <isTable :aricleListMess="aricleListMess" :aricleList="advertList">
      <template v-slot:exam="scope">
        <el-button size="mini" @click="comp(scope.row.id)">编辑</el-button>
      </template>
      <template v-slot:del="scope">
        <el-button type="danger" size="mini" @click="del(scope.row.id)"
          >删除</el-button
        >
      </template>
    </isTable>

    <ispaging
      :total="total"
      :pageSizes="forms.size"
      :currentPage="forms.current"
      @handleSizeChange="handleSizeChange"
      @handleCurrentChange="handleCurrentChange"
    />
    <ismtk
      :dialogVisible.sync="dialogVisible"
      :title="title"
      :formList="formLists"
      v-model.sync="mekForm"
      :rules="rules"
      @handelAddOk="handelAddOk"
    >
    </ismtk>
  </div>
</template>

<script>
import {
  getAllList,
  getadvertDel,
  getSubOk,
  getcomp,
  getVComp,
} from "../../api/advert";
import isForm from "../../components/isForms.vue";
import ispaging from "../../components/paging.vue";
import isTable from "../../components/isTable.vue";
import ismtk from "../../components/mtk.vue";
export default {
  components: {
    isForm,
    ispaging,
    isTable,
    ismtk,
  },
  data() {
    return {
      rules: {
        imageUrl: [{ required: true, message: "请选择图片", trigger: "blur" }],
        title: [{ required: true, message: "请输入广告标题", trigger: "blur" }],
        advertUrl: [
          { required: true, message: "请输入广告连接", trigger: "blur" },
        ],
        status: [{ required: true, message: "请选择状态", trigger: "blur" }],
        advertTarget: [
          { required: true, message: "请选择广告位置", trigger: "blur" },
        ],
        sort: [{ required: true, message: "请输入排序", trigger: "blur" }],
      },
      dialogVisible: false,
      title: "",
      forms: {
        title: "",
        status: "",
        current: 1,
        size: 10,
      },
      mekForm: {
        imageUrl: "",
        title: "",
        advertUrl: "",
        position: "",
        status: "",
        advertTarget: "",
        sort: "",
      },
      formLists: [
        {
          type: "image",
          prop: "imageUrl",
          lable: "广告图片",
        },
        {
          type: "input",
          prop: "title",
          lable: "广告标题",
        },
        {
          type: "input",
          prop: "advertUrl",
          lable: "广告链接",
        },
        {
          type: "select",
          prop: "position",
          lable: "跳转方式",
          children: [
            {
              label: "新窗口",
              value: 0,
            },
            {
              label: "当前窗口",
              value: 1,
            },
          ],
        },
        {
          type: "radio",
          prop: "status",
          lable: "状态",
          children: [
            {
              name: "正常",
              label: 0,
            },
            {
              name: "禁用",
              label: 1,
            },
          ],
        },
        {
          type: "sub",
          prop: "advertTarget",
          lable: "广告位置",
        },
        {
          type: "sub",
          prop: "sort",
          lable: "排序",
        },
        {
          type: "but",
          children: [
            {
              type: "primary",
              text: "确定",
            },
            {
              type: "",
              text: "取消",
            },
          ],
        },
      ],
      total: 0,
      advertList: [],
      formList: [
        {
          type: "input",
          label: "广告标题",
          prop: "title",
          size: "mini",
        },
        {
          type: "select",
          label: "状态",
          prop: "status",
          size: "mini",
          children: [
            {
              label: "禁用",
              value: 0,
            },
            {
              label: "正常",
              value: 1,
            },
          ],
        },
      ],
      aricleListMess: [
        {
          type: "index",
          label: "序号",
          width: 60,
        },
        {
          prop: "title",
          label: "广告标题",
        },
        {
          type: "img",
          prop: "imageUrl",
          label: "广告图片",
        },
        {
          prop: "advertUrl",
          label: "广告连接",
        },
        {
          type: "function",
          prop: "status",
          label: "状态",
          category: true,
          callback: (row) => {
            let a = row;
            return `<el-tag>${a == 0 ? "禁用" : "正常"}</el-tag>`;
          },
        },
        {
          prop: "sort",
          label: "排序",
        },
      ],
    };
  },
  methods: {
    async handelAllList() {
      const all = await getAllList();
      console.log(all);
      this.total = all.data.total;
      this.advertList = all.data.records;
    },
    //查询
    skip() {
      this.handelAllList();
    },
    //重置
    reset() {
      this.$refs["forms"].reset();
      this.handelAllList();
    },
    //每页数量
    handleSizeChange(val) {
      this.forms.size = val;
      this.handelAllList();
    },
    //当前页数
    handleCurrentChange(val) {
      this.forms.current = val;
      this.handelAllList();
    },
    //新增
    increase() {
      this.dialogVisible = true;
      this.title = "新增";
      this.mekForm = {
        imageUrl: "",
        title: "",
        advertUrl: "",
        position: "",
        status: "",
        advertTarget: "",
        sort: "",
      };
    },
    //删除
    del(id) {
      this.handelDel(id);
    },
    //删除接口
    async handelDel(id) {
      try {
        const dels = await getadvertDel(id);
        this.handelAllList();
      } catch (error) {}
    },
    //添加完成
    handelAddOk() {
      console.log(this.mekForm.id);
      if (this.mekForm.id) {
        this.handelCompOk();
      } else {
        this.handelSub();
      }
    },
    //添加接口
    async handelSub() {
      try {
        const sub = await getSubOk(this.mekForm);
        console.log(sub);
        this.dialogVisible = false;
      } catch (error) {}
    },
    //编辑
    comp(id) {
      this.dialogVisible = true;
      this.title = "编辑";
      this.heandelcomp(id);
    },
    //编辑单个接口
    async heandelcomp(id) {
      try {
        const comp = await getcomp(id);
        this.mekForm = comp.data;
      } catch (error) {}
    },
    //编辑完成接口
    async handelCompOk() {
      try {
        const compOk = await getVComp();
        console.log(compOk);
        this.handelAllList();
        this.dialogVisible = false;

      } catch (error) {}
    },
  },
  created() {
    this.handelAllList();
  },
};
</script>

<style>
.advert {
  padding: 20px;
}
</style>
