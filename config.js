import DB_CONFIG from './DBConfig'

let AppConfig = {}

//  mysql数据库配置
AppConfig.DB_CONFIG = DB_CONFIG


//  访问域名
AppConfig.domain = 'http://127.0.0.1:8080'


//  默认存入数据库的头像和图片
AppConfig.headImg = AppConfig.domain + '/uploads/default/20180226786208374011345.jpg'
AppConfig.imgUrl = AppConfig.domain + '/uploads/default/20180227082733974944.jpg'


//  转化为常规年月日
function temp_format(temp) {
    let year = temp.getFullYear()
    let month = ((temp.getMonth() + 1) < 10) ? '0' + (temp.getMonth() + 1) : (temp.getMonth() + 1)
    let day = (temp.getDate() < 10) ? '0' + temp.getDate() : temp.getDate()

    let hour = (temp.getHours() < 10) ? '0' + temp.getHours() : temp.getHours()
    let minute = (temp.getMinutes() < 10) ? '0' + temp.getMinutes() : temp.getMinutes()
    let second = (temp.getSeconds() < 10) ? '0' + temp.getSeconds() : temp.getSeconds()

    return year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second
}
AppConfig.format = function (date) {
    let temp = new Date(date.getTime() - 8 * 60 * 60 * 1000)
    return temp_format(temp)
}
AppConfig.format_1 = function (date) {
    let temp = new Date(date - 8 * 60 * 60 * 1000)
    return temp_format(temp)
}


module.exports = AppConfig