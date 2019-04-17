/*
 * Developed by Alex Yong of IndyCann
 *
 */

(function($) {

  "use strict";

  $(window).on('load', function() {
    var data_json;
    var data_yaml;
    $.getJSON("assets/json/modal_data.json", function(json) {

      //get modal data
      data_json = json;

    });
    $.get('assets/yaml/modal-data.yaml')
        .done(function (data) {
        data_yaml = jsyaml.load(data);
      });
        
      /* WOW Scroll Spy
    ========================================================*/
     var wow = new WOW({
      //disabled for mobile
        mobile: false
    });

    wow.init();

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
//    $('#preloader').fadeOut();

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

        //var modal_body = data_json[title.toLowerCase()];
        $("#modal-title").text(title);
        var yaml_items = data_yaml[title.toLowerCase()];

        var complete_html = "";

        for (var i =0; i< yaml_items.length; i++) {
            var yaml_item = yaml_items[i];
            var fact = yaml_item.fact;
            var body = fact.body;
            var main_article;
            var archive_link;
            var html_item ="";
            if (fact.main_article) {
                main_article = fact.main_article;
            }

            if (fact.archive_link) {
                archive_link = fact.archive_link;
            }
            html_item = "<ul class='list_override'>\n<li>";
            html_item += body + "\n<ul>";
            if (main_article) {
                html_item += "<li>";
                html_item += "<a target='_blank' href='"+main_article +"'>Main Link</a>";
                html_item += "</li>";
            }
            if (archive_link) {
                html_item += "<li>";
                html_item += "<a target='_blank' href='"+archive_link +"'>Archive Link</a>";
                html_item += "</li>";

            }
            html_item += "</ul></li></ul><br/>";
            complete_html += html_item;

        }

        $(".modal-body").html(complete_html);

        //make the urls open in a new window.
        //$(".modal-body > .list_override > li >ul >li> a").attr("target", "_blank");
        ///show the modal yo
        $("#myModal").modal('show');
      });

      $('.science-item-text').click(function(event){
          event.preventDefault();
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
