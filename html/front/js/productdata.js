// console.log(getQueryString('id'));
// console.log(getQueryString('aaaa'));

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
    type: ''
}

//产品详情列表

//信托产品列表
function detailProduct(){
    $.ajax({
        type: "post",
        url: config.xintuo_url + "/trustProducts/get?id="+getQueryString('id'),
        contentType: "application/json; charset=utf-8",
        crossDomain: true == !(document.all),
  /*      data: {
            id: 44
        },*/
        success: function(data){
            var htmlText = '';
            var htmlDetail = '';
            var productRecords = data.data;
            // console.log(productRecords);
            var productStatus = data.data.status;
            var productTypeId = data.data.typeId;
            var productStatusVal = '';
            var productTypeVal = '';
            switch (productStatus){
                case 0:
                    productStatusVal = '不限';
                    break;
                case 1:
                    productStatusVal = '在售';
                    break;
                case 2:
                    productStatusVal = '售罄';
                    break;
                default:
                    productStatusVal = '不限';
                    break;
            }
            switch (productTypeId){
                case 4:
                    productTypeVal = '信托';
                    break;
                case 5:
                    productTypeVal = '资管';
                    break;
                case 6:
                    productTypeVal = '基金';
                    break;
                case 7:
                    productTypeVal = '私募债';
                    break;
            }
            //预期年化收益率分割数组排序
            var itemIncomeList = productRecords.incomeIntro;
            console.log(itemIncomeList);
            var itemIncomeSpi = itemIncomeList.split("；");
            console.log(itemIncomeSpi);

            var itemScale = (productRecords.scale).replace(new RegExp(";|；","gm"),'；'+'<br />');  //规模
            var itemIncomeIntro = (productRecords.incomeIntro).replace(new RegExp(";|；","gm"),'；'+'<br />');  //业绩比较基准
            var itemRaiseAccount = (productRecords.raiseAccount).replace(new RegExp(";|；","gm"),'；'+'<br />');  //募集账号
            var itemFinancingSubject = (productRecords.financingSubject).replace(new RegExp(";|；","gm"),'；'+'<br />');  //融资主体
            var itemUseOfFunds = (productRecords.useOfFunds).replace(new RegExp(";|；","gm"),'；'+'<br />');  //资金用途
            var itemPaymentSource = (productRecords.paymentSource).replace(new RegExp(";|；","gm"),'；'+'<br />');  //还款来源
            var itemRiskControl = (productRecords.riskControl).replace(new RegExp(";|；","gm"),'；'+'<br />');  //风控措施
            var itemProjectHighlights = (productRecords.projectHighlights).replace(new RegExp(";|；","gm"),'；'+'<br />');  //项目亮点

            if(!productRecords.raiseAccount){productRecords.raiseAccount = '';}
            if(!productRecords.financingSubject){productRecords.financingSubject = '';}
            if(!productRecords.useOfFunds){productRecords.useOfFunds = '';}
            if(!productRecords.paymentSource){productRecords.paymentSource = '';}
            if(!productRecords.riskControl){productRecords.riskControl = '';}
            if(!productRecords.projectHighlights){productRecords.projectHighlights = '';}
            // htmlText += '<tr><td class="tableLable" width="90px">产品名称</td><td width="380px">'+productRecords.title+'</td><td class="tableLable" width="90px">产品状态</td><td width="180px">'+productStatusVal+'</td></tr><tr><td class="tableLable" width="90px">产品期限</td><td width="380px">'+productRecords.term+"个月"+'</td><td class="tableLable" width="90px">付息方式</td><td width="180px">'+productRecords.interest+'</td></tr><tr><td class="tableLable" width="90px">投资领域</td><td width="180px">'+productRecords.investmentAreasName+'</td><td class="tableLable" width="90px">规模</td><td width="380px">'+productRecords.scale+'</td></tr><tr><td class="tableLable" width="120px">业绩比较基准</td><td width="240px"><div>'+productRecords.incomeIntro+'</td></tr>';
            htmlText += '<tr><td class="tableLable pb40  with130" width="149px">产品名称：</td><td width="380px" class="f20">'+productRecords.title+'</td><td class="tableLable" width="120px">产品状态：</td><td width="180px" class="f20">'+productStatusVal+'</td></tr><tr><td class="tableLable" width="90px">产品期限：</td><td width="380px" class="f20">'+productRecords.term+"个月"+'</td><td class="tableLable w110" >付息方式：</td><td width="180px" class="f20">'+productRecords.interest+'</td></tr><tr><td class="tableLable" width="90px">投资领域：</td><td width="180px" class="f20">'+productRecords.investmentAreasName+'</td><td class="tableLable w110 pdl40">规模：</td><td width="380px" class="f20">'+itemScale+'</td></tr>' +
                '<tr>' +
                '<td class="tableLable" width="80px">预期年化<br/>收益率：</td>' +
                '<td width="240px" class="f20">' +
                '<div>投资金额</div>' +
                '<div>'+(itemIncomeSpi[0]?itemIncomeSpi[0]:"")+'</div>' +
                '<div>'+(itemIncomeSpi[2]?itemIncomeSpi[2]:"")+'</div>' +
                '<div>'+(itemIncomeSpi[4]?itemIncomeSpi[4]:"")+'</div>' +
                '<div>'+(itemIncomeSpi[6]?itemIncomeSpi[6]:"")+'</div>' +
                '<div>'+(itemIncomeSpi[8]?itemIncomeSpi[8]:"")+'</div>' +
                '<div>'+(itemIncomeSpi[10]?itemIncomeSpi[10]:"")+'</div>' +
                '</td>' +
                '<td width="240px" class="f20"  colspan="2">' +
                '<div>收益率</div>' +
                '<div>'+(itemIncomeSpi[1]?itemIncomeSpi[1]:"")+'</div>' +
                '<div>'+(itemIncomeSpi[3]?itemIncomeSpi[3]:"")+'</div>' +
                '<div>'+(itemIncomeSpi[5]?itemIncomeSpi[5]:"")+'</div>' +
                '<div>'+(itemIncomeSpi[7]?itemIncomeSpi[7]:"")+'</div>' +
                '<div>'+(itemIncomeSpi[9]?itemIncomeSpi[9]:"")+'</div>' +
                '<div>'+(itemIncomeSpi[11]?itemIncomeSpi[11]:"")+'</div>' +
                '</td>' +
                '</tr>';
            // htmlDetail += '<tr><td class="tableLable" width="90px">募集账号</td><td><p>'+(productRecords.raiseAccount).replace(new RegExp(";|；","gm"),'；'+'<br />')+'</p></td></tr><tr><td class="tableLable">融资主体</td><td>'+productRecords.financingSubject+'</td></tr><tr><td class="tableLable">资金用途</td><td>'+productRecords.useOfFunds+'</td></tr><tr><td class="tableLable">还款来源</td><td>'+productRecords.paymentSource+'</td></tr><tr><td class="tableLable">风控措施</td><td class="lh-25">'+productRecords.riskControl+'</td></tr><tr><td class="tableLable">项目亮点</td><td class="lh-25" id="trust_highlights">'+productRecords.projectHighlights+'</td></tr>';
            htmlDetail += '<tr><td class="tableLable" width="110px">募集账号：</td><td><p>'+itemRaiseAccount+'</p></td></tr><tr><td class="tableLable">融资主体：</td><td>'+itemFinancingSubject+'</td></tr><tr><td class="tableLable">资金用途：</td><td>'+itemUseOfFunds+'</td></tr><tr><td class="tableLable">还款来源：</td><td>'+itemPaymentSource+'</td></tr><tr><td class="tableLable">风控措施：</td><td class="lh-25">'+itemRiskControl+'</td></tr><tr><td class="tableLable">项目亮点：</td><td class="lh-25" id="trust_highlights">'+itemProjectHighlights+'</td></tr>';
            $(".product-htmlText").html(htmlText);
            $(".product-htmlDetail").html(htmlDetail);

            //产品类型和产品名称的判断
            $(".product-typeid").text(productTypeVal);
            $(".product-head").find('.product-item').html('<a class="toptitle product-item color428BCA" href="#" title="'+productRecords.title+'">'+productRecords.title+'</a>');

        }
    })
}
detailProduct();


