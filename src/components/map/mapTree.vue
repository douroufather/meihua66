<template>

  <el-row class="warp" style="position:absolute;">
    <el-col :span="24" class="warp-breadcrum">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }"><b>当前位置：首页</b></el-breadcrumb-item>
      </el-breadcrumb>
    </el-col>

    <el-col :span="24" class="warp-main" id="warp-main" >
      <!--工具条-->
      <!--添加/编辑-->
      <div class="el-row" id="el-row">
        <div  class="aside" id="aside">
          <el-form ref="ruleForm" label-width="100px" class="demo-ruleForm ">

            <h5>按区域搜索</h5>
            <div class="rows">
              <label class="lab">国</label>
              <el-select v-model="nationname" placeholder="请选择国家" @change="prochange">
                <el-option
                  v-for="item in nations"
                  :key="item.value"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
            </div>
            <div class="rows">
              <label class="lab">省</label>
              <el-select v-model="proname" placeholder="请选择省" @change="citychange">
                <el-option
                  v-for="item in parents"
                  :key="item.value"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
            </div>
            <div class="rows">
              <label class="lab">市</label>
              <el-select v-model="cityname" placeholder="请选择市" @change="areaAchange">
                <el-option
                  v-for="item in citys"
                  :key="item.value"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
            </div>
            <div class="rows">
              <label class="lab">区</label>
              <el-select v-model="arename" placeholder="请选择区" @change="areaBchange">
                <el-option
                  v-for="item in ares"
                  :key="item.value"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
            </div>
            <div class="rows" v-show="showC">
              <label class="lab">乡</label>
              <el-select v-model="countryname" placeholder="请选择乡" @change="areaCchange" >
                <el-option
                  v-for="item in countrys"
                  :key="item.value"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
            </div>
            <div class="rows" v-show="showD">
              <label class="lab">村</label>
              <el-select v-model="villagename"  placeholder="请选择"@change="areaDchange">
                <el-option
                  v-for="item in villages"
                  :key="item.value"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
            </div>
            <h5>按线路搜索</h5>
            <div class="rows">
              <label class="lab">总线路</label>
              <el-select v-model="routeA" placeholder="请选择总线路" @change="routeAchange">
                <el-option
                  v-for="routeA in routeAs"
                  :label="routeA.routename" :key="routeA.value" :value="routeA.routeid">
                </el-option>
              </el-select>
            </div>
            <div class="rows">
              <label class="lab">支线A</label>
              <el-select v-model="routeB" placeholder="请选择支线路" @change="routeBchange">
                <el-option
                  v-for="routeB in routeBs" :label="routeB.routename":key="routeB.value" :value="routeB.routeid">
                </el-option>
              </el-select>
            </div>
            <div class="rows">
              <label class="lab">支线B</label>
              <el-select v-model="routeC" placeholder="请选择支线路">
                <el-option
                  v-for="routeC in routeCs" :label="routeC.routename":key="routeC.value" :value="routeC.routeid">
                </el-option>
              </el-select>
            </div>





            <el-form-item class="search">
              <el-button type="primary" @click="check" >查询</el-button>

            </el-form-item>

          </el-form>


        </div>
        <div  class="right" style="padding: 0;" id="right">
          <MapView :m="lockData"></MapView>
        </div>
        <div class="line" id="line"></div>
      </div>


    </el-col>
  </el-row>
</template>

<script>

</script>
<script>
import MapView from './Map.vue'
import {getChildrenRegion,QueryRouteList,queryLockList} from '../../api/api';

