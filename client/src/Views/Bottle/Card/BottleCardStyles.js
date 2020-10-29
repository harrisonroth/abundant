import { createGlobalStyle } from 'styled-components';
import { color, font } from '../../../Shared/Utils/styles';

export default createGlobalStyle`
    .card {
        border-radius: 5px;
        background-color: ${color.lightGrey};
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

    .title_div {
        margin-right: 10%;
    }

    .edit_pen {
        float:right;
    }

    input {
        width: 100%;
    }

    button {
        font-size: 75%;
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
        background: ${color.lightGrey};
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

    .card_img_detail {
        width: 50%;
        margin-left: 25%;
    }
`;
