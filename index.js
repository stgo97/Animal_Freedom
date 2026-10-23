

// -------------- 0. 헤더감지 ------------------------

window.addEventListener("scroll", function () {
    const header = document.querySelector("header");
    const mainVisual = document.querySelector(".main-visual");

    if (!header || !mainVisual) return;
    const changePoint = mainVisual.offsetHeight - header.offsetHeight;
    if (window.scrollY >= changePoint) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }
});
    document.addEventListener("DOMContentLoaded", () => {


// ----------------------- 1. 메인 배너 ---------------------------------
    const banners = document.querySelectorAll(
        ".main-photo > div"
    );
    const bannerDots = document.querySelectorAll(
        ".banner-dot"
    );

    function showBanner(index) {
        banners.forEach((banner, i) => {
            banner.classList.toggle("active", i === index);
        });
        bannerDots.forEach((dot, i) => {
            dot.classList.toggle("active", i === index);
        });
    }

    bannerDots.forEach((dot) => {
        dot.addEventListener("click", () => {
            const index = Number(dot.dataset.slide);
            showBanner(index);
        });
    });
    if (banners.length) {
        showBanner(0);
    }


// -------------------------------- 2. 활동 ------------------------------------

const activityCarousel = document.querySelector(".act-carousel");

if (activityCarousel) {
    const activityDesktopSlides = Array.from(
        activityCarousel.querySelectorAll(".act-first, .act-second")
    );

    const activityMobileContainer = activityCarousel.querySelector(
        ".act-mobile-pages"
    );

    const activityButton = document.querySelector(".act-toggle");
    const activityCurrent = document.querySelector(".act-current");

    const activityMobileMedia = window.matchMedia("(max-width: 600px)");

    let activityIndex = 0;
    let activityMobileSlides = [];
    let activityAutoSlide;
    const activityItems = activityDesktopSlides.flatMap(slide =>
        Array.from(slide.querySelectorAll(":scope > ul"))
    );

    if (activityMobileContainer) {
        for (let i = 0; i < activityItems.length; i += 4) {
            const mobileSlide = document.createElement("div");
            mobileSlide.className = "act-mobile-page";
            activityItems.slice(i, i + 4).forEach(item => {
                mobileSlide.appendChild(item.cloneNode(true));
            });
            activityMobileContainer.appendChild(mobileSlide);
            activityMobileSlides.push(mobileSlide);
        }
    }

    function getActivitySlides() {
        return activityMobileMedia.matches
            ? activityMobileSlides
            : activityDesktopSlides;
    }

    function showActivity(index) {
        const slides = getActivitySlides();
        if (!slides.length) return;
        activityIndex = (index + slides.length) % slides.length;
        slides.forEach((slide, i) => {
            slide.classList.toggle("active", i === activityIndex);
        });
        if (activityCurrent) {
            const current = String(activityIndex + 1).padStart(2, "0");
            const total = String(slides.length).padStart(2, "0");
            activityCurrent.textContent = `${current} / ${total}`;
        }
        if (activityButton) {
            activityButton.setAttribute(
                "aria-label",
                activityIndex === slides.length - 1
                    ? "처음 활동 페이지 보기"
                    : "다음 활동 보기"
            );
        }
    }

    function startActivityAutoSlide() {
        clearInterval(activityAutoSlide);
        activityAutoSlide = setInterval(() => {
            const slides = getActivitySlides();
            if (!slides.length) return;
            showActivity((activityIndex + 1) % slides.length);
        }, 3000);
    }

    if (activityButton) {
        activityButton.addEventListener("click", () => {
            const slides = getActivitySlides();
            if (!slides.length) return;
            showActivity((activityIndex + 1) % slides.length);
            startActivityAutoSlide();
        });
    }

    function resetActivityPage() {
        showActivity(0);
        startActivityAutoSlide();
    }

    if (activityMobileMedia.addEventListener) {
        activityMobileMedia.addEventListener(
            "change",
            resetActivityPage
        );
    } else {
        activityMobileMedia.addListener(resetActivityPage);
    }

    showActivity(0);
    startActivityAutoSlide();
}

const oncenter = document.querySelector(".oncenter");

if (oncenter) {
    const tabs = oncenter.querySelectorAll(".oncenter-tab");
    const panels = oncenter.querySelectorAll(".center-panel");

    tabs.forEach((tab) => {
        tab.addEventListener("click", () => {
            const selectedCenter = tab.dataset.center;

            // 1. 탭 버튼 활성화
            tabs.forEach((item) => {
                const isActive = item === tab;

                item.classList.toggle("active", isActive);
                item.setAttribute("aria-selected", isActive);
            });

            // 2. 해당하는 이미지와 설명 활성화
            panels.forEach((panel) => {
                panel.classList.toggle(
                    "active",
                    panel.dataset.panel === selectedCenter
                );
            });
        });
    });


    /* ---------------- 온센터 박스 순차 등장 ---------------- */

    const boxList = oncenter.querySelector(".oncenter-box");

    if (
        boxList &&
        window.matchMedia("(min-width: 1025px)").matches &&
        "IntersectionObserver" in window
    ) {
        const boxObserver = new IntersectionObserver(
            (entries, observer) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        boxList.classList.add("show");

                        // 한 번 등장하면 관찰 종료
                        observer.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: 0.2
            }
        );

        boxObserver.observe(boxList);
    }
}


//-------------------------------- 4. 입양 ------------------------------------

    const adoptImages = document.querySelectorAll(
        ".adopt-img li"
    );
    if ("IntersectionObserver" in window) {
        const adoptObserver = new IntersectionObserver(
            (entries, observer) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("visible");
                        observer.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: 0.15,
                rootMargin: "0px 0px -40px 0px"
            }
        );
        adoptImages.forEach((item) => {
            adoptObserver.observe(item);
        });
    } else {
        adoptImages.forEach((item) => {
            item.classList.add("visible");
        });
    }
    });