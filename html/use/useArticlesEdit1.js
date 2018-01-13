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
	common.ajax('/instructions/selectpay',oDetail,function(res){
		console.log(res);
		$('#title').val(res.articleTitle);
		$('#category').val(res.category);
		$('#text_cont').val(res.articleContent);
	});
	
	// 返回
	$('body').on('click','.return_btn',function(){
		window.location.href = 'useInstructions.html';
	});
});