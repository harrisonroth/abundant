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
        border-radius: 5px;
        background-color: ${color.lightGrey};
        flex-basis: 75%;
        margin: auto;
        margin-top: 2%;
        box-shadow: 5px 5px 5px #aaa;
        flex-direction: column;
        padding: 2% 2%;
        display: flex;
        align-items: start;
        width: 80%;
        @media only screen and (max-width: 599px) {
            margin-top: 5%;
        }
    }

    .card:hover {
        box-shadow: 5px 5px 10px 5px #999;
    }

    .card_title {
        font-weight: bold;
        font-size: 150%;
    }
    
    .card_price {
        font-weight: bold;
        float: right;
        position: absolute;
        right: 5px;
        @media only screen and (max-width: 599px) {
            position: relative;
        }
    }

    .card_img {
        margin-right: 4%;
        width: 120px;
        height: 120px;
        @media only screen and (max-width: 599px) {
            margin: auto;
            margin-bottom: 15px;
        }
    }

    .card_data {
        width: 100%;
        display: flex;
        position: relative;
        @media only screen and (max-width: 599px) {
            flex-direction: column;
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
        width: 120px;
        height: 120px;
        border-style: solid;
    }

    .row {
        flex-wrap: wrap;
        width: 100%;
    }
`;
