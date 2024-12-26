$(document).ready(function(){

  $( ".datepicker" ).datepicker();

  $("select").selectmenu();

  $( "input[type='checkbox']").checkboxradio();
  $( "input[type='radio']").checkboxradio();

  $( ".nav-menu" ).menu();

  var originalText = $('.menu-holder .ui-selectmenu-text').text();
	$('.open-menu').click(function() {
	 	$('.menu-holder').toggleClass('open');
	 	$('#main').toggleClass('open');
     if ($('.menu-holder').hasClass('open')) {
         $('.menu-holder .ui-selectmenu-text').text(function (_, text) {
             return text.replace(/[a-z]/g, '').replace(/\s+/g, '');
         });
     } else {
       $('.menu-holder .ui-selectmenu-text').text(originalText);
     }
		return false;
	});

  var resizeScreen = function() {
    if ($(window).width() < 650) {
      $('.menu-holder').addClass('open');
      $('#main').addClass('open');
    } else {
      $('.menu-holder').removeClass('open');
      $('#main').removeClass('open');
    }
  }

  resizeScreen();

  $(window).resize(function () {
    resizeScreen();
  });

  $('.ui-menu .ui-menu-item').on('click', function (e) {
    e.preventDefault();
    $('.ui-menu .ui-menu-item').removeClass('active');
    $(this).addClass('active');
  });

  $('.ui-menu .ui-menu .ui-menu-item').on('click', function (e) {
    e.preventDefault();
    $('.ui-menu .ui-menu .ui-menu-item').removeClass('nested-active');
    $(this).addClass('nested-active');
  });


  $('.ui-menu-item').each(function() {
    if ($(this).find('.ui-menu-item').length > 0) {
        $(this).addClass('has-submenu');
    }
  });

});
