<template>
  <el-row class="container">
    <!--头部-->
    <el-col :span="24" class="topbar-wrap">
      <div class="topbar-logo ">
        <a href="/"><img src="../assets/images/logo.png" style="width:178px;margin-top: 18px;margin-left: 20px; line-height:72px;"></a>
      </div>

      <div class="topbar-account topbar-btn">
        <el-dropdown trigger="click">
          <span class="el-dropdown-link userinfo-inner"><i class="iconfont icon-user"></i> {{sysUserName}}  <i class="iconfont icon-down"></i></span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item><router-link to="/user/profile">个人信息</router-link></el-dropdown-item>
            <el-dropdown-item><router-link :to="'/user/changepwd'">修改密码</router-link></el-dropdown-item>
            <el-dropdown-item divided @click.native="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </el-col>

    <!--中间-->
    <el-col :span="24" class="main">
      <!--左侧导航-->
      <aside >

        <!--菜单展开时的显示情况-->
        <el-menu  :default-active="$route.path" class="el-menu-vertical-demo"
                  unique-opened router >
          <template v-for="(item,index) in meuns" v-if="!item.hidden">
            <el-submenu :index="index+''" >
              <template slot="title"><i :class="item.icon"></i>{{item.name}}</template>
              <el-menu-item v-for="child in item.children" :index="child.url" :key="child.url" v-if="!child.hidden">{{child.name}}</el-menu-item>
            </el-submenu>
          </template>
        </el-menu>




      </aside>

      <!--右侧内容区-->
      <section class="content-container">
        <div class="grid-content bg-purple-light">
          <el-col :span="24" class="content-wrapper">
            <transition name="fade" mode="out-in">
              <router-view></router-view>
            </transition>
          </el-col>
        </div>
      </section>
    </el-col>

  </el-row>
</template>

<script>
  import { bus } from '../bus.js'
  import {reqGetNav} from '../api/api';
  export default {
    name: 'home',
    created(){
      bus.$on('setUserName', (text) => {
        this.sysUserName = text;
      });
      reqGetNav().then(data => {
         // console.log(data)
          this.meuns=data.data;
       // console.log(data.data);
      });
    },
    data () {
      return {
        sysUserName: '',
        sysUserAvatar: '',
        meuns:[],

      }
    },
    methods: {

      handleOpen() {
        //console.log('handleopen');
      },

      //折叠导航栏
      collapse: function () {
        this.collapsed = !this.collapsed;
      },
      showMenu(i, status){
        this.$refs.menuCollapsed.getElementsByClassName('submenu-hook-' + i)[0].style.display = status ? 'block' : 'none';
      },
      logout(){
        var _this = this;
        this.$confirm('确认退出吗?', '提示', {
          //type: 'warning'
        }).then(() => {
          sessionStorage.removeItem('access-user');
          _this.$router.push('/login');
        }).catch(() => {

        });
      }
    },
    mounted() {
      var user = sessionStorage.getItem('access-user');
      if (user) {
        user = JSON.parse(user);
        this.sysUserName = user.name || '';
      }
    }
  }


</script>
<style>
  .el-menu-item, .el-submenu__title {
    color: #8d93a1;
  }
  .el-submenu__title:hover {
    background-color: #baeef8;
  }
  .el-submenu .el-menu-item {
    background-color: #f3f7f8
  }
  .el-submenu .el-menu-item:hover {
    background-color:#baeef8;
  }
  .el-submenu .el-menu-item.is-active, .el-menu-item.is-active,
  .el-submenu .el-menu-item.is-active:hover, .el-menu-item.is-active:hover {
    color: #30b8d2;
  }
  .el-menu .iconfont{
    vertical-align: baseline;
    margin-right: 6px;
  }

  .warp-breadcrum{
    padding: 21px 0px 21px 24px;
    border-bottom: 1px solid #efefef;
  }
  .warp-main{
    height:100%;
    padding:0 24px;
    overflow:auto;
    background:#fff;

  }
</style>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .container {
    position: absolute;
    top: 0px;
    bottom: 0px;
    width: 100%;

    .topbar-wrap {
      height: 72px;
      line-height: 72px;
      background: #32b4ca;
      padding: 0px;

      .topbar-btn {
        color: #fff;
      }
      .topbar-logo {
        float: left;
        text-align: center;
        width: 49px;
        line-height: 26px;
      }
      .topbar-title {
        float: left;
        text-align: center;
        width: 129px;
        border-right: 1px solid #000;
      }
      .topbar-account {
        float: right;
        padding-right: 12px;
      }
      .userinfo-inner{
        cursor: pointer;
        color: #fff;
        padding-left: 10px;
      }
    }
    .main {
      display: flex;
      position: absolute;
      top: 72px;
      bottom: 0px;
      background:#f3f7f8;
      overflow: hidden;
    }
    /*左侧导航宽度*/
    aside {
      flex: 0 0 230px;
      width: 230px;
      border-right: 1px solid #dceaea;
      .el-menu {
        height: 100%;
        border-radius: 0px;
        color:#000;
        background-color: #f3f7f8;
      }
      .collapsed {
        width: 50px;
        .submenu {
          position: absolute;
          top: 0px;
          left: 50px;
          z-index: 9999;
          height: auto;
          display: none;
        }
      }
    }
    .menu-collapsed {
      flex: 0 0 50px;
      width: 50px;
    }
     /*左侧导航宽度*/
    .menu-expanded {
      flex: 0 0 230px;
      width: 230px;
    }
    .menu-toggle {
      background: #4A5064;
      text-align: center;
      color: white;
      height: 26px;
      line-height: 30px;
    }
    .content-container {
      width:calc(100% - 230px);
      background: #fff;
      flex: 1;
      .grid-content{
          height:100%;
        /*右侧内容宽度*/
        .content-wrapper {
          background-color: #f3f7f8;
          box-sizing: border-box;
          border-right:#f3f7f8;
          height:100%;
        }
      }

    }
  }
</style>
