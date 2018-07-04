jQuery(document).ready(function($) {
    $('#block-pilot-main-menu li').hover(function(){
        $(this).find('.sub-menu').toggle();                           
 });
});