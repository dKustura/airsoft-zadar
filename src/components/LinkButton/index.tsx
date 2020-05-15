import * as React from 'react';

import { Link } from 'react-router-dom';

import { WithStyles, withStyles, Typography } from '@material-ui/core';
import { Variant } from '@material-ui/core/styles/createTypography';
import styles from './styles';

interface Props extends WithStyles {
  readonly to: string;
  readonly variant: Variant;
}

const LinkButton: React.FC<Props> = ({ to, variant, classes, children }) => {
  return (
    <Link to={to} className={classes.link}>
      <div className={classes.button}>
        <Typography color="inherit" variant={variant}>
          {children}
        </Typography>
      </div>
    </Link>
  );
};

export default withStyles(styles)(LinkButton);
