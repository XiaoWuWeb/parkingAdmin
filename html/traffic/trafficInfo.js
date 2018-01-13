$(function(){
	common.ajax('/traffic/selecttraffic','',function(res){
		console.log(res);
		if(res.map.length > 0){
			var detail = res;
			var model=$("#model").html();//获取模板有<%
			var template=_.template(model)(detail);//把数据填充到模板里面并去掉<%
			$(".layui-table tbody").html(template);//把html插入到html
		}else{
			var oHtml = '<p style="width:1638px;height:100px;font-size:16px;text-align:center;line-height:100px;">目前没有信息管理数据!</p>'
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

		var oCarAddress = $('#name').val();
		var oCarNum = $('#test5').val();
		// oData.parkAddress = oCarAddress;
		// oData.parkingNo = oCarNum;
		if (oCarAddress.length > 0) {
			oData.userName = oCarAddress;
		}
		if (oCarNum.length > 0) {
			oData.AcceptanceTime = oCarNum;
		}
		__pageAll(oData)
	}

	function __pageAll(data){
		var oData = data;
		common.ajax('/traffic/selecttraffics',oData,function(res){
			console.log(res);
			if(res.map.length > 0){
				var detail = res;
				var model=$("#model").html();//获取模板有<%
				var template=_.template(model)(detail);//把数据填充到模板里面并去掉<%
				$(".layui-table tbody").html(template);//把html插入到html
			}else{
				var oHtml = '<p style="width:1638px;height:100px;font-size:16px;text-align:center;line-height:100px;">目前没有信息管理数据!</p>'
				$(".layui-table tbody").html(oHtml);
			}
		});
	}

	// 搜索
	$('body').on('click','.search-btn',function(e){
		e.preventDefault();
		var oData = {};
		var oName = $('#name').val();
		var oTime = $('#test5').val();
		// oData.parkAddress = oCarAddress;
		// oData.parkingNo = oCarNum;
		if (oName.length > 0) {
			oData.userName = oName;
		}
		if (oTime.length > 0) {
			oData.AcceptanceTime = oTime;
		}
		common.ajax('/traffic/selecttraffics',oData,function(res){
			console.log(res);
			if(res.map.length > 0){
				var detail = res;
				var model=$("#model").html();//获取模板有<%
				var template=_.template(model)(detail);//把数据填充到模板里面并去掉<%
				$(".layui-table tbody").html(template);//把html插入到html
			}else{
				var oHtml = '<p style="width:1638px;height:100px;font-size:16px;text-align:center;line-height:100px;">目前没有信息管理数据!</p>'
				$(".layui-table tbody").html(oHtml);
			}
			__page(res);
		});
	});

	// // 添加
	// $('body').on('click','.add-parking',function(){
	// 	window.location.href = 'traffixEdit.html';
	// });

	// 进
	$('body').on('click','.edit_btn',function(){
		var oId = $(this).next().next().text();
		// 取id，存页头或者cookie
		window.location.href = 'traffixEdit.html?id=' + oId;
	});
	// 删除
	$('body').on('click','.delete_btn',function(){
		var oData = {};
			// oArr = [];
		var oId = parseInt($(this).next('span.hide').text());
		// oArr.push(oId);
		oData.id = oId;
		console.log(oData);
		__removeParking(oData);
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
			common.ajax('/traffic/deletetraffic',oData,function(res){
				console.log(res);
				if (res) {
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