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
	common.ajax('/traffic/selecttrafficId',oDetail,function(res){
		console.log(res);
		$('#test5').val(res.acceptanceTime);
		// $('#province10').val(res.cityName);
		var opt;
		// $.each(res,function(i,item){
  //           opt+='<option  value="'+res.cityName+'" >'+res.cityName+'</option>';
  //       });
  		opt+='<option  value="'+res.cityName+'" >'+res.cityName+'</option>';
        $('#province10').html(opt);
		$('.text-area').val(res.informationContent);
		$('span.id').text(res.id)
		$('.pushArea').text(res.pushArea)
	});
	// 返回
	$('body').on('click','.return_btn',function(){
		window.location.href = 'trafficInfo.html';
	});
	// 确定
	$('body').on('click','.confirm_btn',function(){
		var oData = {
			id: $('span.id').text(),
			pushTime: $('#test5').val(),
			pushArea: $('.pushArea').text(),
			informationContent:$('.text-area').val()
		}
		common.ajax('/traffic/updatetraffic',oData,function(res){
			if (res) {
				window.location.href = 'trafficInfo.html';
			}else{
				swal("添加失败", " ", "error");
			}
		});
		
	});
});