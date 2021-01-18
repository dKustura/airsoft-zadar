import * as React from 'react';
import { FormattedMessage } from 'react-intl';

import { Typography } from '@material-ui/core';
import messages from './messages';

const Copyright = (): JSX.Element => {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      <FormattedMessage {...messages.copyright} />
      {` ${new Date().getFullYear()}.`}
    </Typography>
  );
};

export default Copyright;
