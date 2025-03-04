$(".js-menu-toggle").click(function (e) {
    $(".document").toggleClass("menu-active");
});

function modal(el) {

    $(".js-modal").removeClass("active");
    $(el).toggleClass("active", true);
    return;

}

$(".js-modal-close").click(function (e) {
    e.preventDefault();
    $(".js-modal").removeClass("active");
    return;
});

$("[data-modal]").click(function (e) {
    e.preventDefault();
    var el = $(this).data("modal");
    modal(el);
});

$(function () {
    var counterDate = "2023/05/16 12:00",
        counterFinished = false;

    var myCountDown = new ysCountDown(counterDate, function (r, finished) {

        if (!counterFinished) {
            $(".timer-days").text(r.totalDays);
            $(".circle-days").css({
                'stroke-dashoffset': 314 - r.totalDays * 314 / 365
            });
            $(".timer-hours").text(("0" + r.hours).substr(-2));
            $(".circle-hours").css({
                'stroke-dashoffset': 314 - r.hours * 314 / 24
            });
            $(".timer-minutes").text(("0" + r.minutes).substr(-2));
            $(".circle-minutes").css({
                'stroke-dashoffset': 314 - r.minutes * 314 / 60
            });
            $(".timer-seconds").text(("0" + r.seconds).substr(-2));
            $(".circle-seconds").css({
                'stroke-dashoffset': r.seconds * 314 / 60 - 314
            });
        }


        if (finished) {
            counterFinished = true;
        }



    });

    var ns = $(".navscroll"),
        sp = ns.find(".scene-position"),
        nsh = ns.height(),
        points = [];


    $.each(sp, function (i) {

        points.push($(this).position().top + nsh / 2);

    });

    function goto(phase) {


        $.each(points, function (i, p) {


            var s = sp.eq(i),
                go = s.data("phase");

            $(".document").toggleClass("phase-" + go, go <= phase);

            if (go == phase) {

                ns.scrollTop(p - 1).trigger("scroll");
            }


        });





    }

    var tabsAutoplay = null;
    
    ns.scroll(function (e) {

        var t = ns.scrollTop();

        var v4 = $("#video-4-1");
        var v6 = $("#video-6-1");
        var v7 = $("#video-7-1");
        var v9 = $("#video-9-1");

        $.each(points, function (i, p) {


            var s = sp.eq(i);

            if (p > t && p < (t + nsh)) {

                var currentId = i,
                    current = s,
                    phase = current.data("phase"),
                    chapter = current.data("chapter");

                if (!current.hasClass("active")) {
                    current.addClass("active").siblings().removeClass("active");

                    var topnavCurrent = $(".js-topbar-item").filter(function (j) {
                        return $(this).data("chapter") == chapter;
                    });

                    if (topnavCurrent.length) {
                        topnavCurrent.addClass("active").siblings().removeClass("active");

                        topnavLineWid = topnavCurrent.outerWidth();
                        topnavLinePos = topnavCurrent.position().left;


                        $(".js-topbar-indicator").css({
                            left: topnavLinePos,
                            width: topnavLineWid
                        });

                        $(window).on("resize", function () {

                            topnavLineWid = topnavCurrent.outerWidth();
                            topnavLinePos = topnavCurrent.position().left;

                            $(".js-topbar-indicator").css({
                                left: topnavLinePos,
                                width: topnavLineWid
                            });
                        });

                    }


                    var hv = false;

                    if (phase == 4) hv = v4;
                    if (phase == 6) hv = v6;
                    if (phase == 7) hv = v7;
                    if (phase == 10) hv = v9;

                    if (phase == 9) {
                        
                        tabsAutoplay = setInterval(function () {
                            tabsButtons.each(function (j) {
                                if (j == tabsCurrent) {

                                    t = $(this).data("tab");

                                    tabsChange(t);
                                }
                            });



                            if (tabsCurrent >= tabsLen) {
                                tabsCurrent = 0;
                            } else {
                                tabsCurrent++;
                            }
                        }, 3000);
                    }

                    if (hv && !hv.data("init")) {

                        hv.data("init", true);
                        hv.get(0).currentTime = 0;
                        hv.get(0).play();

                        hv = false;

                    }



                    $(".document").addClass("phase-" + (phase++));
                    $(".document").removeClass("phase-" + phase);


                } else {



                }



                return;
            }

        });


    });

    $(".js-topbar-item").each(function (i) {

        var p = $(this).data("chapter");

        $(this).click(function (e) {
            e.preventDefault();

            goto(p);

        });

    });

    $(".js-dots-item").each(function (i) {

        var p = $(this).data("phase");

        $(this).click(function (e) {
            e.preventDefault();

            goto(p);

        });

    });

    $(".index-logo").click(function (e) {
        e.preventDefault();

        goto(1);

    });

    var tabs = $("[data-tab]"),
        tabsCurrent = 0,
        tabsButtons = $(".faces ._item"),
        tabsLen = tabsButtons.length;

    function tabsChange(t) {

        tabs.filter(function (i) {
            return $(this).data("tab") == t;
        }).addClass("active").siblings().removeClass("active");

        $(t).addClass("active").siblings().removeClass("active");

    }

    tabs.click(function (e) {

        e.preventDefault();


        clearInterval(tabsAutoplay);

        var t = $(this).data("tab");

        tabsChange(t);


        return;

    });

    var pv = $("#preloader-video").get(0),
        demoCounter = 0;


    $.each($(".scrollbox"), function (i) {

        new MiniBar(this, {

            barType: "default",
            alwaysShowBars: true,
            scrollX: false,
            scrollY: true,
            navButtons: false

        });

    });


    function loading() {


        pv.currentTime = 0;
        pv.play();

        pv.onended = function (e) {

            if (demoCounter > 0) {

                pv.currentTime = 0;
                pv.play();

                demoCounter--;


            } else {


                ns.trigger("scroll");
                $(".document").removeClass("loading");

                var v1 = $("#video-1-1").get(0);

                setTimeout(function () {

                    v1.currentTime = 0;
                    v1.play();

                }, 2000);


            }

        }

    }



    $(".s12 .carousel").slick({
        fade: true,
        arrows: false,
        dots: true,
        infinite: false,
        appendDots: $(".s12 .carousel-dots")
    });
	
	$(".s12 .carousel").on('beforeChange', function(event, slick, currentSlide, nextSlide){ 
		if (nextSlide == 3) {
			$('.s12 span.hl').text('Founding Mothers');
			$('.s12 .section-title').text('Founding Mothers');
		} else {
			$('.s12 span.hl').text('Host Committee');
			$('.s12 .section-title').text('Host Committee');
		}
	}); 

    $('.popup-gallery').slick({
        arrows: true,
        prevArrow: '<button type="button" class="slick-prev"></button>',
        nextArrow: '<button type="button" class="slick-next"></button>',
    });

    var levels = $(".level-carousel").slick({
        fade: true,
        arrows: false,
        infinite: false,
        responsive: [{
            breakpoint: 1024,
            settings: "unslick"
            }]
    });

    $(".level").each(function (i) {

        var ind = $(this).index(),
            pnt = $(this).find(".level-point").offset(),
            center = $(".bullseye-line").offset(),
            x = center.left - pnt.left,
            y = pnt.top - center.top,
            deg = Math.atan2(y, x) * 180 / Math.PI;

        $(this).click(function (e) {

            e.preventDefault();

            $(this).addClass("active").siblings().removeClass("active");
            levels.slick('slickGoTo', ind);

            $(".bullseye-line").css("transform", "rotate(" + (180 - deg) + "deg)");

        });


    }).first().trigger("click");

    loading();
    //ns.trigger("scroll");
    //$(".document").removeClass("loading");

});


$(".aside-header").click(function (e) {
    e.preventDefault();
    $(this).toggleClass("active");
});
