$(function(){
	common.ajax('/instructions/selectinstr','',function(res){
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
		var oName = $('#title').val();
		var oTime = $('#time').val();
		if (oName.length > 0) {
			oData.ArticleTitle = oName;
		}
		if (oTime.length > 0) {
			oData.category = oTime;
		}
		__pageAll(oData)
	}
	function __pageAll(data){
		var oData = data;
		common.ajax('/instructions/selectinstrs',oData,function(res){
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

	// 搜索
	$('body').on('click','.search-btn',function(e){
		// 取值,请求 
		e.preventDefault();
		var oData = {};
		var oName = $('#title').val();
		var oTime = $('#time').val();
		if (oName.length > 0) {
			oData.ArticleTitle = oName;
		}
		if (oTime.length > 0) {
			oData.category = oTime;
		}
		common.ajax('/instructions/selectinstrs',oData,function(res){
			console.log(res);
			console.log(res.map);
			if (res.map[0] != null) {
				var detail = res;
				var model=$("#model").html();//获取模板有<%
				var template=_.template(model)(detail);//把数据填充到模板里面并去掉<%
				$(".layui-table tbody").html(template);//把html插入到html
			}else{
				var oHtml = '<p style="width:1638px;height:100px;font-size:16px;text-align:center;line-height:100px;">目前没有对应的使用说明!</p>'
				$(".layui-table tbody").html(oHtml);
			}
			__page(res);
		});
	});

	// 添加
	$('body').on('click','.add-parking',function(){
		window.location.href = 'useArticlesEdit.html';
	});

	// 详情
	$('body').on('click','.detail_btn',function(){
		var oId = $(this).next().next().next('span.hide').text();
		// 取id，存页头或者cookie
		window.location.href = 'useArticlesEdit1.html?id=' + oId;
	});

	// 编辑
	$('body').on('click','.edit_btn',function(){
		var oId = $(this).next().next('span.hide').text();
		// 取id，存页头或者cookie
		window.location.href = 'useArticlesEdit2.html?id=' + oId;
	});
	// 删除
	$('body').on('click','.delete_btn',function(){
		var oId = $(this).next('span.hide').text();
		var oData = {
			id: oId
		}
		console.log(oData);
		swal({

		  	title: "是否删除？",

		  	text: "是否需要删除该说明文章？",

		  	type: "warning",

		  	showCancelButton: true,

		  	cancelButtonColor:"#ccc",

			cancelButtonText: "取消",

		  	confirmButtonColor: "#3897fd",

		  	confirmButtonText: "是的",

		  	closeOnConfirm: false

		},

		function(){
			common.ajax('/instructions/deleteinstr',oData,function(res){
				if (res) {

					swal({

						title: "删除成功",

						text: "您选择的文章已经删除成功！",

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