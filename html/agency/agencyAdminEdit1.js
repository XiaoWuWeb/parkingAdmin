$(function(){
	// 确定
	$('body').on('click','.confirm_btn',function(){
		var token = $.cookie('token');
		var oName = $('#name').val();
		var oAddress = $('#address').val();
		var oAgency = $('#agency').val();
		var oPermis = $('#permis').val();
		var oStartTime = $('.start_time').val();
		var oEndTime = $('.end_time').val();
		if (token.length > 0 
			&& oName.length > 0 
			&& oAddress.length > 0 
			&& oAgency.length > 0 
			&& oPermis.length > 0 
			&& oStartTime.length > 0
			&& oEndTime.length > 0) {
			var oData = {
				backId:token,
				companyName:oName,
				companyAddress:oAddress,
				agentArea:oAgency,
				permission:oPermis,
				joiningtime:oStartTime,
				expirationdate:oEndTime
			}
			common.ajax('/Agent/addpayAgent',oData,function(res){
				if (res) {
					swal({

						title: "添加成功",

						text: "您新增的代理商已经添加成功！",

						type: "success",

						showCancelButton: false,

						cancelButtonColor:"#ccc",

						cancelButtonText: "取消",

						confirmButtonColor: "#3897fd",

						confirmButtonText: "是的",

						closeOnConfirm: true,

						closeOnCancel: false

					},function(isConfirm){
						window.location.href = 'agencyAdmin.html';
						// if (isConfirm) {
							
						// }else{
						// 	location.reload();
						// }
					});
				}else{
					swal("添加失败", " ", "error");
				}
			});
		}else{
			swal("添加失败", "请填写所有内容", "error");
		}
	});
	//返回
	$('body').on('click','.return_btn',function(){
		window.location.href = 'agencyAdmin.html';
	});
});