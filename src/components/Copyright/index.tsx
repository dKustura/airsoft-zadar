import * as React from 'react';
import { FormattedMessage } from 'react-intl';

import { Typography } from '@material-ui/core';
import messages from './messages';

interface Props {}

const index: React.FC<Props> = () => {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      <FormattedMessage {...messages.copyright} />
      {` ${new Date().getFullYear()}.`}
    </Typography>
  );
};

export default index;
