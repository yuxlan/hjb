import express from 'express'
import path from 'path'
import logger from 'morgan'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
import ejs from 'ejs'
import ueditor from 'ueditor'

let app = express()
global.app = app


//  设置访问请求头，解决访问跨域问题
app.all('*', (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Header', 'Content-Type,Content-Length, Authorization, Accept,X-Requested-With')
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS')
    res.header('X-Powered-By', '4.15.5')

    if (req.method === 'OPTIONS') res.send(200)
    else next()
})


//  视图模板
app.set('views', path.join(__dirname, 'views'))
app.engine('.html', ejs.renderFile)
app.set('view engine', 'html')

//  jwt 设置
app.set('jwtTokenSecret', 'unohacha')

//  载入中间件
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
//  指定上传文件到public目录下的uploads文件夹中
app.use(bodyParser({uploadDir: './public/uploads'}))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

let routes = require('./routes/index')

//  配置ueditor
app.use("/ueditor/ue",ueditor(path.join(__dirname,'public'),(req,res,next) => {
    //客户端上传文件设置
    let ActionType = req.query.action
    if(ActionType === 'uploadimage' || ActionType === 'uploadfile' || ActionType === 'uploadvideo'){
        let file_url = '/uploads/ueditor/img/'//默认图片上传地址
        /*其他上传格式的地址*/
        if(ActionType === 'uploadfile'){
            file_url = '/uploads/ueditor/file/' //附件
        }
        if(ActionType === 'uploadvideo'){
            file_url = '/uploads/ueditor/video/' //视频
        }
        res.ue_up(file_url) //只要输入要保存的地址 。保存操作交给ueditor来做
        res.setHeader('Content-Type','text/html')
    }
    //  客户端发起图片列表请求
    else if(req.query.action === 'listimage'){
        let dir_url = '/uploads/ueditor/img/'
        res.ue_list(dir_url) // 客户端会列出 dir_url 目录下的所有图片
    }else if(req.query.action === 'listfile'){
        let dir_url = '/uploads/ueditor/file/'
        res.ue_list(dir_url) // 客户端会列出 dir_url 目录下的所有图片
    }
    // 客户端发起其它请求
    else{
        res.setHeader('Content-Type','application/json')
        res.redirect('/utils/ueditor/1.4.3/jsp/config.json')
    }
}))

//  404
app.use((req, res, next) => {
    let err = new Error('Not Found')
    err.status = 404
    next(err)
})

//  错误处理
app.use((err, req, res) => {
    res.locals.message = err.message
    res.locals.error = req.app.get('env') === 'development' ? err : {}
    // 渲染错误提示页
    res.status(err.status || 500)
    res.render('error')
})

module.exports = app
