<template>
  <el-row class="warp" style="position:relative;">
    <div style="width:100%;height:100%;position:relative;right:0px;z-index: 50;" v-show="tanKuang">
        <el-col :span="24" class="warp-breadcrum">
          <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }"><b>当前位置：首页</b></el-breadcrumb-item>
            <el-breadcrumb-item>用户管理</el-breadcrumb-item>
            <el-breadcrumb-item>新增公司信息</el-breadcrumb-item>
          </el-breadcrumb>
        </el-col>

        <el-col :span="24" class="warp-main">

          <div class="title">
            添加/编辑公司信息
          </div>
          <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm ">
            <el-form-item label="上级公司" prop="pids">
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

            <el-form-item label="公司名称" prop="fullname">
              <el-input v-model="ruleForm.fullname"></el-input>
            </el-form-item>

            <el-form-item label="公司简称" prop="simplename">
              <el-input v-model="ruleForm.simplename"></el-input>
            </el-form-item>


            <el-form-item label="公司地址" required style="margin-bottom: 0px;" >
              <el-form-item  prop="proname" style="width:220px;" >
                <el-select  placeholder="省" v-model="ruleForm.proname" style="width:220px;"@change="prochange" >
                  <el-option v-for="item in parents" :label="item.name" :key="item.value" :value="item.id"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item  prop="cityname" style="width:220px;">
                <el-select  placeholder="市"  v-model="ruleForm.cityname"  style="width:220px;"@change="citychange" >
                  <el-option v-for="city in citys" :label="city.name":key="city.value" :value="city.id"></el-option>

                </el-select>
              </el-form-item>

              <el-form-item  prop="arename" style="width:220px;">
                <el-select  placeholder="区"  v-model="ruleForm.arename"  style="width:220px;">
                  <el-option v-for="are in areas" :label="are.name":key="are.value" :value="are.id"></el-option>
                </el-select>
              </el-form-item>

            </el-form-item>

            <el-form-item  >
              <el-input  class="extra" v-model="ruleForm.address" style="width:682px; margin-top:20px"></el-input>
            </el-form-item>


            <el-form-item  label="公司法人" prop="legalperson" >
              <el-input  v-model="ruleForm.legalperson"></el-input>
            </el-form-item>

            <el-form-item label="联系方式" prop="contacts">
              <el-input v-model="ruleForm.contacts"></el-input>
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
        <el-breadcrumb-item>公司管理</el-breadcrumb-item>
      </el-breadcrumb>
    </el-col>

    <el-col :span="24" class="warp-main" >
      <!--工具条-->
      <!--添加/编辑-->


      <el-row>
        <el-col :span="4" class="aside">
          <div class="pre-title">
            <h5>公司信息</h5>
          </div>
          <div class="fresh"  ><a @click="winReload"> 刷新</a>&nbsp;|&nbsp;<a @click="winReloadW">展开全部</a></div>
          <div class="grid-content bg-purple">
            <div class="tree"  >
              <el-tree :data="treedata" highlight-current :props="defaultProps" v-loading="listLoading"  @node-click="handleNodeClick" node-key="id"  ref="tree" :default-expand-all="states" v-if="state2"></el-tree>

            </div>
          </div>
        </el-col>
        <el-col :span="20" class="right">
          <div class="title">
            公司列表
            <el-button type="primary" style="float: right;" @click="showAddDialog" ><i class="iconfont" style="margin-right:3px;">&#xe6ff;</i>添加公司</el-button>

          </div>
          <div  class="grid-content bg-purple-light" style="padding-top:54px;">

            <el-form :inline="true" :model="filters">
              <el-form-item>
                公司名称：<el-input v-model="filters.fullname" placeholder="公司名称" style="width:220px;margin-right:10px;"></el-input>
              </el-form-item>
              <el-form-item>
                公司简称：<el-input v-model="filters.simplename" placeholder="公司简称" style="width:220px;margin-right:10px;"></el-input>
              </el-form-item>

              <el-form-item>
                <el-button  @click="getCompanys"><i class="iconfont">&#xe60e;</i>快速查找</el-button>
              </el-form-item>

            </el-form>
            <!--列表-->

            <el-table :data="cormans" highlight-current-row v-loading="listLoading" @selection-change="selsChange"
                      style="width: 100%;">

              <el-table-column type="selection" width="55"></el-table-column>

              <el-table-column prop="id" label="公司编号" width="100"></el-table-column>
              <el-table-column prop="fullname" label="公司名称" min-width="150"></el-table-column>
              <el-table-column prop="simplename" label="公司简称" min-width="150"></el-table-column>
              <el-table-column prop="address" label="公司地址" min-width="150" show-overflow-tooltip></el-table-column>
              <el-table-column prop="legalperson" label="公司法人" width="130"></el-table-column>
              <el-table-column prop="contacts" label="联系方式" width="150" show-overflow-tooltip></el-table-column>

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
  import {getCompanyList,getQueryregion,AddCompanyList,reqDeleteCompany,getCompanyTree,UpdateCompany,QueryCompany,getChildrenRegion,getParentRegion,deleteCompanylist} from '../../api/api';

  export default{
    data(){

      //上级公司
      var validatePids = (rule, value, callback) => {
        if (value&&value.length== 0) {
          callback(new Error('请选择'));
        } else{
          callback();
        }
      }
      //省
      var validateProname = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请选择'));
        } else{
          callback();
        }
      }
      //市
      var validateCityname = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请选择'));
        } else{
          callback();
        }
      }
      //区
      var validateArename = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请选择'));
        } else{
          callback();
        }
      }
      //验证电话号码正则表达式
      var validateContacts = (rule, value, callback) =>
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
      return {
        states:false,
        state2:true,
        comprops: {
          children: 'children',
          label:'simplename',
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
          pids: [
            {required: true, validator: validatePids, trigger: 'blur' },
//            { validator: checkPids, trigger: 'blur' },
////            { min: 2, max: 20, message: '长度在 10 到 20 个字符', trigger: 'blur' }
            ],
          proname: [
            { required: true, validator: validateProname, trigger: 'blur' }
          ],
          cityname: [
            {required: true, validator: validateCityname, trigger: 'blur' }
          ],
          arename: [
            { required: true, validator: validateArename, trigger: 'blur' }
          ],

          contacts: [
            {  required: true, validator:validateContacts, trigger: 'change' },
          ],
          legalperson: [
            {  required: true, message: '公司法人', trigger: 'change' }
          ],
          fullname: [
            {  required: true, message: '请输入公司名称', trigger: 'change' }
          ]
        },
        tanKuang:false,
        treedata:[],
        companydatas:[],
        deptid:'1',
        selectedOptions3:['0'],
        currentPage3:this.page,
        filters: {
          fullname: '',
          simplename:''
        },


        defaultProps: {
          children: 'children',
          label: 'simplename'
        },
        parents:{},
        citys:{},
        areas:{},
        proname:'',
        cityname:'',
        arename:'',
        re:'',
        pid:'',
        pids:'',
        cityid:'',
        regionid:''||Number,
        cormans: [],
        total: 0,
        pageinfo:{},
        page: 1,
        listLoading: false,
        sels: [], //列表选中列

      }
    },


    methods: {
        //获取公司树形数据

      companyTree(){
        getCompanyTree().then((res) => {
          //console.log(res.data);
          this.treedata = res.data;
        })
      },

    handleChange(value) {
        console.log(value);
      },
      //刷新
      winReload:function(cond){
        this.companyTree();
        this.state2 =false
        this.states=false;
        setTimeout(()=>{
          this.state2 =true

        },1)
        this.pid=1;
      this.getCompanys();
        this.$router.push('/user/company');

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
       this.companyTree();
      },
        //获取省市县
      getSites:function(){
        let para = {
          parentid:100000
        };
        getChildrenRegion(para).then((res) => {
         this.ruleForm.proname='';
         this.ruleForm.cityname='';
         this.ruleForm.arename='';
         this.parents = res.data;
        });

      },
      prochange:function(id){
        console.log(typeof(id))
        var N=1;
          if(typeof(id)==typeof(N)){
            let para = {
              parentid:id
            };
            getChildrenRegion(para).then((res) => {
              this.ruleForm.cityname='';
              this.ruleForm.arename='';
              this.citys = res.data;
            });
          }
      },
      citychange:function(id){
        var N=1;
          if(typeof(id)==typeof(N)){
            let para = {
              parentid:id
            };
            console.log(para);
            getChildrenRegion(para).then((res) => {
              console.log(res.data);
              this.areas = res.data;
            });
          }

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
              UpdateCompany(para).then((res) => {
                this.addLoading = false;
                this.$message({
                  message: res.msg,
                });
                this.tanKuang=false;
                this.clearRuleForm();
                this.getCompanys();
              });
            }else{

             this.ruleForm.pids=JSON.stringify(this.ruleForm.pids);
            this.ruleForm.pid=this.ruleForm.pid[this.ruleForm.pid.length-1];
            para = Object.assign({}, this.ruleForm);
            console.log(para);
            AddCompanyList(para).then((res) => {
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
            //console.log(para);
          }
        });
      },

      /*导出公司列表*/

      exportCompany(){
        let para = {
          page: this.page,
          fullname: this.filters.fullname,
          simplename:this.filters.simplename,
          pid:this.pid
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
          const tHeader = ['公司编号', '公司名称', '公司简称', '公司地址','公司法人', '联系方式'];
          const filterVal = ['id', 'fullname', 'simplename', 'address','legalperson', 'phone'];
          const list = this.list;
          const data = this.formatJson(filterVal, list);
          export_json_to_excel(tHeader, data, '列表excel');
          });
        },
      formatJson(filterVal, jsonData) {
        return jsonData.map(v => filterVal.map(j => v[j]))
      },


      //清除表单数据
      clearRuleForm(){
        this.$refs['ruleForm'].resetFields();
        this.selectedOptions3=['0'],
          this.ruleForm.address=''
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
        console.log(data);
        console.log(data.id);
        this.pid = data.id;
        this.getCompanys();
      },
      handleItemChange(data){
         this.ruleForm.pids=data;
         this.ruleForm.pid=data;
      },
      //获取用户列表
      getCompanys() {
        let para = {
          page: this.page,
          limit: 10,
          fullname: this.filters.fullname,
          simplename:this.filters.simplename,
          pid:this.pid
        };
//        console.log(para);
        this.listLoading = true;
        getCompanyList(para).then((res) => {
//          this.total = res.data.total;
          this.cormans = res.data;
          this.pageinfo=res.pageInfo;
//          console.log(res);
  //       console.log(res.data);
          this.listLoading = false;
          //NProgress.done();
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
          reqDeleteCompany(para).then((res) => {
            this.listLoading = false;
            //NProgress.done();
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
         console.log(this.ruleForm);
        this.ruleForm.proname=''
         console.log(this.ruleForm.proname);
          console.log(this.selectedOptions3);
         this.selectedOptions3 = JSON.parse(this.ruleForm.pids);
        console.log(this.selectedOptions3);


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

      //批量删除
      batchDeleteBook: function () {
        var ids = this.sels.map(item => item.id);
        console.log(ids)
        this.$confirm('确认删除选中记录吗？', '提示', {
          type: 'warning'
        }).then(() => {
          this.listLoading = true;
          //NProgress.start();
          let para = ids;
          console.log(para)
          deleteCompanylist(para).then((res) => {
              console.log(res);
            this.listLoading = false;
            this.$message({
              message: res.msg
            });
            this.getCompanys();
          });
        }).catch(() => {

        });
      }
    },
    mounted() {
      this.getCompanys();
      this.getSites();
      this.companyTree();
      getCompanyTree().then((res) => {
        console.log(res.data);
        this.companydatas=res.data;

      })
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
        .el-form{
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
              line-height:10px;
              .el-form-item{
                float:left;
                margin-right:10px;
                .el-input{
                  width:220px;
                  float:left;
                  margin-right: 10px;
                }
                /*.extra{*/
                  /*width:686px;*/
                  /*margin-top:20px;*/
                  /*marg-left:80px;*/
                /*}*/

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
                    background:url(../../assets/icon/+.png);
                    &.expanded{
                      background:url(../../assets/icon/-.png);
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
