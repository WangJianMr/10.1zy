<template>
  <div>
    <el-dialog :title="title" :visible.sync="Visible" width="50%">
      <el-form ref="form" :model="value" label-width="80px" :rules="rules">
        <template v-for="item in formList">
          <el-form-item
            v-if="item.type === 'image'"
            :label="item.lable"
            :prop="item.prop"
          >
            <el-upload
              class="avatar-uploader"
              action="http://base.2yuecloud.com/pro-api/article/file/upload"
              :show-file-list="false"
               :on-success="handleAvatarSuccess"
            >
              <img v-if="value[item.prop]" :src="value[item.prop]" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          

          <el-form-item
            v-if="item.type === 'input'"
            :label="item.lable"
            :prop="item.prop"
          >
            <el-input v-model="value[item.prop]" v-bind="item"></el-input>
          </el-form-item>

          <el-form-item
            v-else-if="item.type === 'select'"
            :label="item.lable"
            :prop="item.prop"
          >
            <el-select v-model="value[item.prop]" class="aa" v-bind="item">
              <el-option
                v-for="(ele, i) in item.children"
                :label="ele.label"
                :value="ele.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item
            v-else-if="item.type === 'img'"
            :label="item.lable"
            :prop="item.prop"
          >
            <img :src="value[item.prop]" alt="" />
          </el-form-item>
          <el-form-item
            v-else-if="item.type === 'radio'"
            :label="item.lable"
            :prop="item.prop"
          >
            <el-radio-group v-model="value[item.prop]" v-bind="item">
              <el-radio
                :label="ele.label"
                v-model="value[item.prop]"
                v-for="(ele, i) in item.children"
                :key="i"
                v-if="!ele.flag"
                @change="butFlag(ele.name)"
                >{{ ele.name }}</el-radio
              >
            </el-radio-group>
          </el-form-item>
          <el-form-item
            v-else-if="item.type === 'sub'"
            :label="item.lable"
            :prop="item.prop"
          >
            <el-input-number
              v-model="value[item.prop]"
              :min="1"
              :max="10"
              :label="item.lable"
            ></el-input-number>
          </el-form-item>
          <el-form-item
            v-else-if="item.type === 'textarea'"
            :label="item.lable"
            :prop="item.prop"
          >
            <el-input
              :type="item.type"
              v-model="value[item.prop]"
              v-bind="item"
            ></el-input>
          </el-form-item>
          <el-form-item
            v-else-if="item.type === 'fwb'"
            :label="item.lable"
            :prop="item.prop"
          >
            <!-- 失去焦点时手动校验该字段 (当前 articleBody 属性值) -->
            <quill-editor v-model="value[item.prop]" readonly />
          </el-form-item>

          <el-form-item v-else-if="item.type === 'but'">
            <el-button
              v-for="(e, is) in item.children"
              :type="e.type"
              @click="okAnqu(e.text)"
              >{{ e.text }}</el-button
            >
          </el-form-item>
        </template>
      </el-form>
      <div class="slot">
        <slot name="button"></slot>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: {
    dialogVisible: {
      type: Boolean,
      default: false,
    },
    formList: {
      type: Array,
      default: () => [],
    },
    rowList: {
      type: Array,
      default: () => [],
    },
    formLable: {
      type: Array,
      default: () => [],
    },
    title: {
      type: String,
    },
    value: {
      type: Object,
      default: () => {},
    },
    rules: {
      type: Object,
      default: () => {},
    },
  },
  computed: {
    Visible: {
      get() {
        return this.dialogVisible;
      },
      set(val) {
        console.log(val);
        this.$emit("update:dialogVisible", val);
      },
    },
  },
  methods: {
    okAnqu(text) {
      console.log(text, "text");
      let th = this;
      if (text == "确定") {
        this.$refs["form"].validate((valid) => {
          if (valid) {
            th.$emit("handelAddOk");
          } else {
            console.log("error submit!!");
            return false;
          }
        });
      } else {
        this.$refs["form"].resetFields();
        this.$emit("cancel");
      }
    },
    handleAvatarSuccess(res){
      console.log(res);
      this.value.imageUrl=res.data
      console.log( this.value);
    },
    butFlag(name){
         this.$emit('butFlag',name)
    }
  },
  created() {
    console.log(this.formList);
  },
};
</script>

<style>
.aa {
  width: 100%;
}
img {
  width: 100px;
  height: 100px;
}

::v-deep .ql-editor {
  min-height: 180px !important;
}

.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
