import express from 'express'

let router = express.Router()
import adminCtrl from '../controllers/admin'

//  登录
router.post('/login', (req, res) => {
    adminCtrl.login(req, res)
})

router.get('/', (req, res) => {
    res.render('admin/admin')
})

router.get('/add', (req, res) => {
    res.render('admin/addAdmin')
})

router.get('/edit', (req, res) => {
    res.render('admin/editAdmin')
})

//  管理员获取
router.post('/getAdmin', (req, res) => {
    adminCtrl.getAdmin(req, res)
})

//  管理员添加
router.post('/addAdmin', (req, res) => {
    adminCtrl.addAdmin(req, res)
})

//  获取单个管理员详情
router.post('/getAdminOne', (req, res) => {
    adminCtrl.getAdminOne(req, res)
})

//  编辑管理员
router.post('/editAdmin', (req, res) => {
    adminCtrl.updateAdmin(req, res)
})

//  删除一个管理员
router.post('/delOneAdmin', (req, res) => {
    adminCtrl.delOneAdmin(req, res)
})

//  删除多个管理员
router.post('/delMoreAdmin', (req, res) => {
    adminCtrl.delMoreAdmin(req, res)
})

module.exports = router