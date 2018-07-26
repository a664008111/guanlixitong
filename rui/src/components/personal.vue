<template>
    <div class="personal">
        <h1><span @click="show" v-if="block">关闭音乐</span><span v-else @click="blo">播放音乐</span></h1>
        <el-carousel :interval="4000" type="card" height="300px">
    <el-carousel-item v-for="(item,index) in userimg" :key="index">
      <h3 ><li :style="{backgroundImage:'url('+item.img+')'}"></li></h3>
    </el-carousel-item>
  </el-carousel>
  <video id="video1" ref="vi" src="../../static/枫叶、安然环绕 - 风暴8D环绕 (DJ版).mp3" :autoplay="autoplay" loop="loop" controls="controls" style="position:absolute;top:-200px;"></video>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    data(){
        return{
            autoplay:'',
            block:true,
            userimg:[]
        }
    },
    methods:{
        init(){
            this.autoplay="aotoplay"
            axios.get("http://169.254.115.222:8098/userimg").then(res=>{
                this.userimg=res.data.mgs
                console.log(this.userimg)
            })
        },
        show(){
            this.block=!this.block
            this.autoplay=false
            this.$refs.vi.autoplay=this.autoplay
            this.$refs.vi.load()
        },
        blo(){
            this.block=!this.block
            this.autoplay=true
            this.$refs.vi.autoplay=this.autoplay
            this.$refs.vi.load()
        }
    },
    mounted(){
        this.init()
    }
}
</script>

<style>
html{
    width: 100%;
    height: 100%;
}
.personal{
    background: rgba(255,255,255,.6);
    width: 100%;
    height: 100%;
    box-shadow: 0px 0px 30px #fff;
    background: #fff;
    background: url("../../static/400075004.jpg") no-repeat center;
    background-size:cover; 
    position: relative;
}
.el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 300px;
    margin: 0;
  }
  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }
  .el-carousel{
      top:20%;
  }
  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
  .personal h1{
      width: 100px;
      height: 70px;
      line-height: 70px;
      text-align: center;
      color:#fff;
      position: absolute;
      top:0;
      left:0; 
  }
  .personal h1 span{
        cursor: pointer;
        padding: 8px;
        border-radius: 20px;
  }
  .personal h1 span:hover{
      color: #ffd306;
      box-shadow: 0 0 20px #fff;
  }
  .el-carousel__item{
      height: 300px;
  }
  h3{
      height: 100%;
      width: 100%;
  }
  h3 li{
      height: 100%;
      width: auto;
      background-size:100% 100%; 
  }
</style>
