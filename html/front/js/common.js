
//全局配置地址
var config = {
    xintuo_url: ''
}

//全局配置函数
var globalSel = {
    status: '',
    year: '',
    money: '',
    direction: '',
    sortName: 1,
    sortOrder: false,
    searchValue: '',
    type: '',
    //判断搜索框input是否被点击过，如果被点击过，那么以后默认取值都是搜索框的值，而不是地址栏的值；
    productFlag: 0,
    //获取url地址
    urlInfo: '',
    //获取url地址的type类名
    urlType: '',
    //获取url地址的title标题
    urlTitle: ''
}


globalSel.urlInfo = window.location.href;//获取url
if(globalSel.urlInfo.indexOf("?") != -1){
    // console.log(1);
    globalSel.urlType = window.location.href.split("?")[1].split("&")[0].split("=")[1];
    globalSel.urlTitle = decodeURIComponent(window.location.href.split("?")[1].split("&")[1].split("=")[1]);
}else{
    // console.log(2);
}


//产品列表展示公共方法
function loadData(currPage, pageSize, sortColumn, sortBoolean, type, searchValue){
    /*    globalSel.status = globalSel.status || 0;
        globalSel.year = globalSel.year || 0;
        globalSel.money = globalSel.money || 0;
        globalSel.direction = globalSel.direction || 0;*/
    $.ajax({
        type: "get",
        url: config.xintuo_url + "/trustProducts/search?&status="+globalSel.status+"&year="+globalSel.year+"&money="+globalSel.money+"&direction="+globalSel.direction,
        contentType: "application/json; charset=utf-8",
        crossDomain: true == !(document.all),
        data: {
            "pageNum": currPage,
            "pageSize": pageSize,
            "sortColumn": sortColumn,
            "sort": sortBoolean,
            "type": type,
            "title": searchValue
        },
        success: function(data){
            var html = '';
            var affiancePagination = data.data;
            var affianceRecords = data.data.records;

            if(affianceRecords == '' || affianceRecords == null) {
                html+='<li class="examineList text-align">到底了，没有数据了</li>';
                // $(".xintuopdt-table").append('<tbody class="text-align"><tr><td>到底了，没有数据了</td></tr></tbody>');
            } else {
                $.each(affianceRecords, function(i, item){
                    var affianceStatus = item.status;
                    var affianceStatusVal = '';
                    switch (affianceStatus){
                        case 0:
                            affianceStatusVal = '不限';
                            break;
                        case 1:
                            affianceStatusVal = '在售';
                            break;
                        case 2:
                            affianceStatusVal = '售罄';
                            break;
                        default:
                            affianceStatusVal = '不限';
                            break;

                    }
                    html += '<tr><td  class="bh textleft"><a class="xt-prname textOver xintuohead-href" data-id='+item.id+' href="javascript:;">'+item.title+'</a></td><td class="">'+affianceStatusVal+'</td><td class="colredd f16"><span>'+item.minIncome+"%"+'</span>-<span>'+item.maxIncome+'</span>%</td><td>'+item.term+"个月"+'</td><td>'+item.investmentAreasName+'</td><td>'+item.interest+'</td><td>'+item.popularCount+'</td><td><span class="xintuopdt-check cursor"  data-id='+item.id+'>预约</span></td><td></td></tr>'
                });
            }
            // loadData(1, 8, 1, false, 4);
            if(pageSize == 8 && type == 4){
                $(".affiance-list-affiance").html(html);
            }else if(pageSize == 8 && type == 5){
                $(".affiance-list-ziguan").html(html);
            }else if(pageSize == 8 && type == 6){
                $(".affiance-list-foundation").html(html);
            }else{
                $(".affiance-list").html(html);
                $("#pagination").whjPaging("setPage", affiancePagination.current, affiancePagination.pages);
            }

            //搜索字段的回显
            $(".search-text-color").text(searchValue);

            //搜索栏input框的回显；
     /*       console.log('aa');
            $(".search-value-affiance").text(searchValue);*/

            /*$(".affiance-list").html(html);
            $("#pagination").whjPaging("setPage", affiancePagination.current, affiancePagination.pages);*/

        }
    })
};



