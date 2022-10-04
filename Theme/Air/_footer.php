<footer class="footer">
    <div class="in">
        <div class="footer__socials">
            <?php echo ipSlot('BlockSocials'); ?>
        </div>
    </div>
</footer>
<div id="WAButton"></div>
<?php echo ipJs(); ?>
<script src="/Theme/Air/src/scripts.all.js"></script>
<?php
    if(!preg_match("/\./", $_SERVER['HTTP_HOST'])) {
        echo '<script id="__bs_script__">//<![CDATA[
        document.write("<script async src=\'http://HOST:3000/browser-sync/browser-sync-client.js?v=2.18.12\'><\/script>".replace("HOST", location.hostname));
    //]]></script>';
    }
?>
</body>
</html>