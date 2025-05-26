// jQuery(function ($) {
//   // この中であればWordpressでも「$」が使用可能になる
// });

/************************
 * drawer
 ************************/
// drawerのアイコンをクリックしたときの処理
jQuery("#js-drawer-icon").on("click", function (e) {
  e.preventDefault();
  console.log("drawerのアイコンをクリックしたときの処理");
  jQuery("#js-drawer-icon").toggleClass("is-checked");
  jQuery("#js-drawer-content").toggleClass("is-checked");
});

// ドロワーの中のリンクをクリックしたときの処理
jQuery('#js-drawer-content a[href^="#"]').on("click", function (e) {
  e.preventDefault();
  console.log("is-checkedを外す処理");
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
 * fv Splide(スライダー)
 ************************/

//Splideの初期化
// document.addEventListener("DOMContentLoaded", function () {
//   const splideElement = document.querySelector("#js-fv-splide");
//   if (splideElement) {
//     console.log("Splide element found:", splideElement);
//     new Splide(splideElement).mount();
//   } else {
//     console.warn("Splide element not found. Skipping initialization.");
//   }
// });

let splideOptionFv = {
  type: "loop", // ループを有効にする
  perPage: 1, // 1枚ずつ表示
  autoplay: true, // 自動再生を有効にする
  interval: 6000, // 自動再生の間隔（ミリ秒）
  speed: 600, // スライド切り替えの速度（ミリ秒）
  pagination: false, // ページネーション（ドット）を非表示
  arrows: false, // 左右の矢印ボタンも不要であればfalseに
};
new Splide("#js-fv-splide", splideOptionFv).mount();

/************************
 * campaign Splide(スライダー)
 ************************/

let splideOptionCampaign = {
  type: "loop", // ループを有効にする
  gap: 40, // スライド間の隙間（ピクセル）
  fixedWidth: 334, // 固定幅を設定（334px）
  fixedHeight: 445, // 高さ
  autoplay: false, // 自動再生を有効にする
  interval: 4000, // 自動再生の間隔（ミリ秒）
  speed: 400, // スライド切り替えの速度（ミリ秒）
  arrows: true, // 左右の矢印ボタンも不要であればfalseに
  pagination: false, // ページネーションを無効にする
  pauseOnHover: false,
  perPage: 3.5, // 1ページに3枚表示
  perMove: 1, // 1ページごとに1枚ずつ移動
  breakpoints: {
    768: {
      perPage: 1.22, // 768px未満の表示枚数
      gap: 20, // スライド間の隙間（ピクセル）
      fixedWidth: 280, // 固定幅を設定（280px）
      fixedHeight: 336, // 高さ
      arrows: false, // 左右の矢印ボタンも不要であればfalseに
    },
  },
};
new Splide("#js-campaign-splide", splideOptionCampaign).mount();

// document.addEventListener("DOMContentLoaded", function () {
//   var splide = new Splide("#js-campaign-splide", {
//     type: "loop", // ループを有効にする
//     gap: 20, // スライド間の隙間（ピクセル）
//     perPage: 1.22, // 1ページに3枚表示
//     autoplay: true, // 自動再生を有効にする
//     interval: 6000, // 自動再生の間隔（ミリ秒）
//     speed: 600, // スライド切り替えの速度（ミリ秒）
//     arrows: false, // 左右の矢印ボタンも不要であればfalseに
//     pagination: false, // ページネーションを無効にする
//     pauseOnHover: false,
//   });
//   splide.mount();
// });

/************************
 * 画像の出現アニメーション
 ************************/
//要素の取得とスピードの設定
var box = $(".colorbox"),
  speed = 700; // アニメーションにかかる時間（700ミリ秒＝0.7秒）

$(document).ready(function () {
  var box = $(".colorbox");
  console.log(box.length); // .colorbox要素の数を確認
  box.each(function (index) {
    console.log("No." + index + " の .colorbox:", this); // 各要素をログ出力
  });
});

//colorboxの付いた全ての要素に対して下記の処理を行う
box.each(function () {
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
