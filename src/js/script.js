// jQuery(function ($) {
//   // この中であればWordpressでも「$」が使用可能になる
// });

/************************
 * loading
 ************************/

//HTML ドキュメントが完全に読み込まれた後に JavaScript を実行する
document.addEventListener("DOMContentLoaded", () => {
  //要素の取得
  const loading = document.querySelector(".loading");
  const contentsElement = document.querySelector(".main .hidden");
  // セッションストレージからフラグを取得
  const isFirstLoad = !sessionStorage.getItem("isFirstLoad");

  if (isFirstLoad) {
    console.log("初回アクセスです");
    // ローディング画面を表示
    loading.style.display = "block";
    setTimeout(() => {
      loading.classList.add("active");
      // クラスをここで追加
      // document
      //   .querySelector(".loading__image-part--left")
      //   .classList.add("image-part--left");
      document
        .querySelector(".loading__image-part--left")
        .classList.add("animation-top-left");
      // document
      //   .querySelector(".loading__image-part--right")
      //   .classList.add("image-part--right");
      document
        .querySelector(".loading__image-part--right")
        .classList.add("animation-top-right");
    }, 100); //10->100に変更

    // 3秒後にローディング画面の `active` クラスを削除（フェードアウト開始）
    setTimeout(() => {
      loading.classList.remove("active");

      // さらに 0.5秒後にローディング画面を完全に非表示
      requestAnimationFrame(() => {
        // setTimeout(() => {
        loading.style.display = "none";
        // `.wrapper.hidden` の `hidden` クラスを削除し、コンテンツを表示
        if (contentsElement) {
          contentsElement.classList.remove("hidden");
        }
      }, 500);
    }, 3000);

    // sessionStorage に初回訪問の記録を保存
    sessionStorage.setItem("isFirstLoad", "true");
  } else {
    console.log("2回目以降のアクセスです");

    // すぐに `.wrapper.hidden` を表示
    if (contentsElement) {
      contentsElement.classList.remove("hidden");
    }
    // ローディング画面を即座に非表示
    // loading.style.display = "none"; // すぐに非表示
    if (loading) {
      loading.style.display = "none"; // loading 要素が存在する場合のみ非表示にする
    } else {
      console.log(".loading 要素が見つかりません");
    }
  }
});

//ページが読み込まれたらすぐに動かしたい場合の記述;
$(window).on("load", function () {
  // $(".loading").delay(1200).fadeOut("slow"); //ロゴを1.2秒でフェードアウトする記述
  $(".loading__head").delay(1200).fadeOut("slow"); //ロゴを1.2秒でフェードアウトする記述

  //=====ここからローディングエリア（splashエリア）を1.5秒でフェードアウトした後に動かしたいJSをまとめる
  $(".loading")
    // .delay(1500)
    .delay(1500)
    .fadeOut("slow", function () {
      $("body").addClass("appear"); //フェードアウト後bodyにappearクラス付与

      // var h = $(window).height(); //ブラウザの高さを取得
      // $(".loadingbg").css({
      //   "border-width": h, //ボーダーの太さにブラウザの高さを代入
      //   "animation-name": "backBoxAnime", //animation-nameを定義
      // });
    });
  //=====ここまでローディングエリア（loadingエリア）を1.5秒でフェードアウトした後に動かしたいJSをまとめる
});

/* ****************************************
topに戻る
**************************************** */
jQuery(window).on("scroll", function () {
  if (100 < jQuery(window).scrollTop()) {
    jQuery("#js-pagetop").addClass("is-show");
  } else {
    jQuery("#js-pagetop").removeClass("is-show");
  }
});

// #page-topをクリックした際の設定
$("#js-pagetop").click(function () {
  $("body,html").animate(
    {
      scrollTop: 0, //ページトップまでスクロール
    },
    500
  ); //ページトップスクロールの速さ。数字が大きいほど遅くなる
  return false; //リンク自体の無効化
});

/************************
 * drawer
 ************************/
