<template>
  <el-row class="warp" style="position: relative;">
    <el-col :span="24" class="warp-breadcrum">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }"><b>当前位置：首页</b></el-breadcrumb-item>
        <el-breadcrumb-item>日志查看</el-breadcrumb-item>
        <el-breadcrumb-item >设备日志列表</el-breadcrumb-item>

      </el-breadcrumb>
    </el-col>

    <el-col :span="24" class="warp-main">
      <!--工具条-->
      <el-row >

        <el-col :span="24" class="right" style="overflow: auto">
          <div  class="title" >
            设备日志列表
          </div>
          <div  class="grid-content bg-purple-light" style="padding-top:54px;">

            <el-form :inline="true" :model="filters" style="white-space:nowrap">
              <label style="font-size: 14px;">操作时间：</label>
              <el-date-picker style="width: 180px;"
                              v-model="filters.beginTime"
                              type="datetime"
                              placeholder="选择开始时间"
                              :picker-options="pickerOptionsBegin">
              </el-date-picker>
              - <el-date-picker style="width: 180px;"
                                v-model="filters.endTime"
                                type="datetime"
                                placeholder="选择结束时间"
                                :picker-options="pickerOptionsEnd">
            </el-date-picker>
              <el-form-item style="margin-right: 0px;">
                操作人员：<el-input v-model="filters.username" placeholder="操作人员" style="width:80px;"></el-input>
              </el-form-item>
              <el-form-item style="margin-right: 0px;">
                锁具名称：<el-input v-model="filters.lockname" placeholder="锁具名称" style="width:80px;"></el-input>
              </el-form-item>

              <label style="font-size: 14px;">操作类型：</label>

              <el-select v-model="filters.logType" placeholder="不限" style="width:80px;">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>

              </el-select>

              <el-form-item >
                <el-button  @click="getLogs"><i class="iconfont">&#xe60e;</i>快速查找</el-button>
              </el-form-item>

            </el-form>

            <!--列表-->
            <el-table :data="syslog" highlight-current-row  @selection-change="selsChange" style="width: 100%;">

              <el-table-column prop="keyname" label="钥匙名称" min-width="100"></el-table-column>
              <el-table-column prop="devicelogtime" label="操作时间"  width="200"></el-table-column>
              <el-table-column prop="lockname" label="锁具名称" min-width="120"></el-table-column>
              <el-table-column prop="keyid" label="钥匙ID" width="150"></el-table-column>
              <el-table-column prop="username" label="员工名称" width="150"></el-table-column>
              <el-table-column prop="groupname" label="组织名称" width="150"></el-table-column>
              <el-table-column prop="logresult" label="日志结果" width="150"></el-table-column>
              <el-table-column prop="deviceuploadtime" label="上传时间" width="200"></el-table-column>
            </el-table>

            <!--工具条-->
            <el-col :span="24"  class="toolbar" >
              <el-button  @click="exportDevice"  class="output"><i class="iconfont" >&#xe60c;</i>导出数据</el-button>
              <el-pagination class="page" style="float:right;"
                             @size-change="handleSizeChange"
                             @current-change="handleCurrentChange"
                             :page-size="10"
                             layout="prev, pager, next, jumper"
                             :total="total">
              </el-pagination>
            </el-col>
          </div>
        </el-col>
      </el-row>
    </el-col>

  </el-row>
