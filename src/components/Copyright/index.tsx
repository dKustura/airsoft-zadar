import React from 'react';
import { Typography } from '@material-ui/core';

interface Props {}

const index: React.FC<Props> = () => {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      Copyright © Airsoft Klub Zadar
      {` ${new Date().getFullYear()}.`}
    </Typography>
  );
};

export default index;
