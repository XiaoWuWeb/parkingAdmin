 /*顶部日期*/
	function __newstime(){
	    var today = new Date();  
	    var year = today.getFullYear();
	    var month = today.getMonth()+1;
	    var day = today.getDate();
	    var weekday = new Array(7);
	    weekday[0] = "星期天"
	    weekday[1] = "星期一"
	    weekday[2] = "星期二"
	    weekday[3] = "星期三"
	    weekday[4] = "星期四"
	    weekday[5] = "星期五"
	    weekday[6] = "星期六";
	    var hours = today.getHours();
	    var minutes = today.getMinutes();
	    var seconds = today.getSeconds();
	    if(minutes < 10)
	    {
	    minutes = "0" + minutes;
	    }
	    if(seconds < 10)
	    {
	    seconds= "0" + seconds;
	    }
	    var dt = year + '年' + month + '月' + day + '日' + ' ' + hours + ':' + minutes + ' ' + weekday[today.getDay()];      
	    document.getElementById('time-cycle').innerHTML = dt;
	    setTimeout('__newstime()', 1000)
	}
	window.onload = __newstime;

$(function(){
// 	// 地图
//     function initMap(){
//         createMap();//创建地图
// //          setMapEvent();//设置地图事件
// //          addMapControl();//向地图添加控件
//          addMapOverlay();//向地图添加覆盖物
// //          addMapOverlay2();

//     }

//     function createMap(){
//         // 创建地图实例
//         map = new BMap.Map("map");
//         // // 初始化地图，设置中心点坐标和地图级别 与 创建点坐标
//         map.centerAndZoom(new BMap.Point(105.594132, 36.261848), 5);//经度，纬度，地图级别
//         // map.centerAndZoom(new BMap.Point(113.890451, 22.560072), 12);//经度，纬度，地图级别
//         map.enableScrollWheelZoom(); //开启鼠标滚轮缩放
//     }
    
//     function addClickHandler(target, window){
//         target.addEventListener("click", function(){
//             target.openInfoWindow(window);
//         });
//     }

//     function addMapOverlay(){//向地图添加覆盖物
//         // var pt = new BMap.Point(113.884701,22.597981);
//         // var myIcon = new BMap.Icon("images/lock_busy_icon.png", new BMap.Size(43,47));
//         // var marker2 = new BMap.Marker(pt,{icon:myIcon});  // 创建标注
//         // map.addOverlay(marker2);              // 将标注添加到地图中

//         var lat_lng = [[113.876293,22.612119],[113.877659,22.659783],[113.858543,22.637714],[113.872628,22.667704],[113.883839,22.65044]];
//         var Data = [{status:1},{status:1},{status:1}];
//         var markers = [
//             {content:"粤B11111",title:"已泊车",imageOffset: {width:-46,height:-21},position:{lat:22.612119,lng:113.876293},images:"images/lock_busy_icon.png"},
//             {content:"粤B22222",title:"空车位",imageOffset: {width:-46,height:-21},position:{lat:22.659783,lng:113.877659},images:"images/lock_free_icon.png"},
//             {content:"粤B33333",title:"已预约",imageOffset: {width:-46,height:-21},position:{lat:22.637714,lng:113.858543},images:"images/lock_waiting_icon.png"},
//             {content:"粤B44444",title:"已泊车",imageOffset: {width:-46,height:-21},position:{lat:22.667704,lng:113.872628},images:"images/lot_P_icon.png"},
//             {content:"粤B55555",title:"充电位",imageOffset: {width:-46,height:-21},position:{lat:22.65044,lng:113.883839},images:"images/lot_charge_icon.png"}
//         ];
//         // for(var i = 0, len = lat_lng.length; i < len; i++){
//         //     if(Data[i].status == 1){
//         //         markers.push({
//         //             content :"imei号:"+Data[i].imei+"<br>"+ Data[i].provice + Data[i].city + Data[i].district +Data[i].address+ "<br>负责人:" + Data[i].realname + ",手机号：" + Data[i].phone + "<br>维修次数：" + Data[i].repaircount + "设备电量：" + Data[i].electricity + "%",
//         //             title : null,
//         //             imageOffset : {width : -46, height : -21},
//         //             position : {lat : lat_lng[i][0], lng : lat_lng[i][1]}
//         //         });
//         //     }
//         // }

//         for(var index = 0; index < markers.length; index++){
//             var point = new BMap.Point(markers[index].position.lng, markers[index].position.lat);
//             var marker = new BMap.Marker(point, {
//                 icon : new BMap.Icon(markers[index].images, new BMap.Size(43, 47))
//             });
//             var myCompOverlayveh = new ComplexCustomOverlay(point,backImg,o,data_infoveh[o-1][2],data_infoveh[o-1][3],data_infoveh[o-1][4],data_infoveh[o-1][5],data_infoveh[o-1][6]);

//             var opts = {title : '<span style="font-size:14px;color:#0A8021">'+markers[index].title+'</span>'};
//             var infoWindow =new BMap.InfoWindow("<div style='font-size:10px;'>"+markers[index].content+"</div>", opts);

//             marker.addEventListener("mouseover", function(){
//                this.openInfoWindow(infoWindow);
//             });

//             // var label = new BMap.Label(markers[index].title, {offset : new BMap.Size(25, 5)});
//             // var opts = {
//             //     width : 200,
//             //     title : markers[index].title,
//             //     enableMessage : false
//             // };
//             // var infoWindow = new BMap.InfoWindow(markers[index].content, opts);
//             //marker.setLabel(label);
//             // addClickHandler(marker, infoWindow);
//             map.addOverlay(marker);
//             //marker.setAnimation(BMAP_ANIMATION_BOUNCE);//跳动
//         };
//     }

//     var map;
//     initMap();

    var timeOut;
        // 添加弹出框数据[113.876293,22.612119],[113.877659,22.659783],[113.858543,22.637714],[113.872628,22.667704],[113.883839,22.65044]
    var data_infoveh = [
             [113.876293,22.612119,'1','粤B11111'],
             [113.877659,22.659783,'1','粤B22222'],
             [113.858543,22.637714,'1','粤B11111'],    
             [113.872628,22.667704,'2','粤B33333'],
             [113.883839,22.65044,'2','粤B44444'],
             [113.873839,22.622119,'2','粤B22222'],    
             [113.875839,22.632119,'3','粤B55555'],
             [113.880839,22.642119,'3','粤B11111'],
             [113.890839,22.648119,'3','粤B33333'],
             [113.885839,22.636119,'4','粤B22222'],
             [113.863839,22.618119,'4','粤B44444'],
             [113.869839,22.625119,'4','粤B11111'],    
             [113.865839,22.630119,'4','粤B55555'],
             [113.876839,22.649119,'4','粤B44444'],
             [113.881939,22.655119,'3','粤B33333'],                     
        ];
function HumanMap(data_infoveh){
    var map = new BMap.Map("map",{enableMapClick: false});
    map.centerAndZoom(new BMap.Point(105.723174,36.07597),5);
    //  禁止双击地图放大
    map.disableDoubleClickZoom();    
    // 改变地图背景样式
    function changeMapStyleMap(style){
        map.setMapStyle({style:style});
    };
//  changeMapStyleMap("midnight");  // 改变背景颜色
    map.enableScrollWheelZoom(); //  启用滚轮放大缩小，默认禁用        
    var cityId=null;
    // 复杂的自定义覆盖物
    //参数 point 坐标 , backImg 图片,oneparameter 周边设备数,twoparameter 上网人数 ,threeparameter 车牌号 ,fourparameter 设备MAC,fiveparameter 时间
//  function ComplexCustomOverlay(point,backImg,num,oneparameter,twoparameter,threeparameter,fourparameter,fiveparameter){
    function ComplexCustomOverlay(point,backImg,num,oneparameter,threeparameter,fourparameter){
      this._point = point;
      this._backImg=backImg;
      this._num=num;
      this._oneparameter=oneparameter;
//    this._twoparameter=twoparameter;
      this._threeparameter=threeparameter;
      this._fourparameter=fourparameter;
//    this._fiveparameter=fiveparameter;
    };
    ComplexCustomOverlay.prototype = new BMap.Overlay();
    ComplexCustomOverlay.prototype.initialize = function(map){
      this._map = map;
      var div = this._div = document.createElement("div");      
      div.style.zIndex = BMap.Overlay.getZIndex(this._point.lat);
      div.style.background = "url("+this._backImg+") no-repeat center center";
      div.style.MozUserSelect = "none";
      $(div).css({"position":"absolute","z-index":this._num,"cursor":"pointer","height":"43","width":"47","white-space":"nowrap","margin":"0","padding":"0","color":"#fff","font-size":"14px"});
      $(div).attr({"num":this._num,"class":"pointD"});
      //  滑过显示盒子
      var onediv=document.createElement("div");
      $(onediv).css({"height":"30","width":"30","white-space":"nowrap","margin":"0","padding":"0","color":"#fff","text-align":"center","line-height":"30px"});
//    onediv.innerHTML=this._num;
    var oHtml = '';
        oHtml +='<div class="disNCz" style="display:none; position:absolute;padding:10px; left:-52px; top:-71px; width: 130px;height:40px; background:#000;border-radius:4px;"><div style="width:130px;height: 20px;"><span style="float: left;">状态：</span>';
    switch(this._oneparameter){
        case '1':
          oHtml +='<span style="float: left;">繁忙了</span>';
          break;
        case '2':
          oHtml +='<span style="float: left;">空闲中</span>';
          break;
        case '3':
          oHtml +='<span style="float: left;">已停车</span>';
          break;
        default:
          oHtml +='<span style="float: left;">故障了</span>';
    }
    oHtml +='</div><div style="width: 130px;height: 20px;"><span style="float:left;">车牌号：</span><span style="float:left;">'+this._threeparameter+'</span></div><div style="width: 0;height: 0;border-left: 10px solid transparent;border-right: 10px solid transparent;border-top: 20px solid #000;margin: 0 auto;"></div></div>';
      $(div).append(oHtml)
      div.appendChild(onediv);
      //  滑到显示       
      $(div).mousemove(function(){
            $(this).css("z-index","999999");
            $(this).children(".disNCz").css("display","block");
      });
      //  滑过隐藏
      $(div).mouseout(function(){
            $(this).css("z-index",$(this).attr("num"));
            $(this).children(".disNCz").css("display","none");            
      });
      map.getPanes().labelPane.appendChild(div);     
      return div;
    };
    ComplexCustomOverlay.prototype.draw = function(){
      var map = this._map;
      var pixel = map.pointToOverlayPixel(this._point);
      this._div.style.left = pixel.x-15+ "px";
      this._div.style.top  = pixel.y-15+"px";
    };        
    
    // 把定位点添加到地图中
    var o=1;
    function posiPoint(){   
        if(data_infoveh[o-1][2] == 1){
           var backImg = "images/lock_busy_icon.png";
        }
        if(data_infoveh[o-1][2] == 2){
           var backImg = "images/lock_free_icon.png";
        }
        if(data_infoveh[o-1][2] == 3){
           var backImg = "images/lock_waiting_icon.png";
        }
        if(data_infoveh[o-1][2] == 4){
           var backImg = "images/lot_charge_icon.png";
        }  
        var pointd = new BMap.Point(data_infoveh[o-1][0],data_infoveh[o-1][1]);
        var myCompOverlayveh = new ComplexCustomOverlay(pointd,backImg,o,data_infoveh[o-1][2],data_infoveh[o-1][3]);
        map.addOverlay(myCompOverlayveh);
        o++;
        if(o-1<data_infoveh.length){
           timeOut=setTimeout(posiPoint,50);
        };

    };
        // 联动

    function getBoundary(getcity,num){
        var bdary = new BMap.Boundary();
        bdary.get(getcity, function(rs){       //获取行政区域
            // map.clearOverlays();        //清除地图覆盖物
            var count = rs.boundaries.length; //行政区域的点有多少个
            if (count === 0) {
                alert('未能获取当前输入行政区域');
                return ;
            }
            var pointArray = [];
            for (var i = 0; i < count; i++) {
                var ply = new BMap.Polygon(rs.boundaries[i], {strokeWeight: 2, strokeColor: "#ff0000"}); //建立多边形覆盖物
                // map.addOverlay(ply);  //添加覆盖物
                pointArray = pointArray.concat(ply.getPath());

            }
            console.log(getcity);
            map.setViewport(pointArray);    //调整视野
            map.setZoom(num);
        });
    }

     $("#province10").change(function(){
        console.log($(this).val());
        if ($('.info-cont').find('i').eq(1).attr('class') == 'province_name') {
            $('.info-cont').find('i').eq(1).text($(this).val());
        }else{
            var oHtml = '<i class="province_name">'+$(this).val()+'</i>';
            $('.info-cont').find('i').eq(0).after(oHtml);
        }
        if ($('.info-cont').find('i').eq(3).attr('class') == 'district_name') {
            $('.district_name').remove();
        }
        if ($('.info-cont').find('i').eq(2).attr('class') == 'city_name') {
            $('.city_name').remove();
        }
        getBoundary($("#province10 option:selected").html(),7);

    });

    $("#city10").change(function(){
        console.log($(this).val());
        if ($('.info-cont').find('i').eq(2).attr('class') == 'city_name') {
            $('.info-cont').find('i').eq(2).text($(this).val());
        }else{
            var oHtml = '<i class="city_name">'+$(this).val()+'</i>';
            $('.info-cont').find('i').eq(1).after(oHtml);
        }
        if ($('.info-cont').find('i').eq(3).attr('class') == 'district_name') {
            $('.district_name').remove();
        }
        getBoundary($("#province10 option:selected").html()+$("#city10 option:selected").html(),10);

    });

    $("#district10").change(function(){
        console.log($(this).val());
        if ($('.info-cont').find('i').eq(3).attr('class') == 'district_name') {
            $('.info-cont').find('i').eq(3).text($(this).val());
        }else{
            var oHtml = '<i class="district_name">'+$(this).val()+'</i>';
            $('.info-cont').find('i').eq(2).after(oHtml);
        }
        getBoundary($("#province10 option:selected").html()+$("#city10 option:selected").html()+$("#district10 option:selected").html(),13);

    });


    posiPoint()
     
};
HumanMap(data_infoveh);




   
});