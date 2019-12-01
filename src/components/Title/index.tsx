import React from 'react';

import {
  withStyles,
  WithStyles,
  Container,
  Typography,
} from '@material-ui/core';
import styles from './styles';

interface Props extends WithStyles<typeof styles> {}

const Title: React.FC<Props> = ({ classes }) => {
  return (
    <Container maxWidth="lg">
      <Typography variant="h1">Title</Typography>
    </Container>
  );
};

export default withStyles(styles)(Title);
