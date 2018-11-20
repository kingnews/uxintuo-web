


//动态加载产品列表
loadData(1, 20, "", false, 7, globalSel.urlTitle);


//传递产品列表相应的类型id;
$('.affiance-list, .private-product').on('click','.xintuopdt-check',function  (event) {
    var affianceId = $(this).data('id');
    console.log(affianceId);
    window.open('./productdata.html?id='+affianceId+'');
});

//传递产品列表相应的类型id;  属于a链接标签的
$('.affiance-list, .private-product').on('click','.xintuohead-href',function  (event) {
    var affianceId = $(this).data('id');
    console.log(affianceId);
    window.open('./productdata.html?id='+affianceId);
});


//募集状态
productSelect(".affiance-status", 'affiance-status', 7, globalSel.urlTitle);

//投资期限
productSelect(".affiance-year", 'affiance-year', 7, globalSel.urlTitle);

//起投金额
productSelect(".affiance-money", 'affiance-money', 7, globalSel.urlTitle);

//投资方向
productSelect(".affiance-direction", 'affiance-direction', 7, globalSel.urlTitle);