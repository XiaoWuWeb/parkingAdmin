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
	// if (oUrl.indexOf("?") != -1){
		// var search = getArgs();
		// var parkingNo =  search.parkNo;
		// var oAddress =  search.address;
		// var oId =  search.oId;
		var parkingNo =  common.getData('parkNo1');
		var oAddress =  common.getData('address1');
		var oId =  common.getData('oId');
		console.log(oId);
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
		if (oAddress == undefined) {
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
		if (oAddress == '') {
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
		// if (oId == undefined) {
		// 	$('.info-tail').text('添加车位');
		// 	$('.edit-box').find('p').text('添加车位');
		// 	$('.info-cont').find('i').eq(1).find('a').attr('href','parkingDetail.html?parkNo=' + parkingNo);		
		// }else{
		// 	$('.info-tail').text('车位编辑');
		// 	$('.edit-box').find('p').text('车位编辑');
		// 	$('.info-cont').find('i').eq(1).find('a').attr('href','parkingDetail.html?parkNo=' + parkingNo);
		// 	// 取数据
		// 	$('.form-control1').val(common.getData('parkType'));
		// 	$("input[name='parking_address']").val(common.getData('parkAddress'));
		// 	$("input[name='parking_no']").val(common.getData('parkNo'));
		// 	$("input[name='diciNo']").val(common.getData('parkdici'));
		// }
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
		// var search = getArgs();
		// var parkingNo =  search.parkNo;
		var parkingNo =  common.getData('parkNo');
		// var oArea =  search.area;
		var oArea =  common.getData('area');
		// var oParkingAddress =  search.address + $("input[name='parking_address']").val();
		var oParkingAddress =  common.getData('address') + $("input[name='parking_address']").val();
		var oType = $('.form-control1').val();
		var oAddress = $("input[name='parking_address']").val();
		var oParkNo = $("input[name='parking_no']").val();
		var oDiciNo = $("input[name='diciNo']").val();

		oData.carType = oType;//车位类型

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
		common.ajax('/pkmg/addparking',oData,function(res){
			console.log(res);
			if (res.success) {
				swal({

					title: "添加成功",

					text: "是否留在当前页面继续添加车位信息？",

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
						// $('.form-control1').val();
						$("input[name='parking_address']").val('');
						$("input[name='parking_no']").val('');
						$("input[name='diciNo']").val('');

					}else{

						window.location.href = "parkingDetail.html";
					}

				});
			}else{

			}
		});
	}

	// 返回
	$('body').on('click','.return_btn',function(){
		window.location.href = "parkingDetail.html";
	});

});