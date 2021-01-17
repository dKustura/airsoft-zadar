import * as React from 'react';
import { Link, Typography } from '@material-ui/core';

import { useStyles } from './styles';
import { MaterialRouterLink } from 'helpers';
import { Variant } from '@material-ui/core/styles/createTypography';

interface Props {
  readonly to: string;
  readonly variant?: Variant;
  readonly isExternal?: boolean;
}

const UnderlinedLink: React.FC<Props> = ({
  to,
  children,
  variant = 'h6',
  isExternal = false,
}) => {
  const classes = useStyles();

  if (isExternal) {
    return (
      <Link
        variant={variant}
        underline="none"
        classes={{ root: classes.link }}
        href={to}
      >
        {children}
      </Link>
    );
  } else {
    return (
      <Link
        component={MaterialRouterLink}
        variant={variant}
        underline="none"
        classes={{ root: classes.link }}
        to={to}
      >
        {children}
      </Link>
    );
  }
};

export default UnderlinedLink;
