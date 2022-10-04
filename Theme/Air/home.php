<?php echo ipView('_header.php')->render(); ?>  
<main class="global global--home" role="main">
<?php $arrayScreens = Array('1','2','3','4','5','6','7','8');
	$screen = isset($_GET['screen']) && in_array($_GET['screen'], $arrayScreens) ? htmlspecialchars($_GET['screen']) : ''; ?>
<div class="section__menu">
	<?php $pages = \Ip\Menu\Helper::getMenuItems('mainMenu',1);
            echo ipSlot('menu', $pages); ?>
</div>
<section class="banner section -section-scroll<?php if (!$screen || $screen == 1) echo ' -active'; ?>" data-param="1">
	<div class="banner__background section__background -stop">
		<div class="banner__circle section__background-item">
			<img src="/Theme/Air/src/img/01_backgrounds/01_circle.png">
		</div>
		<div class="banner__top-figure section__background-item">
			<img src="/Theme/Air/src/img/01_backgrounds/01_bg_01.png">
		</div>
		<div class="banner__bottom-figure section__background-item">
			<img src="/Theme/Air/src/img/01_backgrounds/01_bg_02.png">
		</div>
		<div class="banner__cyberpunk-text section__background-item">
			<img src="/Theme/Air/src/img/01_backgrounds/01_alibaba.png">
		</div>
		<div class="banner__cyberpunk section__background-item">
			<img src="/Theme/Air/src/img/01_backgrounds/01_cyberpunk.png">
		</div>
	</div>
    <div class="in">
    	<div class="banner__info">
    		<div class="banner__title">
    			<?php echo ipBlock('banner-title')->asStatic()->render();?>
    		</div>
    		<div class="banner__description">
    			<?php echo ipBlock('banner-desc')->asStatic()->render();?>
    		</div>
    		<div class="banner__buttons">
    			<button class="banner__button banner__button--physical -button-flash"><span>Физическое лицо</span></button>
    			<button class="banner__button banner__button--juridical -button-flash"><span>Юридическое лицо</span></button>
    		</div>
    	</div>
    </div>
    <div class="banner__next">
    	<div class="banner__next--text">Прокрутите, чтобы начать</div>
    	<div class="banner__next--figure -common"></div>
    </div>
</section>
<section class="services section services__status -section-scroll<?php if ($screen == 2) echo ' -active'; ?>" data-param="2">
	<div class="services__status-background section__background -stop">
		<div class="services__status-circle section__background-item">
			<img src="/Theme/Air/src/img/02_backgrounds/02_status_circle.png">
		</div>
		<div class="services__status-left-big-figure section__background-item">
			<img src="/Theme/Air/src/img/02_backgrounds/02_status_bg_01.png">
		</div>
		<div class="services__status-right-big-figure section__background-item">
			<img src="/Theme/Air/src/img/02_backgrounds/02_status_bg_02.png">
		</div>
		<div class="services__status-bottom-small-figure section__background-item">
			<img src="/Theme/Air/src/img/02_backgrounds/02_status_bg_03.png">
		</div>
		<div class="services__status-top-small-figure section__background-item">
			<img src="/Theme/Air/src/img/02_backgrounds/02_status_bg_04.png">
		</div>
	</div>
	<div class="in -right">
		<div class="services__title services__title--status">
			<?php echo ipBlock('services-title-status')->asStatic()->render();?>
		</div>
		<div class="services__wrap services__wrap--status">
			<button class="services__button services__button--physical" data-value="Физическое лицо">
				<span>Физическое лицо</span>
			</button>
			<button class="services__button services__button--juridical" data-value="Юридическое лицо">
				<span>Юридическое лицо</span>
			</button>
		</div>
	</div>
