$(function(){
    // common.ajax('/parking/parkingInfo',oData,function(res){
    //     console.log(res);
    // });
    
    // $.ajax({
    //     type: 'POST',
    //     url: 'http://192.168.0.116:8080/PayPay/parking/parkingInfo',
    //     data: oData,
    //     dataType: 'json',
    //     success: function(res){
    //         var oArr = [];
    //         // var oArrTwo = [];
    //         for (var i = 0; i < res.length; i++) {
    //             var oArrTwo = [];
    //             oArrTwo.push(res[i].payCarInfo.carNo);
    //             oArrTwo.push(res[i].payGeomagnetic.jd);
    //             oArrTwo.push(res[i].payGeomagnetic.wd);

    //             // console.log(res[i].payCarInfo.carNo+'-'+res[i].payGeomagnetic.jd+'-'+res[i].payGeomagnetic.wd+'-'+res[i].geomagnetic_no+'-'+res[i].payParkManager.status+'-'+res[i].payGeomagnetic.geomagnetic_status);
    //             if (res[i].payParkManager.status == 1 && res[i].payGeomagnetic.geomagnetic_status == 1) {
    //                 oArrTwo.push(res[i].payParkManager.status);
    //             }else{
    //                 oArrTwo.push('0');
    //             }
    //             oArr.push(oArrTwo);
    //             console.log(oArr);
    //             // console.log(oArr);
    //         }
            
    //     }
    // });

    // 地图
    var timeOut;
    function HumanMap(){
        var map = new BMap.Map("map",{enableMapClick: false});
        map.centerAndZoom(new BMap.Point(105.723174,36.07597),5);
        //  禁止双击地图放大
        // map.disableDoubleClickZoom();
        map.enableScrollWheelZoom(true);
        // 改变地图背景样式
        function changeMapStyleMap(style){
            map.setMapStyle({style:style});
        };
    //  changeMapStyleMap("midnight");  // 改变背景颜色
        map.enableScrollWheelZoom(); //  启用滚轮放大缩小，默认禁用        
        var cityId=null;
        // 复杂的自定义覆盖物
        //参数 point 坐标 , backImg 图片,oneparameter 状态,threeparameter 车牌号
    //  function ComplexCustomOverlay(point,backImg,num,oneparameter,twoparameter,threeparameter,fourparameter,fiveparameter){
        function ComplexCustomOverlay(point,backImg,num,oneparameter,threeparameter,state,fourparameter,fiveparameter,sixparameter){
          this._point = point;
          this._backImg=backImg;
          this._num=num;
          this._oneparameter=oneparameter;
          this._threeparameter=threeparameter;
          this._state=state;
          this._fourparameter=fourparameter;
          this._fiveparameter=fiveparameter;
          this._sixparameter=sixparameter;
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
            var oHtml = '';
            oHtml +='<div class="disNCz" style="display:none; position:absolute;padding:10px; left:-82px; top:-130px; width: 190px;height:100px; background:#000;border-radius:4px;"><div style="width:190px;height: 20px;"><span style="float: left;">状态：</span>';
            // console.log(this._state);
            // console.log(this._oneparameter);
            if(this._oneparameter == '0'){
                oHtml +='<span style="float: left;">有空位</span>';
            }else{
                oHtml +='<span style="float: left;">已停满</span>';
            }
        // if (this._state == 'space') {
        //     switch(this._oneparameter){
        //         case 1:
        //           oHtml +='<span style="float: left;">已泊车</span>';
        //           break;
        //         case 2:
        //           oHtml +='<span style="float: left;">空车位</span>';
        //           break;
        //         default:
        //           oHtml +='<span style="float: left;">已预约</span>';
        //     }
        // }else if(this._state == 'lock'){
        //     switch(this._oneparameter){
        //         case 1:
        //           oHtml +='<span style="float: left;">已泊车</span>';
        //           break;
        //         default:
        //           oHtml +='<span style="float: left;">空车位</span>';
        //     }
        // }else if(this._state == 'charging'){
        //     switch(this._oneparameter){
        //         case 1:
        //           oHtml +='<span style="float: left;">充电中</span>';
        //           break;
        //         default:
        //           oHtml +='<span style="float: left;">空车位</span>';
        //     }
        // }
        oHtml +='</div><div style="width: 190px;height: 20px;"><span style="float:left;">停车场名称：</span><span style="overflow: hidden;white-space: nowrap; text-overflow: ellipsis; white-space: nowrap;width: 105px;-webkit-line-clamp: 1;float:left;">'+this._threeparameter+'</span></div>';
        oHtml +='<div style="width: 190px;height: 20px;"><span style="float:left;">停车场总车位：</span><span style="float:left;">'+this._fiveparameter+'</span></div>';
        oHtml +='<div style="width: 190px;height: 20px;"><span style="float:left;">停车场空车位：</span><span style="float:left;">'+this._fourparameter+'</span></div>';
        oHtml +='<div style="width: 190px;height: 20px;"><span style="float:left;">停车场已停车位：</span><span style="float:left;">'+this._sixparameter+'</span></div><div style="width: 0;height: 0;border-left: 10px solid transparent;border-right: 10px solid transparent;border-top: 20px solid #000;margin: 0 auto;"></div></div>';
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
        var oAddressTwo;
        // setInterval(function(){
        //     if(oAddressTwo){
        //         function_name(oAddressTwo);
        //     }
            
        // },1000);
        $('body').on('click','.search-btn',function(e){
            e.preventDefault();
            var data_infoveh = [];
            map.clearOverlays();
            var oAddress = $('#district10').val();
            console.log(oAddress);
            var oData = {
                'address':oAddress
            }
            oAddressTwo = oData;
            function_name(oData);


        });

        function function_name(oData) {
            var data_infoveh = [];
                common.ajax('/parking/parkInfo',oData,function(res){
                    console.log(res);
                    if (res.success) {
                        var oArr = [];
                        // var oArrTwo = [];
                        for (var i = 0; i < res.data.length; i++) {
                            var oArrTwo = [];
                            oArrTwo.push(res.data[i].longitude);//经度
                            oArrTwo.push(res.data[i].latitude);//纬度
                            if(res.data[i].SumPark == res.data[i].SumUsePark){//这个是停车场状态
                                oArrTwo.push('1');
                            }else{
                                oArrTwo.push('0');
                            }
                            // 停车场：XXX停车场
                            // 总车位数：3
                            // 空车位数：1
                            // 使用车位数：2

                            // if (res[i].carStatus == 1 && res[i].geomagneticStatus == 1) {//这个是车位状态
                            //     oArrTwo.push(res[i].carStatus);
                            // }else{
                            //     oArrTwo.push('0');
                            // }

                            oArrTwo.push(res.data[i].parkName); //停车场名称
                            oArrTwo.push(res.data[i].parkAddress);//停车场地址
                            oArrTwo.push(res.data[i].SumNullPark);//停车场空车位
                            oArrTwo.push(res.data[i].SumPark);//停车场总车位
                            oArrTwo.push(res.data[i].SumUsePark);//停车场使用车位
                            // if (res[i].carType == 1) {  //这是判断是车位还是车位锁还是充电桩
                            //     oArrTwo.push('space');
                            // }else if(res[i].carType == 2){
                            //     oArrTwo.push('lock');
                            // }else if(res[i].carType == 3){
                            //     oArrTwo.push('charging');
                            // }
                            oArr.push(oArrTwo);
                            // console.log(oArr);
                            console.log(oArr);
                        }
                        var data = oArr;
                        console.log(data);
                        data_infoveh.push(data);
                        o = 1;
                        posiPoint(data_infoveh);
                    }
                });
            }
        // //点击智慧车位
        // $('body').on('click','.parking_space',function(){
        //     var oAddress = $('#district10').val();
        //     var oData = {
        //         'address':oAddress,
        //         'zhcw':1
        //     }
        //     common.ajax('/parking/parkInfo',oData,function(res){
        //         console.log(res);
        //         var oArr = [];
        //         var data_infoveh = [];
        //         // var oArrTwo = [];
        //         for (var i = 0; i < res.length; i++) {
        //             var oArrTwo = [];
        //             oArrTwo.push(res[i].JD);
        //             oArrTwo.push(res[i].WD);

        //             if (res[i].carStatus == 1 && res[i].geomagneticStatus == 1) {
        //                 oArrTwo.push(res[i].carStatus);
        //             }else{
        //                 oArrTwo.push('0');
        //             }

        //             oArrTwo.push(res[i].carNo);
        //             oArrTwo.push('space');
        //             // if (res[i].carType == 1) {
        //             //     oArrTwo.push('space');
        //             // }else if(res[i].carType == 2){
        //             //     oArrTwo.push('lock');
        //             // }else if(res[i].carType == 3){
        //             //     oArrTwo.push('charging');
        //             // }
        //             oArr.push(oArrTwo);
        //         }
        //         map.clearOverlays();
        //         data_infoveh.push(oArr);
        //         o = 1;
        //         posiPoint(data_infoveh);
        //     });
        //     // var data_infoveh = [];
        //     // map.clearOverlays();

        //     // var data = [
        //     //      [113.876293,22.612119,'1','粤B11111','space'],
        //     //      [113.872628,22.667704,'1','粤B33333','space'],
        //     //      [113.883839,22.650441,'2','','space'],
        //     //      [113.873839,22.622119,'2','','space'],
        //     //      [113.875839,22.632119,'3','粤B55555','space']
        //     // ];
        //     // data_infoveh.push(data);
        //     // o = 1;
        //     // posiPoint(data_infoveh);
        // });
        // //点击车位锁
        // $('body').on('click','.parking_lock',function(){
        //     var oAddress = $('#district10').val();
        //     var oData = {
        //         'address':oAddress,
        //         'cws':1
        //     }
        //     common.ajax('/parking/parkInfo',oData,function(res){
        //         console.log(res);
        //         var oArr = [];
        //         var data_infoveh = [];
        //         // var oArrTwo = [];
        //         for (var i = 0; i < res.length; i++) {
        //             var oArrTwo = [];
        //             oArrTwo.push(res[i].JD);
        //             oArrTwo.push(res[i].WD);

        //             if (res[i].carStatus == 1 && res[i].geomagneticStatus == 1) {
        //                 oArrTwo.push(res[i].carStatus);
        //             }else{
        //                 oArrTwo.push('0');
        //             }

        //             oArrTwo.push(res[i].carNo);
        //             oArrTwo.push('lock');
        //             // if (res[i].carType == 1) {
        //             //     oArrTwo.push('space');
        //             // }else if(res[i].carType == 2){
        //             //     oArrTwo.push('lock');
        //             // }else if(res[i].carType == 3){
        //             //     oArrTwo.push('charging');
        //             // }
        //             oArr.push(oArrTwo);
        //         }
        //         map.clearOverlays();
        //         data_infoveh.push(oArr);
        //         o = 1;
        //         posiPoint(data_infoveh);
        //     });


        //     // var data_infoveh = [];
        //     // map.clearOverlays();
        //     // var data = [
        //     //      [113.877659,22.659783,'1','粤B22222','lock'],
        //     //      [113.880839,22.642119,'1','粤B11111','lock'],
        //     //      [113.890839,22.648119,'1','粤B33333','lock'],
        //     //      [113.885839,22.636119,'2','','lock'],
        //     //      [113.863839,22.618119,'2','','lock']
        //     // ];
        //     // data_infoveh.push(data);
        //     // o = 1;
        //     // posiPoint(data_infoveh);
        // });
        // //点击智充电车位
        // $('body').on('click','.parking_charging',function(){
        //     var oAddress = $('#district10').val();
        //     var oData = {
        //         'address':oAddress,
        //         'cdz':1
        //     }
        //     common.ajax('/parking/parkInfo',oData,function(res){
        //         console.log(res);
        //         var oArr = [];
        //         var data_infoveh = [];
        //         // var oArrTwo = [];
        //         for (var i = 0; i < res.length; i++) {
        //             var oArrTwo = [];
        //             oArrTwo.push(res[i].JD);
        //             oArrTwo.push(res[i].WD);
                    
        //             if (res[i].carStatus == 1 && res[i].geomagneticStatus == 1) {
        //                 oArrTwo.push(res[i].carStatus);
        //             }else{
        //                 oArrTwo.push('0');
        //             }

        //             oArrTwo.push(res[i].carNo);
        //             oArrTwo.push('charging');
        //             // if (res[i].carType == 1) {
        //             //     oArrTwo.push('space');
        //             // }else if(res[i].carType == 2){
        //             //     oArrTwo.push('lock');
        //             // }else if(res[i].carType == 3){
        //             //     oArrTwo.push('charging');
        //             // }
        //             oArr.push(oArrTwo);
        //         }
        //         map.clearOverlays();
        //         data_infoveh.push(oArr);
        //         o = 1;
        //         posiPoint(data_infoveh);
        //     });


        //     // var data_infoveh = [];
        //     // map.clearOverlays();
        //     // var data = [
        //     //      [113.858543,22.637714,'1','粤B11111','charging'],
        //     //      [113.869839,22.625119,'1','粤B22222','charging'],
        //     //      [113.865839,22.630119,'1','粤B55555','charging'],
        //     //      [113.876839,22.649119,'2','','charging'],
        //     //      [113.881939,22.655119,'1','粤B33333','charging']
        //     // ];
        //     // data_infoveh.push(data);
        //     // o = 1;
        //     // posiPoint(data_infoveh);
        // });
        
        // 把定位点添加到地图中
        // function __addDot(data_infoveh){
        var o=1;
        function posiPoint(data_infoveh){
            var data_infoveh = data_infoveh;
            console.log(data_infoveh[0]);
            console.log(data_infoveh[0][o-1]);
            console.log(data_infoveh[0][o-1][2]);
            if(data_infoveh[0][o-1][2] == '1'){
                var backImg = "images/lock-P_busy_icon.png";
            }else{
                var backImg = "images/lot_P_icon.png";
            }
            // if (data_infoveh[0][o-1][4] == 'space'){
            //     if(data_infoveh[0][o-1][2] == '1'){
            //        var backImg = "images/lock-P_busy_icon.png";
            //     }
            //     if(data_infoveh[0][o-1][2] == '0'){
            //        var backImg = "images/lock-P_free_icon.png";
            //     }
            //     if(data_infoveh[0][o-1][2] == '3'){
            //        var backImg = "images/lot_P_icon.png";
            //     }
            // }
            // if (data_infoveh[0][o-1][4] == 'lock'){
            //     if(data_infoveh[0][o-1][2] == '1'){
            //        var backImg = "images/lock_busy_icon.png";
            //     }
            //     if(data_infoveh[0][o-1][2] == '0'){
            //        var backImg = "images/lock_free_icon.png";
            //     }
            // }
            // if (data_infoveh[0][o-1][4] == 'charging'){
            //     if(data_infoveh[0][o-1][2] == '1'){
            //        var backImg = "images/lock-C_busy_icon.png";
            //     }
            //     if(data_infoveh[0][o-1][2] == '0'){
            //        var backImg = "images/lock-C_free_icon.png";
            //     }
            // }
            var pointd = new BMap.Point(data_infoveh[0][o-1][0],data_infoveh[0][o-1][1]);
            var myCompOverlayveh = new ComplexCustomOverlay(pointd,backImg,o,data_infoveh[0][o-1][2],data_infoveh[0][o-1][3],data_infoveh[0][o-1][4],data_infoveh[0][o-1][5],data_infoveh[0][o-1][6],data_infoveh[0][o-1][7]);

            map.addOverlay(myCompOverlayveh);
            o++;
            if(o-1<data_infoveh[0].length){
               timeOut=setTimeout(posiPoint(data_infoveh),50);
            };
        };
            // posiPoint();
        // };

        // 点击具体放大地图
        map.addEventListener("click",function(e){
            map.setZoom();
            // alert(e.point.lng + "," + e.point.lat);
            // map.enableScrollWheelZoom(true);

        });
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
                // console.log(getcity);
                map.setViewport(pointArray);    //调整视野
                map.setZoom(num);
            });
        }

        $("#province10").change(function(){
            // console.log($(this).val());
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
            // console.log($(this).val());
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
            // console.log($(this).val());
            if ($('.info-cont').find('i').eq(3).attr('class') == 'district_name') {
                $('.info-cont').find('i').eq(3).text($(this).val());
            }else{
                var oHtml = '<i class="district_name">'+$(this).val()+'</i>';
                $('.info-cont').find('i').eq(2).after(oHtml);
            }
            getBoundary($("#province10 option:selected").html()+$("#city10 option:selected").html()+$("#district10 option:selected").html(),13);

        });
        // posiPoint();
    };
    HumanMap();

    // 切换

    $('body').on('click','.toggle-box',function(){
        if ($(this).attr('data') == '0') {
            $(this).attr('data','1');
            $('#map').hide();
            $('#main').show();
            $('.select-state').hide();
            $('.form-inline').hide();
            $(this).find('img.graph_icon').attr('src','../../images/diagram_icon.png');
            $(this).find('p').text('车位状态图');
        }else{
            $(this).attr('data','0');
            $('#map').show();
            $('#main').hide();
            $('.select-state').show();
            $('.form-inline').show();
            $(this).find('img.graph_icon').attr('src','../../images/graph_icon.png');
            $(this).find('p').text('车位覆盖图');
        }
    });


    // 覆盖图
    // var map2 = new BMap.Map("map_two");            // 创建Map实例
    // var point2 = new BMap.Point(110.723174, 30.07597);  
    // map2.centerAndZoom(point2,6);                 
    // map2.enableScrollWheelZoom();                  //启用滚轮放大缩小

   
});