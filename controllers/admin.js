import Sync from 'sync'
import crypto from 'crypto'

/**
 * 管理员登录
 * @params   username
 * @params   pwd
 */
function login(req, res) {
    Sync(function () {
        try {
            let mysql_db = global.app.get('MysqlConn'),

                username = req.body.username,
                password = req.body.pwd,

                sql = "SELECT * FROM db_admin WHERE username='" + username + "'",
                result = mysql_db.query.sync(mysql_db, sql)[0],

                cipher = crypto.createCipher('aes192', 'hjb'),
                pwd = cipher.update(password, 'utf8', 'base64')
            pwd += cipher.final('base64')

            if (result.length > 0) {
                let sql_1 = "SELECT * FROM db_admin WHERE username='" + username + "' AND password='" + pwd + "'",
                    result_1 = mysql_db.query.sync(mysql_db, sql_1)[0]

                if (result_1.length > 0) {
                    res.json({
                        'result': '1',
                        'info': '登陆成功',
                        'data': result_1[0].username
                    })
                } else {
                    res.json({
                        'result': '0',
                        'info': '密码错误'
                    })
                }
            } else {
                res.json({
                    'result': '0',
                    'info': '当前用户不存在'
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

exports.login = login


/**
 * 管理员获取
 * @params   page    默认1 1页10条数据
 * @params   size    取几条数据
 */
function getAdmin(req, res) {
    Sync(function () {
        try {
            let mysql_db = global.app.get('MysqlConn'),
                page = req.body.page ? req.body.page : '1',
                size = req.body.size ? req.body.size : 10,
                sql = 'SELECT * FROM db_admin ORDER BY id DESC LIMIT ' + (size * page - size) + ',' + size,
                result = mysql_db.query.sync(mysql_db, sql)[0],
                sql_1 = 'SELECT COUNT(*) FROM db_admin',
                result_1 = mysql_db.query.sync(mysql_db, sql_1)[0],
                count = result_1[0]['COUNT(*)'],
                data_list = new Array

            for (let item of result) {
                data_list.push({
                    'id': item.id ? item.id.toString() : '0',
                    'username': item.username ? item.username : '',
                    'tel': item.tel ? item.tel : ''
                })
            }

            res.json({
                'result': '1',
                'info': '获取成功',
                'data': {
                    'admin': data_list,
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

exports.getAdmin = getAdmin


/**
 * 添加管理员
 * @params   username     用户名
 * @params   pwd          密码
 * @params   tel          电话号码
 */
function addAdmin(req, res) {
    Sync(function () {
        try {
            let mysql_db = global.app.get('MysqlConn'),
                p = req.body

            if (!p.username) {
                res.json({
                    'result': '0',
                    'info': '请输入用户名'
                })
            } else if (!p.pwd) {
                res.json({
                    "result": '0',
                    "info": "请输入密码"
                })
            } else if (!p.tel) {
                res.json({
                    "result": '0',
                    "info": "请输入联系方式"
                })
            } else {
                let sql = "SELECT * FROM db_admin WHERE username='" + p.username + "'",
                    result = mysql_db.query.sync(mysql_db, sql)[0]
                if (result.length > 0) {
                    res.json({
                        'result': '0',
                        'info': '用户名已有使用'
                    })
                } else {
                    let cipher = crypto.createCipher('aes192', 'hjb'),
                        pwd = cipher.update(p.pwd, 'utf8', 'base64')
                    pwd += cipher.final('base64')
                    let result_1 = mysql_db.query.sync(
                        mysql_db,
                        'INSERT INTO db_admin (username, password, tel) VALUES (?, ?, ?)',
                        [p.username, pwd, p.tel]
                    )
                    res.json({
                        "result": '1',
                        "info": "添加成功"
                    })
                }
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

exports.addAdmin = addAdmin


/**
 * 获取单个管理员详情
 * @params  id
 */
function getAdminOne(req, res) {
    Sync(function () {
        try {
            let mysql_db = global.app.get('MysqlConn'),
                id = req.body.id,
                sql = 'SELECT * FROM db_admin WHERE id = ' + id,
                result = mysql_db.query.sync(mysql_db, sql)[0],
                cipher = crypto.createDecipher('aes192', 'hjb'),
                pwd = cipher.update(result[0].password , 'base64', 'utf8')
            pwd += cipher.final('utf8')

            res.json({
                'result': '1',
                'info': '获取成功',
                'data': {
                    'id': result[0].id ? result[0].id.toString() : '0',
                    'username': result[0].username,
                    'pwd': pwd,
                    'tel': result[0].tel
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

exports.getAdminOne = getAdminOne

/**
 * 编辑管理员
 * @params   id
 * @params   username     用户名
 * @params   pwd          密码
 * @params   tel          电话号码
 */
function updateAdmin(req, res) {
    Sync(function () {
        try {
            let mysql_db = global.app.get("MysqlConn"),
                p = req.body

            if (!p.username) {
                res.json({
                    'result': '0',
                    'info': '请输入用户名'
                })
            } else if (!p.pwd) {
                res.json({
                    "result": '0',
                    "info": "请输入密码"
                })
            } else if (!p.tel) {
                res.json({
                    "result": '0',
                    "info": "请输入联系方式"
                })
            } else {
                let cipher = crypto.createCipher('aes192', 'hjb'),
                    pwd = cipher.update(p.pwd, 'utf8', 'base64')
                pwd += cipher.final('base64')
                let result = mysql_db.query.sync(
                    mysql_db,
                    'UPDATE db_admin SET username=?, password=?, tel=? WHERE id=?',
                    [p.username, pwd, p.tel, p.id]
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

exports.updateAdmin = updateAdmin

/**
 * 删除一个管理员
 * @param id
 */
function delOneAdmin(req, res) {
    Sync(function () {
        try {
            let mysql_db = global.app.get("MysqlConn"),
                id = req.body.id,
                sql = 'DELETE FROM db_admin WHERE id=' + id,
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

exports.delOneAdmin = delOneAdmin

/**
 * 删除多个管理员
 * @param ids (1,2,3……)
 */
function delMoreAdmin(req, res) {
    Sync(function () {
        try {
            let mysql_db = global.app.get("MysqlConn"),
                ids = req.body["ids[]"]

            console.log('debug',ids)

            let sql = 'DELETE FROM db_admin WHERE id in (' + ids + ')',
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

exports.delMoreAdmin = delMoreAdmin