//产品搜索公共方法
function searchProduct($this){
    // globalSel.productFlag = 1;
    // console.log($this);
    var menuNavbar = $(".menu-navbar").children('.hover').attr('data-nav');
    globalSel.type = $(".xintuo-copy-val").attr("data-type");
    globalSel.searchValue = $(".search-value").val();
    console.log(typeof menuNavbar);
    // console.log(typeof globalSel.type);
    // console.log(globalSel.searchValue);
    // return false;
    if(menuNavbar == globalSel.type){
        // console.log("aaa");
        loadData(1, 20, "", false, globalSel.type, globalSel.searchValue);
    }else{
        // console.log("bbb");
        if(globalSel.type == ''){
            // console.log("ccc");
            // window.open('./index.html?type='+globalSel.type+'&title='+globalSel.searchValue);
            window.location.replace('./index.html?type='+globalSel.type+'&title='+encodeURIComponent(globalSel.searchValue));
        }else if(globalSel.type == 4){
            // console.log("ddd");
            // window.open('./affiance.html?type='+globalSel.type+'&title='+globalSel.searchValue);
            // window.location.replace(encodeURI('./affiance.html?type='+globalSel.type+'&title='+globalSel.searchValue));
            window.location.replace('./affiance.html?type='+globalSel.type+'&title='+encodeURIComponent(globalSel.searchValue));
        }else if(globalSel.type == 5){
            // window.open('./ziguan.html?type='+globalSel.type+'&title='+globalSel.searchValue);
            window.location.href = './ziguan.html?type='+globalSel.type+'&title='+encodeURIComponent(globalSel.searchValue);
        }else if(globalSel.type == 6){
            // window.open('./foundation.html?type='+globalSel.type+'&title='+globalSel.searchValue);
            window.location.href = './foundation.html?type='+globalSel.type+'&title='+encodeURIComponent(globalSel.searchValue);
        }else if(globalSel.type == 7){
            // window.open('../governmentdebt.html?type='+globalSel.type+'&title='+globalSel.searchValue);
            window.location.href = './governmentdebt.html?type='+globalSel.type+'&title='+encodeURIComponent(globalSel.searchValue);
        }else if(globalSel.type == 13){
            // window.open('./stock.html?type='+globalSel.type+'&title='+globalSel.searchValue);
            window.location.href = './stock.html?type='+globalSel.type+'&title='+encodeURIComponent(globalSel.searchValue);
        }else if(globalSel.type == 14){
            // window.open('./assurance.html?type='+globalSel.type+'&title='+globalSel.searchValue);
            window.location.href = './assurance.html?type='+globalSel.type+'&title='+encodeURIComponent(globalSel.searchValue);
        }
    }

    // return false;

    // loadData(1, 20, 1, false, globalSel.type, globalSel.searchValue);
}


document.onkeyup = function (e) {
    if (window.event)//如果window.event对象存在，就以此事件对象为准
        e = window.event;
    var code = e.charCode || e.keyCode;
    if (code == 13) {
        //此处编写用户敲回车后的代码
        searchProduct();
    }
}


function productSelect(productClass, productId, productTypeId, productTitle){
    //募集状态
    $(productClass).on('click', 'a', function(){
        var thisParentSibling = $(this).parent().parent().siblings('h3').attr('product-select');
        var productIdVal = $(this).attr(productId);
        //搜索字段的值
        var searchVal = $(".search-value").val();
        // console.log(productIdVal);
        // console.log(thisParentSibling);
        switch (Number(thisParentSibling)){
            case 1:
                globalSel.status = productIdVal;
                break;
            case 2:
                globalSel.year = productIdVal;
                break;
            case 3:
                globalSel.money = productIdVal;
                break;
            case 4:
                globalSel.direction = productIdVal;
                break;
        }

        if(!searchVal && globalSel.productFlag == 0){
            console.log(productTitle);
            productTitle= globalSel.urlTitle;
        }else{
            console.log(11);
            productTitle = searchVal;
            // console.log(productTitle);
        }


        $(this).addClass("on").parent().siblings().find('a').removeClass("on");
        loadData(1, 20, "", false, productTypeId, productTitle);
    });
}

