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
		$('#province10').val(res.category);
		$('#text_cont').val(res.articleContent);
	});

	// 确定
	$('body').on('click','.confirm_btn',function(){
		var oTitle = $('#title').val();
		var oProvince = $('#province10').val();
		var oCont = $('#text_cont').val();
		if (oTitle.length > 0 && oCont.length > 0) {
			var oData = {
				articleTitle: oTitle,
				category: oProvince,
				articleContent: oCont,
				id: oDetail.id
			}
			common.ajax('/instructions/updateinstr',oData,function(res){
				if (res) {
					swal({

						title: "修改成功",

						text: "您编辑的文章已经修改成功！",

						type: "success",

						showCancelButton: false,

						cancelButtonColor:"#ccc",

						cancelButtonText: "取消",

						confirmButtonColor: "#3897fd",

						confirmButtonText: "是的",

						closeOnConfirm: true,

						closeOnCancel: false

					},function(isConfirm){
						window.location.href = 'useInstructions.html';
						// if (isConfirm) {
							
						// }else{
						// 	location.reload();
						// }
					});
					
				}else{
					swal("修改失败", " ", "error");
				}
			});
		}
		
	});

	// 返回
	$('body').on('click','.return_btn',function(){
		window.location.href = 'useInstructions.html';
	});
});