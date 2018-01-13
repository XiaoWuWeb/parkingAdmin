$(function(){
	/*获取url的refer*/
	function getArgs(){
	    var args = {};
	    var match = null;
	    var search = decodeURIComponent(location.search.substring(1));
	    var reg = /(?:([^&]+)=([^&]+))/g;
	    while((match = reg.exec(search))!==null){
	        args[match[1]] = match[2];
	    }
	    return args;
	};
	var oUrl = location.search,
		oDetail = {};

	if (oUrl.indexOf("?") != -1){
		var search = getArgs();
		oDetail.id =  search.id	
	}

	common.ajax('/fault/allinfo',oDetail,function(res){
		console.log(res);
		if(res.type == 1){
			$('#classCar').val('智慧车位');
		}else if(res.type == 2){
			$('#classCar').val('车位锁');
		}else if(res.type == 3){
			$('#classCar').val('充电桩');
		}
		// $('#classCar').val(res.applicationTime);
		// $('#address').val(res.proName + res.cityName + res.areaName + res.address);
		$('#user').val(res.appuserId);
		$('#carNo').val(res.parkingNo);
		$('.text-area').val(res.describe);
		$('#time').val(res.date);
	});


	$('body').on('click','.return_btn',function(){
		window.location.href = 'fixFailure.html';
	});
});