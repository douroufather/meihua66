<template>
  <el-row class="warp" style="position:relative;">
    <div style="width:100%;height:100%;position:relative;right:0px;z-index: 50;" v-show="tanKuang">
      <el-col :span="24" class="warp-breadcrum">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }"><b>当前位置：首页</b></el-breadcrumb-item>
          <el-breadcrumb-item>用户管理</el-breadcrumb-item>
          <el-breadcrumb-item>新增部门信息</el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>

      <el-col :span="24" class="warp-main">

        <div class="title">
          添加/编辑部门信息
        </div>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm ">
          <el-form-item label="上级公司" prop="companyids">
            <el-cascader
              placeholder="选择上级公司"
              v-model="selectedOptions3"
              :options="companydatas"
              :props="comprops"
              filterable
              :show-all-levels="true"
              change-on-select
              @change="handleItemChange"
            ></el-cascader>
          </el-form-item>
          <el-form-item label="上级部门" >
            <el-cascader
              placeholder="选择上级部门"
              v-model="selectedOptions4"
              :options="deptdatas"
              :props="deptprops"
              filterable
              :show-all-levels="true"
              change-on-select
              @change="handleItemChange1"
            ></el-cascader>
          </el-form-item>

          <el-form-item label="部门名称" prop="fullname">
            <el-input v-model="ruleForm.fullname"></el-input>
          </el-form-item>


          <el-form-item>
            <el-button type="primary" @click="addSubmit(ruleForm)">保存</el-button>
            <el-button @click="resetForm">返回</el-button>
          </el-form-item>

        </el-form>

      </el-col>

    </div>
    <el-col :span="24" class="warp-breadcrum">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }"><b>当前位置：首页</b></el-breadcrumb-item>
        <el-breadcrumb-item>用户管理</el-breadcrumb-item>
        <el-breadcrumb-item>部门信息管理</el-breadcrumb-item>
      </el-breadcrumb>
    </el-col>

    <el-col :span="24" class="warp-main" >
      <!--工具条-->
      <!--添加/编辑-->

      <el-row>
        <el-col :span="4" class="aside">
          <div class="pre-title">
            <h5>部门信息</h5>
          </div>
          <div class="fresh" ><a  @click="winReload"> 刷新</a>&nbsp;|&nbsp;<a  @click="winReloadW" >展开全部</a></div>
          <div class="grid-content bg-purple">
            <div class="tree" >
              <el-tree :data="treedata"  highlight-current :props="defaultProps"    @node-click="handleNodeClick" :default-expand-all="states" v-if="state2"></el-tree>
            </div>
          </div>
        </el-col>
        <el-col :span="20" class="right">
          <div class="title">
            部门列表
            <el-button type="primary" style="float: right;" @click="showAddDialog" ><i class="iconfont" style="margin-right:3px;">&#xe6ff;</i>添加部门</el-button>

          </div>
          <div  class="grid-content bg-purple-light" style="padding-top:54px;">

            <el-form :inline="true" :model="filters">
              <el-form-item>
                部门名称：<el-input v-model="filters.fullname" placeholder="部门名称" style="width:220px;margin-right:10px;"></el-input>
              </el-form-item>

              <el-form-item>
                <el-button  @click="getCompanys"><i class="iconfont">&#xe60e;</i>快速查找</el-button>
              </el-form-item>

            </el-form>

            <!--列表-->

            <el-table :data="depmans" highlight-current-row v-loading="listLoading" @selection-change="selsChange"
                      style="width: 100%;">

              <el-table-column type="selection" width="55"></el-table-column>

              <el-table-column prop="id" label="部门ID" width="250"></el-table-column>
              <el-table-column prop="fullname" label="部门名称" min-width="450"></el-table-column>
              <!--<el-table-column prop="simplename" label="公司简称" width="120"></el-table-column>-->
              <!--<el-table-column prop="address" label="公司地址" width="150" show-overflow-tooltip></el-table-column>-->
              <!--<el-table-column prop="legalperson" label="公司法人" width="130"></el-table-column>-->
              <!--<el-table-column prop="contacts" label="联系方式" width="150" show-overflow-tooltip></el-table-column>-->

              <el-table-column label="操作" width="150">
                <template scope="scope">
                  <a size="small" @click="showEditDialog(scope.$index,scope.row)" class="edit" ><i class="iconfont">&#xe651;</i></a>
                  <a type="danger" @click="del(scope.$index,scope.row)" class="delete"><i class="iconfont" >&#xe67e;</i></a>
                </template>
              </el-table-column>


            </el-table>


            <!--工具条-->
            <el-col :span="24"  class="toolbar" >
              <el-button type="danger" @click="batchDeleteBook" :disabled="this.sels.length===0"><i class="iconfont">&#xe60d;</i>批量删除</el-button>
            <!--  <el-button  @click=""><i class="iconfont">&#xe60c;</i>导出数据</el-button>-->

              <el-pagination class="page" style="float:right;"
                             @size-change="handleSizeChange"
                             @current-change="handleCurrentChange"
                             :current-page.sync="currentPage3"
                             :page-size=pageinfo.limit
                             layout="prev, pager, next, jumper"
                             :total=pageinfo.total>
              </el-pagination>
            </el-col>


          </div>
        </el-col>
      </el-row>


    </el-col>
  </el-row>