</section>
<section class="services section services__physical -section-scroll -no-global<?php if ($screen == 3) echo ' -active'; ?>" data-param="3">
	<div class="services__physical-background section__background -stop -problem">
		<div class="services__physical-circle section__background-item">
			<img src="/Theme/Air/src/img/02_backgrounds/02_physical_circle.png">
		</div>
		<div class="services__physical-problem-bottom-figure section__background-item">
			<img src="/Theme/Air/src/img/02_backgrounds/02_physical_bg_01.png">
		</div>
		<div class="services__physical-solve-bottom-figure section__background-item">
			<img src="/Theme/Air/src/img/02_backgrounds/02_physical_bg_05.png">
		</div>
		<div class="services__physical-problem-top-figure section__background-item">
			<img src="/Theme/Air/src/img/02_backgrounds/02_physical_bg_02.png">
		</div>
		<div class="services__physical-solve-top-figure section__background-item">
			<img src="/Theme/Air/src/img/02_backgrounds/02_physical_bg_06.png">
		</div>
		<div class="services__physical-middle-small-figure section__background-item">
			<img src="/Theme/Air/src/img/02_backgrounds/02_physical_bg_03.png">
		</div>
		<div class="services__physical-middle-big-figure section__background-item">
			<img src="/Theme/Air/src/img/02_backgrounds/02_physical_bg_04.png">
		</div>
	</div>
	<div class="services__item services__item--problem -visible">
		<div class="in -right">
			<div class="services__title services__title--problem">
				<?php echo ipBlock('services-title-problem')->asStatic()->render();?>
			</div>
			<div class="services__wrap services__wrap--problem">
				<?php echo ipSlot('BlockServicesPhysicalProblem'); ?>
			</div>
			<button class="services__back services__back--problem"><span>Назад</span></button>
		</div>
	</div>
	<div class="services__item services__item--solve">
		<div class="in -right">
			<div class="services__title services__title--solve">
				<?php echo ipBlock('services-problem-title')->asStatic()->render();?>
			</div>
			<div class="services__wrap services__wrap--solve">
				<?php echo ipSlot('BlockServicesPhysicalSolve'); ?>
			</div>
			<button class="services__back services__back--solve" title="Назад"><span>Назад</span></button>
		</div>
	</div>
</section>
<section class="services section services__juridical -section-scroll -no-global<?php if ($screen == 4) echo ' -active'; ?>" data-param="4">
	<div class="services__juridical-background section__background -stop -problem">
		<div class="services__juridical-circle section__background-item">
			<img src="/Theme/Air/src/img/02_backgrounds/02_status_circle.png">
		</div>
		<div class="services__juridical-left-big-figure section__background-item">
			<img src="/Theme/Air/src/img/02_backgrounds/02_juridical_bg_01.png">
		</div>
		<div class="services__juridical-right-big-figure section__background-item">
			<img src="/Theme/Air/src/img/02_backgrounds/02_juridical_bg_02.png">
		</div>
		<div class="services__juridical-bottom-small-figure section__background-item">
			<img src="/Theme/Air/src/img/02_backgrounds/02_status_bg_04.png">
		</div>
		<div class="services__juridical-top-small-figure section__background-item">
			<img src="/Theme/Air/src/img/02_backgrounds/02_juridical_bg_04.png">
		</div>
	</div>
	<div class="services__item services__item--problem -visible">
		<div class="in -right">
			<div class="services__title services__title--problem">
				<?php echo ipBlock('services-title-problem')->asStatic()->render();?>
			</div>
			<div class="services__wrap services__wrap--problem">
				<?php echo ipSlot('BlockServicesJuridicalProblem'); ?>
			</div>
			<button class="services__back services__back--problem"><span>Назад</span></button>
		</div>
	</div>
	<div class="services__item services__item--solve">
		<div class="in -right">
			<div class="services__title services__title--solve">
				<?php echo ipBlock('services-problem-title')->asStatic()->render();?>
			</div>
			<div class="services__wrap services__wrap--solve">
				<?php echo ipSlot('BlockServicesJuridicalSolve'); ?>
			</div>
			<button class="services__back services__back--solve" title="Назад"><span>Назад</span></button>
		</div>
	</div>
</section>
<section class="services section services__form -section-scroll -no-global<?php if ($screen == 5) echo ' -active'; ?>" data-param="5">
	<div class="services__form-background section__background -stop">
		<div class="services__form-circle section__background-item">
			<img src="/Theme/Air/src/img/02_backgrounds/02_status_circle.png">
		</div>
		<div class="services__form-right-big-figure section__background-item">
			<img src="/Theme/Air/src/img/02_backgrounds/02_form_bg_02.png">
		</div>
		<div class="services__form-left-big-figure section__background-item">
			<img src="/Theme/Air/src/img/02_backgrounds/02_form_bg_03.png">
		</div>
		<div class="services__form-small-figure section__background-item">
			<img src="/Theme/Air/src/img/02_backgrounds/02_form_bg_01.png">
		</div>
	</div>
	<div class="in -right">
		<div class="services__form-title">
			<?php echo ipBlock('services-form-title')->asStatic()->render();?>
		</div>
		<div class="services__form-wrap">
			<?php echo ipSlot('UF_form',['form' => 'siteForm1']); ?>
		</div>
		<button class="services__back services__back--form"><span>Назад</span></button>
	</div>
