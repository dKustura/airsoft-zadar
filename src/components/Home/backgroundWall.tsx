import * as React from 'react';
import { connect } from 'react-redux';

import { selectThemeMode } from './selectors';
import { RootState } from 'types';
import { ThemeMode } from 'reducers/constants';

import { useBackgroundStyles as useStyles } from './styles';

interface OwnProps {
  readonly isAnimated: boolean;
}

type Props = OwnProps & ReturnType<typeof mapStateToProps>;

const BackgroundWall: React.FC<Props> = ({ isAnimated, theme }) => {
  const classes = useStyles();
  return (
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
        <polygon
          id="wall"
          className={classes.wall}
          stroke={theme === ThemeMode.Dark ? '#FFFFFF' : '#010101'}
          strokeWidth="2"
          strokeMiterlimit="10"
          points="4106.7,571.74 
		4106.7,286.59 4106.7,242.14 4068.17,242.14 4068.17,286.59 4030.49,286.59 4030.49,242.14 3991.96,242.14 3991.96,286.59 
		3954.29,286.59 3954.29,242.14 3915.76,242.14 3915.76,286.59 3878.08,286.59 3878.08,242.14 3839.55,242.14 3839.55,286.59 
		3801.88,286.59 3801.88,242.14 3763.34,242.14 3763.34,286.59 3725.67,286.59 3725.67,242.14 3687.14,242.14 3687.14,286.59 
		3649.46,286.59 3649.46,242.14 3610.93,242.14 3610.93,286.59 3573.26,286.59 3573.26,242.14 3534.72,242.14 3534.72,286.59 
		3497.05,286.59 3497.05,242.14 3458.52,242.14 3458.52,286.59 3420.84,286.59 3420.84,242.14 3382.31,242.14 3382.31,286.59 
		3344.64,286.59 3344.64,242.14 3306.11,242.14 3306.11,286.59 3268.43,286.59 3268.43,242.14 3229.9,242.14 3229.9,286.59 
		3192.22,286.59 3192.22,242.14 3153.69,242.14 3153.69,286.59 3116.02,286.59 3116.02,242.14 3077.49,242.14 3077.49,286.59 
		3039.81,286.59 3039.81,242.14 3001.28,242.14 3001.28,286.59 2963.6,286.59 2963.6,242.14 2925.07,242.14 2925.07,286.59 
		2887.4,286.59 2887.4,242.14 2848.87,242.14 2848.87,286.59 2811.19,286.59 2811.19,242.14 2772.66,242.14 2772.66,286.59 
		2734.99,286.59 2734.99,242.14 2696.45,242.14 2696.45,286.59 2658.78,286.59 2658.78,242.14 2620.25,242.14 2620.25,286.59 
		2582.57,286.59 2582.57,242.14 2544.04,242.14 2544.04,286.59 2506.37,286.59 2506.37,242.14 2467.83,242.14 2467.83,286.59 
		2430.16,286.59 2430.16,242.14 2391.63,242.14 2391.63,286.59 2353.95,286.59 2353.95,242.14 2315.42,242.14 2315.42,286.59 
		2277.75,286.59 2277.75,242.14 2239.22,242.14 2239.22,286.59 2201.54,286.59 2201.54,242.14 2163.01,242.14 2163.01,286.59 
		2125.33,286.59 2125.33,242.14 2086.8,242.14 2086.8,286.59 2049.13,286.59 2049.13,242.14 2010.6,242.14 2010.6,286.59 
		1972.92,286.59 1972.92,242.14 1934.39,242.14 1934.39,286.59 1896.72,286.59 1896.72,242.14 1858.18,242.14 1858.18,286.59 
		1820.51,286.59 1820.51,242.14 1781.98,242.14 1781.98,286.59 1744.3,286.59 1744.3,242.14 1705.77,242.14 1705.77,286.59 
		1668.1,286.59 1668.1,242.14 1629.56,242.14 1629.56,286.59 1591.89,286.59 1591.89,242.14 1553.36,242.14 1553.36,286.59 
		1515.68,286.59 1515.68,242.14 1477.15,242.14 1477.15,286.59 1439.48,286.59 1439.48,242.14 1400.95,242.14 1400.95,286.59 
		1363.27,286.59 1363.27,242.14 1324.74,242.14 1324.74,286.59 1287.06,286.59 1287.06,242.14 1248.53,242.14 1248.53,286.59 
		1210.86,286.59 1210.86,242.14 1172.33,242.14 1172.33,286.59 1134.65,286.59 1134.65,242.14 1096.12,242.14 1096.12,286.59 
		1058.44,286.59 1058.44,242.14 1019.91,242.14 1019.91,286.59 982.24,286.59 982.24,242.14 943.71,242.14 943.71,286.59 
		906.03,286.59 906.03,242.14 867.5,242.14 867.5,286.59 829.83,286.59 829.83,242.14 791.29,242.14 791.29,286.59 753.62,286.59 
		753.62,242.14 715.09,242.14 715.09,286.59 677.41,286.59 677.41,242.14 638.88,242.14 638.88,286.59 601.21,286.59 601.21,242.14 
		562.67,242.14 562.67,286.59 525,286.59 525,242.14 486.47,242.14 486.47,286.59 448.79,286.59 448.79,242.14 410.26,242.14 
		410.26,286.59 372.59,286.59 372.59,242.14 334.06,242.14 334.06,286.59 296.38,286.59 296.38,242.14 257.85,242.14 257.85,286.59 
		220.17,286.59 220.17,242.14 181.64,242.14 181.64,286.59 143.97,286.59 143.97,242.14 105.44,242.14 105.44,286.59 67.76,286.59 
		67.76,242.14 29.23,242.14 29.23,286.59 -8.45,286.59 -8.45,571.74 	"
        />
        <rect
          x="-76.72"
          y="505.74"
          className={classes.wall}
          width="4240.98"
          height="187.45"
        />
      </g>
    </svg>
  );
};

const mapStateToProps = (state: RootState) => {
  return {
    theme: selectThemeMode(state),
  };
};

export default connect(mapStateToProps)(BackgroundWall);
