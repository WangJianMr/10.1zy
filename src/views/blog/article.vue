<template>
  <div class="artcle">
    <fom :formList="formList" v-model="forms" ref="forms">
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
      </template>
    </fom>
    <isTab :aricleList="aricleList" :aricleListMess="aricleListMess">
      <template v-slot:exam="scope">
        <el-button type="primary" size="mini" @click="examine(scope.row.id)"
          >查看</el-button
        >
      </template>
      <template v-slot:audit="scope">
        <el-button type="success" size="mini" @click="examine(scope.row.id, 1)"
          >审核</el-button
        >
      </template>
      <template v-slot:del="scope">
        <el-button type="danger" size="mini">删除</el-button>
      </template>
    </isTab>
    <paging
      :total="total"
      :pageSizes="forms.size"
      :currentPage="forms.current"
      @handleSizeChange="handleSizeChange"
      @handleCurrentChange="handleCurrentChange"
    />

    <mtk
      :dialogVisible.sync="dialogVisible"
      :formList="formLists"
      :title="title"
      v-model="mtkForms"
    >
      <template v-slot:button="scope" v-if="showId == 1" class="slot">
        <el-button type="primary" @click="pass">审核通过</el-button>
        <el-button type="danger" @click="noPass">审核不通过</el-button>
      </template>
    </mtk>
  </div>
</template>

<script>
import fom from "../../components/isForms.vue";
import isTab from "../../components/isTable.vue";
import paging from "../../components/paging.vue";
import mtk from "../../components/mtk.vue";
import {
  getAllList,
  getExam,
  getLabelExam,
  getPassBy,
  getNoPassBy,
} from "../../api/blog";
let arr = {
  0: "未审核",
  1: "审核通过",
  2: "审核未通过",
  3: "已删除",
};
export default {
  components: {
    fom,
    isTab,
    paging,
    mtk,
  },
  data() {
    return {
      dialogVisible: false,
      title: "",
      showId: null,
      mtkForms: {
        title: "",
        name: "",
        imageUrl: "",
        ispublic: "",
        summary: "",
        children: "",
      },
      formLists: [
        {
          type: "input",
          lable: "标题",
          prop: "title",
          readonly: true,
        },
        {
          type: "select",
          lable: "标签",
          prop: "children",
          disabled: true,
        },
        {
          type: "img",
          lable: "主图",
          prop: "imageUrl",
        },
        {
          type: "radio",
          lable: "是否公开",
          prop: "ispublic",
          disabled: true,
          children: [
            {
              name: "公开",
              label: 0,
            },
            {
              name: "不公开",
              label: 1,
            },
          ],
        },
        {
          type: "textarea",
          lable: "简介",
          prop: "summary",
          readonly: true,
        },
        {
          type: "fwb",
          lable: "内容",
          prop: "mdContent",
        },
      ],
      formList: [
        {
          type: "input",
          label: "文章标题",
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
              value: 1,
              label: "未审核",
            },
            {
              value: 2,
              label: "审核通过",
            },
            {
              value: 3,
              label: "审核未通过",
            },
            {
              value: 4,
              label: "已删除",
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
      total: 0,
      aricleList: [],
      aricleListMess: [
        {
          type: "index",
          label: "序号",
          width: 60,
        },
        {
          prop: "title",
          label: "文章标题",
        },
        {
          prop: "viewCount",
          label: "浏览数",
        },
        {
          prop: "thumhup",
          label: "点赞数",
        },
        {
          type: "function",
          prop: "ispublic",
          label: "是否公开",
          callback: (row) => {
            let a = row;
            a == 0 ? "公开" : "未公开";
            return `<el-tag>${a == 0 ? "公开" : "未公开"}</el-tag>`;
          },
        },
        {
          type: "function",
          prop: "status",
          label: "状态",
          callback: (row) => {
            return `<el-tag>${arr[row]}</el-tag>`;
          },
        },
        {
          prop: "updateDate",
          label: "最后更新时间",
        },
      ],
    };
  },
  methods: {
    //全部数据
    async handelArticleList() {
      try {
        const { data } = await getAllList(this.forms);
        this.total = data.total;
        this.aricleList = data.records;
        console.log(this.aricleList);
      } catch (error) {
        console.log(error);
      }
    },
    //查询
    skip() {
      this.forms.current = 1;
      this.handelArticleList();
    },
    //每页数量
    handleSizeChange(val) {
      this.forms.size = val;
      console.log(this.page);
      this.handelArticleList();
    },
    //当前页数
    handleCurrentChange(val) {
      this.forms.current = val;
      this.handelArticleList();
    },
    //重置
    reset() {
      this.$refs["forms"].reset();
      this.handelArticleList();
    },
    //查看
    examine(id, num) {
      this.id = id;
      console.log(id, num, "num");
      if (num === 1) {
        this.title = "编辑文章";
        this.showId = 1;
      } else {
        this.title = "查看";
        this.showId = 0;
      }
      this.dialogVisible = true;
      this.handleExam(id);
    },
    //id查看
    async handleExam(id) {
      console.log(id, "id");
      try {
        let str = [];
        const exam = await getExam(id);
        const { data } = await getLabelExam();
        data.forEach((item) => {
          item.labelList.forEach((ele, index) => {
            if (index == 0) {
              str.push(`${item.name}/${ele.name}`);
            }
          });
        });
        this.mtkForms = exam.data;
        this.mtkForms.children = str.join(" ");
        //  this.mtkForms.ispublic =  this.mtkForms.ispublic==0?false:true
        console.log(this.mtkForms);
      } catch (error) {}
    },
    //审核通过
    async handlePass() {
      try {
        const pass = await getPassBy(this.id);
        this.handelArticleList();
      } catch (error) {}
    },
    pass() {
      this.handlePass();
      this.dialogVisible = false;
    },
    //审核不通过
    async handelNoPass() {
      try {
        const pass = await getNoPassBy(this.id);
        this.handelArticleList();
      } catch (error) {}
    },
    noPass() {
      this.handelNoPass();
      this.dialogVisible = false;
    },
  },
  created() {
    this.handelArticleList();
  },
};
</script>

<style>
.artcle {
  padding: 20px;
}
.slot {
  width: 300px;
  margin: 0 auto;
  text-align: center;
}
</style>
