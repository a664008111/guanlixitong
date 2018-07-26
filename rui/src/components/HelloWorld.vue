<template>
  <div class="box">
    <el-container>
      <el-header style="height:67px">
       <li><img src="../../static/77.png" alt=""></li><h1>Secure Base</h1>
        <el-dropdown>  
          <span class="el-dropdown-link">
            您好 , {{user}} , 欢迎登陆<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <router-link to="/helloWorld/setup"><el-dropdown-item>个人设置</el-dropdown-item></router-link>
            <el-dropdown-item ><span @click="exits">退出登录</span> </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-header> 
      <el-container style="height: 500px; border: 1px solid #eee">
        <el-aside width="200px" style="background-color: rgba(255,255,255,.2)">
          <el-menu :default-openeds="['1', '3']">
              <router-link to="/helloWorld/"><el-menu-item index="0">首页</el-menu-item></router-link>          
            <el-submenu index="1"> 
              <template slot="title"><i class="el-icon-message"></i>数据管理</template>         
                <router-link to="/helloWorld/he_home"><el-menu-item index="1-1">账号信息</el-menu-item></router-link>
                <el-menu-item index="1-2">编辑数据</el-menu-item>
            </el-submenu>
            <el-submenu index="2">
              <template slot="title"><i class="el-icon-menu"></i>关于我们</template>
                <router-link to="/helloWorld/personal"><el-menu-item index="2-2">公司展示</el-menu-item></router-link>
            </el-submenu>
          </el-menu>
          <div class="bottom"></div>
        </el-aside>
         <el-container>
            <el-main>
            <router-view></router-view>
            </el-main>
        </el-container>
      </el-container>
      <el-footer style="height:67px">2018-7-19 期待您的再次到来</el-footer>
    </el-container>
  </div>
</template>

<script>
export default {
    data(){
      return {
         user:''
      }
    },
    methods:{
        init(){
           this.user=sessionStorage.getItem("user")
        },
        exits(){
          const h = this.$createElement;
        this.$msgbox({
          title: '消息',
          message: h('p', null, [
            h('b', { style: 'color: teal' }, '尊敬的'+this.user), 
            h('span', null, '确定退出吗？')
          ]),
          showCancelButton: true,
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          beforeClose: (action, instance, done) => {
            if (action === 'confirm') {
              instance.confirmButtonLoading = true;
              instance.confirmButtonText = '登出中...';
              setTimeout(() => {
                done();
                setTimeout(() => {
                  instance.confirmButtonLoading = false;
                  this.$router.replace("/")
                }, 300);
              }, 2000);
            } else {
              done();
            }
          },

        }).then(action => {
          console.log(action)
          this.$message({
            type: 'info',
            message: '温馨提示: ' + "您已退出登录"
          });
        });
        }
    },
    mounted(){
      this.init()
    }
}
</script>

<style>
html,body{
  width: 100%;
  height: 100%;
}
*{
  padding: 0;
  margin: 0;
  list-style-type: none;
  text-decoration: none;
}
 a .el-menu-item{
  height: 56px;
}
.bottom{
  position: absolute;
  left:0;
  bottom:0;
  width: 100%;
  height: 100px;
  line-height: 100px;
  text-align: center;
  color:#fff;
  font-size: 30px;
}
.box{
  width: 100%;
  height: 100%;
  background: url("../../static/eNPXxQBwYW.jpg") no-repeat center;
  background-size:cover; 
}
.el-header, .el-footer {
    background-color: #fff; 
    color: #000;
    line-height: 67px;
    cursor: pointer;
    background: rgba(0,0,0,.3);
  }
  .mar{
    flex:1;
  }
  .el-header{
    display: flex;
    justify-content: space-between;
    padding: 0 80px;
  }
  .el-header p{
    position: relative;
    flex-basis:180px;
    height: 60px;
    overflow: hidden;
  }
  .el-header{
    color:#ffd306;
  }
  .el-footer{
    text-align: center;
    color:#ffd306;
  }
  .el-header p img{
    width: 150px;
    position: absolute;
    left: 0;
    top:-10px;
  }
  .el-container{
    background:rgba(0,0,0,.4);
  }
  .el-aside {
    background-color:rgba(0,0,0,.4);
    color: #333;
    text-align: center;
    line-height: 200px;
    position: relative;
  }
  .el-main {
    background-color:rgba(255,255,255,.1);
    color: #000;
  }
  .el-menu-item.is-active{
    color:#ffd306;
    background: #333;
    font-size: 18px;
  }
  body > .el-container {
    margin-bottom: 40px;
  }
  .el-submenu__title,.el-submenu__title i{
    color:#fff;
  }
  .el-menu{
    background: rgba(255,255,255,.2);
    position: relative;
    z-index: 100;
  }
  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }
  
  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }
  .el-header li{
    width: 40px;
    height: 40px;
    padding: 12px 2px;
  }
  .el-menu-item{
    height: 80px;
    color:#fff;
    background: rgba(0,0,0,.1);
  }
  .el-menu-item .el-button{
    border:none;
    margin: 0;
  }
  .el-submenu__title:hover{
    background: rgba(0,0,0,.3);
    color:#fff;
  }
  .el-menu-item:hover{
    background: rgba(0,0,0,.3);
    color:#fff;
  }
  .el-dropdown{
    height: 50px;
    display: flex;
    justify-content: space-between;
    text-align: center;
  }
  .el-dropdown span{
    width: 100%;
    color:#ffd306;
    font-size: 16px;
  }
  .el-header li{
    animation:play 3s linear infinite;
  }
  @-webkit-keyframes play{
    0%  {
        -webkit-transform:rotateY(0deg);
    }
    100% {
        -webkit-transform:rotateY(360deg);
    }
}
  .el-header li img{
    width: 100%;
  }
  .el-message-box__wrapper .el-message-box__btns .el-button{
      width: 150px
  }
  .el-message-box__wrapper .el-message-box__btns{
    padding: 10px 50px;
    margin: 0;
  }
</style>

