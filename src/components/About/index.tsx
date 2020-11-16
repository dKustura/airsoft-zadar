import React, { useState } from 'react';
import { HashLink } from 'react-router-hash-link';
import { animated, useSpring, useSprings } from 'react-spring';
import { useMeasure } from 'react-use';

// Components
import { FormattedMessage } from 'react-intl';
import {
  Container,
  Grid,
  Theme,
  Typography,
  useMediaQuery,
} from '@material-ui/core';

import team from './images/team.jpeg';

// Helpers
import messages from './messages';
import AboutCard from 'components/AboutCard';

// Member profiles data
import { aboutProfiles } from './data';
import { useStyles } from './styles';

// Constants
const STROKE_WIDTH = 7;
const STROKE_COLOR = '#fff';

const About = () => {
  const [ref, { height }] = useMeasure<HTMLImageElement>();
  const [hoveredProfileId, setHoveredProfileId] = useState<number | null>(null);
  const classes = useStyles();

  const isSmallScreen = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down('md')
  );

  const imageHoverSpring = useSpring({
    filter: hoveredProfileId ? 'blur(15px)' : 'blur(0px)',
  });

  const strokeAnimationSprings = useSprings(
    aboutProfiles.length,
    aboutProfiles.map((profile) => ({
      strokeDashoffset: hoveredProfileId === profile.id ? 0 : 1160,
    }))
  );

  const textAnimationSprings = useSprings(
    aboutProfiles.length,
    aboutProfiles.map((profile) => ({
      opacity: hoveredProfileId === profile.id ? 1 : 0,
      transform:
        hoveredProfileId === profile.id
          ? 'translate3d(0%,0,0)'
          : 'translate3d(-30%,0,0)',
    }))
  );

  return (
    <Container maxWidth="lg">
      <Typography variant="h1" className={classes.pageTitle}>
        <FormattedMessage {...messages.pageTitle} />
      </Typography>

      <Grid container>
        <Grid
          item
          xs={12}
          className={classes.teamImageContainer}
          style={{ height }}
        >
          <animated.img
            ref={ref}
            src={team}
            width="100%"
            alt="Team"
            className={classes.teamImage}
            style={imageHoverSpring}
          />

          {textAnimationSprings.map((spring, index) => {
            const profile = aboutProfiles[index];
            return (
              <animated.div
                key={profile.id}
                className={classes.member1ImageName}
                style={spring}
              >
                <Typography variant="h2" style={{ color: 'white' }}>
                  {profile.name}
                </Typography>
              </animated.div>
            );
          })}

          <animated.img
            src={team}
            width="100%"
            alt="Team"
            style={{
              clipPath: 'url(#mask)',
            }}
          />

          <svg
            width="100%"
            className={classes.teamImageSvg}
            id="Layer_2"
            data-name="Layer 2"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 675"
          >
            <defs>
              <clipPath
                id="mask"
                clipPathUnits="objectBoundingBox"
                // scaleX = 1/1200 and scaleY = 1/675 because viewBox="0 0 1200 675"
                transform="scale(0.000833, 0.001481)"
              >
                <polygon
                  points={
                    aboutProfiles.find(
                      (profile) => profile.id === hoveredProfileId
                    )?.polygonPoints
                  }
                />
              </clipPath>
            </defs>

            {strokeAnimationSprings.map((spring, index) => {
              const profile = aboutProfiles[index];
              return (
                <HashLink smooth to={`#member-${profile.id}`} key={profile.id}>
                  <animated.polygon
                    strokeDashoffset={spring.strokeDashoffset}
                    strokeDasharray="1150"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    cursor="pointer"
                    onMouseEnter={() => {
                      setHoveredProfileId(profile.id);
                    }}
                    onMouseLeave={() => {
                      setHoveredProfileId(null);
                    }}
                    points={profile.polygonPoints}
                    fill="#fff"
                    fillOpacity="0"
                    stroke={STROKE_COLOR}
                    strokeMiterlimit="10"
                    strokeWidth={STROKE_WIDTH}
                  />
                </HashLink>
              );
            })}
          </svg>
        </Grid>
      </Grid>

      <Grid container>
        {aboutProfiles.map((profile, index) => (
          <Grid
            key={profile.id}
            id={`member-${profile.id}`}
            item
            xs={12}
            lg={6}
            style={{
              paddingTop: index % 2 && !isSmallScreen ? '15rem' : '5rem',
            }}
          >
            <AboutCard
              key={profile.id}
              image={profile.imageUrl}
              name={profile.name}
              info={profile.description}
              imageAlt="A member of the club"
              imageFirst={index % 2 === 0}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default About;