/*//募集状态
$(".affiance-status").on('click', 'a', function(){
    globalSel.status = $(this).attr('affiance-status');
    $(this).addClass("on").parent().siblings().find('a').removeClass("on");
    loadData(1, 20, 1, false);
});

//投资期限
$(".affiance-year").on('click', 'a', function(){
    globalSel.year = $(this).attr('affiance-year');
    $(this).addClass("on").parent().siblings().find('a').removeClass("on");
    loadData(1, 20, 1, false);
});

//起投金额
$(".affiance-money").on('click', 'a', function(){
    globalSel.money = $(this).attr('affiance-money');
    $(this).addClass("on").parent().siblings().find('a').removeClass("on");
    loadData(1, 20, 1, false);
});

//投资方向
$(".affiance-direction").on('click', 'a', function(){
    globalSel.direction = $(this).attr('affiance-direction');
    $(this).addClass("on").parent().siblings().find('a').removeClass("on");
    loadData(1, 20, 1, false);
});*/





//搜索框隐藏显示
$("#showHideSel").on("click", function(){
    var searchIpt = $(".xintuopdt-search-select-div").css("display");
    if(searchIpt == "block"){
        $(".xintuopdt-search-select-div").css({"display":"none"});
        $(".downmove").attr('src', './img/downmove.png');
    }else{
        $(".xintuopdt-search-select-div").css({"display":"block"});
        $(".downmove").attr('src', './img/upmove.png');
    }
});

//根据下拉框指定搜索内容
$(".xintuopdt-search-select-ul").on('click', 'li', function(){
    var xintuopdtVal = $(this).text();
    var xintuopdtId = $(this).data('type');
    $(".xintuo-copy-val").text(xintuopdtVal).attr("data-type",xintuopdtId);
});


//判断滚动条的滚动距离
/*
    var scrollTopBet = $(window).scrollTop();
    console.log(scrollTopBet);
    console.log(typeof scrollTopBet);
    if(scrollTopBet >= 500){
        $(".slideUp").removeClass("disnone");
    }else{
        $(".slideUp").addClass("disnone");
    };
*/


//隐藏导航栏显示关闭设置
$(function() {
    $(window).scroll(function() {
        var scrollTopBet = $(window).scrollTop();
        if(scrollTopBet >= 300){
            $(".slideUp").removeClass("disnone");
        }else{
            $(".slideUp").addClass("disnone");
        }
    });
});


//信托热门产品接口公共方法
function hotProduct(productList, typeId){
    $.ajax({
        type: "get",
        url: config.xintuo_url + "/trustProducts/hot?pageNum=1&pageSize=4",
        contentType: "application/json; charset=utf-8",
        crossDomain: true == !(document.all),
        data: {
            "type": typeId
        },
        success: function(data){
            console.log(data);
            var xintuoRecords = data.data;
            var html = '';
            if(xintuoRecords == '' || xintuoRecords == null) {
                html+='<li class="examineList">到底了</li>';
            } else {
                $.each(xintuoRecords, function(i, item) {
                    /*var minIncomeVal = undefined;
                    var testVal = minIncomeVal != undefined ? minIncomeVal: '';*/
                    // console.log(testVal);
                    html += '<li class="no-bright"><h4 class="f24 relative bank-product-tt clearfix mt30"><span class="textOver"><a title="'+item.title+'" class="xintuohead-href" data-id='+item.id+' class="col333" href="javascript:;">'+item.title+'</a></span></h4><div class="bank-product-mnc"><div><p class="bank-product-nbr f48 col336699 tac"><span>'+item.minIncome+'<em class="f24">%</em></span>'+"-"+'<span>'+item.maxIncome+'<em class="f24">'+"%"+'</em></span></p><p class="f14 col9c tac">预期年化收益率</p></div><div class="tar bank-product-keyword f14 tac"><span class="mr25">'+item.term+'个月</span><span>'+item.investmentAreasName+'</span> </div><div class="clear"></div></div><span class="bank-product-yy tac xintuopdt-check cursor" data-id='+item.id+'>预约</span></li>'
                });
            }
            $(productList).html(html);
        }
    })
}

