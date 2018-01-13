(function () {
    var common = {
        init: function () {
//          this.addloading()//调用加载内容
//          this.ajaxSetting()//调用ajaxSetting方法
//          this.loadingFinish()//调用结束方法
        },
        //存储数据
        setData: function (name, obj) {
            if (typeof obj == "object") {
                obj = JSON.stringify(obj);//将obj转化为string类型
            }
            localStorage.setItem(name, obj)
        },
        //获取数据
        getData: function (key) {
            var data;
            //尝试运行逻辑代码，一旦出现bug就执行catch()
            try {
                var obj = localStorage.getItem(key);
                data = JSON.parse(obj); //将obj转化为json， locastorage只能存储字符串，所以必须转化类型
                if (data == null) {
                    data = false;
                }

            } catch (e) {
                data = obj
                if (data == null) {
                    data = false;
                }
            }
            return data;
        },
        //清除对应的key
        rmkey: function (key) {
            localStorage.removeItem(key)
        },
        //访问后台服务
        /**
         *
         * @param {Object} url 是传过来的路径
         * @param {Object} data data是传过来的请求参数
         * @param {Object} callback 回调函数
         */
        oUrl: function(){
            // return 'http://192.168.0.107:9090/PayPay/admin/ApplyExcel';
            // return 'https://www.wvmiboy.club/PayPay/admin/ApplyExcel';
         },
        ajax: function (url, data, callback) {
            $.ajax({
                cache:true,
                type: 'POST',
                // url: 'http://113.108.88.206:9080/PayPay' + url,//服务器
                   // url: 'http://192.168.0.110:8080/PayPay' + url,
                 // url: 'http://192.168.0.117:9090/PayPay' + url,
                url: 'https://www.lcgxlm.com/PayPay' + url,
//              url: 'https://www.wvmiboy.club/PayPay' + url,
               
                data: data,
                dataType: 'json',
                success : function(response){  
                    //成功执行    
                    callback(response);
                }
                // ,error:function(request){
                //     error(request);
                //     // console.log(request);
                // }
            });
        }
    }
    common.init();
    window.common = common;

})();

// 遮罩

