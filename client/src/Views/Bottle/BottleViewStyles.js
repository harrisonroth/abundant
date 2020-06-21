import { createGlobalStyle } from 'styled-components';
import { color, font } from './../../Shared/Utils/styles';

export default createGlobalStyle`
    .card_list {
        display: flex;

        /* Put a card in the next row when previous cards take all width */
        flex-wrap: wrap;

        margin-left: -8px;
        margin-right: -8px;
    }

    .no_bottles {
        text-align: center;
        font-size: 125%;
    }
`;
