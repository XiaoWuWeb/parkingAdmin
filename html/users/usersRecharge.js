$(function(){
	common.ajax('/appuser/selectuser','',function(res){
		console.log(res);
		if(res.map.length > 0){
			var detail = res;
			var model=$("#model").html();//获取模板有<%
			var template=_.template(model)(detail);//把数据填充到模板里面并去掉<%
			$(".layui-table tbody").html(template);//把html插入到html
		}else{
			var oHtml = '<p style="width:1638px;height:100px;font-size:16px;text-align:center;line-height:100px;">您搜索的内容无数据！</p>'
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
		var oName = $('#mobile').val();
		var oTime = $('#test5').val();
		if (oName.length > 0) {
			oData.mobile = oName;
		}
		if (oTime.length > 0) {
			oData.payDate = oTime;
		}
		__pageAll(oData)
	}
	function __pageAll(data){
		var oData = data;
		common.ajax('/appuser/selectusers',oData,function(res){
			if(res.map.length > 0){
				var detail = res;
				var model=$("#model").html();//获取模板有<%
				var template=_.template(model)(detail);//把数据填充到模板里面并去掉<%
				$(".layui-table tbody").html(template);//把html插入到html
			}else{
				var oHtml = '<p style="width:1638px;height:100px;font-size:16px;text-align:center;line-height:100px;">您搜索的内容无数据！</p>'
				$(".layui-table tbody").html(oHtml);
			}
		});
	}
	$('body').on('click','.search-btn',function(e){
		e.preventDefault();
		var oMobile = $('#mobile').val();
		var oCreateTime= $('#test5').val();
		var oData = {
			mobile: oMobile,
			payDate: oCreateTime
		}
		common.ajax('/appuser/selectusers',oData,function(res){
			console.log(res);
			console.log(res.map);
			// if (res.error != '0') {
			// 	var detail = res;
			// 	__page(res);
			// 	var model=$("#model").html();//获取模板有<%
			// 	var template=_.template(model)(detail);//把数据填充到模板里面并去掉<%
			// 	$(".layui-table tbody").html(template);//把html插入到html
			// }else{
			// 	var oHtml = '<p style="width:1638px;height:100px;font-size:16px;text-align:center;line-height:100px;">该地区暂时没有停车场信息，请前往添加!</p>'
			// 	$(".layui-table tbody").html(oHtml);
			// }

			if(res.map.length > 0){
				var detail = res;
				var model=$("#model").html();//获取模板有<%
				var template=_.template(model)(detail);//把数据填充到模板里面并去掉<%
				$(".layui-table tbody").html(template);//把html插入到html
			}else{
				var oHtml = '<p style="width:1638px;height:100px;font-size:16px;text-align:center;line-height:100px;">您搜索的内容无数据！</p>'
				$(".layui-table tbody").html(oHtml);
			}
			__page(res);
		});

	});

	
});
