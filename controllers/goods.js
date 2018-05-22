import Sync from 'sync'
import AppConfig from '../config'


/**
 * 数据获取
 * @params   page      默认1 1页10条数据
 * @params   size      取几条数据
 * @params   brandId   品牌Id  0为全部
 */
function getGoods(req, res) {
    Sync(function () {
        try {
            let mysql_db = global.app.get('MysqlConn'),
                page = req.body.page ? req.body.page : '1',
                size = req.body.size ? req.body.size : 10,
                brandId = req.body.brandId ? req.body.brandId.toString() : '0',

                sql = brandId === '0' ? 'SELECT * FROM db_goods ORDER BY id DESC LIMIT ' + (size * page - size) + ',' + size : 'SELECT * FROM db_goods WHERE brandId = ' + brandId + ' ORDER BY id DESC LIMIT ' + (size * page - size) + ',' + size,
                result = mysql_db.query.sync(mysql_db, sql)[0],
                sql_1 = 'SELECT COUNT(*) FROM db_goods',
                result_1 = mysql_db.query.sync(mysql_db, sql_1)[0],
                count = result_1[0]['COUNT(*)'],
                data_list = new Array

            for (let item of result) {
                let sql_2 = 'SELECT * FROM db_brand WHERE id = ' + item.brandId,
                    result_2 = mysql_db.query.sync(mysql_db, sql_2)[0]
                data_list.push({
                    'id': item.id ? item.id.toString() : '0',
                    'name': item.name ? item.name : '',
                    'brand': result_2[0].name ? result_2[0].name : '',
                    'des': item.des ? item.des : '',
                    'o_price': item.o_price ? item.o_price : '0',
                    'm_price': item.m_price ? item.m_price : '0',
                    'l_price': item.l_price ? item.l_price : '0',
                    'explain': item.exp ? item.exp : '',
                    'img': item.img ? item.img : AppConfig.imgUrl,
                    'showImg': item.showImg ? item.showImg : AppConfig.imgUrl,
                    'detailImg': item.detailImg ? item.detailImg : AppConfig.imgUrl
                })
            }

            res.json({
                'result': '1',
                'info': '获取成功',
                'data': {
                    'goods': data_list,
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

exports.getGoods = getGoods


/**
 * 上传
 * @params   name
 * @params   des
 * @params   brandId
 * @params   o_price
 * @params   m_price
 * @params   l_price
 * @params   detail
 * @params   detailImg
 * @params   img
 * @params   showImg
 * @params   explain
 * @params   tomp
 * @params   tst
 * @params   mss
 * @params   msm
 * @params   msr
 * @params   spd
 * @params   nb
 * @params   sor
 * @params   osp
 */
function addGoods(req, res) {
    Sync(function () {
        try {
            let mysql_db = global.app.get('MysqlConn'),
                p = req.body

            if (!p.brandId || p.brandId === '0') {
                res.json({
                    'result': '0',
                    'info': '请选择品牌'
                })
            } else if (!p.name) {
                res.json({
                    'result': '0',
                    'info': '请输入商品名称'
                })
            } else if (!p.o_price) {
                res.json({
                    'result': '0',
                    'info': '请输入商品原价'
                })
            } else if (!p.img.replace(req.headers.referer, '')) {
                res.json({
                    "result": '0',
                    "info": "请上传商品主图"
                })
            } else {
                let result = mysql_db.query.sync(
                    mysql_db,
                    'INSERT INTO db_goods (name, des, brandId, pamramId, revaId, o_price, m_price, l_price, tags, detail, detailImg, img, showImg, exp, tomp, tst, mss, msm, msr, spd, nb, sor, osp' +
                    ') VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
                    [p.name, p.des, p.brandId, '0', '0', p.o_price, p.m_price, p.l_price, '', p.detail, p.detailImg, p.img, p.showImg, p.explain, p.tomp, p.tst, p.mss, p.msm, p.msr, p.spd, p.nb,
                    p.sor, p.osp]
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

exports.addGoods = addGoods


/**
 * 获取单个详情
 * @params  id
 */
function getGoodsOne(req, res) {
    Sync(function () {
        try {
            let mysql_db = global.app.get('MysqlConn'),
                id = req.body.id,
                sql = 'SELECT * FROM db_goods WHERE id = ' + id,
                result = mysql_db.query.sync(mysql_db, sql)[0],
                sql_1 = 'SELECT * FROM db_brand WHERE id = ' + result[0].brandId,
                result_1 = mysql_db.query.sync(mysql_db, sql_1)[0]

            res.json({
                'result': '1',
                'info': '获取成功',
                'data': {
                    'id': result[0].id ? result[0].id.toString() : '0',
                    'name': result[0].name ? result[0].name : '',
                    'brand': result_1[0].name ? result_1[0].name : '',
                    'brandId': result[0].brandId ? result[0].brandId.toString() : '',
                    'des': result[0].des ? result[0].des : '',
                    'o_price': result[0].o_price ? result[0].o_price : '0',
                    'm_price': result[0].m_price ? result[0].m_price : '0',
                    'l_price': result[0].l_price ? result[0].l_price : '0',
                    'explain': result[0].exp ? result[0].exp : '',
                    'img': result[0].img ? result[0].img : AppConfig.imgUrl,
                    'showImg': result[0].showImg ? result[0].showImg : AppConfig.imgUrl,
                    'detailImg': result[0].detailImg ? result[0].detailImg : AppConfig.imgUrl,
                    'detail': result[0].detail ? result[0].detail : '',
                    'tomp': result[0].tomp ? result[0].tomp : '其它',
                    'tst': result[0].tst ? result[0].tst : '其它',
                    'mss': result[0].mss ? result[0].mss : '0*0',
                    'msm': result[0].msm ? result[0].msm : '其它',
                    'msr': result[0].msr ? result[0].msr : '0',
                    'spd': result[0].spd ? result[0].spd : '0',
                    'nb': result[0].nb ? result[0].nb : '0.00mm',
                    'sor': result[0].sor ? result[0].sor : '0%',
                    'osp': result[0].osp ? result[0].osp : '无'
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

exports.getGoodsOne = getGoodsOne

/**
 * 编辑
 * @params   id
 * @params   name
 * @params   des
 * @params   brandId
 * @params   o_price
 * @params   m_price
 * @params   l_price
 * @params   detail
 * @params   detailImg
 * @params   img
 * @params   showImg
 * @params   explain
 * @params   tomp
 * @params   tst
 * @params   mss
 * @params   msm
 * @params   msr
 * @params   spd
 * @params   nb
 * @params   sor
 * @params   osp
 */
function updateGoods(req, res) {
    Sync(function () {
        try {
            let mysql_db = global.app.get("MysqlConn"),
                p = req.body

            if (!p.brandId || p.brandId === '0') {
                res.json({
                    'result': '0',
                    'info': '请选择品牌'
                })
            } else if (!p.name) {
                res.json({
                    'result': '0',
                    'info': '请输入商品名称'
                })
            } else if (!p.o_price) {
                res.json({
                    'result': '0',
                    'info': '请输入商品原价'
                })
            } else if (!p.img.replace(req.headers.referer, '')) {
                res.json({
                    "result": '0',
                    "info": "请上传商品主图"
                })
            } else {
                let result = mysql_db.query.sync(
                    mysql_db,
                    'UPDATE db_goods SET name=?, des=?, brandId=?, pamramId=?, revaId=?, o_price=?, m_price=?, l_price=?, tags=?, detail=?, detailImg=?, img=?, showImg=?, exp=?, ' +
                    'tomp=?, tst=?, mss=?, msm=?, msr=?, spd=?, nb=?, sor=?, osp=? WHERE id=?',
                    [p.name, p.des, p.brandId, '0', '0', p.o_price, p.m_price, p.l_price, '', p.detail, p.detailImg, p.img, p.showImg, p.explain,p.tomp, p.tst, p.mss, p.msm, p.msr, p.spd, p.nb,
                        p.sor, p.osp, p.id]
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

exports.updateGoods = updateGoods

/**
 * 删除一
 * @param id
 */
function delOneGoods(req, res) {
    Sync(function () {
        try {
            let mysql_db = global.app.get("MysqlConn"),
                id = req.body.id,
                sql = 'DELETE FROM db_goods WHERE id=' + id,
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

exports.delOneGoods = delOneGoods

/**
 * 删除多
 * @param ids (1,2,3……)
 */
function delMoreGoods(req, res) {
    Sync(function () {
        try {
            let mysql_db = global.app.get("MysqlConn"),
                ids = req.body["ids[]"]

            console.log('debug',ids)

            let sql = 'DELETE FROM db_goods WHERE id in (' + ids + ')',
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

exports.delMoreGoods = delMoreGoods