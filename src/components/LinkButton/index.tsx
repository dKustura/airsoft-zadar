import * as React from 'react';

import { Link } from 'react-router-dom';

import { Typography } from '@material-ui/core';
import { Variant } from '@material-ui/core/styles/createTypography';
import { useStyles } from './styles';

interface Props {
  readonly to: string;
  readonly variant: Variant;
}

const LinkButton: React.FC<Props> = ({ to, variant, children }) => {
  const classes = useStyles();

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

export default LinkButton;
