$(function(){
	Page({
			num:5,					//页码数
			startnum:1,				//指定页码
			elem:$('#page1'),		//指定的元素
			callback:function(n){	//回调函数
				console.log(n);
			}
		});

	// 详情跳转
	$('body').on('click','.detail',function(){
		window.location.href = 'parkingDetail.html';
	});

	// 添加
	$('body').on('click','.add-parking',function(){
		window.location.href = 'parkingEdit.html';
	});

	
});
