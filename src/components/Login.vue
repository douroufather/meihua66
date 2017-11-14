<template>
  <div>
    <div  class="login">
      <img src="../assets/images/logo.png" style="margin:80px auto 50px;" class="logo">
      <div class="sys">
          <div class="c">梅花无源锁后台管理系统</div>
          <div class="e">Plum Passive Lock Background Management System</div>
      </div>
    </div>
    <el-form ref="AccountFrom" :model="account" :rules="rules" label-position="left" auto-complete="off" label-width="0px"class="demo-ruleForm login-container">

      <el-form-item prop="username" >
        <i id="user" class="icon"></i>
        <el-input type="text" v-model="account.username"  placeholder="用户名称" class="user"></el-input>
      </el-form-item>
      <el-form-item prop="pwd">
        <i id="pwd" class="icon"></i>
        <el-input type="password" v-model="account.pwd"   placeholder="密码" class="pwd"></el-input>
      </el-form-item>
      <el-checkbox v-model="checked" checked class="remember">记住密码</el-checkbox>
      <el-form-item style="width:100%;">
        <el-button type="primary" style="width:100%;" @click.native.prevent="handleLogin" :loading="logining">登录</el-button>
      </el-form-item>
    </el-form>
    <div class="copy">
      Copyright © 2006-2017 梅花智能锁
    </div>
  </div>

</template>

<script>
  import {requestLogin} from '../api/api';
  //import NProgress from 'nprogress'
  export default {
    data() {
      return {
        logining: false,
        account: {
          username: 'admin',
          pwd: '123456'
        },
        rules: {
          username: [
            {required: true, message: '请输入用户名称', trigger: 'blur'},
            //{ validator: validaePass }
          ],
          pwd: [
            {required: true, message: '请输入密码', trigger: 'blur'},
            //{ validator: validaePass2 }
          ]
        },
        checked: true
      };
    },
    methods: {
      handleLogin() {
        this.$refs.AccountFrom.validate((valid) => {
          if (valid) {

            this.logining = true;
            //NProgress.start();
            var loginParams = { account: this.account.username, password: this.account.pwd };
            requestLogin(loginParams).then(data => {
              this.logining = false;
              //NProgress.done();
             // let { msg, code, user } = data;
              if (data.code !== 200) {
                this.$message({
                  message: data.msg,
                  type: 'error'
                });
              } else {
                sessionStorage.setItem('access-user', JSON.stringify(data.data));
                this.$router.push({ path: '/' });
              }
            });

          } else {
            console.log('error submit!!');
            return false;
          }
        });
      }
    }
  }

</script>
<style>
  body{
    background: #fff;

  }
</style>
<style lang="scss" >
  .login{
    font-family: '微软雅黑';
    box-sizing: border-box;
    width:100%;
    min-height:330px;
    text-align:center;
    background: #32b4ca url(../assets/images/loginbg.jpg) center center;
    background-repeat: no-repeat;
    .c{
      font-size: 48px;
      color: #fff;
      text-shadow: 5px 2px 6px #085a68
    }
    .e{
      font-size: 22px;
      color:#0f7384;
    }

  }

  .copy{
    font-size: 12px;
    text-align: center;
    position: absolute;
    bottom: 30px;
    height: 20px;
    width: 100%;
    color: #94a0ad;
  }
  .login-container {
    -webkit-border-radius: 5px;
    border-radius: 5px;
    -moz-border-radius: 5px;
    background-clip: padding-box;
    margin: 46px auto;
    width: 290px;
    padding: 35px 35px 15px 35px;
    background: #fff;
    .el-form-item{
      .el-form-item__content{
        .icon{
          display: inline-block;
          height: 30px;
          width: 30px;
          position: absolute;

        }
        #user{
          background:url(../assets/icon/user.png) no-repeat  10px 8px;
          z-index:1
        }
        #pwd{
          background:url(../assets/icon/pwd.png) no-repeat 10px 8px;
          z-index:1
        }
        .user{
          .el-input__inner{
            padding-left: 36px;
            z-index:2;
            /*background: url(../assets/icon/user.png) no-repeat 10px 8px;*/
          }

        }
        .pwd{
          .el-input__inner{
            padding-left: 36px;
            /*background: url(../assets/icon/pwd.png) no-repeat 10px 8px;*/
          }
        }


      }
    }

    .el-checkbox{
      margin-bottom:20px;
      .el-checkbox__label{
         color: #32b5cb;
      }
    }

    background: -ms-linear-gradient(top, #fff, #6495ed);        /* IE 10 */
    background:-moz-linear-gradient(top,#b8c4cb,#f6f6f8);/*火狐*/
    background:-webkit-gradient(linear, 0% 0%, 0% 100%,from(#b8c4cb), to(#f6f6f8));/*谷歌*/
    background: -webkit-gradient(linear, 0% 0%, 0% 100%, from(#fff), to(#6495ed));      /* Safari 4-5, Chrome 1-9*/
    background: -webkit-linear-gradient(top, #fff, #6495ed,#fff);   /*Safari5.1 Chrome 10+*/
    background: -o-linear-gradient(top, #fff, #6495ed);  /*Opera 11.10+*/



  }





  /*去掉Chrome自动填充时，input中的黄色背景  勿删*/
  input:-webkit-autofill, textarea:-webkit-autofill, select:-webkit-autofill {
    -webkit-box-shadow: 0 0 0px 1000px white inset;
    border: 1px solid #CCC!important;
    background-image: inherit;
  }
</style>
