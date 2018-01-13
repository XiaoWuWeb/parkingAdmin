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
	common.ajax('/admin/backuserid',oDetail,function(res){
		console.log(res);
		$('#userName').val(res.userName);
		$('#jinE').val(res.jinE);
		$('#surplusAmount').val(res.surplusAmount);
		$('#payDate').val(res.payDate);
		if(res.presentStatus == '0'){
			$('#presentStatus').val('已到账');
		}else if(res.presentStatus == '1'){
			$('#presentStatus').val('未到账');
		}
	});
	$('body').on('click','.return_btn',function(){
		window.location.href = 'ownersMoneyList.html';
	});
});