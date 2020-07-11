import { createGlobalStyle } from 'styled-components';
import { color, font } from '../../Shared/Utils/styles';

export default createGlobalStyle`
    .card_list {
        display: flex;

        /* Put a card in the next row when previous cards take all width */
        flex-wrap: wrap;

        margin-left: -8px;
        margin-right: -8px;
    }

    .no_notifications {
        text-align: center;
        font-size: 125%;
    }

    .card {
        width: 70%;
        margin-left: 15%;
        background-color: #ddd;
        padding: 1% 2% 1% 4%;
        border-radius: 15px;
        margin-bottom: 20px
    }

    
`;
