import { createGlobalStyle } from 'styled-components';
import { color, font } from './../../Shared/Utils/styles';

export default createGlobalStyle`

    .login_screen {
        height: 100%;
        background-color: ${color.lightGrey};
        bottom: 0;
        position: absolute;
        right: 0;
        left: 0;
        text-align: center;
    }

    input {
        display: flex;
        margin: auto;
        margin-bottom: .5em;
        border-radius: 5px;
        text-align: center;
        height: 1.5em;
        border-style: none;
    }

    button {
        margin: auto;
        margin-bottom: .5em;
        border-radius: 5px;
        text-align: center;
        height: 1.5em;
        border-style: none;
    }

    .login_content {
        box-shadow: #000 5px 5px 20px;
        background-color: ${color.grey};
        color: ${color.primary};
        height: 30%;
        width: 40%;
        bottom: 35%;
        left: 30%;
        position: absolute;
        padding-top: 10px;
        padding-bottom: 10px;
        border-radius: 15px;
        @media only screen and (max-width: 1000px) { 
            height: 40%;
            width: 50%;
            bottom: 30%;
            left: 25%;
        }
        @media only screen and (max-width: 625px) { 
            height: 50%;
            width: 50%;
            bottom: 25%;
            left: 25%;
        }
    }

    .login_error {
        font-style: bold;
        color: red;
    }

    p {
        text-decoration: underline;
        margin: auto;
        text-align: center;
        height: 1.5em;
        border-style: none;
    }

    h1.has_account  {
        @media only screen and (min-width: 1000px) { 
            font-size: 2.5em;
            margin: 1em 0;
        }
        @media only screen and (max-width: 625px) { 
            font-size: 2.5em;
            margin: 1em 0;
        }
    }

    input.has_account {
        @media only screen and (min-width: 1000px) { 
            font-size: 1.1em;
        }
        @media only screen and (max-width: 625px) { 
            font-size: 1.1em;
        }
    }

`;
