import React from 'react';
// material
import { Box } from '@mui/material';

// ----------------------------------------------------------------------

export default function BackgroundTicket({ ...other }) {
  return (
    <Box {...other}>
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 289 76"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
      >
        <defs>
          <linearGradient x1="0%" y1="0%" x2="80%" y2="0%" id="linearGradient-1" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FFED48" offset="0%" />
            <stop stopColor="#FFC155" offset="20.3125%" />
            <stop stopColor="#FF9E21" offset="60.9375%" />
            <stop stopColor="#FF8800" offset="100%" />
          </linearGradient>
          <rect id="path-2" x="0.1602" y="0.912" width="243.648" height="58.176" rx="1.152" />
        </defs>
        <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
          <g id="button-ticket" transform="translate(1.000000, 1.000000)">
            <g id="Group">
              <path
                d="M270.178,1 C270.719,1 271.158,1.4322 271.209,1.9712 C271.871,9.0053 277.506,14.5929 284.561,15.1813 C285.105,15.2267 285.544,15.668 285.544,16.2138 L285.544,56.949 C285.544,57.4947 285.105,57.9361 284.561,57.9815 C277.047,58.6081 271.144,64.9054 271.144,72.5814 C271.144,72.8107 270.961,73 270.731,73 L16.4826,73 C16.2533,73 16.0698,72.8107 16.0698,72.5814 C16.0698,64.4898 9.5103,57.9302 1.4186,57.9302 C1.1893,57.9302 1,57.7467 1,57.5174 L1,15.6453 C1,15.416 1.1893,15.2326 1.4186,15.2326 C9.0414,15.2326 15.3046,9.411 16.0047,1.9712 C16.0554,1.4322 16.4948,1 17.0362,1 L270.178,1 Z"
                id="Path"
                fill="url(#linearGradient-1)"
                fillRule="nonzero"
              />
              <path
                d="M272.055,1.8916 C271.967,0.9521 271.193,0.15 270.178,0.15 L17.0362,0.15 C16.0208,0.15 15.2468,0.9521 15.1584,1.8916 C14.4991,8.8988 8.5987,14.3826 1.4186,14.3826 C0.7354,14.3826 0.15,14.9312 0.15,15.6453 L0.15,57.5174 C0.15,58.2315 0.7354,58.7802 1.4186,58.7802 C9.0408,58.7802 15.2198,64.9592 15.2198,72.5814 C15.2198,73.2646 15.7685,73.85 16.4826,73.85 L270.731,73.85 C271.445,73.85 271.994,73.2645 271.994,72.5814 C271.994,65.3511 277.555,59.4187 284.632,58.8285 C285.579,58.7495 286.394,57.9727 286.394,56.949 L286.394,16.2138 C286.394,15.1901 285.579,14.4133 284.632,14.3343 C277.987,13.7801 272.679,8.5163 272.055,1.8916 Z"
                id="Path"
                stroke="#FFE940"
                strokeWidth="1.7"
                strokeLinejoin="round"
              />
            </g>
            <g id="Clipped" transform="translate(21.000000, 7.000000)">
              <mask id="mask-3" fill="white">
                <use xlinkHref="#path-2" />
              </mask>
              <g id="Rectangle" />
              <rect
                id="Rectangle"
                stroke="#FFE940"
                strokeWidth="3.4"
                strokeLinecap="round"
                strokeLinejoin="round"
                mask="url(#mask-3)"
                x="0.1602"
                y="0.912"
                width="243.648d"
                height="58.176"
                rx="1.152"
              />
            </g>
            <line
              x1="12.5205"
              y1="21.736"
              x2="12.5205"
              y2="52.84"
              id="Path"
              stroke="#FFE940"
              strokeWidth="1.7"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <line
              x1="273.448"
              y1="21.736"
              x2="273.448"
              y2="52.84"
              id="Path"
              stroke="#FFE940"
              strokeWidth="1.7"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
        </g>
      </svg>
    </Box>
  );
}
