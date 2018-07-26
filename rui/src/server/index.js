var express=require('express');
var app=express();
var mysql=require('mysql');
var path=require("path");
var bo=require("body-parser");
var bodys=bo.urlencoded({extended:false})
var a=mysql.createConnection({
    host:"localhost",
    port:3306,
    user:"root",
    // password:"123",
    database:'1601n'
})
app.all("*",(req,res,next)=>{
    res.header('Access-Control-Allow-Origin', '*');
    next()
})
app.get("/login",function(req,res){
    a.query("select * from user where username=? and password=?",[req.query.user,req.query.pass],function(err,result){
        if(err){
            res.send({code:1,mgs:"服务器出现错误"})
        }
        else{
            if(result.length>0){
                res.send({code:2,mgs:"登录成功"})
            }
            else{
                res.send({code:0,mgs:"您的帐户或密码错误！！！"})          
            }
        }
    })
})
app.get("/deng",function(req,res){
    a.query("select username from user where username=?",[req.query.user],function(err,result){
        if(err){
            res.send({code:1,mgs:"服务器出现错误"})
        }
        else{
            if(result.length>0){
                res.send({code:2,mgs:"帐户已存在，请重新选择用户名"})
            }
            else{
                a.query("insert into user(username,password) values(?,?)",[req.query.user,req.query.pass],function(err,result){
                    if(err){
                        res.send({code:1,mgs:"服务器出现错误"})
                    }
                    else{
                        res.send({code:0,mgs:"祝贺您，注册成功，您可以直接登录"})
                    }
                })
            }
        }
    })
})
app.get("/he",function(req,res){
    a.query("select * from user",function(err,result){
        if(err){
            res.send({code:1,mgs:"服务器出现错误"})
        }
        else{
            if(result.length>0){
                console.log(result)
                res.send({code:2,mgs:result})
            }
        }
    })
})
app.get("/userimg",function(req,res){
    a.query("select * from userimgs",function(err,result){
        if(err){
            res.send({code:1,mgs:"服务器出现错误"})
        }
        else{
            if(result.length>0){
                console.log(result)
                res.send({code:2,mgs:result})
            }
        }
    })
})
app.get("/srcs",function(req,res){
    a.query("select * from srcsy",function(err,result){
        if(err){
            res.send({code:1,mgs:"服务器出现错误"})
        }
        else{
            if(result.length>0){
                console.log(result)
                res.send({code:2,mgs:result})
            }
        }
    })
})
app.get("/setups",function(req,res){
    a.query("insert into user(setupimg) values(?)",[req.query.setupimg],function(err,result){
        if(err){
            res.send({code:1,mgs:"服务器出现错误"})
        }
        else{
            res.send({code:0,mgs:"上传成功"})
        }
    })
})
app.listen(8098,function(){
    console.log("服务启动成功")
})