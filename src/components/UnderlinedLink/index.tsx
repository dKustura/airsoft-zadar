import * as React from 'react';
import { PropsWithChildren } from 'react';
import { Link } from '@material-ui/core';

import { useStyles } from './styles';
import { MaterialRouterLink } from 'helpers';
import { Variant } from '@material-ui/core/styles/createTypography';
import { ColorType } from './types';

interface Props {
  readonly to: string;
  readonly variant?: Variant;
  readonly isExternal?: boolean;
  readonly color?: ColorType;
}

const UnderlinedLink = ({
  to,
  children,
  variant = 'h6',
  isExternal = false,
  color = 'inherit',
}: PropsWithChildren<Props>): JSX.Element => {
  const classes = useStyles();

  if (isExternal) {
    return (
      <Link
        variant={variant}
        underline="none"
        color={color}
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
        color={color}
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
