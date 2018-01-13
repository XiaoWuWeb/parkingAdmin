$(function(){
	function __oneManager(){
		common.ajax('/admin/apply','',function(res){
			console.log(res);
			// console.log(res.map.length);
			if (res.map.length > 0) {
				var detail=res;
				var model=$("#model").html();//获取模板有<%
				var template=_.template(model)(detail);//把数据填充到模板里面并去掉<%
				$(".handling tbody").html(template);//把html插入到html
			}else{
				var oHtml = '<p style="width:1638px;height:100px;font-size:16px;text-align:center;line-height:100px;">暂时没有车位申请记录!</p>'
				$(".handling tbody").html(oHtml);
			}
			__page(res,0);
		});
	}
	
	function __twoManager(){
		common.ajax('/admin/selectdynamic','',function(res){
			console.log(res);
			console.log(res.map.length);
			if (res.map.length > 0) {
				var detail=res;
				var model1=$("#model1").html();//获取模板有<%
				var template=_.template(model1)(detail);//把数据填充到模板里面并去掉<%
				$(".unhandling tbody").html(template);//把html插入到html
			}else{
				var oHtml = '<p style="width:1638px;height:100px;font-size:16px;text-align:center;line-height:100px;">暂时没有车位申请记录!</p>'
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

	function __pagesNext(n,whether){
		if(whether == 1){
			var oData = {};
			oData.pageIndex = n;
			var oCarAddress = $('#district10').val();
			var oCarName = $('#name').val();
			// oData.parkAddress = oCarAddress;
			// oData.parkingNo = oCarNum;
			if (oCarAddress.length > 0) {
				oData.areaName = oCarAddress;
			}
			if (oCarName.length > 0) {
				oData.userName = oCarName;
			}
			__pageAll(oData,1)
		}else{
			var oData = {};
			oData.pageIndex = n;
			var oCarAddress = $('#district10').val();
			var oCarName = $('#name').val();
			// oData.parkAddress = oCarAddress;
			// oData.parkingNo = oCarNum;
			if (oCarAddress.length > 0) {
				oData.areaName = oCarAddress;
			}
			if (oCarName.length > 0) {
				oData.userName = oCarName;
			}
			__pageAll(oData,2)
		}
		
	}
	function __pageAll(data,num){
		if(num == 1){
			var oData = data;
			common.ajax('/admin/apply',oData,function(res){
				console.log(res);
				if (res.map.length > 0) {
					var detail=res;
					var model=$("#model").html();//获取模板有<%
					var template=_.template(model)(detail);//把数据填充到模板里面并去掉<%
					$(".handling tbody").html(template);//把html插入到html
				}else{
					var oHtml = '<p style="width:1638px;height:100px;font-size:16px;text-align:center;line-height:100px;">暂时没有车位申请记录!</p>'
					$(".handling tbody").html(oHtml);
				}
			});
		}else{
			common.ajax('/admin/selectdynamic',oData,function(res){
				console.log(res);
				if (res.map.length > 0) {
					var detail=res;
					var model1=$("#model1").html();//获取模板有<%
					var template=_.template(model1)(detail);//把数据填充到模板里面并去掉<%
					$(".unhandling tbody").html(template);//把html插入到html
				}else{
					var oHtml = '<p style="width:1638px;height:100px;font-size:16px;text-align:center;line-height:100px;">暂时没有车位申请记录!</p>'
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
		var oCarName = $('#name').val();
		var oData = {
			areaName: oName,
			userName: oCarName
		}
		if ($('.tab_box').find('li.curt').index() == 0) {
			common.ajax('/admin/apply',oData,function(res){
				console.log(res);
				if (res.map.length > 0) {
					var detail=res;
					var model=$("#model").html();//获取模板有<%
					var template=_.template(model)(detail);//把数据填充到模板里面并去掉<%
					$(".handling tbody").html(template);//把html插入到html
				}else{
					var oHtml = '<p style="width:1638px;height:100px;font-size:16px;text-align:center;line-height:100px;">暂时没有车位申请记录!</p>'
					$(".handling tbody").html(oHtml);
				}
				__page(res,0);
			});
		}else{
			common.ajax('/admin/selectdynamic',oData,function(res){
				console.log(res);
				if (res.map.length > 0) {
					var detail=res;
					var model1=$("#model1").html();//获取模板有<%
					var template=_.template(model1)(detail);//把数据填充到模板里面并去掉<%
					$(".unhandling tbody").html(template);//把html插入到html
				}else{
					var oHtml = '<p style="width:1638px;height:100px;font-size:16px;text-align:center;line-height:100px;">暂时没有车位申请记录!</p>'
					$(".unhandling tbody").html(oHtml);
				}
				__page(res,1);
			});
			
		}
		

		// 取值,请求 
		// alert('后面搞');
	});

	// 已安装详情
	$('body').on('click','.detail_btn1',function(){
		var oId = $(this).next().next('span.id').text();
		window.location.href = 'ownersApplyDetail.html?id=' + oId;

	});
	// 未安装详情
	$('body').on('click','.detail_btn2',function(){
		var oId = $(this).next('span.id').text();
		window.location.href = 'ownersApplyDetail1.html?id=' + oId;

	});
	// 删除
	$('body').on('click','.delete_btn',function(){
		// 取id，存页头或者cookie
		var oData = {},
			oArr = [];
		var oId = parseInt($(this).next('span.id').text());
		// oArr.push(oId);
		// oData.array = oArr;
		oData.id = oId;
		console.log(oData);
		__removeParking(oData);
		// // 取id，存页头或者cookie
		// alert('删除，等后面搞');
	});

	// 删除多个
	$('body').on('click','.all-delete',function(){
		var oData = {},
			oArr = [];
		for (var i = 0; i < $('.checked_box_table').find('.checked_box').length; i++) {
			var oId = $('.checked_box_table').find('.checked_box').eq(i).find('span.id').text();
			oArr.push(oId);
		}
		oData.array = oArr;
		__removeParking(oData);
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
			common.ajax('/admin/deleteapply',oData,function(res){
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
		// console.log(index);
		$(this).addClass('curt').siblings().removeClass('curt');
		// 到时候这些切换的用同一个div来更换数据就好了,所以下面的$('.tab_cont li')不需要了
		$('.tab_cont li.cont').eq(index).show().siblings().hide();
		if ($('.already_processing').hasClass('curt')) {//已处理
			__oneManager();
		}else{//待处理
			__twoManager();
		}
	});

	// 下载表格
	$('body').on('click','.download_btn',function(){
		// console.log(common.oUrl);
		window.location.href = common.oUrl();
		// common.ajax('/admin/ApplyExcel','',function(){
		// 	var obj = JSON.parse(data);
  //                   var jsonstr = JSON.stringify(obj);
  //                   var jsary = eval('('+jsonstr+')');
  //                   alert(jsary.url)
		// });
	});

	
});