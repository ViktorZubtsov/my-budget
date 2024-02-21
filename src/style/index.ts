import {createGlobalStyle} from 'styled-components';

export const MainStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    font-family: 'SB Sans Text', Helvetica, Arial, sans-serif;
    margin: 0;
    padding: 0;
    scrollbar-color: #458245 #714826; /* «цвет ползунка» «цвет полосы скроллбара» */
    scrollbar-width: thin;
  }

  .loaderWrap {
    align-items: center;
    backdrop-filter: blur(6px);
    background-color: rgb(0 0 0 / 34%);
    display: flex;
    height: 100%;
    justify-content: center;
    left: 0;
    position: absolute;
    width: 100%;
    z-index: 1000;
  }

  html {
    height: auto;
  }

  html,
  body {
    margin: 0;
    padding-right: 0 !important;
    width: 100%;
  }

  body {
    height: max-content;
    margin: 0 auto !important;
    max-width: 1024px;
    min-height: 100vh;
  }

  .loader {
    animation: spin 0.5s linear infinite;
    border: 2px solid #f3f3f3;
    border-radius: 50%;
    border-top: 2px solid #24b23e;
    height: 62px;
    width: 62px;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }

    100% {
      transform: rotate(360deg);
    }
  }

  ::-webkit-scrollbar {
    background-color: rgb(54 54 54 / 30%);
    height: 4px;
    width: 4px;
  }

  input:-webkit-autofill,
  input:-webkit-autofill:hover,
  input:-webkit-autofill:focus {
    background-color: rgb(255 255 255 / 12%);
    box-shadow: inset 0 0 0 50px rgb(255 255 255 / 6%) !important; /* Цвет фона */
    -webkit-text-fill-color: rgb(255 255 255 / 96%);
    transition: background-color 50000s ease-in-out 0s;
  }

  ::-webkit-scrollbar-thumb {
    background-color: rgb(36 178 62 / 50%);
    border-radius: 9em;
  }

  @font-face {
    font-family: 'SB Sans Text';
    font-style: normal;
    font-weight: 300;
    src:
            url('https://cdn-app.sberdevices.ru/shared-static/0.0.0/fonts/SBSansText/SBSansText-Light.woff2') format('woff2'),
            url('https://cdn-app.sberdevices.ru/shared-static/0.0.0/fonts/SBSansText/SBSansText-Light.woff') format('woff');
  }

  @font-face {
    font-family: 'SB Sans Text';
    font-style: italic;
    font-weight: normal;
    src:
            url('https://cdn-app.sberdevices.ru/shared-static/0.0.0/fonts/SBSansText/SBSansText-Italic.woff2') format('woff2'),
            url('https://cdn-app.sberdevices.ru/shared-static/0.0.0/fonts/SBSansText/SBSansText-Italic.woff') format('woff');
  }

  @font-face {
    font-family: 'SB Sans Text';
    font-style: italic;
    font-weight: 600;
    src:
            url('https://cdn-app.sberdevices.ru/shared-static/0.0.0/fonts/SBSansText/SBSansText-SemiboldItalic.woff2') format('woff2'),
            url('https://cdn-app.sberdevices.ru/shared-static/0.0.0/fonts/SBSansText/SBSansText-SemiboldItalic.woff') format('woff');
  }

  @font-face {
    font-family: 'SB Sans Text';
    font-style: normal;
    font-weight: 100;
    src: url('https://cdn-app.sberdevices.ru/shared-static/0.0.0/fonts/SBSansText/SBSansText-Thin.woff2') format('woff2'), url('https://cdn-app.sberdevices.ru/shared-static/0.0.0/fonts/SBSansText/SBSansText-Thin.woff') format('woff');
  }

  @font-face {
    font-family: 'SB Sans Text';
    font-style: normal;
    font-weight: normal;
    src:
            url('https://cdn-app.sberdevices.ru/shared-static/0.0.0/fonts/SBSansText/SBSansText-Regular.woff2') format('woff2'),
            url('https://cdn-app.sberdevices.ru/shared-static/0.0.0/fonts/SBSansText/SBSansText-Regular.woff') format('woff');
  }

  @font-face {
    font-family: 'SB Sans Text';
    font-style: normal;
    font-weight: 600;
    src:
            url('https://cdn-app.sberdevices.ru/shared-static/0.0.0/fonts/SBSansText/SBSansText-Semibold.woff2') format('woff2'),
            url('https://cdn-app.sberdevices.ru/shared-static/0.0.0/fonts/SBSansText/SBSansText-Semibold.woff') format('woff');
  }

  @font-face {
    font-family: 'SB Sans Text';
    font-style: italic;
    font-weight: 300;
    src:
            url('https://cdn-app.sberdevices.ru/shared-static/0.0.0/fonts/SBSansText/SBSansText-LightItalic.woff2') format('woff2'),
            url('https://cdn-app.sberdevices.ru/shared-static/0.0.0/fonts/SBSansText/SBSansText-LightItalic.woff') format('woff');
  }

  @font-face {
    font-family: 'SB Sans Text';
    font-style: normal;
    font-weight: 900;
    src:
            url('https://cdn-app.sberdevices.ru/shared-static/0.0.0/fonts/SBSansText/SBSansText-Heavy.woff2') format('woff2'),
            url('https://cdn-app.sberdevices.ru/shared-static/0.0.0/fonts/SBSansText/SBSansText-Heavy.woff') format('woff');
  }

  @font-face {
    font-family: 'SB Sans Text';
    font-style: normal;
    font-weight: bold;
    src:
            url('https://cdn-app.sberdevices.ru/shared-static/0.0.0/fonts/SBSansText/SBSansText-Bold.woff2') format('woff2'),
            url('https://cdn-app.sberdevices.ru/shared-static/0.0.0/fonts/SBSansText/SBSansText-Bold.woff') format('woff');
  }

  @font-face {
    font-family: 'SB Sans Text';
    font-style: italic;
    font-weight: bold;
    src:
            url('https://cdn-app.sberdevices.ru/shared-static/0.0.0/fonts/SBSansText/SBSansText-BoldItalic.woff2') format('woff2'),
            url('https://cdn-app.sberdevices.ru/shared-static/0.0.0/fonts/SBSansText/SBSansText-BoldItalic.woff') format('woff');
  }

  @font-face {
    font-family: 'SB Sans Text';
    font-style: normal;
    font-weight: 500;
    src:
            url('https://cdn-app.sberdevices.ru/shared-static/0.0.0/fonts/SBSansText/SBSansText-Medium.woff2') format('woff2'),
            url('https://cdn-app.sberdevices.ru/shared-static/0.0.0/fonts/SBSansText/SBSansText-Medium.woff') format('woff');
  }

  @font-face {
    font-family: 'SB Sans Display';
    font-style: normal;
    font-weight: 300;
    src:
            url('https://cdn-app.sberdevices.ru/shared-static/0.0.0/fonts/SBSansDisplay/SBSansDisplay-Light.woff2') format('woff2'),
            url('https://cdn-app.sberdevices.ru/shared-static/0.0.0/fonts/SBSansDisplay/SBSansDisplay-Light.woff') format('woff');
  }

  @font-face {
    font-family: 'SB Sans Display';
    font-style: normal;
    font-weight: 100;
    src:
            url('https://cdn-app.sberdevices.ru/shared-static/0.0.0/fonts/SBSansDisplay/SBSansDisplay-Thin.woff2') format('woff2'),
            url('https://cdn-app.sberdevices.ru/shared-static/0.0.0/fonts/SBSansDisplay/SBSansDisplay-Thin.woff') format('woff');
  }

  @font-face {
    font-family: 'SB Sans Display';
    font-style: normal;
    font-weight: bold;
    src:
            url('https://cdn-app.sberdevices.ru/shared-static/0.0.0/fonts/SBSansDisplay/SBSansDisplay-Bold.woff2') format('woff2'),
            url('https://cdn-app.sberdevices.ru/shared-static/0.0.0/fonts/SBSansDisplay/SBSansDisplay-Bold.woff') format('woff');
  }

  @font-face {
    font-family: 'SB Sans Display';
    font-style: normal;
    font-weight: normal;
    src:
            url('https://cdn-app.sberdevices.ru/shared-static/0.0.0/fonts/SBSansDisplay/SBSansDisplay-Regular.woff2') format('woff2'),
            url('https://cdn-app.sberdevices.ru/shared-static/0.0.0/fonts/SBSansDisplay/SBSansDisplay-Regular.woff') format('woff');
  }

  @font-face {
    font-family: 'SB Sans Display';
    font-style: normal;
    font-weight: 600;
    src:
            url('https://cdn-app.sberdevices.ru/shared-static/0.0.0/fonts/SBSansDisplay/SBSansDisplay-Semibold.woff2') format('woff2'),
            url('https://cdn-app.sberdevices.ru/shared-static/0.0.0/fonts/SBSansDisplay/SBSansDisplay-Semibold.woff') format('woff');
  }

  @font-face {
    font-family: 'SB Sans Display';
    font-style: normal;
    font-weight: 500;
    src:
            url('https://cdn-app.sberdevices.ru/shared-static/0.0.0/fonts/SBSansDisplay/SBSansDisplay-Medium.woff2') format('woff2'),
            url('https://cdn-app.sberdevices.ru/shared-static/0.0.0/fonts/SBSansDisplay/SBSansDisplay-Medium.woff') format('woff');
  }

`;