</section>
<section class="FAQ section -section-scroll<?php if ($screen == 6) echo ' -active'; ?>" data-param="6">
	<div class="FAQ__background section__background -stop">
		<div class="FAQ__top-figure section__background-item">
			<img src="/Theme/Air/src/img/03_backgrounds/03_bg_01.png">
		</div>
		<div class="FAQ__bottom-big-figure section__background-item">
			<img src="/Theme/Air/src/img/03_backgrounds/03_bg_02.png">
		</div>
		<div class="FAQ__bottom-small-figure section__background-item">
			<img src="/Theme/Air/src/img/03_backgrounds/03_bg_03.png">
		</div>
	</div>
	<div class="in -right">
		<div class="FAQ__title -title">
			<?php echo ipBlock('FAQ-title')->asStatic()->render();?>
		</div>
		<div class="FAQ__wrap">
			<?php echo ipSlot('BlockFAQ'); ?>
		</div>
	</div>
</section>
<section class="reviews section -section-scroll<?php if ($screen == 7) echo ' -active'; ?>" data-param="7">
	<div class="reviews__background section__background -stop">
		<div class="reviews__bottom-big-figure section__background-item">
			<img src="/Theme/Air/src/img/04_backgrounds/04_bg_01.png">
		</div>
		<div class="reviews__bottom-small-figure section__background-item">
			<img src="/Theme/Air/src/img/04_backgrounds/04_bg_02.png">
		</div>
		<div class="reviews__top-figure section__background-item">
			<img src="/Theme/Air/src/img/04_backgrounds/04_bg_03.png">
		</div>
	</div>
	<div class="in -right">
		<div class="reviews__title -title">
			<?php echo ipBlock('reviews-title')->asStatic()->render();?>
		</div>
		<div class="reviews__wrap">
			<?php echo ipSlot('BlockReviews'); ?>
		</div>
	</div>
</section>
<section class="contacts section -section-scroll<?php if ($screen == 8) echo ' -active'; ?>" data-param="8">
	<div class="contacts__background section__background -stop">
		<div class="contacts__top-big-figure section__background-item">
			<img src="/Theme/Air/src/img/05_backgrounds/05_bg_01.png">
		</div>
		<div class="contacts__top-small-figure section__background-item">
			<img src="/Theme/Air/src/img/05_backgrounds/05_bg_02.png">
		</div>
		<div class="contacts__bottom-figure section__background-item">
			<img src="/Theme/Air/src/img/05_backgrounds/05_bg_03.png">
		</div>
	</div>
	<div class="in -right -home">
		<div class="contacts__info">
	    	<div class="contacts__title -title">
	    		<?php echo ipBlock('contacts-title')->asStatic()->render();?>
	    	</div>
	    	<div class="contacts__text contacts__text--description">
	    		<?php echo ipBlock('contacts-desc')->asStatic()->render();?>
	    	</div>
	    	<div class="contacts__text contacts__text--info -link">
	    		<div class="contacts__text--marker contacts__text--phone">
	    			<?php echo ipBlock('contacts-phone')->asStatic()->render();?>
	    		</div>
	    	</div>
	    	<div class="contacts__text contacts__text--info -link">
	    		<div class="contacts__text--marker contacts__text--email">
	    			<?php echo ipBlock('contacts-email')->asStatic()->render();?>
	    		</div>
	    	</div>
	    	<div class="contacts__text contacts__text--info">
	    		<div class="contacts__text--marker contacts__text--address">
	    			<?php echo ipBlock('contacts-address')->asStatic()->render();?>
	    		</div>
	    	</div>
	    	<div class="contacts__text contacts__text--info">
	    		<div class="contacts__text--marker contacts__text--time">
	    			<?php echo ipBlock('contacts-time')->asStatic()->render();?>
	    		</div>
	    	</div>
	    </div>
	    <div class="contacts__map">
	    	<?php echo ipBlock('contacts-map')->asStatic()->render();?>
	    </div>
	</div>
</section>
</main>   
<?php echo ipView('_footer.php')->render(); ?>