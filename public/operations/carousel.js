'use strict'

window.carousel = window.carousel || {}

carousel.list = {
    /**
     * 轮播图片获取
     * @params   page    默认1 1页10条数据
     * @params   size    取几条数据
     * @params   type    1 小程序    2 PC    3全部
     */
    getCarousel: function (page, size, type) {
        let url = '/carousel/getCarousel'
        if (page === '1') {
            common.ajax(url, {page: page, size: size, type: type}, carousel.list._getCarouselSucc, carousel.list._getCarouselErr)
        } else {
            if (page <= carousel.list.allPage && page > 0) {
                common.ajax(url, {page: page, size: size, type: type}, carousel.list._getCarouselSucc, carousel.list._getCarouselErr)
            }
        }
    },
    _getCarouselSucc: function (res) {
        // console.log(res)
        carousel.list.renderCarousel(res.data.img, res.data.count, res.data.page, res.data.allPage)
        carousel.list.indexPage = res.data.page
        carousel.list.allPage = res.data.allPage
    },
    _getCarouselErr: function (err) {
        console.error(err)
    },
    renderCarousel: function (carousel, count, page, allPage) {
        let temp_list = document.getElementById('carousel_list').innerHTML,
            ejs_list = new EJS({text: temp_list, type: "["}),
            html_list = ejs_list.render({list: carousel})
        $("#carousel").html(html_list)

        let temp_count = document.getElementById('carousel_count').innerHTML,
            ejs_count = new EJS({text: temp_count, type: "["}),
            html_count = ejs_count.render({count: count})
        $("#count").html(html_count)

        let temp_page = document.getElementById('carousel_page').innerHTML,
            ejs_page = new EJS({text: temp_page, type: "["}),
            html_page = ejs_page.render({page: page})
        $("#page").html(html_page)

        let temp_allpage = document.getElementById('carousel_allpage').innerHTML,
            ejs_allpage = new EJS({text: temp_allpage, type: "["}),
            html_allpage = ejs_allpage.render({allPage: allPage})
        $("#allpage").html(html_allpage)
    },

    indexPage: '1',

    allPage: '1',


    /**
     * 轮播图片上传
     * @params   url     上传的图片地址
     * @params   type    1 小程序    2 PC
     * @params   href    外部链接
     * @params   des     描述
     */
    addCarousel: function () {
        let url = "/carousel/addCarousel",
            // img_url = $("#show")[0].src.replace(common.domain,""),
            img_url = $("#show")[0].src,
            type = $("#type option:selected").val(),
            href = $("#href").val(),
            des = $("#des").val()

        common.ajax(url, {url: img_url, type: type, href: href, des: des}, carousel.list._addCarouselSuc, carousel.list._addCarouselErr)
    },
    _addCarouselSuc: function (res) {
        // console.log(res)
        $('.show_result').css('display', 'flex')
        $('.show_result_inner > span').html(res.info)
        setTimeout( function () {
            $('.show_result').css('display', 'none')
        }, 1500)
        if (res.result === '1'){
            $(".show_result_inner > img").attr("src", '/assets/images/onCorrect.gif')
            setTimeout( function () {
                history.go(-1)
                carousel.list.getCarousel('1', '10', '3')
            }, 1500)
        } else {
            $(".show_result_inner > img").attr("src", '/assets/images/onError.gif')
        }
    },
    _addCarouselErr: function (err) {
        console.log(err)
    },

    /**
     * 获取单个轮播图详情
     * @param id
     */
    getOneCarousel: function () {
        let url = "/carousel/getCarouselOne",
            id = window.location.search.replace('?id=',"")
        common.ajax(url, {id: id}, carousel.list._getOneCarouselSuc, carousel.list._getOndCarouselErr)
    },
    _getOneCarouselSuc: function (res) {
        // console.log(res)

        let value = res.data

        $("#show").attr("src", value.url)
        $("#type").val(value.type)
        $("#href").val(value.href)
        $("#des").val(value.des)
    },
    _getOndCarouselErr: function (err) {
        console.log(err)
    },


    /**
     * 编辑轮播图
     * @params   id
     * @params   url     上传的图片地址
     * @params   type    1 小程序    2 PC
     * @params   href    外部链接
     * @params   des     描述
     */
    editCarousel: function () {
        let url = "/carousel/editCarousel",
            // img_url = $("#show")[0].src.replace(common.domain,""),
            img_url = $("#show")[0].src,
            type = $("#type option:selected").val(),
            href = $("#href").val(),
            des = $("#des").val(),
            id = window.location.search.replace('?id=',"")

        common.ajax(url, {id: id, url: img_url, type: type, href: href, des: des}, carousel.list._editCarouselSuc, carousel.list._editCarouselErr)
    },
    _editCarouselSuc: function (res) {
        // console.log(res)
        $('.show_result').css('display', 'flex')
        $('.show_result_inner > span').html(res.info)
        setTimeout( function () {
            $('.show_result').css('display', 'none')
        }, 1500)
        if (res.result === '1'){
            $(".show_result_inner > img").attr("src", '/assets/images/onCorrect.gif')
            setTimeout( function () {
                history.go(-1)
                carousel.list.getCarousel('1', '10', '3')
            }, 1500)
        } else {
            $(".show_result_inner > img").attr("src", '/assets/images/onError.gif')
        }
    },
    _editCarouselErr: function (err) {
        console.log(err)
    },


    /**
     * 删除一张轮播图
     * @param id
     */
    delOneCarousel: function (id) {
        let url = "/carousel/delOneCarousel"

        common.ajax(url, {id: id}, carousel.list._delOnoCarouselSuc, carousel.list._delOneCarouselErr)
    },
    _delOnoCarouselSuc: function (res) {
        // console.log(res)
        $('.show_result').css('display', 'flex')
        $('.show_result_inner > span').html(res.info)
        setTimeout( function () {
            $('.show_result').css('display', 'none')
        }, 1500)
        if (res.result === '1'){
            $(".show_result_inner > img").attr("src", '/assets/images/onCorrect.gif')
            carousel.list.getCarousel('1', '10', '3')
        } else {
            $(".show_result_inner > img").attr("src", '/assets/images/onError.gif')
        }
    },
    _delOneCarouselErr: function (err) {
        console.log(err)
    },


    /**
     * 删除多张轮播图
     * @param ids
     */
    delMoreCarousel: function (ids) {
        let url = "/carousel/delMoreCarousel"

        common.ajax(url, {ids: ids}, carousel.list._delMoreCarouselSuc, carousel.list._delMoreCarouselErr);
    },
    _delMoreCarouselSuc: function (res) {
        // console.log(res)
        $('.show_result').css('display', 'flex')
        $('.show_result_inner > span').html(res.info)
        setTimeout( function () {
            $('.show_result').css('display', 'none')
        }, 1500)
        if (res.result === '1'){
            $(".show_result_inner > img").attr("src", '/assets/images/onCorrect.gif')
            carousel.list.getCarousel('1', '10', '3')
        } else {
            $(".show_result_inner > img").attr("src", '/assets/images/onError.gif')
        }
    },
    _delMoreCarouselErr: function (err) {
        console.log(err)
    }
}