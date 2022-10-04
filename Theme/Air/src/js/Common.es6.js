/*func:
getByClass(selector,parent || document), getAllByClass
find(selectorFull)
addWow(selector,className)
wowAnimHandler(selector = "fx")
stick(elem, offset = 0, _class = "-fixed", event1, event2)
labelToPlaceholder(inputs)
imgPreload(imgSrcArray)*/

const feedback = new uniFeedback({
    getUrl : ip.baseUrl + "getForm",
    postUrl : ip.baseUrl + "sendMessage",
    siteForm : true,
    additionalFields : {
        "securityToken" : ip.securityToken
    },
    beforeModalOpen : ($popupBox, $handler) => {
        $($popupBox).find('[name="phone"]').mask('7(999)999-99-99');
    }
});
const $section = $('.-section-scroll');
const switcher = new ScreenSwitcher($('.global--home'), screenSwitcherCallback, screenSwitcherCallback);
let servicesScreenActive = null;
let active = 1;
let flag = false;

function phoneMask() {
	$("#serviceForm").find('[name="phone"]').mask("7(999)-999-99-99");
}

function addBackgrounds() {
	if ($('.global--main').length) {
		$('.header,.footer').addClass('-background');
	}
}

function preLoader() {
	let percent = 0;
	let qntImg = $('img').length;
	let loadedImg = 0;

	$('img').each(function() {
		let img = document.createElement('img');
		img.src = $(this).attr('src');
		img.onload = function() {
			loadedImg++;
	        percent = Math.round(loadedImg / qntImg * 100);
	        $('.preloader__progress-bar').css('width', percent + '%');
		}
	});
}

function htmlFullSize() {
	$('html, body').css({
		width: '100%',
		height: '100%'
	});
}

function fullPage() {
	let padTop = 0;
	const $topLinks = $('.main-menu').find('a');

    if(ip.isManagementState){
        padTop = '288px';
    }
    else if(ip.isAdminState){
        padTop = '180px';
    }
    else{
        padTop = '140px';
    }
    if(!ip.isManagementState){
        $('.global--home').fullpage({
            scrollOverflow : true,
            anchors: ['banner','services','FAQ','reviews','contacts'],
            paddingTop: padTop,
            paddingBottom: '90px',
            navigation: true,
            navigationPosition: 'left',
            scrollingSpeed: 500,
            afterLoad:function(link,index){ //после перелистывания слайда, передаёт текущий id и индекс

                $topLinks.parent().removeClass('-active');
                $topLinks.each(function(){
                    const $elem = $(this);
                    if(this.href.indexOf(link) !== -1){
                        $elem.parent().addClass('-active');
                    }
                });

                let $baseSelector = `.${link}`;
                let $selector = $($baseSelector).find(".init");

                $selector.each(function(){
                    const delay = $(this).data("delay") ? $(this).data("delay") : "0s";
                    $(this).css("animationDelay",delay);
                });

                $selector.addClass($selector.data("anim"));
              
            }
        });
    }
}

function servicesStatusController(screen) {
	let direction = switcher.active > screen ? 'up' : 'down';
	switcher.switcher(screen, direction);
}

function screenSwitcherCallback() {
	let status = '';
	const servicesScreens = [2,3,4,5];
	const $menuItems = $('.section__menu li');

	if (switcher.active == 3) {
		status = 'Физическое лицо';
		servicesScreenActive = 3;
	} else if (switcher.active == 4) {
		status = 'Юридическое лицо';
		servicesScreenActive = 4;
	}

	if (status) {
		$('#serviceForm input[name="status"]').val(status);
	}

	if (servicesScreens.indexOf(switcher.active) !== -1) {
		$('.services').addClass('-no-global');
		$(`.services[data-param=${switcher.active}]`).removeClass('-no-global');
	}

	$menuItems.removeClass('-current');

	$menuItems.each(function() {
		const alias = $(this).find('a').data('alias');

		if (
			alias == switcher.active 
			|| (alias == 2 && servicesScreens.indexOf(switcher.active) !== -1)
		) {
			$(this).addClass('-current');
		}
	});
}

