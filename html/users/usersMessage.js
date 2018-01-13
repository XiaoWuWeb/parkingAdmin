$(function(){
	common.ajax('/sys/appinfo','',function(res){
		console.log(res);
		if (res.map.length > 0) {
			var detail=res;
			var model=$("#model").html();//获取模板有<%
			var template=_.template(model)(detail);//把数据填充到模板里面并去掉<%
			$(".layui-table tbody").html(template);//把html插入到html
		}else{
			var oHtml = '<p style="width:1638px;height:100px;font-size:16px;text-align:center;line-height:100px;">该地区暂时没有系统信息，请前往添加!</p>'
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
		var oName = $('#district10').val();
		if (oName.length > 0) {
			oData.areaName = oName;
		}
		__pageAll(oData)
	}
	function __pageAll(data){
		var oData = data;
		common.ajax('/sys/appinfo',oData,function(res){
			console.log(res);
			if (res.map.length > 0) {
				var detail=res;
				var model=$("#model").html();//获取模板有<%
				var template=_.template(model)(detail);//把数据填充到模板里面并去掉<%
				$(".layui-table tbody").html(template);//把html插入到html
			}else{
				var oHtml = '<p style="width:1638px;height:100px;font-size:16px;text-align:center;line-height:100px;">该地区暂时没有系统位信息，请前往添加!</p>'
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
		e.preventDefault();
		var oData = {};
		var oName = $('#district10').val();
		if (oName.length > 0) {
			oData.areaName = oName;
		}
		common.ajax('/sys/appinfo',oData,function(res){
			console.log(res);
			if(res.map.length > 0){
				var detail = res;
				var model=$("#model").html();//获取模板有<%
				var template=_.template(model)(detail);//把数据填充到模板里面并去掉<%
				$(".layui-table tbody").html(template);//把html插入到html
			}else{
				var oHtml = '<p style="width:1638px;height:100px;font-size:16px;text-align:center;line-height:100px;">该地区暂时没有系统信息，请前往添加!</p>'
				$(".layui-table tbody").html(oHtml);
			}
			__page(res);
		});
	});

	// 进
	$('body').on('click','.detail_btn',function(){
		// 取id，存页头或者cookie
		alert('少详情页面');

	});
	// 删除
	$('body').on('click','.delete_btn',function(){
		// 取id，存页头或者cookie
		alert('删除，等后面搞');
	});

	// 切换
	$('body').on('click','.tab_box li',function(){
		var index = $(this).index();

		$(this).addClass('curt').siblings().removeClass('curt');
		// 到时候这些切换的用同一个div来更换数据就好了,所以下面的$('.tab_cont li')不需要了
		$('.tab_cont li.cont').eq(index).show().siblings().hide();

		if ($('.already_processing').hasClass('curt')) {
			// alert(1);
			// 已处理
			__page(5);
			$('.pageJump').show();
		}else{
			// alert(2);
			// 待处理
			__page(1);
			// 如果是1，隐藏跳转
			$('.pageJump').hide();
		}
	});

	
});