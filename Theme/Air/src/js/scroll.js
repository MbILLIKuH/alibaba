$(document).ready(function($){
    $('header, footer').find('a').on('click', function(event){
        if(this.hash !== "" && $('body').find(this.hash).length > 0){
            event.preventDefault();
            var hash = this.hash;
           
            $('html, body').animate({ 
                scrollTop: $(hash).offset().top-50
            }, 1000);
        } 
    });
    
    $(window).scroll(function(){         
        $(this).scrollTop() > 200 ? $('#scroll').fadeIn() : $('#scroll').fadeOut();
    });
    $('#scroll').click(function(event){
        event.preventDefault();
        $('body,html').animate({scrollTop: 0}, 1000);
    });
});