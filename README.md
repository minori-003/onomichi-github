# SnapOnomichi - 見つけて尾道レトロキャンペーン (技術アーキテクチャ) 🚀
## 1. プロジェクト概要
### 本プロジェクトは、「見つけて尾道レトロキャンペーン」のための静的ランディングページです。

最大の技術的特徴は、**SMACSS/FLOCSS**の設計思想に基づき、SCSSの最新モジュールシステム（``@use`` / ``@forward``）を駆使して構築された、**保守性・拡張性・再利用性**に極めて優れたフロントエンド・アーキテクチャです。

また、ライブラリへの依存を最小限に抑え、**Web標準のAPI**（**``inert``**, **``element.animate()``**）を積極的に活用することで、高いパフォーマンスとアクセシビリティ（a11y）を両立しています。

## 2. SCSSアーキテクチャとデザインシステム 🏗️
CSS設計は、``style.scss`` を起点とし、以下の5つのレイヤーに厳格に分離されています。

1. ``foundation``: ``_reset.scss``, ``_base.scss`` など、プロジェクトの土台となるスタイル。
2. ``component``: ``_button.scss``, ``_link.scss`` など、再利用可能な独立したUI部品。
3. ``layer``: ``_header.scss``, ``_footer.scss`` など、ページを構成する主要なレイヤー。
4. ``project``: ``_fv.scss``, ``_about.scss`` など、そのプロジェクト固有のセクション別スタイル。
5. ``javascript``: ``_modal-window.scss``, ``_js-drawer-icon.scss`` など、JavaScriptによって動的に制御されるクラスのスタイル。

### 2-1. グローバル・デザインシステム (Design Tokens)
``global/`` ディレクトリ配下で、プロジェクト全体のデザイン原則が「デザイントークン」として一元管理されています。

| ファイル名 | 役割 | 技術的特徴 |
| --- | --- | --- |
| ``_color.scss`` | カラーパレット | $color-main-Blue、$color-accent-Yellowなど、意図が明確なセマンティックな変数名でブランドカラーを統一 。|
| ``_font.scss`` | タイポグラフィ	和欧フォント|$font-size-base-sp〜$font-size-xlまでのフォントスケール、ウェイト（$font-weight-bold）を管理。|
| ``_width.scss``/ ``_height.scss`` | レイアウト定数|$pc-inner: 1024px;、$header-height: 64px;など、主要な寸法を定数化し、設計の一貫性を担保。|
| ``_breakpoints.scss`` | レスポンシブ  |  xs, sm, md, lg, xlの5段階のブレイクポイントを定義。**@mixin mq()**により、Mobile-Firstな記述を徹底。|

### 2-2. style.scss の構造 (モジュール管理)
すべてのSCSSファイルは ``global`` 以外、直接読み込まれません。``@use`` と ``@forward`` によって依存関係が明確に管理され、各ファイルは ``g.$color-main-Blue`` や ``@include g.mq(md) ``のように、**名前空間（``g.``）付きでのみ**グローバル変数・Mixinにアクセスできます。これにより、意図しないグローバル汚染を防ぎます。

```
// style.scss
@use "foundation"; // _base.scss, _reset.scss が読み込まれる
@use "component";  // _button.scss, _link.scss などが読み込まれる
@use "layer";      // _header.scss, _footer.scss などが読み込まれる
@use "project";    // _fv.scss, _about.scss などが読み込まれる
@use "javascript"; // _modal-window.scss などが読み込まれる
```

## 3. インタラクションとアクセシビリティ (JavaScript) 💻
``script.js`` では、Web標準のAPIを積極的に活用し、高度なUXとアクセシビリティを両立しています。

+ 【a11y】``inert``**属性によるフォーカス制御**:
	+ ハンバーガーメニュー展開時、背景となるメインコンテンツ（``header``, ``main``, ``footer``）に ``element.inert = true`` を動的に付与。
	+ これにより、メニューが開いている間、**スクリーンリーダーやキーボードのTab移動が背景コンテンツに迷い込むのを防ぎ**、アクセシビリティを劇的に向上させています。

+ 【Animation】Web Animations API (WAAPI):
	+FAQのアコーディオン（``detailsタグ``）開閉時、CSSの``height: auto``では不可能なスムーズなアニメーションを、``element.animate() ``を使って自前で実装。
	+``duration: 400``, ``easing: "ease-out"`` の共通設定を用い、パフォーマンスの高いリッチな開閉アニメーションを実現しています。

