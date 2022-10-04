$(document).ready(function(){
    "use strict";
    $('.topmenu').touchMenuHover(); // mimics iOS behavior allowing to get hover state without clicking
    var $topmenuToggle = $('.topmenuToggle');
    
    function close(e){
        if (!$(e.target).is(".topmenuToggle")){
            $topmenuToggle.next().css('display', '');
            $(".header").add(".global").off('click');
        }
    }
    
    $topmenuToggle.on('click', function (e) { // opens menu in mobile view
        e.preventDefault();
        $(this).next().css('display', 'block');
        $(".header").add(".global").on('click',close);
    });
});

;(function(a){a.fn.touchMenuHover=function(j){var f=a.extend({childTag:"ul",closeElement:"",forceiOS:false,openClass:"tmh-open"},j);var d=a(this).find("a"),i="3ds|android|bada|bb10|hpwos|iemobile|kindle fire|opera mini|opera mobi|opera tablet|rim|silk|wiiu",c="|ipad|ipod|iphone",b,g="aria-haspopup",e="html",h;if(f.childTag.toString().toLowerCase()!=="ul"||f.forceiOS){i+=c}b=new RegExp(i,"gi");if(d.length>0&&b.test(navigator.userAgent)){d.each(function(){var m=a(this),l=m.parent("li"),k=l.siblings().find("a");if(m.next(f.childTag).length>0){l.attr(g,true)}m.click(function(o){var n=a(this);o.stopPropagation();k.removeClass(f.openClass);if(!n.hasClass(f.openClass)&&n.next(f.childTag).length>0){o.preventDefault();n.addClass(f.openClass)}})});if(f.closeElement.length>1){e+=","+f.closeElement}h=a(e);if("ontouchstart" in window){h.css("cursor","pointer")}h.click(function(){d.removeClass(f.openClass)})}return this}})(jQuery);