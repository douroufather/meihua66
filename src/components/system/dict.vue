<template>
  <el-row class="warp" style="position:relative;">
    <div style="width:100%;height:100%;position:relative;right:0px;z-index: 50;" v-show="tanKuang">
      <!--<el-row class="warp">-->
      <el-col :span="24" class="warp-breadcrum">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }"><b>当前位置：首页</b></el-breadcrumb-item>
          <el-breadcrumb-item>系统管理</el-breadcrumb-item>
          <el-breadcrumb-item>字典管理</el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>

      <el-col :span="24" class="warp-main">

        <div class="title">
          添加/编辑字典信息
        </div>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm ">

          <el-form-item label="字典类型" prop="type">
            <el-input v-model="ruleForm.type"></el-input>
        </el-form-item>
          <el-form-item label="字典名称" prop="name">
            <el-input v-model="ruleForm.name"></el-input>
            <el-button type="primary" @click="addValue" style="padding:10px;width:80px;">添加值</el-button>
          </el-form-item>
          <ul style="list-style-type:none;margin-left:35px;">
            <li style="margin-bottom: 20px;" v-for="(item,index) in ruleForm.dictVos" :key="index">
              <label > 值<el-input v-model="item.num" style="width:220px;margin-left: 10px;"></el-input></label>
              <label > 名称<el-input v-model="item.name"style="width:220px;margin-left: 10px;"></el-input></label>
              <el-button type="primary" @click="removeValue(index)" style="padding:10px;width:80px;background:#fff;color:red;border:1px solid red;">删除</el-button>
            </li>

          </ul>

          <el-form-item>
            <el-button type="primary" @click="addSubmit(ruleForm)">保存</el-button>
            <el-button @click="resetForm">返回</el-button>
          </el-form-item>

        </el-form>

      </el-col>
      <!--</el-row>-->


    </div>
    <el-col :span="24" class="warp-breadcrum">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }"><b>当前位置：首页</b></el-breadcrumb-item>
        <el-breadcrumb-item>系统管理</el-breadcrumb-item>
        <el-breadcrumb-item>字典管理</el-breadcrumb-item>
      </el-breadcrumb>
    </el-col>

    <el-col :span="24" class="warp-main" >
      <!--工具条-->
      <!--添加/编辑-->


      <el-row>

        <el-col :span="24" class="right">
          <div class="title">
            字典管理
            <el-button type="primary" style="float: right;" @click="showAddDialog" ><i class="iconfont" style="margin-right:3px;">&#xe6ff;</i>添加字典</el-button>
            <!--<el-button type="primary" @click="showAddDialog">添加按钮</el-button>-->

          </div>
          <div  class="grid-content bg-purple-light" style="padding-top:54px;">



            <!--列表-->

            <el-table :data="cormans" highlight-current-row v-loading="listLoading" @selection-change="selsChange"
                      style="width: 100%;">

              <el-table-column type="selection" width="55"></el-table-column>


              <el-table-column prop="name" label="名称" width="100"></el-table-column>
              <el-table-column prop="detail" label="详情" min-width="200"></el-table-column>
              <el-table-column prop="detail" label="站点类型" min-width="200"></el-table-column>
              <el-table-column prop="address" label="备注" min-width="200" show-overflow-tooltip></el-table-column>

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
  import {getDictList,Adddict,Deletedict,Updatedict} from '../../api/api';

  export default{
    data(){
      return {
        ruleForm: {
          dictVos:[],
          id:'',
          name:'',
          type:''
        },
        rules: {
          type: [
            {  required: true, message: '请输入字典类型', trigger: 'blur' }
          ],
          name: [
            {  required: true, message: '请输入字典名称', trigger: 'blur' }
          ]
        },
        tanKuang:false,
        deptid:'1',
        re:'',
        cormans: [],
        listLoading: false,
        sels: [] //列表选中列
      }
    },
    methods: {
      //添加与编辑
      addSubmit: function () {
        this.$refs.ruleForm.validate((valid) => {
          if (valid) {
            this.addLoading = true;
            var para='';
            if(this.ruleForm.id){
              para = Object.assign({}, this.ruleForm);
              console.log(para);
              Updatedict(para).then((res) => {
                this.addLoading = false;
                this.$message({
                  message: res.msg,
                });
                this.tanKuang=false;
                this.clearRuleForm();
                this.getCompanys();
              });
            }else{
              para = Object.assign({}, this.ruleForm);
              console.log(para);
              Adddict(para).then((res) => {
                this.addLoading = false;
                console.log(res);
                this.$message({
                  message: res.msg,
                });
                this.tanKuang=false;
                this.clearRuleForm();
                this.getCompanys();
              });
            }
          }
        });
      },
      //清除表单数据
      clearRuleForm(){
        this.$refs['ruleForm'].resetFields();
          this.ruleForm.dictVos=[];
          this.ruleForm.id='';
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
      //获取用户列表
      getCompanys() {
        let para = {
//          page: this.page,
//          limit: 10,
//          fullname: this.filters.fullname,
//          simplename:this.filters.simplename,
//          pid:this.pid
        };
        this.listLoading = true;
        getDictList(para).then((res) => {
         this.cormans = res.data;
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
          Deletedict(para).then((res) => {
            this.listLoading = false;
            this.$message({
              message: res.msg,
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
        this.ruleForm = Object.assign({}, row);
      },

      //添加
      showAddDialog: function () {
        this.tanKuang=true;
      },
      //返回
      resetForm:function(){
        this.tanKuang=false;
        this.clearRuleForm();
      },
//添加值按钮
      addValue:function(){
          this.ruleForm.dictVos.push({
            num:'',
            name:''
          })
      },
  //删除值
      removeValue:function(index){
        (this.ruleForm.dictVos).splice(index,1)
      }
    },
    mounted() {
      this.getCompanys();
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
                  width:686px;
                  margin-top:10px;
                  marg-left:80px;
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
