import * as React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

// Components
import {
  Container,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@material-ui/core';

// Helpers
import messages from './messages';
import { useStyles } from './styles';
import UnderlinedLink from 'components/UnderlinedLink';
import {
  browserCookieLinks,
  cookieEducationLinks,
  gaOptOutLink,
} from './constants';

interface Props {}

const CookiePolicy = (props: Props) => {
  const classes = useStyles();
  const intl = useIntl();

  return (
    <Container maxWidth="lg">
      <Grid container>
        <Grid item>
          <Typography variant="h1">
            <FormattedMessage {...messages.pageTitle} />
          </Typography>
        </Grid>
      </Grid>

      <Grid container className={classes.contentContainer}>
        <Grid item className={classes.contentSection}>
          <Typography>
            <FormattedMessage {...messages.cookiePolicyIntro} />
          </Typography>
        </Grid>
        <Grid container className={classes.contentSection}>
          <Grid item xs={12} className={classes.sectionTitle}>
            <Typography
              variant="h4"
              component="h2"
              className={classes.sectionTitleTypography}
            >
              <FormattedMessage {...messages.whatAreCookies} />
            </Typography>
          </Grid>
          <Grid container spacing={2}>
            <Grid item>
              <Typography>
                <FormattedMessage {...messages.whatAreCookiesDescription1} />
              </Typography>
            </Grid>
            <Grid item>
              <Typography>
                <FormattedMessage {...messages.whatAreCookiesDescription2} />
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid container className={classes.contentSection}>
          <Grid item xs={12} className={classes.sectionTitle}>
            <Typography
              variant="h4"
              component="h2"
              className={classes.sectionTitleTypography}
            >
              <FormattedMessage {...messages.whichCookiesWeUse} />
            </Typography>
          </Grid>
          <Grid container spacing={2}>
            <Grid item>
              <Typography>
                <FormattedMessage {...messages.whichCookiesWeUseDescription1} />
              </Typography>
            </Grid>
            <Grid item>
              <Typography>
                <FormattedMessage {...messages.whichCookiesWeUseDescription1} />
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid container className={classes.contentSection}>
          <Grid item xs={12} className={classes.sectionTitle}>
            <Typography
              variant="h4"
              component="h2"
              className={classes.sectionTitleTypography}
            >
              <FormattedMessage {...messages.cookiesList} />
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <TableContainer component={Paper}>
              <Table aria-label="cookie table">
                <TableHead>
                  <TableRow>
                    <TableCell align="center">
                      <FormattedMessage {...messages.tableHeaderCookie} />
                    </TableCell>
                    <TableCell align="center">
                      <FormattedMessage {...messages.tableHeaderName} />
                    </TableCell>
                    <TableCell align="center">
                      <FormattedMessage {...messages.tableHeaderPurpose} />
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell component="th" scope="row">
                      <FormattedMessage {...messages.googleAnalyticsCookie} />
                    </TableCell>
                    <TableCell>
                      <FormattedMessage
                        {...messages.googleAnalyticsCookieName}
                      />
                    </TableCell>
                    <TableCell>
                      <FormattedMessage
                        {...messages.googleAnalyticsCookiePurpose}
                      />
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
        <Grid container className={classes.contentSection}>
          <Grid item xs={12} className={classes.sectionTitle}>
            <Typography
              variant="h4"
              component="h2"
              className={classes.sectionTitleTypography}
            >
              <FormattedMessage {...messages.optionsRegardingCookies} />
            </Typography>
          </Grid>
          <Grid container spacing={2}>
            <Grid item>
              <Typography>
                <FormattedMessage
                  {...messages.optionsRegardingCookiesDescription1}
                />
              </Typography>
            </Grid>
            <Grid item>
              <ul>
                {browserCookieLinks.map((link) => (
                  <li key={link.label}>
                    <UnderlinedLink
                      isExternal
                      variant="body1"
                      to={intl.formatMessage(link.translation)}
                      color="primary"
                    >
                      {link.label}
                    </UnderlinedLink>
                  </li>
                ))}
              </ul>
            </Grid>
            <Grid item>
              <Typography>
                <FormattedMessage
                  {...messages.optionsRegardingCookiesDescription2}
                />
              </Typography>
            </Grid>
            <Grid item>
              <Typography>
                <FormattedMessage
                  {...messages.optionsRegardingCookiesDescription3}
                />
                <UnderlinedLink
                  isExternal
                  variant="body1"
                  to={cookieEducationLinks.allAboutCOokies.full}
                  color="primary"
                >
                  {`${cookieEducationLinks.allAboutCOokies.short}`}
                </UnderlinedLink>
                <FormattedMessage
                  {...messages.optionsRegardingCookiesDescriptionLinkSeparator}
                />
                <UnderlinedLink
                  isExternal
                  variant="body1"
                  to={cookieEducationLinks.yourOnlineChoices.full}
                  color="primary"
                >
                  {`${cookieEducationLinks.yourOnlineChoices.short}.`}
                </UnderlinedLink>
                <FormattedMessage
                  {...messages.optionsRegardingCookiesDescription4}
                />
                <UnderlinedLink
                  isExternal
                  variant="body1"
                  to={gaOptOutLink.full}
                  color="primary"
                >
                  {` ${gaOptOutLink.short}.`}
                </UnderlinedLink>
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid container className={classes.contentSection}>
          <Grid item xs={12} className={classes.sectionTitle}>
            <Typography
              variant="h4"
              component="h2"
              className={classes.sectionTitleTypography}
            >
              <FormattedMessage {...messages.changesToCookiePolicy} />
            </Typography>
          </Grid>
          <Grid container>
            <Grid item>
              <Typography>
                <FormattedMessage
                  {...messages.changesToCookiePolicyDescription}
                />
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default CookiePolicy;
