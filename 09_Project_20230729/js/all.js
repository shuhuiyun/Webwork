$(document).ready(function () {
  $(".hamburger").click(function (event) {
    event.preventDefault();
    $(".hamburger").toggleClass("active");
    $(".nav").toggleClass("m-open");
  });

  $(".heart__button").on("click", function (event) {
    event.preventDefault();
    $(this).find(".fa-heart").toggleClass("fa-regular").toggleClass("fa-solid");
  });
});
