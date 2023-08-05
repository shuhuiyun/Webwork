$(document).ready(function () {
  $(".hamburger").click(function (event) {
    event.preventDefault();
    $(".hamburger").toggleClass("active");
    $(".menu").toggleClass("m-open");
  });
});
