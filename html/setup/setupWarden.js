$(function(){
	common.ajax('/admin/administrators','',function(res){
		console.log(res);
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
		__pageAll(oData)
	}
	function __pageAll(data){
		var oData = data;
		common.ajax('/admin/administrators',oData,function(res){
			console.log(res);
			if (res.map[0] != null) {
				var detail = res;
				var model=$("#model").html();//获取模板有<%
				var template=_.template(model)(detail);//把数据填充到模板里面并去掉<%
				$(".layui-table tbody").html(template);//把html插入到html
			}else{
				var oHtml = '<p style="width:1638px;height:100px;font-size:16px;text-align:center;line-height:100px;">目前没有对应的使用说明!</p>'
				$(".layui-table tbody").html(oHtml);
			}
		});
	}

	// 添加
	$('body').on('click','.add-parking',function(){
		window.location.href = 'setupAdd.html';
	});
});