<template>
  <el-row class="warp" style="position:relative;">
    <div style="width:100%;height:100%;position:relative;z-index: 50;" v-show="tanKuang">
      <!--<el-row class="warp">-->
      <el-col :span="24" class="warp-breadcrum">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }"><b>当前位置：首页</b></el-breadcrumb-item>
          <el-breadcrumb-item>锁具管理</el-breadcrumb-item>
          <el-breadcrumb-item>新增锁具信息</el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>

      <el-col :span="24" class="warp-main">

        <div class="title">
          添加/编辑锁具信息
        </div>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm ">


          <el-form-item  label="锁具名称" prop="legalperson" >
            <el-input  v-model="ruleForm.lockname"></el-input>
          </el-form-item>


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




          <el-form-item label="安装位置" required>
            <el-form-item  prop="proname" style="width:220px;">
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
              <el-select  placeholder="县与区"  v-model="ruleForm.arename"  style="width:220px;"@change="arechange">
                <el-option v-for="are in areas" :label="are.name":key="are.value" :value="are.id"></el-option>
              </el-select>
            </el-form-item>

            <el-form-item  prop="countryname" style="width:220px;">
              <el-select  placeholder="乡"  v-model="ruleForm.countryname"  style="width:220px;">
                <el-option v-for="country in countrys" :label="country.name":key="country.value" :value="country.id"></el-option>
              </el-select>
            </el-form-item>

          </el-form-item>

          <el-form-item label="上级线路"  style="margin-bottom: 0px;" >
            <el-form-item   style="width:220px;" >
              <el-select  placeholder="A线" v-model="ruleForm.routeA" style="width:220px;"@change="routeAchange" >
                <el-option v-for="routeA in routeAs" :label="routeA.routename" :key="routeA.value" :value="routeA.routeid"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item   style="width:220px;">
              <el-select  placeholder="B线"  v-model="ruleForm.routeB"  style="width:220px;"@change="routeBchange"  >
                <el-option v-for="routeB in routeBs" :label="routeB.routename":key="routeB.value" :value="routeB.routeid"></el-option>

              </el-select>
            </el-form-item>

            <el-form-item   style="width:220px;">
              <el-select  placeholder="C线"  v-model="ruleForm.routeC"  style="width:220px;">
                <el-option v-for="routeC in routeCs" :label="routeC.routename":key="routeC.value" :value="routeC.routeid"></el-option>
              </el-select>
            </el-form-item>

          </el-form-item>











          <el-form-item  label="站点类型" prop="locktype" style="margin-top: 20px;" >
            <el-select  placeholder="请选择类型" v-model="ruleForm.locktype" style="width:220px;">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>


          <el-form-item label="详细地址" prop="lockaddress">
            <el-input v-model="ruleForm.lockaddress"></el-input>
          </el-form-item>

          <el-form-item label="经度" prop="longitude">
            <el-input v-model="ruleForm.longitude"></el-input>
          </el-form-item>

          <el-form-item label="纬度" prop="latitude">
            <el-input v-model="ruleForm.latitude"></el-input>
          </el-form-item>

          <el-form-item  label="描述信息" prop="locknote" >
            <el-input  v-model="ruleForm.locknote"></el-input>
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
        <el-breadcrumb-item>锁具信息列表</el-breadcrumb-item>
      </el-breadcrumb>
    </el-col>

    <el-col :span="24" class="warp-main" >
      <!--工具条-->
      <!--添加/编辑-->





      <el-row>
        <el-col :span="4" class="aside">
          <div class="pre-title">
            <h5>锁具信息</h5>
          </div>
          <div class="fresh"  ><a @click="winReload"> 刷新</a>&nbsp;|&nbsp;<a  @click="winReloadW">展开全部</a></div>
          <div class="grid-content bg-purple">
            <div class="tree" >
              <el-tree :data="treedata" highlight-current  :props="defaultProps"  @node-click="handleNodeClick"  :default-expand-all="states" v-if="state2" ></el-tree>
            </div>
          </div>
        </el-col>
        <el-col :span="20" class="right">
          <div class="title">
            锁具列表
            <el-button type="primary" style="float: right;" @click="showAddDialog" ><i class="iconfont" style="margin-right:3px;">&#xe6ff;</i>添加锁具</el-button>
            <!--<el-button type="primary" @click="showAddDialog">添加按钮</el-button>-->

          </div>
          <div  class="grid-content bg-purple-light" style="padding-top:54px;">

            <el-form :inline="true" :model="filters">
              <el-form-item>
                锁具编码：<el-input v-model="filters.lockCode" placeholder="锁具编码" style="width:120px;margin-right:10px;"></el-input>
              </el-form-item>
              <el-form-item>
                锁具名称：<el-input v-model="filters.lockName" placeholder="锁具名称" style="width:120px;margin-right:10px;"></el-input>
              </el-form-item>

              <el-form-item>
                备注：<el-input v-model="filters.locknote" placeholder="" style="width:120px;margin-right:10px;"></el-input>
              </el-form-item>

              <label>状态：</label>


              <el-select v-model="filters.lockstate" placeholder="不限" style="width:120px;">
                <el-option
                  v-for="item in lockstates"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>

              </el-select>

              <el-form-item>
                <el-button  @click="getCompanys"><i class="iconfont">&#xe60e;</i>快速查找</el-button>
              </el-form-item>

            </el-form>


            <!--列表-->

            <el-table :data="cormans" highlight-current-row  @selection-change="selsChange"
                      style="width: 100%;">

              <el-table-column type="selection" width="55"></el-table-column>

              <el-table-column prop="lockid" label="序号" width="120"></el-table-column>
              <el-table-column prop="lockname" label="站点名称" width="160"></el-table-column>
              <el-table-column prop="routeid" label="所属线路" width="180"></el-table-column>
              <el-table-column prop="lockcode" label="锁识别号" width="180" show-overflow-tooltip></el-table-column>
              <el-table-column prop="lockaddress" label="详细地址" width="200"></el-table-column>
              <el-table-column prop="locktype" label="站点类型" width="160" show-overflow-tooltip></el-table-column>
              <el-table-column prop="locknote" label="备注" width="170" show-overflow-tooltip></el-table-column>
              <el-table-column  label="站点照片" width="160" show-overflow-tooltip>
                <template scope="scope">
                  <a size="small" ref="scope.row.lockimage"  class="edit" >查看照片</a>
                </template>
              </el-table-column>
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
              <el-button  @click="exportLock"  class="output"><i class="iconfont">&#xe60c;</i>导出数据</el-button>
              <!--<el-pagination class="page" layout="prev, pager, next, jumper" @current-change="handleCurrentChange" :page-size="8" :total="total" :current-page.sync="currentPage3"-->
              <!--style="float:right;">-->
              <!--</el-pagination>-->

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
  import {exportLock,QueryRouteList,getGroupTree,getLockList,getQueryregion,Addlock,Deletelock,getCompanyTree,Updatelock,QueryCompany,getChildrenRegion,getParentRegion,Deletelocklist} from '../../api/api';

  export default{
    created(){

      getGroupTree().then((res) => {
        //console.log(res.data);
        this.treedata = res.data;
        console.log(this.treedata);
        this.companydatas=res.data
      })

    },
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
        /*状态下拉框*/
        lockstates: [{
          value: '1',
          label: '启动'
        },{
          value: '0',
          label: '禁用'
        }],



        comprops: {
          children: 'children',
          label:'simplename',
          value:'id'
        },

        ruleForm: {
          groupid:'',
         groupids:''||[],

//          pid:''||[],
//          pids:''||[],
          lockid:'',
          lockname:'',
          proname:'',
          cityname:'',
          arename:'',
          countryname:'',
          routeA:'',
          routeB:'',
          routeC:'',
          locktype:'',
          lockaddress:'',
          latitude:'',
          longitude:'',
          locknote:'',
          regionid:'',
          routeid:'',
//          simplename: '',
//          fullname:'',
          parentid: '',
//          contacts: '',
          legalperson: '',
          address:'',
          layer:'',
          num:'',
          state:'',
          type:'',
          version:''
        },
        /*状态下拉框*/
        options: [{
          value: '1',
          label: '启动'
        },{
          value: '0',
          label: '删除'
        }],
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
        companydatas:[],
//        deptid:'1',
        selectedOptions3:['0'],
        currentPage3:this.page,
        filters: {
          lockCode: '',
          lockName:'',
          locknote:'',
          lockstate:''
        },

        defaultProps: {
          children: 'children',
          label: 'fullname'
        },
        parents:{},
        citys:{},
        treeCitys:{},
        areas:{},
        countrys:{},
        routeAs:{},
        routeBs:{},
        routeCs:{},
        proname:'',
        cityname:'',
        arename:'',
        countryname:'',
        status:'',
        re:'',
        groupid:'',
        groupids:'',
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
      handleChange(value) {
        console.log(value);
      },
      //刷新
      winReload:function(cond){
        this.groupTree();
        this.state2 =false
        this.states=false;
        setTimeout(()=>{
          this.state2 =true

        },1)
        this.groupid ='' ;
        this.getCompanys();
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
          //console.log(res.data);
          this.treedata = res.data;
          console.log(this.treedata);
          this.companydatas=res.data
        })
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
          this.parents = res.data;