;(function (root, factory) {
    'use strict';

    if (typeof module === 'object' && typeof module.exports === 'object') {
        factory(require('jquery'),root);
    } if(typeof define ==="function"){
        if(define.cmd){
            define(function(require, exports, module){
                var $ = require("jquery");
                factory($,root);
            });
        }else{
            define(["jquery"],function($){
                factory($,root);
            });
        }
    }else {
        factory(root.jQuery,root);
    }
} (typeof window !=="undefined" ? window : this, function ($, root, undefined) {
    'use strict';
    if(!$){
        $ = root.jQuery || null;
    }
    if(!$){
        throw new TypeError("必须引入jquery库方可正常使用！");
    }

    var arraySlice = Array.prototype.slice,
        comparison=function (obj1,obj2) {
            var result=true;
            for(var pro in obj1){
                if(obj1[pro] !== obj2[obj1]){
                    result=true;
                    break;
                }
            }
            return result;
        }

    function MLoading(dom,options) {
        options=options||{};
        this.dom=dom;
        this.options=$.extend(true,{},MLoading.defaultOptions,options);
        this.curtain=null;
        this.render().show();
    }
    MLoading.prototype={
        constructor:MLoading,
        initElement:function () {
            var dom=this.dom,
                ops=this.options;
            var curtainElement=dom.children(".mloading"),
                bodyElement = curtainElement.children('.mloading-body'),
                barElement = bodyElement.children('.mloading-bar'),
                iconElement = barElement.children('.mloading-icon'),
                textElement = barElement.find(".mloading-text");
            if (curtainElement.length == 0) {
                curtainElement = $('<div class="mloading"></div>');
                dom.append(curtainElement);
            }
            if (bodyElement.length == 0) {
                bodyElement = $('<div class="mloading-body"></div>');
                curtainElement.append(bodyElement);
            }
            if (barElement.length == 0) {
                barElement = $('<div class="mloading-bar"></div>');
                bodyElement.append(barElement);
            }
            if (iconElement.length == 0) {
                var _iconElement=document.createElement(ops.iconTag);
                iconElement = $(_iconElement);
                iconElement.addClass("mloading-icon");
                barElement.append(iconElement);
            }
            if (textElement.length == 0) {
                textElement = $('<span class="mloading-text"></span>');
                barElement.append(textElement);
            }
            
            this.curtainElement=curtainElement;
            this.bodyElement = bodyElement;
            this.barElement = barElement;
            this.iconElement = iconElement;
            this.textElement = textElement;
            return this;
        },
        render:function () {
            var dom=this.dom,
                ops=this.options;
            this.initElement();
            if(dom.is("html") || dom.is("body")){
                this.curtainElement.addClass("mloading-full");
            }else{
                this.curtainElement.removeClass("mloading-full");

                if(!dom.hasClass("mloading-container")){
                    dom.addClass("mloading-container");
                }
            }
            if(ops.mask){
                this.curtainElement.addClass("mloading-mask");
            }else{
                this.curtainElement.removeClass("mloading-mask");
            }
            if(ops.content!="" && typeof ops.content!="undefined"){
                if(ops.html){
                    this.bodyElement.html(ops.content);
                }else{
                    this.bodyElement.text(ops.content);
                }
            }else{
                this.iconElement.attr("src",ops.icon);
                if(ops.html){
                    this.textElement.html(ops.text);
                }else{
                    this.textElement.text(ops.text);
                }
            }

            return this;
        },
        setOptions:function (options) {
            options=options||{};
            var oldOptions = this.options;
            this.options = $.extend(true,{},this.options,options);
            if(!comparison(oldOptions,this.options)) this.render();
        },
        show:function () {
            var dom=this.dom,
                ops=this.options,
                barElement=this.barElement;
            this.curtainElement.addClass("active");
            barElement.css({
                "marginTop":"-"+barElement.outerHeight()/2+"px",
                "marginLeft":"-"+barElement.outerWidth()/2+"px"
            });

            return this;
        },
        hide:function () {
            var dom=this.dom,
                ops=this.options;
            this.curtainElement.removeClass("active");
            if(!dom.is("html") && !dom.is("body")){
                dom.removeClass("mloading-container");
            }
            return this;
        },
        destroy:function () {
            var dom=this.dom,
                ops=this.options;
            this.curtainElement.remove();
            if(!dom.is("html") && !dom.is("body")){
                dom.removeClass("mloading-container");
            }
            dom.removeData(MLoading.dataKey);
            return this;
        }
    };
    MLoading.dataKey="MLoading";
    MLoading.defaultOptions = {
        text:"加载中...",
        iconTag:"img",
        icon:"data:image/gif;base64,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",
        html:false,
        content:"",//设置content后，text和icon设置将无效
        mask:true//是否显示遮罩（半透明背景）
    };

    $.fn.mLoading=function (options) {
        var ops={},
            funName="",
            funArgs=[];
        if(typeof options==="object"){
            ops = options;
        }else if(typeof options ==="string"){
            funName=options;
            funArgs = arraySlice.call(arguments).splice(0,1);
        }
        return this.each(function (i,element) {
            var dom = $(element),
                plsInc=dom.data(MLoading.dataKey);
            if(!plsInc){
                plsInc=new MLoading(dom,ops);
            }

            if(funName){
                var fun = plsInc[funName];
                if(typeof fun==="function"){
                    fun.apply(plsInc,funArgs);
                }
            }
        });
    }
}));

/*改变高度与获取高度*/
// function __windowHeight(){

//     //计算屏幕高度
//     var oHeight = document.body.clientHeight;
//     document.getElementById('nav').style.height= (oHeight - 80) + "px";
// }
// __windowHeight();
// window.onresize = function(){
//     __windowHeight();
// }

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
        setTimeout('__newstime()', 60000)
    }
    window.onload = __newstime;



