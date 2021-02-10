import { createGlobalStyle } from 'styled-components';
import { color, font } from './../../../Shared/Utils/styles';

export default createGlobalStyle`

    .flex {
        display: flex;
    }

    .flex_1 {
        flex: 1;
    }

    .card {
        margin-top: 1em;
        border-radius: 5px;
        background-color: ${color.lightGrey};
        box-shadow: 5px 5px 5px #aaa;
        padding: 2.5% 2.5%;
        display: flex;
        align-items: start;
        width: 60%;
        margin-left: 20%;
        @media only screen and (max-width: 799px) {
            width: 80%;
            margin-left: 10%;
        }
    }

    .card:hover {
        box-shadow: 5px 5px 10px 5px #999;
    }

    .card_title {
        font-weight: bold;
        font-size: 150%;
        width: 85%;
        color:  ${color.grey};
    }

    .description {
        margin-top: 1em;
        @media only screen and (max-width: 599px) {
            margin-top: .5em;
        }
    }
    
    .card_price {
        font-weight: bold;
        float: right;
        position: absolute;
        right: 5px;
        color:  ${color.grey};
        @media only screen and (max-width: 599px) {
            position: relative;
        }
    }

    .card_img {
        margin-right: 2.5%;
        @media only screen and (max-width: 599px) {
            margin: 2.5%;
            /* margin-bottom: 15px; */
        }
    }

    .card_data {
        width: 100%;
        display: flex;
        position: relative;
        @media only screen and (max-width: 599px) {
            /* flex-direction: column; */
        }
    }

    .track_container {
        align-items: center;
        display: flex;
        justify-content: center;
    }

    .tracking_number {
        font-size: 90%;
        padding: 1% 0%;
    }

    .flex_column {
        display: flex;
        flex-direction: column;
    }

    img {
        width: 100px;
        height: 100px;
        object-fit: cover;
        border-style: none;
    }

    .row {
        flex-wrap: wrap;
        width: 100%;
    }
`;