function buttonMenu() {
	const $buttonMenu = $('.button-menu');
	const $menu = $('.main-menu');
	const $header = $('.header');

	$buttonMenu.on('click', function() {
		if ($(this).hasClass('-close')) {
			$buttonMenu.removeClass('-close').attr('title', 'Меню');
			$menu.removeClass('-visible');
			$header.removeClass('-menuActive');
		} else {
			$buttonMenu.addClass('-close').attr('title', 'Закрыть');
			$menu.addClass('-visible');
			$header.addClass('-menuActive');
		}
	});

	$menu.find('li a').on('click', function(event) {
		if ($(event.target).is('span.child-list-button')) {
			event.preventDefault();
			$(this).parent().toggleClass('-open');
			$(this).siblings('ul.children').toggleClass('-visible').slideToggle();		
		} else if ((typeof $(this).data('alias') == 'number') && ($('.global--home').length)) {
			event.preventDefault();
			$buttonMenu.removeClass('-close').attr('title', 'Меню');
			$menu.removeClass('-visible');
			$header.removeClass('-menuActive');
			servicesStatusController($(this).data('alias'));
		} else {
			$buttonMenu.removeClass('-close').attr('title', 'Меню');
			$menu.removeClass('-visible');
			$header.removeClass('-menuActive');
		}
	});
}

function sideMenu() {
	const $menuItems = $('.section__menu li a');

	$menuItems.each(function() {
		if (typeof $(this).data('alias') != 'number') {
			$(this).parent().addClass('-hidden');
		}
		if ($(this).data('alias') == 1) {
			$(this).parent().addClass('-current');
		}
	});
	$menuItems.on('click', function(event) {
		if (typeof $(this).data('alias') == 'number') {
			event.preventDefault();
			servicesStatusController($(this).data('alias'));
		}
	});
}

function bannerStatus() {
	$('.banner__button').on('click', function() {
		const status = $(this).hasClass('banner__button--physical') ? 3 : 4;
		servicesStatusController(status);
	});
}

function bannerMouseMoveAnimation() {
	const $win = $(window);
	let deviceType = document.documentElement.clientWidth > 1000 ? 'desktop' : 'mobile';
    let winWidth = $win.width();
    const paralax = {
        lvl1 : $('.banner__cyberpunk'),
        lvl2 : $('.banner__cyberpunk-text')
    };

    $win.on('resize', function(){
        winWidth = $win.width();
        deviceType = document.documentElement.clientWidth > 1000 ? 'desktop' : 'mobile';
    });

    $('body').on('mousemove', function(e){
        const pageX = e.pageX;
        const pageY = e.pageY;
        const halfWidth = winWidth / 2;
        const halfHeight = '412.5';
        const center = Math.round((halfWidth - pageX) * 100 / halfWidth);
        const middle = Math.round((halfHeight - pageY) * 100 / halfHeight);
        if(deviceType == 'desktop'){
        	paralax.lvl1.css('transform', `translate3d(${center * 0.1}px, ${middle * 0.1}px, 0)`);
        	paralax.lvl2.css('transform', `translate3d(${center * 0.05}px, ${middle * 0.1}px, 0)`);
        }
        if(deviceType == 'mobile'){
        	paralax.lvl1.css('transform', `translate3d(0, 0, 0)`);
		    paralax.lvl2.css('transform', `translate3d(0, 0, 0)`);
        }
    });
}

function bannerButton() {
	const $bannerNext = $('.banner__next');
	const $bannerNextFigure = $('.banner__next--figure');

	$bannerNext.hover(function() {
		$bannerNextFigure.removeClass('-common').addClass('-hover');
	},function() {
		$bannerNextFigure.removeClass('-hover').addClass('-back');
		$bannerNextFigure.one('animationend', function() {
			$bannerNextFigure.removeClass('-back').addClass('-common');
		});
	});
	$bannerNext.click(function() {
		switcher.switcher(2, 'down');
	});
}