$(function(){
    $("body").mLoading("show");
    $('.user_name').text($.cookie('userNickname'));
    // for (var i = 0; i < $('.fix-nav').find('.nav-child > li').length; i++) {
    //     if ( i == 2) {
    //         $('.fix-nav').find('.nav-child > li').eq(i).remove()
    //     }
    // }
    if ($.cookie('roleType') == 2) {//代理商
        $('.fix-nav').find('.nav-child').find('li.fixFeedback').remove();
        $('.fix-nav').find('.nav-child').find('li.fixMoney').remove();

        $('.users-nav').find('.nav-child').find('li.usersValidation').remove();
        $('.users-nav').find('.nav-child').find('li.usersMessage').remove();

        $('.owners-nav').remove();


        $('.bill-nav').remove();
        $('.agency-nav').remove();


        $('.setup-nav').find('.nav-child').find('li.setupOperation').remove();
        $('.setup-nav').find('.nav-child').find('li.setupAlipay').remove();
        $('.setup-nav').find('.nav-child').find('li.setupWeChat').remove();
        $('.setup-nav').find('.nav-child').find('li.setupBankCard').remove();
        $('.setup-nav').find('.nav-child').find('li.setupApplePay').remove();
        $('.setup-nav').find('.nav-child').find('li.setupValidation').remove();
        $('.setup-nav').find('.nav-child').find('li.setupVersion').remove();
        $('.setup-nav').find('.nav-child').find('li.setupLogbook').remove();
        $('.setup-nav').find('.nav-child').find('li.setupAdmin').remove();
    }
    if ($.cookie('roleType') == 3) {//交通
        $('.parking-nav').remove();
        $('.fix-nav').remove();
        $('.agency-nav').remove();
        $('.users-nav').remove();
        $('.owners-nav').remove();
        $('.bill-nav').remove();

        $('.setup-nav').find('.nav-child').find('li.setupOperation').remove();
        $('.setup-nav').find('.nav-child').find('li.setupAlipay').remove();
        $('.setup-nav').find('.nav-child').find('li.setupWeChat').remove();
        $('.setup-nav').find('.nav-child').find('li.setupBankCard').remove();
        $('.setup-nav').find('.nav-child').find('li.setupApplePay').remove();
        $('.setup-nav').find('.nav-child').find('li.setupValidation').remove();
        $('.setup-nav').find('.nav-child').find('li.setupVersion').remove();
        $('.setup-nav').find('.nav-child').find('li.setupLogbook').remove();
        $('.setup-nav').find('.nav-child').find('li.setupAdmin').remove();
        
        // $('.bill-nav').find('.nav-child').find('li.billAlipay').remove();
        // $('.bill-nav').find('.nav-child').find('li.billWeChat').remove();
        // $('.bill-nav').find('.nav-child').find('li.billBankCard').remove();
        // $('.bill-nav').find('.nav-child').find('li.billApplePay').remove();
    }else{
        $('.fix-nav').find('.nav-child').find('li.fixFeedback').remove();
        $('.fix-nav').find('.nav-child').find('li.fixMoney').remove();

        $('.users-nav').find('.nav-child').find('li.usersValidation').remove();
        $('.users-nav').find('.nav-child').find('li.usersMessage').remove();

        $('.owners-nav').remove();

        $('.bill-nav').remove();

        $('.setup-nav').find('.nav-child').find('li.setupOperation').remove();
        $('.setup-nav').find('.nav-child').find('li.setupAlipay').remove();
        $('.setup-nav').find('.nav-child').find('li.setupWeChat').remove();
        $('.setup-nav').find('.nav-child').find('li.setupBankCard').remove();
        $('.setup-nav').find('.nav-child').find('li.setupApplePay').remove();
        $('.setup-nav').find('.nav-child').find('li.setupValidation').remove();
        $('.setup-nav').find('.nav-child').find('li.setupVersion').remove();
        $('.setup-nav').find('.nav-child').find('li.setupLogbook').remove();
        $('.setup-nav').find('.nav-child').find('li.setupAdmin').remove();
    }
    setTimeout(function(){
        $("body").mLoading("hide");
    },500);
/*Head*/
    // 顶部个人信息切换显示
    $('body').on('click','.admin-info',function(e){
        if ($(this).find('.nav_icon_arrow').attr('src') == "../../images/top-nav_icon_arrow1.png") {
            $(this).find('.nav_icon_arrow').attr('src','../../images/top-nav_icon_arrow.png');
            $('.layui-nav-child').show();

        }else{
            $(this).find('.nav_icon_arrow').attr('src','../../images/top-nav_icon_arrow1.png');
            $('.layui-nav-child').hide();
        }
        var that = this;
        $(document).on('click',function(){
            $(that).find('.nav_icon_arrow').attr('src','../../images/top-nav_icon_arrow1.png');
            $('.layui-nav-child').hide();
        });
        e.stopPropagation()
    });
    // 修改密码
    // 开启
    $('body').on('click','.change_password',function(){
        $('.cover-box').show();
        $('.change_password_box').show();
    });
    // 关闭
    $('body').on('click','.cover-box',function(){
        $('#old_password').val('');
        $('#new_password').val('');
        $('#confirm_password').val('');
        $('.cover-box').hide();
        $('.change_password_box').hide();
        $('.nav_icon_arrow').attr('src','images/top-nav_icon_arrow1.png');
        $('.user-tools').hide();
    });
    // 确定修改
    $('body').on('click','.confirm_button',function(){
        // 后台提交,先模拟刷新
        window.location.reload();
    });
    // 退出登录
    $('body').on('click','.pull_out',function(){
        common.ajax('/admin/outLogin','',function(res){
            if (res) {
                $.cookie('token', '',{ expires: -1 });
                setTimeout(function(){
                    window.location.href = '/ParkingAdmin/login.html';
                },500)
                
            }
            
        });
        // 后台提交,先模拟跳转
        // window.location.href = 'login.html';
    });

    /*左侧导航栏点击跳转*/
    // $('body').on('click','.nav ul li',function(){
    //     var oHtml = $(this).find('span.hide').text();
    //     window.location.href = oHtml;
    // });

    // 左侧导航栏展开
    $('body').on('click','.nav-item',function(){
        // $(this).addClass('current').siblings().removeClass('current');
        $('.nav-child').slideUp();
        if ($(this).attr('data') == '0') {
            $(this).attr('data','1');
            $(this).siblings('.nav-item').attr('data','0');
            $(this).find('ul.nav-child').slideDown();
        }else{
            $(this).attr('data','0');
            $(this).siblings('.nav-item').attr('data','0');
            $(this).find('ul.nav-child').slideUp();

        }
    });
	
	//修改密码
	$("body").on("click", ".change_password",function(){
        layer.open({
            title:"修改密码",
            type: 2,
            shadeClose: true, //点击遮罩关闭
            area : ['380px', '400px'],
            content: '../layout/pwd.html',
            end: function () {
                // window.location.reload();
            }

        });
    })

        // 确定修改密码 
            $('body').on('click','#comfirm_btn',function(e){
                e.preventDefault();
                var userPassword = $('#userPassword').val(),
                    newpassword = $('#newpassword').val(),  
                    confirmpassword = $('#confirmpassword').val(),
                    oData = {},
                    uPattern = /^[a-zA-Z0-9_-]{6,20}$/;
                console.log($.cookie('token'));
                if (uPattern.test(newpassword)
                    && uPattern.test(confirmpassword)
                    && userPassword.length > 0
                    && newpassword.length > 0
                    && confirmpassword.length > 0) {
                    oData.userPassword = userPassword;
                    oData.newpassword = newpassword;
                    oData.confirmpassword = confirmpassword;
                    oData.id = $.cookie('token');
                    common.ajax('/admin/pwd',oData,function(res){
                        if(res == 1){
                            __pwd()
                            // swal("修改密码成功", " ", "success");
                        }else if(res == 2){
                            swal("两次输入密码不一致", " ", "error");
                        }else if(res == 3){
                            swal("初始密码错误", " ", "error");
                        }else if(res == 4){
                            swal("密码不能为空!", " ", "error");
                        }else{
                            swal("修改密码失败", " ", "error");
                        }
                    });
                }else{
                    swal("修改密码失败", " ", "error");
                }
            
            });
        function __pwd(){
            swal({

                title: "修改密码成功",

                text: " ",

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
                    window.parent.location.href = '/ParkingAdmin/login.html';
                }

            });
            
        }
        function __reloadPage(argument) {
            window.location.reload();
        }
	// setTimeout(function(){
 //        __reloadPage()
 //    },1000)
    
    
    var oHtml = "<div class='message_box'></div>"
    $('body').append(oHtml);
    var oToken = $.cookie('token');
    var goEasy = new GoEasy({appkey: "BC-8e162c28565c41a2bfae9a6b9a0e5212"  });  
    goEasy.subscribe({  
        channel: oToken,  
        onMessage: function(message){
            // console.log(message.content);
            // alert(message.content);
            $('.message_box').html(message.content);
            $('.message_box').show();
            // alert(message.content);


            if (window.Notification) {

                var popNotice = function() {
                    if (Notification.permission == "granted") {
                        var notification = new Notification("用户,您好", {
                            body: message.content,
                            icon: '../images/laba.png',
                            requireInteraction:true
                        });

                        notification.onclick = function() {
                            // alert('李佳是傻瓜');
                            // window.location.href="./fix.html";
                            notification.close();
                        };
                    }
                };
                Notification.requestPermission().then(function(permission) {
                    if(permission === 'granted'){

                    }else if(permission === 'denied'){
                        if(confirm(message.content)){
                            // alert('李佳是傻瓜');
                            // window.location.href="../fix/fix.html";
                        }
                    }
                });
                popNotice();
            }
            else {
                if(confirm(message.content)){
                    // alert('李佳是傻瓜');
                    // window.location.href="./fix.html";
                }
            }





            // $('.message_box').velocity("transition.slideUpIn", { duration: 650 });
        }  
    }); 



});