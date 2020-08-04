import * as React from 'react';

import classnames from 'classnames';
import './index.scss';
import { useStyles } from './styles';

interface Props {
  readonly isActive: boolean;
  readonly onClick: () => void;
}

const BurgerMenuIcon: React.FC<Props> = ({ isActive, onClick }) => {
  const classes = useStyles();

  return (
    <svg
      className={classnames('ham', 'hamRotate', 'ham8', { active: isActive })}
      viewBox="0 0 100 100"
      width="80"
      onClick={onClick}
    >
      <path
        className={`${classes.line} top`}
        d="m 30,33 h 40 c 3.722839,0 7.5,3.126468 7.5,8.578427 0,5.451959 -2.727029,8.421573 -7.5,8.421573 h -20"
      />
      <path className={`${classes.line} middle`} d="m 30,50 h 40" />
      <path
        className={`${classes.line} bottom`}
        d="m 70,67 h -40 c 0,0 -7.5,-0.802118 -7.5,-8.365747 0,-7.563629 7.5,-8.634253 7.5,-8.634253 h 20"
      />
    </svg>
  );
};

export default BurgerMenuIcon;
