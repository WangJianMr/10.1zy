<template>
  <div class="role">
    <isForm v-model="form" :formList="formList" ref="forms">
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
          @click="newly"
          >新增</el-button
        >
      </template>
    </isForm>
    <isTable :aricleList="roleList" :aricleListMess="aricleListMess">
      <template v-slot:exam="scope">
        <el-button
          type="primary"
          size="mini"
          @click="allcaoaction(scope.row.id)"
          >分配权限</el-button
        >
        <el-button type="success" size="mini" @click="comp(scope.row.id)"
          >编辑</el-button
        >
        <el-button type="danger" size="mini" @click="del(scope.row.id)"
          >删除</el-button
        >
      </template>
    </isTable>

    <isMtk
      :dialogVisible.sync="dialogVisible"
      v-model="mtkForm"
      :title="title"
      :formList="formLists"
      :rules="rules"
      @handelAddOk="handelAddOk"
      @cancel="cancel"
    >
    </isMtk>

    <el-dialog title="提示" :visible.sync="dialogLimits" width="30%">
      <el-tree
        :data="roleTreeList"
        show-checkbox
        default-expand-all
        :default-checked-keys="key"
        node-key="id"
        ref="tree"
        highlight-current
        :props="defaultProps"
      >
      </el-tree>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="getCheckedKeys"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  getAllList,
  getAdd,
  getcomp,
  getcompOk,
  getdel,
  getlim,
  gettree,
  gettreeOk
} from "../../api/role";
import isForm from "../../components/isForms.vue";
import isTable from "../../components/isTable.vue";
import isMtk from "../../components/mtk.vue";
export default {
  components: {
    isForm,
    isTable,
    isMtk,
  },
  data() {
    return {
      defaultProps: {
        children: "children",
        label: "name",
      },
      dialogVisible: false,
      dialogLimits: false,
      key: [],
      title: "",
      roleList: [],
      roleTreeList: [],
      aricleListMess: [
        {
          type: "selection",
          width: 60,
        },
        {
          type: "index",
          label: "序号",
          width: 60,
        },
        {
          label: "角色名称",
          prop: "name",
        },
        {
          label: "备注",
          prop: "remark",
        },
      ],
      form: {
        current: 1,
        size: 10,
        name: "",
      },
      mtkForm: {
        name: "",
        remark: "",
      },
      formLists: [
        {
          type: "input",
          lable: "角色名称",
          prop: "name",
        },
        {
          type: "textarea",
          lable: "备注",
          prop: "remark",
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
      total: 0,
      formList: [
        {
          type: "input",
          label: "角色名称",
          prop: "name",
          size: "mini",
        },
      ],
      rules: {
        name: [{ required: true, message: "请输入分类名称", trigger: "blur" }],
      },
    };
  },
  methods: {
    async handelAll() {
      try {
        const all = await getAllList(this.form);
        this.roleList = all.data.records;
        this.total = all.data.total;
      } catch (error) {}
    },
    //查询
    skip() {
      this.form.current = 1;
      this.handelAll();
    },
    //重置
    reset() {
      this.$refs["forms"].reset();
      this.handelAll();
    },
    //新增
    newly() {
      this.dialogVisible = true;
      this.title = "新增";
      this.mtkForm = {
        name: "",
        remark: "",
      };
    },
    //添加完成
    handelAddOk() {
      if (this.mtkForm.id) {
        this.handelCompOk();
      } else {
        this.handelAdd();
      }
    },
    //添加接口
    async handelAdd() {
      try {
        const add = await getAdd();
        this.dialogVisible = false;
        this.handelAll();
      } catch (error) {}
    },
    //编辑
    comp(id) {
      console.log(id);
      this.dialogVisible = true;
      this.handelComp(id);
    },
    cancel() {
      this.dialogVisible = false;
    },
    //单个查询
    async handelComp(id) {
      try {
        const com = await getcomp(id);
        this.mtkForm = com.data;
      } catch (error) {}
    },
    //编辑ok
    async handelCompOk() {
      try {
        const compOk = await getcompOk(this.mtkForm);
        this.dialogVisible = false;
        this.handelAll();
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
          this.dels(id);
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
    //删除接口
    async dels(id) {
      console.log(id);
      try {
        const del = await getdel(id);
        console.log(del);
        this.handelAll();
      } catch (error) {
        console.log(error);
      }
    },
    //分配权限
    allcaoaction(id) {
      this.dialogLimits = true;
      this.limit(id);
      this.tre();
    },
    //权限查找
    async limit(id) {
      this.id = id
      try {
        const li = await getlim(id);
        console.log(li);
        this.key = li.data;
      } catch (error) {}
    },
    //权限树形
    async tre() {
      try {
        const tr = await gettree();
        this.roleTreeList = tr.data;
        console.log(this.roleTreeList);
      } catch (error) {}
    },
    //获取选中
    getCheckedKeys() {
      console.log(this.$refs.tree.getCheckedNodes());
      let arr = this.$refs.tree.getCheckedNodes()
      this.treeOk(this.id,arr)
    },
    //分配完成接口
    async treeOk(id,arr){
      try {
        const tre = await gettreeOk(id,arr)
         this.handelAll();
         this.dialogLimits = false;
        console.log(tre);
      } catch (error) {
        
      }
    },
  },
  created() {
    this.handelAll();
  },
};
</script>

<style>
.role {
  padding: 20px;
}
.slot {
  width: 300px;
  margin: 0 5px;
  text-align: center;
}
</style>
