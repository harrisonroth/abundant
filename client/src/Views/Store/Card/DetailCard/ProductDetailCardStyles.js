import { createGlobalStyle } from 'styled-components';
import { color, font } from './../../../../Shared/Utils/styles';

export default createGlobalStyle`


    .card_img_detail img {
        width: 65%;
        margin: auto;
        display: block;
    }

    .card_img_detail {
        margin: 2% 10%;
    }

    .carousel img {
        width: 20%;
        margin-left: 2.5%;
        @media only screen and (max-width: 599px) {
            margin-left: 5vw;
        }
    }
    
    .carousel {
        margin: auto;
    }

    .section_one {
        display: flex;
        padding-top: 2%;
        @media only screen and (max-width: 599px) {
            flex-direction: column;
        }
    }

    .product_images {
        width: 50%;
        @media only screen and (max-width: 599px) {
            flex-basis: 90%;
        }
    }

    .detail_contents {
        flex-wrap: wrap;
        padding: 0% 5%;
    }

    .detail_data {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        width: 50%; 
    }

    .selector_container {
        border: 1px solid rgba(0, 0, 0, 0.3);
        border-bottom-color: transparent;
        border-radius: 4px;
    }

    .select_option {
        overflow-y: scroll;
        height: 25vw;
        width: 20%;
    }

    .option_detail {
        height: 25vw;
        width: 28%;
        margin-left: 1%;
        margin-right: 1%;
    }

    .size_selector {
        margin-top: 5%;
    }

    b {
        color: #f00;
    }

    .content {
        display: flex;
    }

    .options {
        overflow-y: scroll;
        width: 30%;
    }

    .option {
        border-style: solid;
        border-width: 1px;
        border-color: #aaa;
        padding: 2%;
        background: #eee;
        margin: 2px;
        border-radius: 10px;
    }

    .selected_option {
        background: #ddd;
    }

    .option_details {
        width: 65%;
        margin-left: 2.5%;
    }
`;