function $(id) {
  return document.getElementById(id)
}
export default {

  data () {

    return {

      nationname:'',
      proname:'',
      cityname:'',
      arename:'',
      countryname:'',
      villagename:'',
      nations:{},
      parents:{},
      citys:{},
      ares:{},
      countrys:{},
      villages:{},
      showC:false,
      showD:false,
      routeA:'',
      routeB:'',
      routeC:'',
      routeAs:{},
      routeBs:{},
      routeCs:{},
      lockData:[],
      treedata:[],
      regionid:'',
      routeid:'',
      defaultProps: {
        children: 'parentid',
        label: 'name'
      },
    }
  },
  methods: {

    //可拖动
    resize:function() {
    var oBox = $("el-row"), oTop = $("aside"), oBottom = $("right"), oLine = $("line");
    oLine.onmousedown = function(e) {
      var disX = (e || event).clientX;
      oLine.left = oLine.offsetLeft;
      document.onmousemove = function(e) {
        var iT = oLine.left + ((e || event).clientX - disX);
        var e=e||window.event,tarnameb=e.target||e.srcElement;
        var maxT = oBox.clientWight - oLine.offsetWidth;
        oLine.style.margin = 0;
        iT < 0 && (iT = 0);
        iT > maxT && (iT = maxT);
        oLine.style.left = oTop.style.width = iT + 10 + "px" ;
        oBottom.style.width = oBox.clientWidth - iT - 12 + "px";
        //          $("msg").innerText='top.width:'+oLine.style.width+'---bottom.width:'+oBottom.style.width+'---oLine.offsetLeft:'+oLine.offsetLeft+'---disX:'+disX+'---tarnameb:'+tarnameb.tagName;
        return false
      };
      document.onmouseup = function() {
        document.onmousemove = null;
        document.onmouseup = null;
        oLine.releaseCapture && oLine.releaseCapture()
      };
      oLine.setCapture && oLine.setCapture();
      return false
    };
  },

    //查询
    check:function(){
        this.getlockList();
    },
    //获取锁具列表
    getlockList:function(){
      let para = {
//        regionId:this.regionid,
        regionId:330100,
        routeId:this.routeid
      };
      console.log(para);
      queryLockList(para).then((res) => {
        this.lockData=res.data;
      console.log(this.lockData);
    });
    },
    //获取国省市县
    getSites:function(){
      let para = {
        parentid:0
      };
      getChildrenRegion(para).then((res) => {

        this.nations=res.data;
      });
    },
    //省
    prochange:function(id){
      this.routes(id);
      this.regionid=id;
        let para = {
          parentid:id
        };
      console.log(para);
        getChildrenRegion(para).then((res) => {

          this.proname='';
          this.cityname='';
          this.arename='';
          this.countryname='';
          this.villagename='';
          this.parents = res.data;
        });
    },
    //市
    citychange:function(id){
      this.regionid=id;
      this.routes(id);
        let para = {
          parentid:id
        };
        console.log(para);
        getChildrenRegion(para).then((res) => {
          this.cityname='';
          this.arename='';
          this.countryname='';
          this.villagename='';
          this.citys = res.data;
        });


    },
    //区
    areaAchange:function(id){
      this.regionid=id;
      this.routes(id);
        let para = {
          parentid:id
        };
      console.log(para);
        getChildrenRegion(para).then((res) => {
          this.arename='';
          this.countryname='';
          this.villagename='';
          console.log(res.data);
          this.ares = res.data;
//          if(this.areaB&&this.areaB.length>1){
//            this.showB=true;
//          }else if(this.ruleForm.country==''){
//            this.showB=false;
//          }
        });

    },
    //乡
    areaBchange:function(id){
      this.regionid=id;
     this.routes(id);
        let para = {
          parentid:id
        };
      console.log(para);
        getChildrenRegion(para).then((res) => {
          this.countryname='';
          this.villagename='';
          console.log(res.data);
          this.countrys = res.data;
          if(this.countrys&&this.countrys.length>1){
            this.showC=true;
          }
        });
    },
    //村
    areaCchange:function(id){
      this.regionid=id;
     this.routes(id);
      let para = {
        parentid:id
      };
      console.log(para);
      getChildrenRegion(para).then((res) => {
        this.villagename='';
        console.log(res.data);
        this.villages = res.data;
          if(this.villages&&this.villages.length>1){
            this.showD=true;
          }
      });
    },
    areaDchange:function(id){
      this.routes(id);
    },

    //线路
    //上级线路
    routes:function(id){
        let para = {
          regionid:id
        };
        QueryRouteList(para).then((res) => {
          this.routeA='';
          this.routeB='';
          this.routeC='';
          this.routeAs = res.data;
          console.log(res.data)
        });
    },
    routeAchange:function(id){
      this.routeid=id;
        let para = {
          prouteid:id
        };
        console.log(id)
        QueryRouteList(para).then((res) => {
          this.routeB='';
          this.routeC='';
          this.routeBs = res.data;
          console.log(res.data)
        });
    },
    routeBchange:function(id){
      this.routeid=id;
        let para = {
          prouteid:id
        };
        QueryRouteList(para).then((res) => {
          this.routeCs = res.data;
          console.log(res.data)
        });
    },



    //el-tree
    handleNodeClick(data) {
      this.parentid = data.id;
      //console.log(data.id);
    },
    getCheckedKeys() {
      console.log(this.$refs.tree.getCheckedKeys());
    },
    loadNode(node, resolve) {
      if (node.level === 0) {
        return resolve(this.treedata);
      }
      let para = {
        parentid:node.data.id
      };
      getChildrenRegion(para).then((res) => {
        this.citys=res.data;

      });

      setTimeout(() => {
        var data;
        data = this.citys;
        resolve(data);
        //console.log(data)
      }, 500);
    },
  },
  components:{
    MapView
  },
  mounted() {
      this.getlockList();
       this.getSites();
       this.resize();
  }
}



</script>

<style lang="scss" scoped>
  .warp{
    height: 100%;
    width:100%;
    div{
      .warp-main{
        padding: 0 24px;
        .title{
          border-bottom: 1px solid #dceaea;
          padding: 25px 0;
          font-size: 18px;
        }
        .demo-ruleForm{
          /*padding:10px !important;*/
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
        position:relative;
        height:100%;
        width:100%;
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
          width:300px;
          border-right: 1px solid #dceaea;
          float:left;
          overflow:auto;
          .el-form{
          padding:10px;
            .rows{
              margin: 10px 0;
              .lab{
                font-size: 14px;
                display: inline-block;
                width:50px;
                text-align: right;
              }

            }
            .search{
              margin-left:-50px;
              .el-form-item__content{
                margin-left:50px !important;

              }
            }
          }


        }
        .right{
          position: relative;
          float:right;
          padding: 0 24px;
          height:100%;
          width:calc(100% - 304px);
          overflow:hidden;
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
        /*.line{position:absolute;top:0;left:300px;height:100%;width:4px;overflow:hidden;background:#DDDDDD;cursor:url(../../assets/cursor.png) 10 50,auto;}*/
        .line{position:absolute;top:0;left:300px;height:100%;width:2px;overflow:hidden;background:#DDDDDD;cursor:e-resize;}
      }


    }
  }

  .el-cascader-menu{
    width:218px;
  }

</style>
