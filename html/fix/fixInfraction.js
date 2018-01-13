$(function(){
	function __oneManager(){
		var oDetail = {
			managerType:2,//故障，2是违规
			whether:1//已处理，2是待处理
		}
		common.ajax('/fault/manager',oDetail,function(res){
			console.log(res);
			console.log(res.map.length);
			if (res.map.length > 0) {
				var detail=res;
				var model=$("#model").html();//获取模板有<%
				var template=_.template(model)(detail);//把数据填充到模板里面并去掉<%
				$(".handling tbody").html(template);//把html插入到html
			}else{
				var oHtml = '<p style="width:1638px;height:100px;font-size:16px;text-align:center;line-height:100px;">您搜索的内容暂无数据！</p>'
				$(".handling tbody").html(oHtml);
			}
			__page(res,0);
		});
	}
	
	function __twoManager(){
		var oData = {
			managerType:2,//故障，2是违规
			whether:2//已处理，2是待处理
		}
		common.ajax('/fault/manager',oData,function(res){
			console.log(res);
			console.log(res.map.length);
			if (res.map.length > 0) {
				var detail=res;
				var model1=$("#model1").html();//获取模板有<%
				var template=_.template(model1)(detail);//把数据填充到模板里面并去掉<%
				$(".unhandling tbody").html(template);//把html插入到html
			}else{
				var oHtml = '<p style="width:1638px;height:100px;font-size:16px;text-align:center;line-height:100px;">您搜索的内容暂无数据!</p>'
				$(".unhandling tbody").html(oHtml);
			}
			__page(res,1);
		});
	}
	__oneManager();
	// __twoManager();
	
	function __page(res,handling){
		if (handling == 0) {
			var pages = $('#page1');
			var oText = '共 有'+ res.tr +'条 每页显示'+ res.ps +'条';
			$('.pages1').html(oText);
			if (res.tp > 1 ) {
				// $('#page1').next('.pageJump').hide();
				$('.pageJump1').show();
				// $('.checkbox1').show();
			}else{
				$('.pageJump1').hide();
				// $('.checkbox1').hide();
			}
			Page({
				num: res.tp,					//页码数
				startnum:res.pc,				//指定页码
				elem:pages,		//指定的元素
				callback:function(n){	//回调函数
					console.log(n);
					__pagesNext(n,1);
				}
			});
		}else{
			var pages = $('#page2');
			var oText = '共 有'+ res.tr +'条 每页显示'+ res.ps +'条';
			$('.pages2').html(oText);
			if (res.tp > 1 ) {
				// $('#page1').next('.pageJump').hide();
				$('.pageJump2').show();
				// $('.checkbox2').show();
			}else{
				$('.pageJump2').hide();
				// $('.checkbox2').hide();
			}
			Page({
				num: res.tp,					//页码数
				startnum:res.pc,				//指定页码
				elem:pages,		//指定的元素
				callback:function(n){	//回调函数
					console.log(n);
					__pagesNext(n,2);
				}
			});
		}
	}

	function __pagesNext(n,num){
		if(num == 1){
			var oData = {};
			oData.pageIndex = n;
			oData.managerType=2;//故障，2是违规
			oData.whether=1;//已处理，2是待处理
			var oArea = $('#district10').val();
			var oCarName = $('#car_name').val();
			var oCarNum = $('#car_num').val();
			// oData.parkAddress = oCarAddress;
			// oData.parkingNo = oCarNum;
			if (oArea.length > 0) {
				oData.area = oArea;
			}
			if (oCarName.length > 0) {
				oData.userPhone = oCarName;
			}
			if (oCarNum.length > 0) {
				oData.parkingNo = oCarNum;
			}
			__pageAll(oData,1)
		}else{
			var oData = {};
			oData.managerType=2;//故障，2是违规
			oData.whether=2;//已处理，2是待处理
			oData.pageIndex = n;
			var oArea = $('#district10').val();
			var oCarName = $('#car_name').val();
			var oCarNum = $('#car_num').val();
			// oData.parkAddress = oCarAddress;
			// oData.parkingNo = oCarNum;
			if (oArea.length > 0) {
				oData.area = oArea;
			}
			if (oCarName.length > 0) {
				oData.userPhone = oCarName;
			}
			if (oCarNum.length > 0) {
				oData.parkingNo = oCarNum;
			}
			__pageAll(oData,2)
		}
		
	}
	function __pageAll(data,num){
		if (num == 1) {
			var oData = data;
			common.ajax('/fault/manager',oData,function(res){
				if (res.map.length > 0) {
					var detail=res;
					var model=$("#model").html();//获取模板有<%
					var template=_.template(model)(detail);//把数据填充到模板里面并去掉<%
					$(".handling tbody").html(template);//把html插入到html
				}else{
					var oHtml = '<p style="width:1638px;height:100px;font-size:16px;text-align:center;line-height:100px;">您搜索的内容暂无数据！</p>'
					$(".handling tbody").html(oHtml);
				}
			});
		}else{
			var oData = data;
			common.ajax('/fault/manager',oData,function(res){
				if (res.map.length > 0) {
					var detail=res;
					var model1=$("#model1").html();//获取模板有<%
					var template=_.template(model1)(detail);//把数据填充到模板里面并去掉<%
					$(".unhandling tbody").html(template);//把html插入到html
				}else{
					var oHtml = '<p style="width:1638px;height:100px;font-size:16px;text-align:center;line-height:100px;">该停车场暂时没有车位信息，请前往添加!</p>'
					$(".unhandling tbody").html(oHtml);
				}
			});
		}
		
	}

	// 选
	$('body').on('click','.layui-unselect.layui-form-checkbox',function(){
		// alert(1);
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
		var oName = $('#district10').val();
		var oCarName = $('#car_name').val();
		var oCarNum = $('#car_num').val();
		var oData = {
			managerType: 2,
			area: oName,
			userPhone: oCarName,
			parkingNo: oCarNum
		}

		if ($('.tab_box').find('li.curt').index() == 0) {
			oData.whether = 1;
			common.ajax('/fault/manager',oData,function(res){
				console.log(res);
				// console.log(res.map);
				// if (res.map[0] != null) {
				// 	var detail = res;
				// 	__page(res);
				// 	var model=$("#model").html();//获取模板有<%
				// 	var template=_.template(model)(detail);//把数据填充到模板里面并去掉<%
				// 	$(".layui-table tbody").html(template);//把html插入到html
				// }else{
				// 	var oHtml = '<p style="width:1638px;height:100px;font-size:16px;text-align:center;line-height:100px;">该地区暂时没有停车场信息，请前往添加!</p>'
				// 	$(".layui-table tbody").html(oHtml);
				// }
				if (res.map.length > 0) {
					var detail=res;
					var model=$("#model").html();//获取模板有<%
					var template=_.template(model)(detail);//把数据填充到模板里面并去掉<%
					$(".handling tbody").html(template);//把html插入到html
				}else{
					var oHtml = '<p style="width:1638px;height:100px;font-size:16px;text-align:center;line-height:100px;">暂时没有信息</p>'
					$(".handling tbody").html(oHtml);
				}
				__page(res,0);
			});
		}else{
			oData.whether = 2;
			common.ajax('/fault/manager',oData,function(res){
				console.log(res);
				// console.log(res.map);
				// if (res.map[0] != null) {
				// 	var detail = res;
				// 	__page(res);
				// 	var model=$("#model").html();//获取模板有<%
				// 	var template=_.template(model)(detail);//把数据填充到模板里面并去掉<%
				// 	$(".layui-table tbody").html(template);//把html插入到html
				// }else{
				// 	var oHtml = '<p style="width:1638px;height:100px;font-size:16px;text-align:center;line-height:100px;">该地区暂时没有停车场信息，请前往添加!</p>'
				// 	$(".layui-table tbody").html(oHtml);
				// }
				if (res.map.length > 0) {
					var detail=res;
					var model1=$("#model1").html();//获取模板有<%
					var template=_.template(model1)(detail);//把数据填充到模板里面并去掉<%
					$(".unhandling tbody").html(template);//把html插入到html
				}else{
					var oHtml = '<p style="width:1638px;height:100px;font-size:16px;text-align:center;line-height:100px;">暂时没有信息！</p>'
					$(".unhandling tbody").html(oHtml);
				}
				__page(res,1);
			});
			
		}
	});

	// 进
	$('body').on('click','.detail_btn',function(){
		if ($('.already_processing').hasClass('curt')) {//已处理
			var oId = $(this).next().next().text();
			window.location.href = 'fixInfractionDetail1.html?id=' + oId;
		}else if($('.wait_processing').hasClass('curt')){//待处理
			var oId = $(this).next().next().text();
			window.location.href = 'fixInfractionDetail2.html?id=' + oId;
		}
	});
	// 删除
	$('body').on('click','.delete_btn',function(){
		// 取id，存页头或者cookie
		var oData = {},
			oArr = [];
		var oId = parseInt($(this).next('span.id').text());
		oArr.push(oId);
		oData.array = oArr;
		console.log(oData);
		__removeParking(oData);
		// // 取id，存页头或者cookie
		// alert('删除，等后面搞');
	});

	// 删除多个
	$('body').on('click','.all-delete',function(){
		if ($('.checked_box').length < 1) {
			swal("请勾选具体需要删除的信息", " ", "error");
		}else{
			var oData = {},
				oArr = [];
			for (var i = 0; i < $('.checked_box_table').find('.checked_box').length; i++) {
				var oId = $('.checked_box_table').find('.checked_box').eq(i).find('span.id').text();
				oArr.push(oId);
			}
			oData.array = oArr;
			__removeParking(oData);
		}
		// console.log(oArr);
	});

	// $('body').on('click','.all-delete1',function(){
	// 	var oData = {},
	// 		oArr = [];
	// 	for (var i = 0; i < $('.checked_box_table1').find('.checked_box').length; i++) {
	// 		var oId = $('.checked_box_table1').find('.checked_box').eq(i).find('span.id').text();
	// 		oArr.push(oId);
	// 	}
	// 	oData.array = oArr;
	// 	__removeParking(oData);
	// 	// console.log(oArr);
	// });

	function __removeParking(data){
		swal({

		  	title: "是否删除？",

		  	text: "",

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
			console.log(oData)
			common.ajax('/fault/delmanager',oData,function(res){
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

		});
		
	}

	// 切换
	$('body').on('click','.tab_box li',function(){
		var index = $(this).index();

		$(this).addClass('curt').siblings().removeClass('curt');
		// 到时候这些切换的用同一个div来更换数据就好了,所以下面的$('.tab_cont li')不需要了
		$('.tab_cont li.cont').eq(index).show().siblings().hide();

		if ($('.already_processing').hasClass('curt')) {
			// alert(1);
			// 已处理
			__oneManager();
		}else{
			// alert(2);
			// 待处理
			__twoManager();
		}
	});

	// 已处理

	$('body').on('click','.already_btn',function(){
		var oId = $(this).next().text();
		common.ajax('/fault/upmanager',{id:oId},function(res){
			console.log(res);
			if (res.success) {
				swal({

					title: "处理成功",

					text: "你的信息已经处理成功！",

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
				swal("处理失败", " ", "error");
			}
		});
	});
	
});