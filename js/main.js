$(window).on("load", function () {

    var email = "flo.gauger@gmail.com";
    var links = {
        github: "https://github.com/devgg",
        linkedin: "https://de.linkedin.com/in/floriangauger",
        resume: "res/resume.pdf",
        fonticon: "http://gauger.io/fonticon",
        viewicon: "http://gauger.io/viewicon",
        hermes: "https://github.com/devgg/hermes",
        robozen: "https://github.com/devgg/roboZen"
    };
    var $window = $(window);
    var $body = $("body");
    var $intro = $("#intro");
    var $navBar = $('#nav_bar');
    var $navItemContainer = $("#nav_item_container");

    var navOffsetTop;

    function resize() {
        $body.removeClass('nav_docked');
        navOffsetTop = $intro.offset().top - $navBar.outerHeight();
        scroll();
    }

    function scroll() {
        if (navOffsetTop <= $window.scrollTop() && !$body.hasClass('nav_docked')) {
            $body.addClass('nav_docked');
            $navItemContainer.addClass("container");
        }
        if (navOffsetTop > $window.scrollTop() && $body.hasClass('nav_docked')) {
            $body.removeClass('nav_docked');
            $navItemContainer.removeClass("container");
        }
    }

    $(".nav_item").click(function () {
        var $target = $($(this).data("target"));
        $('html, body').animate({
            scrollTop: $target.offset().top - $navBar.outerHeight()
        }, 500);
    });

    function scrollTo(hash) {
        location.hash = "#" + hash;
    }

    function init() {
        $window.scroll(scroll);
        $window.resize(resize);
        $('.parallax').parallax();
        $('#home').parallax({imageSrc: 'img/j.jpg'});
        //$( function () { $('[data-parallax="scroll"]').parallax(); });
        resize();
    }

    init();

    $(".link").click(function () {
        window.open(links[$(this).data("link")], "_blank");
        event.stopPropagation()
    });

    $("#email").click(function () {
        openEmailClient(email);
        event.stopPropagation()
    });


    var $contact = $('#contact');
    var $contactForm = $('#contact_form');
    var $contactEmail = $("#contact_email");
    var $contactSubject = $('#contact_subject');
    var $contactMessage = $('#contact_message');
    $contactForm.submit(function (event) {
        sendEmail();
        event.preventDefault();
    });

    /* specify the message that will be displayed if the field is marked invalid */
    //$contactEmail.get(0).setCustomValidity("Field must be a number.");

    function sendEmail() {
        emailSending();
        $.ajax({
            headers: {
                Accept : "application/json"
            },
            url: "https://formspree.io/" + email,
            method: "POST",
            data: {
                mail: $contactEmail.val(),
                _subject: $contactSubject.val(),
                message: $contactMessage.val()
            },
            dataType: "json",
            beforeSend: emailSending,
            success: emailSentSuccess,
            error: emailSentError
        });
    }

    function emailSending() {
        $contact.addClass('sending');
    }

    function emailSentSuccess() {
        emailOutAnimation(true, 300);
    }

    function emailSentError() {
        emailOutAnimation(false, 1000);
    }


    function emailOutAnimation(success, timeAfterReply) {
        var subject = $contactSubject.val();
        var message = $contactMessage.val();
        $contactEmail.val("");
        $contactSubject.val("");
        $contactMessage.val("");
        var clazz = success ? 'success' : 'error';
        window.setTimeout(function () {
            $contact.addClass(clazz);
            window.setTimeout(function () {
                $contact.addClass('move_out');
                window.setTimeout(function () {
                    $contact.removeClass('sending');
                    window.setTimeout(function () {
                        $contact.removeClass(clazz);
                        $contact.removeClass('move_out');
                        if (!success) {
                            openEmailClient(email, subject, message);
                        }
                    }, 500);
                }, 500);
            }, timeAfterReply);
        }, 2000);
    }

    function openEmailClient(email, subject, content) {
        var command = "mailto:" + email;
        if (subject !== undefined) {
            command += "?subject=" + subject;
        }
        if (content !== undefined) {
            command += "&body=" + content;
        }
        window.location.href = command;
    }

    //var $skills = $(".skill");
    //$("#default_skill_button").click(function (event) {
    //    changeSkillTo($skills.eq(Math.floor(Math.random() * $skills.length)));
    //    event.stopPropagation();
    //});

    //$skills.click(function (event) {
    //    changeSkillTo($(this));
    //    event.stopPropagation();
    //});

    //$("html").click(contractCurrentSkill);

    //var $currentSkill;
    //function changeSkillTo($skill) {
    //    contractCurrentSkill();
    //    if (!$skill.is($currentSkill)) {
    //        $currentSkill = $skill;
    //        expandCurrentSkill();
    //    } else {
    //        $currentSkill = undefined;
    //    }
    //}
    //
    //function expandCurrentSkill() {
    //    $currentSkill.stop();
    //    $currentSkill
    //        .animate({height: "200px"}, 300)
    //        .css("background-color", "rgba(243, 74, 83, 0.8)");
    //    $currentSkill.children().css("color", "white");
    //}
    //
    //function contractCurrentSkill() {
    //    if ($currentSkill) {
    //        $currentSkill.stop();
    //        $currentSkill
    //            .animate({height: "16px"}, 300)
    //            .css("padding", "")
    //            .css("background-color", "");
    //        $currentSkill.children().css("color", "");
    //    }
    //}

    //$(function () {
    //    $("#text1").typed({
    //        strings: ["Hi! I am Florian.^1000"],
    //        showCursor: false,
    //        callback: function () {
    //            $("#text2").typed({
    //                strings: ["I like<br>^1000"],
    //                showCursor: false,
    //                callback: function () {
    //                    $("#text3").typed({
    //                        strings: ["programming", "books", "debating", "learning", "designing", "movies", "handball"],
    //                        backDelay: 1000,
    //                        loop: true
    //                    });
    //                }
    //            });
    //        }
    //
    //    });
    //});
    //
    //var $navigation_menu_buttons = $(".navigation_menu_button");
    //$navigation_menu_buttons.click(function() {
    //    var nextPage = $navigation_menu_buttons.index(this);
    //    if (nextPage !== currentPage) {
    //        changePage(nextPage);
    //    }
    //});
    //
    //$(".navigation_left").click(function(event) {
    //    changePage(currentPage - 1);
    //    event.stopPropagation();
    //});
    //$(".navigation_right").click(function(event) {
    //    changePage(currentPage + 1);
    //    event.stopPropagation();
    //});
    //
    //
    //$(document).keydown(function (event) {
    //    switch (event.which) {
    //        case 37:
    //            changePage(currentPage - 1);
    //            break;
    //        case 39:
    //            changePage(currentPage + 1);
    //            break;
    //    }
    //    event.preventDefault();
    //});
    //
    //
    //var animationEndEventNames = {
    //    'WebkitAnimation': 'webkitAnimationEnd',
    //    'OAnimation': 'oAnimationEnd',
    //    'msAnimation': 'MSAnimationEnd',
    //    'animation': 'animationend'
    //};
    //
    //var animationEndEventName = animationEndEventNames[Modernizr.prefixed('animation')];
    //var animating = false;
    //var currentPage = 0;
    //var $pages = $(".page");
    ////var footerColors = ["#F34A53", "#4B515D", "#4B515D"];
    //
    //var prevOutClass = 'page-rotateLeftSideFirst';
    //var prevInClass = 'page-moveFromLeft page-delay200 page-ontop';
    //var nextOutClass = 'page-rotateRightSideFirst';
    //var nextInClass = 'page-moveFromRight page-delay200 page-ontop';
    //
    //
    //function changePage(nextPage) {
    //    if (!animating && nextPage >= 0 && nextPage < $pages.length) {
    //        var $current = $pages.eq(currentPage);
    //        var $next = $pages.eq(nextPage);
    //
    //        if (animationEndEventName) {
    //            animating = true;
    //            $navigation_menu_buttons.eq(currentPage).removeClass("current");
    //            $navigation_menu_buttons.eq(nextPage).addClass("current");
    //
    //            var outClass = nextPage > currentPage ? nextOutClass : prevOutClass;
    //            var inClass = nextPage > currentPage ? nextInClass : prevInClass;
    //            currentPage = nextPage;
    //
    //            //$("#footer").css("background-color", footerColors[currentPage]);
    //            var firstCallback = true;
    //            $current.addClass(outClass).off(animationEndEventName).on(animationEndEventName, endAnimation);
    //            $next.addClass(inClass + " page-current").off(animationEndEventName).on(animationEndEventName, endAnimation);
    //
    //            function endAnimation() {
    //                if (firstCallback) {
    //                    firstCallback = false;
    //                } else {
    //                    $current.removeClass(outClass + " page-current");
    //                    $next.removeClass(inClass);
    //                    animating = false;
    //                }
    //            }
    //        } else {
    //            $current.removeClass("page-current");
    //            $next.addClass("page-current")
    //        }
    //    }
    //}
});



