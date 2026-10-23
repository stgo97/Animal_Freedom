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



