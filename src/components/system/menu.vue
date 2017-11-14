<template>
  <el-row class="warp" style="position:relative;">
    <div style="width:100%;height:100%;position:relative;right:0px;z-index: 50;" v-show="tanKuang">
        <el-col :span="24" class="warp-breadcrum">
          <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }"><b>当前位置：首页</b></el-breadcrumb-item>
            <el-breadcrumb-item>系统管理</el-breadcrumb-item>
            <el-breadcrumb-item>菜单管理</el-breadcrumb-item>
          </el-breadcrumb>
        </el-col>

        <el-col :span="24" class="warp-main">

          <div class="title">
            添加/编辑菜单信息
          </div>
          <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm ">

            <el-form-item label="名称" prop="name">
              <el-input v-model="ruleForm.name"></el-input>
            </el-form-item>

            <el-form-item label="父级编号" prop="pcodes">
              <el-cascader
                placeholder="父级编号"
                v-model="selectedOptions3"
                :options="treedata"
                :props="defaultProps"
                filterable
                :show-all-levels="true"
                change-on-select
                @change="handleItemChange"
              ></el-cascader>
            </el-form-item>



            <el-form-item label="菜单编号" prop="code">
              <el-input v-model="ruleForm.code"></el-input>
            </el-form-item>

            <el-form-item label="请求地址" prop="url">
              <el-input v-model="ruleForm.url"></el-input>
            </el-form-item>

            <el-form-item label="排序" prop="num">
              <el-input v-model="ruleForm.num"></el-input>
            </el-form-item>



            <el-form-item label="是否是菜单" prop="ismenu">
              <el-select  placeholder="状态选择" v-model="ruleForm.ismenu" style="width:220px;">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>


            <el-form-item>
              <el-button type="primary" @click="addSubmit(ruleForm)">保存</el-button>
              <el-button @click="resetForm(ruleForm)">返回</el-button>
            </el-form-item>

          </el-form>

        </el-col>

    </div>
    <el-col :span="24" class="warp-breadcrum">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }"><b>当前位置：首页</b></el-breadcrumb-item>
        <el-breadcrumb-item>系统管理</el-breadcrumb-item>
        <el-breadcrumb-item>菜单管理</el-breadcrumb-item>
      </el-breadcrumb>
    </el-col>

    <el-col :span="24" class="warp-main" >
      <!--工具条-->
      <!--添加/编辑-->


      <el-row>
        <el-col :span="4" class="aside">
          <div class="pre-title">
            <h5>菜单信息</h5>
          </div>
          <div class="fresh"  ><a  @click="winReload"> 刷新</a>&nbsp;|&nbsp;<a @click="winReloadW">展开全部</a></div>
          <div class="grid-content bg-purple">
            <div class="tree" >
              <el-tree :data="treedata" highlight-current :props="defaultProps" :default-expand-all="states" v-if="state2"  @node-click="handleNodeClick"></el-tree>
            </div>
          </div>
        </el-col>
        <el-col :span="20" class="right">
          <div class="title">
            菜单列表
            <el-button type="primary" style="float: right;" @click="showAddDialog" ><i class="iconfont" style="margin-right:3px;">&#xe6ff;</i>添加菜单</el-button>
            <!--<el-button type="primary" @click="showAddDialog">添加按钮</el-button>-->

          </div>
          <div  class="grid-content bg-purple-light" style="padding-top:54px;">



            <!--列表-->

            <el-table :data="menus" highlight-current-row v-loading="listLoading" @selection-change="selsChange"
                      style="width: 100%;">

              <el-table-column type="selection" width="55"></el-table-column>

              <el-table-column prop="id" label="id" width="100"></el-table-column>
              <el-table-column prop="name" label="菜单名称" width="100"></el-table-column>
              <el-table-column prop="code" label="菜单编号" width="100"></el-table-column>
              <el-table-column prop="pcode" label="菜单父编号" width="120" show-overflow-tooltip></el-table-column>
              <el-table-column prop="url" label="请求地址" min-width="100"></el-table-column>
              <el-table-column prop="num" label="排序" width="80" show-overflow-tooltip></el-table-column>
              <el-table-column prop="levels" label="层级" width="80" show-overflow-tooltip></el-table-column>
              <el-table-column  label="是否是菜单" width="120" show-overflow-tooltip>
                <template scope="scope">
                  {{scope.row.ismenu=='1'?'是':'不是'}}
                </template>
              </el-table-column>
              <el-table-column  label="状态" width="80" show-overflow-tooltip>
                <template scope="scope">
                  {{scope.row.status=='1'?'启用':'不启用'}}
                </template>
              </el-table-column>

              <el-table-column label="操作" width="100">
                <template scope="scope">
                  <a size="small" @click="showEditDialog(scope.$index,scope.row)" class="edit" ><i class="iconfont">&#xe651;</i></a>
                  <a type="danger" @click="del(scope.$index,scope.row)" class="delete"><i class="iconfont" >&#xe67e;</i></a>
                </template>
              </el-table-column>


            </el-table>


          </div>
        </el-col>
      </el-row>


    </el-col>
  </el-row>
