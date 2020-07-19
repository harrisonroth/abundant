import { createGlobalStyle } from 'styled-components';
import { color, font } from './../../../Utils/styles';

export default createGlobalStyle`
    .cart_card {
        background: white;
        border-radius: 10px;
        padding: 2.5%;
        color: black;
        box-shadow: 1px 1px 1px #aaa;
        width: 90%;
        margin: 2.5%;
        @media only screen and (max-width: 599px) {
            display: block;
            margin-top: 5%;
        }
    }

    .cart_title {
        margin-left: 2%;
    }

    .item_name {
        font-weight: bold;
        font-size: 150%;
        padding-top: 1%;
        padding-left: 1%;
    }

    .item_data {
        padding-top: 1%;
        padding-left: 3%;
    }

    .cart_list {
        height: 80%;
        overflow-y: scroll;
    }

    .cart_buttons {
        margin-top: 5%;
    }

    .cart_price {
        text-align: right;
    }
    
    .hidden {
        display:none;
    }
    .ReactModal__Overlay {
        z-index: 10;
    }

    .checkout {
        height: 90%
    }
`;
