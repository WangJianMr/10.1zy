<template>
  <div class="menu">
    <isForm v-model.sync="form" :formList="formList" ref="forms">
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

    <isTable :aricleList="menuLis" :aricleListMess="aricleListMess">
      <template v-slot:exam="scope">
        <el-button type="primary" size="mini" @click="addBut">新增</el-button>
        <el-button size="mini" @click="comp(scope.row.id)">编辑</el-button>
        <el-button type="danger" size="mini" @click="del(scope.row.id)">删除</el-button>
      </template>
    </isTable>

    <isMtk
      :dialogVisible.sync="dialogVisible"
      v-model.sync="mtkForm"
      :rules="rules"
      :title="title"
      :formList="formLists"
      @handelAddOk="handelAddOk"
      @cancel="cancel"
      @butFlag="butFlag"
    ></isMtk>
  </div>
</template>

<script>
import { getAllList, getAddOk, getCompInq,getcompOk,getDelOk } from "../../api/menu";
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
      rules: {
        type: [{ required: true, message: "请选择类型", trigger: "blur" }],
        name: [{ required: true, message: "请输入名称", trigger: "blur" }],
        code: [{ required: true, message: "请输入权限标识", trigger: "blur" }],
      },
      title: "",
      dialogVisible: false,
      form: {
        name: "",
      },
      mtkForm: {
        type: "",
        name: "",
        code: "",
        url: "",
        icon: "",
        sort: "",
        remark: "",
      },
      formLists: [
        {
          type: "radio",
          lable: "类型",
          prop: "type",
          children: [
            {
              name: "目录",
              label: 1,
              flag: false,
            },
            {
              name: "菜单",
              label: 2,
              flag: false,
            },
            {
              name: "按钮",
              label: 3,
              flag: true,
            },
          ],
        },
        {
          type: "input",
          lable: "名称",
          prop: "name",
        },
        {
          type: "input",
          lable: "权限标识",
          prop: "code",
        },
        {
          type: "input",
          lable: "请求地址",
          prop: "url",
        },
        {
          type: "input",
          lable: "图标",
          prop: "icon",
        },
        {
          type: "sub",
          lable: "排序",
          prop: "sort",
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
      menuLis: [],
      formList: [
        {
          type: "input",
          label: "菜单名称",
          prop: "name",
          size: "mini",
        },
      ],
      aricleListMess: [
        {
          type: "index",
          label: "序号",
          width: 60,
        },
        {
          label: "名称",
          prop: "name",
          sortable: true,
        },
        {
          label: "请求地址",
          prop: "url",
          sortable: true,
        },
        {
          label: "权限标识",
          prop: "code",
          sortable: true,
        },
        {
          type: "type",
          label: "类型",
          prop: "type",
          sortable: true,
          callback: (row) => {
            return (row = row == 1 ? "目录" : row == 2 ? "菜单" : "按钮");
          },
        },
        {
          label: "图标",
          prop: "icno",
          sortable: true,
        },
        {
          label: "排序",
          prop: "sort",
          sortable: true,
        },
      ],
    };
  },
  methods: {
    async handelAll() {
      try {
        const all = await getAllList(this.form);
        this.menuLis = all.data;
      } catch (error) {}
    },
    //查询
    skip() {
      this.handelAll();
    },
    //重置
    reset() {
      this.$refs["forms"].reset();
      this.handelAll();
    },
    //新增
    newly() {
      this.formLists[0].children[2].flag = true;
      this.dialogVisible = true;
      this.title = "新增";
      this.mtkForm={
        type: "",
        name: "",
        code: "",
        url: "",
        icon: "",
        sort: "",
        remark: "",
      }
      this.formLists = [
          {
            type: "radio",
            lable: "类型",
            prop: "type",
            children: [
              {
                name: "目录",
                label: 1,
                flag: false,
              },
              {
                name: "菜单",
                label: 2,
                flag: false,
              },
              {
                name: "按钮",
                label: 3,
                flag: false,
              },
            ],
          },
          {
            type: "input",
            lable: "名称",
            prop: "name",
          },
          {
            type: "input",
            lable: "权限标识",
            prop: "code",
          },
          {
            type: "input",
            lable: "请求地址",
            prop: "url",
          },
          {
            type: "input",
            lable: "图标",
            prop: "icon",
          },
          {
            type: "sub",
            lable: "排序",
            prop: "sort",
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
        ];
    },
    cancel() {
      this.dialogVisible = false;
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
        const add = await getAddOk(this.mtkForm);
        this.handelAll();
        this.dialogVisible = false;
      } catch (error) {}
    },
    //按钮新增
    addBut() {
      this.formLists[0].children[2].flag = false;
      this.dialogVisible = true;
      console.log(this.formLists[0].children[2].flag);
    },
    //按钮
    butFlag(val) {
      if (val == "按钮") {
        this.formLists = [
          {
            type: "radio",
            lable: "类型",
            prop: "type",
            children: [
              {
                name: "目录",
                label: 1,
                flag: false,
              },
              {
                name: "菜单",
                label: 2,
                flag: false,
              },
              {
                name: "按钮",
                label: 3,
                flag: false,
              },
            ],
          },
          {
            type: "input",
            lable: "名称",
            prop: "name",
          },
          {
            type: "input",
            lable: "权限标识",
            prop: "code",
          },
          {
            type: "sub",
            lable: "排序",
            prop: "sort",
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
        ];
      } else {
        this.formLists = [
          {
            type: "radio",
            lable: "类型",
            prop: "type",
            children: [
              {
                name: "目录",
                label: 1,
                flag: false,
              },
              {
                name: "菜单",
                label: 2,
                flag: false,
              },
              {
                name: "按钮",
                label: 3,
                flag: false,
              },
            ],
          },
          {
            type: "input",
            lable: "名称",
            prop: "name",
          },
          {
            type: "input",
            lable: "权限标识",
            prop: "code",
          },
          {
            type: "input",
            lable: "请求地址",
            prop: "url",
          },
          {
            type: "input",
            lable: "图标",
            prop: "icon",
          },
          {
            type: "sub",
            lable: "排序",
            prop: "sort",
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
        ];
      }
    },
    //编辑按钮
    comp(id) {
      this.compInq(id);
      this.formLists[0].children[2].flag = false;
      this.title = "编辑";
      this.dialogVisible = true;
    },
    //查询单个
    async compInq(id) {
      try {
        const compI = await getCompInq(id);
        if (compI.data.type == 3) {
          this.formLists = [
            {
              type: "radio",
              lable: "类型",
              prop: "type",
              children: [
                {
                  name: "目录",
                  label: 1,
                  flag: false,
                },
                {
                  name: "菜单",
                  label: 2,
                  flag: false,
                },
                {
                  name: "按钮",
                  label: 3,
                  flag: false,
                },
              ],
            },
            {
              type: "input",
              lable: "名称",
              prop: "name",
            },
            {
              type: "input",
              lable: "权限标识",
              prop: "code",
            },
            {
              type: "sub",
              lable: "排序",
              prop: "sort",
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
          ];
        } else {
        this.formLists = [
          {
            type: "radio",
            lable: "类型",
            prop: "type",
            children: [
              {
                name: "目录",
                label: 1,
                flag: false,
              },
              {
                name: "菜单",
                label: 2,
                flag: false,
              },
              {
                name: "按钮",
                label: 3,
                flag: false,
              },
            ],
          },
          {
            type: "input",
            lable: "名称",
            prop: "name",
          },
          {
            type: "input",
            lable: "权限标识",
            prop: "code",
          },
          {
            type: "input",
            lable: "请求地址",
            prop: "url",
          },
          {
            type: "input",
            lable: "图标",
            prop: "icon",
          },
          {
            type: "sub",
            lable: "排序",
            prop: "sort",
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
        ];
      }
        this.mtkForm = compI.data;
      } catch (error) {
        console.log(error);
      }
    },
    //编辑成功
    async handelCompOk(){
      try {
        const compOk =await getcompOk(this.mtkForm)
        this.handelAll();
        this.dialogVisible = false;
      } catch (error) {
        
      }
    },
    //删除成功
    async handelDel(id){
      try {
        const del = await getDelOk(id)
      } catch (error) {
        
      }
    },
    //删除按钮
    del(id) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.handelDel(id);
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
    
  },
  created() {
    this.handelAll();
  },
};
</script>

<style>
.menu {
  padding: 20px;
}
</style>
