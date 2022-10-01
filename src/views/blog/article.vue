<template>
  <div class="artcle">
    <fom :formList="formList" v-model="forms">
      <template v-slot:button="" scope>
        <el-button
          type="primary"
          icon="el-icon-search"
          size="mini"
          @click="skip"
          >查询</el-button
        >
        <el-button icon="el-icon-refresh" size="mini">重置</el-button>
      </template>
    </fom>
    <isTab :aricleList="aricleList" :aricleListMess="aricleListMess">
      <template v-slot:exam="scope">
        <el-button type="primary" size="mini">查看</el-button>
      </template>
      <template v-slot:audit="scope">
        <el-button type="success" size="mini">审核</el-button>
      </template>
      <template v-slot:del="scope">
        <el-button type="danger" size="mini">删除</el-button>
      </template>
    </isTab>
    <paging :total="total" :pageSizes="forms.size" :currentPage="forms.current" @handleSizeChange="handleSizeChange" @handleCurrentChange="handleCurrentChange"/>
  </div>
</template>

<script>
import fom from "../../components/isForms.vue";
import isTab from "../../components/isTable.vue";
import paging from "../../components/paging.vue";
import { getAllList } from "../../api/blog";
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
  },
  data() {
    return {
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
      this.forms.current=1
      this.handelArticleList();
    },
    //每页数量
    handleSizeChange(val){
      this.forms.size=val
      console.log(this.page);
      this.handelArticleList()
    },
    handleCurrentChange(val){
      this.forms.current=val
      this.handelArticleList()
    }
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
</style>
