import express from 'express'

let router = express.Router()
import goodsCtrl from '../controllers/goods'

router.get('/', (req, res) => {
    res.render('goods/goods')
})

router.get('/add', (req, res) => {
    res.render('goods/addGoods')
})

router.get('/edit', (req, res) => {
    res.render('goods/editGoods')
})

//  获取
router.post('/getGoods', (req, res) => {
    goodsCtrl.getGoods(req, res)
})

//  添加
router.post('/addGoods', (req, res) => {
    goodsCtrl.addGoods(req, res)
})

//  获取单个
router.post('/getGoodsOne', (req, res) => {
    goodsCtrl.getGoodsOne(req, res)
})

//  编辑
router.post('/editGoods', (req, res) => {
    goodsCtrl.updateGoods(req, res)
})

//  删除一
router.post('/delOneGoods', (req, res) => {
    goodsCtrl.delOneGoods(req, res)
})

//  删除多
router.post('/delMoreGoods', (req, res) => {
    goodsCtrl.delMoreGoods(req, res)
})



module.exports = router