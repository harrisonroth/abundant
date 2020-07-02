import { createGlobalStyle } from 'styled-components';
import { color, font } from '../../Shared/Utils/styles';

export default createGlobalStyle`
    .store_header {
        position: relative;
        top: 0;
        right: 0;
        left: 0;
        display: flex;
        color: #555;
    }

    .store_title {
        flex: 1;
        padding-left: 8px;
        padding-right: 8px;
        text-align: center;
    }

    .loader {
        width: 100;
        text-align: center;
        margin: auto;
    }

    .store_filter {
        position: relative;
        width: 50%;
        margin: auto;
    }

    .store_filter label {
        /* Position the label */
        left: 8px;
        position: absolute;
        top: 0;
    }

    .select_filter {
        padding-top: 15px;
    }
`;
