<template>
  <el-row class="warp" >
    <el-col :span="24" class="warp-breadcrum">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }"><b class="title">当前位置：首页</b></el-breadcrumb-item>
      </el-breadcrumb>
    </el-col>

    <el-col :span="24" class="warp-main" >

      <section class="chart-container">
        <div class="btn">
          <el-button type="text">位置信息</el-button>
          <el-button type="text">切换到列表信息</el-button>
        </div>
        <div class="tree-menu">
          <div class="btn">
             <el-button type="text" >刷新</el-button>
            |<el-button type="text">展开全部</el-button>
          </div>
          <items  :model='model' v-for='model in data'></items>
        </div>
      </section>

    </el-col>
  </el-row>
</template>
<style scoped lang="scss">
  .warp{
    .warp-breadcrum{
      .title{
        height:54px;
       }
      }
    .warp-main{
      .chart-container{
        width:258px;
        height:100%;
        border-right:1px solid red;
        .btn{
          padding:14px;
          .el-button{
            padding:0 10px;
          }
        }
        .tree-menu{
          width:100%;
          height:500px;
          overflow:auto;
          background:#fff;
          .btn{
            box-sizing:border-box;
            .el-button{
              box-sizing:border-box;
              padding:0 10px;
            }
          }
        }

      }
    }
  }


</style>

<script>
 var data = [{
                "id": "1",
                "data": {
                    "menuName": "项目管理",
                    "menuCode": "",
                },
                "childTreeNode": [{
                    "data": {
                        "menuName": "项目",
                        "menuCode": "BusProject",
                    },
                    "childTreeNode": []
                }, {
                    "data": {
                        "menuName": "我的任务",
                        "menuCode": "BusProject",
                    },
                    "childTreeNode": []
                }, {
                    "data": {
                        "menuName": "人员周报",
                        "menuCode": "BusProject",
                    },
                    "childTreeNode": []
                }]
            }, {
                "id": "2",
                "data": {
                    "menuName": "数据统计",
                    "menuCode": "BusClock",
                },
                "childTreeNode": []
            }, {
                "id": "3",
                "data": {
                    "menuName": "人事管理",
                    "menuCode": "",
                },
                "childTreeNode": []
            }, {
                "id": "4",
                "data": {
                    "menuName": "基础管理",
                    "menuCode": "",
                },
                "childTreeNode": []
            }]
 export default {
    data(){
      return{
        data:[]
      }
    },
    components: {

    }
  }
</script>
