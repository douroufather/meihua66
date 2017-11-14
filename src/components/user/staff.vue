<template>
  <el-row class="warp" style="position: relative;">
    <el-col :span="24" class="warp-breadcrum">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }"><b>当前位置：首页</b></el-breadcrumb-item>
        <el-breadcrumb-item>用户管理</el-breadcrumb-item>
        <el-breadcrumb-item v-if="!(editDialog||addDialog)">员工信息列表</el-breadcrumb-item>
        <el-breadcrumb-item v-if="addDialog || editDialog">新增员工信息</el-breadcrumb-item>
      </el-breadcrumb>
    </el-col>

    <el-col :span="24" class="warp-main">
      <!--工具条-->
      <el-row >
        <el-col :span="4" class="aside">
          <div class="pre-title">
            <h5>部门信息</h5>
            <!--<div class="add"><i class="iconfont">&#xe643;</i>添加部门</div>-->
          </div>
          <div class="fresh" ><a @click="winReload"> 刷新</a>&nbsp;|&nbsp;<a  @click="winReloadW">展开全部</a></div>
          <div class="grid-content bg-purple">
            <div class="tree">
              <el-tree :data="treedata" highlight-current :props="defaultProps" @node-click="handleNodeClick" :default-expand-all="states" v-if="state2"></el-tree>
            </div>
          </div>
        </el-col>

        <el-col :span="20" class="right" >
          <div  class="title" >
            员工列表<el-button type="primary" style="float: right;" @click="showAddDialog()"><i class="iconfont" style="margin-right:3px;">&#xe6ff;</i>添加员工</el-button>
          </div>
          <div  class="grid-content bg-purple-light" style="padding-top:54px;">

            <el-form :inline="true" :model="filters">
              <el-form-item>
                员工编号：<el-input v-model="filters.id" placeholder="员工编号" style="width:220px;margin-right:10px;"></el-input>
              </el-form-item>
              <el-form-item>
                员工姓名：<el-input v-model="filters.name" placeholder="员工姓名" style="width:220px;margin-right:10px;"></el-input>
              </el-form-item>
              <el-form-item >
                <el-button  @click="getUsers"><i class="iconfont">&#xe60e;</i>快速查找</el-button>
              </el-form-item>

            </el-form>

            <!--列表-->
            <el-table :data="staff" highlight-current-row  @selection-change="selsChange" style="width: 100%;">

              <el-table-column type="selection" width="55"></el-table-column>

              <el-table-column prop="id" label="员工编号" width="100"></el-table-column>
              <el-table-column prop="roleid" label="所属角色" min-width="130" >
              </el-table-column>
              <el-table-column prop="name" label="姓名" width="120"></el-table-column>
              <el-table-column prop="groupname" label="工作部门" min-width="130" show-overflow-tooltip></el-table-column>
              <el-table-column prop="phone" label="phone" width="130"></el-table-column>
              <el-table-column prop="rolename" label="权限组" width="80"></el-table-column>
              <el-table-column  label="状态" width="80">
                <template scope="scope">
                  {{scope.row.status=='1'?'启动':'删除'}}
                </template>
              </el-table-column>
              <el-table-column label="操作" width="110">
                <template scope="scope">
                  <a size="small" @click="showEditDialog(scope.$index,scope.row)" class="edit"><i class="iconfont" >&#xe651;</i></a>
                  <a type="danger" @click="delUser(scope.$index,scope.row)" class="delete"><i class="iconfont">&#xe67e;</i></a>
                </template>
              </el-table-column>

            </el-table>

            <!--工具条-->
            <el-col :span="24"  class="toolbar" >
              <el-button type="danger"  @click="batchDetele" :disabled="this.sels.length===0" ><i class="iconfont">&#xe60d;</i>批量删除</el-button>
              <el-button  @click="exportUser"  class="output"><i class="iconfont" >&#xe60c;</i>导出数据</el-button>
              <el-pagination class="page" style="float:right;"
                             @size-change="handleSizeChange"
                             @current-change="handleCurrentChange"
                             :page-size="10"
                             layout="prev, pager, next, jumper"
                             :total="total">
              </el-pagination>
            </el-col>
          </div>
        </el-col>
      </el-row>


    </el-col>

    <!--添加/编辑员工信息-->
    <div class="warp-main add-page" style="position: absolute;width:100%;height: 100%; background-color:#fff; z-index:20;top:56px;" v-show="ruleDialog">
      <div class="title">
        添加/编辑员工信息
      </div>
      <el-form  :model="ruleForm" ref="ruleForm" label-width="120px" :rules="formRules" class="demo-ruleForm "  >
        <el-form-item label="用户名：" prop="account" >
        <el-input v-model="ruleForm.account" placeholder="支持英文、数字、减号或下划线"></el-input>
      </el-form-item>

        <el-form-item label="员工姓名：" prop="name">
          <el-input v-model="ruleForm.name" placeholder="2-4个中文汉字"></el-input>
        </el-form-item>
        <el-button type="text" @click="showResetPwd()" v-if="resetbtn" style="margin-left:200px;margin-top:-22px;">修改密码</el-button>
        <!--<el-form-item label="旧密码：" prop="oldpassword" v-show="setPass">-->
          <!--<el-input v-model="ruleForm.oldpassword" placeholder="8-16位英文和数字组成" auto-complete="off"></el-input>-->
        <!--</el-form-item>-->

        <!--<el-form-item label="密码：" prop="password" v-show="setPass">-->
          <!--<el-input v-model="ruleForm.password" placeholder="8-16位英文和数字组成" auto-complete="off"></el-input>-->
        <!--</el-form-item>-->

        <!--<el-form-item label="确认密码：" prop="checkpassword" v-show="setPass" >-->
          <!--<el-input v-model="ruleForm.checkpassword" placeholder="确认密码" auto-complete="off"></el-input>-->
        <!--</el-form-item>-->
        <el-form-item label="所属部门：" prop="groupids">
          <el-cascader :options="groupdatas"
                       :props="comprops"
                       v-model="selectedOptions"
                       filterable
                       :show-all-levels="true"
                       change-on-select
                       @change="handleItemChange" >
          </el-cascader>
        </el-form-item>

      <el-form-item label="所属角色:" prop="roleid">
        <el-select   v-model="ruleForm.roleid" style="width:220px;">
          <el-option
            v-for="item in roles"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>

        <el-form-item label="职务：">
          <el-input v-model="ruleForm.job"></el-input>
        </el-form-item>

        <el-form-item label="绑定mac地址：">
          <el-input v-model="ruleForm.mac"></el-input>
        </el-form-item>
        <el-form-item label="手机号码：" prop="phone">
          <el-input v-model="ruleForm.phone"></el-input>
        </el-form-item>

      <el-form-item label="状态" prop="label">
        <el-select  placeholder="状态选择" v-model="ruleForm.status" style="width:220px;">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>

        <el-form-item>
          <el-button type="primary" @click.native="saveSubmit()">保存</el-button>
          <el-button @click="resetForm" >返回</el-button>
        </el-form-item>
      </el-form>
    </div>

    <el-dialog title="修改密码" :visible.sync="dialogFormVisible" >
      <el-form :model="form" width="30%" ref="form" :rules="formRules">
        <el-form-item label="旧密码：" prop="oldpassword" width='100px;' :label-width="formLabelWidth">
          <el-input v-model="form.oldpassword" placeholder="8-16位英文和数字组成" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="新密码：" prop="password" :label-width="formLabelWidth">
          <el-input v-model="form.password" placeholder="8-16位英文和数字组成" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码：" prop="checkpassword" :label-width="formLabelWidth">
          <el-input v-model="form.checkpassword" placeholder="确认密码" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="calcelPwd()">取 消</el-button>
        <!--<el-button @click="resetForm('ruleForm')">重置</el-button>-->
        <el-button type="primary" @click="pwdSubmit">确 定</el-button>
      </div>
    </el-dialog>

  </el-row>
