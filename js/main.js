AOS.init({
    duration: 800,
    easing: 'slide'
});

(function($) {

    "use strict";

    $(window).stellar({
        responsive: true,
        parallaxBackgrounds: true,
        parallaxElements: true,
        horizontalScrolling: false,
        hideDistantElements: false,
        scrollProperty: 'scroll'
    });

    var fullHeight = function() {
        $('.js-fullheight').css('height', $(window).height());
        $(window).resize(function(){
            $('.js-fullheight').css('height', $(window).height());
        });
    };
    fullHeight();

    var loader = function() {
        setTimeout(function() { 
            if($('#ftco-loader').length > 0) {
                $('#ftco-loader').removeClass('show');
            }
        }, 1);
    };
    loader();

    $.Scrollax();

    var burgerMenu = function() {
        $('body').on('click', '.js-fh5co-nav-toggle', function(event){
            event.preventDefault();
            $('#ftco-nav').is(':visible') 
                ? $(this).removeClass('active') 
                : $(this).addClass('active');
        });
    };
    burgerMenu();

    var onePageClick = function() {
        $(document).on('click', '#ftco-nav a[href^="#"]', function (event) {
            event.preventDefault();
            var href = $.attr(this, 'href');
            $('html, body').animate({
                scrollTop: $($.attr(this, 'href')).offset().top - 70
            }, 500);
        });
    };
    onePageClick();

    var carousel = function() {
        $('.home-slider').owlCarousel({
            loop: true,
            autoplay: true,
            margin: 0,
            animateOut: 'fadeOut',
            animateIn: 'fadeIn',
            nav: false,
            autoplayHoverPause: false,
            items: 1,
            navText: ["<span class='ion-md-arrow-back'></span>","<span class='ion-chevron-right'></span>"],
            responsive: { 0:{ items:1 }, 600:{ items:1 }, 1000:{ items:1 } },
            drag: false,
            mouseDrag: false,
            touchDrag: false,
            dots: true,
            dotsEach: true,
            onInitialized: function() {
                $('.owl-dot').each(function(index) {
                    $(this).attr('aria-label', 'Go to slide ' + (index + 1));
                });
            },
            onChanged: function() {
                $('.owl-dot').removeAttr('aria-current');
                $('.owl-dot.active').attr('aria-current', 'true');
            }
        });

        // ✅ THIS IS THE CLICK FIX PART
        $(document).on('click', '.slide-link', function(e) {
            e.stopPropagation(); // Let browser handle link click, but stop owl interference
            // Do not preventDefault
        });
    };
    carousel();

    $('nav .dropdown').hover(function(){
        var $this = $(this);
        $this.addClass('show').find('> a').attr('aria-expanded', true);
        $this.find('.dropdown-menu').addClass('show');
    }, function(){
        var $this = $(this);
        $this.removeClass('show').find('> a').attr('aria-expanded', false);
        $this.find('.dropdown-menu').removeClass('show');
    });

    $('#dropdown04').on('show.bs.dropdown', function () {
        console.log('show');
    });

    var scrollWindow = function() {
        $(window).scroll(function(){
            var st = $(this).scrollTop(),
                navbar = $('.ftco_navbar'),
                sd = $('.js-scroll-wrap');

            if (st > 150) navbar.addClass('scrolled');	
            if (st < 150) navbar.removeClass('scrolled sleep');
            if (st > 350) { navbar.addClass('awake'); sd.addClass('sleep'); }
            if (st < 350) { navbar.removeClass('awake').addClass('sleep'); sd.removeClass('sleep'); }
        });
    };
    scrollWindow();

    var counter = function() {
        $('#section-counter, .hero-wrap, .ftco-counter, .ftco-about').waypoint( function(direction) {
            if( direction === 'down' && !$(this.element).hasClass('ftco-animated') ) {
                var comma_separator_number_step = $.animateNumber.numberStepFactories.separator(',');
                $('.number').each(function(){
                    var $this = $(this), num = $this.data('number');
                    $this.animateNumber({ number: num, numberStep: comma_separator_number_step }, 7000);
                });
            }
        }, { offset: '95%' });
    };
    counter();

    var contentWayPoint = function() {
        var i = 0;
        $('.ftco-animate').waypoint( function(direction) {
            if( direction === 'down' && !$(this.element).hasClass('ftco-animated') ) {
                i++;
                $(this.element).addClass('item-animate');
                setTimeout(function(){
                    $('body .ftco-animate.item-animate').each(function(k){
                        var el = $(this);
                        setTimeout( function () {
                            var effect = el.data('animate-effect');
                            el.addClass(effect ? (effect + ' ftco-animated') : 'fadeInUp ftco-animated');
                            el.removeClass('item-animate');
                        },  k * 50, 'easeInOutExpo' );
                    });
                }, 100);
            }
        }, { offset: '95%' });
    };
    contentWayPoint();

    $('.image-popup').magnificPopup({
        type: 'image',
        closeOnContentClick: true,
        closeBtnInside: false,
        fixedContentPos: true,
        mainClass: 'mfp-no-margins mfp-with-zoom',
        gallery: { enabled: true, navigateByImgClick: true, preload: [0,1] },
        image: { verticalFit: true },
        zoom: { enabled: true, duration: 300 }
    });

    $('.popup-youtube, .popup-vimeo, .popup-gmaps').magnificPopup({
        disableOn: 700,
        type: 'iframe',
        mainClass: 'mfp-fade',
        removalDelay: 160,
        preloader: false,
        fixedContentPos: false
    });

})(jQuery);

// ✅ Typing Animation
const typingAnimationElements = document.querySelectorAll('.typing-animation');
const typingTexts = ['Power BI  ', 'Power Platform  ', 'Python    '];

function playTypingAnimation(element, textIndex = 0) {
    const text = typingTexts[textIndex];
    let i = 0;
    function type() {
        if (i < text.length) {
            element.textContent += text[i++];
            setTimeout(type, 200);
        } else {
            setTimeout(() => {
                element.textContent = '';
                playTypingAnimation(element, (textIndex + 1) % typingTexts.length);
            }, 1000);
        }
    }
    type();
}

typingAnimationElements.forEach(el => playTypingAnimation(el));