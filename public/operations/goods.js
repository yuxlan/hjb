'use strict'

window.goods = window.goods || {}

goods.list = {
    /**
     * 获取
     * @params   page      默认1 1页10条数据
     * @params   size      取几条数据
     * @params   brandId   品牌Id  0为全部
     */
    getGoods: function (page, size, brandId) {
        let url = '/goods/getGoods'
        if (page === '1') {
            common.ajax(url, {page: page, size: size, brandId: brandId}, goods.list._getGoodsSucc, goods.list._getGoodsErr)
        } else {
            if (page <= goods.list.allPage && page > 0) {
                common.ajax(url, {page: page, size: size, brandId: brandId}, goods.list._getGoodsSucc, goods.list._getGoodsErr)
            }
        }
    },
    _getGoodsSucc: function (res) {
        // console.log(res)
        goods.list.renderGoods(res.data.goods, res.data.count, res.data.page, res.data.allPage)
        goods.list.indexPage = res.data.page
        goods.list.allPage = res.data.allPage
    },
    _getGoodsErr: function (err) {
        console.error(err)
    },
    renderGoods: function (goods, count, page, allPage) {
        let temp_list = document.getElementById('goods_list').innerHTML,
            ejs_list = new EJS({text: temp_list, type: "["}),
            html_list = ejs_list.render({list: goods})
        $("#goods").html(html_list)

        let temp_count = document.getElementById('goods_count').innerHTML,
            ejs_count = new EJS({text: temp_count, type: "["}),
            html_count = ejs_count.render({count: count})
        $("#count").html(html_count)

        let temp_page = document.getElementById('goods_page').innerHTML,
            ejs_page = new EJS({text: temp_page, type: "["}),
            html_page = ejs_page.render({page: page})
        $("#page").html(html_page)

        let temp_allpage = document.getElementById('goods_allpage').innerHTML,
            ejs_allpage = new EJS({text: temp_allpage, type: "["}),
            html_allpage = ejs_allpage.render({allPage: allPage})
        $("#allpage").html(html_allpage)
    },

    indexPage: '1',

    allPage: '1',

    /**
     * 获取品牌
     */
    getBrand: function () {
        let url = '/brand/getBrand'
        common.ajax(url, {}, goods.list._getBrandSucc, goods.list._getBrandErr)
    },
    _getBrandSucc: function (res) {
        // console.log(res)
        let option = '<option value="0">请选择</option>'
        for (let item of res.data.brand) {
            option += "<option value='"+item.id+"'>"+item.name+"</option>"
        }
        $("#bandId").append(option)
    },
    _getBrandErr: function (err) {
        console.error(err)
    },


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
    addGoods: function () {
        let url = "/goods/addGoods",

            name = $("#name").val(),
            des = $("#des").val(),
            brandId = $("#bandId option:selected").val(),
            o_price = $("#oprice").val(),
            m_price = $("#mprice").val(),
            l_price = $("#lprice").val(),
            detail = UE.getEditor('detail').getContent(),
            detailImg = $("#show2")[0].src,
            img = $("#show")[0].src,
            explain = $("#explain").val(),

            temp_tomp = []
        $("input[name='tomp']:checked").each(function() {
            temp_tomp.push($(this).val())
        })
        let tomp = temp_tomp.join(','),

            temp_tst = []
        $("input[name='tst']:checked").each(function() {
            temp_tst.push($(this).val())
        })
        let tst = temp_tst.join(','),

            mss = $("#mss").val(),

            temp_msm = []
        $("input[name='msm']:checked").each(function() {
            temp_msm.push($(this).val())
        })
        let msm = temp_msm.join(','),

            msr = $("#msr").val(),
            spd = $("#spd").val(),
            nb = $("#nb").val(),
            sor = $("#sor").val(),
            osp = $("#osp").val(),

            show1 = $('.show1'),
            showImg = ''
        for (let i = 0; i < show1.length; i++) {
            if (i === 0) {
                showImg = show1[i].src
            } else {
                showImg += ',' + show1[i].src
            }
        }

        common.ajax(url, {name: name, des: des, brandId: brandId, o_price: o_price, m_price: m_price, l_price: l_price, detail: detail, detailImg: detailImg, img: img, showImg: showImg,
            explain: explain, tomp: tomp, tst: tst, mss: mss, msm: msm, msr: msr, spd: spd, nb: nb, sor: sor, osp: osp}, goods.list._addGoodsSuc, goods.list._addGoodsErr)
    },
    _addGoodsSuc: function (res) {
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
                goods.list.getGoods('1', '10', '0')
            }, 1500)
        } else {
            $(".show_result_inner > img").attr("src", '/assets/images/onError.gif')
        }
    },
    _addGoodsErr: function (err) {
        console.log(err)
    },

    /**
     * 获取单个
     * @param id
     */
    getOneGoods: function () {
        let url = "/goods/getGoodsOne",
            id = window.location.search.replace('?id=',"")
        common.ajax(url, {id: id}, goods.list._getOneGoodsSuc, goods.list._getOndGoodsErr)
    },
    _getOneGoodsSuc: function (res) {
        // console.log(res)

        let value = res.data

        $("#name").val(value.name)
        $("#des").val(value.des)
        $("#bandId").val(value.brandId)
        $("#oprice").val(value.o_price)
        $("#mprice").val(value.m_price)
        $("#lprice").val(value.l_price)
        $("#show").attr("src", value.img)
        $("#show2").attr("src", value.detailImg)
        $("#explain").val(value.explain)
        if (value.detail !== ""){
            UE.getEditor('detail').addListener("ready", function () {
                UE.getEditor('detail').setContent(value.detail)
            })
        }

        let temp_tomp = value.tomp.split(','),
            boxes_tomp = $("input[name='tomp']")
        for (let i = 0; i < boxes_tomp.length; i++) {
            for (let j = 0; j < temp_tomp.length; j++) {
                if(boxes_tomp[i].value === temp_tomp[j]){
                    boxes_tomp[i].checked = true
                    break
                }
            }
        }

        let temp_tst = value.tst.split(','),
            boxes_tst = $("input[name='tst']")
        for (let i = 0; i < boxes_tst.length; i++) {
            for (let j = 0; j < temp_tst.length; j++) {
                if(boxes_tst[i].value === temp_tst[j]){
                    boxes_tst[i].checked = true
                    break
                }
            }
        }

        $("#mss").val(value.mss)

        let temp_msm = value.msm.split(','),
            boxes_msm = $("input[name='msm']")
        for (let i = 0; i < boxes_msm.length; i++) {
            for (let j = 0; j < temp_msm.length; j++) {
                if(boxes_msm[i].value === temp_msm[j]){
                    boxes_msm[i].checked = true
                    break
                }
            }
        }

        $("#msr").val(value.msr)
        $("#spd").val(value.spd)
        $("#nb").val(value.nb)
        $("#sor").val(value.sor)
        $("#osp").val(value.osp)

        let img_html = ""
        for (let i = 0; i < value.showImg.split(',').length; i++) {
            img_html += "<span class='imgConInner'><img src='" + value.showImg.split(',')[i] + "' class='show1' style='width: 90px;'><button class='removeBtn' onclick='javascript:removeImg(this)'>x</button></span>"
        }
        $(".imgCon").append(img_html)
    },
    _getOndGoodsErr: function (err) {
        console.log(err)
    },


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
    editGoods: function () {
        let url = "/goods/editGoods",

            name = $("#name").val(),
            des = $("#des").val(),
            brandId = $("#bandId option:selected").val(),
            o_price = $("#oprice").val(),
            m_price = $("#mprice").val(),
            l_price = $("#lprice").val(),
            detail = UE.getEditor('detail').getContent(),
            detailImg = $("#show2")[0].src,
            img = $("#show")[0].src,
            explain = $("#explain").val(),
            id = window.location.search.replace('?id=',""),

            temp_tomp = []
        $("input[name='tomp']:checked").each(function() {
            temp_tomp.push($(this).val())
        })
        let tomp = temp_tomp.join(','),

            temp_tst = []
        $("input[name='tst']:checked").each(function() {
            temp_tst.push($(this).val())
        })
        let tst = temp_tst.join(','),

            mss = $("#mss").val(),

            temp_msm = []
        $("input[name='msm']:checked").each(function() {
            temp_msm.push($(this).val())
        })
        let msm = temp_msm.join(','),

            msr = $("#msr").val(),
            spd = $("#spd").val(),
            nb = $("#nb").val(),
            sor = $("#sor").val(),
            osp = $("#osp").val(),

            show1 = $('.show1'),
            showImg = ''
        for (let i = 0; i < show1.length; i++) {
            if (i === 0) {
                showImg = show1[i].src
            } else {
                showImg += ',' + show1[i].src
            }
        }

        common.ajax(url, {id: id, name: name, des: des, brandId: brandId, o_price: o_price, m_price: m_price, l_price: l_price, detail: detail, detailImg: detailImg, img: img, showImg: showImg,
            explain: explain, tomp: tomp, tst: tst, mss: mss, msm: msm, msr: msr, spd: spd, nb: nb, sor: sor, osp: osp}, goods.list._editGoodsSuc, goods.list._editGoodsErr)
    },
    _editGoodsSuc: function (res) {
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
                goods.list.getGoods('1', '10', '0')
            }, 1500)
        } else {
            $(".show_result_inner > img").attr("src", '/assets/images/onError.gif')
        }
    },
    _editGoodsErr: function (err) {
        console.log(err)
    },


    /**
     * 删除一
     * @param id
     */
    delOneGoods: function (id) {
        let url = "/goods/delOneGoods"

        common.ajax(url, {id: id}, goods.list._delOnoGoodsSuc, goods.list._delOneGoodsErr)
    },
    _delOnoGoodsSuc: function (res) {
        // console.log(res)
        $('.show_result').css('display', 'flex')
        $('.show_result_inner > span').html(res.info)
        setTimeout( function () {
            $('.show_result').css('display', 'none')
        }, 1500)
        if (res.result === '1'){
            $(".show_result_inner > img").attr("src", '/assets/images/onCorrect.gif')
            goods.list.getGoods('1', '10', '0')
        } else {
            $(".show_result_inner > img").attr("src", '/assets/images/onError.gif')
        }
    },
    _delOneGoodsErr: function (err) {
        console.log(err)
    },


    /**
     * 删除多
     * @param ids
     */
    delMoreGoods: function (ids) {
        let url = "/goods/delMoreGoods"

        common.ajax(url, {ids: ids}, goods.list._delMoreGoodsSuc, goods.list._delMoreGoodsErr);
    },
    _delMoreGoodsSuc: function (res) {
        // console.log(res)
        $('.show_result').css('display', 'flex')
        $('.show_result_inner > span').html(res.info)
        setTimeout( function () {
            $('.show_result').css('display', 'none')
        }, 1500)
        if (res.result === '1'){
            $(".show_result_inner > img").attr("src", '/assets/images/onCorrect.gif')
            goods.list.getGoods('1', '10', '0')
        } else {
            $(".show_result_inner > img").attr("src", '/assets/images/onError.gif')
        }
    },
    _delMoreGoodsErr: function (err) {
        console.log(err)
    }
}