//ビューポートリサイズ
(function () {
  const viewport = document.querySelector('meta[name="viewport"]');
  function switchViewport() {
    const value =
      window.outerWidth > 375
        ? "width=device-width,initial-scale=1"
        : "width=375";
    if (viewport.getAttribute("content") !== value) {
      viewport.setAttribute("content", value);
    }
  }
  addEventListener("resize", switchViewport, false);
  switchViewport();
})();

// ハンバーガーメニュー
const drawerIcon = document.querySelector("#js-drawer-icon");
const drawerContent = document.querySelector("#js-drawer-content");
const hamburgerInertBoxes = document.querySelectorAll(".js-hamburger-inert"); // キーボードからの操作を停止させる要素の検出
if (drawerIcon) {
  drawerIcon.addEventListener("click", function (e) {
    e.preventDefault();
    drawerIcon.classList.toggle("is-checked");
    drawerContent.classList.toggle("is-checked");
    hamburgerInertBoxes.forEach(function (hamburgerInertBox) {
      if (hamburgerInertBox.classList.contains("is-inert")) {
        hamburgerInertBox.classList.remove("is-inert");
        hamburgerInertBox.inert = false; //操作を受け付ける様にする
      } else {
        hamburgerInertBox.classList.add("is-inert");
        hamburgerInertBox.inert = true; //操作を受け付けない様にする
      }
    });
  });
}

document
  .querySelectorAll('#js-drawer-content a[href^="#"]')
  .forEach(function (link) {
    link.addEventListener("click", function (e) {
      drawerIcon.classList.remove("is-checked");
      drawerContent.classList.remove("is-checked");
      hamburgerInertBoxes.forEach(function (hamburgerInertBox) {
      if (hamburgerInertBox.classList.contains("is-inert")) {
        hamburgerInertBox.classList.remove("is-inert");
        hamburgerInertBox.inert = false; //操作を受け付ける様にする
      } else {
        hamburgerInertBox.classList.add("is-inert");
        hamburgerInertBox.inert = true; //操作を受け付けない様にする
      }
    });
    });
  });

// トップへ戻るボタン
const pageTop = document.querySelector("#js-page-top");
var windowSize = window.innerWidth;
if (windowSize >= 768) {
  window.addEventListener("scroll", function () {
    if (100 < window.scrollY) {
      pageTop.classList.add("is-show");
    } else {
      pageTop.classList.remove("is-show");
    }
  });
}

// .pageTopをクリックしたら
pageTop.addEventListener("click", scroll_top);

// ページ上部へスムーズに移動
function scroll_top() {
  window.scroll({ top: 0, behavior: "smooth" });
}

// モーダルウィンドウ

const modalActiveBtns = document.querySelectorAll(".js-modal-active");
const modalInertBoxes = document.querySelectorAll(".js-modal-inert");

// モーダルウィンドウを開く
modalActiveBtns.forEach(function (modalActiveBtn) {
  modalActiveBtn.onclick = function () {
    var activeBtn = modalActiveBtn.getAttribute("data-modal");
    document.getElementById(activeBtn).classList.add("is-active");
    modalInertBoxes.forEach(function (modalInertBox) {
        modalInertBox.classList.add("is-inert");
        modalInertBox.inert = true; //操作を受け付けない様にする
    });
  };
});

// モーダルウィンドウを閉じる
const modalCloseBtns = document.querySelectorAll(".js-modal-close");
modalCloseBtns.forEach(function (modalCloseBtn) {
  modalCloseBtn.onclick = function () {
    var activeModal = modalCloseBtn.closest(".prizes-modal");
    // modal.style.display = "none";
    activeModal.classList.remove("is-active");
    modalInertBoxes.forEach(function (modalInertBox) {
        modalInertBox.classList.remove("is-inert");
        modalInertBox.inert = false; //操作を受け付ける様にする
    });
  };
});

//カードの外の背景をクリックしてもモーダルウィンドウが解除される
window.addEventListener('click', function (event) {
  if (
    event.target.classList.contains("prizes-modal") &&
    event.target.classList.contains("is-active")
  ) {
    event.target.classList.remove("is-active");
    modalInertBoxes.forEach(function (modalInertBox) {
        modalInertBox.classList.remove("is-inert");
        modalInertBox.inert = false; //操作を受け付ける様にする
    });
  }
});

// escapeキーが押された時にモーダルウィンドウを解除する
document.addEventListener("keydown", function (e) {
  // Escapeキーが押された場合
  if (e.key === "Escape") {
    // 現在開いているモーダルを検索
    const activeModal = document.querySelector(".prizes-modal.is-active");
    if (activeModal) {
      activeModal.classList.remove("is-active");
      // inert属性も解除
      modalInertBoxes.forEach(function (modalInertBox) {
        modalInertBox.classList.remove("is-inert");
        modalInertBox.inert = false;
      });
    }
  }
});

