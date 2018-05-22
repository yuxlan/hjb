import Sync from 'sync'
import AppConfig from '../config'


/**
 * 轮播图片获取
 * @params   page    默认1 1页10条数据
 * @params   size    取几条数据
 * @params   type    1 小程序    2 PC    3全部  默认3
 */
function getCarousel(req, res) {
    Sync(function () {
        try {
            let mysql_db = global.app.get('MysqlConn'),
                page = req.body.page ? req.body.page : '1',
                size = req.body.size ? req.body.size : 10,
                type = req.body.type ? req.body.type.toString() : '3',
                sql = type === '3' ? 'SELECT * FROM db_imgs WHERE type = 1 OR type = 2 ORDER BY id DESC LIMIT ' + (size * page - size) + ',' + size : 'SELECT * FROM db_imgs WHERE type = ' + type + ' ORDER BY id DESC LIMIT ' + (size * page - size) + ',' + size,
                result = mysql_db.query.sync(mysql_db, sql)[0],
                sql_1 = 'SELECT COUNT(*) FROM db_imgs',
                result_1 = mysql_db.query.sync(mysql_db, sql_1)[0],
                count = result_1[0]['COUNT(*)'],
                data_list = new Array

            for (let item of result) {
                data_list.push({
                    'id': item.id ? item.id.toString() : '0',
                    'url': item.url ? item.url : AppConfig.imgUrl,
                    'type': item.type ? item.type.toString() : '1',
                    'width': item.width ? item.width : '0',
                    'height': item.height ? item.height : '0',
                    'href': item.href ? item.href : '',
                    'des': item.des ? item.des : ''
                })
            }

            res.json({
                'result': '1',
                'info': '获取成功',
                'data': {
                    'img': data_list,
                    'page': page,
                    'allPage': count ? Math.ceil(count/size).toString() : '1',
                    'count': count ? count.toString() : '0'
                }
            })

        } catch (e) {
            console.log(e)

            res.json({
                'result': '0',
                'info': e
            })
        }
    })
}

exports.getCarousel = getCarousel


/**
 * 轮播图片上传
 * @params   url     上传的图片地址
 * @params   type    1 小程序    2 PC
 * @params   href    外部链接
 * @params   des     描述
 */
function addCarousel(req, res) {
    Sync(function () {
        try {
            let mysql_db = global.app.get('MysqlConn'),
                p = req.body

            if (!p.type || p.type.toString() === '0') {
                res.json({
                    'result': '0',
                    'info': '请选择类型'
                })
            } else if (!p.url.replace(req.headers.referer, '')) {
                res.json({
                    "result": '0',
                    "info": "请先上传图片"
                })
            } else {
                let result = mysql_db.query.sync(
                    mysql_db,
                    'INSERT INTO db_imgs (url, type, width, height, href, des) VALUES (?, ?, ?, ?, ?, ?)',
                    [p.url, parseInt(p.type), p.type.toString() === '1' ? '750' : '1920', p.type.toString() === '1' ? '428' : '600', p.href, p.des]
                )
                res.json({
                    "result": '1',
                    "info": "添加成功"
                })
            }

        } catch (e) {
            console.log(e)

            res.json({
                'result': '0',
                'info': e
            })
        }
    })
}

exports.addCarousel = addCarousel


/**
 * 获取单个轮播图详情
 * @params  id
 */
function getCarouselOne(req, res) {
    Sync(function () {
        try {
            let mysql_db = global.app.get('MysqlConn'),
                id = req.body.id,
                sql = 'SELECT * FROM db_imgs WHERE id = ' + id,
                result = mysql_db.query.sync(mysql_db, sql)[0]

            res.json({
                'result': '1',
                'info': '获取成功',
                'data': {
                    'id': result[0].id ? result[0].id.toString() : '0',
                    'url': result[0].url ? result[0].url : AppConfig.imgUrl,
                    'type': result[0].type ? result[0].type.toString() : '1',
                    'width': result[0].width ? result[0].width : '0',
                    'height': result[0].height ? result[0].height : '0',
                    'href': result[0].href ? result[0].href : '',
                    'des': result[0].des ? result[0].des : ''
                }
            })

        } catch (e) {
            console.log(e)

            res.json({
                'result': '0',
                'info': e
            })
        }
    })
}

exports.getCarouselOne = getCarouselOne

/**
 * 编辑轮播图
 * @params   id
 * @params   url     上传的图片地址
 * @params   type    1 小程序    2 PC
 * @params   href    外部链接
 * @params   des     描述
 */
function updateCarousel(req, res) {
    Sync(function () {
        try {
            let mysql_db = global.app.get("MysqlConn"),
                p = req.body

            if (!p.type || p.type.toString() === '0') {
                res.json({
                    'result': '0',
                    'info': '请选择类型'
                })
            } else {
                let result = mysql_db.query.sync(
                    mysql_db,
                    'UPDATE db_imgs SET url=?, type=?, width=?, height=?, href=?, des=? WHERE id=?',
                    [p.url, parseInt(p.type), p.type.toString() === '1' ? '750' : '1920', p.type.toString() === '1' ? '428' : '600', p.href, p.des, p.id]
                )
                res.json({
                    "result": '1',
                    "info": "更新成功"
                })
            }
        } catch (e) {
            console.log(e)

            res.json({
                'result': '0',
                'info': e
            })
        }
    })
}

exports.updateCarousel = updateCarousel

/**
 * 删除一张轮播图
 * @param id
 */
function delOneCarousel(req, res) {
    Sync(function () {
        try {
            let mysql_db = global.app.get("MysqlConn"),
                id = req.body.id,
                sql = 'DELETE FROM db_imgs WHERE id=' + id,
                result = mysql_db.query.sync(mysql_db,sql)[0]

            res.json({
                "result": '1',
                "info": '删除成功'
            })
        } catch (e) {
            console.log(e)

            res.json({
                'result': '0',
                'info': e
            })
        }
    })
}

exports.delOneCarousel = delOneCarousel

/**
 * 删除多张轮播图
 * @param ids (1,2,3……)
 */
function delMoreCarousel(req, res) {
    Sync(function () {
        try {
            let mysql_db = global.app.get("MysqlConn"),
                ids = req.body["ids[]"]

                console.log('debug',ids)

            let sql = 'DELETE FROM db_imgs WHERE id in (' + ids + ')',
                result = mysql_db.query.sync(mysql_db,sql)[0]

            res.json({
                "result": '1',
                "info": '删除成功'
            })
        } catch (e) {
            console.log(e)

            res.json({
                'result': '0',
                'info': e
            })
        }
    })
}

exports.delMoreCarousel = delMoreCarousel