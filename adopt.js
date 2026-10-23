
/*-----------------메인비주얼--------------*/
$(function(){
    let current = 0;
    let slides = $(".main-slide .slide");
    let total = slides.length;

    setInterval(function(){
        let next = (current + 1) % total;

        slides.eq(current).fadeOut(1000);
        slides.eq(next).fadeIn(1000);

        current = next;
    }, 4000);
});

/*----------------강아지 케러셀-------------*/
$(function (){
    let dogMove = $(".dog-card").first().outerWidth();
        $(".dog-next").click(function () {
        if ($(".dog-track").is(":animated")) return;
        $(".dog-track").animate({
            marginLeft: -dogMove
        }, 500, function () {
            $(".dog-track")
                .append($(".dog-card").first())
                .css("margin-left", 0);
        });
    });
    
    
    $(".dog-prev").click(function () {
        if ($(".dog-track").is(":animated")) return;
        $(".dog-track")
            .prepend($(".dog-card").last())
            .css("margin-left", -dogMove);
        $(".dog-track").animate({
            marginLeft: 0
        }, 500);
    });
    
    
    $(window).resize(function () {
        dogMove = $(".dog-card").first().outerWidth();
    });
});

/*---------------12260따라락----------------*/
$(function() {
    let started = false;

    $(window).on("scroll", function() {

        if (started) return;

        let sectionTop = $(".adoption-story").offset().top;
        let scrollBottom = $(window).scrollTop() + $(window).height();

        if (scrollBottom >= sectionTop + 200) {

            started = true;

            $(".count").each(function() {
                let $this = $(this);
                let target = Number($this.attr("data-target"));

                $({ count: 0 }).animate(
                    { count: target },
                    {
                        duration: 2000,
                        easing: "swing",
                        step: function(now) {
                            $this.text(Math.floor(now).toLocaleString());
                        },
                        complete: function() {
                            $this.text(target.toLocaleString());
                        }
                    }
                );
            });
        }
    });

    $(window).trigger("scroll");
});

/*-----------------탭메뉴---------------*/
$(function () {

    function showCards() {

        // 현재 브라우저 너비 확인
        let screenWidth = $(window).width();
        let cardCount;

        // 화면 크기별 카드 개수 설정
        if (screenWidth <= 360) {
            cardCount = 1;  // 모바일 1개
        } else if (screenWidth <= 768) {
            cardCount = 3;  // 태블릿 3개
        } else {
            cardCount = 4;  // PC 4개
        }

        // 현재 선택된 탭 확인
        let tab = $(".tab-button button.active").text().trim();

        // 모든 카드 숨기기
        $(".adopt-card").hide();

        // 전체 탭
        if (tab === "전체") {

            $(".adopt-card")
                .slice(0, cardCount)
                .show();

        }

        // 강아지 탭
        else if (tab === "강아지") {

            $(".adopt-card.dog")
                .slice(0, cardCount)
                .show();

        }

        // 고양이 탭
        else if (tab === "고양이") {

            $(".adopt-card.cat")
                .slice(0, cardCount)
                .show();

        }
    }

    // 처음 페이지 실행
    showCards();

    // 탭 클릭
    $(".tab-button button").click(function () {

        $(".tab-button button").removeClass("active");

        $(this).addClass("active");

        showCards();
    });

    // 브라우저 크기 변경
    $(window).resize(function () {

        showCards();

    });

});

