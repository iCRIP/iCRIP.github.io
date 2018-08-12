'use strict';

window.onload = function () {
  console.log($('.js-tilt'));
  $('.js-tilt').tilt({
    maxTilt: 3
  });
  var navItems = $('.carousel_nav_item');
  var carouselItems = $('.carousel_inner').find('.carousel_item');
  navItems.each(function (index, el) {
    $(el).click(function () {
      carouselItems.eq(index).addClass('active').siblings().removeClass('active');
      $(el).addClass('carousel_nav_item--active').siblings().removeClass('carousel_nav_item--active');
    });
  });
};
//# sourceMappingURL=main.js.map
