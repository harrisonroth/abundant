import { createGlobalStyle } from 'styled-components';
import { color, font } from './../../Shared/Utils/styles';

export default createGlobalStyle`

    .login_screen {
        height: 100%;
        background-color: #0c96f9;
        bottom: 0;
        position: absolute;
        right: 0;
        left: 0;
        text-align: center;
    }

    input {
        display: flex;
        margin: auto;
        margin-bottom: 5px;
        border-radius: 5px;
        text-align: center;
        border-style: none;
    }

    .login_content {
        background-color: #aac;
        width: 30%;
        margin: auto;
        padding-top: 10px;
        padding-bottom: 15px;
        margin-top: 5%;
        border-radius: 15px;

    }

    .login_error {
        font-style: bold;
        color: red;
    }

`;