function serviceScreenSwitcherController() {
	const $form = $('#serviceForm');

	//NEXT_STEP
	$('.services__button').on('click', function() {
		if ($(this).hasClass('services__button--physical')) {
			servicesScreenActive = 3;
		} else if ($(this).hasClass('services__button--juridical')) {
			servicesScreenActive = 4;
		}
		switcher.switcher(servicesScreenActive, 'left');
	});
	$('.plugin-service__list-button--problem').on('click', function() {
		const $parent = $(this).closest('.services');
		$parent.find('.services__item--problem').removeClass('-visible');
		$parent.find('.services__item--solve').addClass('-visible');
		$parent.find('.section__background').removeClass('-problem').addClass('-solve -animation');
		$form.find('input[name="problem"]').val($(this).data('value'));
		$parent.one('animationend', function() {
			$parent.find('.section__background').removeClass('-animation');
		});
	});
	$('.plugin-service__list-button--solve').on('click', function() {
		switcher.switcher(5, 'left');
		$form.find('input[name="solve"]').val($(this).data('value'));
	});


	//PREV_STEP
	$('.services__back--form').on('click', function() {
		switcher.switcher(servicesScreenActive, 'right');
	});
	$('.services__back--solve').on('click', function() {
		const $parent = $(this).closest('.services');
		$parent.find('.services__item--solve').removeClass('-visible');
		$parent.find('.services__item--problem').addClass('-visible');
		$parent.find('.section__background').removeClass('-solve').addClass('-problem -animation');
		$parent.one('animationend', function() {
			$parent.find('.section__background').removeClass('-animation');
		});
	});
	$('.services__back--problem').on('click', function() {
		switcher.switcher(2, 'right');
	});	
}

