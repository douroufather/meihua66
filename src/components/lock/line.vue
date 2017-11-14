<template>
  <el-row class="warp" style="position:relative;">
    <div style="width:100%;height:100%;position:relative;right:0px;z-index: 50;" v-show="tanKuang">
      <!--<el-row class="warp">-->
      <el-col :span="24" class="warp-breadcrum">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }"><b>当前位置：首页</b></el-breadcrumb-item>
          <el-breadcrumb-item>锁具管理</el-breadcrumb-item>
          <el-breadcrumb-item>新增线路信息</el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>

      <el-col :span="24" class="warp-main">

        <div class="title">
          添加/编辑线路信息
        </div>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm ">


          <el-form-item label="所属部门" prop="pids">
            <el-cascader
              placeholder="选择部门"
              v-model="selectedOptions3"
              :options="companydatas"
              :props="comprops"
              filterable
              :show-all-levels="true"
              change-on-select
              @change="handleItemChange"
            ></el-cascader>
          </el-form-item>


          <el-form-item label="上级区域" required  >
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

            <el-form-item prop="arename"  style="width:220px;">
              <el-select  placeholder="区"  v-model="ruleForm.arename"  style="width:220px;"@change="areaAchange">
                <el-option v-for="area in areas" :label="area.name":key="area.value" :value="area.id"></el-option>
              </el-select>
            </el-form-item>

            <el-form-item   style="width:220px;">
              <el-select  placeholder="乡"  v-model="ruleForm.country"  style="width:220px;"@change="areaBchange" v-show="showB">
                <el-option v-for="areaB in countrys" :label="areaB.name":key="areaB.value" :value="areaB.id"></el-option>
              </el-select>
            </el-form-item>

            <el-form-item   style="width:220px;">
              <el-select  placeholder="村"  v-model="ruleForm.village"  style="width:220px;"@change="areaCchange" v-show="showC">
                <el-option v-for="areaC in villages" :label="areaC.name":key="areaC.value" :value="areaC.id"></el-option>
              </el-select>
            </el-form-item>
          </el-form-item>





          <el-form-item label="上级线路"   >
            <el-form-item   style="width:220px;" >
              <el-select  placeholder="A线" v-model="ruleForm.routeA" style="width:220px;"@change="routeAchange" >
                <el-option v-for="routeA in routeAs" :label="routeA.routename" :key="routeA.value" :value="routeA.routeid"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item   style="width:220px;">
              <el-select  placeholder="B线"  v-model="ruleForm.routeBb"  style="width:220px;"@change="routeBchange"  >
                <el-option v-for="routeB in routeBs" :label="routeB.routename":key="routeB.value" :value="routeB.routeid"></el-option>

              </el-select>
            </el-form-item>

            <el-form-item   style="width:220px;">
              <el-select  placeholder="C线"  v-model="ruleForm.routeCc"  style="width:220px;">
                <el-option v-for="routeC in routeCs" :label="routeC.routename":key="routeC.value" :value="routeC.routeid"></el-option>
              </el-select>
            </el-form-item>

          </el-form-item>



          <el-form-item  label="线路名称" prop="routename" >
            <el-input  v-model="ruleForm.routename"></el-input>
          </el-form-item>

          <!--<el-form-item label="联系方式" prop="contacts">-->
            <!--<el-input v-model="ruleForm.contacts"></el-input>-->
          <!--</el-form-item>-->


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
        <el-breadcrumb-item>锁具管理</el-breadcrumb-item>
        <el-breadcrumb-item>线路列表</el-breadcrumb-item>
      </el-breadcrumb>
    </el-col>

    <el-col :span="24" class="warp-main" >
      <!--工具条-->
      <!--添加/编辑-->





      <el-row>
        <el-col :span="4" class="aside">
          <div class="pre-title">
            <h5>线路信息</h5>
          </div>
          <div class="fresh"  ><a @click="winReload"> 刷新</a>&nbsp;</div>
          <div class="grid-content bg-purple">
            <div class="tree" >
              <el-tree :data="treedata" highlight-current :props="defaultProps" lazy :load="loadNode"  @node-click="handleNodeClick" :default-expand-all="states" v-if="state2"></el-tree>
            </div>
          </div>
        </el-col>
        <el-col :span="20" class="right">
          <div class="title">
            线路列表
            <el-button type="primary" style="float: right;" @click="showAddDialog" ><i class="iconfont" style="margin-right:3px;">&#xe6ff;</i>添加线路</el-button>
            <!--<el-button type="primary" @click="showAddDialog">添加按钮</el-button>-->
          </div>
          <div  class="grid-content bg-purple-light" style="padding-top:54px;">
            <el-form :inline="true" :model="filters">
              <el-form-item>
                线路名称：<el-input v-model="filters.routename" placeholder="线路名称" style="width:220px;margin-right:10px;"></el-input>
              </el-form-item>
              <!--<el-form-item>-->
                <!--公司简称：<el-input v-model="filters.simplename" placeholder="公司简称" style="width:220px;margin-right:10px;"></el-input>-->
              <!--</el-form-item>-->
              <el-form-item>
                <el-button  @click="getCompanys"><i class="iconfont">&#xe60e;</i>快速查找</el-button>
              </el-form-item>
            </el-form>


            <!--列表-->

            <el-table :data="cormans" highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%;">
              <el-table-column type="selection" width="55"></el-table-column>
              <el-table-column prop="regionid" label="ID" width="100"></el-table-column>
              <el-table-column prop="routename" label="线路名称" min-width="320"></el-table-column>
              <!--<el-table-column prop="simplename" label="公司简称" width="120"></el-table-column>-->
              <el-table-column prop="mergename" label="所在地" min-width="320" show-overflow-tooltip></el-table-column>
              <!--<el-table-column prop="legalperson" label="公司法人" width="130"></el-table-column>-->
              <!--<el-table-column prop="contacts" label="联系方式" width="150" show-overflow-tooltip></el-table-column>-->
              <el-table-column label="操作" width="80">
                <template scope="scope">
                  <a size="small" @click="showEditDialog(scope.$index,scope.row)" class="edit" ><i class="iconfont">&#xe651;</i></a>
                  <a type="danger" @click="del(scope.$index,scope.row)" class="delete"><i class="iconfont" >&#xe67e;</i></a>
                </template>
              </el-table-column>
            </el-table>
            <!--工具条-->
            <el-col :span="24"  class="toolbar" >
              <el-button type="danger" @click="batchDeleteBook" :disabled="this.sels.length===0"><i class="iconfont">&#xe60d;</i>批量删除</el-button>
              <el-button  @click="exportRoute"  class="output"><i class="iconfont">&#xe60c;</i>导出数据</el-button>
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
  import {exportRoute,getCompanyList,QueryRouteList,getRouteList,getQueryregion,AddRoute,DeleteRoute,getCompanyTree,UpdateRoute,QueryCompany,getChildrenRegion,getParentRegion,DeleteRouteList} from '../../api/api';

  export default{
    created(){
      let para = {
        parentid:100000
      };
      getChildrenRegion(para).then((res) => {
        //console.log(res.data);
        this.treedata = res.data;
      })

    },
    data(){
      //省
      var validateProname = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请选择省'));
        } else{
          callback();
        }
      }
      //市
      var validateCityname = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请选择市'));
        } else{
          callback();
        }
      }
      //区
      var validateArename = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请选择区'));
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
          groupid:'',
          groupids:[],
          id:'',
          proname:'',
          cityname:'',
          arename:'',
          country:'',
          village:'',
          routeA:'',
          routeB:'',
          routeC:'',
          routename:'',
          prouteid:'',
          regionid:''
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
          routename:[
            { required: true, message: '请输入线路名称', trigger: 'blur' }
          ]
        },
        tanKuang:false,
        treedata:[],
        companydatas:[],
        deptid:'1',
        selectedOptions3:['0'],
        currentPage3:this.page,
        filters: {
          routename: ''
        },
        defaultProps: {
          children: 'parentid',
          label: 'name'
        },
        parents:{},
        citys:{},
        treeCitys:{},
        routeAs:{},
        routeBs:{},
        routeCs:{},
        areas:{},
        countrys:{},
        villages:{},
        proname:'',
        cityname:'',
        arename:'',
        showB:false,
        showC:false,
        re:'',
        pid:'',
        pids:'',
        cityid:'',
        regionid:'',
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
        // this.treedata = res.data;
        })
      },

      handleChange(value) {
        console.log(value);
      },
      //刷新
      winReload:function(cond){

        this.childrenRegion();
        this.state2 =false;
        this.states=false;
        setTimeout(()=>{
          this.state2 =true

        },1)
        this.regionid = '';
        this.getCompanys();
      },

      childrenRegion:function(){
        let para = {
          parentid:100000
        };
        getChildrenRegion(para).then((res) => {
          //console.log(res.data);
          this.treedata = res.data;
        })
      },

  //上级线路
      routes:function(id){
          console.log(id)
        var N=1;
        if(typeof(id)==typeof(N)){
          let para = {
            regionid:id
          };
          QueryRouteList(para).then((res) => {
            this.ruleForm.routeA='';
            this.ruleForm.routeB='';
            this.ruleForm.routeC='';
            this.routeAs = res.data;
            console.log(res.data)
          });
        }

      },
      routeAchange:function(id){
        var N=1;
        if(typeof(id)==typeof(N)){
          let para = {
            prouteid:id
          };
          console.log(id)
          QueryRouteList(para).then((res) => {
            this.ruleForm.routeB='';
            this.ruleForm.routeC='';
            this.routeBs = res.data;
            console.log(res.data)
          });
        }

       },
      routeBchange:function(id){
        var N=1;
        if(typeof(id)==typeof(N)){
          let para = {
            prouteid:id
          };
          QueryRouteList(para).then((res) => {
            this.routeCs = res.data;
            console.log(res.data)
          });
        }

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
        console.log(id)
        this.routes(id);
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
          console.log(id)
        this.routes(id);
        var N=1;
        if(typeof(id)==typeof(N)){
          let para = {
            parentid:id
          };
          getChildrenRegion(para).then((res) => {
            console.log(res.data);
            this.areas = res.data;
          });
        }
      },
      areaAchange:function(id){
        //console.log(id)
        this.routes(id);
        var N=1;
        if(typeof(id)==typeof(N)){
          let para = {
            parentid:id
          };
          getChildrenRegion(para).then((res) => {
            console.log(res.data);
            this.countrys = res.data;
            if(this.areaB&&this.areaB.length>1){
              this.showB=true;
            }else if(this.ruleForm.country==''){
              this.showB=false;
            }
          });
        }
      },
      areaBchange:function(id){
        console.log(id)
        this.routes(id);
        var N=1;
        if(typeof(id)==typeof(N)){
          let para = {
            parentid:id
          };
          getChildrenRegion(para).then((res) => {
            console.log(res.data);
            this.villages = res.data;
            if(this.areaC&&this.areaC.length>1){
              this.showC=true;
            }else if(this.ruleForm.village==''){
              this.showC=false;
            }
          });
        }
      },

      areaCchange:function(id){
        this.routes(id);
      },
      //添加与编辑
      addSubmit: function () {
        this.$refs.ruleForm.validate((valid) => {
          if (valid) {
            this.addLoading = true;
//            let para = Object.assign({}, this.ruleForm);
            var para='';
            if(this.ruleForm.routeid){
              para = Object.assign({}, this.ruleForm);
              console.log(para);
              UpdateRoute(para).then((res) => {
                this.addLoading = false;
                this.$message({
                  message: res.msg,
                });
//                this.$refs['ruleForm'].resetFields();
                this.tanKuang=false;
                this.clearRuleForm();
                this.getCompanys();
              });
            }else{
              if(this.ruleForm.village){
                this.ruleForm.regionid = this.ruleForm.village;
              }else if(this.ruleForm.country){
                this.ruleForm.regionid = this.ruleForm.country;
              }else{
                this.ruleForm.regionid = this.ruleForm.arename;
              };

              if(this.ruleForm.routeC){
                this.ruleForm.prouteid = this.ruleForm.routeC;
              }else if(this.ruleForm.routeB){
                this.ruleForm.prouteid = this.ruleForm.routeB;
              }else if(this.ruleForm.routeC){
                this.ruleForm.prouteid = this.ruleForm.routeC;
              }
              this.ruleForm.groupids=JSON.stringify(this.ruleForm.groupids);
              this.ruleForm.groupid=this.ruleForm.groupid[this.ruleForm.groupid.length-1];
              para = Object.assign({}, this.ruleForm);
              console.log(para);
              AddRoute(para).then((res) => {
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
            console.log(para);

          }
        });
      },

      //线路列表导出
      exportRoute(){
        let para = {
          page: this.page,
          regionid:this.regionid,
          prouteid:'',
          routename:this.filters.routename
        };
        this.listLoading = true;
        exportRoute(para).then((res) => {
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
        const tHeader = ['ID', '线路名称', '所在地'];
        const filterVal = ['regionid', 'routename', 'mergename'];
        const list = this.list;
        const data = this.formatJson(filterVal, list);
        export_json_to_excel(tHeader, data, '线路列表');
      });
      },
      formatJson(filterVal, jsonData) {
        return jsonData.map(v => filterVal.map(j => v[j]))
      },

      //清除表单数据
      clearRuleForm(){
        this.$refs['ruleForm'].resetFields();
        this.ruleForm.routeA='';
        this.selectedOptions3=['0'];
          //this.ruleForm.address=''
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
      resetForm() {
        this.clearRuleForm();
        this.tanKuang = false;
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
       // this.pid = data.id;
        this.regionid = data.id;
        this.getCompanys();
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
        this.ruleForm.groupids=data;
        this.ruleForm.groupid=data;
      },
      //获取用户列表
      getCompanys() {
        let para = {
          page: this.page,
          limit: 10,
          regionid:this.regionid,
          prouteid:'',
          routename:this.filters.routename
        };
        this.listLoading = true;

        getRouteList(para).then((res) => {
         this.total = res.data.total;
          this.cormans = res.data;
          this.pageinfo=res.pageInfo;
              console.log(res.data);
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
          let para = {routeid: row.routeid};
          console.log(para)
          DeleteRoute(para).then((res) => {
            this.listLoading = false;
            //NProgress.done();
            this.$message({
              message: res.msg
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
        console.log(this.ruleForm.groupids);
        this.selectedOptions3 = JSON.parse(this.ruleForm.groupids);
        if(this.ruleForm.country){
          this.showB=true;
        }else if(this.ruleForm.village){
          this.showC=true;
        }
        console.log(this.ruleForm);
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
        var ids = this.sels.map(item => item.routeid);
        console.log(ids)
        this.$confirm('确认删除选中记录吗？', '提示', {
          type: 'warning'
        }).then(() => {
          this.listLoading = true;
          //NProgress.start();
          let para = ids;
          console.log(para)
          DeleteRouteList(para).then((res) => {
            console.log(res);
            this.listLoading = false;
            //NProgress.done();
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
      this.routes();
      this.companyTree();
      this.childrenRegion();
      getCompanyTree().then((res) => {
       // console.log(res.data);
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
