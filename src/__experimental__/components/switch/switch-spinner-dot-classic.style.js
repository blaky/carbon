import { css } from 'styled-components';
import { THEMES } from '../../../style/themes';

export default ({ theme }) => theme.name === THEMES.classic && css`
  background-color: #ffffff;
  border-radius: 100%;
  height: 4px;
  width: 4px;
`;
