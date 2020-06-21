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

    .cart_icon {
        margin: auto;   
        margin-left: 90%;
        @media only screen and (max-width: 599px) {
            display: none;
        }
    }

    .loader {
        width: 100;
        text-align: center;
        margin: auto;
    }
`;