</template>
<script>

  import util from '../../common/util'
  import {exportUserList,checkPassword,updatePassword,getGroupTree,getCompanyList,getQueryregion,AddCompanyList,reqDeleteCompany,getCompanyTree,UpdateCompany,QueryCompany,getUserList,AddUser,UpdateUser,DeleteUser,DeleteUserList,getRoleList,groupTreeById} from '../../api/api';

   function $(classname) {
    return document.getElementsByClassName(classname)
  }
  export default{
    data(){
      //用户名验证（允许使用英文、数字、下滑线、横杠，一共3~16个字符）
      var validateAccount = (rule, value, callback) => {
        var regExp = /^[A-za-z0-9_-]{3,16}$/;
        if (value === '') {
          callback(new Error('请输入用户名'));
        } else if (regExp.test(value) === false) {
          callback(new Error('限3~16个字符，支持英文、数字、减号或下划线'))
        } else {
          callback();
        }
      }
      //姓名验证   2-4个汉字
      var validateName = (rule, value, callback) => {
        var regExp= /^[\u4e00-\u9fa5]{2,4}$/;
        if (value === '') {
          callback(new Error('请输入姓名'));
        }else if(regExp.test(value) === false){
          callback(new Error('请输入2-4个中文汉字'))
        } else {
          callback();
        }
      }
      //旧密码
      var validateOldPass = (rule, value, callback) => {
        console.log(value);
        let para = {
          id:this.form.id,
          oldpassword:value
        }
        checkPassword(para).then((res) => {
          if (res.code !== 200) {
          callback(new Error('旧密码输入错误'))
          }else {
          callback();
        }
      });
      }
      //验证密码
      var validatePass = (rule, value, callback) => {
        var regExp = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/;
        if (value === '') {
          callback(new Error('请输入密码'))
        } else if (regExp.test(value) === false) {
          callback(new Error('8-16字母和数字组成，不能是纯数字或纯英文'))
        } else {
          callback();
        }
      }
      //确认密码
      var validateCheckPass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'))
        } else if (value !== this.form.password) {
          callback(new Error('两次输入密码不一致'));
        } else {
          callback()
        }
      }
      //验证部门是否为空
      var validateDept =  (rule, value, callback) => {
        if(value&&value.length== 0){
          callback(new Error('请选择部门'));
        }else{
          callback()
        }
      }

      //验证电话号码正则表达式
      var validatePhone = (rule, value, callback) =>
      {
        var regExp = /^1[3|5|8|7][0-9]{9}$/;
        if (value === '') {
          callback(new Error('请输入手机号码'));
        } else if (regExp.test(value) === false) {
          callback(new Error('请输入正确手机号码'))
        } else {
          callback();
        }
      }
      var validateRole = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请选择'));
        } else{
          callback();
        }
      }

      return {
        states:false,
        state2:true,
        comprops: {
          children: 'children',
          label:'fullname',
          value:'id'
        },
        roleprops: {
          label:'name',
          value:'id'
        },
        filters: {
          id:'',
          account:'',
          name: ''
        },
        defaultProps: {
          children: 'children',
          label: 'fullname'
        },
        /*状态下拉框*/
        options: [{
          value: '1',
          label: '启动'
        },{
          value: '0',
          label: '删除'
        }],
        resetbtn:false,
//        setPass:false,
        value: '',
        roleid:'',
        selectedOptions: [],
        groupdatas:[],
        editDialog:false,
        parents:{},
        addDialog:false,
        ruleDialog:false,
        cities:{},
        areas:{},
        pid:'',
        staff: [],
        total: 0,
        page: 1,
//        listLoading: false,
        sels: [], //列表选中列
        roles:[],
        treedata:[],
        list:[],
        deptid:'1',
        //编辑相关数据
        editFormVisible: false,
        editLoading: false,
        dialogFormVisible: false,
        formLabelWidth: '120px',
        form: {
          id:'',
          region: '',
          delivery: false,
          type: [],
          resource: '',
          desc: '',
          oldpassword:'',
          password:'',
          checkpassword:''
        },
        ruleForm: {
          id: '',
//          avatar:'',
          account:'',
          name: '',
//          password:'',
//          oldpassword:'',
//          checkpassword:'',
//          salt:'',
//          birthday:'',
//          sex: 1,
          email:'',
          phone:'',
          roleid:'',
          deptid:'',
          companyid:'',
          regionid:'',
          status: 1,
          mac:'',
          createtime:'',
          version:'',
          groupids:[],
          groupid:'',
          job:'',
          selectedOptions:[],
        },

        //新增相关数据
//        addFormVisible: false,//新增界面是否显示
        addLoading: false,
        formRules: {
          account: [
            {required: true, validator: validateAccount, trigger: 'blur'}
          ],
          name: [
            {required: true, validator: validateName, trigger: 'blur'}
          ],
          oldpassword: [
            {required: true, validator:validateOldPass, trigger: 'blur'}
          ],
          password: [
            {required: true, validator:validatePass, trigger: 'blur'}
          ],
          checkpassword: [
            {required: true, validator:validateCheckPass, trigger: 'blur'}
          ],
//          checkpasswordEdit: [
//            {required: true, validator:validateCheckPassEdit, trigger: 'blur'}
//          ],
          groupids: [
            {required: true, validator:validateDept, trigger: 'blur'}
          ],
          job: [
            {required: true, message: '请输入职位', trigger: 'blur'}
          ],
          mac: [
            {required: true, message: '请输入mac地址', trigger: 'change'}
          ],
          phone: [
            {required: true, validator: validatePhone, trigger: 'change'}
          ],
          roleid: [
            {required: true, validator: validateRole, trigger: 'blur'}
          ]
        }
      }
    },

    methods: {

//      change(n){
//        switch(n){
//          case 1:
//            return n = '系统管理员';
//            break;
//          case 2:
//            return n = '管理员';
//            break;
//          case 3:
//            return n = '操作员';
//            break;
//        }
//      },
      treePicture:function(){},
        //刷新
      winReload:function(cond){
        this.groupTree();
        this.state2 =false
        this.states=false;
        setTimeout(()=>{
          this.state2 =true

        },1)
        this.deptid = 1;
        this.getUsers();
      },
      //展开全部
      winReloadW:function(){
        this.state2=false;
        this.states=true;
        this.addLoading = true;
        setTimeout(()=>{
          this.state2 =true
          this.addLoading = false;
        },1)
        this.groupTree();
      },
      groupTree:function(){
        getGroupTree().then((res) => {
          console.log(res.data);
          this.treedata = res.data;
        })
      },
      //下拉框
      handleChange(value) {
        console.log(value);
      },
      handleSizeChange(val) {
        console.log('每页 ${val} 条');
      },
      handleCurrentChange(val) {
        this.page = val;
        this.getUsers();
        console.log('当前页: ${val}');
      },

      handleItemChange(data){
        this.ruleForm.groupids=data;
        this.ruleForm.groupid=data;
        this.ruleForm.groupid=this.ruleForm.groupid[this.ruleForm.groupid.length-1];
        this.groupid = this.ruleForm.groupid;
        this.roleList();

      },
      groupTree:function(){
        getGroupTree().then((res) => {
          console.log(res.data);
        this.treedata = res.data;
        })
      },
      //获取用户列表
      getUsers:function(){
        let para = {
          page: this.page,
          limit: 10,
          id: this.filters.id,
          account: this.filters.account,
          name: this.filters.name,
          status:1,
          deptid:this.deptid,
        };

        this.listLoading = true;
        getUserList(para).then((res) => {
//          console.log(res.data);
          this.total = res.pageInfo.total;
          this.staff = res.data;
          this.password = res.data;
          console.log(this.password);
//          console.log(res.data);
          this.listLoading = false;
      })
      },
      handleNodeClick: function(data){
         console.log(data.id);
         this.deptid = data.id;
         this.getUsers();
      },
      selsChange: function (sels) {
        this.sels = sels;
      },

      //显示编辑界面
      showEditDialog: function (index,row) {
        this.resetbtn = true,
        this.ruleDialog = true;
        this.ruleForm = Object.assign({}, row);
        console.log(this.ruleForm);
        this.form = Object.assign({}, row);
//        console.log(this.form);
        this.ruleForm.status = this.ruleForm.status=='1'?'启动':'删除'
        this.selectedOptions = JSON.parse(this.ruleForm.groupids);
        this.roleList();
      },
      //返回
      resetForm:function(){
          this.ruleDialog=false;
          this.$refs['ruleForm'].resetFields();
          this.ruleForm.roleid = '';
          this.ruleForm.job= '';
          this.ruleForm.mac= '';
          this.selectedOptions = [];
          this.dialogFormVisible = false;

      },
      ///显示添加页面
      showAddDialog: function () {
        this.resetbtn = false,
        console.log(this.ruleForm);
        this.ruleDialog=true;
//        this.ruleForm.selectedOptions = [];
        this.ruleForm.status = this.ruleForm.status=='1'?'启动':'删除';
      },

      showResetPwd: function(){
       // this.form = Object.assign({});
        this.form = this.form;
        console.log(this.form);
        console.log(this.form.id);
        this.dialogFormVisible = true;
      },
      calcelPwd:function(){
        this.dialogFormVisible = false;
        this.$refs['form'].resetFields();
      },
      //获取角色列表
      roleList() {
        let para = {
          groupid:this.groupid
        };
        getRoleList(para).then((res) => {
          this.roles = res.data;
        })
      },
      //根据用户权限查询组织树
      groupList(){
        let para = {
        };
        groupTreeById(para).then((res) => {
          this.groupdatas = res.data;
        })
      },

//        保存密码
      pwdSubmit: function () {
        this.$refs.form.validate((valid) => {
          if (valid) {
//            this.addLoading = true;
            let para = Object.assign({}, this.form);
            console.log(para);
            updatePassword(para).then((res) => {
//              this.addLoading = true;
              this.$message({
                message: res.msg,
              });
              this.dialogFormVisible = false;
            });

          }
        });
      },
      //保存
      saveSubmit: function (){
        this.$refs.ruleForm.validate((valid) => {
          if (valid) {
            this.addLoading = true;
            if(this.ruleForm.id){
              this.$confirm('确认提交吗？', '提示', {}).then(() => {
                this.editLoading = true;
              //            console.log(this.ruleForm.status)
                if(this.ruleForm.status=='删除'){
                  this.ruleForm.status = 0
                }
                console.log(this.ruleForm.status)
                this.ruleForm.status=this.ruleForm.status=='启动'?'1':'0';
                let para = Object.assign({}, this.ruleForm);
                console.log(para);
                UpdateUser(para).then((res) => {
  //                  this.editLoading = false;
                  this.$message({
                    message: res.msg
                  });
                this.$refs['ruleForm'].resetFields();
                  this.ruleDialog = false;
                  this.getUsers();
                });
              });
            }else{

              this.ruleForm.groupids=JSON.stringify(this.ruleForm.groupids);
              this.ruleForm.status=this.ruleForm.status=='启动'?'1':'0';
              // console.log()
              let para = Object.assign({}, this.ruleForm);
                console.log(para);
              AddUser(para).then((res) => {
                if (res.code !== 200 ){
                  this.ruleDialog = true;
                  this.$message({
                    message: res.msg,
                    type: 'error'
                  });

                }else{
                  this.$message({
                    message: res.msg,
                  });
                  this.selectedOptions = [];
                  this.ruleDialog = false;
                  this.getUsers();
                }
              });

            }
          }
        });
      },
      //删除
      delUser: function (index, row) {
        this.$confirm('确认删除该记录吗?', '提示', {type: 'warning'}).then(() => {
          this.listLoading = true;
          let para = {id: row.id};
        DeleteUser(para).then((res) => {
          this.listLoading = false;
          this.$message({
          message: res.msg
        });
        this.getUsers();
      });
      }).catch(() => {
        });
      },
      //批量删除
      batchDetele: function () {
        var ids = this.sels.map(item => item.id);
        this.$confirm('确认删除选中记录吗？', '提示', {
            type: 'warning' }).then(() => {
          this.listLoading = true;
          let para = ids;
        DeleteUserList(para).then((res) => {
          this.listLoading = false;
        this.$message({
          message: res.msg
        });
        this.getUsers();
      });
      }).catch(() => {

        });
      },
      /*导出员工列表*/
      exportUser(){
        let para = {
          id: this.filters.id,
          account: this.filters.account,
          name: this.filters.name,
          status:1,
          deptid:this.deptid,
        };
        this.listLoading = true;
        exportUserList(para).then((res) => {
          this.list = res.data;
          this.listLoading = false;
          this.$message({
            message: res.msg
          });
          this.handleDownload();
        });

      },
      handleDownload() {
        require.ensure([], () => {
          const {
            export_json_to_excel
          } = require('../../vendor/Export2Excel');
        const tHeader = ['员工编号', '员工姓名', '工作部门', '所属角色', '联系方式'];
        const filterVal = ['id', 'name', 'groupname', 'rolename', 'phone'];
        const list = this.list;
        const data = this.formatJson(filterVal, list);
        export_json_to_excel(tHeader, data, '员工列表');
      });
      },
      formatJson(filterVal, jsonData) {
        return jsonData.map(v => filterVal.map(j => v[j]))
      }


      /*exportUser: function () {
        this.$confirm('你确认要导出全部记录吗？', '提示', { type: 'warning' }).then(() => {
          this.listLoading = true;
          let para = {
          id: this.filters.id,
          account: this.filters.account,
          name: this.filters.name,
          status:1,
          deptid:this.deptid,
          };
          exportUserList(para);
        this.listLoading = false;
         }).catch(() => {

        });*/

    },

    mounted() {
      this.getUsers();
//      this.getCompany();
      this.groupTree();
      this.groupList();
      this.treePicture();
    }
  }
