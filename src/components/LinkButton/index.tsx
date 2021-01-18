import * as React from 'react';
import { PropsWithChildren } from 'react';

import { Link } from 'react-router-dom';

import { Typography } from '@material-ui/core';
import { Variant } from '@material-ui/core/styles/createTypography';
import { useStyles } from './styles';

interface Props {
  readonly to: string;
  readonly isExternal?: boolean;
  readonly variant: Variant;
}

const LinkButton = ({
  to,
  isExternal = false,
  variant,
  children,
}: PropsWithChildren<Props>): JSX.Element => {
  const classes = useStyles();

  const childComponent = (
    <div className={classes.button}>
      <Typography color="inherit" variant={variant}>
        {children}
      </Typography>
    </div>
  );

  if (isExternal) {
    return (
      <a href={to} className={classes.link}>
        {childComponent}
      </a>
    );
  } else {
    return (
      <Link to={to} className={classes.link}>
        {childComponent}
      </Link>
    );
  }
};

export default LinkButton;
