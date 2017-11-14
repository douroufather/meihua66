<template>
  <el-row class="warp" style="position:relative;">
    <div style="width:100%;height:100%;position:relative;right:0px;z-index: 50;" v-show="tanKuang">
        <el-col :span="24" class="warp-breadcrum">
          <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }"><b>当前位置：首页</b></el-breadcrumb-item>
            <el-breadcrumb-item>用户管理</el-breadcrumb-item>
            <el-breadcrumb-item>新增区域信息</el-breadcrumb-item>
          </el-breadcrumb>
        </el-col>

        <el-col :span="24" class="warp-main">

          <div class="title">
            添加/编辑区域信息
          </div>
          <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm ">

            <el-form-item label="区域名称" required style=" margin-bottom:0px;">
              <el-form-item  prop="proname" style="width:220px;">
                <el-select  placeholder="省" v-model="ruleForm.proname" style="width:220px;"@change="prochange" >
                  <el-option v-for="item in parents" :label="item.name" :key="item.value" :value="item.id"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item prop="cityname"  style="width:220px;">
                <el-select  placeholder="市"  v-model="ruleForm.cityname"  style="width:220px;"@change="citychange" >
                  <el-option v-for="city in citys" :label="city.name" :key="city.value" :value="city.id"></el-option>

                </el-select>
              </el-form-item>

              <el-form-item  prop="arename" style="width:220px;">
                <el-select  placeholder="区"  v-model="ruleForm.arename"  style="width:220px;" @change="arechange">
                  <el-option v-for="are in areas" :label="are.name" :key="are.value" :value="are.id"></el-option>
                </el-select>
              </el-form-item>

              <el-form-item   style="width:220px;"v-show="show">
                <el-select  placeholder="乡"  v-model="ruleForm.countryname"  style="width:220px;">
                  <el-option v-for="country in countrys" :label="country.name":key="country.value" :value="country.id"></el-option>
                </el-select>
              </el-form-item>

            </el-form-item>

            <el-form-item  >
              <el-input  class="a" v-model="ruleForm.name" style="width:682px; margin-top:20px;"></el-input>
            </el-form-item>



            <el-form-item  label="区域坐标"  >
              <el-form-item  >
                <el-input v-model="ruleForm.lng" placeholder="经度"></el-input>
              </el-form-item>
              <el-form-item  >
                <el-input v-model="ruleForm.lat" placeholder="纬度"></el-input>
              </el-form-item>
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
        <el-breadcrumb-item>区域信息列表</el-breadcrumb-item>
      </el-breadcrumb>
    </el-col>

    <el-col :span="24" class="warp-main" >
      <!--工具条-->
      <!--添加/编辑-->

      <el-row>
        <el-col :span="4" class="aside">
          <el-tabs type="border-card">
            <el-tab-pane label="区域信息" >
          <div class="fresh"  ><a style="text-align: left" @click="winReload" > 刷新</a></div>
          <div class="grid-content bg-purple">
            <div class="tree" >
              <el-tree :data="treedata" highlight-current :props="defaultProps" v-loading="listLoading"   @node-click="handleNodeClick"  :default-expand-all="states" v-if="state2" ></el-tree>
            </div>
          </div>
           </el-tab-pane>
        <el-tab-pane label="屏蔽区域">
          <el-button @click="shieldSubmit" class='el-button-btn' style="margin-left:40px;" >保存</el-button>
          <el-button @click="resetChecked" class='el-button-btn'>清空</el-button>
          <div class="grid-content bg-purple">
            <div class="tree" >
            <el-tree  :data="shielddata" highlight-current
                      node-key="id" ref="tree"
                      :props="shieldprops"
                      :check-strictly="true"
                      :default-checked-keys="shields" show-checkbox  default-expand-all></el-tree>
            </div>
          </div>
          </el-tab-pane>
        </el-tabs>
        </el-col>
        <el-col :span="20" class="right">
          <div class="title">
            区域列表
            <el-button type="primary" style="float: right;" @click="showAddDialog" ><i class="iconfont" style="margin-right:3px;">&#xe6ff;</i>添加区域</el-button>


          </div>
          <div  class="grid-content bg-purple-light" style="padding-top:54px;">

            <el-form :inline="true" :model="filters">
              <el-form-item>
                区域名称：<el-input v-model="filters.regionName" placeholder="区域名称" style="width:220px;margin-right:10px;"></el-input>
              </el-form-item>


              <el-form-item>
                <el-button  @click="getAreas"><i class="iconfont">&#xe60e;</i>快速查找</el-button>
              </el-form-item>

            </el-form>


            <!--列表-->

            <el-table :data="regions" highlight-current-row v-loading="listLoading" @selection-change="selsChange"
                      style="width: 100%;">

              <el-table-column type="selection" width="55"></el-table-column>

              <el-table-column prop="id" label="区域编号" width="200"></el-table-column>
              <el-table-column prop="mergername" label="区域名称" min-width="500"></el-table-column>
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
              <!--<el-button  @click=""><i class="iconfont">&#xe60c;</i>导出数据</el-button>-->

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
  import {addShieldRegion,getShieldRegion,getRegionTree,getRegionList,getQueryregion,Addregion,getCompanyTree,UpdateRegion,QueryCompany,getChildrenRegion,getParentRegion,Deleteregionlist,Deleteregion} from '../../api/api';

  export default{

    data(){
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
      return {
        states:false,
        state2:true,
        comprops: {
          children: 'children',
          label:'simplename',
          value:'id'
        },

        ruleForm: {
          id:'',
          proname:'',
          cityname:'',
          arename:'',
          countryname:'',
          parentid: '',
          name:'',
          lng:'',
          lat:''
        },
        rules: {
         proname: [
      { required: true, validator: validateProname, trigger: 'blur' }
    ],
      cityname: [
        {required: true, validator: validateCityname, trigger: 'blur' }
      ],
        arename: [
        { required: true, validator: validateArename, trigger: 'blur' }
      ],
        },
        tanKuang:false,
        treedata:[],
        shielddata:[],
        shields:[],
        treeCitys:{},
        companydatas:[],
        parentid: '0',
        selectedOptions3:['0'],
        currentPage3:this.page,
        filters: {
          regionName: ''
        },


        defaultProps: {
          children: 'children',
          label: 'name'
        },
        shieldprops:{
          children:'children',
          label:'name',
          value:'id'
        },
        parents:{},
        citys:{},
        areas:{},
        countrys:{},
        show:false,
        proname:'',
        cityname:'',
        arename:'',
        hid:'',
        re:'',
        pid:'',
        pids:'',
        cityid:'',
        regionid:''||Number,
        regions: [],
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
        //window.location.reload();
        this.getSites();
        this.getTreeData();
        this.state2 =false
        this.states=false;
        setTimeout(()=>{
          this.state2 =true

        },1)
        this.parentid = 1;
        this.getAreas();
      },
//      //展开全部
//      winReloadW:function(){
//        this.state2=false;
//        this.states=true;
//        this.addLoading = true;
//        setTimeout(()=>{
//          this.state2 =true
//          this.addLoading = false;
//        },1)
//        this.getTreeData();
//
//
//      },

      handleChange(value) {
        console.log(value);
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
        this.ruleForm.countryname='';
        console.log(res.data);
         this.parents = res.data;
        });

      },
      prochange:function(id){
          console.log(id);
        var N=1;
          if(typeof(id)==typeof(N)){
            let para = {
              parentid:id
            };
            getChildrenRegion(para).then((res) => {
              this.ruleForm.cityname='';
              this.ruleForm.arename='';
              this.ruleForm.countryname='';
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
             this.ruleForm.arename='';
             this.ruleForm.countryname='';
              console.log(res.data);
              this.areas = res.data;
            });
          }
      },
      arechange:function(id){
        var N=1;
        if(typeof(id)==typeof(N)){
          let para = {
            parentid:id
          };
          console.log(para);
          getChildrenRegion(para).then((res) => {
            console.log(res.data);
            this.countrys = res.data;
//            this.ruleForm.arenameA='';
            if(this.countrys&&this.countrys.length>1){
              this.show=true;
            }else if(this.ruleForm.countryname==''){
              this.show=false;
            }
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
              UpdateRegion(para).then((res) => {
                this.addLoading = false;
                this.$message({
                  message: res.msg,
                });
                this.clearRuleForm();
                this.tanKuang=false;
                this.getAreas();
              });
            }else{

              if(this.ruleForm.arename1){
                this.ruleForm.parentid=this.ruleForm.arename1;
              }else{
                this.ruleForm.parentid=this.ruleForm.arename;
              }
              para = Object.assign({}, this.ruleForm);

            console.log(para);
              Addregion(para).then((res) => {
                this.addLoading = false;
                console.log(res);
                this.$message({
                  message: res.msg,
                });
                this.tanKuang=false;
                this.clearRuleForm();
              this.getAreas();
              });
            }
            console.log(para);

          }
        });
      },
      //清除表单数据
      clearRuleForm(){
        this.$refs['ruleForm'].resetFields();
        this.ruleForm.name='';
        this.ruleForm.lng='';
        this.ruleForm.lat='';
        this.show=false;
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
        this.clearRuleForm();

      },
      handleSizeChange(val) {
        console.log('每页 ${val} 条');
      },
      handleCurrentChange(val) {
        this.page = val;
        this.getAreas();
        console.log('当前页: ${val}');
      },


      //获取区域树
      getRegionTreeData:function(){
        getRegionTree().then((res) => {
          this.treedata=res.data;
      });
      },
      //获取屏蔽列表
      getShieldData:function(){
        getShieldRegion().then((res) => {
          this.shielddata=res.data.shielddata;
        this.shields=res.data.shields;
         });
      },

      handleNodeClick(data) {
       this.parentid = data.id;
      //console.log(data.id);
       this.getAreas();
      },

      loadNode(node, resolve) {
        if (node.level === 0) {
       return resolve(this.treedata);
       }
        let para = {
          parentid:node.data.id
        };
        getChildrenRegion(para).then((res) => {
          this.treeCitys=res.data;
        });
        this.parentid=node.data.id;
        setTimeout(() => {
          var data;
            data = this.treeCitys;
          resolve(data);
        }, 500);
      },

      handleItemChange(data){
         this.ruleForm.pids=data;
         this.ruleForm.pid=data;
      },
      //获取用户列表
      getAreas() {
        let para = {
          page: this.page,
          limit: 10,
          regionName: this.filters.regionName,
          parentid:this.parentid
        };
        this.listLoading = true;
        getRegionList(para).then((res) => {
//          this.total = res.data.total;
          this.regions= res.data;
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
          Deleteregion(para).then((res) => {
            this.listLoading = false;
            //NProgress.done();
            this.$message({
              message: res.msg,
            });
            this.getAreas();
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


      //屏蔽区域
      shieldSubmit: function () {
            var shields=this.$refs.tree.getCheckedKeys();
            let para = shields;
            addShieldRegion(para).then((res) => {
              this.addLoading = false;
            this.$message({
              message: res.msg,
            });
            this.dialog=false;
            this.getRegionTreeData();
          });
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
          Deleteregionlist(para).then((res) => {
              console.log(res);
            this.listLoading = false;
            //NProgress.done();
            this.$message({
              message: '删除成功',
              type: 'success'
            });
            this.getAreas();
          });
        }).catch(() => {

        });
      }
    },
    mounted() {
      this.getAreas();
      this.getSites();
      this.getRegionTreeData();
      this.getShieldData();


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
              .el-input{
                width:220px;
                float:left;
                margin-right: 10px;
              }
              .a{
                width:686px;
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
          overflow:auto;

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
