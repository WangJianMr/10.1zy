<template>
  <div class="label">
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
    <isTable :aricleListMess="aricleListMess" :aricleList="categoryList">
      <template v-slot:exam="scope">
        <el-button size="mini" @click="comp(scope.row.id)">编辑</el-button>
      </template>
      <template v-slot:del="scope">
        <el-button type="danger" size="mini" @click="del(scope.row.id)"
          >删除</el-button
        >
      </template>
    </isTable>
    <paging
      :total="total"
      :pageSizes="forms.size"
      :currentPage="forms.current"
      @handleSizeChange="handleSizeChange"
      @handleCurrentChange="handleCurrentChange"
    />
    <mtk
      v-model.sync="mtkForms"
      :dialogVisible.sync="dialogVisible"
      :formList="formLists"
      :title="title"
      :rules="rules"
      @handelAddOk="handelAddOk"
      @cancel="cancel"
    ></mtk>
  </div>
</template>

<script>
import {
  getAllList,
  // getAdd,
  getComp,
  getCompOk,
  getdel,
} from "../../api/lable";
import isForm from "../../components/isForms.vue";
import isTable from "../../components/isTable.vue";
import paging from "../../components/paging.vue";
import mtk from "../../components/mtk.vue";
export default {
  components: {
    isForm,
    isTable,
    paging,
    mtk,
  },
  data() {
    return {
      title: "",
      dialogVisible: false,
      formLists: [
        {
          type: "input",
          lable: "分类名称",
          prop: "name",
          readonly:true
        },
        {
          type: "select",
          lable: "分类名称",
          prop: "categoryName",
          readonly:true,
          children: [
          ],
        },
        {
          type: "but",
          lable: "操作",
          prop: "remark",
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
      forms: {
        title: "",
        status: "",
        current: 1,
        size: 10,
      },
      formList: [
        {
          type: "input",
          label: "标签名称",
          prop: "title",
          size: "mini",
        },
        {
          type: "select",
          label: "分类名称",
          prop: "categoryName",
          size: "mini",
          children: [],
        },
      ],
      mtkForms: {
        name: "",
        categoryName: "",
      },
      categoryList: [],
      total: 0,
      aricleListMess: [
        {
          type: "index",
          label: "序号",
          width: 60,
        },
        {
          prop: "name",
          label: "标签名称",
        },
        {
          prop: "categoryName",
          label: "分类名称",
        },
      ],
      rules: {
        name: [{ required: true, message: "请输入分类名称", trigger: "blur" }],
        categoryName: [{ required: true, message: "请选择状态", trigger: "blur" }],
      },
    };
  },
  methods: {
    async allList() {
      const all = await getAllList(this.forms);
      this.total = all.data.total;
      this.categoryList = all.data.records;
    },
    //查询
    skip() {
      this.forms.current = 1;
      this.allList();
    },
    //重置
    reset() {
      this.$refs["forms"].reset();
      this.allList();
    },
    //每页数量
    handleSizeChange(val) {
      this.forms.size = val;
      this.allList();
    },
    //当前页数
    handleCurrentChange(val) {
      this.forms.current = val;
      this.allList();
    },
    //新增
    increase() {
      this.dialogVisible = true;
      this.title = "新增";
      this.mtkForms = {
        name: "",
        status: "",
        sort: "",
        remark: "",
      };
    },
    //添加完成
    handelAddOk() {
      console.log(this.mtkForms, "mtkForms");
      if (this.mtkForms.id) {
        this.handelCompOk();
      } else {
        this.addOk();
      }
    },
    async addOk() {
      try {
        const ok = await getAdd();
        this.allList();
        this.dialogVisible = false;
      } catch (error) {}
    },
    //编辑
    comp(id) {
      console.log(id);
      this.compData(id);
    },
    async compData(id) {
      try {
        const com = await getComp(id);
        console.log(com, "com");
        this.mtkForms = com.data;
        this.mtkForms.categoryName = com.data.categoryId
        this.dialogVisible = true;
      } catch (error) {}
    },
    //编辑ok
    async handelCompOk() {
      try {
        const compOk = await getCompOk();
        this.allList();
        this.dialogVisible = false;
      } catch (error) {}
    },
    //删除
    del(id) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.delOk(id);
          this.$message({
            type: "success",
            message: "删除成功!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    async delOk(id) {
      try {
        const dels = await getdel(id);
        this.allList();
      } catch (error) {}
    },
    //取消
    cancel(){
      this.dialogVisible = false;
    },
  },
  created() {
    this.allList();
  },
};
</script>

<style>
.label {
  padding: 20px;
}
</style>
