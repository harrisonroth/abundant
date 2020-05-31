import { createGlobalStyle } from 'styled-components';
import { color, font } from '../Shared/Utils/styles';

export default createGlobalStyle`
  html, body, #trello-clone__root {
    background-color: ${color.white};
    ${font.regular}
  }
`;