//预约产品
$(".come-appointment").on('click', function(){
    var appName = $(".appointment-name").val().trim();
    var appPhone = $(".appointment-phone").val().trim();
    if(!appName){
        layer.msg('请输入用户名', {
            icon : 2
        });
        return false ;
    };
    if( appName.length > 20 || appName.length < 1){
        layer.msg('用户名应该在1-20个字符之间', {
            icon : 2
        });
        return false ;
    };
    if(!appPhone){
        layer.msg('请输入您的联系方式', {
            icon : 2
        });
        return false ;
    };
    if(appName == '您的姓名' && appPhone == '您的联系电话/微信/qq'){
        layer.msg('请输入用户名', {
            icon : 2
        });
        return false ;
    }
    if(appName == '您的姓名'){
        layer.msg('请输入用户名', {
            icon : 2
        });
        return false ;
    }
    if(appPhone == '您的联系电话/微信/qq'){
        layer.msg('请输入您的联系方式', {
            icon : 2
        });
        return false ;
    }
    
//   layer.msg("预约成功，稍后会有工作人员与您联系！！", {icon: 2, time: 10000, btn: ['好的']});

    $.ajax({
        type: 'get',
        url: config.xintuo_url + "/trustProducts/order?productId="+getQueryString('id'),
        contentType: "application/json; charset=utf-8",
        data: {
            "name": appName,
            "phone": appPhone
        },
        success: function (data) {
            // console.log(data);

            if(data.code == 0){
                layer.msg("预约成功，稍后会有工作人员与您联系！！", {icon: 2, time: 10000, btn: ['明白了', '知道了']});
/*              layer.open({
                    type: 1,
                    area: ['600px', '360px'],
                    shadeClose: true, //点击遮罩关闭
                    content: '\<\div style="padding:20px;">预约成功，售后会有工作人员与您联系\<\/div>'
                });*/
            }


        }
    })
});


