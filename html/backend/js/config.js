var API_PATH = ""

function getToken() {
	return $.cookie('au_token');
}

//设置AJAX的全局默认选项
$.ajaxSetup({
	aysnc: false, // 默认同步加载
	headers: { // 默认添加请求头
		"au_token": getToken()
	},
	dataFilter: function(data, type) {
		if(data != "") {
			var jsonData = JSON.parse(data);
			if(jsonData.code == '100') {
				layer.alert('登录过期！', {icon: 5, title:'警告'},function(index) {				
					layer.close(index);
					top.location.href="login.html"
				});
			}
		}
		return data;
	},
	error:function(xhr,status,error){
		layer.alert("网络错误！",{icon: 5, title:'警告'});
	}
});