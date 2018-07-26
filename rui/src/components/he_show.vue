<template>
  <div class="shouye">
      <div class="container">
          <div class="di">
          <video id="video" controls="controls" src="http://vali-dns.cp31.ott.cibntv.net/677252066F43B7178BD6E4B63/03000B010059E9984F1089011BA6A987E388D6-5029-1F24-48F6-967B214E58DE.mp4?ccode=0502&duration=142&expire=18000&psid=ce1af93bb36e22d93870c20b16c999ff&sp=&ups_client_netip=72f9d292&ups_ts=1532484639&ups_userid=&utid=fhLDE%2BrR0EwCAd6AqV1YfNBz&vid=XMzA5Nzk1MTMzNg%3D%3D&vkey=B9b69eb2beaa61de3d05b08ec4b7536dd&s=7edea84a006911e59e2a" ref="video">
          </video>
          <span @click="you" class="sp" id="sp1"><i class="el-icon-arrow-right" title="下一曲"></i></span>
          <span @click="zuo" class="sp" id="sp2"><i class="el-icon-arrow-left" title="上一曲"></i></span>
          </div>
          <transition name="fade">
              <div class="toogle" v-if="!toogle">
                  <h1>播放列表</h1>
                <ul v-for="(item,index) in videolist" :key="index" @click="hide(index)" :class="{active:(index+1)==num}">
                    <li>{{item.yname}}</li>
                    <li>{{item.gname}}</li>
                </ul>
          </div>
            </transition>
          
          <div class="icons" @click="toogles">
              <i class="el-icon-menu"></i>
          </div>
      </div>
      <div class="zhe"  v-if="!zhe">
          <span @click="show">Click To Enter</span>
      </div>
  </div>
</template>

<script>
import './video.js'
import axios from 'axios'
export default {
    data(){
        return{
            videolist:[],
            srclist:[],
            num:0,
            zhe:false,
            autoplay:'',
            toogle:true
            }
        },
    methods:{
        init(){
            axios.get("http://169.254.115.222:8098/srcs")
            .then(res=>{
                this.videolist=res.data.mgs
                this.videolist.forEach((item,index)=>{    
                    this.srclist.push(item.srcs)   
                })
               console.log(this.videolist)
                let list=this.srclist
                var vLen = list.length; 
                console.log(vLen)
                var curr=0;
                var video = this.$refs.video  
            
                video.addEventListener('ended',function(){
                    video.src = list[curr]   
                    video.load(); 
                    video.play();   
                    curr++;  
                    console.log(curr)
                    if(curr >= vLen){       
                        curr=0 //重新循环播放 
                    } 
                },false);
            })
        },
        you(){ 
            if(this.num<this.videolist.length){
            this.num++
            this.videolist.forEach((item,index)=>{    
                if(item.id==this.num) { 
                    var video = this.$refs.video  
                    video.src=item.srcs
                }   
            })
            }else{
                this.$message({
                    type: 'info',
                    message: '温馨提示: ' + "已经没有视频了"
                });
            }   
        },
        zuo(){
            if(this.num>1){
                this.num--
                this.videolist.forEach((item,index)=>{    
                if(item.id==this.num) {
                    var video = this.$refs.video  
                    video.src=item.srcs
                }   
            })
            }else if(this.num==1){
                this.$message({
                    type: 'info',
                    message: '温馨提示: ' + "上一曲是默认视频"
                });
            }  
        },
        show(){
            var video = this.$refs.video
            this.autoplay=true
            video.autoplay=this.autoplay
            video.load()
            this.zhe=!this.zhe
        },
        toogles(){
            this.toogle=!this.toogle
        },
        hide(index){
            let num=index+1
            this.num=num
             this.videolist.forEach((item,index)=>{    
                if(item.id==num) {
                    var video = this.$refs.video  
                    video.src=item.srcs
                    this.num=num
                }   
            })
        }
    },
    mounted(){
        this.init()
    }
}
</script>

