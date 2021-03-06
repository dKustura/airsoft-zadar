import * as React from 'react';
import { FormattedMessage } from 'react-intl';

import { Typography } from '@material-ui/core';
import globalMessages from 'helpers/messages';

const Title = (): JSX.Element => {
  return (
    <Typography variant="h1">
      <FormattedMessage {...globalMessages.pageTitle} />
    </Typography>
  );
};

export default Title;
