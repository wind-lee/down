/**
 * Created by lxr on 2017/3/23.
 */
var swiper = new Swiper('.swiper-container', {
    slidesPerView: 'auto',
    spaceBetween: 10
});
$(function(){
    $('.tab-menu>a').click(function(){
        var $obj = $(this),_index = $obj.index();
        !$obj.hasClass('active') ? $obj.addClass('active').siblings().removeClass('active') : '';
        $('.pane-list>.tab-pane').eq(_index).addClass('active').siblings().removeClass('active');
    });
    var str = '<div id="weixin-tip" class="download"><img src="/down/images/android.png" alt="微信扫描打开APP下载链接提示代码优化" /></div>'
        + '<div id="ios-weixin-tip" class="download"><img src="/down/images/ios.png" alt="微信扫描打开APP下载链接提示代码优化" /></div>';
    $('body').append(str);
});
/*判断是否在微信*/
var ua = navigator.userAgent.toLowerCase();
var is_weixin = function () {
    if (ua.match(/MicroMessenger/i) == "micromessenger") {
        return true;
    } else {
        return false;
    }
}
/*安卓、ios下载地址*/
var getUrl = function(obj){
    if (is_weixin()) {
        if(/iphone|ipad|ipod/.test(ua)){
            isPhone("ios-weixin-tip");
        }else if(/android/.test(ua)){
            isPhone("weixin-tip");
        }
    } else {
        if(/iphone|ipad|ipod/.test(ua)){
            window.location.href = obj.attr('down-ios');
            return;
        }else{
            $.ajax({
                url: 'validate_url.php',
                type: 'get',
                data: {url: obj.attr("down-android")},
                success: function(data){
                    if(data == 200){
                        window.location.href = obj.attr("down-android");
                    }else{
                        window.location.href = obj.attr("reserve");
                    }
                }
            });
            return;
        }
    }
}
function isPhone(id){
    var tip = $("#"+id);
    tip.show();
    tip.click(function () {
        tip.hide();
    });
}
function getReserve(){
    $.ajax({
        url: 'validate_url.php',
        success: function(data){

        }
    });
}