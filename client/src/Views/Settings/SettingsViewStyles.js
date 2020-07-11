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

    .loading {
        text-align: center;
        font-size: 125%;
    }

    .settings_sections {
        background-color: #ddd;
        color: #555;
        border-radius: 15px;
        padding: 2%;
    }

    .section_title {
        border-bottom: 2px solid #555;
    }

    .section_title h3 {
        margin-bottom: 1%;
        margin-top: 0px;
    }

    .section_body {
        padding-top: 1%;
    }

    .item {
        margin-bottom: 1%;
    }

    .item label {
        margin-right: 10px;
    }

    input {
        border-radius: 5px;
    }

    button {
        margin-right: 5px;
    }

    .edit_card_section {
        float: right;
    }
`;
