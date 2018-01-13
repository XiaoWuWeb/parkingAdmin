$(function(){
	// 到时候这些切换的用同一个div来更换数据就好了
	var oNum = 5;
	function __page(oNum){
		Page({
			num:oNum,					//页码数
			startnum:1,				//指定页码
			elem:$('#page1'),		//指定的元素
			callback:function(n){	//回调函数
				console.log(n);
			}
		});
	}
	__page(oNum);

	// Page({
	// 		num:1,					//页码数
	// 		startnum:1,				//指定页码
	// 		elem:$('#page2'),		//指定的元素
	// 		callback:function(n){	//回调函数
	// 			console.log(n);
	// 		}
	// 	});

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
			__page(2);
			// 如果是1，隐藏跳转
			// $('.pageJump').hide();
		}
	});

	
});