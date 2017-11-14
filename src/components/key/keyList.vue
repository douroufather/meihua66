<template>
  <el-row class="warp" style="position:relative;">
    <div style="width:100%;height:100%;position:relative;right:0px;z-index: 50;" v-show="dialog">
      <el-col :span="24" class="warp-breadcrum">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }"><b>当前位置：首页</b></el-breadcrumb-item>
          <el-breadcrumb-item>用户管理</el-breadcrumb-item>
          <el-breadcrumb-item>新增钥匙信息</el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>

      <el-col :span="24" class="warp-main">

        <div class="title">
          添加/编辑钥匙信息
        </div>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm ">
          <el-form-item label="所属部门" prop="deptid">
            <el-cascader
              placeholder="选择所属部门"
              v-model="companyOptions"
              :options="companydatas"
              :props="comprops"
              filterable
              :show-all-levels="true"
              change-on-select
              @change="handleItemChange">
            </el-cascader>
          </el-form-item>

          <el-form-item label="归属人:" prop="username">
            <el-cascader
              placeholder="选择归属人"
              v-model="userOptions"
              :options="userdatas"
              :props="userprops"
              filterable
              :show-all-levels="true"
              change-on-select
              @change="handleItemChange1">
            </el-cascader>
          </el-form-item>

          <el-form-item label="状态" prop="keystate">
            <el-select  placeholder="状态选择" v-model="ruleForm.keystate" style="width:220px;">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="钥匙名称:"  prop="keyname" >
            <el-input v-model="ruleForm.keyname" ></el-input>
          </el-form-item>

          <el-form-item label="MAC地址:"  >
            <el-input v-model="ruleForm.keymac" ></el-input>
          </el-form-item>

          <el-form-item label="备注:"  >
            <el-input v-model="ruleForm.keynote" ></el-input>
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
        <el-breadcrumb-item>钥匙管理</el-breadcrumb-item>
        <el-breadcrumb-item>钥匙信息管理</el-breadcrumb-item>
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
          <div class="fresh"  ><a @click="winReload"> 刷新</a>&nbsp;|&nbsp;<a  @click="winReloadW">展开全部</a></div>
          <div class="grid-content bg-purple">
            <div class="tree" >
              <!--<el-tree :data="treedata" :props="defaultProps"   @node-click="handleNodeClick"></el-tree>-->
              <el-tree :data="treedata" highlight-current :props="defaultProps"   @node-click="handleNodeClick" :default-expand-all="states" v-if="state2"></el-tree>
            </div>
          </div>
        </el-col>
        <el-col :span="20" class="right">
          <div class="title">
            钥匙列表
            <el-button type="primary" style="float: right;" @click="showAddDialog" ><i class="iconfont" style="margin-right:3px;">&#xe6ff;</i>添加钥匙</el-button>
            <!--<el-button type="primary" @click="showAddDialog">添加按钮</el-button>-->

          </div>
          <div  class="grid-content bg-purple-light" style="padding-top:54px;">

            <el-form :inline="true" :model="filters">
              <el-form-item>
                钥匙名称：<el-input v-model="filters.keyname" placeholder="钥匙名称" style="width:220px;margin-right:10px;"></el-input>
              </el-form-item>

              <el-form-item>
                <el-button  @click="getKeys"><i class="iconfont">&#xe60e;</i>快速查找</el-button>
              </el-form-item>

            </el-form>


            <!--列表-->

            <el-table :data="keylist" highlight-current-row  @selection-change="selsChange" style="width: 100%;">

              <el-table-column type="selection" width="55"></el-table-column>

              <el-table-column prop="keyname" label="钥匙名称" width="150"></el-table-column>
              <el-table-column prop="username" label="归属人" width="150"></el-table-column>
              <el-table-column prop="keymac" label="MAC地址" width="250"></el-table-column>
              <!--<el-table-column prop="keyinitkey" label="初始秘钥" width="120"></el-table-column>-->
              <el-table-column prop="keynote" label="备注" min-width="100"></el-table-column>
              <el-table-column  label="状态" width="80">
                <template scope="scope">
                  {{scope.row.keystate=='1'?'启动':'删除'}}
                </template>
              </el-table-column>

              <el-table-column label="操作" width="150">
                <template scope="scope">
                  <a size="small" @click="showEditDialog(scope.$index,scope.row)" class="edit" ><i class="iconfont">&#xe651;</i></a>
                  <a type="danger" @click="deletekey(scope.$index,scope.row)" class="delete"><i class="iconfont" >&#xe67e;</i></a>
                </template>
              </el-table-column>


            </el-table>


            <!--工具条-->
            <el-col :span="24"  class="toolbar" >
              <el-button type="danger" @click="batchDelete" :disabled="this.sels.length===0"><i class="iconfont">&#xe60d;</i>批量删除</el-button>
              <el-button  @click="exportKey"  class="output"><i class="iconfont">&#xe60c;</i>导出数据</el-button>

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
  import {exportKey,getDeptlist,getDeptTree,getGroupTree,getQueryregion,AddDept,reqDeleteDept,getCompanyTree,getUserList,Updatedept,QueryCompany,getChildrenRegion,getParentRegion,deleteDeptlist,AddKey,UpdateKey,DeleteKey,DeleteKeyList,queryUserList,getKeyList} from '../../api/api';

  export default{
//    created(){
//
//      getGroupTree().then((res) => {
////         console.log(res.data);
//        this.treedata = res.data;
//    })
//
//    },
    data(){
      // 上级公司
      var validatedeptid = (rule, value, callback) => {
        if (value == []) {
          callback(new Error('请选择部门'));
        } else{
          callback();
        }
      }
      var validateusername = (rule, value, callback) => {
        if (value === []) {
          callback(new Error('请选择归属人'));
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
        userprops:{
          children: 'children',
          label:'name',
          value:'id'
        },
        options: [{
          value: '1',
          label: '启动'
        },{
          value: '0',
          label: '禁用'
        }],
        ruleForm: {
//          group:'',
//          groups:'',
//          companyids:[],
          keyid:'',
          userids:[],
          keyname:'',
          keystate:'1' ,
          keymac:'',
          userid:'',
          deptid:'',
          deptids:'',
          keynote:'',
          username:''
        },
        rules: {
          deptid: [
            {required: true, validator: validatedeptid, trigger: 'blur' },
          ],
          keystate: [
            {  required: true, message: '', trigger: 'blur' }
          ],
          keyname: [
            {  required: true, message: '请输入钥匙名称', trigger: 'blur' }
          ],
          username: [
            {  required: true, validator: validateusername, trigger: 'blur' }
          ]

        },
        defaultProps: {
          children: 'children',
          label: 'fullname'
        },
        filters: {
          fullname: '',
          keyname:''
        },
        dialog:false,
        treedata:[],
        companyids:['0'],
        companydatas:[],
        userdatas:[],
        deptId:1,
        keyname:'',
        username:'',
       keystate:'',
        groups:'',
        keyId:'',
        companyOptions:['0'],
        userOptions:[],
        currentPage3:this.page,
        regionid:''||Number,
        keylist: [],
        total: 0,
        pageinfo:{},
        page: 1,
        listLoading: false,
        sels: [], //列表选中列

      }
    },

    simpleData: {
      enable:true, //使用简单数据模式
      idKey: "id",//节点数据中保存唯一标识的属性名称
      pIdKey: "pId",//节点数据中保存其父节点唯一标识的属性名称
      rootPId: "" //用于修正根节点父节点数据 默认值：null
    },
    methods: {
      //刷新
      winReload:function(cond){
//        window.location.reload();
        this. groupTree();
        this.state2 =false;
        this.states=false;
        setTimeout(()=>{
          this.state2 =true

        },1)
        this.deptId = 1;
        this.getKeys();

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
        this. groupTree();


      },

      groupTree:function(){
        getGroupTree().then((res) => {

          this.treedata = res.data;
        })
      },

      handleChange(value) {
        console.log(value);
      },

      //获取上级公司数据
      getcomData:function(){
        getGroupTree().then((res) => {
          // console.log(res.data);
          this.companydatas=res.data;

      })
      },
      //归属人数据
      getUserData:function(id){
//        if (id =)
        let para = {
          deptid:id

        };
        queryUserList(para).then((res) => {
          this.userdatas=res.data;
          console.log(res.data)
      });

      },

//      expandAll:function() {
//          var tree = $.fn.zTree.getZTreeObj('Tree');
//          //获取 zTree 的全部节点数据将节点数据转换为简单 Array 格式
//          var nodes = tree.transformToArray(tree.getNodes());
//          for(var i=0;i<nodes.length;i++){
//            if(nodes[i].level == 0){
//              console.log(nodes[i].name);
//              //根节点展开
//              tree.expandNode(nodes[i],true,true,false)
//            }else{
//              tree.expandNode(nodes[i],false,true,false)
//            }
//          }
//        },



      //添加与编辑
      addSubmit: function () {
        this.$refs.ruleForm.validate((valid) => {
          if (valid) {
            let para = Object.assign({}, this.ruleForm);
            var para='';
            if(this.ruleForm.keyid){
              para = Object.assign({}, this.ruleForm);
              console.log(para);
              UpdateKey(para).then((res) => {
                this.addLoading = false;
                this.$message({
                message: res.msg,
              });
//              this.clearRuleForm();
              this.dialog=false;
              this.getKeys();
            });
            }else{

              this.ruleForm.deptids=JSON.stringify(this.ruleForm.deptids);

              this.ruleForm.userid=this.ruleForm.userids[(this.ruleForm.userids).length-1];
              this.ruleForm.userids=JSON.stringify(this.ruleForm.userids);
//              this.ruleForm.groups=111;
              this.ruleForm.keystate=this.ruleForm.keystate=='启动'?'1':'0';
              para = Object.assign({}, this.ruleForm);
            //  console.log(para);
              AddKey(para).then((res) => {
                this.addLoading = false;
              console.log(res);
              this.$message({
                message: res.msg,
              });
              this.dialog=false;
              this.clearRuleForm();
              this.getcomData();
//              this.getUserData();
              this.getKeys();
            });
            }
            console.log(para);

          }
        });
      },
      //钥匙列表导出
      exportKey(){
        let para = {
          deptId:this.deptId,
          keyName: this.filters.keyname,
          userName: this.userName,
          keyNote: this.keyNote,
          keyState: this.keyState
        };
        this.listLoading = true;
        exportKey(para).then((res) => {
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
        const tHeader = ['钥匙名称', '归属人', 'MAC地址', '状态', '备注'];
        const filterVal = ['keyname', 'username', 'keymac', 'keystate', 'keynote'];
        const list = this.list;
        const data = this.formatJson(filterVal, list);
        export_json_to_excel(tHeader, data, '钥匙列表');
        });
      },
      formatJson(filterVal, jsonData) {
        return jsonData.map(v => filterVal.map(j => v[j]))
      },


      //清除表单数据
      clearRuleForm(){
        this.$refs['ruleForm'].resetFields();
        this.companyOptions=[];
//          this.deptOptions=[],
        this.userOptions=[];
        this.ruleForm.keystate = 1;
        this.ruleForm.keynote='';
        this.ruleForm.keymac='';
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
        this.dialog = false;
        this. clearRuleForm();
      },
      handleSizeChange(val) {
        console.log('每页 ${val} 条');
      },
      handleCurrentChange(val) {
        this.page = val;
        this.getKeys();
        console.log('当前页: ${val}');
      },
      expandAll:function(){

      },
//el-tree
      handleNodeClick(data) {
        console.log(data.id);
        this.deptId = data.id;
        this.getKeys();
      },

      handleItemChange(data){
        this.ruleForm.deptids = data;
        this.ruleForm.deptid=data[data.length-1]
        this.getUserData(this.ruleForm.deptid);
      },
      handleItemChange1(data){
        console.log( data);
        this.ruleForm.userid=data[data.length-1];
        this.ruleForm.userids=data


      },

      //显示编辑界面
      showEditDialog: function (index,row) {
        this.dialog=true;
        this.getcomData();
        this.ruleForm = Object.assign({}, row);
        this.companyOptions = JSON.parse(this.ruleForm.deptids);
        this.getUserData(this.ruleForm.deptid);
        this.userOptions = [this.ruleForm.userid];


      },

      //添加
      showAddDialog: function () {
        this.dialog=true;
        this.ruleForm.keystate = this.ruleForm.keystate =='1'?'启动':'禁用';
      },

      //获取钥匙列表
      getKeys() {
        let para = {
          deptId:this.deptId,
          limit: 10,
          page:this.page,
          keyName: this.filters.keyname,
          userName: this.userName,
          keyNote: this.keyNote,
          keyState: this.keyState

        };
//        console.log(para);
        this.listLoading = true;
        getKeyList(para).then((res) => {
//          this.total = res.data.total;
          console.log(res.data);
        this.keylist = res.data;
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
      deletekey: function (index, row) {
        this.$confirm('确认删除该记录吗?', '提示', {type: 'warning'}).then(() => {
          this.listLoading = true;
        let para = {keyid: row.keyid};
        DeleteKey(para).then((res) => {
          this.listLoading = false;
          this.$message({
            message: res.msg
          });
        this.getKeys();
      });
      }).catch(() => {
        });
      },

      //批量删除
      batchDelete: function () {
        var ids = this.sels.map(item => item.keyid);
        console.log(ids)
        this.$confirm('确认删除选中记录吗？', '提示', {type: 'warning'}).then(() => {
          this.listLoading = true;
          let para = ids;
          console.log(para)
          DeleteKeyList(para).then((res) => {
            console.log(res);
          this.listLoading = false;
          //NProgress.done();
          this.$message({
            message: res.msg,
          });
          this.getKeys();
        });
      }).catch(() => {

        });
      }
    },
    mounted() {
      this.getKeys();
      this.getcomData();
      this. groupTree();
//      this.getUserData();
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

