$(function(){
	common.ajax('/fault/qthedrum','',function(res){
		console.log(res);
		if (res.map.length > 0) {
			var detail=res;
			var model=$("#model").html();//获取模板有<%
			var template=_.template(model)(detail);//把数据填充到模板里面并去掉<%
			$(".unhandling tbody").html(template);//把html插入到html
		}else{
			var oHtml = '<p style="width:1638px;height:100px;font-size:16px;text-align:center;line-height:100px;">暂时没有信息！</p>'
			$(".unhandling tbody").html(oHtml);
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
		var areaName = $('#district10').val();
		var userPhone = $('#name').val();
		// oData.parkAddress = oCarAddress;
		// oData.parkingNo = oCarNum;
		if (areaName.length > 0) {
			oData.areaName = areaName;
		}
		if (userPhone.length > 0) {
			oData.userPhone = userPhone;
		}
		__pageAll(oData)
	}
	function __pageAll(data){
		var oData = data;
		common.ajax('/fault/qthedrum',oData,function(res){
			console.log(res);
			if (res.map.length > 0) {
				var detail=res;
				var model=$("#model").html();//获取模板有<%
				var template=_.template(model)(detail);//把数据填充到模板里面并去掉<%
				$(".layui-table tbody").html(template);//把html插入到html
			}else{
				var oHtml = '<p style="width:1638px;height:100px;font-size:16px;text-align:center;line-height:100px;">该停车场暂时没有车位信息，请前往添加!</p>'
				$(".layui-table tbody").html(oHtml);
			}
		});
	}
	// 搜索
	$('body').on('click','.search-btn',function(e){
		e.preventDefault();
		var oData = {};
		var oName = $('#name').val();
		var oAgents = $('#district10').val();
		// oData.parkAddress = oCarAddress;
		// oData.parkingNo = oCarNum;
		if (oName.length > 0) {
			oData.userPhone = oName;
		}
		if (oAgents.length > 0) {
			oData.areaName = oAgents;
		}
		common.ajax('/fault/qthedrum',oData,function(res){
			console.log(res);
			if(res.map.length > 0){
				var detail = res;
				var model=$("#model").html();//获取模板有<%
				var template=_.template(model)(detail);//把数据填充到模板里面并去掉<%
				$(".layui-table tbody").html(template);//把html插入到html
			}else{
				var oHtml = '<p style="width:1638px;height:100px;font-size:16px;text-align:center;line-height:100px;">该停车场暂时没有车位信息，请前往添加!</p>'
				$(".layui-table tbody").html(oHtml);
			}
			__page(res);
		});
	});
	
});
