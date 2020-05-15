import * as React from 'react';
import { Link, WithStyles, withStyles } from '@material-ui/core';

import styles from './styles';
import { MaterialRouterLink } from 'helpers';

interface Props extends WithStyles {
  readonly to: string;
}

const UnderlinedLink: React.FC<Props> = ({ to, classes, children }) => {
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

export default withStyles(styles)(UnderlinedLink);