</template>
<script>

  import util from '../../common/util'
  import {getDeptlist,getDeptTree,getGroupTree,getQueryregion,AddDept,reqDeleteDept,getCompanyTree,Updatedept,QueryCompany,getChildrenRegion,getParentRegion,deleteDeptlist} from '../../api/api';

  export default{
    data(){
     // 上级公司
      var validatePids = (rule, value, callback) => {
        if (value&&value.length== 0) {
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
        deptprops: {
          children: 'children',
          label:'fullname',
          value:'id'
        },

        ruleForm: {
          pid:''||[],
          pids:''||[],
          id:'',
          proname:'',
          cityname:'',
          arename:'',
          simplename: '',
          fullname:'',
          companyids:[],
          parentid: '',
          contacts: '',
          legalperson: '',
          address:'',
          layer:'',
          num:'',
          state:'',
          type:'',
          version:''
        },
        rules: {
          companyids: [
            {required: true,validator:validatePids, trigger: 'blur' },
            ],
          fullname: [
            {  required: true, message: '请输入部门名称', trigger: 'blur' }
          ]
        },
        tanKuang:false,
        treedata:[],
        companydatas:[],
        deptdatas:[],
        deptid:'',
        selectedOptions3:['0'],
        selectedOptions4:[],
        currentPage3:this.page,
        filters: {
          fullname: ''
        },


        defaultProps: {
          children: 'children',
          label: 'fullname'
        },
        parents:{},
        citys:{},
        areas:{},
        proname:'',
        cityname:'',
        arename:'',
        re:'',
        depid:'',
        companyId:'',
        pids:'',
        cityid:'',
        regionid:''||Number,
        depmans: [],
        total: 0,
        pageinfo:{},
        page: 1,
        listLoading: false,
        sels: [], //列表选中列

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
        this.deptid = 1;
        this.getCompanys();
      },
      //展开全部
      winReloadW:function(){
        this.state2=false;
        this.states=true;
        setTimeout(()=>{
          this.state2 =true
        },1)
      },
      groupTree:function(){
        getGroupTree().then((res) => {
          // console.log(res.data);
          this.treedata = res.data;
        })
      },

      handleChange(value) {
        console.log(value);
      },
      //上级部门数据
      getDeptData:function(){
        let para = {
          companyId:this.companyId
        };
        getDeptTree(para).then((res) => {
            this.deptdatas=res.data;
         // console.log(res.data)
        });

      },

      //添加与编辑
      addSubmit: function () {
        this.$refs.ruleForm.validate((valid) => {
          if (valid) {
            this.addLoading = true;
            var para='';
            if(this.ruleForm.id){
              para = Object.assign({}, this.ruleForm);
              console.log(para);
              Updatedept(para).then((res) => {
                this.addLoading = false;
                this.$message({
                  message: res.msg,
                });
                this.clearRuleForm();
                this.tanKuang=false;
                this.getCompanys();
              });
            }else{
              this.ruleForm.companyids=JSON.stringify(this.ruleForm.companyids);
              console.log( this.ruleForm.pids);
              this.ruleForm.pids=JSON.stringify(this.ruleForm.pids);

              if(this.ruleForm.pid==''){
                console.log(this.companyId);
                this.ruleForm.pid=this.companyId;
              }else{
                this.ruleForm.pid=this.ruleForm.pid[this.ruleForm.pid.length-1];
              }
              para = Object.assign({}, this.ruleForm);
              console.log(para);
              AddDept(para).then((res) => {
                this.addLoading = false;
                console.log(res);
                this.$message({
                  message: res.msg,
                });
                this.tanKuang=false;
                this.clearRuleForm();
                this.getcomData();
               this.getCompanys();
              });
            }
           // console.log(para);

          }
        });
      },
      //清除表单数据
      clearRuleForm(){
        this.$refs['ruleForm'].resetFields();
        this.selectedOptions3=['0'],
        this.ruleForm.pids=[];
        this.selectedOptions4=[]
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
      //返回
      resetForm() {
        this.tanKuang = false;
        this. clearRuleForm();
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
        console.log(data.id);
        this.deptid = data.id;
        this.getCompanys();
      },
      handleItemChange(data){
        this.ruleForm.companyids=data;
        console.log(data);
        console.log(this.ruleForm.companyids);
        this.companyId=data[data.length-1];
        this.getDeptData();
        console.log(this.companyId)
      },

      handleItemChange1(data){
        this.ruleForm.pid=data;
        this.ruleForm.pids=data;
       console.log(this.ruleForm.pids)
      },
      //获取用户列表
      getCompanys() {
        let para = {
          page: this.page,
          limit: 10,
          fullname: this.filters.fullname,
        deptid:this.deptid
        };
        this.listLoading = true;
        getDeptlist(para).then((res) => {
//          this.total = res.data.total;
          console.log(res.data);
          this.depmans = res.data;
          this.pageinfo=res.pageInfo;
          console.log(res.data);
          this.listLoading = false;
        })
      },
      selsChange: function (sels) {
        this.sels = sels;
      },


      //删除
      del: function (index, row) {
        this.$confirm('确认删除该记录吗?', '提示', {type: 'warning'}).then(() => {
          this.listLoading = true;
          let para = {id: row.id};
          reqDeleteDept(para).then((res) => {
            this.listLoading = false;
            //NProgress.done();
            this.$message({
              message: '删除成功',
              type: 'success'
            });
            this.getCompanys();
          });
        }).catch(() => {
        });
      },

      //显示编辑界面
      showEditDialog: function (index,row) {
          this.tanKuang=true;
         this.getcomData();
          this.ruleForm = Object.assign({}, row);
          console.log( this.ruleForm);
        this.selectedOptions3 = JSON.parse(this.ruleForm.companyids);
        this.selectedOptions4 = JSON.parse(this.ruleForm.pids);
      },

      //添加
      showAddDialog: function () {
        this.tanKuang=true;
      },

      //获取上去公司数据
      getcomData:function(){
        getCompanyTree().then((res) => {
         // console.log(res.data);
          this.companydatas=res.data;

        })
      },


      //批量删除
      batchDeleteBook: function () {
        var ids = this.sels.map(item => item.id);
        console.log(ids)
        this.$confirm('确认删除选中记录吗？', '提示', {
          type: 'warning'
        }).then(() => {
          this.listLoading = true;
          let para = ids;
          console.log(para)
          deleteDeptlist(para).then((res) => {
            console.log(res);
            this.listLoading = false;
            this.$message({
              message: res.msg,
            });
            this.getCompanys();
          });
        }).catch(() => {

        });
      }
    },
    mounted() {
      this.getCompanys();
     this.getcomData();
     this.groupTree();
    }
  }
</script>

<style lang="scss" >
  .warp{
    height: 100%;
    div{
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
            .el-cascader-menus{
              .el-cascader-menu{
                width:220px;
              }
            }

            .el-form-item__label{}
            .el-form-item__label:before{}
            .el-form-item__content{
              line-height:0px;
              span{margin-left:0px;}
              .el-input{
                width:220px;
                float:left;
                margin-right: 10px;
              }
              .a{
                width:670px;
                margin-top:10px;
              }

              .el-button{
                width: 220px;
              }

            }
          }

        }
        .el-cascader-menu{
          width:218px;
        }
        .demo-table-expand label {
          font-weight: bold;
        }
      }
    }
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

          .tree{
            .el-tree{
              border:none;
              .el-tree-node{
                .el-tree-node__content{
                  .el-tree-node__expand-icon{
                    border:none;
                    width: 13px;
                    height: 13px;
                    transform: rotate(0deg);
                    background:url(../../assets/icon/+.png);
                    &.expanded{
                      background:url(../../assets/icon/-.png);
                    }
                  }

                  .el-tree-node__label:before{
                    padding-left:20px;
                    content:' ';

                    background:url(../../assets/icon/tree_1.png) no-repeat;
                  }
                }
                .el-tree-node__children{
                  .el-tree-node{
                    .el-tree-node__content{
                      .el-tree-node__label:before{
                        padding-left:20px;
                        content:'*';

                        background:url(../../assets/icon/tree_2.png) no-repeat;
                      }

                    }
                    .el-tree-node__children{
                      .el-tree-node{
                        .el-tree-node__content{
                          .el-tree-node__label:before{
                            padding-left:20px;
                            content:'';

                            background:url(../../assets/icon/tree_3.png) no-repeat;
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
  }

  .el-cascader-menu{
    width:218px;
  }

</style>

