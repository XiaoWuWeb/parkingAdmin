$(function(){
	common.ajax('/Agent/selectAgent','',function(res){
		console.log(res);
		if (res.map.length > 0) {
			var detail=res;
			var model=$("#model").html();//获取模板有<%
			var template=_.template(model)(detail);//把数据填充到模板里面并去掉<%
			$(".layui-table tbody").html(template);//把html插入到html
		}else{
			var oHtml = '<p style="width:1638px;height:100px;font-size:16px;text-align:center;line-height:100px;">您搜索的内容暂无数据！</p>'
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
		var oName = $('#name').val();
		var oAgents = $('#agents').val();
		if (oName.length > 0) {
			oData.companyName = oName;
		}
		if (oAgents.length > 0) {
			oData.agentArea = oAgents;
		}
		__pageAll(oData)
	}
	function __pageAll(data){
		var oData = data;
		common.ajax('/Agent/selectAgents',oData,function(res){
			console.log(res);
			if (res.map.length > 0) {
				var detail=res;
				var model=$("#model").html();//获取模板有<%
				var template=_.template(model)(detail);//把数据填充到模板里面并去掉<%
				$(".layui-table tbody").html(template);//把html插入到html
			}else{
				var oHtml = '<p style="width:1638px;height:100px;font-size:16px;text-align:center;line-height:100px;">您搜索的内容暂无数据！</p>'
				$(".layui-table tbody").html(oHtml);
			}
		});
	}
	
	// 搜索
	$('body').on('click','.search-btn',function(e){
		e.preventDefault();
		var oData = {};
		var oName = $('#name').val();
		var oAgents = $('#agents').val();
		// oData.parkAddress = oCarAddress;
		// oData.parkingNo = oCarNum;
		if (oName.length > 0) {
			oData.companyName = oName;
		}
		if (oAgents.length > 0) {
			oData.agentArea = oAgents;
		}
		common.ajax('/Agent/selectAgents',oData,function(res){
			console.log(res);
			if(res.map.length > 0){
				var detail = res;
				var model=$("#model").html();//获取模板有<%
				var template=_.template(model)(detail);//把数据填充到模板里面并去掉<%
				$(".layui-table tbody").html(template);//把html插入到html
			}else{
				var oHtml = '<p style="width:1638px;height:100px;font-size:16px;text-align:center;line-height:100px;">您搜索的内容暂无数据！</p>'
				$(".layui-table tbody").html(oHtml);
			}
			__page(res);
		});
	});

	// 添加
	$('body').on('click','.add-parking',function(){
		window.location.href = 'agencyAdminEdit1.html';
	});

	// 编辑
	$('body').on('click','.edit_btn',function(){
		var oId = $(this).next().next('span.hide').text();
		// 取id，存页头或者cookie
		window.location.href = 'agencyAdminEdit2.html?id=' + oId;
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

		  	text: "是否需要删除该代理商？",

		  	type: "warning",

		  	showCancelButton: true,

		  	cancelButtonColor:"#ccc",

			cancelButtonText: "取消",

		  	confirmButtonColor: "#3897fd",

		  	confirmButtonText: "是的",

		  	closeOnConfirm: false

		},

		function(){
			common.ajax('/Agent/deleteAgent',oData,function(res){
				if (res) {

					swal({

						title: "删除成功",

						text: "您选择的代理商已经删除成功！",

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