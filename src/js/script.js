jQuery(function ($) {
  // この中であればWordpressでも「$」が使用可能になる
});

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
