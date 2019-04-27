var express = require('express')
var router = express.Router()
var fs = require('fs')
var stu = require('./crud')


//渲染学生
router.get('/',function(req, res){
    stu.find(function(err,students){
        if(err){
            return res.status(500).send('sever err')
        }
        res.render('index.html',{
            students:students
        })
    })
})

//渲染添加学生页面
router.get('/add',function(req, res){
    res.render('add.html')
})

//添加学生
router.post('/add',function(req, res){
    stu.add(req.body, function(err){
        if(err){
            return res.status(500).send('sever error...')
        }
        res.redirect('/')
    })
})

//渲染修改学生页面
router.get('/update',function(req, res){

    stu.findId(parseInt(req.query.id), function(err, student){
        if(err){
            return callback(err)
        }
        res.render('updata.html',{
        student:student
        })
    })
})

//修改学生
router.post('/updata',function(req, res){
    stu.updata(req.body, function(err){
        if(err){
            return res.status(500).send('sever error...')
        }
        res.redirect('/')
    })
})

//删除学生
router.get('/delete',function(req, res){
    stu.delete(req.query.id, function(err){
        if(err){
            res.status(500).send('sever error...')
        }
        res.redirect('/')
    })
})



module.exports = router

