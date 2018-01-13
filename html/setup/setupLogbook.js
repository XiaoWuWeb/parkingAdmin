$(function(){
	Page({
			num:5,					//页码数
			startnum:1,				//指定页码
			elem:$('#page1'),		//指定的元素
			callback:function(n){	//回调函数
				console.log(n);
			}
		});

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
	$('body').on('click','.search-btn',function(){
		// 取值,请求 
		alert('后面搞');
	});

	// 添加
	$('body').on('click','.add-parking',function(){
		window.location.href = 'parkingEdit.html';
	});

	// 进
	$('body').on('click','.edit_btn',function(){
		// 取id，存页头或者cookie
		window.location.href = 'parkingEdit.html';
	});
	// 删除
	$('body').on('click','.delete_btn',function(){
		// 取id，存页头或者cookie
		alert('删除，等后面搞');
	});
	
});