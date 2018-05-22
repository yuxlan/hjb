import express from 'express'

let router = express.Router()
import brandCtrl from '../controllers/brand'

router.get('/', (req, res) => {
    res.render('brand/brand')
})

router.get('/add', (req, res) => {
    res.render('brand/addBrand')
})

router.get('/edit', (req, res) => {
    res.render('brand/editBrand')
})

//  获取
router.post('/getBrand', (req, res) => {
    brandCtrl.getBrand(req, res)
})

//  添加
router.post('/addBrand', (req, res) => {
    brandCtrl.addBrand(req, res)
})

//  获取单个详情
router.post('/getBrandOne', (req, res) => {
    brandCtrl.getBrandOne(req, res)
})

//  编辑
router.post('/editBrand', (req, res) => {
    brandCtrl.updateBrand(req, res)
})

//  删除一
router.post('/delOneBrand', (req, res) => {
    brandCtrl.delOneBrand(req, res)
})

//  删除多
router.post('/delMoreBrand', (req, res) => {
    brandCtrl.delMoreBrand(req, res)
})

module.exports = router