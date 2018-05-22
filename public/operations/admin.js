'use strict'

window.admin = window.admin || {}

admin.list = {
    /**
     * 管理员登录
     * @params   username
     * @params   pwd
     */
    login: function () {
        let url = '/admin/login',
            username = $("#username").val(),
            pwd = $("#pwd").val()

        common.ajax(url, {username: username, pwd: pwd}, admin.list._loginSuc, admin.list._loginErr)
    },
    _loginSuc: function (res) {
        $('#error').html(res.info)
        if (res.result === '1') {
            window.sessionStorage.setItem('user', res.data)
            window.location.href = domain + '/carousel'
        }
    },
    _loginErr: function (err) {
        console.error(err)
    },

    /**
     * 管理员获取
     * @params   page    默认1 1页10条数据
     * @params   size    取几条数据
     */
    getAdmin: function (page, size) {
        let url = '/admin/getAdmin'
        if (page === '1') {
            common.ajax(url, {page: page, size: size}, admin.list._getAdminSucc, admin.list._getAdminErr)
        } else {
            if (page <= admin.list.allPage && page > 0) {
                common.ajax(url, {page: page, size: size}, admin.list._getAdminSucc, admin.list._getAdminErr)
            }
        }
    },
    _getAdminSucc: function (res) {
        // console.log(res)
        admin.list.renderAdmin(res.data.admin, res.data.count, res.data.page, res.data.allPage)
        admin.list.indexPage = res.data.page
        admin.list.allPage = res.data.allPage
    },
    _getAdminErr: function (err) {
        console.error(err)
    },
    renderAdmin: function (admin, count, page, allPage) {
        let temp_list = document.getElementById('admin_list').innerHTML,
            ejs_list = new EJS({text: temp_list, type: "["}),
            html_list = ejs_list.render({list: admin})
        $("#admin").html(html_list)

        let temp_count = document.getElementById('admin_count').innerHTML,
            ejs_count = new EJS({text: temp_count, type: "["}),
            html_count = ejs_count.render({count: count})
        $("#count").html(html_count)

        let temp_page = document.getElementById('admin_page').innerHTML,
            ejs_page = new EJS({text: temp_page, type: "["}),
            html_page = ejs_page.render({page: page})
        $("#page").html(html_page)

        let temp_allpage = document.getElementById('admin_allpage').innerHTML,
            ejs_allpage = new EJS({text: temp_allpage, type: "["}),
            html_allpage = ejs_allpage.render({allPage: allPage})
        $("#allpage").html(html_allpage)
    },

    indexPage: '1',

    allPage: '1',


    /**
     * 添加管理员
     * @params   username     用户名
     * @params   pwd          密码
     * @params   tel          电话号码
     */
    addAdmin: function () {
        let url = "/admin/addAdmin",
            username = $("#username").val(),
            pwd = $("#pwd").val(),
            tel = $("#tel").val()

        common.ajax(url, {username: username, pwd: pwd, tel: tel}, admin.list._addAdminSuc, admin.list._addAdminErr)
    },
    _addAdminSuc: function (res) {
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
                admin.list.getAdmin('1', '10')
            }, 1500)
        } else {
            $(".show_result_inner > img").attr("src", '/assets/images/onError.gif')
        }
    },
    _addAdminErr: function (err) {
        console.log(err)
    },

    /**
     * 获取单个管理员详情
     * @param id
     */
    getOneAdmin: function () {
        let url = "/admin/getAdminOne",
            id = window.location.search.replace('?id=',"")
        common.ajax(url, {id: id}, admin.list._getOneAdminSuc, admin.list._getOndAdminErr)
    },
    _getOneAdminSuc: function (res) {
        // console.log(res)

        let value = res.data

        $("#username").val(value.username).attr("disabled",true)
        $("#pwd").val(value.pwd)
        $("#tel").val(value.tel)
    },
    _getOndAdminErr: function (err) {
        console.log(err)
    },


    /**
     * 编辑管理员
     * @params   id
     * @params   username     用户名
     * @params   pwd          密码
     * @params   tel          电话号码
     */
    editAdmin: function () {
        let url = "/admin/editAdmin",
            username = $("#username").val(),
            pwd = $("#pwd").val(),
            tel = $("#tel").val(),
            id = window.location.search.replace('?id=',"")

        common.ajax(url, {id: id, username: username, pwd: pwd, tel: tel}, admin.list._editAdminSuc, admin.list._editAdminErr)
    },
    _editAdminSuc: function (res) {
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
                admin.list.getAdmin('1', '10')
            }, 1500)
        } else {
            $(".show_result_inner > img").attr("src", '/assets/images/onError.gif')
        }
    },
    _editAdminErr: function (err) {
        console.log(err)
    },


    /**
     * 删除一个管理员
     * @param id
     */
    delOneAdmin: function (id) {
        let url = "/admin/delOneAdmin"

        common.ajax(url, {id: id}, admin.list._delOnoAdminSuc, admin.list._delOneAdminErr)
    },
    _delOnoAdminSuc: function (res) {
        // console.log(res)
        $('.show_result').css('display', 'flex')
        $('.show_result_inner > span').html(res.info)
        setTimeout( function () {
            $('.show_result').css('display', 'none')
        }, 1500)
        if (res.result === '1'){
            $(".show_result_inner > img").attr("src", '/assets/images/onCorrect.gif')
            admin.list.getAdmin('1', '10')
        } else {
            $(".show_result_inner > img").attr("src", '/assets/images/onError.gif')
        }
    },
    _delOneAdminErr: function (err) {
        console.log(err)
    },


    /**
     * 删除多张轮播图
     * @param ids
     */
    delMoreAdmin: function (ids) {
        let url = "/admin/delMoreAdmin"

        common.ajax(url, {ids: ids}, admin.list._delMoreAdminSuc, admin.list._delMoreAdminErr);
    },
    _delMoreAdminSuc: function (res) {
        // console.log(res)
        $('.show_result').css('display', 'flex')
        $('.show_result_inner > span').html(res.info)
        setTimeout( function () {
            $('.show_result').css('display', 'none')
        }, 1500)
        if (res.result === '1'){
            $(".show_result_inner > img").attr("src", '/assets/images/onCorrect.gif')
            admin.list.getAdmin('1', '10')
        } else {
            $(".show_result_inner > img").attr("src", '/assets/images/onError.gif')
        }
    },
    _delMoreAdminErr: function (err) {
        console.log(err)
    }
}