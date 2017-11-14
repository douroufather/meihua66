<template>
  <el-row class="warp" style="position:relative;">
    <div style="width:100%;height:100%;position:relative;top:10px;right:0px;z-index: 50;" v-show="dialog" >
      <el-col :span="24" class="warp-breadcrum">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }"><b>当前位置：首页</b></el-breadcrumb-item>
          <el-breadcrumb-item>角色管理</el-breadcrumb-item>
          <el-breadcrumb-item>新增角色信息</el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>

      <el-col :span="24" class="warp-main">
        <div class="title">
          添加/编辑角色信息
        </div>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm ">
          <el-form-item label="所属部门：" >
            <el-cascader :options="companydatas"
                         :props="comprops"
                         v-model="selectedOptions"
                         filterable
                         :show-all-levels="true"
                         change-on-select
                         @change="handleItemChange">
            </el-cascader>
          </el-form-item>
          <el-form-item label="角色名称:"  >
            <el-input v-model="ruleForm.name" ></el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click.native="addSubmit">保存</el-button>
            <el-button @click="resetForm">返回</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </div>

    <el-col :span="24" class="warp-breadcrum">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }"><b>当前位置：首页</b></el-breadcrumb-item>
        <el-breadcrumb-item>用户管理</el-breadcrumb-item>
        <el-breadcrumb-item>角色管理</el-breadcrumb-item>
      </el-breadcrumb>
    </el-col>

    <el-col :span="24" class="warp-main" >
      <!--工具条-->
      <el-row>
        <el-col :span="24" class="right">
          <div class="title">
            角色管理
            <!--<el-button type="primary" style="float: right;" @click="showAddDialog" ><i class="iconfont" style="margin-right:3px;">&#xe6ff;</i>添加公司</el-button>-->
            <!--<el-button type="primary" @click="showAddDialog">添加按钮</el-button>-->
          </div>
          <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" @selection-change="selsChange">
            <div class="step"  >
              <div class="tab " style=" margin-right:20px;width:250px;">
                <label class='el-title' >选择地区</label>
                <!--<div class="fresh" ><a @click="winReload"> 刷新</a>&nbsp;|&nbsp;<a @click="winReloadW">展开全部</a></div>-->
                <div class="grid-content bg-purple">
                  <div class="tree">
                    <el-tree :data="treedata" default-expand-all highlight-current :props="defaultProps"  @node-click="handleNodeClick"  v-if="state2"></el-tree>
                    <!--:default-expand-all="states"-->
                  </div>
                </div>
              </div>

              <div class="tab " style="margin-right:20px" >
                <label class='el-title' :model="filters">选择角色
                   <!--<el-input style="width:120px; margin-left:20px;" v-model="filters.name" placeholder="角色搜索" icon="search"></el-input>-->
                   <el-button @click="showAddDialog()" class='el-button-btn' style="float:right;margin:4px 10px;">添加角色</el-button>
                </label>
                <!--<el-radio class="radio" label="1">全局钥匙</el-radio>-->
                <el-table  class="roletab" :data="roledata" stripe  :show-header="false" style="height:280px;">
                  <el-table-column type="selection" class="selection" width="52">
                    <template scope="scope">
                      <!--contenteditable="true"-->
                      <el-radio   v-model="ruleForm.id" :label="scope.row.id" @click.native="roleClick(scope.row.id)" ></el-radio>
                    </template>
                  </el-table-column>
                  <el-table-column min-width="180" prop="name" v-model="ruleForm.name"  id="sss" style="overflow-x: hidden;"></el-table-column>
                  <el-table-column label="操作" width="80">
                    <template scope="scope">
                      <a size="small" @click="showEditDialog(scope.$index,scope.row)" v-if="scope.$index > 2 " class="edit" ><i class="iconfont">&#xe651;</i></a>
                      <a type="danger" @click="del(scope.$index,scope.row)" v-if="scope.$index > 2 " class="delete"><i class="iconfont" >&#xe67e;</i></a>
                    </template>
                  </el-table-column>
                </el-table>

              </div>
              <div class="tab " style=" margin-right:20px;width:250px;" >
                <label class='el-title' >编辑权限
                  <div class="buttons" style="display: inline-block">
                    <!--:disabled="this.scope.row.id===''-->
                    <el-button @click="rightSubmit" class='el-button-btn' style="margin-left:20px;" :disabled="this.ruleForm.roleId =='' " >保存</el-button>
                    <el-button @click="resetChecked" class='el-button-btn'>清空</el-button>
                    <!--<el-button @click="getCheckedNodes">通过 node 获取</el-button>-->
                  </div>
                </label>
                <!--<div class="fresh"  ><a >全部选择</a></div>-->
                <div class="grid-content bg-purple">
                  <div class="tree">
                    <el-tree  :data="rightlistdata" highlight-current  node-key="id" ref="tree"  :props="rightprops"  :check-strictly="true":default-checked-keys="arr" show-checkbox  default-expand-all></el-tree>
                  </div>

                </div>
              </div>
            </div>


          </el-form>
        </el-col>
      </el-row>
    </el-col>
  </el-row>
