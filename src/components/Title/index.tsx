import * as React from 'react';
import { FormattedMessage } from 'react-intl';

import { withStyles, WithStyles, Typography } from '@material-ui/core';
import styles from './styles';
import globalMessages from 'helpers/messages';

interface Props extends WithStyles<typeof styles> {}

const Title: React.FC<Props> = ({ classes }) => {
  return (
    <Typography variant="h1">
      <FormattedMessage {...globalMessages.pageTitle} />
    </Typography>
  );
};

export default withStyles(styles)(Title);
