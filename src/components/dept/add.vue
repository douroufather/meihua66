<template>
  <el-row class="warp">
    <el-col :span="24" class="warp-breadcrum">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }"><b>当前位置：首页</b></el-breadcrumb-item>
        <el-breadcrumb-item>员工管理</el-breadcrumb-item>
        <el-breadcrumb-item>新部门工信息</el-breadcrumb-item>
      </el-breadcrumb>
    </el-col>

    <el-col :span="24" class="warp-main">

     <div class="title">
      添加/编辑部门信息
     </div>
     <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm ">


      <el-form-item label="上级部门" prop="region">
        <el-select v-model="ruleForm.region" placeholder="部门选择" style="width:220px;">
          <el-option label="事业部" value="shiye"></el-option>
          <el-option label="研发部" value="yanfa"></el-option>
        </el-select>
      </el-form-item>

       <el-form-item label="部门名称" prop="name">
         <el-input v-model="ruleForm.name"></el-input>
       </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
          <el-button @click="resetForm">返回</el-button>
        </el-form-item>
      </el-form>

    </el-col>
  </el-row>
</template>
<script>
  import util from '../../common/util'
  import {reqGetBookListPage, reqDeleteBook, reqEditBook, reqBatchDeleteBook, reqAddBook} from '../../api/api';

  export default {
    data() {
      return {
        ruleForm: {
          name: '',
          region: '',
          delivery: false,
          resource: '',
          desc: ''
        },
        rules: {
          name: [
            { required: true, message: '请输入部门名称', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          region: [
            { required: true, message: '请选择活动区域', trigger: 'change' }
          ],
          resource: [
            { required: true, message: '请选择活动资源', trigger: 'change' }
          ],
          desc: [
            { required: true, message: '请填写活动形式', trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm() {
//        this.$refs[formName].resetFields();
        this.$router.back(-1);
      }
    }
  }
</script>

<style scoped lang="scss">
  .warp{
    .warp-main{
       padding: 0 24px;
      .title{
        border-bottom: 1px solid #dceaea;
        padding: 25px 0;
        font-size: 18px;
      }
      .demo-ruleForm{
        padding: 30px 0;
        .el-form-item{
          .el-form-item__label{}
          .el-form-item__label:before{content:'';}
          .el-form-item__content{
            .el-input{
              width:220px;
              float:left;
              margin-right: 10px;
            }
            /*.el-input:after{*/
              /*content: '*';*/
              /*color: #ff4949;*/
              /*position: absolute;*/
            /*}*/
             .el-button{
               width: 220px;
             }

          }
        }



      }

      .demo-table-expand label {
        font-weight: bold;
      }
    }


  }



</style>
