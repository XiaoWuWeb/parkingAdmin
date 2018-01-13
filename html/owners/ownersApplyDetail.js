$(function(){
	/*获取url的refer*/
	function getArgs(){
	    var args = {};
	    var match = null;
	    var search = decodeURIComponent(location.search.substring(1));
	    var reg = /(?:([^&]+)=([^&]+))/g;
	    while((match = reg.exec(search))!==null){
	        args[match[1]] = match[2];
	    }
	    return args;
	};
	var oUrl = location.search,
		oDetail = {};

	if (oUrl.indexOf("?") != -1){
		var search = getArgs();
		oDetail.id =  search.id	
	}

	common.ajax('/admin/selectApplyforid',oDetail,function(res){
		console.log(res);
		$('#time').val(res.applicationTime);
		$('#address').val(res.proName + res.cityName + res.areaName + res.address);
		$('#name').val(res.userName);
		$('#phone').val(res.phone);
		$('#expirationTime').val(res.expirationTime);
	});

	// 返回
	$('body').on('click','.return_btn',function(){
		window.location.href = 'ownersRequestRecord.html';
	});
});