</template>
<script>

  import util from '../../common/util'
  import {regionTree,getGroupTree,getDeptTree,getCompanyTree,getRoleList,rightList,addRole,updateRole,deleteRole,addRight} from '../../api/api';

  export default{
    data(){
      return {
        states:false,
        state2:true,
        comprops: {
          children: 'children',
          label:'fullname',
          value:'id'
        },
        ruleForm: {
          id:'',
//          simplename: '',
//          fullname:'',
//          parentId: '',
//          address:'',
          regionid:'',
          roleId:'',
          menuId:'',
          menuIds:[],
          groupids:[],
          groupid:'',
          name:'',
//          contenteditable:false,
//          editname: '',
//          region: '',
//          delivery: false,
//          type: [],
//          resource: '',
//          desc: ''
        },
        rules: {
          proname: [
            { required: true, message: '请选择活动区域', trigger: 'blur' }
          ],
          fullname: [
            {  required: true, message: '请输入公司名称', trigger: 'change' }
          ]
        },
        filters: {
          name: ''
        },
        reginprops: {
          children: 'children',
          label:'name',
          value:'id'
        },
        rightprops:{
          children:'children',
          label:'name',
          value:'id'
        },
        defaultProps: {
          children: 'children',
          label: 'fullname'
        },
//        formLabelWidth: '100px',
        treedata:[],
        deptid:'1',
//        selectedOptions3:['0'],
        currentPage3:this.page,
        dialog:false,
        parents:{},
        arr:[],
        pid:'',
        pids:'',
        sels: [],
        companydatas:[],
        selectedOptions:['1'],
        total: 0,
        pageinfo:{},
        listLoading: false,
        regintreedata:[],
        rightlistdata:[],
        roledata:[],
        regionId:'',
        roleId:"",
        contenteditable:false,
//        dialogFormVisible: false,
        setCheckedKeys:[]
      }
    },
    methods: {
      //刷新
      winReload:function(cond){
        this.groupTree();
        this.state2 =false
        this.states=false;
        setTimeout(()=>{
          this.state2 =true

        },1)
        this.pid=1;
        this.getRoleList();
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
      selsChange: function (sels) {
        this.sels = sels;
      },
      handleChange(value) {
        console.log(value);
      },
      clearRuleForm(){
        this.$refs['ruleForm'].resetFields();
        this.selectedOptions = ['1'];
        this.ruleForm.name =''
      },
      //添加
      showAddDialog: function () {
        this.dialog=true;
      },
      handleSizeChange(val) {
        console.log('每页 ${val} 条');
      },
      handleCurrentChange(val) {
        this.page = val;
        this.getCompanys();
        console.log('当前页: ${val}');
      },
//el-tree
      handleNodeClick(data) {
//        console.log(data);
        this.pid = data.id;
        console.log(data.id);
        this.getRoleList();
      },
      handleItemChange(data){
        this.ruleForm.groupids=data;
        this.ruleForm.groupid=data;
      },
      reginTreeClick(data) {
        this.regionid = data.id;
        this.ruleForm.regionid = data.id;
      },
      roleClick(id){
        console.log(id)
        this.ruleForm.roleId=id;
        console.log(this.ruleForm.roleId);
        this.roleId=id;
        this.getRightList();
      },
      //删除值
      removeValue:function(index){
        console.log(index);
        (this.ruleForm.dictVos).splice(index,1)
      },
      //返回
      resetForm:function(){
        this.dialog=false;
        this.clearRuleForm();
      },
      groupTree:function(){
        getGroupTree().then((res) => {
           console.log(res.data);
          this.treedata = res.data;
        })
      },
      companyTree:function(){
        getCompanyTree().then((res) => {
//          console.log(res.data);
        this.companydatas=res.data;
        })
      },
      //显示编辑界面
      showEditDialog: function (index,row) {
        this.dialog=true;
        this.ruleForm = Object.assign({}, row);
        console.log(this.ruleForm.groupid);
        console.log(this.ruleForm.groupids);

        this.selectedOptions = JSON.parse(this.ruleForm.groupids);
//        this.userOptions = [this.ruleForm.userid];
      },
      //添加与编辑
      addSubmit: function () {
        this.$refs.ruleForm.validate((valid) => {
          if (valid) {
            this.addLoading = true;
//            let para = Object.assign({}, this.ruleForm);
            var para='';
            if(this.ruleForm.id){
              this.ruleForm.groupids=JSON.stringify(this.ruleForm.groupids);
              this.ruleForm.groupid=this.ruleForm.groupid[this.ruleForm.groupid.length-1];
              para = Object.assign({}, this.ruleForm);
              console.log(para);
              updateRole(para).then((res) => {
                this.addLoading = false;
                this.$message({
                  message: res.msg,
                });
//                this.showEditDialog();
                this.dialog=false;
//                this.$refs['ruleForm'].resetFields();
                this.getRoleList();
              });
            }else{
              console.log(this.$refs.tree.getCheckedKeys());
              this.ruleForm.groupids=JSON.stringify(this.ruleForm.groupids);
              this.ruleForm.groupid=this.ruleForm.groupid[this.ruleForm.groupid.length-1];
//              this.ruleForm.menuIds=this.$refs.tree.getCheckedKeys();
//              this.ruleForm.menuId=JSON.stringify(this.ruleForm.menuIds);
              para = Object.assign({}, this.ruleForm);
              console.log(para);
              addRole(para).then((res) => {
                this.addLoading = false;
                console.log(res);
                this.$message({
                  message: res.msg,
                });
                this.dialog=false;
                this.clearRuleForm();
                this.getRoleList();
              });
            }
            console.log(para);
          }
        });
      },

      //编辑权限
      rightSubmit: function () {
        this.$refs.ruleForm.validate((valid) => {
          if (valid) {
            this.ruleForm.roleId=this.roleId;
            this.ruleForm.menuIds=this.$refs.tree.getCheckedKeys();
           // this.ruleForm.menuIds=JSON.stringify(this.ruleForm.menuIds);
           let para = Object.assign({}, this.ruleForm);
            console.log(para);
            addRight(para).then((res) => {
              this.addLoading = false;
            console.log(res);
            this.$message({
              message: res.msg,
            });
            this.dialog=false;
            this.getRightList();
          });
          }
        });
      },
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
      //获取角色列表
      getRoleList() {
        let para = {
          groupid:this.pid
        };
//        console.log(para);
        this.listLoading = true;
        getRoleList(para).then((res) => {
          console.log(res);
//          console.log(res.data);
          this.roledata = res.data;
          this.listLoading = false;
        //NProgress.done();
        })
      },
      //区域树
//      getRegionTree:function(){
//        let para = {
//          regionid:this.regionid
//        };
//        console.log(para);
//        this.listLoading = true;
//        getDeptTree(para).then((res) => {
//          console.log(res.data);
//          this.regintreedata = res.data;
////          console.log(res.data);
//          this.listLoading = false;
//        })
//      },

      getCheckedKeys:function(){
        console.log(this.$refs.tree.getCheckedKeys());

     },
//      getCheckedNodes:function(){
//        console.log(this.$refs.tree.getCheckedNodes());
//      },
      resetChecked() {
        this.$refs.tree.setCheckedKeys([]);
      },
      allChecked() {
//           this.$refs.tree.setCheckedKeys([]);
            for(i=0;i<$refs.tree.setCheckedKeys.length;i++){

            }
      },
      //编辑权限树
      getRightList:function(){
        let para = {
          roleId: this.roleId
        };
//        console.log(para);
//        this.listLoading = true;
        rightList(para).then((res) => {
          console.log(res.data);
          this.rightlistdata = res.data.rightTree;
          this.arr = res.data.menuIds;
          console.log(this.arr);
          this.listLoading = false;
        })
      },
      //删除
      del: function (index, row) {
         this.$confirm('确认删除该记录吗?', '提示', {type: 'warning'}).then(() => {
          this.listLoading = true;
        //NProgress.start();
        let para = {id: row.id};
        deleteRole(para).then((res) => {
          this.listLoading = false;
        //NProgress.done();
        this.$message({
          message: res.msg,
          type: 'success'
        });
        this.getRoleList();
      });
      }).catch(() => {
        });
      }
    },
    mounted() {
      this.groupTree();
      this.getRoleList();
      this.getRightList();
      this.companyTree();
    }
  }
</script>

<style lang="scss" >
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
          .el-form {
            .step {
              .tab {
                float: left;
                margin-top: 54px;
                width: 350px;
                overflow: hidden;
                display: inline-block;
                .el-title, .radio {
                  font-size: 14px;
                  font-weight: bold;
                  box-sizing: border-box;
                  width: 350px;
                  display: block;
                  border: 1px solid #dfe9ec;
                  border-bottom: none;
                  background-color: #eef3f6;
                  height: 40px;
                  line-height: 40px;
                  padding-left: 20px;
                }
                .el-title{
                  .el-button-btn{
                    height:30px;
                    padding:5px 10px;
                  }
                }
                .el-table {
                  width: 350px;
                  display: inline-block;
                  .el-table__body-wrapper {
                    height: 280px;
                    overflow: auto;
                    .el-table__body{
                      width:350px;
                      .el-table__row{
                        width: 350px;
                        .cell{
                          .el-radio{
                            .el-radio__label{
                              display: none;
                            }
                          }
                          .el-checkbox{
                            .el-checkbox__input{
                              .el-checkbox__inner{
                                border-radius: 9px;
                                /*background-color: #32b5cb;*/
                                border:2px solid #e3e4e8;
                              }
                              &.is-checked{
                                .el-checkbox__inner{
                                  background-color: #fff;
                                  border:2px solid #32b5cb;
                                }
                                .el-checkbox__inner:after{
                                  box-sizing: content-box;
                                  content: "";
                                  border-left: 0;
                                  border-top: 0;
                                  position: absolute;
                                  transform-origin: center;
                                  width: 6px;
                                  height: 6px;
                                  border-radius: 50%;
                                  background-color: #32b5cb;
                                  left: 34%;
                                  top: 30%;
                                  /*transform: translate(-50%, -50%) scale(0);*/
                                  transition: transform .15s cubic-bezier(.71,-.46,.88,.6) .05s;
                                }
                              }


                            }
                          }
                        }
                      }
                    }
                  }
                }
                .fresh {
                  padding: 10px 24px;
                  font-size: 12px;
                  color: #94a0ad;
                  border-left: 1px solid #d1e0e5;
                  border-right: 1px solid #d1e0e5;
                  a {cursor: pointer;}
                  a:hover { color: #323232; }
                  }
                }
                .grid-content {
                  height: 280px;
                  overflow: auto;
                  border: 1px solid #d1e0e5;
                  border-top: none;
                  .tree {
                    .el-tree {
                      border: none;
                      .el-tree-node__content {
                        height:30px;
                        line-height:30px;
                        /*border-left:1px solid #f00;*/
                        /*padding-left:0;*/
                        /*margin-left:16px;*/
                        .el-tree-node__expand-icon {
                          border: none;
                          width: 13px;
                          height: 13px;
                          transform: rotate(0deg);
                          background: url(../../assets/icon/+.png);
                          &.expanded {
                             background: url(../../assets/icon/-.png);
                           }
                        }
                        .el-tree-node__label:before {
                          padding-left: 20px;
                          content: '';
                          background: url(../../assets/icon/tree_1.png) no-repeat;
                        }
                      }
                      .el-tree-node__children {
                        .el-tree-node {
                          .el-tree-node__content {
                            .el-tree-node__label:before {
                              padding-left: 20px;
                              content: '';
                              background: url(../../assets/icon/tree_2.png) no-repeat;
                            }
                          }
                          .el-tree-node__children {
                            .el-tree-node {
                              .el-tree-node__content {
                                .el-tree-node__label:before {
                                  padding-left: 20px;
                                  content: '';
                                  background: url(../../assets/icon/tree_3.png) no-repeat;
                                }
                              }

                            .el-tree-node__children {
                              .el-tree-node {
                                .el-tree-node__content {
                                  .el-tree-node__label:before {
                                    padding-left: 20px;
                                    content: '';
                                    background: url(../../assets/icon/tree_4.png) no-repeat;
                                  }
                                }

                              }
                            }


                            }
                          }
                        }
                      }


                    }
                  }



                }

            }

          }
          .roletab{
            .selecttion{
              .cell{
                /*padding-left: 14px;*/
                /*padding-right: 14px;*/
                padding-left: 0px;
                padding-right: 0px;
                .el-radio__input{
                  margin:0;
                  .el-radio__inner{margin:0;}
                }
                .el-radio__label{display: none;}
              }
            }
          }
        }


      }


    }
  }

  .el-cascader-menu{
    width:218px;
  }

</style>









