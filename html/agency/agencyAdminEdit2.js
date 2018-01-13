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
	common.ajax('/Agent/agentid',oDetail,function(res){
		console.log(res);
		$('#name').val(res.companyName);
		$('#address').val(res.companyAddress);
		$('#agency').val(res.agentArea);
		$('#permis').val(res.permission);
		$('.start_time').val(res.joiningtime);
		$('.end_time').val(res.expirationdate);
		$('.backId').text(res.id);
	});

	// 确定
	$('body').on('click','.confirm_btn',function(){
		var token = $(this).next('.backId').text();
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
				id:token,
				companyName:oName,
				companyAddress:oAddress,
				agentArea:oAgency,
				permission:oPermis,
				joiningtime:oStartTime,
				expirationdate:oEndTime
			}
			common.ajax('/Agent/updateAgent',oData,function(res){
				if (res) {
					swal({

						title: "修改成功",

						text: "您编辑的代理商已经修改成功！",

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
					});
				}else{
					swal("修改失败", " ", "error");
				}
			});
		}
		
	});

	// 返回
	$('body').on('click','.return_btn',function(){
		window.location.href = 'agencyAdmin.html';
	});
});