//          this.treedata = res.data;
        });

      },
      prochange:function(id){
        console.log(typeof(id));
        var N=1;
        if(typeof(id)==typeof(N)){
          this.routes(id);
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
        this.routes(id);
        var N=1;
        if(typeof(id)==typeof(N)){
          this.routes(id);
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
      this.routes(id);
      let para = {
        parentid:id
      };
      console.log(para);
      getChildrenRegion(para).then((res) => {
        console.log(res.data);
        this.countrys = res.data;
      });
    }
  },
      //上级线路
      routes:function(id){
        console.log(id);
        var N=1;
        if(typeof(id)==typeof(N)){
          let para = {
            regionid:id
          };
          QueryRouteList(para).then((res) => {
            this.ruleForm.routeAa='';
            this.ruleForm.routeBb='';
            this.ruleForm.routeCc='';
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
            this.ruleForm.routeBb='';
            this.ruleForm.routeCc='';
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


      //添加与编辑
      addSubmit: function () {
        this.$refs.ruleForm.validate((valid) => {
          if (valid) {
            this.addLoading = true;
//            let para = Object.assign({}, this.ruleForm);
            var para='';
            if(this.ruleForm.lockid){
              para = Object.assign({}, this.ruleForm);
              console.log(para);
              Updatelock(para).then((res) => {
                this.addLoading = false;
                this.$message({
                  message: res.msg,
                });
                this.$refs['ruleForm'].resetFields();
                this.tanKuang=false;
                this.clearRuleForm();
                this.getCompanys();
              });
            }else{
              this.ruleForm.groupids=JSON.stringify(this.ruleForm.groupids);
              this.ruleForm.groupid=this.ruleForm.groupid[this.ruleForm.groupid.length-1];
              if(this.ruleForm.countryname){
                this.ruleForm.regionid=this.ruleForm.countryname;
              }else if(this.ruleForm.arename){
                this.ruleForm.regionid=this.ruleForm.arename
              }else if(this.ruleForm.cityname){
                this.ruleForm.regionid=this.ruleForm.cityname
              }else if(this.ruleForm.proname){
                this.ruleForm.regionid=this.ruleForm.proname
              }

              if(this.ruleForm.routeC){
                this.ruleForm.routeid= this.ruleForm.routeC
              }else if(this.ruleForm.routeB){
                this.ruleForm.routeid= this.ruleForm.routeB
              }else if(this.ruleForm.routeA){
                this.ruleForm.routeid= this.ruleForm.routeA
              }
              para = Object.assign({}, this.ruleForm);
              console.log(para);
              Addlock(para).then((res) => {
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
      //锁具列表导出
      exportLock(){
        let para = {
          lockstate:'',
          deptid:this.groupid,
          lockCode:this.filters.lockCode,
          lockName:this.filters.lockName,
          lockType:this.filters.locknote
        };
        this.listLoading = true;
        exportLock(para).then((res) => {
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
        const tHeader = ['序号', '站点名称', '所属线路', '锁识别号', '详细地址','站点类型','备注'];
        const filterVal = ['lockid','lockname', 'routeid','lockcode', 'lockaddress"', 'locktype', 'locknote'];
        const list = this.list;
        const data = this.formatJson(filterVal, list);
        export_json_to_excel(tHeader, data, '锁具列表');
      });
      },
      formatJson(filterVal, jsonData) {
        return jsonData.map(v => filterVal.map(j => v[j]))
      },


      //清除表单数据
      clearRuleForm(){
        this.$refs['ruleForm'].resetFields();
        this.ruleForm.routeA='';
        this.ruleForm.routeB='';
        this.ruleForm.routeC='';
        this.ruleForm.lockname='';
        this. selectedOptions3=['0'];
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
//        this.$refs[formName].resetFields();
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
        console.log(data);
        this.groupid = data.id;
        console.log(data.id);
       this.getCompanys();
      },

      handleItemChange(data){
        this.ruleForm.groupids=data;
        this.ruleForm.groupid=data;
      },
      //获取锁具列表
      getCompanys() {
        let para = {
          page: this.page,
          limit: 10,
          lockstate:'',
          deptid:this.groupid,
          lockCode:this.filters.lockCode,
          lockName:this.filters.lockName,
          lockType:this.filters.locknote
        };
        console.log(para);
        this.listLoading = true;
        getLockList(para).then((res) => {
//          this.total = res.data.total;
          this.cormans = res.data;
          this.pageinfo=res.pageInfo;
//          console.log(res);
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
          let para = {lockid: row.lockid};
          Deletelock(para).then((res) => {
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
        this.ruleForm = Object.assign({}, row);
        this.selectedOptions3 = JSON.parse(this.ruleForm.groupids);
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
        var ids = this.sels.map(item => item.lockid);
        console.log(ids)
        this.$confirm('确认删除选中记录吗？', '提示', {
          type: 'warning'
        }).then(() => {
          this.listLoading = true;
          //NProgress.start();
          let para = ids;
          console.log(para)
          Deletelocklist(para).then((res) => {
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
      this.groupTree();

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

