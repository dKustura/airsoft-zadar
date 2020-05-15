import * as React from 'react';

import { withStyles, WithStyles, Typography } from '@material-ui/core';
import styles from './styles';

interface Props extends WithStyles<typeof styles> {}

const Title: React.FC<Props> = ({ classes }) => {
  return <Typography variant="h1">Airsoft Klub Zadar</Typography>;
};

export default withStyles(styles)(Title);
