


loadData(1, 8, "", false, 4);
loadData(1, 8, "", false, 5);
loadData(1, 8, "", false, 6);

loadData(1, 20, "", false, '', globalSel.urlTitle);

//传递产品列表相应的类型id;
$('.affiance-list-affiance, .affiance-list-ziguan, .affiance-list-foundation, .affiance-list, .home-list').on('click','.xintuopdt-check',function  (event) {
    var affianceId = $(this).data('id');
    console.log(affianceId);
    window.open('./productdata.html?id='+affianceId);
});

//传递产品列表相应的类型id;  属于a链接标签的
$('.affiance-list-affiance, .affiance-list-ziguan, .affiance-list-foundation, .affiance-list, .home-list').on('click','.xintuohead-href',function  (event) {
    var affianceId = $(this).data('id');
    console.log(affianceId);
    window.open('./productdata.html?id='+affianceId);
});


//募集状态
productSelect(".affiance-status", 'affiance-status', '', globalSel.urlTitle);

//投资期限
productSelect(".affiance-year", 'affiance-year', '', globalSel.urlTitle);

//起投金额
productSelect(".affiance-money", 'affiance-money', '', globalSel.urlTitle);

//投资方向
productSelect(".affiance-direction", 'affiance-direction', '', globalSel.urlTitle);


//信托热门产品接口
/*
function hotProduct(){
    $.ajax({
        type: "post",
        url: config.xintuo_url + "/trustProducts/hot?pageNum=1&pageSize=4",
        contentType: "application/json; charset=utf-8",
        data: '',
        success: function(data){
            console.log(data);
            var xintuoRecords = data.data;
            var html = '';
            if(xintuoRecords == '' || xintuoRecords == null) {
                html+='<li class="examineList">到底了</li>';
            } else {
                $.each(xintuoRecords, function(i, item) {
                   html += '<li class="no-bright"><h4 class="f24 relative bank-product-tt clearfix mt54"><span class="textOver"><a target="_blank" title="'+item.title+'" class="col333" href="">'+item.title+'</a></span></h4><div class="bank-product-mnc"><div><p class="bank-product-nbr f48 col336699 tac"><span>'+item.minIncome+'</span>'+"-"+'<span>'+item.maxIncome+'<em class="f24">'+"%"+'</em></span></p><p class="f14 col9c tac">预期年化收益率</p></div><div class="tar bank-product-keyword f14 tac"><span class="mr22">基础设施</span><span>'+item.investmentAreasName+'</span> </div><div class="clear"></div></div><a href="" target="_blank" class="bank-product-yy tac">预约</a></li>'
                });
            }

        $(".xintuo-list").html(html);
        }
    })
}*/
