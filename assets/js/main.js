(function($) {

  "use strict";

  $(window).on('load', function() {
    var data_json;

    $.getJSON("assets/json/modal_data.json", function(json) {

      //get modal data
      data_json = json;

    });

    /*
   MixitUp
   ========================================================================== */
  $('#portfolio').mixItUp();

  /*
   One Page Navigation & wow js
   ========================================================================== */
    var OnePNav = $('.onepage-nev');
    var top_offset = OnePNav.height() - -0;
    OnePNav.onePageNav({
      currentClass: 'active',
      scrollOffset: top_offset,
    });

  /*Page Loader active
    ========================================================*/
    $('#preloader').fadeOut();

  // Sticky Nav
    $(window).on('scroll', function() {
        if ($(window).scrollTop() > 200) {
            $('.scrolling-navbar').addClass('top-nav-collapse');
        } else {
            $('.scrolling-navbar').removeClass('top-nav-collapse');
        }
    });

    /* slicknav mobile menu active  */
    $('.mobile-menu').slicknav({
        prependTo: '.navbar-header',
        parentTag: 'liner',
        allowParentLinks: true,
        duplicate: true,
        label: '',
        closedSymbol: '<i class="icon-arrow-right"></i>',
        openedSymbol: '<i class="icon-arrow-down"></i>',
      });

      /* WOW Scroll Spy
    ========================================================*/
     var wow = new WOW({
      //disabled for mobile
        mobile: false
    });

    wow.init();

    /* Nivo Lightbox
    ========================================================*/
    $('.lightbox').nivoLightbox({
        effect: 'fadeScale',
        keyboardNav: true,
      });

    /* Counter
    ========================================================*/
    $('.counterUp').counterUp({
     delay: 10,
     time: 1000
    });


    /* Back Top Link active
    ========================================================*/
      var offset = 200;
      var duration = 500;
      $(window).scroll(function() {
        if ($(this).scrollTop() > offset) {
          $('.back-to-top').fadeIn(400);
        } else {
          $('.back-to-top').fadeOut(400);
        }
      });

      $('.back-to-top').on('click',function(event) {
        event.preventDefault();
        $('html, body').animate({
          scrollTop: 0
        }, 600);
        return false;
      });

      $('.science-holder').on('click', function() {

        var title = $( this ).find( 'h3' ).text(); //get the title with this ugly hack.

        var modal_body = data_json[title.toLowerCase()];

        $("#modal-title").text(title);
        $(".modal-body").html(modal_body);

        ///show the modal yo
        $("#myModal").modal('show');
      });

      $('.science-item-text').click(function(event){
          event.preventDefault();
          // Click code here...
      });

    $('.nav-link').click(function(event){
        var newurl = window.location.protocol + "//" + window.location.host + "/";
        var link = event.target;
        var href = $(link).attr("href");
        newurl += href;
        window.history.pushState({path:newurl},'',newurl);
    });


	//handle email sending
    /*
    $( "#contact-form" ).submit(function( event ) {
            var data = $("#contact-form :input").serializeArray();
            data['g-recaptcha-response'] = $('.g-recaptcha').val();
            $("#error").hide();
            $("#success").hide();
            $.ajax({
                url: 'cgi-bin/email.php',
                type: 'POST',
                data: data,
                success: function(msg) {
                   console.log(msg); 
                },
                error: function(msg) {
                    $("#error").show();
                    $("#error").text("There was an issue sending your message. Please try again later, or contact us via Facebook.");
                }               
            });


    });
    */
  });  //end window on load

}(jQuery));
