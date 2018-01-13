$(function(){
	/*获取url的refer*/
	// function getArgs(){
	//     var args = {};
	//     var match = null;
	//     var search = decodeURIComponent(location.search.substring(1));
	//     var reg = /(?:([^&]+)=([^&]+))/g;
	//     while((match = reg.exec(search))!==null){
	//         args[match[1]] = match[2];
	//     }
	//     return args;
	// };
	// var oUrl = location.search;
	var parkingNo =  common.getData('parkNo1');
	var parkAddress =  common.getData('parkAddress');
	var oId =  common.getData('oId');
	// if (oUrl.indexOf("?") != -1){
	// 	console.log(oId);
		if (parkingNo == undefined) {
			swal({
				title: "数据出错",
				text: "请返回上一页面重新进入!",
				type: "error",
				showCancelButton: true,
				cancelButtonColor:"#ccc",
				cancelButtonText: "取消",
				confirmButtonColor: "#3897fd",
				confirmButtonText: "是的",
				closeOnConfirm: true,
				closeOnCancel: false
			},function(isConfirm){
				if (isConfirm) {
					window.location.href = 'parkingAdmin.html';
				}else{
					window.location.href = 'parkingAdmin.html';
				}
			});
			// alert('数据出错，请返回车位管理重新进入！');
			// window.location.href = 'parkingAdmin.html';
		}
		if (parkingNo == '') {
			swal({
				title: "数据出错",
				text: "请返回上一页面重新进入!",
				type: "error",
				showCancelButton: true,
				cancelButtonColor:"#ccc",
				cancelButtonText: "取消",
				confirmButtonColor: "#3897fd",
				confirmButtonText: "是的",
				closeOnConfirm: true,
				closeOnCancel: false
			},function(isConfirm){
				if (isConfirm) {
					window.location.href = 'parkingAdmin.html';
				}else{
					window.location.href = 'parkingAdmin.html';
				}
			});
			// alert('数据出错，请返回车位管理重新进入！');
			// window.location.href = 'parkingAdmin.html';
		}
		if (parkAddress == undefined) {
			swal({
				title: "数据出错",
				text: "请返回上一页面重新进入!",
				type: "error",
				showCancelButton: true,
				cancelButtonColor:"#ccc",
				cancelButtonText: "取消",
				confirmButtonColor: "#3897fd",
				confirmButtonText: "是的",
				closeOnConfirm: true,
				closeOnCancel: false
			},function(isConfirm){
				if (isConfirm) {
					window.location.href = 'parkingAdmin.html';
				}else{
					window.location.href = 'parkingAdmin.html';
				}
			});
			// alert('数据出错，请返回车位管理重新进入！');
			// window.location.href = 'parkingAdmin.html';
		}
		if (parkAddress == '') {
			swal({
				title: "数据出错",
				text: "请返回上一页面重新进入!",
				type: "error",
				showCancelButton: true,
				cancelButtonColor:"#ccc",
				cancelButtonText: "取消",
				confirmButtonColor: "#3897fd",
				confirmButtonText: "是的",
				closeOnConfirm: true,
				closeOnCancel: false
			},function(isConfirm){
				if (isConfirm) {
					window.location.href = 'parkingAdmin.html';
				}else{
					window.location.href = 'parkingAdmin.html';
				}
			});
			// alert('数据出错，请返回车位管理重新进入！');
			// window.location.href = 'parkingAdmin.html';
		}
		if (oId == undefined) {
			// $('.info-tail').text('添加车位');
			// $('.edit-box').find('p').text('添加车位');
			// $('.info-cont').find('i').eq(1).find('a').attr('href','parkingDetail.html?parkNo=' + parkingNo);		
		}else{
			// $('.info-tail').text('车位编辑');
			// $('.edit-box').find('p').text('车位编辑');
			// $('.info-cont').find('i').eq(1).find('a').attr('href','parkingDetail.html');
			// 取数据
			$('.form-control1').val(common.getData('parkType'));
			$("input[name='parking_address']").val(common.getData('parkAddress'));
			$("input[name='parking_no']").val(common.getData('parkNo1'));
			$("input[name='diciNo']").val(common.getData('parkdici'));
		}
	// }else{
	// 	swal({
	// 		title: "数据出错",
	// 		text: "请返回上一页面重新进入!",
	// 		type: "error",
	// 		showCancelButton: true,
	// 		cancelButtonColor:"#ccc",
	// 		cancelButtonText: "取消",
	// 		confirmButtonColor: "#3897fd",
	// 		confirmButtonText: "是的",
	// 		closeOnConfirm: true,
	// 		closeOnCancel: false
	// 	},function(isConfirm){
	// 		if (isConfirm) {
	// 			window.location.href = 'parkingAdmin.html';
	// 		}else{
	// 			window.location.href = 'parkingAdmin.html';
	// 		}
	// 	});
	// 	// alert('数据出错，请返回车位管理重新进入！');
	// 	// window.location.href = 'parkingAdmin.html';
	// }

	// 提交
	$('body').on('click','.confirm_btn',function(){
		var oData = {};
		// var parkingNo =  search.parkNo;
		var parkingNo =  common.getData('parkNo');
		// var oArea =  search.area;
		var oArea =  common.getData('area');
		// var oId=  search.oId;
		var oId =  common.getData('oId');
		// var oParkingAddress =  search.address + $("input[name='parking_address']").val();
		var oParkingAddress =  common.getData('address') + $("input[name='parking_address']").val();

		var oType = $('.form-control1').val();
		var oAddress = $("input[name='parking_address']").val();
		var oParkNo = $("input[name='parking_no']").val();
		var oDiciNo = $("input[name='diciNo']").val();

		oData.carType = oType;//车位类型
		oData.id = oId;//车位ID
		oData.area = oArea;	//停车场parkNo
		oData.provinceCityAreaParkingName = oParkingAddress;//具体位置经纬度
		
		oData.parkingAddress = oAddress;//车位具体位置
		oData.parkingNo = oParkNo;//车位编号
		oData.diciNo = oDiciNo;//地磁标号

		oData.weiyiNo = parkingNo;//停车场parkNo
		console.log(oAddress.length);
		if (oType.length > 0 && oAddress.length > 0 && oParkNo.length > 0 && oDiciNo.length > 0) {
			__addParking(oData);
		}else{
			swal("提交出错", "请输入车位与地磁所有信息", "error");
		}
		
	});

	function __addParking(data){
		var oData = data;
		common.ajax('/pkmg/repark',oData,function(res){
			// console.log(res);
			if (res.success) {
				swal({
					title: "编辑成功",
					text: "车位信息已更改!",
					type: "success",
					showCancelButton: true,
					cancelButtonColor:"#ccc",
					cancelButtonText: "取消",
					confirmButtonColor: "#3897fd",
					confirmButtonText: "是的",
					closeOnConfirm: true,
					closeOnCancel: false
				},function(isConfirm){
					if (isConfirm) {
						window.location.href = 'parkingDetail.html';
					}
				});
				// swal("编辑成功", "车位信息已更改", "success");
			}else{
				swal("修改出错", "请仔细查看填写信息如不需要编辑请点击返回", "error");
			}
		});
	}

	// 返回
	$('body').on('click','.return_btn',function(){
		window.location.href = 'parkingDetail.html';
	});

});