</template>
<script>

  import util from '../../common/util'
  import {reqGetNav,getMenuList,AddMenu,getCompanyTree,UpDateMenu,QueryCompany,DeleteMenu} from '../../api/api';

  export default{

    data(){

      //父级编号
      var validatePcodes = (rule, value, callback) => {
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
          label: 'name',
          value:'code'
        },

        ruleForm: {
          name:'',
          pcode:'',
          pcodes:[],
          code:'',
          num:'',
          url:'',
          ismenu:''
        },
        rules: {
          pcodes: [
            {required: true, validator: validatePcodes, trigger: 'blur' }
            ],
          ismenu: [
            {  required: true, message: '请选择', trigger: 'blur' }
          ]
        },
        tanKuang:false,
        treedata:[],
        companydatas:[],
        selectedOptions3:[],
        /*状态下拉框*/
        options: [{
          value: '1',
          label: '是'
        },{
          value: '0',
          label: '不是'
        }],
        defaultProps: {
          children: 'children',
          label: 'name',
          value:'code'
        },
        menus:[],
        pcode:'0',
        listLoading: false,
        sels: [], //列表选中列

      }
    },


    methods: {
        //刷新
      winReload:function(cond){
        this.getmenu();
        this.state2 =false
        this.states=false;
        setTimeout(()=>{
          this.state2 =true
        },1)
        this.pcode = 0;
        this.getMenus();
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
        this.getmenu();
      },
      handleChange(value) {
        console.log(value);
      },

      //添加与编辑
      addSubmit: function () {
        this.$refs.ruleForm.validate((valid) => {
          if (valid) {
            this.addLoading = true;
            var para='';
            if(this.ruleForm.id){
              this.ruleForm.ismenu =this.ruleForm.ismenu == '是'?'1':'0';
              para = Object.assign({}, this.ruleForm);
              console.log(this.ruleForm.ismenu);
              console.log(para);
              UpDateMenu(para).then((res) => {
                this.addLoading = false;
                this.$message({
                  message: res.msg,
                });
                this.$refs['ruleForm'].resetFields();
                this.selectedOptions3=[];
                this.ruleForm.ismenu='';
                this.tanKuang=false;
                this.getMenus();
              });
            }else{

             this.ruleForm.pcodes=JSON.stringify(this.ruleForm.pcodes);
            para = Object.assign({}, this.ruleForm);
            console.log(para);
              AddMenu(para).then((res) => {
                this.addLoading = false;
                console.log(res);
                this.$message({
                  message: res.msg,
                });
                this.tanKuang=false;

               this.$refs['ruleForm'].resetFields();
                this.selectedOptions3=[];
                this.ruleForm.ismenu='';
                this.getMenus();
              });
            }
            console.log(para);

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
//el-tree

      handleNodeClick(data) {
        console.log(data.value);

        this.pcode = data.value;
        this.getMenus();
      },
      handleItemChange(data){
         this.ruleForm.pcodes=data;
         this.ruleForm.pcode=data[data.length-1];
      },
      //获取用户列表
      getMenus() {
        let para = {
          pcode:this.pcode
        };
        this.listLoading = true;
        getMenuList(para).then((res) => {
          this.menus = res.data;
          this.pageinfo=res.pageInfo;
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
          //NProgress.start();
          let para = {id: row.id};
          DeleteMenu(para).then((res) => {
            this.listLoading = false;
            //NProgress.done();
            this.$message({
              message: '删除成功',
              type: 'success'
            });
            this.getMenus();
          });
        }).catch(() => {
        });
      },



      //显示编辑界面
      showEditDialog: function (index,row) {

         this.tanKuang=true;
         this.ruleForm = Object.assign({}, row);
         this.ruleForm.ismenu =this.ruleForm.ismenu == '1'?'是':'不是';
         this.selectedOptions3 = JSON.parse(this.ruleForm.pcodes);
      },

      //添加
      showAddDialog: function () {
        this.tanKuang=true;
      },
      getmenu:function(){
        reqGetNav().then((res) => {
          this.companydatas=res.data;
          this.treedata = res.data;

        })
      },
      //返回
      resetForm:function(){
        this.tanKuang=false;
        this.$refs['ruleForm'].resetFields();
        this.selectedOptions3=[];
        this.ruleForm.ismenu='';
      }

    },
    mounted() {
      this.getMenus();
      this.getmenu();
    }
  }
</script>

<style lang="scss" scoped>
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
              .el-form-item{
                float:left;
                margin-right:10px;
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
                    /*background:url(../../assets/icon/+.png);*/
                    &.expanded{
                      /*background:url(../../assets/icon/-.png);*/
                    }
                  }

                  .el-tree-node__label:before{
                    padding-left:20px;
                    content:'';

                    background:url(../../assets/icon/tree_1.png) no-repeat;
                  }
                }
                .el-tree-node__children{
                  .el-tree-node{
                    .el-tree-node__content{
                      .el-tree-node__label:before{
                        padding-left:20px;
                        content:'';

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
          }
        }
      }


    }
  }

  .el-cascader-menu{
    width:218px;
  }

</style>
