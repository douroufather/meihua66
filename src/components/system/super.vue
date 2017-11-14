<template>
  <el-row class="warp" style="position:relative;">

    <el-col :span="24" class="warp-breadcrum">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }"><b>当前位置：首页</b></el-breadcrumb-item>
        <el-breadcrumb-item>系统管理</el-breadcrumb-item>
        <el-breadcrumb-item>添加公司logo</el-breadcrumb-item>
      </el-breadcrumb>
    </el-col>

    <el-col :span="24" class="warp-main" >
      <!--工具条-->
      <!--添加/编辑-->


      <el-row>

        <el-col :span="24" class="right">
          <div class="title">
            添加公司logo


          </div>

          <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm " style="padding-top:54px;">


            <!--<el-form-item label="添加图片" prop="fullname">-->
              <!--<el-button type="primary" style="width: 100px; position: absolute"><i class="iconfont" >&#xe6ff;</i>选择文件<input type="file"  style="position:relative;top:0;left:-70px;  display: inline-block;width: 100px;height:20px;z-index: 20;opacity: 0;"></el-button>-->

            <!--</el-form-item>-->
            <!--<el-form-item label="浏览图：" prop="fullname">-->
              <!--<div style="width: 300px;height:150px;background: indianred">-->
               <!--<img src="../../assets/images/logo.png" style="width:178px;margin-top: 18px;margin-left: 20px; line-height:72px;">-->
              <!--</div>-->
            <!--</el-form-item>-->

            <!--<el-form-item label="添加图片" prop="fullname">-->
              <!--<el-button type="primary" style="width: 100px; position: absolute"><i class="iconfont" >&#xe6ff;</i>选择文件<input type="file" name="file" id="fileToUpload" accept="image/jpeg,image/x-png,image/gif" @change="fileSelected($event)"  style="position:relative;top:0;left:-70px;  display: inline-block;width: 100px;height:20px;z-index: 20;opacity: 0;"></el-button>-->

            <!--</el-form-item>-->
            <!--<el-form-item label="浏览图：" prop="fullname">-->
              <!--<div style="width: 300px;height:150px;">-->
               <!--<img  :src="ImageFile" style="width:178px;margin-top: 18px;margin-left: 20px; line-height:72px;">-->
              <!--</div>-->
            <!--</el-form-item>-->


            <el-upload style="width:300px;"
              class="upload-demo"
              ref="upload"
              list-type="picture"
              action="/api/logo/upload"
              :on-preview="handlePreview"
              :on-success="handleSuccess"
              :on-remove="handleRemove"
              :file-list="fileList"
              :auto-upload="false"
              :on-error="handleError"
               accept="image/x-png">
              <el-button slot="trigger" size="small" type="primary"><i class="iconfont"   style="display: inline-block;margin-right: 5px;">&#xe6ff;</i>选取文件</el-button>
              <el-button style="margin-left: 10px;" class="hxz" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
              <div slot="tip" class="el-upload__tip">只能上传.png文件，且不超过500kb</div>
            </el-upload>
            <!--accept="image/jpeg,image/x-png,image/gif">-->
            <!--<el-form-item>-->
              <!--<el-button type="primary" @click="addSubmit(ruleForm)">上传</el-button>-->
              <!--<el-button @click="resetForm">返回</el-button>-->
            <!--</el-form-item>-->

          </el-form>
        </el-col>
      </el-row>


    </el-col>
  </el-row>
</template>
<script>

  import util from '../../common/util'
  import {UpLoad} from '../../api/api';

  export default{
    data(){
      return {
        fileList: [],
        ImageFile:'',
        ruleForm:{},
        rules:{}
      }
    },

    methods: {

//上传图片
      submitUpload() {
        this.$refs.upload.submit('/api/logo/upload');
      },

      handleSuccess(response,file,fileList) {
        console.log(response,file,fileList);
        this.$message({
          message:'上传成功'
        });
      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
        this.$message({
          message:'删除成功'
        });
      },
      handleError(err, file, fileList){
        console.log(err, file, fileList);
        var rFilter = /^(?:image\/bmp|image\/cis\-cod|image\/gif|image\/ief|image\/jpeg|image\/jpeg|image\/jpeg|image\/pipeg|image\/png|image\/svg\+xml|image\/tiff|image\/x\-cmu\-raster|image\/x\-cmx|image\/x\-icon|image\/x\-portable\-anymap|image\/x\-portable\-bitmap|image\/x\-portable\-graymap|image\/x\-portable\-pixmap|image\/x\-rgb|image\/x\-xbitmap|image\/x\-xpixmap|image\/x\-xwindowdump)$/i;
        if (!rFilter.test(aFiles[0].type)) { alert("You must select a valid image file!"); return; }
      },
      handlePreview(file) {
        console.log(file);
      },
      handleChange(value) {
        console.log(value);
      },

    }
  }
</script>

<style lang="scss" scoped>
  .warp{
    height: 100%;
    .warp-main {
      padding: 0px;
      position: relative;
      overflow:auto;
      height: calc(100% - 56px);
      .el-row{
        height:100%;
        .demo-table-expand label {
          font-weight: bold;
        }

        .toolbar {
          padding: 8px 20px;
          border: 1px solid #dceaea;
        }

        .right{
          padding: 0 24px;
          width:100%;
          /*.grid-content{*/
            /*.el-table{*/
              /*.el-table__header-wrapper{*/
                /*table{*/
                  /*thead{*/
                    /*tr{*/
                      /*th{*/
                        /*text-align:center;*/
                      /*}*/
                    /*}*/
                  /*}*/
                /*}*/
              /*}*/
              /*.el-table__body-wrapper{*/
                /*table{*/
                  /*tbody{*/
                    /*tr{*/
                      /*text-align: center;*/
                      /*td{*/
                        /*.edit{margin-right: 6px;}*/
                        /*.edit:hover{color:#32b5cb;}*/
                        /*.delete:hover{color:#ff6d5b;}*/
                        /*.iconfont{*/
                          /*cursor:pointer;*/
                        /*}*/
                      /*}*/
                    /*}*/
                  /*}*/
                /*}*/
              /*}*/
            /*}*/
          /*}*/
        }
      }


    }
  }

  .el-cascader-menu{
    width:218px;
  }

</style>
