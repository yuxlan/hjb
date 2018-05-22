'use strict'

window.brand = window.brand || {}

brand.list = {
    /**
     * 获取
     * @params   page    默认1 1页10条数据
     */
    getBrand: function (page) {
        let url = '/brand/getBrand'
        if (page === '1') {
            common.ajax(url, {page: page}, brand.list._getBrandSucc, brand.list._getBrandErr)
        } else {
            if (page <= brand.list.allPage && page > 0) {
                common.ajax(url, {page: page}, brand.list._getBrandSucc, brand.list._getBrandErr)
            }
        }
    },
    _getBrandSucc: function (res) {
        // console.log(res)
        brand.list.renderBrand(res.data.brand, res.data.count, res.data.page, res.data.allPage)
        brand.list.indexPage = res.data.page
        brand.list.allPage = res.data.allPage
    },
    _getBrandErr: function (err) {
        console.error(err)
    },
    renderBrand: function (brand, count, page, allPage) {
        let temp_list = document.getElementById('brand_list').innerHTML,
            ejs_list = new EJS({text: temp_list, type: "["}),
            html_list = ejs_list.render({list: brand})
        $("#brand").html(html_list)

        let temp_count = document.getElementById('brand_count').innerHTML,
            ejs_count = new EJS({text: temp_count, type: "["}),
            html_count = ejs_count.render({count: count})
        $("#count").html(html_count)

        let temp_page = document.getElementById('brand_page').innerHTML,
            ejs_page = new EJS({text: temp_page, type: "["}),
            html_page = ejs_page.render({page: page})
        $("#page").html(html_page)

        let temp_allpage = document.getElementById('brand_allpage').innerHTML,
            ejs_allpage = new EJS({text: temp_allpage, type: "["}),
            html_allpage = ejs_allpage.render({allPage: allPage})
        $("#allpage").html(html_allpage)
    },

    indexPage: '1',

    allPage: '1',


    /**
     * 新加
     * @params   name
     * @params   logo
     * @params   des
     */
    addBrand: function () {
        let url = "/brand/addBrand",
            logo = $("#show")[0].src,
            name = $("#name").val(),
            des = $("#des").val()

        common.ajax(url, {name: name, logo: logo, des: des}, brand.list._addBrandSuc, brand.list._addBrandErr)
    },
    _addBrandSuc: function (res) {
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
                brand.list.getBrand('1')
            }, 1500)
        } else {
            $(".show_result_inner > img").attr("src", '/assets/images/onError.gif')
        }
    },
    _addBrandErr: function (err) {
        console.log(err)
    },


    /**
     * 获取单个详情
     * @params  id
     */
    getOneBrand: function () {
        let url = "/brand/getBrandOne",
            id = window.location.search.replace('?id=',"")
        common.ajax(url, {id: id}, brand.list._getOneBrandSuc, brand.list._getOndBrandErr)
    },
    _getOneBrandSuc: function (res) {
        // console.log(res)

        let value = res.data

        $("#show").attr("src", value.logo)
        $("#name").val(value.name)
        $("#des").val(value.des)
    },
    _getOndBrandErr: function (err) {
        console.log(err)
    },


    /**
     * 编辑
     * @params   name
     * @params   logo
     * @params   des
     */
    editBrand: function () {
        let url = "/brand/editBrand",
            logo = $("#show")[0].src,
            name = $("#name").val(),
            des = $("#des").val(),
            id = window.location.search.replace('?id=',"")

        common.ajax(url, {id: id, name: name, logo: logo, des: des}, brand.list._editBrandSuc, brand.list._editBrandErr)
    },
    _editBrandSuc: function (res) {
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
                brand.list.getBrand('1')
            }, 1500)
        } else {
            $(".show_result_inner > img").attr("src", '/assets/images/onError.gif')
        }
    },
    _editBrandErr: function (err) {
        console.log(err)
    },


    /**
     * 删除一个
     * @param id
     */
    delOneBrand: function (id) {
        let url = "/brand/delOneBrand"

        common.ajax(url, {id: id}, brand.list._delOnoBrandSuc, brand.list._delOneBrandErr)
    },
    _delOnoBrandSuc: function (res) {
        // console.log(res)
        $('.show_result').css('display', 'flex')
        $('.show_result_inner > span').html(res.info)
        setTimeout( function () {
            $('.show_result').css('display', 'none')
        }, 1500)
        if (res.result === '1'){
            $(".show_result_inner > img").attr("src", '/assets/images/onCorrect.gif')
            brand.list.getBrand('1', '10', '3')
        } else {
            $(".show_result_inner > img").attr("src", '/assets/images/onError.gif')
        }
    },
    _delOneBrandErr: function (err) {
        console.log(err)
    },


    /**
     * 删除多个
     * @param ids (1,2,3……)
     */
    delMoreBrand: function (ids) {
        let url = "/brand/delMoreBrand"

        common.ajax(url, {ids: ids}, brand.list._delMoreBrandSuc, brand.list._delMoreBrandErr);
    },
    _delMoreBrandSuc: function (res) {
        // console.log(res)
        $('.show_result').css('display', 'flex')
        $('.show_result_inner > span').html(res.info)
        setTimeout( function () {
            $('.show_result').css('display', 'none')
        }, 1500)
        if (res.result === '1'){
            $(".show_result_inner > img").attr("src", '/assets/images/onCorrect.gif')
            brand.list.getBrand('1', '10', '3')
        } else {
            $(".show_result_inner > img").attr("src", '/assets/images/onError.gif')
        }
    },
    _delMoreBrandErr: function (err) {
        console.log(err)
    }
}