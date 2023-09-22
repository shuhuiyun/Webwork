//選單
$(document).ready(function () {
  $(".scrollTop").click(function (e) {
    var target = $(this).attr("href");
    // console.log(target);
  });
  $(window).scroll(function () {
    var scrollPos = $(window).scrollTop();
    // console.log(scrollPos);
  });

  $(window).scroll(function () {
    var scrollPos = $(window).scrollTop(); //滾動的值
    //console.log(scrollPos);

    $(".scrollTop").each(function () {
      var target = $(this).attr("href");
      var targetPos = $(target).offset().top;
      var targetHeight = $(target).outerHeight(true);
      console.log(target, targetPos, targetHeight);
      if (
        targetPos - 101 <= scrollPos &&
        targetPos - 101 + targetHeight > scrollPos
      ) {
        $(".scrollTop").removeClass("active");
        $(this).addClass("active");
      } else {
        $(this).removeClass("active");
      }
    });
  });
});
