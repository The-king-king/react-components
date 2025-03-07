import styled from '@emotion/styled';
import { css } from '@emotion/core';
import classnames from 'classnames';

import SvgIcon from 'src/components/SvgIcon';
import {
  execSizeCal,
  getControlFontSizeBySize,
  getControlHeightBySize,
  getControlSpacingBySize,
  inlineBlockWithVerticalMixin,
  sWrap
} from 'src/style';
import config from 'src/config';

import { InputProps } from '../Input';

const { prefixCls: _prefixCls } = config;
export const prefixCls = _prefixCls + '-input';
export const focusedCls = prefixCls + '-focused';
export const disabledCls = prefixCls + '-disabled';
export const blockCls = prefixCls + '-block';
export const inputWrapCls = prefixCls + '-wrap';
export const inputPrefixCls = prefixCls + '-prefix';
export const inputSuffixCls = prefixCls + '-suffix';
export const clearCls = prefixCls + '-clear';

export const SearchIcon = styled(SvgIcon)`
  cursor: pointer;
`;

export const SWrap = sWrap<
  Pick<InputProps, 'disabled' | 'status' | 'customStyle' | 'isShadowInput'> &
    Required<Pick<InputProps, 'size'>> & {
      focused: boolean;
      empty: boolean;
    },
  HTMLSpanElement
>({
  className: ({ focused, disabled }) => classnames(prefixCls, focused && focusedCls, disabled && disabledCls)
})(
  styled.span(props => {
    const {
      theme: { designTokens: DT },
      disabled,
      size,
      focused,
      status,
      customStyle,
      empty,
      isShadowInput
    } = props;
    const height = getControlHeightBySize(DT, size);
    const fontSize = getControlFontSizeBySize(DT, size);
    const spacing = getControlSpacingBySize(DT, size);
    const halfSpacing = execSizeCal(spacing as string, '/2');

    return css`
      position: relative;
      box-sizing: border-box;
      height: ${height};
      max-width: 100%;
      font-size: ${fontSize};
      border-radius: ${DT.T_CORNER_MD};
      color: ${DT.T_COLOR_TEXT_DEFAULT_LIGHT};
      fill: currentColor;
      border: ${DT.T_LINE_WIDTH_BASE} solid ${DT.T_COLOR_LINE_DEFAULT_DARK};
      box-shadow: ${isShadowInput ? DT.T_SHADOW_INSET_DEFAULT : 'none'};
      background: ${isShadowInput ? DT.T_INPUT_COLOR_BG_DEFAULT : DT.T_COLOR_BG_DEFAULT_BRIGHT};
      transition: 0.18s cubic-bezier(0.4, 0, 0.2, 1);
      ${inlineBlockWithVerticalMixin};

      :hover {
        color: ${DT.T_COLOR_TEXT_DEFAULT_DARK};
        border-color: ${isShadowInput ? DT.T_COLOR_LINE_DEFAULT_DARK : DT.T_COLOR_LINE_PRIMARY_DEFAULT};
        background: ${isShadowInput ? DT.T_INPUT_COLOR_BG_DEFAULT : DT.T_COLOR_BG_DEFAULT_BRIGHT};
      }

      .${clearCls} {
        height: 100%;
        align-items: center;
        display: flex;
        color: ${DT.T_COLOR_TEXT_REMARK_DARK};
        fill: ${DT.T_COLOR_TEXT_REMARK_DARK};
        opacity: 0;
        transition: opacity 0.3s;
      }
      .${inputWrapCls}, .${inputPrefixCls}, .${inputSuffixCls}, .${clearCls}, input {
        padding: 0 ${halfSpacing};
      }

      &.${blockCls} {
        display: block;
      }

      .${inputWrapCls} {
        height: 100%;
        display: flex;
        align-items: center;
      }
      .${inputPrefixCls}, .${inputSuffixCls} {
        display: flex;
        height: 100%;
        align-items: center;
      }

      input {
        box-sizing: border-box;
        height: 100%;
        margin: 0;
        font-size: inherit;
        color: inherit;
        flex: 1 1 130px;
        min-width: 0px;
        &,
        &:hover,
        &:focus {
          border: none;
          outline: none;
          background: none;
        }
        &::placeholder {
          opacity: 1;
          color: ${DT.T_COLOR_TEXT_REMARK_LIGHT};
        }
        &::-ms-clear {
          display: none;
        }
      }
      ${!empty &&
      !disabled &&
      css`
        :hover,
        &.${focusedCls} {
          .${clearCls} {
            opacity: 1;
            cursor: pointer;
          }
        }
      `}

      ${focused &&
      !disabled &&
      css`
        && {
          color: ${DT.T_COLOR_TEXT_DEFAULT_DARK};
          border-color: ${DT.T_COLOR_LINE_PRIMARY_DEFAULT};
          background: ${isShadowInput ? DT.T_INPUT_COLOR_BG_ACTIVE : DT.T_COLOR_BG_DEFAULT_BRIGHT};
        }
      `};

      ${status === 'error' &&
      css`
        &&& {
          box-shadow: ${DT.T_SHADOW_INSET_ERROR};
          border-color: ${DT.T_COLOR_LINE_ERROR_DARK};
          background: ${DT.T_COLOR_BG_ERROR_LIGHT};
        }
      `};

      ${disabled &&
      css`
        box-shadow: none;
        &,
        &:hover {
          color: ${DT.T_COLOR_TEXT_DISABLED};
          /* fix disabled color in safari */
          -webkit-text-fill-color: ${DT.T_COLOR_TEXT_DISABLED};
          border-color: ${DT.T_COLOR_LINE_DISABLED_LIGHT};
          background: ${DT.T_COLOR_BG_DISABLED_LIGHT};
        }
      `};

      ${customStyle?.border &&
      css`
        border: ${customStyle.border} !important;
      `}
      ${customStyle?.boxShadow &&
      css`
        box-shadow: ${customStyle.boxShadow} !important;
      `}
            ${customStyle?.background &&
      css`
        background: ${customStyle.background} !important;
      `}
    `;
  })
);
