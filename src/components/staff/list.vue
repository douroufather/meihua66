<template>
  <el-row class="warp">
    <el-col :span="24" class="warp-breadcrum">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }"><b>当前位置：首页</b></el-breadcrumb-item>
        <el-breadcrumb-item>员工管理</el-breadcrumb-item>
        <el-breadcrumb-item>员工信息列表</el-breadcrumb-item>
      </el-breadcrumb>
    </el-col>

    <el-col :span="24" class="warp-main">
      <!--工具条-->

      <el-row>
      <el-col :span="4">
        <div class="grid-content bg-purple">
          <div class="tree" style="height:200px;width:100%;">

            <!--<tree :data="data" :loader="loader" :cbChanged="changed" ></tree>-->

            <el-tree :data="data" show-checkbox :props="defaultProps" @node-click="handleNodeClick"></el-tree>

            <!--<div class="result">-->
              <!--&lt;!&ndash;Selected: {{ checked }}&ndash;&gt;-->
            <!--</div>-->


          </div>
        </div>
      </el-col>
      <el-col :span="20">

        <!--<menubar  :items="rightItems" v-if="rightItems.length > 0"></menubar>-->


        <div  class="grid-content bg-purple-light" style="padding-top:54px;">

        <el-form :inline="true" :model="filters">
          <el-form-item>
            员工编号：<el-input v-model="filters.account" placeholder="员工编号" style="width:220px;margin-right:10px;"></el-input>
          </el-form-item>
          <el-form-item>
            员工姓名：<el-input v-model="filters.name" placeholder="员工姓名" style="width:220px;margin-right:10px;"></el-input>
          </el-form-item>

          <label>状态：</label>
          <el-select v-model="value" placeholder="不限" style="width:120px;margin-right:40px;">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>

          </el-select>

          <el-form-item>
            <el-button  @click="getBooks"><i class="iconfont">&#xe60e;</i>快速查找</el-button>
          </el-form-item>

        </el-form>


          <!--列表-->
        <!--<div>{{books[0]}}</div>-->
          <el-table :data="books" highlight-current-row v-loading="listLoading" @selection-change="selsChange"
                    style="width: 100%;">

            <el-table-column type="selection" width="55"></el-table-column>

            <!--<el-table-column type="index" width="60"></el-table-column>-->
            <!--<el-table-column type="expand"></el-table-column>-->
            <!--<el-table-column prop="name" label="书名" sortable></el-table-column>-->
            <!--<el-table-column prop="author" label="作者" width="100" sortable></el-table-column>-->
            <!--<el-table-column prop="publishAt" label="出版日期" width="150" sortable></el-table-column>-->

            <el-table-column prop="id" label="员工编号" width="100"></el-table-column>
            <el-table-column prop="name" label="姓名" width="80"></el-table-column>
            <el-table-column prop="salt" label="工作部门" width="120"></el-table-column>
            <el-table-column prop="phone" label="phone" width="130"></el-table-column>
            <el-table-column prop="email" label="管理区域" width="150" show-overflow-tooltip></el-table-column>
            <el-table-column prop="mac" label="权限组" width="80"></el-table-column>

            <el-table-column prop="status" label="状态" width="80"></el-table-column>
            <el-table-column label="操作" width="150">
              <template scope="scope">
                <a size="small" @click="showEditDialog(scope.$index,scope.row)" ><i class="iconfont">&#xe651;</i></a>
                <a type="danger" @click="delBook(scope.$index,scope.row)"><i class="iconfont">&#xe67e;</i></a>
              </template>
            </el-table-column>

            <!--<el-table-column label="操作">-->
              <!--<template scope="scope">-->
                <!--<a  class="edit" @click="handleEdit(scope.$index, scope.row)"><i class="iconfont">&#xe651;</i></a>-->
                <!--<a  class="del" type="danger" @click="handleDelete(scope.$index, scope.row)"><i class="iconfont">&#xe67e;</i></a>-->
              <!--</template>-->
            <!--</el-table-column>-->

          </el-table>


        <!--工具条-->
        <el-col :span="24"  class="toolbar" >
          <el-button type="danger" @click="batchDeleteBook" :disabled="this.sels.length===0"><i class="iconfont">&#xe60d;</i>批量删除</el-button>
          <el-button  @click=""><i class="iconfont">&#xe60c;</i>导出数据</el-button>
          <!--<el-pagination class="page" layout="prev, pager, next, jumper" @current-change="handleCurrentChange" :page-size="8" :total="total" :current-page.sync="currentPage3"-->
                         <!--style="float:right;">-->
          <!--</el-pagination>-->

          <el-pagination class="page" style="float:right;"
                         @size-change="handleSizeChange"
                         @current-change="handleCurrentChange"
                         :current-page.sync="currentPage3"
                         :page-sizes="[2, 4, 6, 10]"
                         :page-size="4"
                         layout="prev,sizes, pager, next, jumper"
                         :total="500">
          </el-pagination>
        </el-col>


      </div>
      </el-col>
    </el-row>

          <!--<el-col :span="24" class="toolbar" style="padding-bottom: 0px;"></el-col>-->

        </el-col>
    </el-row>
