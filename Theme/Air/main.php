<?php echo ipView('_header.php')->render(); ?>
<main class="global global--main" role="main">
<section class="main">
    <div class="in">
    	<?php
        	if(ipContent()->getCurrentPage()){
        		echo '
        		<div class="main__title -title-main">
    				<h1>' . ipContent()->getCurrentPage()->getTitle() . '</h1>
	        	</div>
    			';
        	}
        ?>
        <div class="main__wrap">
    		<?php echo ipBlock('main')->render();?>
    	</div>
    </div>
</section>
</main>   
<?php echo ipView('_footer.php')->render(); ?>