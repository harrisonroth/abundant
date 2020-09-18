import { createGlobalStyle } from 'styled-components';
import { color, font } from '../Shared/Utils/styles';

export default createGlobalStyle`
  html, body, #trello-clone__root {
    background-color: ${color.white};
    ${font.regular}
  }

  .content {
    display: flex;
    position: relative;
  }

  header {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    background-color: #555;
    color: #0c96f9;
    text-align: center;
    display: none;
    height: 80px;
    box-shadow: 0px 5px 5px #aaa;
    position: fixed;
    @media only screen and (max-width: 599px) {
      display: flex;
    }
  }

  .header_menu_button {
    flex: 0 0 5%;
    padding-left: 8px;
    padding-right: 8px;
    margin: auto;
    margin: 5% 5%;
    position: relative;
  }

  .header_title {
    flex: 1;
    padding-left: 8px;
    padding-right: 8px;
    text-align: center;
  }

  .sidebar {
    width: 18%;
    background-color: #555;
    color: #0c96f9;
    padding: 1%;
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    @media only screen and (max-width: 599px) {
      display: none;
    }
  }

  .sidebar h1 {
    margin-top: 5px;
    text-align: center;
  }

  .main {
    /* Take the remaining width */
    flex: 1;

    /* Make it scrollable */
    overflow: auto;
    padding: 1%;
    @media only screen and (min-width: 599px) {
      margin-left: 20%;
    }
    @media only screen and (max-width: 599px) {
      margin-top: 75px;
    }
  }

  .menu_links {
    color: #0c96f9;
  }

  .collapsable_sidebar {
    width: 30%;
    background-color: #555;
    color: #0c96f9;
    padding: 1%;
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    margin-top: 80px;
    z-index: 10;
  }

  .collapsable_sidebar_right {
    width: 30%;
    background-color: #555;
    color: #0c96f9;
    padding: 1%;
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: 10;
    @media only screen and (max-width: 599px) {
      margin-top: 80px;
      width: 50%;

    }
  }

  a {
    color: #0c96f9;
    text-decoration: none;
  }

  .indicator {
    /* Shown at the bottom right corner */
    bottom: 0;
    position: absolute;
    right: 0;
    transform: translate(50%, 50%);

    /* Rounded border */
    border-radius: 9999px;
    height: 16px;
    width: 16px;

    /* Background color */
    background-color: #fff;
  }

  .content_header {
        position: relative;
        top: 0;
        right: 0;
        left: 0;
        display: flex;
        color: #555;
    }

    .cart_icon {
        position: absolute;
        top: 10px;
        right: 10px;
        @media only screen and (max-width: 599px) {
            display: none;
        }
    }
    /* The Close Button */
    .close {
        color: #aaaaaa;
        float: right;
        font-size: 28px;
        font-weight: bold;
    }

    .close:hover,
        .close:focus {
            color: #000;
            text-decoration: none;
            cursor: pointer;
    }

    .float_right {
        float: right;
    }

    .notification_alert {
      position: absolute;
      right: 10px;
      color: #555;
      background-color: #0c96f9;
      border-radius: 20px;
      width: 20px;
      height: 20px;
      text-align: center;
    }

    .error {
        font-style: bold;
        color: red;
    }

`;
