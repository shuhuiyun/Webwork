$(document).ready(function () {
  $(".menu li").hover(function (event) {
    event.preventDefault();
    $(this).find("ul").fadeToggle(300);
  });

  const swiper = new Swiper(".swiper", {
    // Optional parameters
    direction: "horizontal",
    loop: true,
    effect: "fade",
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
    },
    // If we need pagination
    pagination: {
      el: ".swiper-pagination",
    },

    // Navigation arrows
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });
  //Check to see if the window is top if not then display button
  $(window).scroll(function () {
    // Show button after 100px
    var showAfter = 100;
    if ($(this).scrollTop() > showAfter) {
      $(".back-to-top").fadeIn();
    } else {
      $(".back-to-top").fadeOut();
    }
  });

  // Click event to scroll to top
  $(".back-to-top").click(function () {
    $("html, body").animate({ scrollTop: 0 }, 800);
    return false;
  });
});
