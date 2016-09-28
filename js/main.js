$(window).on("load", function () {

    var email = "flo.gauger@gmail.com";
    var $window = $(window);
    var $body = $("body");
    var $about = $("#about");
    var $navBar = $('#nav_bar');
    var $navItemContainer = $("#nav_item_container");
    var $contact = $('#contact');
    var $contactForm = $('#contact_form');
    var $contactEmail = $("#contact_email");
    var $contactSubject = $('#contact_subject');
    var $contactMessage = $('#contact_message');


    function init() {
        $window.scroll(scroll);
        $window.resize(resize);
        $('.parallax').parallax();
        $('#home').parallax({imageSrc: 'img/home.jpg'});
        $('#experience_header').parallax({imageSrc: 'img/experience.jpg'});
        $('#skills_header').parallax({imageSrc: 'img/skills.jpg'});
        $('#projects_header').parallax({imageSrc: 'img/projects3.jpg'});
        $('#contact_header').parallax({imageSrc: 'img/contact.jpg'});
        resize();
    }

    init();

    var navOffsetTop;

    function resize() {
        $body.removeClass('nav_docked');
        navOffsetTop = $about.offset().top - $navBar.outerHeight();
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

    $contactForm.submit(function (event) {
        sendEmail();
        event.preventDefault();
    });


    function sendEmail() {
        $contact.addClass('sending');
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



