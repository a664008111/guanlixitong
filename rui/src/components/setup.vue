<template>
    <div class="setup">
        <input type="file" accept="image/*" @change="changepic">
        <img :src="imageUrl" alt="">
    </div>
</template>

<script>
import axios from "axios"
export default {
    data(){
        return{
            imageUrl: ''
        }
    },
    methods:{
        init(){
            axios.get("http://169.254.115.222:8098/he",{
                // params:{
                //     setupimg:this.imageUrl
                // }
            }).then(res=>{
                console.log(res)
            })
    },
    changepic(e){
        console.log(this)
        if(event.target.files.length>0){
		this.imageUrl=e.target.files[0];  //提交的图片
		this.$conf.getBase64(e.target,(url)=>{
			this.imgDataUrl = 'data:image/png;base64,'+url;   //显示的图片
		}); 
	}
    }
    },
    mounted(){
        this.init()
    }
}
</script>

<style>
.setup{
    width: 100%;
    height: 100%;
    background: #fff;
}
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
