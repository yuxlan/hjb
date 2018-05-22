'use strict'

const domain = 'http://127.0.0.1:8080'

let common = {
    /**
     * ajax请求获取数据 默认POST请求
     */
    ajax: function (url, data, successback, errorback, arg, type) {
        $.ajax({
            // url: domain + url,
            url: url,
            type: type == undefined ? 'POST' : 'GET',
            cache: false,
            data: data,
            success: function (res) {
                if (!arg) {
                    successback(res)
                } else {
                    successback(res, arg)
                }
            },
            error: function (err) {
                if (!arg) {
                    errorback(err)
                } else {
                    errorback(err, arg)
                }
            }
        })
    },


    /**
     * 上传单图
     */
    upLoad: function (id) {
        let formData = new FormData($("#form")[0])

        let url = "/upload"

        $.ajax({
            url: url,
            type: 'POST',
            data: formData,
            processData: false,
            contentType: false,
            success: function (res) {
                if (res.result === '0') {
                    $('.show_result').css('display', 'flex')
                    $('.show_result_inner > span').html(res.info)
                    $(".show_result_inner > img").attr("src", '/assets/images/onError.gif')
                    setTimeout( function () {
                        $('.show_result').css('display', 'none')
                    }, 1500)
                }
                let src = res.data.new_path
                $("#"+id).attr("src", src)
            },
            error: function (res) {
                console.log(res)
            }
        })
    },


    /**
     * 多图上传
     */
    upLoads: function (div, img, removeImg) {
        let formData = new FormData($("#form")[0])

        let url = "/upload"

        $.ajax({
            url: url,
            type: 'POST',
            data: formData,
            processData: false,
            contentType: false,
            success: function (res) {
                if (res.result === '0') {
                    $('.show_result').css('display', 'flex')
                    $('.show_result_inner > span').html(res.info)
                    $(".show_result_inner > img").attr("src", '/assets/images/onError.gif')
                    setTimeout( function () {
                        $('.show_result').css('display', 'none')
                    }, 1500)
                }
                let src = res.data.new_path
                let img_html = "<span class='imgConInner'><img src='" + src + "' class='"+img+"' style='width: 90px;'><button class='removeBtn' onclick='javascript:removeImg(this)'>x</button></span>"
                div.append(img_html)
            },
            error: function (res) {
                console.log(res)
            }
        })
    }
}