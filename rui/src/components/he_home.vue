<template>
    <div class="he_home">
      <div v-if="show" class="shows">
        <el-table :data="data.slice((page-1)*7,page*7)"  style="width: 100%" height="90%" >
    <el-table-column type="selection" width="55">
    </el-table-column>
    <el-table-column prop="id" label="ID"  width="50">
    </el-table-column>
    <el-table-column label="姓名" width="100">
      <template slot-scope="scope">
        <el-popover trigger="hover" placement="top">
          <p>姓名: {{ scope.row.username }}</p>
          <div slot="reference" class="name-wrapper">
            <el-tag size="medium">{{ scope.row.username }}</el-tag>
          </div>
        </el-popover>
      </template>
    </el-table-column>
    <el-table-column 
      label="日期"
      width="230">
      <template slot-scope="scope">
        <i class="el-icon-time"></i>
        <span style="margin-left: 10px">{{ scope.row.birthday }}</span>
      </template>
    </el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
    <el-pagination small layout="prev, pager, next" :total="num" :page-size="7" @current-change="change" ></el-pagination>
    </div>
    <div class="he" v-else>
      <el-form ref="form" :model="form" label-width="80px">
  <el-form-item label="用户名" >
    <el-input v-model="form.name" disabled></el-input>
  </el-form-item>
  <el-form-item label="创建日期" >
    <el-input v-model="form.date1" disabled></el-input>
  </el-form-item>
  <div class="block">
    <span class="demonstration">出生日期</span>
    <el-date-picker
      v-model="value1"
      type="date"
      placeholder="选择日期"
      :picker-options="pickerOptions1">
    </el-date-picker>
  </div>
  <el-form-item>
    <el-button type="primary" @click="open6">保存</el-button>
  </el-form-item>
</el-form>
    </div>
    </div>
</template>

<script>
import axios from 'axios'
export default {
  data(){
    return{
      data:[],
      page:1,
      num:null,
      show:true,
      row:'',
      form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        pickerOptions1:{
          disabledDate(time) {
            return time.getTime() > Date.now();
          }
        },
        value1: ''
    }
  },
    methods:{
      init(){
        axios.get("http://169.254.115.222:8098/he").then(res=>{
            this.data=res.data.mgs
            console.log(this.data)
            this.num=res.data.mgs.length
        })
      },
      handleEdit(index, row) {
        this.show=!this.show
        this.row=row
        this.form.name=row.username
        this.form.date1=row.update_time 
        console.log(this.row)
      },
      handleDelete(index, row) {
        console.log(index, row);
        axios.get("http://169.254.115.222:8098/hand").then(res=>{
          console.log(res)
        })
      },
      change(page){
        this.page=page;
      },
      open6() {
        this.$confirm('检测到未保存的内容，是否在离开页面前保存修改？', '确认信息', {
          distinguishCancelAndClose: true,
          confirmButtonText: '保存',
          cancelButtonText: '放弃修改'
        })
          .then(() => {
            this.$message({
              type: 'info',
              message: '保存修改'
            });
            this.show=!this.show
          })
          .catch(action => {
            this.$message({
              type: 'info',
              message: action === 'cancel'
                ? '放弃保存并离开页面'
                : '停留在当前页面'
            })
            this.show=!this.show
          });
      }
    },
    mounted(){
      this.init()
    }
}
</script>

<style>
.he_home{
    background: rgba(255,255,255,.6);
    width: 100%;
    height: 100%;
    box-shadow: 0px 0px 30px #fff;
}
.el-pagination{
  box-sizing: border-box;
  padding: 10px 10px;
  width: 100%;
  height: 10%;
  background: #fff;
  text-align: center;
}
.shows{
  width: 100%;
  height: 100%;
}
.he{
  width: 100%;
  height: 100%;
  background: #fff;
}
.el-form-item,.block{
  padding-top: 20px;
  margin-bottom:0;
}
.block span{
  text-align: right;
    float: left;
    font-size: 14px;
    color: #606266;
    line-height: 40px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    margin-left:12px; 
}
.el-date-editor{
  padding-left:12px;
}
.el-form-item .el-input{
  width: 70%;
}
</style>
