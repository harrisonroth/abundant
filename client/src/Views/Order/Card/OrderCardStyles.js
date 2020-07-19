import { createGlobalStyle } from 'styled-components';
import { color, font } from '../../../Shared/Utils/styles';

export default createGlobalStyle`

    .flex {
        display: flex;
    }

    .flex_1 {
        flex: 1;
    }

    .card {
        border-radius: 5px;
        background-color: #eee;
        flex-basis: 75%;
        margin: auto;
        margin-top: 2%;
        display: flex;
        box-shadow: 5px 5px 5px #aaa;
        flex-direction: column;
        padding: 2% 2%;
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
    
    .card_data {
        width: 90%;
    }

    .card_graph {
        width: 80%;
        margin: auto;
        padding-top: 2%;
    }

    .circle {
        /* Center the content */
        align-items: center;
        display: flex;
        justify-content: center;

        /* Rounded border */
        background-color: rgba(0, 0, 0, .3);
        border-radius: 9999px;
        height: 32px;
        width: 32px;
    }

    .connector {
        flex: 1;
        height: 1px;
        background-color: rgba(0, 0, 0, .3);
    }


    .no_connector {
        flex: 1;
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

    .connector_complete {
        background-color: #0c96f9;
    }

    .circle_complete {
        background-color: #0c96f9;
    }

    .order_item {
        display: grid;
        border-top: 1px #aaa solid;
        margin-top: 1%;
        padding-top: 1%;
    }

    .order_items {
        border-bottom: 1px #aaa solid;
        margin-bottom: 1%;
        padding-bottom: 1%;
    }
`;
