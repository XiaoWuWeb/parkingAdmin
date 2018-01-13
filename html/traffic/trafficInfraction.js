$(function(){
	common.ajax('/traffic/selectPush','',function(res){
		console.log(res);
		
		console.log(res.map);
		if (res.map[0] != null) {
			var detail = res;
			var model=$("#model").html();//获取模板有<%
			var template=_.template(model)(detail);//把数据填充到模板里面并去掉<%
			$(".layui-table tbody").html(template);//把html插入到html
		}else{
			var oHtml = '<p style="width:1638px;height:100px;font-size:16px;text-align:center;line-height:100px;">目前没有违规信息!</p>'
			$(".layui-table tbody").html(oHtml);
		}
		__page(res);
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
		oData.pageIndex = n;
		var oCarNum = $('#district10').val();
		// oData.parkAddress = oCarAddress;
		// oData.parkingNo = oCarNum;
		if (oCarAddress.length > 0) {
			oData.areaName = oCarNum;
		}
		__pageAll(oData)
	}

	function __pageAll(data){
		var oData = data;
		common.ajax('/traffic/selectPushs',oData,function(res){
			if (res.map[0] != null) {
				var detail = res;
				var model=$("#model").html();//获取模板有<%
				var template=_.template(model)(detail);//把数据填充到模板里面并去掉<%
				$(".layui-table tbody").html(template);//把html插入到html
			}else{
				var oHtml = '<p style="width:1638px;height:100px;font-size:16px;text-align:center;line-height:100px;">目前没有违规信息!</p>'
				$(".layui-table tbody").html(oHtml);
			}
		});
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
		// 取值,请求 
		e.preventDefault();
		var oName = $('#district10').val();
		var oData = {
			areaName: oName
		}
		common.ajax('/traffic/selectPushs',oData,function(res){
			console.log(res);
			console.log(res.map);
			if (res.map[0] != null) {
				var detail = res;
				var model=$("#model").html();//获取模板有<%
				var template=_.template(model)(detail);//把数据填充到模板里面并去掉<%
				$(".layui-table tbody").html(template);//把html插入到html
			}else{
				var oHtml = '<p style="width:1638px;height:100px;font-size:16px;text-align:center;line-height:100px;">目前没有违规信息!</p>'
				$(".layui-table tbody").html(oHtml);
			}
			__page(res);
		});
	});

	// 推送
	$('body').on('click','.send_btn',function(){
		// 取id，存页头或者cookie
		alert('后面弄');

	});
	// 删除-单个
	$('body').on('click','.delete_btn',function(){
		var oId = $(this).next('span.hide').text();
		var oData = {
			id: oId
		}
		swal({

		  	title: "是否删除？",

		  	text: "是否需要删除该违停推送信息？",

		  	type: "warning",

		  	showCancelButton: true,

		  	cancelButtonColor:"#ccc",

			cancelButtonText: "取消",

		  	confirmButtonColor: "#3897fd",

		  	confirmButtonText: "是的",

		  	closeOnConfirm: false

		},

		function(){
			common.ajax('/traffic/deletepush',oData,function(res){
				if (res) {

					swal({

						title: "删除成功",

						text: "您选择的违停推送信息已经删除成功！",

						type: "success",

						showCancelButton: false,

						cancelButtonColor:"#ccc",

						cancelButtonText: "取消",

						confirmButtonColor: "#3897fd",

						confirmButtonText: "是的",

						closeOnConfirm: true,

						closeOnCancel: false

					},function(isConfirm){
						location.reload();
					});
					
				}else{
					swal("删除失败", " ", "error");
				}
			});

		});

	});


	
});