// about__swiper

// スライドを複製する処理
function cloneAndAppend(element, swiperWrap) {
  let clonedElement = element.cloneNode(true);
  swiperWrap.appendChild(clonedElement);
}

const swiperWrap = document.querySelector("#js-about-swiper-wrap");
const swiperSlides = swiperWrap.querySelectorAll(".about-slide");

for (let swiperSlide of swiperSlides) {
  cloneAndAppend(swiperSlide, swiperWrap);
}

const aboutSwiper = new Swiper(".about__swiper", {
  loop: true,
  slidesPerView: "auto", // 一度に表示する枚数
  spaceBetween: 10, // スライド間に10pxの余白を設定
  speed: 6000, // ループの時間
  allowTouchMove: false, // スワイプ無効
  autoplay: {
    delay: 0, // 途切れなくループ
  },
  breakpoints: {
    // 画面幅が900px以上の場合は余白を20px
    768: {
      spaceBetween: 20, // スライド間に20pxの余白を設定
    },
  },
});

//spots__swiper

const spotSwiper = new Swiper(".spots-slider", {
  // Optional parameters
  // direction: "vertical",
  loop: true,
  slidesPerView: "auto", // 一度に表示する枚数
  spaceBetween: 16, // スライド間に16pxの余白を設定
  centeredSlides: true, // アクティブなスライドを中央にする

  // Navigation arrows
  navigation: {
    nextEl: ".spots-slider__next",
    prevEl: ".spots-slider__prev",
  },

  breakpoints: {
    768: {
      spaceBetween: 32, // スライド間に32pxの余白を設定
      centeredSlides: false, // アクティブなスライドを中央にするを無効化する
      slidesPerView: "auto", // 一度に表示する枚数
    },
  },
});

// アコーディオンメニュー

document.addEventListener("DOMContentLoaded", () => {
  setUpAccordion();
});

/**
 * ブラウザの標準機能(Web Animations API)を使ってアコーディオンのアニメーションを制御します
 */
const setUpAccordion = () => {
  const details = document.querySelectorAll(".js-details");
  const RUNNING_VALUE = "running"; // アニメーション実行中のときに付与する予定のカスタムデータ属性の値
  const IS_OPENED_CLASS = "is-opened"; // アイコン操作用のクラス名

  details.forEach((element) => {
    const summary = element.querySelector(".js-summary");
    const content = element.querySelector(".js-content");

    summary.addEventListener("click", (event) => {
      // デフォルトの挙動を無効化
      event.preventDefault();

      // 連打防止用。アニメーション中だったらクリックイベントを受け付けないでリターンする
      if (element.dataset.animStatus === RUNNING_VALUE) {
        return;
      }

      // detailsのopen属性を判定
      if (element.open) {
        // アコーディオンを閉じるときの処理
        // アイコン操作用クラスを切り替える(クラスを取り除く)
        element.classList.remove(IS_OPENED_CLASS);

        // アニメーションを実行
        const closingAnim = content.animate(
          closingAnimKeyframes(content),
          animTiming
        );
        // アニメーション実行中用の値を付与
        element.dataset.animStatus = RUNNING_VALUE;

        // アニメーションの完了後に
        closingAnim.onfinish = () => {
          // open属性を取り除く
          element.removeAttribute("open");
          // アニメーション実行中用の値を取り除く
          element.dataset.animStatus = "";
        };
      } else {
        // アコーディオンを開くときの処理
        // open属性を付与
        element.setAttribute("open", "true");

        // アイコン操作用クラスを切り替える(クラスを付与)
        element.classList.add(IS_OPENED_CLASS);

        // アニメーションを実行
        const openingAnim = content.animate(
          openingAnimKeyframes(content),
          animTiming
        );
        // アニメーション実行中用の値を入れる
        element.dataset.animStatus = RUNNING_VALUE;

        // アニメーション完了後にアニメーション実行中用の値を取り除く
        openingAnim.onfinish = () => {
          element.dataset.animStatus = "";
        };
      }
    });
  });
};

/**
 * アニメーションの時間とイージング
 */
const animTiming = {
  duration: 400,
  easing: "ease-out",
};

/**
 * アコーディオンを閉じるときのキーフレーム
 */
const closingAnimKeyframes = (content) => [
  {
    height: content.offsetHeight + "px", // height: "auto"だとうまく計算されないため要素の高さを指定する
    opacity: 1,
  },
  {
    height: 0,
    opacity: 0,
  },
];

/**
 * アコーディオンを開くときのキーフレーム
 */
const openingAnimKeyframes = (content) => [
  {
    height: 0,
    opacity: 0,
  },
  {
    height: content.offsetHeight + "px",
    opacity: 1,
  },
];