//推荐产品接口公共方法
function recommendProduct(productList, typeId, itemNumber){
    $.ajax({
        type: "get",
        url: config.xintuo_url + "/trustProducts/recommend?pageNum=1&pageSize="+itemNumber,
        contentType: "application/json; charset=utf-8",
        crossDomain: true == !(document.all),
        data: {
            "type": typeId
        },
        success: function(data){
            console.log(data);
            var xintuoRecords = data.data;
            var html = '';
            if(xintuoRecords == '' || xintuoRecords == null) {
                html+='<li class="examineList">到底了</li>';
            } else {
                $.each(xintuoRecords, function(i, item) {
                    html += '<li class="no-bright"><h4 class="f24 relative bank-product-tt clearfix mt30"><span class="textOver"><a class="xintuohead-href" title="'+item.title+'" data-id='+item.id+' class="col333" href="javascript:;">'+item.title+'</a></span></h4><div class="bank-product-mnc"><div><p class="bank-product-nbr f48 col336699 tac"><span>'+item.minIncome+'<em class="f24">%</em></span>'+"-"+'<span>'+item.maxIncome+'<em class="f24">'+"%"+'</em></span></p><p class="f14 col9c tac">预期年化收益率</p></div><div class="tar bank-product-keyword f14 tac"><span class="mr25">'+item.term+'个月</span><span>'+item.investmentAreasName+'</span> </div><div class="clear"></div></div><span class="bank-product-yy tac xintuopdt-check cursor" data-id='+item.id+'>预约</span></li>'
                });
            }
            $(productList).html(html);
        }
    })
}



//js获取url参数
function getQueryString(name) {
    var reg = new RegExp("(^|&)" + decodeURI(name) + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if(r != null) return unescape(r[2]);
    return '';
}



//不准输入特殊字符        input中添加 onkeyup="onKeyUpButton(this)"
function onKeyUpButton($obj){
    //alert($obj);
    $obj.value=$obj.value.replace(/[^\a-\z\A-\Z\0-9\u4E00-\u9FA5\@\.\。\?\？\,\，]/g,'');
    $obj.onpaste = "return false";
    $obj.oncontextmenu = "return false";
    $obj.autocomplete= "off";
}



/**
 *  排序函数
 *  */
function orderFun(th, columnName, typeId, pageSize) {
    globalSel.sortName = columnName;
    var self = $(th);
    var selfImark = $(th).children('i');
    var selSibCdn = $(th).siblings().children('i');
    selSibCdn.removeClass("fa-angle-up").addClass("fa-sort");
    selSibCdn.removeClass("fa-angle-down").addClass("fa-sort");
    if(self.attr("order-status") == "") {
        self.attr("order-status", "false");
        $(th).siblings().attr("order-status", "");
        globalSel.sortOrder = "false";
        selfImark.removeClass("fa-angle-up").addClass("fa-angle-down");
        if((typeId == 4 && pageSize == 8) || (typeId == 5 && pageSize == 8) || (typeId == 6 && pageSize == 8)){
            // console.log(1);
            loadData(1, 8, globalSel.sortName, globalSel.sortOrder, typeId);
        }else{
            // console.log(1);
            loadData(1, 20, globalSel.sortName, globalSel.sortOrder, typeId);
        }
    } else if(self.attr("order-status") == "true") {
        self.attr("order-status", "false");
        $(th).siblings().attr("order-status", "");
        globalSel.sortOrder = "false";
        selfImark.removeClass("fa-angle-up").addClass("fa-angle-down");
        // loadData(1, 20, globalSel.sortName, globalSel.sortOrder, typeId);
        if((typeId == 4 && pageSize == 8) || (typeId == 5 && pageSize == 8) || (typeId == 6 && pageSize == 8)){
            // console.log(1);
            loadData(1, 8, globalSel.sortName, globalSel.sortOrder, typeId);
        }else{
            // console.log(1);
            loadData(1, 20, globalSel.sortName, globalSel.sortOrder, typeId);
        }
    } else {
        self.attr("order-status", "true");
        $(th).siblings().attr("order-status", "");
        globalSel.sortOrder="true";
        selfImark.removeClass("fa-angle-down").addClass("fa-angle-up");
        // loadData(1, 20, globalSel.sortName, globalSel.sortOrder, typeId);
        if((typeId == 4 && pageSize == 8) || (typeId == 5 && pageSize == 8) || (typeId == 6 && pageSize == 8)){
            loadData(1, 8, globalSel.sortName, globalSel.sortOrder, typeId);
        }else{
            loadData(1, 20, globalSel.sortName, globalSel.sortOrder, typeId);
        }
    }
}










