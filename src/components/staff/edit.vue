<template>
  <el-row class="warp">
    <el-col :span="24" class="warp-breadcrum">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }"><b>当前位置：首页</b></el-breadcrumb-item>
        <el-breadcrumb-item>员工管理</el-breadcrumb-item>
        <el-breadcrumb-item>新增员工信息</el-breadcrumb-item>
      </el-breadcrumb>
    </el-col>

    <el-col :span="24" class="warp-main">

      <div class="title">
         编辑员工信息
      </div>
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm ">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="ruleForm.username"></el-input>
        </el-form-item>

        <el-form-item label="员工姓名" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>

        <el-form-item label="密码" prop="pwd">
          <el-input v-model="ruleForm.pwd"  placeholder="6-18位英文和数字组成"></el-input>
        </el-form-item>


        <el-form-item label="权限组" prop="region">
          <el-select v-model="ruleForm.region" placeholder="请管理员" style="width:220px;">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="工作部门" prop="region">
          <el-select v-model="ruleForm.region" placeholder="北京电力局"  style="width:220px;">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="管理区域" prop="region">
          <el-select v-model="ruleForm.region" placeholder="杭州市"  style="width:220px;">
            <el-option label="北京市" value="shanghai"></el-option>
            <el-option label="天津市" value="beijing"></el-option>
          </el-select>

          <el-select v-model="ruleForm.region" placeholder="滨江区"  style="width:220px;">
            <el-option label="西湖区" value="shanghai"></el-option>
            <el-option label="上城区" value="beijing"></el-option>
          </el-select>
          <el-select v-model="ruleForm.region" placeholder="江南大道"  style="width:220px;">
            <el-option label="长河路" value="shanghai"></el-option>
            <el-option label="建业路" value="beijing"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="职务" >
          <el-input ></el-input>
        </el-form-item>

        <el-form-item label="绑定mac地址:" >
          <el-input ></el-input>
        </el-form-item>
        <el-form-item label="手机号码" >
          <el-input ></el-input>
        </el-form-item>

        <el-form-item label="状态" prop="region">
          <el-select v-model="ruleForm.region" placeholder="北京电力局" style="width:220px;">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
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
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        rules: {
          name: [
            { required: true, message: '请输入员工名称', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          username: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          pwd: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            { min: 6, max: 18, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          region: [
            { required: true, message: '请选择活动区域', trigger: 'change' }
          ],
          date1: [
            { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
          ],
          date2: [
            { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
          ],
          type: [
            { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
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
