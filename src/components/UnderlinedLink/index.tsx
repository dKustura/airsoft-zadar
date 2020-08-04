import * as React from 'react';
import { Link } from '@material-ui/core';

import { useStyles } from './styles';
import { MaterialRouterLink } from 'helpers';
import { Variant } from '@material-ui/core/styles/createTypography';

interface Props {
  readonly to: string;
  readonly variant?: Variant;
}

const UnderlinedLink: React.FC<Props> = ({ to, children, variant = 'h6' }) => {
  const classes = useStyles();

  return (
    <Link
      component={MaterialRouterLink}
      variant={variant}
      color="inherit"
      underline="none"
      classes={{ root: classes.link }}
      to={to}
    >
      {children}
    </Link>
  );
};

export default UnderlinedLink;
