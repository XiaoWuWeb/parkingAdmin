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

	// if (oUrl.indexOf("?") != -1){
	// 		var search = getArgs();
	// 		oDetail.parkNo =  search.parkNo	
	// }
	oDetail.parkNo = common.getData('parkNo');
	// var oCarAddress = $('#car_address').val();
	// var oCarNum = $('#car_num').val();
	// oDetail.parkAddress = oCarAddress;
	// oDetail.parkingNo = oCarNum;

	console.log(oDetail);
	common.ajax('/park/pkads',oDetail,function(res){
		console.log(res);
		if (res.error != '0') {
			var detail=res;
			var model=$("#model").html();//获取模板有<%
			var template=_.template(model)(detail);//把数据填充到模板里面并去掉<%
			$(".layui-table tbody").html(template);//把html插入到html
			__page(res);
		}else{
			// var search = getArgs();
			// var parkingNo =  search.parkNo;
			// var oAddress =  search.address;
			oDetail.parkingNo = common.getData('parkingNo');
			oDetail.oAddress = common.getData('oAddress');
			if (oDetail.parkingNo == undefined) {
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
				return
			}
			if (oDetail.oAddress == undefined) {
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
				return
			}
			var oHtml = '<p style="width:1638px;height:100px;font-size:16px;text-align:center;line-height:100px;">该停车场暂时没有车位信息，请前往添加!</p>'
			$(".layui-table tbody").html(oHtml);
		}
	});

	function __page(res){
		Page({
			num: res.tp,					//页码数
			startnum:res.pc,				//指定页码
			elem:$('#page1'),		//指定的元素
			callback:function(n){	//回调函数
				console.log(n);
				__pagesNext(n);
			}
		});
		var oText = '共 有'+ res.tr +'条 每页显示'+ res.ps +'条';
		$('.pages').html(oText);
		if (res.tp > 1 ) {
			// $('#page1').next('.pageJump').hide();
			$('.pageJump').show();
		}else{
			$('.pageJump').hide();
		}
	}

	function __pagesNext(n){
		var oData = {};
		// if (oUrl.indexOf("?") != -1){
		// 	var search = getArgs();
		// 	oData.parkNo =  search.parkNo	
		// }
		oData.parkNo = common.getData('parkNo');
		oData.pageIndex = n;
		var oCarAddress = $('#car_address').val();
		var oCarNum = $('#car_num').val();
		// oData.parkAddress = oCarAddress;
		// oData.parkingNo = oCarNum;
		if (oCarAddress.length > 0) {
			oData.parkAddress = oCarAddress;
		}
		if (oCarNum.length > 0) {
			oData.parkingNo = oCarNum;
		}
		__pageAll(oData)
	}
	function __pageAll(data){
		var oData = data;
		common.ajax('/park/pkads',oData,function(res){
			console.log(res);
			var detail=res;
			var model=$("#model").html();//获取模板有<%
			var template=_.template(model)(detail);//把数据填充到模板里面并去掉<%
			$(".layui-table tbody").html(template);//把html插入到html
		});
	}

	// 选
	$('body').on('click','.layui-unselect.layui-form-checkbox',function(){
		if ($(this).hasClass('checkbox-all')) {
			if ($(this).attr('data') == 1) {
				$('.layui-unselect.layui-form-checkbox').removeClass('layui-form-checked');
				$('.layui-unselect.layui-form-checkbox').parent().parent().parent().removeClass('checked_box');
				$(this).attr('data',0);
			}else{
				$('.layui-unselect.layui-form-checkbox').addClass('layui-form-checked');
				$('.layui-unselect.layui-form-checkbox').parent().parent().parent().addClass('checked_box');
				$(this).attr('data',1);
			}
		}else{
			if ($(this).hasClass('layui-form-checked')) {
				$(this).removeClass('layui-form-checked');
				$(this).parent().parent().parent().removeClass('checked_box');
				$('.checkbox-all').removeClass('layui-form-checked');
				$('.checkbox-all').attr('data',0);
			}else{
				$(this).parent().parent().parent().addClass('checked_box');
				$(this).addClass('layui-form-checked');
			}
		}
	});
	// 搜索
	$('body').on('click','.search-btn',function(e){
		e.preventDefault();
		var search = getArgs();
		// var oNum =  search.parkNo;
		var oNum = common.getData('parkNo');
		if (oNum && oNum != '' || oNum != undefined) {
			var oCarAddress = $('#car_address').val();
			var oCarNum = $('#car_num').val();
			var oData = {
				parkingNo: oCarNum,
				parkAddress: oCarAddress,
				parkNo: oNum
			}
			common.ajax('/park/pkads',oData,function(res){
				console.log(res);
				console.log(res.map);
				if (res.error != '0') {
					var detail = res;
					__page(res);
					var model=$("#model").html();//获取模板有<%
					var template=_.template(model)(detail);//把数据填充到模板里面并去掉<%
					$(".layui-table tbody").html(template);//把html插入到html
				}else{
					var oHtml = '<p style="width:1638px;height:100px;font-size:16px;text-align:center;line-height:100px;">该地区暂时没有停车场信息，请前往添加!</p>'
					$(".layui-table tbody").html(oHtml);
				}
			});
		}else{
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
			// alert('数据出错，请返回上一页面重新进入!');
			// window.location.href = 'parkingAdmin.html';
		}
	});

	// 添加
	$('body').on('click','.add-parking',function(){
		// if (oUrl.indexOf("?") != -1){
			var search = getArgs();
			// var oNum =  search.parkNo;
			// var oAddress =  search.address;
			// var oArea =  search.area;
			var oNum = common.getData('parkNo');
			var oAddress = common.getData('address');
			var oArea = common.getData('area');
			// console.log(oNum);
			if (oNum && oNum != '' || oNum != undefined) {
				if (oAddress && oAddress != '' || oAddress != undefined) {
					common.setData('parkNo1',oNum);
					common.setData('address1',oAddress);
					common.setData('area1',oArea);
					common.rmkey('oId')
					setTimeout(function(){
						window.location.href = 'parkingEdit.html';
					},500)
					
				}else{
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
					// alert('数据出错，请返回上一页面重新进入!');
					// window.location.href = 'parkingAdmin.html';
				}
			}else{
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
				// alert('数据出错，请返回上一页面重新进入!');
				// window.location.href = 'parkingAdmin.html';
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
		// 	// alert('数据出错，请返回上一页面重新进入!');
		// 	// window.location.href = 'parkingAdmin.html';
		// }
	});

	// 进编辑
	$('body').on('click','.edit_btn',function(){

		var oId = $(this).next().next('span.id').text();//车位ID
		common.setData('oId',oId);
		var parkType = $(this).parent().parent().parent().find('.laytable-cell-1-sex').text();//车位类型
		common.setData('parkType',parkType);//存储

		var parkAddress = $(this).parent().parent().parent().find('.laytable-cell-1-sign').text();//车位位置
		common.setData('parkAddress',parkAddress);

		var parkNo = $(this).parent().parent().parent().find('.laytable-cell-1-experience').text();//车位编号
		common.setData('parkNo1',parkNo);

		var parkdici = $(this).next().next().next('span.dici').text();//地磁编号
		common.setData('parkdici',parkdici);

		// if (oUrl.indexOf("?") != -1){
			// var search = getArgs();
			// var oNum =  search.parkNo;
			// var oAddress =  search.address;
			var oNum = common.getData('parkNo');
			var oAddress = common.getData('address');
			if (oNum != '' || oNum != undefined) {
				// common.setData('parkNo1',oNum);
				// common.setData('address1',oAddress);
				// common.setData('oId',oId);
				setTimeout(function(){
					window.location.href = 'parkingEdit1.html';
				},500)
				
			}else{
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
				// alert('数据出错，请返回上一页面重新进入!');
				// window.location.href = 'parkingAdmin.html';
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
		// 	// alert('数据出错，请返回上一页面重新进入!');
		// 	// window.location.href = 'parkingAdmin.html';
		// }
	});
	// 删除单个
	$('body').on('click','.delete_btn',function(){
		// 取id，存页头或者cookie
		var oData = {},
			oArr = [];
		var oId = parseInt($(this).next('span.id').text());
		oArr.push(oId);
		oData.array = oArr;
		console.log(oData);
		__removeParking(oData);
		
	});

	// 删除多个
	$('body').on('click','.all-delete',function(){
		if ($('.checked_box').length > 0) {
			var oData = {},
			oArr = [];
			for (var i = 0; i < $('.checked_box_table').find('.checked_box').length; i++) {
				var oId = $('.checked_box_table').find('.checked_box').eq(i).find('span.id').text();
				oArr.push(oId);
			}
			oData.array = oArr;
			__removeParking(oData);
		}else{
			swal({

			  	title: "操作提示",

			  	text: "请勾选具体信息后再点击删除",

			  	type: "warning",

			  	showCancelButton: false,

			  	cancelButtonColor:"#ccc",

				cancelButtonText: "取消",

			  	confirmButtonColor: "#3897fd",

			  	confirmButtonText: "是的",

			  	closeOnConfirm: false

			})
		}
		
		// console.log(oArr);
	});


	function __removeParking(data){
		swal({

		  	title: "是否删除？",

		  	text: "是否需要删除该停车场车位？",

		  	type: "warning",

		  	showCancelButton: true,

		  	cancelButtonColor:"#ccc",

			cancelButtonText: "取消",

		  	confirmButtonColor: "#3897fd",

		  	confirmButtonText: "是的",

		  	closeOnConfirm: false

		},

		function(){
			var oData = data;
			common.ajax('/pkmg/delpark',oData,function(res){
				if (res.success) {
					swal({

						title: "删除成功",

						text: "你删除的车位已经成功！",

						type: "success",

						showCancelButton: false,

						cancelButtonColor:"#ccc",

						cancelButtonText: "取消",

						confirmButtonColor: "#3897fd",

						confirmButtonText: "是的",

						closeOnConfirm: true,

						closeOnCancel: false

					},function(isConfirm){
						if (isConfirm) {
							location.reload();
						}else{
							location.reload();
						}
					});
					
				}else{
					swal("删除失败", " ", "error");
				}
			});
		  // swal("Deleted!", "Your imaginary file has been deleted.", "success");

		});
		
	}
});