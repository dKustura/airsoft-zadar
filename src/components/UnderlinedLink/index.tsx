import * as React from 'react';
import { Link } from '@material-ui/core';

import { useStyles } from './styles';
import { MaterialRouterLink } from 'helpers';

interface Props {
  readonly to: string;
}

const UnderlinedLink: React.FC<Props> = ({ to, children }) => {
  const classes = useStyles();

  return (
    <Link
      component={MaterialRouterLink}
      variant="h6"
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
