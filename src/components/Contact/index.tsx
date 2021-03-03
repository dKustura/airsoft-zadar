import React from 'react';
import { FormattedMessage } from 'react-intl';

// Components
import {
  Container,
  Grid,
  Theme,
  Typography,
  useMediaQuery,
} from '@material-ui/core';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import FacebookIcon from '@material-ui/icons/Facebook';
import LinkButton from 'components/LinkButton';
// import PhoneSvg from './PhoneSvg';

// Helpers
import { useStyles } from './styles';
import messages from './messages';
import { EMAIL_CONTACT, FACEBOOK_CONTACT } from './constants';

const Contact = () => {
  const classes = useStyles();

  const isSmallScreen = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down('xs')
  );

  // TODO: Fix layout for small screens
  return (
    <Container maxWidth="lg">
      {/* <Grid container>
        <Grid item className={classes.phoneImage}>
          <PhoneSvg />
        </Grid>
      </Grid> */}
      <Grid container>
        <Grid item>
          <Typography variant="h1">
            <FormattedMessage {...messages.pageTitle} />
          </Typography>
        </Grid>

        <Grid container className={classes.contactsContainer}>
          <Grid
            container
            alignItems="center"
            justify={isSmallScreen ? 'center' : 'flex-start'}
          >
            <Grid item className={classes.iconContainer}>
              <MailOutlineIcon fontSize="large" />
            </Grid>
            <Grid item>
              <LinkButton isExternal variant="body1" to={EMAIL_CONTACT.link}>
                {EMAIL_CONTACT.title}
              </LinkButton>
            </Grid>
          </Grid>

          <Grid
            container
            alignItems="center"
            justify={isSmallScreen ? 'center' : 'flex-start'}
          >
            <Grid item className={classes.iconContainer}>
              <FacebookIcon fontSize="large" />
            </Grid>
            <Grid item>
              <LinkButton isExternal variant="body1" to={FACEBOOK_CONTACT.link}>
                {FACEBOOK_CONTACT.title}
              </LinkButton>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Contact;