</template>
<script>

  import util from '../../common/util'
  import {reqGetBookListPage, reqDeleteBook, reqEditBook, reqBatchDeleteBook, reqAddBook,getUserList} from '../../api/api';

  export default{

    methods: {
      handleSizeChange(val) {
        console.log('每页 ${val} 条');
      },
      handleCurrentChange(val) {
        console.log('当前页: ${val}');
      }
    },


    data(){
      return {
        filters: {
          deptid:'',
          name: ''
        },

        /*状态下拉框*/
        options: [{
          value: '选项1',
          label: 'AAAA'
        }, {
          value: '选项2',
          label: 'BBBB'
        }, {
          value: '选项3',
          label: 'CCCC'
        }],
        value: '',

//  el-tree data
        data: [{
          label: '一级 1',
          children: [{
            label: '二级 1-1',
            children: [{
              label: '三级 1-1-1'
            }]
          }]
        }, {
          label: '一级 2',
          children: [{
            label: '二级 2-1',
            children: [{
              label: '三级 2-1-1'
            }]
          }, {
            label: '二级 2-2',
            children: [{
              label: '三级 2-2-1'
            }]
          }]
        }, {
          label: '一级 3',
          children: [{
            label: '二级 3-1',
            children: [{
              label: '三级 3-1-1'
            }]
          }, {
            label: '二级 3-2',
            children: [{
              label: '三级 3-2-1'
            }]
          }]
        }],
        defaultProps: {
          children: 'children',
          label: 'label'
        },





        books: [],
        total: 0,
        page: 1,
//        listLoading: false,
        sels: [], //列表选中列

        //编辑相关数据
        editFormVisible: false,//编辑界面是否显示
        editLoading: false,
        editFormRules: {
          name: [
            {required: true, message: '请输入书名', trigger: 'blur'}
          ],
          author: [
            {required: true, message: '请输入作者', trigger: 'blur'}
          ],
          description: [
            {required: true, message: '请输入简介', trigger: 'blur'}
          ]
        },
        editForm: {
          id: 0,
          name: '',
          author: '',
          publishAt: '',
          description: ''
        },

        //新增相关数据
        addFormVisible: false,//新增界面是否显示
        addLoading: false,
        addFormRules: {
          name: [
            {required: true, message: '请输入书名', trigger: 'blur'}
          ],
          author: [
            {required: true, message: '请输入作者', trigger: 'blur'}
          ],
          description: [
            {required: true, message: '请输入简介', trigger: 'blur'}
          ]
        },
        addForm: {
          name: '',
          author: '',
          publishAt: '',
          description: ''
        }
      }
    },


    methods: {
      handleCurrentChange(val) {
        this.page = val;
        this.getBooks();
      },


//el-tree

      handleNodeClick(data) {
        console.log(data);
      },


      //获取用户列表
      getBooks() {
        let para = {
          page: this.page,
          limit: this.limit,
          account: this.account,
          name: this.name,
          deptid: this.deptid,
          status:1
        };
       this.listLoading = true;
        //NProgress.start();
        getUserList(para).then((res) => {
//          this.total = res.data.total;
          this.books = res.data;
          console.log(res.data);
          this.listLoading = false;
          //NProgress.done();
        })
      },
      selsChange: function (sels) {
        this.sels = sels;
      },
      //删除
      delBook: function (index, row) {
        this.$confirm('确认删除该记录吗?', '提示', {type: 'warning'}).then(() => {
          this.listLoading = true;
          //NProgress.start();
          let para = {id: row.id};
          reqDeleteBook(para).then((res) => {
            this.listLoading = false;
            //NProgress.done();
            this.$message({
              message: '删除成功',
              type: 'success'
            });
            this.getBooks();
          });
        }).catch(() => {
        });
      },
      //显示编辑界面
      showEditDialog: function (index, row) {
        this.editFormVisible = true;
        this.$router.push({ path: '/staff/add' });


        this.editForm = Object.assign({}, row);
      },
      //编辑
      editSubmit: function () {
        this.$refs.editForm.validate((valid) => {

          if (valid) {
            this.$confirm('确认提交吗？', '提示', {}).then(() => {
              this.editLoading = true;
              //NProgress.start();
              let para = Object.assign({}, this.editForm);
              para.publishAt = (!para.publishAt || para.publishAt == '') ? '' : util.formatDate.format(new Date(para.publishAt), 'yyyy-MM-dd');
              reqEditBook(para).then((res) => {
                this.editLoading = false;
                //NProgress.done();
                this.$message({
                  message: '提交成功',
                  type: 'success'
                });
                this.$refs['editForm'].resetFields();
                this.editFormVisible = false;
                this.getBooks();
              });
            });
          }
        });
      },
      showAddDialog: function () {
        this.addFormVisible = true;
        this.addForm = {
          name: '',
          author: '',
          publishAt: '',
          description: ''
        };
        this.$router.push({ path: '/book/category' });
      },
      //新增
      addSubmit: function () {
        this.$refs.addForm.validate((valid) => {
          if (valid) {
            this.addLoading = true;
            //NProgress.start();
            let para = Object.assign({}, this.addForm);
            para.publishAt = (!para.publishAt || para.publishAt == '') ? '' : util.formatDate.format(new Date(para.publishAt), 'yyyy-MM-dd');
            reqAddBook(para).then((res) => {
              this.addLoading = false;
              //NProgress.done();
              this.$message({
                message: '提交成功',
                type: 'success'
              });
              this.$refs['addForm'].resetFields();
              this.addFormVisible = false;
              this.getBooks();
            });
          }
        });
      },
      //批量删除
      batchDeleteBook: function () {
        var ids = this.sels.map(item => item.id).toString();
        this.$confirm('确认删除选中记录吗？', '提示', {
          type: 'warning'
        }).then(() => {
          this.listLoading = true;
          //NProgress.start();
          let para = {ids: ids};
          reqBatchDeleteBook(para).then((res) => {
            this.listLoading = false;
            //NProgress.done();
            this.$message({
              message: '删除成功',
              type: 'success'
            });
            this.getBooks();
          });
        }).catch(() => {

        });
      }
    },
    mounted() {
      this.getBooks();
    }
  }
</script>

<style lang="scss" scoped>
  .demo-table-expand label {
    font-weight: bold;
  }
  .toolbar{
    padding: 8px 20px;
    border:1px solid #dceaea;
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
              /*background:url(../../assets/icon/+.png);*/
              /*&.expanded{*/
                 /*background:url(../../assets/icon/-.png);*/
              /*}*/
          }
        }
      }

    }


  }

</style>
