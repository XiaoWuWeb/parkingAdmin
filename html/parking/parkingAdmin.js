$(function(){
	common.ajax('/park/allparkinglots',{roleType:1,id:''},function(res){
		console.log(res);
		if (res.map[0] != null) {
			var detail = res;
			var model=$("#model").html();//获取模板有<%
			var template=_.template(model)(detail);//把数据填充到模板里面并去掉<%
			$(".layui-table tbody").html(template);//把html插入到html
		}else{
			var oHtml = '<p style="width:1638px;height:100px;font-size:16px;text-align:center;line-height:100px;">该地区暂时没有停车场信息，请前往添加!</p>'
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
		var oCarName = $('#car_name').val();
		oData.roleType = 1;
		oData.id = '';

		// oData.parkAddress = oCarAddress;
		// oData.parkingNo = oCarNum;
		if (oName.length > 0) {
			oData.areaName = oName;
		}
		if (oCarName.length > 0) {
			oData.parkingName = oCarName;
		}
		__pageAll(oData)
	}

	function __pageAll(data){
		var oData = data;
		common.ajax('/park/allparkinglots',oData,function(res){
			console.log(res);
			var detail=res;
			var model=$("#model").html();//获取模板有<%
			var template=_.template(model)(detail);//把数据填充到模板里面并去掉<%
			$(".layui-table tbody").html(template);//把html插入到html
		});
	}

	// 详情跳转
	$('body').on('click','.detail',function(){
		var oAddress = $(this).parent().find('.laytable-cell-1-city').text();
		var oArea = $(this).find('span.area').text();
		var oNum = $(this).find('span.adress').text();
		common.setData('parkNo',oNum);
		common.setData('address',oAddress);
		common.setData('area',oArea);
		// console.log(oAddress);
		setTimeout(function(){
			// window.location.href = 'parkingDetail.html?parkNo=' + oNum + '&address=' +  oAddress + '&area=' + oArea;
			window.location.href = 'parkingDetail.html';
		},500)
		
	});

	// 添加
	$('body').on('click','.add-parking',function(){
		window.location.href = 'parkingAdd.html';
	});

	// 搜索
	$('body').on('click','.search-btn',function(e){
		e.preventDefault();
		var oName = $('#district10').val();
		var oCarName = $('#car_name').val();
		var oCarNum = $('#car_num').val();
		var oData = {
			areaName: oName,
			parkingName: oCarName,
			parkNo: oCarNum,
			roleType:1,
			id:''
		}
		common.ajax('/park/allparkinglots',oData,function(res){
			console.log(res);
			console.log(res.map);
			if (res.map[0] != null) {
				var detail = res;
				var model=$("#model").html();//获取模板有<%
				var template=_.template(model)(detail);//把数据填充到模板里面并去掉<%
				$(".layui-table tbody").html(template);//把html插入到html
			}else{
				var oHtml = '<p style="width:1638px;height:100px;font-size:16px;text-align:center;line-height:100px;">该地区暂时没有停车场信息，请前往添加!</p>'
				$(".layui-table tbody").html(oHtml);
			}
			__page(res);
		});
	});
	
});
