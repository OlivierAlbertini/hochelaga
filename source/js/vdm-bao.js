(function ($) {

   
  // ******************************
  //Icon modal
$('[id^="linkModalIcon"]').click(function() {

  var title = $(this).next(".ic-name").html();
  var nameFileSvg = $(this).next(".ic-name").attr("id");
  var textModalUtility = '&lt;span class="icon icon-'+nameFileSvg+'" role="icon"&gt;&lt;/span&gt;';
  var textModalEditorial = '&lt;img src="pathtosvg/'+nameFileSvg+'.svg" role="icon" width="40" height="40" /&gt;';

  $("#exampleModalIconUtilityLabel").text(title);
  $("#exampleModalIconEditorialLabel").text(title);
  $("#exampleModalIconUtility .modal-body .select-all").html(textModalUtility);
  $("#exampleModalIconEditorial .modal-body").html("<p class='select-all'>"+textModalEditorial+"</p> <p>ou<p> <p class='select-all'>"+textModalUtility+"</p>");
  
});


  // ******************************
  // Begin side menu push

  var $menuOpen = $(".menu-toggler");
  var $buttonClose = $(".js-button-close")

  $menuOpen.on("click", function () {
    $("#navbarSideMenu").attr("aria-expanded", "true");
    $('.overlay').show();
  });

  // Close navbarSide when the overlay is clicked
  $('.overlay').on('click', function () {
    $('#slide-menu-left').data('slide-menu').close();
    $('#navbar-search').hide();
    $('.overlay').hide();
  });

  $buttonClose.on("click", function () {
    $('#slide-menu-left').data('slide-menu').close();
    $("#navbarSideMenu").attr("aria-expanded", "false");
    $('#navbar-search').hide();
    $('.overlay').hide();
  });


  var $navbarSearchToggler = $(".navbar-search-toggler");

  $navbarSearchToggler.on("click", function() {
    $('#navbar-search').show();
    $('input').focus();
    $('.overlay').show();
  });


  // Nav search input-group focus
  //
  $( ".js-nav-search .form-control" ).on("focus", function() {
    $('#slide-menu-left').addClass('js-search-focus');
    $('.slide-menu-header').addClass('invisible');
    $('.slider').addClass('invisible');
    $('.js-button-close-search').removeClass('d-none');
  });

  $('.js-button-close-search').on('click', function(e) {
    e.preventDefault();
    $(this).addClass('d-none');
    $(this).siblings('input').val('');
    $(this).siblings('.btn-clear').addClass('d-none');
    $('#slide-menu-left').removeClass('js-search-focus');
    $('.slide-menu-header').removeClass('invisible');
    $('.slider').removeClass('invisible');
  })


  // Clear input
  //
  $('.has-clear input').on('input propertychange', function() {
    var $this = $(this);
    var visible = Boolean($this.val());
    $this.siblings('.btn-clear').toggleClass('d-none', !visible);
  }).trigger('propertychange');
  
  $('.btn-clear').on('click', function(e) {
    e.preventDefault();
    $(this).siblings('input').val('')
      .trigger('propertychange').focus();
  });

  // Toggle popover from data-toggle
  //
  $('[data-toggle="popover"]').popover();


  // Wizard
  //
  $('a[data-toggle="tab"]').on("show.bs.tab", function (e) {
    var $target = $(e.target);
    if ($target.parent().hasClass("disabled")) {
      return false;
    }
  });

  $(".next-step").click(function (e) {
    var $active = $(".nav-steps li>a.active");
    $active.addClass("complete");
    $active.parent().next().removeClass("disabled");
    nextTab($active);
  });

  $(".prev-step").click(function (e) {
    var $active = $(".nav-steps li>a.active");
    prevTab($active);
  });

  function nextTab(elem) {
    $(elem).parent().next().find('a[data-toggle="tab"]').click();
  }

  function prevTab(elem) {
    $(elem).parent().prev().find('a[data-toggle="tab"]').click();
  }

  // Nav-tabs-dropdown
  //
  $('.nav-tabs-dropdown').each(function (i, elm) {
    $(elm).next('ul').find('li a.active').text().length == 0 ? $(elm).text($(elm).next('ul').find('li a:first').text()) : $(elm).text($(elm).next('ul').find('li a.active').text());
    //$(elm).text($(elm).next('ul').find('li a.active').text());

  });

  $('.nav-tabs-dropdown-menu .dropdown-item').on('click', function (e) {
    e.preventDefault();
    $(e.target).closest('ul').prev('a').text($(this).text());
    $(this).siblings().removeClass('active');

    // Remove active class for all items and add it to current active item
    $(this).siblings().children().removeClass('active');
    $(this).children().addClass('active');
  });

  // Slide-menu initialisation
  // @see slide-menu.js 
  //

  if($('#slide-menu-left').length != 0) {

    $('#slide-menu-left').slideMenu({
      position: 'left',
      submenuLinkAfter: '<span class="vdm vdm-063-fleche-droite" aria-hidden="true"></span>',
      backLinkTitle: 'Retour',
      backLinkClass: 'back-link',
      backLinkBefore: '<span class="vdm vdm-058-chevron-gauche" aria-hidden="true"></span> '
    });
  }


  // sticky main nav
  var $nav = $(".main-navbar");
  $nav.toggleClass('navbar-scrolled', $(this).scrollTop() > $nav.height());
  //Scroll menu
  $(document).scroll(function () {
    var $nav = $(".main-navbar");
    $nav.toggleClass('navbar-scrolled', $(this).scrollTop() > $nav.height());
  });

  // Sticky navbar
  //
  // Custom function which toggles between sticky class (is-sticky)
  var stickyToggle = function(sticky, stickyWrapper, stickyLimit, scrollElement) {
    var stickyHeight = sticky.outerHeight();
    var stickyTop = stickyWrapper.offset().top;
    var stickyLimitTop = stickyLimit.offset().top;

    // We handle view all pages Sticky behavior by setting a stickyLimit.
    // Need to handle scrollspy and multiple ID on same page for view all templates pages...
    if(scrollElement.scrollTop() > stickyLimitTop - stickyHeight) {
      sticky.css({top: (scrollElement.scrollTop() + stickyHeight - stickyLimitTop) * -1})
    } else if (scrollElement.scrollTop() > stickyTop){
      stickyWrapper.height(stickyHeight);
      sticky.addClass("is-sticky");
    }
    else{
      sticky.removeClass("is-sticky");
      stickyWrapper.height('auto');
    }
  };
  
  // Find all data-toggle="sticky-onscroll" elements
  $('[data-toggle="sticky-onscroll"]').each(function() {
    var sticky = $(this);
    var stickyWrapper = $('<div>').addClass('sticky-wrapper'); // insert hidden element to maintain actual top offset on page
    var stickyLimit = sticky.siblings().last();
    sticky.before(stickyWrapper);
    sticky.addClass('sticky');

    // Scroll & resize events
    $(window).on('scroll.sticky-onscroll resize.sticky-onscroll', function() {
      if(window.matchMedia("(min-width: 992px)").matches) {
        //console.log("It matches!");
        stickyToggle(sticky, stickyWrapper, stickyLimit, $(window));
      } else {
        sticky.removeClass("is-sticky");
        stickyWrapper.height('auto');
      }
    });
  });


  // Smooth scrolling using jQuery easing
  $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function() {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      if (target.length) {
        if($(".sticky").length > 0){
          if(window.matchMedia("(min-width: 992px)").matches) {
            $navOffset = $(".sticky").height();
          } else {
            $navOffset = 0;
          }
        } else {
          $navOffset = 0;
        }

        $('html, body').animate({
          scrollTop: (target.offset().top - $navOffset)
        }, 1000, "easeInOutExpo");

        target.focus(); // Setting focus
        if (target.is(":focus")){ // Checking if the target was focused
          return false;
        } else {
          target.attr('tabindex','-1'); // Adding tabindex for elements not focusable
          target.focus(); // Setting focus
        };
        return false;
      }
    }
  });

  // Test for disabled state
  $('#email-subscription-form #confirmation-chk-card01').change(function () {
    if(this.checked) {
      $(this).closest('form').find('.btn').prop('disabled', false);
    } else {
      $(this).closest('form').find('.btn').prop('disabled', true);
    }
  });

  // Feedback form example
  $('#form20 input[name=Field10]').change(evt => {
    const inputValue = $(evt.target).val();
    if (inputValue) {
      $('#form20 button').prop('disabled', false);
      $('#form20 button').prop('hidden', false);
    }
  });

  $('#form20 button.reset-button').click(evt => {
    resetAllValues();
  });

  function resetAllValues() {
    $('#form20 input[name=Field10]').prop('checked', false);
    $('#form20 button').prop('disabled', true);
    $('#form20 button#cancel').prop('hidden', true);
  }
  
  // Activate scrollspy to add active class to navAnchors items on scroll
  if($('#navAnchors').length != 0) {
    $('body').scrollspy({
      target: '#navAnchors',
      offset: $("#navAnchors").height()
    });
  }


  $('.media-gallery').each( function() {
    var $pic     = $(this),
      getItems = function() {
        var items = [];
        $pic.find('a').each(function() {
          var $href   = $(this).attr('href'),
              $size   = $(this).data('size').split('x'),
              $width  = $size[0],
              $height = $size[1];

          var item = {
              src     : $href,
              w       : $width,
              h       : $height,
              author  : $(this).data('author'),
              description   : $(this).data('description'),
          }

          items.push(item);
        });
        return items;
      }
 
    var items = getItems();
    
    var $pswp = $('.pswp')[0];
    $pic.on('click', 'li', function(event) {
      event.preventDefault();
      
      var $index = $(this).index();
      let description = '';
      let author = '';
      const options = {
        index: $index,
        showHideOpacity: true,
        fullscreenEl: false,
        zoomEl: false,
        maxSpreadZoom: 1,
        pinchToClose: false,
        shareEl: false,
        preloaderEl: false,
        getDoubleTapZoom: function(isMouseClick, item) {
          return item.initialZoomLevel;
        },
        addCaptionHTMLFn: (item, captionEl, isFake) => {
          if (!item.description && !item.author) {
            captionEl.children[0].innerHTML = '';
            return false;
          }
  
          if (item.description) {
            description = `<span class="pswp__legend d-block font-weight-bold text-white text-center">${item.description}</span>`;
          }
  
          if (item.author) {
            author = `<span class="pswp__copyright d-block text-white text-center">&copy; ${item.author}</span>`;
          }
  
          captionEl.children[0].innerHTML = description + author;
          // We need to set item.title to true based on photoswipe caption display validation...
          item.title = true;
          return true;
        }
      }
      
      // Initialize PhotoSwipe
      var lightBox = new PhotoSwipe($pswp, PhotoSwipeUI_Default, items, options);
      lightBox.init();
    });
  });

  var openPhotoSwipe = function() {

    $('.media-gallery').each( function() {
      var $pic     = $(this), getItems = function() {
        var items = [];
        $pic.find('a').each(function() {
            var $href   = $(this).attr('href'),
                $size   = $(this).data('size').split('x'),
                $width  = $size[0],
                $height = $size[1];

            var item = {
                src     : $href,
                w       : $width,
                h       : $height,
                author  : $(this).data('author'),
                description   : $(this).data('description'),
            }

            items.push(item);
        });
        return items;
      }
   
      var items = getItems();
      
      var $pswp = $('.pswp')[0];
      let description = '';
      let author = '';
      const options = {
        index: 0,
        showHideOpacity: true,
        fullscreenEl: false,
        zoomEl: false,
        maxSpreadZoom: 1,
        pinchToClose: false,
        shareEl: false,
        preloaderEl: false,
        getDoubleTapZoom: function(isMouseClick, item) {
          return item.initialZoomLevel;
        },
        addCaptionHTMLFn: (item, captionEl, isFake) => {
          if (!item.description && !item.author) {
            captionEl.children[0].innerHTML = '';
            return false;
          }
  
          if (item.description) {
            description = `<span class="pswp__legend d-block font-weight-bold text-white text-center">${item.description}</span>`;
          }
  
          if (item.author) {
            author = `<span class="pswp__copyright d-block text-white text-center">&copy; ${item.author}</span>`;
          }
  
          captionEl.children[0].innerHTML = description + author;
          // We need to set item.title to true based on photoswipe caption display validation...
          item.title = true;
          return true;
        }
      }
      // Initialize PhotoSwipe
      var lightBox = new PhotoSwipe($pswp, PhotoSwipeUI_Default, items, options);
      lightBox.init();
    });
  };

  // Trigger gallery on click
  $(".js-gallery-trigger").click(function() {
    openPhotoSwipe();
  });

  // Change text based on language
  $('.collapse-content').on('show.bs.collapse', function () {
    $(this).parent().find("button").text('Voir moins');
  });

  $('.collapse-content').on('hide.bs.collapse', function () {
    $(this).parent().find("button").text('Voir plus');
  });


})(jQuery);


// Copyright toggle
const copyrights = document.querySelectorAll('.img-copyright');

copyrights.forEach((copyright) => {
  copyright.addEventListener('click', () => {
    showHideCopyright(copyright);
  });
});

function showHideCopyright(copyright) {
  const copyrightText = copyright.querySelector('.copyright-text');
  copyrightText.classList.toggle('d-none');
}
