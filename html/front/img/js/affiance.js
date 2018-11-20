


/*var urlInfo = window.location.href;//获取url
var urlType = window.location.href.split("?")[1].split("&")[0].split("=")[1];
var urlTitle = window.location.href.split("?")[1].split("&")[1].split("=")[1];*/


/*console.log(globalSel.urlInfo);
console.log(globalSel.urlTitle);
console.log(globalSel.urlTitle);*/


/*var globalSel = {
    status: '',
    year: '',
    money: '',
    direction: '',
    sortName: 1,
    sortOrder: false,
    searchValue: '',
    type: ''
}*/


//信托产品列表
/*function loadData(currPage, pageSize, sortColumn, sortBoolean, type, searchValue){
/!*    globalSel.status = globalSel.status || 0;
    globalSel.year = globalSel.year || 0;
    globalSel.money = globalSel.money || 0;
    globalSel.direction = globalSel.direction || 0;*!/
    $.ajax({
        type: "get",
        url: config.xintuo_url + "/trustProducts/search?&status="+globalSel.status+"&year="+globalSel.year+"&money="+globalSel.money+"&direction="+globalSel.direction,
        contentType: "application/json; charset=utf-8",
        data: {
            "pageNum": currPage,
            "pageSize": pageSize,
            "sortColumn": sortColumn,
            "sortBoolean": sortBoolean,
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
                    html += '<tr><td  class="bh textleft"><a class="xt-prname textOver" href="javascript:;" target="_blank">'+item.title+'</a></td><td class="textleft">'+affianceStatusVal+'</td><td class="colredd"><span>'+item.minIncome+'</span>-<span>'+item.maxIncome+'</span>%</td><td>'+item.term+"个月"+'</td><td>'+item.investmentAreasName+'</td><td>'+item.interest+'</td><td>'+item.popularCount+'</td><td><a class="xintuopdt-check" href="javascript:;" data-id='+item.id+' target="_blank">预约</a></td></tr>'
                });
            }

            $(".affiance-list").html(html);
            $("#pagination").whjPaging("setPage", affiancePagination.current, affiancePagination.pages);

        }
    })
};*/


// loadData(1, 20, 1, false, 4, getQueryString('title'));
loadData(1, 20, "", false, 4, globalSel.urlTitle);

//信托产品搜索
/*function searchProduct(){
    globalSel.type = $(".xintuo-copy-val").attr("data-type");
    globalSel.searchValue = $(".search-value").val();
    console.log(globalSel.type);
    loadData(1, 20, 1, false, globalSel.type, globalSel.searchValue);
}*/



/*//募集状态
$(".affiance-status").on('click', 'a', function(){
    globalSel.status = $(this).attr('affiance-status');
    $(this).addClass("on").parent().siblings().find('a').removeClass("on");
    console.log(globalSel.status);
    searchProduct();
});

//投资期限
$(".affiance-year").on('click', 'a', function(){
    globalSel.year = $(this).attr('affiance-year');
    $(this).addClass("on").parent().siblings().find('a').removeClass("on");
    console.log(globalSel.year);
    searchProduct();
});

//起投金额
$(".affiance-money").on('click', 'a', function(){
    globalSel.money = $(this).attr('affiance-money');
    $(this).addClass("on").parent().siblings().find('a').removeClass("on");
    console.log(globalSel.money);
    searchProduct();
});

//投资方向
$(".affiance-direction").on('click', 'a', function(){
    globalSel.direction = $(this).attr('affiance-direction');
    $(this).addClass("on").parent().siblings().find('a').removeClass("on");
    console.log(globalSel.direction);
    searchProduct();
});*/

/*
var searchVal = $(".search-value").val();
console.log(getQueryString('title'));
//募集状态
if(!getQueryString('title')){
    console.log(1)
    productSelect(".affiance-status", 'affiance-status', 4, searchVal);
}else{
    console.log(2)
    productSelect(".affiance-status", 'affiance-status', 4, encodeURIComponent(getQueryString('title')));
}
*/



//募集状态
productSelect(".affiance-status", 'affiance-status', 4, globalSel.urlTitle);

//投资期限
productSelect(".affiance-year", 'affiance-year', 4, globalSel.urlTitle);

//起投金额
productSelect(".affiance-money", 'affiance-money', 4, globalSel.urlTitle);

//投资方向
productSelect(".affiance-direction", 'affiance-direction', 4, globalSel.urlTitle);



//传递产品列表相应的类型id;
$('.affiance-list, .xintuo-product').on('click','.xintuopdt-check',function  (event) {
    var affianceId = $(this).data('id');
    console.log(affianceId);
    window.open('./productdata.html?id='+affianceId);
});

//传递产品列表相应的类型id;  属于a链接标签的
$('.xintuo-product, .affiance-list').on('click','.xintuohead-href',function  (event) {
    var affianceId = $(this).data('id');
    console.log(affianceId);
    window.open('./productdata.html?id='+affianceId);
});

/**
 *  排序函数
 *  */
/*function orderFun(th, columnName) {
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
        loadData(1, 20, globalSel.sortName, globalSel.sortOrder);
    } else if(self.attr("order-status") == "true") {
        self.attr("order-status", "false");
        $(th).siblings().attr("order-status", "");
        globalSel.sortOrder = "false";
        selfImark.removeClass("fa-angle-up").addClass("fa-angle-down");
        loadData(1, 20, globalSel.sortName, globalSel.sortOrder);
    } else {
        self.attr("order-status", "true");
        $(th).siblings().attr("order-status", "");
        globalSel.sortOrder="true";
        selfImark.removeClass("fa-angle-down").addClass("fa-angle-up");
        loadData(1, 20, globalSel.sortName, globalSel.sortOrder);
    }
}*/









