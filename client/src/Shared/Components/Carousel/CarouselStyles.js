import { createGlobalStyle } from 'styled-components';
import { color, font } from './../../Utils/styles';

export default createGlobalStyle`

    .slide-arrow {
        padding-top: 45%;
        background-color: white;
        padding-left: 1%;
        padding-right: 1%;
    }

    .left {
        margin-right: 2%;
    }

    .right {
        margin-left: 2%;
    }
    
    .carousel {
        display: flex;
    }

    .carousel img {
        width: 100%;
        height: 100%;
        border: none;
        margin: 0;
    }
`;
