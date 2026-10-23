$(document).ready(function() {
    $('.tab-donation .tab-btn').on('click', function() {
        let idx = $(this).index();

        $('.tab-donation .tab-btn').removeClass('active');
        $(this).addClass('active');

        $('.tab-menu .tab-panel').removeClass('active');
        $('.tab-menu .tab-panel').eq(idx).addClass('active');
    });
});

$(document).ready(function() {
    $('.btn-menu, .btn-menu a').on('click', function(e) {
        e.preventDefault();
        $('.mobile-menu').addClass('active');
        $('.dim').addClass('active');
        $('body').css('overflow-y', 'hidden');
    });

    function closeMenu() {
        $('.mobile-menu').removeClass('active');
        $('.dim').removeClass('active');
        $('body').removeAttr('style');
    }

    $('.btn-close, .dim').on('click', function(e) {
        e.preventDefault();
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


fetch("floating.html")
    .then(response => response.text())
    .then(html => {
        document.querySelector("#floating-container").innerHTML = html;

        initFloating();
    });
function initFloating() {
    const floating = document.querySelector(".floating");
    const mainVisual = document.querySelector(".main-visual");
    const footer = document.querySelector("footer");
    const goTop = document.querySelector(".go-top");

    if (!floating || !mainVisual || !footer) return;

    function handleFloating() {
        const visualBottom = mainVisual.getBoundingClientRect().bottom;
        const footerTop = footer.getBoundingClientRect().top;

        if (visualBottom <= 0 && footerTop > window.innerHeight) {
            floating.classList.add("show");
        } else {
            floating.classList.remove("show");
        }
    }

    window.addEventListener("scroll", handleFloating);
    window.addEventListener("load", handleFloating);
    window.addEventListener("resize", handleFloating);

    if (goTop) {
        goTop.addEventListener("click", function (e) {
            e.preventDefault();

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });
    }

    handleFloating();
}