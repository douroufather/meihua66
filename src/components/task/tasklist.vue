<template>
  <el-row class="warp" style="position:relative;">
    <div style="width:100%;height:100%;position:relative;right:0px;z-index: 50;" v-show="dialog">
      <!--<el-row class="warp">-->
      <el-col :span="24" class="warp-breadcrum">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }"><b>当前位置：首页</b></el-breadcrumb-item>
          <el-breadcrumb-item>任务管理</el-breadcrumb-item>
          <el-breadcrumb-item>新增任务信息</el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>

      <el-col :span="24" class="warp-main edit">
        <div class="title">
          添加/编辑任务信息 <el-button  @click="resetForm" style="float:right">返回列表</el-button>
        </div>

        <el-steps  :space="160" :active="active" finish-status="success" >
          <el-step title="第一步" description="填写任务信息"></el-step><div class="el-step-icon" ><i class="iconfont">&#xe604;</i></div>
          <el-step title="第二步" description="选择员工和配发钥匙"></el-step><div class="el-step-icon" ><i class="iconfont">&#xe604;</i></div>
          <el-step title="第三步" description="选择地区"></el-step>
        </el-steps>

        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm ">
          <!--第一步-->
          <div  class="step"  v-show="step1">
            <el-form-item label="所属部门：" prop="groupids">
            <el-cascader
              :options="groupdatas"
              :props="comprops"
              change-on-select
              @change="handleItemChange"
            ></el-cascader>
          </el-form-item>

            <el-form-item label="任务类型：" prop="authtype">
              <el-select  placeholder="状态选择" v-model="ruleForm.authtype" style="width:220px;">
                <el-option
                  v-for="item in authtype"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>

            <el-form-item  label="任务名称：" prop="authname" ><el-input  v-model="ruleForm.authname"></el-input></el-form-item>
            <el-form-item label="任务时间：" >
              <el-date-picker v-model="ruleForm.authstarttime" type="datetime" placeholder="开始日期时间" align="right":picker-options="pickerOptions" style="width: 220px">
              </el-date-picker>
              <el-col class="line" :span="2"style="width:10px;">-</el-col>
              <el-date-picker v-model="ruleForm.authstoptime" type="datetime" placeholder="结束日期时间" align="right":picker-options="pickerOptions" style="width: 220px">
              </el-date-picker>
            </el-form-item>

            <el-form-item>
              <el-button type="primary" @click="showStep2">下一步</el-button>
              <!--<el-button @click="resetForm">返回</el-button>-->
            </el-form-item>

          </div>

          <!--第二步-->
          <div class="step" v-show="step2" >
            <div class="tab left" style=" margin-right:50px;">

              <el-form :inline="true" :model="filters" class="el-title">
                <el-form-item>
                  <el-input v-model="filters.name" placeholder="请输入员工姓名"></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button  v-on:click="getEmployes" class="el-button-select">查询</el-button>
                </el-form-item>
              </el-form>

              <el-table :data="staff" stripe  append >
               <el-table-column  label="选择员工" width="120">
               <template scope="scope">
                <el-radio size="small"  v-model="ruleForm.employeeid"  :label="scope.row.id" ></el-radio>
               </template>
               </el-table-column>
                <el-table-column prop="name" label="姓名" width="120"> </el-table-column>
                <el-table-column prop="groupname" label="工作部门" width="209px"> </el-table-column>
              </el-table>
            </div>
            <div class="tab right" >
              <el-form :inline="true" :model="filters" class="el-title">
                <el-form-item>
                  <el-input v-model="filters.keyname" placeholder="请输入钥匙名称"></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button  v-on:click="getKeys" class="el-button-select">查询</el-button>
                </el-form-item>
              </el-form>

              <el-table :data="keydata" stripe  append>
                <el-table-column  label="选择钥匙" width="100">
                  <template scope="scope">
                    <el-radio size="small"  v-model="ruleForm.keyid" :label="scope.row.keyid" @click="keyClick(scope.row.keyid)"></el-radio>
                  </template>
                </el-table-column>
              <el-table-column prop="keyname" label="钥匙名称" width="100"> </el-table-column>
              <el-table-column prop="groupname" label="所属部门" width="249px"> </el-table-column>
              </el-table>
            </div>

            <el-form-item>
              <el-button @click="showStep1">返回上一步</el-button>
              <el-button type="primary" @click="showStep3">下一步</el-button>
            </el-form-item>

          </div>
          <!--第三步-->
          <div class="step" style="" v-show="step3">

            <div class="tab left" style=" margin-right:20px;width:250px;">
              <label class='el-title' style="width:250px;">选择地区</label>
              <!--<div class="fresh" @click="winReloadd"><a > 刷新</a>&nbsp;|&nbsp;<a  @click="winReloaddw">展开全部</a></div>-->
              <div class="grid-content bg-purple">
                <div class="tree">
                  <el-tree :data="regintreedata"  :props="reginprops" @node-click="reginTreeClick" :default-expand-all="states1" v-if="state22" ></el-tree>
                </div>
              </div>
            </div>

            <div class="tab left" style=" margin-right:20px;width:250px;" v-show="routetree">
              <label class='el-title' style="width:250px;">选择线路</label>
              <!--<div class="fresh" @click="winReload"><a > 刷新</a>&nbsp;|&nbsp;<a  >展开全部</a></div>-->
              <div class="grid-content bg-purple">
                <div class="tree">
                  <el-tree :data="routetreedata"  :props="routeprops" @node-click="routeTreeClick"  ></el-tree>
                </div>
              </div>
            </div>

            <div class="tab right" style="width:inherit">
              <el-transfer :props="lockprops"
                v-model="ruleForm.selectlock"
                filterable
                :right-default-checked=[2,3]
                :titles="['锁具选择 ', '已选锁具']"
                :button-texts="['删除', '添加']"
                :footer-format="{ noChecked: '共 ${total} 项', hasChecked: '已选 ${checked}/${total} 项'}"
                @change="handleChange"
                :data="lockdata" >
              </el-transfer>
            </div>

            <el-form-item>
              <el-button type="primary" @click.native="addSubmit">保存</el-button>
              <el-button @click="showStep2">返回上一步</el-button>
            </el-form-item>

          </div>
        </el-form>
        <!--<el-button style="margin-top: 12px;" @click="next">下一步aaaa</el-button>-->
      </el-col>
      <!--</el-row>-->
    </div>
    <el-col :span="24" class="warp-breadcrum">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }"><b>当前位置：首页</b></el-breadcrumb-item>
        <el-breadcrumb-item>任务管理</el-breadcrumb-item>
        <el-breadcrumb-item>任务信息列表</el-breadcrumb-item>
      </el-breadcrumb>
    </el-col>

    <el-col :span="24" class="warp-main" >
      <!--工具条-->
      <!--添加/编辑-->

      <el-row>
        <el-col :span="4" class="aside">
          <div class="pre-title">
            <h5>任务信息</h5>
          </div>
          <div class="fresh" ><a @click="winReload" > 刷新</a>&nbsp;|&nbsp;<a @click="winReloadW">展开全部</a></div>
          <div class="grid-content bg-purple">
            <div class="tree" >
              <el-tree :data="groupdata" highlight-current :props="groupProps"    @node-click="handleNodeClick":default-expand-all="states" v-if="state2"></el-tree>
            </div>
          </div>
        </el-col>
        <el-col :span="20" class="right">
          <div class="title">
            任务列表
            <el-button type="primary" style="float: right;" @click="showAddDialog" ><i class="iconfont" style="margin-right:3px;">&#xe6ff;</i>添加任务</el-button>
            <!--<el-button type="primary" @click="showAddDialog">添加按钮</el-button>-->

          </div>
          <div  class="grid-content bg-purple-light" style="padding-top:54px;">
            <el-form :inline="true" :model="filters">
              <el-form-item>任务名称：<el-input v-model="filters.authname" placeholder="任务名称" style="width:90px;"></el-input></el-form-item>
              <label style="font-size: 14px;">时间：</label>
              <el-date-picker style="width: 178px;" v-model="filters.beginTime" type="datetime"  placeholder="选择开始时间"></el-date-picker> -
              <el-date-picker style="width: 178px;"  v-model="filters.endTime"   type="datetime"  placeholder="选择结束时间"></el-date-picker>
              <el-form-item>授权人：<el-input v-model="filters.fullname" placeholder="授权人" style="width:70px;"></el-input></el-form-item>
              <label style="font-size: 14px;">任务状态：</label>
              <el-select v-model="filters.authtype" placeholder="不限" style="width:80px;">
                <el-option
                  v-for="item in authtype"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>

              <el-form-item><el-button  @click="getAuthLists"><i class="iconfont">&#xe60e;</i>快速查找</el-button></el-form-item>

            </el-form>

            <!--列表-->

            <el-table :data="cormans" highlight-current-row  @selection-change="selsChange" style="width: 100%;">

              <el-table-column type="selection" width="55"></el-table-column>
              <el-table-column prop="authname" label="任务名称" width="200"></el-table-column>
              <el-table-column prop="keyname" label="钥匙名称" width="200"></el-table-column>
              <el-table-column prop="username" label="授权人" width="150"></el-table-column>
              <el-table-column prop="employeename" label="执行人" width="150"></el-table-column>
              <el-table-column prop="authstate" label="授权状态" width="100"></el-table-column>
              <el-table-column prop="authstarttime" label="开始时间" width="200">
                <template scope="scope">
                  {{getStartTime((scope.row.authstarttime))}}
                </template>
              </el-table-column>
              <el-table-column prop="authstoptime" label="结束时间" width="200">
                <template scope="scope">
                  {{getStartTime((scope.row.authstoptime))}}
                </template>
              </el-table-column>

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

  import {groupTreeById,FindType,exportAuth,queryKeyList,routeTree,getAuthList,getCompanyList,getQueryregion,AddCompanyList,reqDeleteCompany,getGroupTree,getCompanyTree,UpdateCompany,QueryCompany,getChildrenRegion,getParentRegion,deleteCompanylist,queryUserList,getKeyList,regionTree,queryLockList,addAuth,updateAuth,deleteAuth,deleteAuthList} from '../../api/api';

  export default{
    data(){
      const date1 = new Date();
      date1.setTime(date1.getTime() - 3600 * 1000 * 24*30);
      const date2 = new Date();
      return {
        states:false,
        state2:true,
        states1:false,
        state22:true,
        groupdatas:[],
        /*状态下拉框*/
        authtype: [],
        comprops: {
          children: 'children',
          label:'fullname',
          value:'id'
        },
        reginprops: {
          children: 'children',
          label:'name',
          value:'id'
        },
        routeprops: {
          children: 'children',
          label:'mergename',
          value:'id'
        },
        lockprops: {
          key:'lockid',
          label:'lockname'
        },
        ruleForm: {
          id:'',
          proname:'',
          lockstate:'',
          arename:'',
          parentid: '',
          authname: '',
          authtype:'',
          keyname:'',
          keystate:'1',
          deptid:'',
          keynote:'',
          username:'',
          keyid:[],
          authstarttime:'',
          authstoptime:'',
          employeeid:'',
          selectlock:[],
          lockids:'',
          userid:'',
          regionid:'',
          routeid:'',
          groupids:'',
          authdeptid:''

        },
        rules: {},
        formRules: {
          authtype: [
            {required: true, message: '请选择', trigger: 'blur'}
          ]
        },
        filters: {
          fullname: '',
          authname: '',
          beginTime:date1,
          endTime:date2,
          name:'',
          keyname:'',
          authtype:''
        },

        groupProps: {
          children: 'children',
          label: 'fullname'
        },
        pickerOptions: {
          shortcuts: [{
            text: '今天',
            onClick(picker) {
              picker.$emit('pick', new Date());
            }
          }]
        },
        dialog:false,
        groupdata:[],
        currentPage3:this.page,
        staff: [],
        authstarttime: '',
        authstoptime: '',
        employeeid:'',
        value3: [1],
//        data: generateData(),
        parents:{},
        citys:{},
        areas:{},
        proname:'',
        routetree:false,
//        cityname:'',
        arename:'',
        re:'',
        pid:'',
//        pids:'',
        cityid:'',
//        regionid:''||Number,
        cormans: [],
        total: 0,
        pageinfo:{},
        page: 1,
        listLoading: false,
        step1:false,
        step2:false,
        step3:false,
        sels: [], //列表选中列
        active: 1,
        treedata:[],
        companyids:['0'],
//        companydatas:[],
        userdatas:[],
        deptid:'',
        keyname:'',
        username:'',
        keystate:'1',
        groups:'',
        keyId:'',
        keydata: [],
        companyOptions:['0'],
        userOptions:[],
        keylist: [],
        regintreedata:[],
        routetreedata:[],
        regionId:'',
        routeId:'',
        lockdata:[],
        id:'',
        value:''
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
      //根据用户权限查询组织树
      groupList(){
        let para = {
        };
        groupTreeById(para).then((res) => {
          this.groupdatas = res.data;
        console.log(res.data);
      })
      },
      handleItemChange(data){
        this.ruleForm.groupids=data;
        this.ruleForm.authdeptid=data;
        this.ruleForm.authdeptid=this.ruleForm.groupid[this.ruleForm.groupid.length-1];
        this.authdeptid = this.ruleForm.groupid;
      },
      change(n){
        switch(n){
          case '1':
            return n = '巡视';
            break;
          case '2':
            return n = '操作';
            break;
          case '3':
            return n = '处缺';
            break;
          case '4':
            return n = '检修';
            break;
        }
      },

      handleChange(value) {
        console.log(value);
      },
      getKeys(value) {
        console.log(value);
      },
      getEmployes(value) {
        console.log(value);
      },
      //地区刷新
      winReloadd:function(cond){
        this.getRegionTree();
        this.state22 =false;
        this.states1=false;
       setTimeout(()=>{
          this.state22 =true
        },1)
      },
      //地区展开全部
      winReloaddw:function(){
        this.state22=false;
        this.states1=true;
        setTimeout(()=>{
          this.state22 =true
          this.addLoading = false;
        },1);
        this.getRegionTree();
      },
      //主页刷新
      winReload:function(cond){
        this. groupTree();
        this.state2 =false;
        this.states=false;
        setTimeout(()=>{
          this.state2 =true

        },1);
        this.pid = 1;
        this.getAuthLists();
      },

      //主页展开全部
      winReloadW:function(){
        this.state2=false;
        this.states=true;
        this.addLoading = true;
        setTimeout(()=>{
          this.state2 =true
          this.addLoading = false;
        },1)
        this. groupTree();
      },

      groupTree:function(){
        getGroupTree().then((res) => {
          //console.log(res.data);
          this.groupdata = res.data;
        })
      },

      //获取省市县
      getSites:function(){
        let para = {
          parentid:100000
        };
        getChildrenRegion(para).then((res) => {
          this.ruleForm.proname='';
//          this.ruleForm.cityname='';
          this.ruleForm.arename='';
          this.parents = res.data;
        });

      },
      //添加与编辑
      addSubmit: function () {
        this.$refs.ruleForm.validate((valid) => {
          if (valid) {
            this.addLoading = true;
//            let para = Object.assign({}, this.ruleForm);
            var para='';
            if(this.ruleForm.authid){
              para = Object.assign({}, this.ruleForm);

             // console.log(para);
              updateAuth(para).then((res) => {
                this.addLoading = false;
                this.$message({
                message: res.msg,
              });
//                this.$refs['ruleForm'].resetFields();
              this.dialog=false;
              this.clearRuleForm();
              this.getAuthLists();
            });
            }else{

              this.ruleForm.lockids=(this.ruleForm.selectlock).join(",")
//              this.ruleForm.pid=this.ruleForm.pid[this.ruleForm.pid.length-1];
              this.ruleForm.authstarttime=Date.parse(new Date(this.ruleForm.authstarttime));
              this.ruleForm.authstoptime=Date.parse(new Date(this.ruleForm.authstoptime));
              para = Object.assign({}, this.ruleForm);
              console.log(para);
              addAuth(para).then((res) => {
                this.addLoading = false;
              console.log(res);
              this.$message({
                message: res.msg,
              });
              this.dialog=false;
              this.clearRuleForm();
              this.getAuthLists();
            });
            }
            console.log(para);

          }
        });
      },

      //任务列表导出
      exportRoute(){
        let para = {
          beginTime: (this.filters.beginTime).getTime(),
          endTime:(this.filters.endTime).getTime(),
          authname:'',
          username:'',
          employeename:'',
          groupid:this.pid
        };
        this.listLoading = true;
        exportAuth(para).then((res) => {
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
        const tHeader = ['任务名称', '钥匙名称', '授权人','执行人','任务状态','开始时间','结束时间'];
        const filterVal = ['authname', 'keyid','username', 'employeename', 'authtype', 'authstarttimevo', 'authstoptimevo'];
        const list = this.list;
        const data = this.formatJson(filterVal, list);
        export_json_to_excel(tHeader, data, '任务列表');
       });
      },
      formatJson(filterVal, jsonData) {
        return jsonData.map(v => filterVal.map(j => v[j]))
      },


      //返回
      resetForm:function(){
        this.dialog=false;
        this.clearRuleForm();
      },
      selsChange: function (sels) {
        this.sels = sels;
      },
      //清除表单数据
      clearRuleForm(){
        this.$refs['ruleForm'].resetFields();
//        this.selectedOptions3=['0'],
        this.ruleForm.address='';
        this.ruleForm.authstarttime = '';
        this.ruleForm.authstoptime = ''
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
        this.getAuthLists();
        console.log('当前页: ${val}');
      },

//el-tree
      handleNodeClick(data) {
//        console.log(data);
        console.log(data.id);
        this.pid = data.id;
//        this.regionid = data.id;
        this.deptid=data.id;
        this.getAuthLists();
        this.getKeys();
      },
      reginTreeClick(data) {
        this.regionid = data.id;
        this.ruleForm.regionid = data.id;
        this.routeid="";
//        console.log(this.regionid );
        this.getRouteTree();
        this.getLocks();
      },
     //routeTreeClick
      routeTreeClick(data) {
        console.log(data);
        console.log(data.routeid);
        this.routeid = data.routeid;
        this.ruleForm.routeid = data.routeid;
//        console.log(this.regionid );
        this.getLocks();
      },
      keyClick(data){
        console.log(data);
//        this.id = data.deptid;
      },
      //员工列表
      getUsers:function(){
        let para = {
          username: this.username,
          deptid:this.deptid
        };
        this.listLoading = true;
        queryUserList(para).then((res) => {
          this.staff = res.data;
          this.listLoading = false;
        })
      },
      //区域树
      getRegionTree:function(){
        let para = {
          regionid:this.regionid
        };
        this.listLoading = true;
        regionTree(para).then((res) => {
          this.regintreedata = res.data;
          console.log(res);
          this.listLoading = false;
        })
      },
      //线路树 routeTree
      getRouteTree:function(){
        let para = {
          regionid:this.regionid
        };
//        console.log(regionid);
        this.listLoading = true;
        routeTree(para).then((res) => {
          console.log(res.data);
          this.routetreedata = res.data;
          console.log(this.routetreedata)
          if((this.routetreedata)&&(this.routetreedata).length>0){
              this.routetree=true;
          }else{
            this.routetree=false;
          }
          this.listLoading = false;
         })
      },

      //钥匙选择
      getKeys(){
        let para = {
          deptid : this.deptid
        };
        queryKeyList(para).then((res) =>{
          console.log(res.data);
        this.keydata = res.data;
        })
      },
      //锁具选择
      getLocks() {
        let para = {
          regionId: this.regionid,
          routeId: this.routeid
//          regionId:330108
        };
        console.log(para)
        this.listLoading = true;
        queryLockList(para).then((res) => {
          console.log(res.data);
          this.lockdata = res.data;
          this.listLoading = false;
        })
      },
  //任务列表
      getAuthLists() {
        let para = {
          page: this.page,
          limit: 10,
          beginTime: (this.filters.beginTime).getTime(),
          endTime:(this.filters.endTime).getTime(),
          authname:'',
          username:'',
          authtype:'',
          deptid:this.deptid
        };
//        console.log(para);
        this.listLoading = true;
        getAuthList(para).then((res) => {
//          this.total = res.data.total;
          this.cormans = res.data;
          this.pageinfo=res.pageInfo;
          this.listLoading = false;
        //NProgress.done();
      })
      },

      //删除
      del: function (index, row) {
        this.$confirm('确认删除该记录吗?', '提示', {type: 'warning'}).then(() => {
//          this.listLoading = true;
        //NProgress.start();
        let para = {authid: row.authid};
        deleteAuth(para).then((res) => {
          this.listLoading = false;
        //NProgress.done();
        this.$message({
          message: res.msg,
          type: 'success'
        });
        this.getAuthLists();
        });
        }).catch(() => {
        });
      },
      //时间戳怎么转成日期格式

//      getStartTime:function (time) {
//        var now=new Date(time);
//        var year=now.getFullYear();
//        var month=now.getMonth()+1;
//        var date=now.getDate();
//        var hour=now.getHours();
//        var minute=now.getMinutes();
//        var second=now.getSeconds();
//        return year+"-"+month+"-"+date+" "+hour+":"+minute+":"+second;
//      },
      //时间戳怎么转成日期格式

      getStartTime:function (time) {
        var now=new Date(time);
        var year=now.getFullYear();
        var month=now.getMonth()+1;
        month=month<10?('0'+month):month;
        var date=now.getDate();
        date=date<10?('0'+date):date;
        var hour=now.getHours();
        hour=hour<10?('0'+hour):hour;
        var minute=now.getMinutes();
        minute=minute<10?('0'+minute):minute;
        var second=now.getSeconds();
        second=second<10?('0'+second):second;
        return year+"-"+month+"-"+date+" "+hour+":"+minute+":"+second;
      },

//添加
      showAddDialog: function () {
        this.dialog=true;
        this.step1=true;
        this.step2=false;
        this.step3=false;
      },
      //显示1界面
      showStep1: function (index,row) {
        this.active=1;
        this.step1=true;
        this.step2=false;
        this.step3=false;

      },
      //显示2界面
      showStep2: function (index,row) {
        this.active=2;
        this.step1=false;
        this.step2=true;
        this.step3=false;
        this.getUsers();
        this.getKeys();

      },
      //显示3界面
      showStep3: function (index,row) {
        this.step1=false;
        this.step2=false;
        console.log(this.ruleForm.employeeid);
        console.log(this.ruleForm.keyid);
        if ((this.ruleForm.employeeid).length==0||(this.ruleForm.keyid).length==0) {
          this.$message({
            message: "请选择执行人与钥匙!",
            type: 'error'
          });
          this.step2=true;
        } else {
          console.log("aaaaaaaaaaaaaaaaaaaaa");
          this.active=3;
          this.step3=true;
        }
        this.getRegionTree();
        this.getRouteTree();
      },

      //显示编辑界面
      showEditDialog: function (index,row) {
        this.dialog=true;
        this.active=1;
        this.step1=true;
        this.step2=false;
        this.step3=false;
        this.ruleForm = Object.assign({}, row);
        console.log(this.ruleForm.lockids);
        //this.ruleForm.selectlock = this.ruleForm.lockids;
      },
            //批量删除
      batchDeleteBook: function () {
        var ids = this.sels.map(item => item.authid);
        console.log(ids)
        this.$confirm('确认删除选中记录吗？', '提示', {
          type: 'warning'
        }).then(() => {
          this.listLoading = true;
        //NProgress.start();
        let para = ids;
        console.log(para)
        deleteAuthList(para).then((res) => {
          console.log(res);
        this.listLoading = false;
        //NProgress.done();
        this.$message({
          message: res.msg
        });
        this.getAuthLists();
      });
      }).catch(() => {

        });
      },


      //查询任务类型
      findType() {
      let para = {
      type: 'authtype'
     };
        FindType(para).then((res) => {
        this.authtype = res.data;
      })
     }
    },
    mounted() {
      this.findType();
      this.getAuthLists();
      this.getSites();
      this.companyTree();
      this.getKeys();
//      this.getRegionTree();
//      this.getRouteTree();
      this.groupTree();
      this.groupList();
    }
  }


//  switch(o){
//    case '1':
//      return o ="巡视";
//      break;
//    case '2':
//      return o ="操作";
//      break;
//    case '3':
//      return  o ="处缺";
//      break;
//    case '4':
//      return o ="检修";
//      break;
//  }


</script>

<style lang="scss" >
  .warp {
    height: 100%;
    div {
    .warp-main {
      padding: 0 24px;
        &.edit {
          .el-steps {
            .el-step {
              margin-right: 0px;
              /*width: 200px;*/
              height: 50px;
              /*vertical-align: middle;*/
              padding: 50px 0;
              .el-step__head {
                display: inline-block;
                float: left;
                margin: 11px 5px 11px 0;
                &.is-finish {
                  background-color: #ff9900;
                  border-color: #ff9900;
                }
              }

              .el-step__main {
                float: left;
                .el-step__title {
                  &.is-finish {
                    color: #ff9900;
                  }
                }
                .el-step__description {
                  &.is-finish {
                    color: #323232;
                  }
                }
              }
                &.el-step:nth-child(0) {
                  width: 300px;
                }
              }

            .el-step-icon {
              display: inline-block;
              line-height: 50px;
              width: 80px;
              margin: 45px 0;
              text-align: center;
              color: #d4dce5;
              .iconfont {
                font-size: 30px;
              }
            }
          }
          .step {
            .tab {
              /*float: left;*/
              width: 450px;
              overflow: hidden;
              display: inline-block;
              .el-form-item{
               .el-input{
                 width: 250px;
                 float: left;
                 margin-right: 10px;
               }
                .el-button {
                  width:60px;
                  float: right;
                   margin-top: 0px;
                }
              }
              .el-title, .radio {
                font-size: 14px;
                font-weight: bold;
                box-sizing: border-box;
                width: 450px;
                display: block;
                border: 1px solid #dfe9ec;
                border-bottom: none;
                background-color: #eef3f6;
                height: 40px;
                line-height: 40px;
                padding-left: 20px;
              }
              .el-title{
               border-bottom:1px solid #d1e0e5;
                .el-form-item__content{
                  .el-input{
                    width:150px;
                    .el-input__inner{
                      height:30px;
                    }
                  }
                  .el-button-select{
                    float:inherit;
                    height:30px;
                    padding:5px 10px;
                  }
                }
              }
              .el-table {
                width: 450px;
                display: inline-block;
                .el-table__body-wrapper {
                  height: 250px;
                  overflow: auto;
                  .el-table__body{
                    width:450px;
                    .el-table__row{
                      width: 450px;
                      .cell{
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
                        .el-radio{
                          .el-radio__label{
                            display: none;}
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
              .grid-content {
                height: 285px;
                overflow: auto;
                border: 1px solid #d1e0e5;
                border-top: none;
                .tree {
                  .el-tree {
                    border-top: none;
                    border: none;
                    .el-tree-node {
                    .el-tree-node__content {
                    /*height:24px;*/
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

                          .el-tree-node__expand-icon {
                            background: none;
                          }

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
                        .el-transfer {
                          .el-transfer-panel {
                            width: 250px;
                            .el-transfer-panel__header {
                              height:40px;
                              line-height: 40px;
                              font-weight: bold;
                              background-color: #eef3f6;
                            }
                            .el-transfer-panel__body {
                              .el-checkbox-group {
                                .el-checkbox {
                                  width: 40%;
                                  float: left;
                                }
                              }
                            }
                              .el-transfer-panel__footer {
                                overflow: hidden;
                              }
                            }
                            .el-transfer__buttons {
                              .el-button {
                                background-color: #fff;
                                color: #32b5cb;
                                border-color: #32b5cb;
                                .el-icon-arrow-left:before {
                                  /*content:'  ';*/
                                }
                                .el-icon-arrow-left {
                                  /*background:url("../../assets/icon/left.png");*/
                                }
                              }
                            }
                          }
                        }
                        .el-form-item {
                          clear: both;
                          /*margin-bottom:0px;*/
                          line-height:36px;
                          .el-button {
                            margin-top: 50px;
                          }
                        }
                      }
                    }
                  .title {
                    border-bottom: 1px solid #dceaea;
                    padding: 25px 0;
                    font-size: 18px;
                  }

                  .el-steps {
                    border-bottom: 1px solid #dceaea;

                  /*height: 130px;*/
                    .el-step {
                      .el-step__head {
                        .el-step__line {
                          display: none;
                        }
                        .el-step__icon{
                          margin-left:0;
                        }
                      }
                    }
                  }
                  .demo-ruleForm {
                    padding: 30px 0;
                    /*width:1000px;*/
                    /*overflow:auto;*/
                      .el-form-item {
                      .el-cascader-menus {
                        .el-cascader-menu {
                          width: 220px;
                        }
                      }
                      .el-form-item__label {
                      }
                      .el-form-item__label:before {
                      }
                      .el-form-item__content {
                        vertical-align:middle;
                        .el-form-item {
                          float: left;
                          margin-right: 10px;

                          .el-input {
                            width: 220px;
                            /*float: left;*/
                            margin-right: 10px;
                          }
                          .el-button {
                            width: 220px;
                          }
                        }
                      }
                    }
                  }
                  .el-cascader-menu {
                    width: 218px;
                  }
                  .demo-table-expand label {
                    font-weight: bold;
                  }
                }
              }
              .warp-main {
                padding: 0px;
                position: relative;
                overflow: auto;
                height: calc(100% - 56px);
                .el-row {
                  height: 100%;
                  .demo-table-expand label {
                    font-weight: bold;
                  }
                  .toolbar {
                    padding: 8px 20px;
                    border: 1px solid #dceaea;
                  }
                  .aside {
                    position: relative;
                    height: 100%;
                    border-right: 1px solid #dceaea;
                    .tree {
                      .el-tree {
                        border: none;
                        .el-tree-node {
                          .el-tree-node__content {
                            .el-tree-node__expand-icon {
                              border: none;
                              width: 13px;
                              height: 13px;
                              transform: rotate(0deg);
                              /*background: url(../../assets/icon/+.png);*/
                              /*&.expanded {*/
                                /*background: url(../../assets/icon/-.png);*/
                              /*}*/
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
                                }
                              }

                            }
                          }

                        }

                      }
                    }
                  }
                  .right {
                    padding: 0 24px;
                    .grid-content {
                      .el-form{
                        .el-form-item{
                          margin-right:0px;
                        }
                      }
                      .el-table {
                        .el-table__header-wrapper {
                          table {
                            thead {
                              tr {
                                th {
                                  text-align: center;
                                }
                              }
                            }
                          }
                        }
                        .el-table__body-wrapper {
                          table {
                            tbody {
                              tr {
                                text-align: center;
                                td {
                                  .edit {
                                    margin-right: 6px;
                                  }
                                  .edit:hover {
                                    color: #32b5cb;
                                  }
                                  .delete:hover {
                                    color: #ff6d5b;
                                  }
                                  .iconfont {
                                    cursor: pointer;
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

  .el-cascader-menu {
    width: 218px;
  }

</style>



