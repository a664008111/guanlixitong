<template>
  <div class="login">
    <h1>
      <span><b>IT </b>{{$t("brands.Satellite")}}</span>
      <div @click="changeLocale" class="val"><el-switch style="display: block" v-model="value4" active-color="#ccc" inactive-color="#f60" active-text="英文" inactive-text="中文" ></el-switch></div>
      <ul>  
        <li><el-button type="success" round >{{$t("brands.Administrator")}}</el-button></li>
        <li><el-button type="success" round>{{$t("brands.British")}}</el-button></li>
      </ul>
    </h1>
    <div class="center">
      <form action="/login">
        <h2>{{$t("brands.Supervising")}}<span style="color:green;font-size:40px;padding:0 16px">{{$t("brands.System")}}</span></h2>
        <li><el-input placeholder="Please enter the account number" v-model="user" clearable></el-input></li>
        <li><el-input placeholder="Please input a password" type="password" v-model="pass" clearable></el-input></li> 
        <li><el-button type="success" plain @click="opens">{{$t("brands.Register")}}</el-button><el-button type="primary" plain @click="open">{{$t("brands.Login")}}</el-button></li>
      </form>
    </div>  
  </div>
</template>

<script>
import axios from "axios";
export default {
      data(){
        return{
          user:'',
          pass:'',
          value4: true
        }
      },
      methods:{
          open(){
            if(this.user==""||this.pass==""){
                this.$message({
                  type: 'error',
                  message: "内容不能为空"
                  });
            }else{
              axios.get("http://169.254.115.222:8098/login",{
                params:{
                  user:this.user,
                  pass:this.pass
                }
              }).then(res=>{
                console.log(res)
                    this.$alert("登录成功", {
                      confirmButtonText: '确定',
                  }).then(action => {
                      this.$message({
                      type: 'info',
                      message: '温馨提示: ' + "您已登录"+ this.user
                      });
                  })
                  if(res.data.code==2){
                    sessionStorage.setItem("user",this.user)
                    setTimeout(()=>{
                        this.$router.replace("/helloWorld")
                    },2000)
                  }else{
                    this.$alert(res.data.mgs, {
                      confirmButtonText: '确定',
                  });
                  }  
              })
              }
          },
          opens(){
            if(this.user==""||this.pass==""){
              this.$message({
                  type: 'error',
                  message: "请输入要注册的用户名和密码"
                  });
            }else if(this.user.length>=2){
              if(this.pass.length>=5){
                axios.get("http://169.254.115.222:8098/deng",{
                params:{
                  user:this.user,
                  pass:this.pass
                }
              }).then(res=>{
                  this.$message({
                  type: 'warning',
                  message: res.data.mgs
                  });
              })
              }else{
                  this.$message({
                  type: 'error',
                  message: "密码必须大于五位"
                  });
              }   
            }else{
                  this.$message({
                  type: 'error',
                  message: "帐户必须超过三位"
                  });
              }     
          },
          changeLocale () {
           let locale = this.$i18n.locale
           locale === 'cn' ? this.$i18n.locale = 'en' : this.$i18n.locale = 'cn';
          }
      },
      mounted(){

      }
}
</script>

<style>
html,head{
  width: 100%;
  height: 100%;
}
body{
  width: 100%;
  height: 100%;
}
.el-switch{
  height: 70px;
  line-height: 70px;
}
.el-switch span:nth-child(2),.el-switch span:nth-child(4){
  line-height: 20px;
}
#app{
  width: 100%;
  height: 100%;
}
*{
  padding: 0;
  margin: 0;
  list-style-type: none;
  text-decoration: none;
}
.login{
    width: 100%;
    height: 100%;
    background: url("../../static/11.jpg") no-repeat center;
    background-size:cover; 
}
.el-input{
  width: 300px;
}
.login h1{
  width: 100%;
  height: 70px;
  line-height: 50px;
  background: rgba(255,255,255,.3);
  display: flex;
  justify-content: space-between;
}
.login h1 span b{
    color:green;
}
.login h1>span{
  margin-left:80px; 
  line-height: 70px;
  flex-basis: 200px;
}
.login h1 ul{
  display: flex;
  justify-content: space-between;
}
.val{
  flex:1;
}
.login h1 ul li{
  margin: 0 40px;
}
.center{
  width: 30%;
  height: 350px;
  border:1px solid #ccc;
  box-shadow: 1px 2px 3px #ccc;
  border-radius: 10px;
  position: absolute;
  right:30px;
  top:25%;
  background: rgba(255,255,255,.2);
}
.center form{
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
}
.center form li{
  width: 100%;
  text-align: center;
  
}
.center form h2{
  width: 100%;
  font-style: italic;
  text-align: center;
  cursor: pointer;
  color:#fff;
  margin: 46px 0;
}
.center form h2:hover{
    transition: all 1s;
    transform: rotateY(360deg)
}
.center form li:nth-child(2){
  padding-top: 0px;
  padding-bottom: 10px;
}
.center .el-button{
  width:37%;
  margin:20px; 
}
.el-message-box__content{
  text-align: center;
}
.login .el-message-box__btns{
   text-align: left;
   padding: 15px 60px 0;
}
 .login .el-message-box__btns .el-button{
  width: 300px;
}
.el-button+.el-button{
  margin-left:0; 
}
.el-input{
  width: 80%;
}
.el-switch__label.is-active{
  color:#f60;
}
.el-switch__label{
  color:#fff;
  font-weight: 600;
}
</style>