</template>
<!--suppress JSAnnotator -->
<script>

  import util from '../../common/util'
  import {exportDevicelog,DeviceLogList,getGroupTree,getCompanyList,getQueryregion,AddCompanyList,reqDeleteCompany,getCompanyTree,UpdateCompany,QueryCompany,AddUser,UpdateUser,DeleteUser,DeleteUserList} from '../../api/api';

  export default{
    data(){
      const date1 = new Date();
      date1.setTime(date1.getTime() - 3600 * 1000 * 24*30);
      const date2 = new Date();
      return {

        filters: {
//          id:'',
//          account:'',
          logType:'',
          lockname:'',
          username: '',
          keyname:'',
          beginTime:date1,
          endTime:date2
        },

        /*状态下拉框*/
        options: [{
          value: '1',
          label: '启动'
        },{
          value: '0',
          label: '删除'
        }],
        pickerOptionsBegin:{
          shortcuts: [{
            text: '今天',
            onClick(picker) {
              picker.$emit('pick', new Date());
            }
          }, {
            text: '昨天',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit('pick', date);
            }
          }, {
            text: '一周前',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', date);
            }
          },{
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
        pickerOptionsEnd:{
          shortcuts: [{
            text: '今天',
            onClick(picker) {
              picker.$emit('pick', new Date());
            }
          }, {
            text: '昨天',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit('pick', date);
            }
          }, {
            text: '一周前',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', date);
            }
          },{
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
        total: 0,
        page: 1,
        value:'',
        syslog:[],
       listLoading: false,
        sels: [], //列表选中列

      }
    },

    methods: {
      //刷新
      winReload:function(cond){
        window.location.reload();
      },
      //下拉框
      handleChange(value) {
        console.log(value);
      },
      handleSizeChange(val) {
        console.log('每页 ${val} 条');
      },
      handleCurrentChange(val) {
        this.page = val;
        this.getLogs();
        console.log('当前页: ${val}');
      },



      //获取用户列表
      getLogs:function(){
        let para = {
          page: this.page,
          limit: 10,
          beginTime:(this.filters.beginTime).getTime(),
          endTime:(this.filters.endTime).getTime(),
          logType:this.filters.logType,
          username:this.filters.username,
          lockname:this.filters.lockname,
          keyname:this.filters.keyname,
        };
        this.listLoading = true;
        DeviceLogList(para).then((res) => {
          this.total = res.pageInfo.total;
          this.syslog = res.data;
          console.log(res.data)
          this.listLoading = false;
        })
      },

      /*导出设备日志列表*/

      exportDevice(){
        let para = {
          beginTime:(this.filters.beginTime).getTime(),
          endTime:(this.filters.endTime).getTime(),
          logType:this.filters.logType,
          username:this.filters.username,
          lockname:this.filters.lockname,
          keyname:this.filters.keyname,
        };
        this.listLoading = true;
        exportDevicelog(para).then((res) => {
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
          const tHeader = ['钥匙名称','操作时间', '锁具名称','钥匙名称','员工名称','组织名称','日志结果','上传时间'];
          const filterVal = ['keyname','devicelogtime', 'lockname','keyid','username','groupname','logresult','deviceuploadtime'];
          const list = this.list;
          const data = this.formatJson(filterVal, list);
          export_json_to_excel(tHeader, data, '设备日志列表.xlsx');
        });
      },
      formatJson(filterVal, jsonData) {
        return jsonData.map(v => filterVal.map(j => v[j]))
      },

      selsChange: function (sels) {
        this.sels = sels;
      }

    },

    mounted() {
      this.getLogs();


    }
  }
</script>

<style lang="scss" scoped>
  .warp{
    height: 100%;
    .warp-main {
      padding: 0px;
      position: relative;
      overflow:auto;
      height: calc(100% - 56px);


      .demo-ruleForm{
        padding: 30px 0;
        .el-form-item{
          .el-form-item__label{}
          /*.el-form-item__label:before{content:'*';color:#f00; margin-right:4px;}*/
          /*.el-form-item__label:before{content:'*';color:#f00; margin-right:4px;}*/
          .el-form-item__content{
            .el-input{
              width:220px;
              float:left;
              margin-right: 10px;
            }
            .el-button{
              width: 220px;
            }

          }
        }



      }

      .demo-table-expand label {
        font-weight: bold;
      }



      .el-row{
        height:100%;
        .demo-table-expand label {
          font-weight: bold;
        }

        /*.toolbar {*/
        /*padding: 8px 20px;*/
        /*border: 1px solid #dceaea;*/
        /*}*/
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
          .grid-content{
            overflow: auto;
            height: 500px;
            .tree{
              width:300px;
              box-sizing:border-box;
              /*padding: 0 14px;*/
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

                          .el-tree-node__children{
                            .el-tree-node{
                              .el-tree-node__content{
                                .el-tree-node__expand-icon{
                                  background: none;
                                }
                                .el-tree-node__label:before{
                                  padding-left:20px;
                                  content:'';

                                  background:url(../../assets/icon/tree_4.png) no-repeat;
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
    .edit-page, .add-page{
      padding: 0 24px;
      .title{
        border-bottom: 1px solid #dceaea;
        padding: 25px 0;
        font-size: 18px;
      }

    }


  }

</style>

