import Sync from 'sync'
import AppConfig from '../config'


/**
 * 获取
 * @params   page    默认1 1页10条数据
 */
function getBrand(req, res) {
    Sync(function () {
        try {
            let mysql_db = global.app.get('MysqlConn'),
                page = req.body.page ? req.body.page : '0',
                sql = page === '0' ? 'SELECT * FROM db_brand ORDER BY id DESC' : 'SELECT * FROM db_brand ORDER BY id DESC LIMIT ' + (10 * page - 10) + ',10',
                result = mysql_db.query.sync(mysql_db, sql)[0],
                sql_1 = 'SELECT COUNT(*) FROM db_brand',
                result_1 = mysql_db.query.sync(mysql_db, sql_1)[0],
                count = result_1[0]['COUNT(*)'],
                data_list = new Array

            for (let item of result) {
                data_list.push({
                    'id': item.id ? item.id.toString() : '0',
                    'name': item.name ? item.name.toString() : '',
                    'logo': item.logo ? item.logo : AppConfig.imgUrl,
                    'des': item.des ? item.des.toString() : ''
                })
            }

            res.json({
                'result': '1',
                'info': '获取成功',
                'data': {
                    'brand': data_list,
                    'page': page,
                    'allPage': count ? Math.ceil(count/10).toString() : '1',
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

exports.getBrand = getBrand


/**
 * 新加
 * @params   name
 * @params   logo
 * @params   des
 */
function addBrand(req, res) {
    Sync(function () {
        try {
            let mysql_db = global.app.get('MysqlConn'),
                p = req.body

            if (!p.name) {
                res.json({
                    'result': '0',
                    'info': '请输入品牌名称'
                })
            } else {
                let result = mysql_db.query.sync(
                    mysql_db,
                    'INSERT INTO db_brand (name, des, logo) VALUES (?, ?, ?)',
                    [p.name, p.des, p.logo.replace(req.headers.referer, '') ? p.logo : AppConfig.imgUrl]
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

exports.addBrand = addBrand


/**
 * 获取单个详情
 * @params  id
 */
function getBrandOne(req, res) {
    Sync(function () {
        try {
            let mysql_db = global.app.get('MysqlConn'),
                id = req.body.id,
                sql = 'SELECT * FROM db_brand WHERE id = ' + id,
                result = mysql_db.query.sync(mysql_db, sql)[0]

            res.json({
                'result': '1',
                'info': '获取成功',
                'data': {
                    'id': result[0].id ? result[0].id.toString() : '0',
                    'name': result[0].name ? result[0].name.toString() : '',
                    'logo': result[0].logo ? result[0].logo : AppConfig.imgUrl,
                    'des': result[0].des ? result[0].des.toString() : ''
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

exports.getBrandOne = getBrandOne

/**
 * 编辑
 * @params   name
 * @params   logo
 * @params   des
 */
function updateBrand(req, res) {
    Sync(function () {
        try {
            let mysql_db = global.app.get("MysqlConn"),
                p = req.body

            if (!p.name) {
                res.json({
                    'result': '0',
                    'info': '请输入品牌名称'
                })
            } else {
                let result = mysql_db.query.sync(
                    mysql_db,
                    'UPDATE db_brand SET name=?, des=?, logo=? WHERE id=?',
                    [p.name, p.des, p.logo.replace(req.headers.referer, '') ? p.logo : AppConfig.imgUrl, p.id]
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

exports.updateBrand = updateBrand

/**
 * 删除一个
 * @param id
 */
function delOneBrand(req, res) {
    Sync(function () {
        try {
            let mysql_db = global.app.get("MysqlConn"),
                id = req.body.id,
                sql = 'DELETE FROM db_brand WHERE id=' + id,
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

exports.delOneBrand = delOneBrand

/**
 * 删除多个
 * @param ids (1,2,3……)
 */
function delMoreBrand(req, res) {
    Sync(function () {
        try {
            let mysql_db = global.app.get("MysqlConn"),
                ids = req.body["ids[]"]

            let sql = 'DELETE FROM db_brand WHERE id in (' + ids + ')',
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

exports.delMoreBrand = delMoreBrand