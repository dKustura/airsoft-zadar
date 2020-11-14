import React from 'react';

// Components
import { FormattedMessage } from 'react-intl';
import { Container, Grid, Typography } from '@material-ui/core';

import member1 from './images/member1.jpg';
import member2 from './images/member2.jpg';
import member3 from './images/member3.jpg';
import member4 from './images/member4.jpg';
import member5 from './images/member5.jpg';
import member6 from './images/member6.jpg';

// Helpers
import messages from './messages';
import AboutCard from 'components/AboutCard';

const About = () => {
  return (
    <Container maxWidth="lg">
      <Typography variant="h1" style={{ padding: '3rem' }}>
        <FormattedMessage {...messages.pageTitle} />
      </Typography>

      <Grid container>
        <Grid item xs={12} lg={6}>
          <AboutCard
            image={member1}
            name="Member1"
            info="Lorem ipsum dolor sit amet, consectetur adipiscing elit. In nec nisl eu leo feugiat commodo eget non mi."
            imageAlt="A member of the club"
          />
        </Grid>
        <Grid item xs={12} lg={6} style={{ paddingTop: '10rem' }}>
          <AboutCard
            image={member2}
            name="Member2"
            info="Lorem ipsum dolor sit amet, consectetur adipiscing elit. In nec nisl eu leo feugiat commodo eget non mi."
            imageAlt="A member of the club"
            imageFirst={false}
          />
        </Grid>
        <Grid item xs={12} lg={6} style={{ paddingTop: '5rem' }}>
          <AboutCard
            image={member3}
            name="Member3"
            info="Lorem ipsum dolor sit amet, consectetur adipiscing elit. In nec nisl eu leo feugiat commodo eget non mi."
            imageAlt="A member of the club"
          />
        </Grid>
        <Grid item xs={12} lg={6} style={{ paddingTop: '15rem' }}>
          <AboutCard
            image={member4}
            name="Member4"
            info="Lorem ipsum dolor sit amet, consectetur adipiscing elit. In nec nisl eu leo feugiat commodo eget non mi."
            imageAlt="A member of the club"
            imageFirst={false}
          />
        </Grid>
        <Grid item xs={12} lg={6} style={{ paddingTop: '5rem' }}>
          <AboutCard
            image={member5}
            name="Member5"
            info="Lorem ipsum dolor sit amet, consectetur adipiscing elit. In nec nisl eu leo feugiat commodo eget non mi."
            imageAlt="A member of the club"
          />
        </Grid>
        <Grid item xs={12} lg={6} style={{ paddingTop: '15rem' }}>
          <AboutCard
            image={member6}
            name="Member6"
            info="Lorem ipsum dolor sit amet, consectetur adipiscing elit. In nec nisl eu leo feugiat commodo eget non mi."
            imageAlt="A member of the club"
            imageFirst={false}
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default About;
