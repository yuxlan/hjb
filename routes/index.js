import express from 'express'

let router = express.Router()

import formidable from 'formidable'
import fs from 'fs'
import path_con from 'path'
import mysql from 'mysql'

import AppConfig from '../config'

//  连接数据库
function handleError(err) {
    if (err) {
        // 如果是连接断开，自动重新连接
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            connect()
        } else {
            console.error('database connect error：' + err.stack || err)
        }
    }
    console.log('database connect seccucess, id ' + mysql_con.threadId)
}

let mysql_con = mysql.createConnection(AppConfig.DB_CONFIG.MYSQL_DB)

function connect() {
    mysql_con.connect(handleError)
    mysql_con.on('error', handleError)
}

connect()
global.app.set('MysqlConn', mysql_con)


//  附件上传
function uploadImg(AVATAR_UPLOAD_FOLDER, req, res, path) {
    let form = new formidable.IncomingForm()

    form.encoding = 'utf-8'
    form.uploadDir = AVATAR_UPLOAD_FOLDER + '/'
    form.keepExtensions = true
    form.maxFieldsSize = 2 * 1024 * 1024

    form.parse(req, function (err, fields, files) {
        if (err) {
            res.locals.error = err
            return
        }

        let extName = path_con.extname(files.file.name),
            date = new Date(),
            avatarName = date.getFullYear().toString() + (date.getMonth() + 1).toString() + date.getDate().toString() + date.getTime().toString() + extName,
            newPath = form.uploadDir + avatarName,
            showUrl = path + date.getFullYear().toString() + (date.getMonth() + 1).toString() + date.getDate().toString() + '/' + avatarName,
            domain = AppConfig.domain

        fs.renameSync(files.file.path, newPath)

        /**
         * @returns  result
         * @returns  newPath
         */
        res.json({
            'result': '1',
            'info': '上传成功',
            'data': {
                'new_path': domain + showUrl
            }
        })

    })
}

//  文件上传
router.post('/upload', function (req, res) {
    let path = '/uploads/',
        date = new Date(),
        AVATAR_UPLOAD_FOLDER = 'public' + path + date.getFullYear().toString() + (date.getMonth() + 1).toString() + date.getDate().toString()

    fs.exists(AVATAR_UPLOAD_FOLDER, function (exists) {
        if (!exists) {
            fs.mkdir(AVATAR_UPLOAD_FOLDER, function (err) {
                if (err) {
                    console.error(err)
                } else {
                    uploadImg(AVATAR_UPLOAD_FOLDER, req, res, path)
                }
            })
        } else {
            uploadImg(AVATAR_UPLOAD_FOLDER, req, res, path)
        }
    })
})

app.use('/', router)
//  登录
router.get('/', (req, res) => {
    res.render('login')
})

//  轮播图
import carouselRoute from './carousel'
app.use('/carousel', carouselRoute)
//  管理员
import adminRoute from './admin'
app.use('/admin', adminRoute)
//  品牌
import brandRoute from './brand'
app.use('/brand', brandRoute)
//  商品
import goodsRoute from './goods'
app.use('/goods', goodsRoute)


module.exports = router