// グローバルで scrollPosition を宣言
let scrollPosition = 0;
// drawerのアイコンをクリックしたときの処理
jQuery("#js-drawer-icon").on("click", function (e) {
  e.preventDefault();
  console.log("drawerのアイコンをクリックしたときの処理");

  // ウィンドウの高さを取得
  const windowHeight = window.innerHeight;
  const minHeight = 600; // ここで条件の高さを設定

  const drawerIcon = jQuery("#js-drawer-icon");
  const drawerContent = jQuery("#js-drawer-content");

  jQuery("#js-drawer-icon").toggleClass("is-checked");
  jQuery("#js-drawer-content").toggleClass("is-checked");

  // Drawer の開閉状態を判定
  const isOpen = drawerContent.hasClass("is-checked");

  // スクロールバー切り替え
  if (windowHeight >= minHeight) {
    // 高さが minHeight 以上 → スクロールバーを非表示にする
    drawerContent.css("overflow-y", "hidden");
    drawerContent.find(".drawer-content__body").css("overflow-y", "hidden");
    console.log("スクロールバーを非表示 & 内側もスクロール禁止");
    // drawerContent.css("overflow-y", "hidden");
    // console.log("スクロールバーを非表示");
  } else {
    // 高さが minHeight 未満 → スクロールバーを表示する
    drawerContent.css("overflow-y", "auto");
    drawerContent.find(".drawer-content__body").css("overflow-y", "auto");
    console.log("スクロールバーを表示 & 内側もスクロール可");
    // drawerContent.css("overflow-y", "auto");
    // console.log("スクロールバーを表示");
  }

  // === スクロールロック処理 ===
  if (isOpen) {
    console.log("Drawer を開いたので body を固定");

    scrollPosition = window.pageYOffset; // 現在位置を保存

    jQuery("body").css({
      position: "fixed",
      top: `-${scrollPosition}px`,
      width: "100%",
      overflow: "hidden",
    });
  } else {
    console.log("Drawer を閉じたので body を解除");

    jQuery("body").css({
      position: "",
      top: "",
      width: "",
      overflow: "",
    });

    // 保存しておいた位置に戻す
    window.scrollTo(0, scrollPosition);
  }
  // 背景スクロールを制御する
  // if (drawerContent.hasClass("is-checked")) {
  //   // Drawer が開いたら body に overflow: hidden
  //   jQuery("body").css("overflow", "hidden");
  //   console.log("bodyのoverflowをhiddenに設定");
  // } else {
  //   // Drawer が閉じたら body の overflow を戻す
  //   jQuery("body").css("overflow", "");
  //   console.log("bodyのoverflowを戻す");
  // }
});

// ドロワーの中のリンクをクリックしたときの処理
jQuery('#js-drawer-content a[href^="#"]').on("click", function (e) {
  e.preventDefault();
  console.log("is-checkedを外す処理");
  jQuery("#js-drawer-icon").removeClass("is-checked");
  jQuery("#js-drawer-content").removeClass("is-checked");

  // === body 固定解除 ===
  jQuery("body").css({
    position: "",
    top: "",
    width: "",
    overflow: "",
  });
  console.log("Drawerのリンクをクリックしたので body を解除");
  // window.scrollTo(0, scrollPosition);

  // ==== アンカーリンクで移動する ====
  const speed = 300;
  const id = jQuery(this).attr("href");
  const target = jQuery("#" == id ? "html" : id);
  console.log("target:", target);
  if (!target.length) {
    console.warn("ターゲットが見つかりません！");
    return;
  }
  const position = target.offset().top;
  console.log("position:", position);

  jQuery("html,body").animate(
    {
      scrollTop: position,
    },
    speed,
    "swing" // swing or liner
  );
  console.log("アンカーリンクで移動する body を解除1");
});

// 共通のページ内リンク（ドロワー内リンクを除外）
jQuery('a[href^="#"]')
  .not('#js-drawer-content a[href^="#"]')
  .on("click", function (e) {
    const speed = 300;
    const id = jQuery(this).attr("href");
    const target = jQuery("#" == id ? "html" : id);
    const position = target.offset().top;
    console.log("アンカーリンクで移動する body を解除2");
    jQuery("html,body").animate(
      {
        scrollTop: position,
      },
      speed,
      "swing" // swing or liner
    );
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
  fixedWidth: 333, // 固定幅を設定（333px）
  // fixedHeight: 445, // 高さ
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
      // fixedHeight: auto, // 高さ
      arrows: false, // 左右の矢印ボタンも不要であればfalseに
    },
  },
};
new Splide("#js-campaign-splide", splideOptionCampaign).mount();

// ココに高さを揃える処理を入れる！
// Splideを初期化
const splideCampaign = new Splide("#js-campaign-splide", splideOptionCampaign);
splideCampaign.mount();

// Splideのmountedイベントで内部構造生成を待つ
splideCampaign.on("mounted", function () {
  console.log("Splide mounted OK");

  // 全画像の読み込みが終わってから高さ揃え
  const images = document.querySelectorAll("#js-campaign-splide img");
  let loadedCount = 0;

  images.forEach((img) => {
    if (img.complete) {
      loadedCount++;
    } else {
      img.addEventListener("load", () => {
        loadedCount++;
        if (loadedCount === images.length) {
          setEqualHeight();
        }
      });
    }
  });

  if (loadedCount === images.length) {
    // すでに全部読み込み済み
    setEqualHeight();
  }

  function setEqualHeight() {
    console.log("画像ロード完了 → 高さ揃え開始");
    const slides = document.querySelectorAll(".campaign__slide");
    let maxHeight = 0;

    slides.forEach((slide) => {
      const content = slide.querySelector(".slide__content");
      const img = slide.querySelector(".slide__img-wrapper");

      // `img-wrapper` の高さを正確に取るために中の <img> の高さを取得
      const imgHeight = img.querySelector("img").offsetHeight;

      const totalHeight = imgHeight + content.offsetHeight;
      if (totalHeight > maxHeight) {
        maxHeight = totalHeight;
      }
    });

    slides.forEach((slide) => {
      slide.style.height = `${maxHeight}px`;
    });

    console.log("最大高さ:", maxHeight);
  }
});

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
