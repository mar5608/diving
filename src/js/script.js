jQuery(function ($) {
  // この中であればWordpressでも「$」が使用可能になる
});

/************************
 * Splide
 ************************/

//Splideの初期化
const fvSplide = new Splide(".js-fv-splide").mount();

let splideOption = {
  //   loop: true,
  //   effect: "fade",
  //   autoplay: {
  //     delay: 4000,
  //     disableOnInteraction: false,
  //   },
  //   speed: 2000,
  //   pagination: {
  //     el: ".swiper-pagination",
  //     clickable: true,
  //   },
  type: "loop", // ループを有効にする
  autoplay: true, // 自動再生を有効にする
  interval: 4000, // 自動再生の間隔（ミリ秒）
  //   speed: 3000, // スライド切り替えの速度（ミリ秒）
  pagination: false, // ページネーションを無効にする
};
new Splide(".js-fv-splide", splideOption).mount();

const campaignSplide = new Splide(".js-campaign-splide").mount();

/************************
 * drawer
 ************************/
jQuery("#js-drawer-icon").on("click", function (e) {
  e.preventDefault();
  jQuery("#js-drawer-icon").toggleClass("is-checked");
  jQuery("#js-drawer-content").toggleClass("is-checked");
});

/** スムーススクロール*/
/** drawer 制御 */
jQuery('#js-drawer-content a[href^="#"]').on("click", function (e) {
  e.preventDefault();
  jQuery("#js-drawer-icon").removeClass("is-checked");
  jQuery("#js-drawer-content").removeClass("is-checked");
});

jQuery('a[href^="#"]').on("click", function (e) {
  const speed = 300;
  const id = jQuery(this).attr("href");
  const target = jQuery("#" == id ? "html" : id);
  const position = jQuery(target).offset().top;
  jQuery("html,body").animate(
    {
      scrollTop: position,
    },
    speed,
    "swing" // swing or liner
  );
  // jQuery("html,body").animate(
  //   {
  //     scrollTop: 0,
  //   },
  //   1000,
  //   "swing" // swing or liner
  // );
});
