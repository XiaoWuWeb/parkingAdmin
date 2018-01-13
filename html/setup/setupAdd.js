$(function(){
	function isPoneAvailable(str) {  
		var myreg=/^[1][3,4,5,7,8][0-9]{9}$/;  
		if (!myreg.test(str)) {  
		return false;  
		} else {  
		return true;  
		}  
	} 
	// 检查用户名
	$('#name').blur(function(){
		var OuserName = $('#name').val();
		if(OuserName.replace(/(^\s*)|(\s*$)/g, "")==""){
			// 不可以
			$('.red').show();
			$('.blue').hide();
		}else{
			common.ajax('/admin/loginCodeIsExit',{userName: OuserName},function(res){
				console.log(res);
				if(res){
					// 可以
					$('.blue').show();
					$('.red').hide();
				}else{
					// 不可以
					$('.red').show();
					$('.blue').hide();
				}
			});
		};
		
	});
	// 确定
	$('body').on('click','.confirm_btn',function(){
		var oName = $('#name').val();
		var oPassword = $('#password').val();
		var oPhone = $('#phone').val();
		var oGrade = parseInt($('#grade').val());
		if (oName.length < 1) {
			swal("请输入正确的用户帐号", " ", "error");
		}else if(oPassword.length < 6){
			swal("请输入正确的用户密码，长度大于6位", " ", "error");
		}else if (!isPoneAvailable(oPhone)) {
			swal("请输入正确的手机号码", " ", "error");
		}else if($('.red').attr('style') == "display: inline;"){
			swal("请输入正确的用户帐号", " ", "error");
		}else{
			// common.ajax('/admin/loginCodeIsExit',{userName: oName},function(res){
			// 	console.log(res);
			// });
			var oData = {
				userName:oName,
				userPassword:oPassword,
				phone:oPhone,
				roleType:oGrade
			}
			common.ajax('/admin/register',oData,function(res){
				console.log(res);
				if (res) {
					swal({

						title: "添加成功",

						text: "您新增的管理员已经添加成功！",

						type: "success",

						showCancelButton: false,

						cancelButtonColor:"#ccc",

						cancelButtonText: "取消",

						confirmButtonColor: "#3897fd",

						confirmButtonText: "是的",

						closeOnConfirm: true,

						closeOnCancel: false

					},function(isConfirm){
						window.location.href = 'setupWarden.html';
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
	

	//返回
	$('body').on('click','.return_btn',function(){
		window.location.href = 'setupWarden.html';
	});
});