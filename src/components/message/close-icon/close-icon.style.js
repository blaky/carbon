/* eslint-disable max-len */
import styled from 'styled-components';
import PropTypes from 'prop-types';
import BaseTheme from '../../../style/themes/base';
import { THEMES } from '../../../style/themes';
import OptionsHelper from '../../../utils/helpers/options-helper';

const CloseIconStyle = styled.button`
  align-items: center;
  display: flex;
  margin-left: auto;
  justify-content: center;
  text-align: center;
  padding: 0 15px;
  border: none;
  background-color: ${({ messageType, theme }) => (theme.name === THEMES.classic ? theme.colors[messageType][1] : theme.colors.white)};
  color: ${({ messageType, theme }) => (theme.name === THEMES.classic ? theme.colors[messageType][0] : theme.colors[messageType])};
  span {
    cursor: pointer;
    &:before {
      font-size: 16px;
      display: block;
    }
  }

  &:focus {
    outline: none;
    span {
      &:before {
        padding: 5px;
        border: 2px solid ${({ theme }) => theme.colors.focus};
      }
    }
  }
`;

CloseIconStyle.defaultProps = {
  messageType: 'info',
  roundedCorners: true,
  theme: BaseTheme,
  transparent: false
};

CloseIconStyle.propTypes = {
  messageType: PropTypes.oneOf(OptionsHelper.messages),
  border: PropTypes.bool,
  roundedCorners: PropTypes.bool,
  transparent: PropTypes.bool
};

export default CloseIconStyle;