<style>
    .shouye{
        background: rgba(255,255,255,.6);
        width: 100%;
        height: 458px;
        box-shadow: 0px 0px 30px #fff;
        position: relative;
    }
    .container {
    background-color: #efefef;
    min-height: 100%;
    }
    .toogle{
        position: absolute;
        top:0;
        left: 0;
        width: 20%;
        background: rgba(0,0,0,.6);
        height: 86%;
        margin-top:30px; 
        color:#fff;
        border-radius: 0 16px 16px 0;
        background: url("../../static/1.png");
        /* background-size:cover; */
        box-shadow: 0 0 10px #fff; 
        box-sizing: border-box;
        padding: 0 20px;
    }
    .toogle h1{
        width: 100%;
        height: 30px;
        font-size:14px;
        line-height: 30px;
        text-align: center; 
    }
    .toogle ul{
        width: 100%;
        height: 50px;
        display: flex;
        justify-content: space-around;
        cursor: pointer;
        text-align: center;
        font-size: 12px;
        position: relative;
        overflow: hidden;
    }
    .toogle ul.active{
        background: rgba(0,0,0,.6);
        background:url("../../static/400075004.jpg");
        font-size: 16px;
        color:#ffd306;
    }
    .toogle ul:hover::after{
        content: "";
        width:20px;
        height: 80px;
        transform: rotateZ(30deg);
        background: #fff;
        position: absolute;
        top:-10px;
        left:-40px;
        animation: key 0.5s;
    }
    .toogle ul li{
        width: 50%;
        height: 50px;
        border-bottom:1px dotted #ccc;
        /* border-style: dotted */
        line-height: 50px;
    }
    .toogle ul:hover{
        background: rgba(255,255,255,.6);
        color:#000;
        font-weight: 600;
    }
    #video{
        width: 100%;
        height: 458px;
        background: #000;
    }
    .sp{
        display: none;
        font-size: 30px;
        cursor: pointer;
    }
    .di{
        width: 100%;
        height: 458px;
        position: relative;
    }
    .di:hover .sp{
        display: block;
    }
    #sp1{
        width: 50px;
        height: 50px;
        line-height: 50px;
        text-align: center;
        background: rgba(255,255,255,.4);
        border-radius: 50%;
        position: absolute;
        top:50%;
        right:50px;
        transform: translateY(-50%);
        transition: all 2s;
    }
    #sp2{
        width: 50px;
        height: 50px;
        line-height: 50px;
        text-align: center;
        background: rgba(255,255,255,.4);
        border-radius: 50%;
        position: absolute;
        top:50%;
        transform: translateY(-50%);
        left:50px;
        transition: all 2s;
    }
    .zhe{
         width: 100%;
        height: 458px;
        background: #fff;
        position: absolute;
        top:0;
        left:0;
        z-index: 999;
        background: url("../../static/home.jpg") no-repeat center;
        background-size:cover; 
    }
    .zhe span{
        width: 200px;
        height: 40px;
        display: block;
        border-radius: 20px;
        color:#ffd306;
        background: rgba(0,0,0,.6);
        line-height: 40px;
        text-align: center;
        margin: 10% auto;
        cursor: pointer;
        position: relative;
        transition: all 0.5s;  
        overflow: hidden;   
        box-shadow: 0 0 10px #222;  
    }
    .zhe span:hover{
        background: linear-gradient(left,rgba(255,0,0,.8),rgba(14,255,166,.8));
        color:#fff;
        box-shadow: 0 0 20px #000;
        font-weight: 600;
        font-family: "Segoe Print";
    }
    .zhe span:hover::before{
        content: "";
        width:20px;
        height: 60px;
        transform: rotateZ(30deg);
        background: #fff;
        position: absolute;
        top:-14px;
        left:-30px;
        animation: key 0.7s;
    }
    .zhe span:hover::after{
        content: "";
        width:20px;
        height: 60px;
        transform: rotateZ(30deg);
        background: #fff;
        position: absolute;
        top:-14px;
        right:-30px;
        animation: keys 0.7s;
    }
    @-webkit-keyframes key{
        0%  {
            -webkit-transform:translateX();
        }
        100% {
            -webkit-transform:translateX(1200%);
        }
    }
    @-webkit-keyframes keys{
        0%  {
            -webkit-transform:translateX();
        }
        100% {
            -webkit-transform:translateX(-1200%);
        }
    }
    .icons{
        position: absolute;
        top:0;
        left: 0;
        width: 30px;
        height: 30px;
        cursor: pointer;
    }
    .icons i{
        font-size: 30px;
        color:#fff;
    }
    .fade-enter-active, .fade-leave-active {
        transition: all 1s;
        transform: translateX(0)
    }
    .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
        transform: translateX(-100%)
    }
</style>
