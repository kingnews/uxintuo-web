


//动态加载产品列表
loadData(1, 20, "", false, 5, globalSel.urlTitle);


//传递产品列表相应的类型id;
$('.affiance-list, .ziguan-product').on('click','.xintuopdt-check',function  (event) {
    var affianceId = $(this).data('id');
    console.log(affianceId);
    window.open('./productdata.html?id='+affianceId+'');
});

//传递产品列表相应的类型id;  属于a链接标签的
$('.affiance-list, .ziguan-product').on('click','.xintuohead-href',function  (event) {
    var affianceId = $(this).data('id');
    console.log(affianceId);
    window.open('./productdata.html?id='+affianceId);
});


//募集状态
productSelect(".affiance-status", 'affiance-status', 5, globalSel.urlTitle);

//投资期限
productSelect(".affiance-year", 'affiance-year', 5, globalSel.urlTitle);

//起投金额
productSelect(".affiance-money", 'affiance-money', 5, globalSel.urlTitle);

//投资方向
productSelect(".affiance-direction", 'affiance-direction', 5, globalSel.urlTitle);