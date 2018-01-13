$(function(){
	function __login(){
		if ($.cookie('userName') != undefined && $.cookie('userPassword') != undefined) {
			$('#user').val($.cookie('userName'));
			$('#password').val($.cookie('userPassword'));
		}
	}
	__login();
	
	$('body').on('click','#on_login',function(){
		var user = $('#user').val();
		var password = $('#password').val();
		var oData = {
			userName:user,
			userPassword:password
		}
		if($('#user').val()==''){
            alert("账号密码不能为空");
            $(".user").val('');
            $(".password").val('');
        }else if($("#user").val()==''){
            alert("账号密码不能为空");
            $(".password").val('');
            $(".user").val('');
        }else{
        	common.ajax('/admin/login',oData,function(res){
        		console.log(res);
        		if(res != false){
        			if ($("#remember-password-checkbox").prop("checked")) {
						$.cookie('userName',user,{expires:7});
						$.cookie('userPassword',password,{expires:7});
						$.cookie('token',res.id,{expires:1});
						$.cookie('roleType',res.roleType,{expires:1});
						$.cookie('userNickname',res.userNickname,{expires:1});
					}else{
						$.cookie('token',res.id,{expires:1});
						$.cookie('roleType',res.roleType,{expires:1});
					}
					console.log($.cookie('userName'));
					console.log($.cookie('userPassword'));
	                console.log($.cookie('token'));
	                if($.cookie('token')!=undefined){
	                    window.location.href = '/ParkingAdmin/html/map/mapModule.html';
	                }
	                else{
	                	swal("登录出错", "请更换浏览器或者清理缓存后再尝试。", "error");
	                }
        		}else{
        			swal("密码错误", " ", "error");
        		}
			});
        }
		
	});
	var browser=navigator.appName 
	var b_version=navigator.appVersion 
	var version=b_version.split(";"); 
	var trim_Version=version[1].replace(/[ ]/g,""); 
	if(browser=="Microsoft Internet Explorer" && trim_Version=="MSIE6.0") 
	{ 
		alert("请使用谷歌浏览器登录此管理平台！谢谢！"); 
	} 
	else if(browser=="Microsoft Internet Explorer" && trim_Version=="MSIE7.0") 
	{ 
	alert("请使用谷歌浏览器登录此管理平台！谢谢！"); 
	} 
	else if(browser=="Microsoft Internet Explorer" && trim_Version=="MSIE8.0") 
	{ 
	alert("请使用谷歌浏览器登录此管理平台！谢谢！"); 
	} 
	else if(browser=="Microsoft Internet Explorer" && trim_Version=="MSIE9.0") 
	{ 
	alert("请使用谷歌浏览器登录此管理平台！谢谢！"); 
	} 
	
});