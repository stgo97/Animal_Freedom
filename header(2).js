$(document).ready(function() {
    $('.btn-menu, .btn-menu a').on('click', function(e) {
        e.preventDefault();
        $('.mobile-menu').addClass('active');
        $('.dim').addClass('active');
        $('body').css('overflow', 'hidden');
    });

    function closeMenu() {
        $('.mobile-menu').removeClass('active');
        $('.dim').removeClass('active');
        $('body').css('overflow', 'auto');
    }

    $('.btn-close, .dim').on('click', function() {
        closeMenu();
    });
    
    $('.m-gnb .main-title').on('click', function(e) {
        e.preventDefault();

        let $parentLi = $(this).parent('li');
        let $sub = $(this).next('.m-sub');

        $parentLi.siblings('li').removeClass('open').find('.m-sub').stop().slideUp(250);
        $parentLi.toggleClass('open');
        $sub.stop().slideToggle(250);
    });
});