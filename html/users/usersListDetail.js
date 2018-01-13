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
	common.ajax('/appuser/selectid',oDetail,function(res){
		console.log(res);
		$('#mobile').val(res.mobile);
		$('#appellation').val(res.appellation);
		$('#carNo').val(res.carNo);
		$('#areaName').val(res.proName + res.cityName + res.areaName);
		$('#createTime').val(res.createTime);
	});
	// 返回
	$('body').on('click','.return_btn',function(){
		window.location.href = 'usersList.html';
	});
});