import { createGlobalStyle } from 'styled-components';
import { color, font } from './../../../Shared/Utils/styles';

export default createGlobalStyle`
    .card {
        border-radius: 5px;
        background-color: #eee;
        flex-basis: 75%;
        margin: auto;
        margin-top: 2%;
        display: flex;
        box-shadow: 5px 5px 5px #aaa;
        @media only screen and (max-width: 599px) {
            display: block;
            margin-top: 5%;
        }
    }

    .card:hover {
        box-shadow: 5px 5px 10px 5px #999;
    }

    .card_title {
        font-weight: bold;
        font-size: 150%;
        padding-top: 10%;
        padding-left: 8%;
    }
    
    .card_data {
        width: 30%;
        @media only screen and (max-width: 599px) { 
            width: 80%; 
        }
    }

    .card_graph {
        padding: 2%;
        width: 60%;
        @media only screen and (max-width: 599px) { 
            width: 80%; 
        }
    }
`;
