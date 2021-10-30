import * as React from 'react';
import PropTypes from 'prop-types';
import ButtonUnstyled, { buttonUnstyledClasses } from '@mui/core/ButtonUnstyled';
import { styled } from '@mui/system';

const ButtonRoot = React.forwardRef((props, ref) => {
  const { children, ...other } = props;

  return (
    <svg
      width="100%"
      height="43px"
      viewBox="0 0 242 72"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xlink="http://www.w3.org/1999/xlink"
      {...other}
      ref={ref}
    >
      <defs>
        <path
          d="M4.608,0 C2.063,0 0,2.063 0,4.608 L0,4.608 L0,17.279 C0,17.598 0.259,17.854 0.577,17.864 L0.577,17.864 C10.49,18.169 18.431,26.301 18.431,36.287 L18.431,36.287 C18.431,46.273 10.49,54.405 0.577,54.71 L0.577,54.71 C0.259,54.719 0,54.977 0,55.294 L0,55.294 L0,67.392 C0,69.937 2.063,72 4.608,72 L4.608,72 L237.392,72 C239.937,72 242,69.937 242,67.392 L242,67.392 L242,55.283 C242,54.969 241.746,54.714 241.432,54.699 L241.432,54.699 C231.65,54.252 223.857,46.18 223.857,36.287 L223.857,36.287 C223.857,26.394 231.65,18.322 241.432,17.875 L241.432,17.875 C241.746,17.861 242,17.605 242,17.291 L242,17.291 L242,4.608 C242,2.063 239.937,0 237.392,0 L237.392,0 L4.608,0 Z"
          id="path-1"
        />
        <linearGradient x1="38.3621342%" y1="42.4493513%" x2="61.8657388%" y2="57.6847418%" id="linearGradient-3">
          <stop stopColor="#FFB331" offset="0%" />
          <stop stopColor="#FF8800" offset="100%" />
        </linearGradient>
        <linearGradient x1="50%" y1="0%" x2="50%" y2="100%" id="linearGradient-1">
          <stop stopColor="#FFB331" offset="0%" />
          <stop stopColor="#FF8800" offset="120%" />
        </linearGradient>
      </defs>
      <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
        <g id="Artboard">
          <g id="Group-3">
            <mask id="mask-2" fill="white">
              <use href="#path-1" />
            </mask>
            <g id="Clip-2" />
            <path
              className="bg"
              d="M4.608,0 C2.063,0 0,2.063 0,4.608 L0,4.608 L0,17.279 C0,17.598 0.259,17.854 0.577,17.864 L0.577,17.864 C10.49,18.169 18.431,26.301 18.431,36.287 L18.431,36.287 C18.431,46.273 10.49,54.405 0.577,54.71 L0.577,54.71 C0.259,54.719 0,54.977 0,55.294 L0,55.294 L0,67.392 C0,69.937 2.063,72 4.608,72 L4.608,72 L237.392,72 C239.937,72 242,69.937 242,67.392 L242,67.392 L242,55.283 C242,54.969 241.746,54.714 241.432,54.699 L241.432,54.699 C231.65,54.252 223.857,46.18 223.857,36.287 L223.857,36.287 C223.857,26.394 231.65,18.322 241.432,17.875 L241.432,17.875 C241.746,17.861 242,17.605 242,17.291 L242,17.291 L242,4.608 C242,2.063 239.937,0 237.392,0 L237.392,0 L4.608,0 Z"
              id="Fill-1"
              fill="url(#linearGradient-3)"
              mask="url(#mask-2)"
            />
            <foreignObject x="0" y="0" width="100%" {...other}>
              <div className="content">{children}</div>
            </foreignObject>
          </g>
        </g>
      </g>
    </svg>
  );
});

ButtonRoot.propTypes = {
  children: PropTypes.node
};

const CustomButtonRoot = styled(ButtonRoot)(
  ({ theme }) => `
  cursor: pointer;
  width: 100%;
  heigth: 43px;
  
  &:hover,
    &.${buttonUnstyledClasses.focusVisible} {

      .borderEffect {
        stroke-dashoffset: -600;
      }
  
      .bg {
        fill: url(#linearGradient-1);
        transition: fill 1s ease-out;
      }
    }
  
    &:focus,
    &.${buttonUnstyledClasses.focusVisible} {
      outline: none;
      outline: none;
      border: none;
    }
  
    &.${buttonUnstyledClasses.active} { 
      & .bg {
        fill: var(--active-color);
        transition: fill 300ms ease-out;
      }
      outline: none;
      border: none;
    }
  
   
    & foreignObject {
      pointer-events: none;

    & .content {
      font-family: 'Nunito';
      font-size: 14px;
      font-weight: 200;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      text-transform: uppercase;
    }

  }`
);

const SvgButton = React.forwardRef((props, ref) => (
  <ButtonUnstyled {...props} component={CustomButtonRoot} ref={ref} />
));

export default SvgButton;
