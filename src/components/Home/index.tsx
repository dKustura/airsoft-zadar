import React from 'react';

import Header from 'components/Header';
import Title from 'components/Title';

import { withStyles, WithStyles } from '@material-ui/core';
import styles from './styles';

interface Props extends WithStyles<typeof styles> {}

const Home: React.FC<Props> = ({ classes }) => {
  return (
    <>
      <Header />
      <Title />
    </>
  );
};

export default withStyles(styles)(Home);
