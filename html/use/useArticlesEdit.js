$(function(){
	// 确定
	$('body').on('click','.confirm_btn',function(){
		var oTitle = $('#title').val();
		var oProvince = $('#province10').val();
		var oCont = $('#text_cont').val();
		if (oTitle.length > 0 && oCont.length > 0) {
			var oData = {
				ArticleTitle:oTitle,
				category:oProvince,
				ArticleContent:oCont
			}
			common.ajax('/instructions/addinstr',oData,function(res){
				if (res) {
					swal({

						title: "添加成功",

						text: "您新增的文章已经添加成功！",

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
					swal("添加失败", " ", "error");
				}
			});
		}
		
	});
	

	//删除
	$('body').on('click','.return_btn',function(){
		window.location.href = 'useInstructions.html';
	});
});