function mobileAndTabletCheck() {
  	let check = false;
  	(function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
  	return check;
};

function servicesList() {
	const $serviceSlider = $('.plugin-service__slider');
	const $serviceItem = $('.plugin-service__item');
	let timeout;

	if (mobileAndTabletCheck()) {
		$serviceItem.click(function() {
			if ($(this).children('.plugin-service__list').hasClass('-visible')) {
				$(this).removeClass('-active');
				$(this).children('.plugin-service__list').removeClass('-visible').stop().slideUp({
					duration: 500,
					queue: false
				});
			} else {
				$(this).addClass('-active');
				$(this).children('.plugin-service__list').addClass('-visible').stop().slideDown({
					duration: 500,
					queue: false
				});
			}
		});
	} else {
		$serviceItem.hover(function() {
			$(this).addClass('-active');
			$(this).children('.plugin-service__list').addClass('-visible').stop().slideDown({
				duration: 500,
				queue: false
			});
		}, function() {
			$(this).removeClass('-active');
			$(this).children('.plugin-service__list').removeClass('-visible').stop().slideUp({
				duration: 500,
				queue: false
			});
		});
	}

	$serviceSlider.on('mousedown', function(e) {
        timeout = setTimeout(function(){
            $serviceItem.css('pointer-events','none');
        },150);
    });
    $(document).on('mouseup', function(e) {
        clearTimeout(timeout);
        $serviceItem.css('pointer-events','');
    });
}

function servicesSliders() {
	$('.plugin-service__slider').slick( {
		autoplay: false,
        slidesToShow: 3,
        slidesToScroll: 1,
        touchThreshold: 150,
        focusOnSelect: false,
        infinite: false,
        responsive: [
	        {
		      	breakpoint: 1300,
		      	settings: {
			        slidesToShow: 2,
			        arrows: false,
			        dots: true
		      	}
		    },
		    {
		      	breakpoint: 750,
		      	settings: {
			        slidesToShow: 1,
			        arrows: false,
			        dots: true
		      	}
		    }
        ]
	});
}

function FAQ() {
	$('.plugin-info__slider--main-FAQ').slick( {
        autoplay: false,
        slidesToShow: 2,
        slidesToScroll: 1,
        touchThreshold: 150,
        focusOnSelect: true,
        infinite: false,
        asNavFor: '.plugin-info__slider--wide-FAQ',
        responsive: [
	        {
		      	breakpoint: 1300,
		      	settings: {
			        arrows: false,
			        dots: true
		      	}
		    },
		    {
		      	breakpoint: 850,
		      	settings: {
			        slidesToShow: 1,
			        arrows: false,
			        dots: true
		      	}
		    }
		]
    });
    $('.plugin-info__slider--wide-FAQ').slick( {
        autoplay: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        touchThreshold: 150,
        focusOnSelect: true,
        fade: true,
        infinite: false,
        asNavFor: '.plugin-info__slider--main-FAQ',
        responsive: [
	        {
		      	breakpoint: 1300,
		      	settings: {
			        arrows: false,
			        dots: true
		      	}
		    }
		]
    });
}

function reviews() {	
	$('.plugin-info__slider--main-reviews').slick( {
        autoplay: false,
        slidesToShow: 2,
        slidesToScroll: 1,
        touchThreshold: 150,
        focusOnSelect: true,
        infinite: false,
        asNavFor: '.plugin-info__slider--wide-reviews',
        responsive: [
	        {
		      	breakpoint: 1300,
		      	settings: {
			        arrows: false,
			        dots: true
		      	}
		    },
		    {
		      	breakpoint: 850,
		      	settings: {
			        slidesToShow: 1,
			        arrows: false,
			        dots: true
		      	}
		    }
		]
    });
    $('.plugin-info__slider--wide-reviews').slick( {
        autoplay: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        touchThreshold: 150,
        focusOnSelect: true,
        fade: true,
        infinite: false,
        asNavFor: '.plugin-info__slider--main-reviews',
        responsive: [
	        {
		      	breakpoint: 1300,
		      	settings: {
			        arrows: false,
			        dots: true
		      	}
		    }
		]
    });
}

function pluginInfo() {
	$('.plugin-info').each(function() {
		const $container = $(this);
		const $main = $container.find('.plugin-info__main');
		const $wide = $container.find('.plugin-info__wide');
		const $item = $container.find('.plugin-info__item--main');
		let timeout;
		
		$item.on('click', function() {
	    	$main.addClass('-hidden');
	    	$wide.addClass('-visible');
	    });
	    $container.find('.plugin-info__close button').on('click', function() {
	    	$main.removeClass('-hidden');
	    	$wide.removeClass('-visible');
	    });

	    $main.on('mousedown', function(e) {
	        timeout = setTimeout(function(){
	            $item.css('pointer-events','none');
	        },150);
	    });
	    $(document).on('mouseup', function(e) {
	        clearTimeout(timeout);
	        $item.css('pointer-events','');
	    });
	});
}

function WhatsApp() {
    $('#WAButton').floatingWhatsApp({
	    phone: '+79994701998', //WhatsApp Business phone number International format-
	    //Get it with Toky at https://toky.co/en/features/whatsapp.
	    headerTitle: 'Общайтесь с нами через WhatsApp!', //Popup Title
	    popupMessage: 'Здравствуйте, чем можем вам помочь?', //Popup Message
	   	showPopup: true, //Enables popup display
	    buttonImage: '<img src="/Theme/Air/src/img/01_whatsapp.png" />', //Button Image
	    //headerColor: 'crimson', //Custom header color
	    //backgroundColor: 'crimson', //Custom background button color
	    //position: "right"    
    });
}

$(document).ready(function() {
	addBackgrounds();
	//fullPage();
	preLoader();
	phoneMask();
	feedback.init();
    buttonMenu();
    WhatsApp();
    if ($('.global--home').length) {
    	htmlFullSize();
	    sideMenu();
	    bannerStatus();
	    bannerMouseMoveAnimation();
	    bannerButton();
	    serviceScreenSwitcherController();
	    pluginInfo();
	}
    if ($('.plugin-service').length) {
    	servicesList();
    	servicesSliders();
    }
    if ($('.FAQ').length) {
    	FAQ();
    }
    if ($('.reviews').length) {
    	reviews();
    }
});

/*$(window).resize(function(e) {
});*/

window.onload = function() {
    $('.preloader').delay('1000').fadeOut();
    $('.banner__title, .banner__description, .banner__buttons').addClass('-visible');
};

})();