</script>

<style lang="scss" scoped>
.warp{
  height: 100%;
  .warp-main {
    /*padding: 0 24px;*/
    position: relative;
    overflow:auto;
    height: calc(100% - 56px);
    .demo-ruleForm{
      padding: 30px 0;
    .el-form-item{
    .el-form-item__content{
      span{margin-left:0px;}
      .el-input{
        width:220px;
        float:left;
        margin-right: 10px;
      }
    .el-button{
      width: 220px;
    }

    }
    }



    }

    .demo-table-expand label {
      font-weight: bold;
    }



    .el-row{
      height:100%;
      .demo-table-expand label {
        font-weight: bold;
      }
      .aside{
        position:relative;
        height: 100%;
        border-right: 1px solid #dceaea;
        .pre-title{
          height: 40px;
          background-color: #eff5f5;
          padding: 0 24px;
          h5{
            float: left;
            margin: 0;
            line-height: 40px;
          }
          .add{
            float: right;
            font-size: 12px;
            line-height: 40px;
          }
        }
        .fresh{
          padding: 10px 24px;
          font-size: 12px;
          color:#94a0ad;
          a {cursor: pointer;  }
          a:hover{ color:#323232;  }
        }
        .grid-content{
          overflow: auto;
          height: 500px;
          .tree{
            width:300px;
              box-sizing:border-box;
              /*padding: 0 14px;*/
              .el-tree{
                border:none;
                .el-tree-node{

                    .el-tree-node__content:hover{
                      /*background: rgb(228, 235, 241);*/
                      background:transparent;
                    }
                    .el-tree-node__content{
                    /*height:24px;*/
                      height:24px;
                      line-height:24px;
                      /*vertical-align:top;*/
                      .el-tree-node__expand-icon{
                        border:none;
                        width: 20px;
                        height: 24px;
                        line-height: 28px;
                        transform: rotate(0deg);
                        background:url(../../assets/icon/+T_c.png) no-repeat;
                        &.expanded{
                           background:url(../../assets/icon/-T_c.png) no-repeat;
                         }
                      }

                      .el-tree-node__label{
                        /*border-left:1px dotted #afb8c2;   !*灰色边*!*/
                        /*border-left:2px dotted #00f;*/
                        margin-left:0px;
                        padding-left:10px;
                        background:url(../../assets/icon/T_line_c.png) repeat-y 0 0px;
                      }
                      .el-tree-node__label:before{
                        /*padding-left:20px;*/
                        content:'';
                        padding-left:20px;
                        /*border-top:2px solid #0f0;*/
                        background:url(../../assets/icon/tree_1.png) no-repeat;
                      }
                      .el-tree-node__label:nth-child(1){
                        background:none;
                      }

                    }
                    .el-tree-node__children{
                      .el-tree-node{
                        .el-tree-node__content{
                          .el-tree-node__label{
                            /*border-left:1px dotted #afb8c2;   !*灰色边*!*/
                            /*border-left:2px dotted #00f;*/
                            background:url(../../assets/icon/T_line_c.png) no-repeat 0 0px;
                          }
                          .el-tree-node__label:before{
                            padding-left:20px;
                            content:'';
                            background:url(../../assets/icon/tree_2.png) no-repeat;
                          }

                        }
                        .el-tree-node__children{
                          .el-tree-node{
                            .el-tree-node__content{
                              .el-tree-node__label{
                                /*border-left:1px dotted #afb8c2;   !*灰色边*!*/
                                /*border-left:2px dotted #00f;*/
                                background:url(../../assets/icon/T_line_c.png) no-repeat 0 0px;
                              }
                              .el-tree-node__label:before{
                                padding-left:20px;
                                content:'';
                                background:url(../../assets/icon/tree_3.png) no-repeat;
                              }
                            }

                            .el-tree-node__children{
                              .el-tree-node{
                                .el-tree-node__content{
                                  .el-tree-node__expand-icon{
                                    background: none;
                                  }
                                  .el-tree-node__label:before{
                                    padding-left:20px;
                                    content:'';
                                    background:url(../../assets/icon/tree_4.png) no-repeat;
                                  }
                                }
                              }

                              .el-tree-node:nth-last-child(1){
                                .el-tree-node__content{
                                  .el-tree-node__label{
                                    /*border-left:2px dotted #0f0;*/
                                    background:url(../../assets/icon/T_line_b.png) no-repeat 0 0px;
                                  }
                                }
                              }
                              .el-tree-node:nth-child(1){
                                .el-tree-node__content{
                                  .el-tree-node__label{
                                    /*border-left:2px dotted #f00;*/
                                    background:url(../../assets/icon/T_line_c.png) no-repeat 0 0px;
                                  }
                                }
                              }



                            }
                          }

                          .el-tree-node:nth-last-child(1){
                            .el-tree-node__content{
                              .el-tree-node__label{
                                /*border-left:2px dotted #0f0;*/
                                background:url(../../assets/icon/T_line_b.png) no-repeat 0 0px;
                              }
                            }
                          }
                          .el-tree-node:nth-child(1){
                            .el-tree-node__content{
                              .el-tree-node__label{
                                /*border-left:2px dotted #f00;*/
                                background:url(../../assets/icon/T_line_c.png) no-repeat 0 0px;
                              }
                            }
                          }



                        }

                      }
                      .el-tree-node:nth-last-child(1){
                        .el-tree-node__content{
                            .el-tree-node__label{
                                /*border-left:2px dotted #0f0;*/
                                background:url(../../assets/icon/T_line_b.png) no-repeat 0 0px;
                              }
                            }
                          }
                      .el-tree-node:nth-child(1){
                        .el-tree-node__content{
                          .el-tree-node__label{
                            /*border-left:2px dotted #f00;*/
                            background:url(../../assets/icon/T_line_c.png) no-repeat 0 0px;
                          }
                        }
                      }



                    }


                }
                .el-tree-node:nth-last-child(1){
                  .el-tree-node__content{
                    .el-tree-node__expand-icon{
                      border:none;
                      width: 20px;
                      height: 24px;
                      transform: rotate(0deg);
                      background:url(../../assets/icon/+T.png) no-repeat;
                      &.expanded{
                         background:url(../../assets/icon/-T.png) no-repeat;
                       }
                    }

                      .el-tree-node__label{
                      /*border-left:2px dotted #0f0;*/
                      background:url(../../assets/icon/T_line_b.png) no-repeat 0 0px;
                    }
                  }
                }
                .el-tree-node:nth-child(1){
                  .el-tree-node__content{
                    .el-tree-node__label{
                      /*border-left:2px dotted #f00;*/
                      background:url(../../assets/icon/T_line_c.png) no-repeat 0 0px;
                    }
                  }
                }




              }
          }
        }
      }
      .right{
        padding: 0 24px;
        .title{
          border-bottom: 1px solid #dceaea;
          padding: 25px 0;
          font-size: 18px;
        }
        .grid-content{
           .el-table{
             .el-table__header-wrapper{
               table{
                  thead{
                    tr{
                      th{
                        text-align:center;
                      }
                    }
                  }
               }
             }
             .el-table__body-wrapper{
               table{
                 tbody{
                    tr{
                      text-align: center;
                      td{
                        .edit{margin-right: 6px;}
                        .edit:hover{color:#32b5cb;}
                        .delete:hover{color:#ff6d5b;}
                        .iconfont{
                          cursor:pointer;
                        }
                      }
                    }
                 }
               }
             }
           }

          .toolbar {
            padding: 8px 20px;
            border: 1px solid #dceaea;
            .el-button{
               padding: 4px 8px;
              &.delete:hover{ color:#ff6c5a; border:1px solid #ff6c5a; }
              &.output:hover{ color:#32b5cb;}
            }

          }
        }
      }
    }







  }
  .edit-page, .add-page{
    padding: 0 24px !important;
    .title{
      border-bottom: 1px solid #dceaea;
      padding: 25px 0;
      font-size: 18px;
    }

  }


}

</style>
