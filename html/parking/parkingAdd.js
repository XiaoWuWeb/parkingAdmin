$(function(){
	// 添加停车场
	$('body').on('click','.confirm_btn',function(res){
		var oProvince = $('#province10').val();
		var oCity = $('#city10').val();
		var oArea = $('#district10').val();
		var oParkingName = $("input[name='name']").val();
		var oParkingAddress = $("input[name='address']").val();
		if (oProvince.length > 0 && oCity.length > 0 && oArea.length > 0 && oParkingName.length > 0 && oParkingAddress.length > 0 ) {
			var oYezhuId = '1';
			var oData = {};
			oData.province = oProvince;
			oData.city = oCity;
			oData.area = oArea;
			oData.parkingName = oParkingName;
			oData.parkingAddress = oParkingAddress;
			oData.yezhuId = oYezhuId;
			__addParking(oData);
		}else{
			swal({
				title: "数据出错",
				text: "请填写完整的信息内容!",
				type: "error",
				showCancelButton: true,
				cancelButtonColor:"#ccc",
				cancelButtonText: "取消",
				confirmButtonColor: "#3897fd",
				confirmButtonText: "是的",
				closeOnConfirm: true,
				closeOnCancel: true
			},function(isConfirm){
				if (isConfirm) {
					// window.location.href = 'parkingAdmin.html';
				}
			});
			// alert('!');
		}
	});

	function __addParking(data){
		var oData = data;
		// console.log(oData);
		common.ajax('/pkmg/addPark',oData,function(res){
			console.log(res.success);
			if (res.success) {
				swal({
					title: "添加成功",
					text: "添加停车场成功!",
					type: "success",
					showCancelButton: false,
					cancelButtonColor:"#ccc",
					cancelButtonText: "取消",
					confirmButtonColor: "#3897fd",
					confirmButtonText: "是的",
					closeOnConfirm: true,
					closeOnCancel: false
				},function(isConfirm){
					window.location.href = 'parkingAdmin.html';
				});
				
			}else{
				swal({
					title: "添加失败",
					text: "添加停车场失败，请仔细核查下地址!",
					type: "error",
					showCancelButton: true,
					cancelButtonColor:"#ccc",
					cancelButtonText: "取消",
					confirmButtonColor: "#3897fd",
					confirmButtonText: "是的",
					closeOnConfirm: true,
					closeOnCancel: true
				},function(isConfirm){
					
				});
				// alert('添加停车场失败，请仔细核查下地址!');
			}
		});
	}

	// 返回
	$('body').on('click','.return_btn',function(res){
		window.location.href = window.history.go(-1);
	});
});