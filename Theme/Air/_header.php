<!DOCTYPE html>
<html lang="ru">
<head>
    <link media="only screen and (min-width:1000px)" rel="stylesheet" href="/Theme/Air/src/css/animate.min.css">
    <?php ipAddCss("src/styles.all.css"); ?>
    <?php echo ipHead(); ?>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0,user-scalable=no">
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <!--meta name="viewport" content="width=1024"-->
</head>
<body class="<?php echo ipContent()->getCurrentLanguage()->getTextDirection() ?> -mobile">
<div class="preloader">
    <div class="preloader__logo"></div>
    <div class="preloader__progress">
        <div class="preloader__progress-bar"></div>
    </div>
</div>
<header class="header">
    <div class="in">
        <div class="header__logo">
            <div class="logo__img">
                <?php echo ipSlot('logo'); ?>
            </div>
            <div class="logo__title">
                <?php echo ipBlock('logo-title')->asStatic()->render();?>
            </div>
        </div>
        <div class="header__button header__button--consultation">
            <button class="button-consultation uf-handler" data-form="form1">
                <svg>
                    <defs>
                        <linearGradient id="border-gradient">
                            <stop stop-color="#FFCF00" offset="0" />
                            <stop stop-color="#FC1A62" offset="0.5" />
                            <stop stop-color="#CF1AFC" offset="1" />
                        </linearGradient>
                    </defs>
                    <rect x="0" y="0" width="200px" height="52px" fill="none" stroke="url(#border-gradient)" stroke-width= "3" rx="28" ry="28"></rect>
                </svg>
                VIP-консультация
            </button>
        </div>
        <div class="header__button header__button--menu">
            <button class="button-menu" title="Меню"></button>
        </div>
    </div>
</header>
<nav class="main-menu">
    <div class="main-menu__wrap">
        <?php $pages = \Ip\Menu\Helper::getMenuItems('mainMenu',1,2);
            echo ipSlot('menu', $pages); ?>
    </div>
</nav>