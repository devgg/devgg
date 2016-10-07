$(window).on("load", function () {

    var email = "flo.gauger@gmail.com";
    var $window = $(window);
    var $body = $("body");
    var $about = $("#about");
    var $navBar = $('#nav_bar');
    var $contact = $('#contact');
    var $contactForm = $('#contact_form');
    var $contactEmail = $("#contact_email");
    var $contactSubject = $('#contact_subject');
    var $contactMessage = $('#contact_message');

    $window.scroll(scroll);
    $window.resize(resize);
    $('#home').parallax({imageSrc: 'img/home-min.jpg'});
    $('#experience_header').parallax({imageSrc: 'img/experience-min.jpg'});
    $('#skills_header').parallax({imageSrc: 'img/skills-min.jpg'});
    $('#projects_header').parallax({imageSrc: 'img/projects-min.jpg'});
    $('#contact_header').parallax({imageSrc: 'img/contact-min.jpg'});
    resize();

    $(".nav_item").click(function () {
        var $target = $($(this).data("target"));
        $('html, body').animate({
            scrollTop: $target.offset().top - $navBar.outerHeight() + 1
        }, 500);
    });

    $contactForm.submit(function (event) {
        sendEmail();
        event.preventDefault();
    });

    $("figure a").click(function (event) {
        var $figure = $(this).closest("figure");
        if (isMobile && !$figure.hasClass("figure-hover")) {
            $("figure").removeClass("figure-hover");
            $figure.addClass("figure-hover");
            event.preventDefault();
        }
    });


    var navOffsetTop;

    function resize() {
        $body.removeClass('nav_docked');
        navOffsetTop = $about.offset().top - $navBar.outerHeight();
        scroll();
    }

    function scroll() {
        if (navOffsetTop <= $window.scrollTop() && !$body.hasClass('nav_docked')) {
            $body.addClass('nav_docked');
        }
        if (navOffsetTop > $window.scrollTop() && $body.hasClass('nav_docked')) {
            $body.removeClass('nav_docked');
        }
    }

    function sendEmail() {
        $contact.addClass('sending');
        $.ajax({
            headers: {
                Accept: "application/json"
            },
            url: "https://formspree.io/" + email,
            method: "POST",
            data: {
                mail: $contactEmail.val(),
                _subject: $contactSubject.val(),
                message: $contactMessage.val()
            },
            dataType: "json",
            success: emailSentSuccess,
            error: emailSentError
        });
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
        var payload = [subject, content].join('&');
        if (abc.length > 0) {
            command += "?=" + payload;
        }
        window.location.href = command;
    }
});



