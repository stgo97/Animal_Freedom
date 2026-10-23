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

// HTML에 메뉴가 있으면 그대로 사용하고, 빈 컨테이너가 있을 때만 불러옵니다.
async function setupFloating() {
    let floating = document.querySelector(".floating");
    const container = document.querySelector("#floating-container");

    if (!floating && container) {
        try {
            const response = await fetch("floating.html");
            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            container.innerHTML = await response.text();
            floating = container.querySelector(".floating");
        } catch (error) {
            console.error("플로팅 메뉴를 불러오지 못했습니다.", error);
            return;
        }
    }
    if (!floating) return;

    function handleFloating() {
        const mainVisual = document.querySelector(".main-visual");
        const footer = document.querySelector("footer");
        // 비주얼이 없는 서브 페이지에서는 처음부터 표시합니다.
        const pastVisual = !mainVisual || mainVisual.getBoundingClientRect().bottom <= 0;
        const beforeFooter = !footer || footer.getBoundingClientRect().top > window.innerHeight;
        floating.classList.toggle("show", pastVisual && beforeFooter);
    }

    window.addEventListener("scroll", handleFloating, { passive: true });
    window.addEventListener("load", handleFloating);
    window.addEventListener("resize", handleFloating);

    const goTop = floating.querySelector(".go-top");
    if (goTop) {
        goTop.addEventListener("click", function (event) {
            event.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    }
    handleFloating();
}

// head에서 불러와도 HTML 생성 후 실행합니다.
if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", setupFloating, { once: true });
} else {
    setupFloating();
}















//------------활동----------------------
        const counters = document.querySelectorAll(".count");
        let animated = false;

        function animateCounters(){
            if (animated) return;

            const section = document.getElementById("counterSection");
            const sectionTop = section.getBoundingClientRect().top;

            const windowHeight = window.innerHeight;

            if (sectionTop < windowHeight - 100){
                counters.forEach(counter => {
                    const target = +counter.getAttribute("data-target");
                    const unit = counter.getAttribute("data-unit");

                    const duration = 2000;
                    let startTime = null;

                    counter.textContent = "0" + unit;

                    const update = (timestamp) => {
                        if (startTime === null) startTime = timestamp;

                        const progress = Math.min((timestamp - startTime) / duration, 1);
                        const current = Math.floor(target * progress);

                        counter.textContent = current.toLocaleString() + unit;

                        if (progress < 1) {
                            requestAnimationFrame(update);
                        }
                    };
                    requestAnimationFrame(update);
                });
                animated = true;
            }
        }
        window.addEventListener('scroll', animateCounters);
// ---------------------------------------위기동물------------------------
        const responseCounters = document.querySelectorAll(".response-count");
        const responseSection = document.querySelector(".response-stats");

        let responseStarted = false;

        function responseCountUp() {

            if (responseStarted) return;

            const sectionTop = responseSection.getBoundingClientRect().top;

            if (sectionTop < window.innerHeight) {

                responseStarted = true;

                responseCounters.forEach(function(counter) {

                    const target = Number(counter.dataset.target);
                    const unit = counter.dataset.unit;
                    let count = 0;

                    const speed = 15;
                    const increment = Math.ceil(target / 100);

                    const timer = setInterval(function() {

                        count += increment;

                        if (count >= target) {
                            count = target;
                            clearInterval(timer);
                        }

                        counter.textContent = count.toLocaleString() + unit;

                    }, speed);

                });
            }
        }

        window.addEventListener("scroll", responseCountUp);






        
//----------------------------------전체활동----------------------------
        $(document).ready(function(){
            let i = 0;
            let count = $(".activities-list>li").length;

            function moveBar(){
                const barWidth = $(".activities-innerbar").width();
                const activeWidth = $(".activities-innerbar2").width();

                const distance = (barWidth - activeWidth) / (count - 1);

                $(".activities-innerbar2").css({
                    "transform": "translateX(" + (distance * i) + "px)"
                });
            }






            
            const $list = $(".activities-list");
            let isMoving = false;

            function setActive() {
                $list.children("li")
                    .removeClass("is-active");
                    // .css("transform", "");

                $list.children("li").eq(1).addClass("is-active");

            }

            setActive();
            // $list.css("margin-left", -$list.children("li").first().outerWidth(true));
            $list.css("margin-left", -$list.children("li").eq(0).outerWidth(true));

            $(".next").click(function(e){
                e.preventDefault();
                if (isMoving) return;
                isMoving = true;

                const firstWidth = $list.children("li").eq(0).outerWidth(true);
                const activeWidth = $list.children("li").eq(1).outerWidth(true);

                $list.animate({"margin-left": -(firstWidth + activeWidth)}, 500, function(){
                    $list.children("li").first().appendTo($list);
                    setActive();
                    $list.css("margin-left", -$list.children("li").eq(0).outerWidth(true));
                    isMoving = false;
                });
                

                if(i > count){
                    i = 0;
                }else{
                    i++; 
                }
                
                moveBar();
            });
            $(".prev").click(function(e){
                e.preventDefault();
                if (isMoving) {
                    return;
                }
                isMoving = true;

                $list.animate({"margin-left": 0}, 500, function(){
                    $list.children("li").last().prependTo($list);
                    setActive();
                    const firstWidth = $list.children("li").first().outerWidth(true);
                    $list.css("margin-left", -firstWidth);
                    isMoving = false;
                });


                if(i === 0){
                    i = count -1;
                }else{
                    i--; 
                }

                moveBar();
            });

            setInterval(function(){
                $(".next").trigger("click");
            },3500);

        });



