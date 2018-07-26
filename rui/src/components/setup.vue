<template>
    <div class="setup">
        <input type="file" accept="image/*" @change="chooseImg" />
        <canvas ref="imgPreview" height="0" width="0"></canvas>
        <button @click="uploadImg">提交图片</button>
        <p><img :src="base64"></p>
    </div>
</template>

<script>
import axios from "axios"
export default {
    data(){
        return{
            imgUrlFromServer: '',
            base64: ''
        }
    },
    methods:{
        uploadImg(){
           axios.post("http://169.254.115.222:8098/setups",{
                  setupimg:this.base64
              }).then(res=>{
                  console.log(res)
                // this.imgUrlFromServer=res.data.setupimg
            })
        },
        chooseImg (event) {
            let file = event.target.files[0]
            if(!/image\/\w+/.test(file.type)){     
                alert("请确保文件为图像类型");   
                return false;   
            }  
            let reader = new FileReader()
            let img = new Image()
            console.log(img,file)
            reader.readAsDataURL(file)
            reader.onloadend = (e) => {
                img.src = e.target.result    
                this.base64 = reader.result
            }
            let canvas = this.$refs['imgPreview']
            let context = canvas.getContext('2d')
            img.onload = () => {
                img.width = 100
                img.height = 100
                canvas.width = 100
                canvas.height = 100
                context.clearRect(0, 0, 100, 100)
                context.drawImage(img, 0, 0, 100, 100)
            }
        }
    },
    mounted(){

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
  p{
      width: 100px;
      height: 100px;
  }
  p img{
      width: 100%;
  }
</style>
