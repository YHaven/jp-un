// 对Date的扩展，将 Date 转化为指定格式的String 
// 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符， 
// 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字) 
// 例子： 
// (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423 
// (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18 
Date.prototype.Format = function(fmt) { //author: meizz 
    var o = {
        "M+": this.getMonth() + 1, //月份 
        "d+": this.getDate(), //日 
        "h+": this.getHours(), //小时 
        "m+": this.getMinutes(), //分 
        "s+": this.getSeconds(), //秒 
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
        "S": this.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(fmt))
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt))
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}


// Jquery扩展  向上划出
jQuery.fn.fadeUp = function(speed) {
    var spaceTime = speed / 5;
    var that = $(this);
    var screenHeight = window.screen.height;
    //居中的
    // var offsetTop = that[0].offsetTop;
    // var marginTop = parseInt(that.css("margin-top").replace("px", ""));
    // var screenHeight = window.screen.height;
    // var nowTop = screenHeight - marginTop;
    // // if (that.css("display") != "none") return false;
    // that.css("top", nowTop);
    // var timer = setInterval(function() {
    //     that.css("top", nowTop - 5);
    //     nowTop = nowTop - 5;
    //     if (nowTop <= offsetTop - marginTop) {
    //         that.css("top", offsetTop - marginTop);
    //         window.clearInterval(timer);
    //     }
    // }, spaceTime);

    //底部
    var objHeight = that.outerHeight();
    var offsetTop = screenHeight - objHeight;
    var nowTop = screenHeight;
    var timer = setInterval(function() {
        that.css("top", nowTop);
        nowTop = nowTop - 5;
        if (nowTop <= offsetTop) {
            that.css("top", offsetTop);
            window.clearInterval(timer);
        }
    }, spaceTime);
}

/*
    msg text提示信息
    status 是否有错误状态
    autoclear是否3秒自动消失
*/
function showMessageBox(msg, status, autoclear) {


    var popupShade = $("<div></div>");
    popupShade.addClass("popup-shade");
    var popupWrapper = $("<div></div>");
    popupWrapper.addClass("popup-wrapper");
    if (typeof status != "undefined" && status != "") {
        var popupIcon = $("<p></p>");
        popupIcon.addClass("popup-icon");
        var popupI = $("<i></i>");
        if (status) {
            popupI.addClass("icon-popup-succ");
        } else {
            popupI.addClass("icon-popup-error");
        }
        popupIcon.append(popupI);
        popupWrapper.append(popupIcon);
    }

    var popupText = $("<p></p>");
    popupText.addClass("popup-text");
    popupText.html(msg);
    popupWrapper.append(popupText);
    popupShade.append(popupWrapper);
    var windowHeight = window.screen.height;
    popupShade.css({"height":windowHeight,"position":"fixed"});
    // var msgBoxWidth = parseInt(msgBox.outerWidth());
    // var msgBoxHeight = parseInt(msgBox.outerHeight());


    $("body").append(popupShade);
    //自动删除
    if (typeof autoclear != "undefined" && autoclear) {
        var msgBoxTimer = setInterval(function() {
            if ($(".popup-shade,.popup-wrapper").length > 0) {
                $(".popup-shade,.popup-wrapper").remove();
            } else {
                window.clearInterval(msgBoxTimer);
            }
        }, 3000);
    }else{
        $(".popup-shade,.popup-wrapper").click(function() {
            $(this).remove();
        });
    }
    
    


}


//获取url 参数值console.log(getUrlParam('picid'));  
function getUrlParam(name) {
    //构造一个含有目标参数的正则表达式对象  
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    //匹配目标参数  
    var r = window.location.search.substr(1).match(reg);
    //返回参数值  
    if (r != null) return unescape(r[2]);
    return null;
}

// 验证手机号码
function checkPhoneNumber(checkNum_) {
    var re; //11位 手机号码
    re = /^1[3|4|5|8][0-9]\d{8}$/
    if (re.test(checkNum_)) {
        return true;
    } else {
        return false;
    }
}

//验证邮政编码
function checkPostNumber(checkNum_) {
    var re = /^[1-9][0-9]{5}$/
    if (re.test(checkNum_))
        return true;
    else {
        return false;

    }
}
