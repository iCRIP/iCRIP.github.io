'use strict';

window.onload = () => {
  console.log($('.js-tilt'))
  $('.js-tilt').tilt({
    maxTilt: 3,
  })
  const navItems = $('.carousel_nav_item'); 
  const carouselItems = $('.carousel_inner').find('.carousel_item');
  navItems.each((index, el) => {
    $(el).click(() => {
      carouselItems.eq(index).addClass('active').siblings().removeClass('active')
      $(el).addClass('carousel_nav_item--active').siblings().removeClass('carousel_nav_item--active')
    })
  })
};