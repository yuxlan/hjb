import express from 'express'

let router = express.Router()
import carouselCtrl from '../controllers/carousel'

router.get('/', (req, res) => {
    res.render('carousel/carousel')
})

router.get('/add', (req, res) => {
    res.render('carousel/addCarousel')
})

router.get('/edit', (req, res) => {
    res.render('carousel/editCarousel')
})

//  轮播图片获取
router.post('/getCarousel', (req, res) => {
    carouselCtrl.getCarousel(req, res)
})

//  轮播图片添加
router.post('/addCarousel', (req, res) => {
    carouselCtrl.addCarousel(req, res)
})

//  获取单个轮播图详情
router.post('/getCarouselOne', (req, res) => {
    carouselCtrl.getCarouselOne(req, res)
})

//  编辑轮播图
router.post('/editCarousel', (req, res) => {
    carouselCtrl.updateCarousel(req, res)
})

//  删除一张轮播图
router.post('/delOneCarousel', (req, res) => {
    carouselCtrl.delOneCarousel(req, res)
})

//  删除多张轮播图
router.post('/delMoreCarousel', (req, res) => {
    carouselCtrl.delMoreCarousel(req, res)
})

module.exports = router