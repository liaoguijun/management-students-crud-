var fs = require('fs')


//渲染页面
exports.find = function(callback){
    fs.readFile('./students.json', function(err, data){
        if(err){
            return res.status(500).send('sever err')
        }
        var students = JSON.parse(data.toString()).students
        callback(null,students)
    })   
}

//添加功能
exports.add = function(student, callback){
    fs.readFile('./students.json',function(err, data){
        if(err){
            return callback(err)
        }
        var students = JSON.parse(data).students

        student.id = students[students.length-1].id+1       
        students.push(student)

        var fileData = JSON.stringify({
            students:students
        })

        fs.writeFile('./students.json', fileData, function(err){
            if(err){
                return callback(err)
            }
            callback(null)
        })
    })
}

//查找id
exports.findId = function(id, callback){
    fs.readFile('./students.json', function(err, data){
        if(err){
            return callback(err)
        }
        var students = JSON.parse(data.toString()).students

        var ret = students.find(function(item){
            return item.id === parseInt(id)
        })
        callback(null, ret)
    })
}

//修改功能
exports.updata = function(student, callback){
    fs.readFile('./students.json',function(err, data){
        if (err){
            return callback(err)
        }
        student.id = parseInt(student.id)

        var students = JSON.parse(data.toString()).students
        
        var stu = students.find(function(item){
            return item.id === student.id
        })

        for (var key in stu){
            stu[key] = student[key]
        }
        
        var fileData = JSON.stringify({
            students:students
        })

        fs.writeFile('./students.json', fileData, function(err){
            if(err){
                return callback(err)
            }
            callback(null)
        })
    })
}

//删除功能
exports.delete = function (id, callback){
    fs.readFile('./students.json', function(err, data){
        if(err){
            return callback(err)
        }
        var students = JSON.parse(data.toString()).students

        var deleteId = students.findIndex(function(item){
            return item.id === parseInt(id)
        })

        students.splice(deleteId, 1)

        var fileData = JSON.stringify({
            students:students
        })

        fs.writeFile('./students.json', fileData, function(err){
            if(err){
                return callback(err)
            }
            callback(null)
        })
    })
}