+ 【UX】動的ビューポート制御:
	+ ``window.outerWidth``を監視し、375px以下のデバイス幅で``viewport``の``contentをwidth=375``に固定。それ以外では``width=device-width``に切り替えています。
	+これにより、一部のスマートフォンで発生するレイアウト崩れを未然に防ぎます。

+ 【UX】フォームバリデーション:
	+ お問い合わせフォームでは、``_contact.scss`` にてCSSの ``:user-invalid`` 擬似クラスを活用。
	+ **ユーザーが入力操作を完了した後で**初めてエラー（赤枠など）が表示されるため、入力中にエラーが表示されるストレスを与えません。

+ ライブラリの活用:
	+ ``Aboutセクション``と``Spotsセクション``のスライダーには、**Swiper.js** を採用し、レスポンシブ対応のタッチスライダーを実装しています。

## 4. セクション別 実装ハイライト (Project Layer) 🎨
``project/`` ディレクトリには、各セクション固有の高度なCSSテクニックが実装されています。

| ファイル / セクション | 実装の技術的ハイライト |
| --- | --- |
| ``_fv.scss`` (ファーストビュー)	 | 複数の画像要素を``position: absolute``で重ね、z-indexを駆使したリッチなビジュアルコラージュを構築。 |
| ``_about.scss`` (About)	 | 背景装飾（波線、猫の足跡）を``z-index: -2``でコンテンツカードの背後に配置し、奥行きのあるアートボードのようなデザインを実現。 |
| ``_entry.scss`` (参加方法)	 | デスクトップ表示では ``grid-template-columns: repeat(3, 1fr);`` を使用し、参加ステップをモダンな3列グリッドレイアウトで構成。 |
| ``_spots.scss`` (Spots)	 | セクションの上下境界線に、``::before`` / ``::after`` 擬似要素を用いてSVG背景画像を配置。波型のカスタムセパレーターを実装。 |
| ``_prizes.scss`` (賞品) | 	賞品カードの右下隅に``::after``（虫眼鏡アイコン）を配置。ホバーヒントとして機能し、クリックでモーダルが開くことを視覚的に示唆。 |
| ``_faq.scss (FAQ)`` | HTML標準の**details要素**をスタイリング。[open]属性と``.is-opened``クラスを連携させ、JSの``element.animate()``と連動するカスタムアコーディオンを実装。 |
| ``_contact.scss (Contact)`` | ``:user-invalid``によるUXの高いフォーム検証に加え、``clip: rect(0, 0, 0, 0)``を使ったアクセシブルなカスタムチェックボックスを実装。 |
| ``_information.scss (規約)	`` | 規約テーブルを``flex-direction: column（SP）``から``flex-direction: row（PC）``に切り替え、レスポンシブなテーブルレイアウトを実現。 |

## 5. SCSSファイル構成（sass/）
<pre>
sass/
├── component/           # 再利用可能なUI部品
│   ├── _button.scss
│   ├── _hidden.scss
│   ├── _hover.scss
│   ├── _index.scss
│   ├── _link.scss
│   ├── _section-head.scss
│   └── _visible.scss
│
├── foundation/          # プロジェクトの土台
│   ├── _base.scss
│   ├── _index.scss
│   └── _reset.scss
│
├── global/              # ★デザインシステム (変数, Mixin)
│   ├── _index.scss      # (@forwardで全ファイルを中継)
│   ├── mixin/
│   │   ├── _breakpoints.scss
│   │   └── _index.scss
│   └── setting/
│       ├── _color.scss
│       ├── _font.scss
│       ├── _height.scss
│       ├── _index.scss
│       └── _width.scss
│
├── javascript/          # JS制御クラス専用のスタイル
│   ├── _index.scss
│   ├── _js-drawer-icon.scss
│   ├── _modal-window.scss
│   └── _spots-slider.scss
│
├── layer/               # ページ主要構成要素 (Header/Footer)
│   ├── _body.scss
│   ├── _footer.scss
│   ├── _header.scss
│   └── _index.scss
│
├── project/             # ページ固有のセクション
│   ├── _about.scss
│   ├── _contact.scss
│   ├── _entry.scss
│   ├── _faq.scss
│   ├── _fv.scss
│   ├── _index.scss
│   ├── _information.scss
│   ├── _prizes.scss
│   └── _spots.scss
│
└── style.scss           # ★コンパイルの起点 (@useで全レイヤーを結合)
</pre>

## 6. 実行方法
SCSSファイルをコンパイラ（Dart Sass, Node-Sassなど）に入力し、style.cssを出力します。

index.htmlに、出力されたCSSファイルと、必要なJSライブラリ（swiper-bundle.min.js）および自作JSファイル（script.js）を読み込みます。

Webブラウザで index.html を開いてください。