//产品搜索公共方法
function searchProduct(){
    var menuNavbar = $(".menu-navbar").children('.hover').attr('data-nav');
    globalSel.type = $(".xintuo-copy-val").attr("data-type");
    globalSel.searchValue = $(".search-value").val();
    console.log(typeof menuNavbar);
    console.log(typeof globalSel.type);
    console.log(globalSel.searchValue);
    // return false;
    if(menuNavbar == globalSel.type){
        console.log("aaa");
        loadData(1, 20, "", false, globalSel.type, globalSel.searchValue);
    }else{
        // console.log("bbb");
        if(globalSel.type == ''){
            // console.log("ccc");
            // window.open('./index.html?type='+globalSel.type+'&title='+globalSel.searchValue);
            window.location.replace('./index.html?type='+globalSel.type+'&title='+globalSel.searchValue);
        }else if(globalSel.type == 4){
            console.log("ddd");
            // window.open('./affiance.html?type='+globalSel.type+'&title='+globalSel.searchValue);
            window.location.replace('./affiance.html?type='+globalSel.type+'&title='+globalSel.searchValue);
        }else if(globalSel.type == 5){
            // window.open('./ziguan.html?type='+globalSel.type+'&title='+globalSel.searchValue);
            window.location.href = './ziguan.html?type='+globalSel.type+'&title='+globalSel.searchValue;
        }else if(globalSel.type == 6){
            // window.open('./foundation.html?type='+globalSel.type+'&title='+globalSel.searchValue);
            window.location.href = './foundation.html?type='+globalSel.type+'&title='+globalSel.searchValue;
        }else if(globalSel.type == 7){
            // window.open('../governmentdebt.html?type='+globalSel.type+'&title='+globalSel.searchValue);
            window.location.href = './governmentdebt.html?type='+globalSel.type+'&title='+globalSel.searchValue;
        }else if(globalSel.type == 8){
            // window.open('./stock.html?type='+globalSel.type+'&title='+globalSel.searchValue);
            window.location.href = './stock.html?type='+globalSel.type+'&title='+globalSel.searchValue;
        }else if(globalSel.type == 9){
            // window.open('./assurance.html?type='+globalSel.type+'&title='+globalSel.searchValue);
            window.location.href = './assurance.html?type='+globalSel.type+'&title='+globalSel.searchValue;
        }
    }

    // return false;

    // loadData(1, 20, 1, false, globalSel.type, globalSel.searchValue);
}

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


//js获取url参数
function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
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










