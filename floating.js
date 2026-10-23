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