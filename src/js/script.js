jQuery(function ($) {
  // この中であればWordpressでも「$」が使用可能になる
});

/************************
 * topに戻る
 ************************/
jQuery(window).on("scroll", function () {
  if (100 < jQuery(window).scrollTop()) {
    jQuery("#js-pagetop").addClass("is-show");
  } else {
    jQuery("#js-pagetop").removeClass("is-show");
  }
});

/************************
 * Splide
 ************************/

//Splideの初期化
// const fvSplide = new Splide(".js-fv-splide").mount();
// Splideの初期化
document.addEventListener("DOMContentLoaded", function () {
  const splideElement = document.querySelector(".js-fv-splide");
  if (splideElement) {
    console.log("Splide element found:", splideElement);
    new Splide(splideElement).mount();
  } else {
    console.warn("Splide element not found. Skipping initialization.");
  }
});

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

// const campaignSplide = new Splide(".js-campaign-splide").mount();

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

/************************
 * 画像の出現アニメーション
 ************************/
//要素の取得とスピードの設定
var box = $(".colorbox"), // .colorboxというクラスを持った要素を全部集めて、「box」として覚えておく
  speed = 700; // アニメーションにかかる時間（700ミリ秒＝0.7秒）

$(document).ready(function () {
  var box = $(".colorbox");
  console.log(box.length); // .colorbox要素の数を確認
  box.each(function (index) {
    console.log("No." + index + " の .colorbox:", this); // 各要素をログ出力
  });
});

//.colorboxの付いた全ての要素に対して下記の処理を行う
box.each(function () {
  //   console.log("each文の中");
  //   alert.log("each文の中");
  // 画像の枠（this）に、色のついた四角（.color）を追加するよ
  $(this).append('<div class="color"></div>');
  var color = $(this).find(".color"),
    image = $(this).find("img");
  var counter = 0; // 何回動いたか数えるカウンター（0ならまだ動いてない）

  image.css("opacity", "0");
  color.css("width", "0%");
  //inviewを使って背景色が画面に現れたら処理をする
  color.on("inview", function () {
    if (counter == 0) {
      $(this)
        .delay(200) // 少し（0.2秒）待ってから
        .animate({ width: "100%" }, speed, function () {
          image.css("opacity", "1");
          $(this).css({ left: "0", right: "auto" });
          $(this).animate({ width: "0%" }, speed); // 右側から色が引っ込んでいく
        });
      counter = 1;
      console.log("発火");
    }
  });
});
