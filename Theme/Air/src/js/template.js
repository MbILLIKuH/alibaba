    //На внутренних страницах скролировать до основнова контента
    const $home = document.querySelectorAll(".home");
    const $global = document.getElementsByClassName("global")[0];
    if ($home.length == 0) {
        window.scrollBy(0, $global.getBoundingClientRect().top);
    }

    //Развернуть меню при клике
    var $turnList = $(".topmenu").find(".parent").children("a");
    $turnList.click(function(event){
        event.preventDefault();
        $(this).parent().find("ul").toggleClass("-open");
        //ИЛИ ПРОСТО
        //$(this).parent().find("ul").toggle();
    });

    //BREADCRUMB
    $("ol.breadcrumb").find("li:first-child a").html("Главная");

    //FORM WIDGET PLACEHOLDER
    const $inp = document.querySelectorAll(".banner-form-info .form-control");
    for(let i = 0;$inp.length > i;i++){
        const obj = $inp[i].previousElementSibling;
        $inp[i].setAttribute("placeholder",obj.textContent.trim());
        obj.style.display = "none";     
    } //ИЛИ
    var $inp = $(".section3-form").find(".form-control");
	$inp.each(function(i){        
		$(this).attr("placeholder", $.trim($(this).prev().text()));
        $(this).prev().css("display","none");
	});

    //Координаты под мышкой
    function coordsInit(elem){
        var pageX = document.documentElement.scrollLeft + elem.getBoundingClientRect().left;
        var pageY = document.documentElement.scrollTop + elem.getBoundingClientRect().top;
    }
    
    //Загрузить с сайта
    $(".btn.btn-default.ipsFileAddButton").html("Загрузить");

    //Заднефоновый слайдер
    $.backstretch([
      "/Theme/Air/src/img/02_FONE_1.jpg"
    , "/Theme/Air/src/img/02_FONE_2.jpg"
  ], {duration: 10000, fade: 750});
    ///////////////////
    var $more = $(".more");    
    $(".more").nextAll("*").css("display","none");
    
    $more.click(function(event){
        event.preventDefault();
        $(this).nextAll("*").css("display","");      
        $(this).css("display","none");
    });

    //Адаптивные шрифты
    const $p = $(".header").find("p");
    const $img = $(".header-img");
    let widthDifference;
    $p.each(function(){
        $(this).data('baseSize',parseFloat($(this).css('fontSize')));
        console.log($(this).data('baseSize'));                
    });
    $(window).on('load resize',function(){
        
        widthDifference = $img.width() / $img[0].naturalWidth;
        $p.each(function(){
            $(this).css('fontSize',($(this).data('baseSize') * widthDifference) + "px");              
        });
    });
    //detach на pure js
/*const detach = function(node, newNode, nextNode, async, fn){
    var parent = node.parentNode;
    var next = node.nextSibling;
    // No parent node? Abort!
    if (!parent){
        return;
    }
    // Detach node from DOM.
    parent.removeChild(node);
    // Handle case where optional `async` argument is omitted.
    if (typeof async !== "boolean") {
        fn = async;
        async = false;
    }
    // Note that if a function wasn't passed, the node won't be re-attached!
    if (fn && async){
        // If async == true, reattach must be called manually.
        fn.call(node, reattach);
    } else if (fn){
        // If async != true, reattach will happen automatically.
        fn.call(node);
        reattach();
    }
    // Re-attach node to DOM.
    function reattach(){
        parent.insertBefore(node, next);
    }
    newNode.insertBefore(node, nextNode);
}*/

/*const isTouch = function(){
    if(('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch){
        return true;
    } else {    
        return false;
    }
};*/
/*const getBlockCoords = function(e){
        
    let x = e.offsetX != undefined ? e.offsetX : e.layerX;
    let y = e.offsetY != undefined ? e.offsetY: e.layerY;
        
    return {x,y};
}*/
/*const getBlockPolyCoords = function(elem){
        let total = "";
        elem.onclick = function(e){
            let x = e.offsetX != undefined ? e.offsetX : e.layerX;
            let y = e.offsetY != undefined ? e.offsetY: e.layerY;
            total += x + "," + y + ",";
            console.log(total);
            
            //console.clear();
            //console.log(x +'x'+ y);
        };
    }*/


