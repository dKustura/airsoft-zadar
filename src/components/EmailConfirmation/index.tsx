import * as React from 'react';

// Components
import { Container, Grid, Typography } from '@material-ui/core';
import { FormattedMessage } from 'react-intl';

// Helpers
import messages from './messages';

interface Props {}

const EmailConfirmation: React.FC<Props> = (props) => {
  return (
    <Container maxWidth="md">
      <Grid
        container
        justify="center"
        alignItems="center"
        style={{ padding: 100 }}
      >
        <Grid item>
          <Typography variant="h3">
            <FormattedMessage {...messages.emailConfirmed} />
          </Typography>
        </Grid>
      </Grid>
    </Container>
  );
};

export default EmailConfirmation;
