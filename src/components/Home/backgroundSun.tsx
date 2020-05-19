import * as React from 'react';

interface Props {
  readonly isAnimated: boolean;
}

const BackgroundSun: React.FC<Props> = ({ isAnimated }) => (
  <svg
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    x="0px"
    y="0px"
    viewBox="0 0 4096 666.92"
    enableBackground="new 0 0 4096 666.92"
    xmlSpace="preserve"
    className={isAnimated ? 'animated' : ''}
  >
    <g id="background">
      <g>
        <defs>
          <circle id="SVGID_1_" cx="2525.08" cy="263.61" r="261.61" />
        </defs>
        <clipPath id="SVGID_2_">
          <use xlinkHref="#SVGID_1_" overflow="visible" />
        </clipPath>
        <rect
          x="2238.69"
          y="-44.32"
          clipPath="url(#SVGID_2_)"
          fill="#ED2028"
          width="568.03"
          height="623.05"
        />
        <use
          xlinkHref="#SVGID_1_"
          overflow="visible"
          fill="none"
          stroke="#010101"
          strokeWidth="4"
          strokeMiterlimit="10"
        />
      </g>
    </g>
  </svg>
);

export default BackgroundSun;
