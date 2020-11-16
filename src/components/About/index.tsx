import React, { useState } from 'react';
import { HashLink } from 'react-router-hash-link';
import { animated, useSpring } from 'react-spring';
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
import stroke from './images/stroke.svg';

// Helpers
import messages from './messages';
import AboutCard from 'components/AboutCard';

// Member profiles data
import { aboutProfiles } from './data';
import { useStyles } from './styles';

const About = () => {
  const [ref, { height }] = useMeasure<HTMLImageElement>();
  const [isHovered, setIsHovered] = useState(false);
  const classes = useStyles();

  const isSmallScreen = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down('md')
  );

  const imageAnimationProps = useSpring({
    x: isHovered ? 0 : 1160,
    filter: isHovered ? 'blur(15px)' : 'blur(0px)',
  });

  const textAnimationProps = useSpring({
    opacity: isHovered ? 1 : 0,
    transform: isHovered ? 'translate3d(0%,0,0)' : 'translate3d(-30%,0,0)',
  });

  return (
    <Container maxWidth="lg">
      <Typography variant="h1" className={classes.pageTitle}>
        <FormattedMessage {...messages.pageTitle} />
      </Typography>

      <Grid container xs={12}>
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
            style={{
              filter: imageAnimationProps.filter,
            }}
          />
          <animated.img
            src={team}
            width="100%"
            alt="Team"
            style={{
              clipPath: 'url(#myMask)',
            }}
          />

          <animated.div
            className={classes.member1ImageName}
            style={textAnimationProps}
          >
            <Typography variant="h2" style={{ color: 'white' }}>
              Member1
            </Typography>
          </animated.div>

          <animated.svg
            strokeDashoffset={imageAnimationProps.x}
            strokeDasharray="1150"
            strokeLinecap="round"
            strokeLinejoin="round"
            width="100%"
            className={classes.teamImageSvg}
            id="Layer_2"
            data-name="Layer 2"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 675"
          >
            <defs>
              <clipPath
                id="myMask"
                clipPathUnits="objectBoundingBox"
                // scaleX = 1/1200 and scaleY = 1/675 because viewBox="0 0 1200 675"
                transform="scale(0.000833, 0.001481)"
              >
                <polygon points="471.51 207.44 485.24 187.19 494.17 183.07 502.4 179.98 509.27 171.05 506.62 155.07 509.27 140.16 513.73 133.98 526.09 132.61 535.01 137.76 538.45 148.4 538.45 159.38 534.33 166.59 531.58 173.8 533.98 179.63 542.57 179.98 548.06 186.84 561.45 205.72 569 222.2 573.46 233.53 570.37 243.14 560.76 247.94 551.49 243.48 551.49 249.32 549.77 255.15 558.36 259.27 563.16 267.17 562.48 282.96 557.67 288.79 550.8 288.79 552.52 316.25 548.06 333.76 549.09 354.7 549.09 389.71 548.06 414.43 549.09 426.78 553.21 438.8 548.06 441.2 534.33 441.2 522.49 441.2 522.49 375.98 524.03 350.58 520.94 320.03 517.16 301.84 514.42 301.49 511.67 320.03 504.46 341.31 503.09 357.79 497.6 388.34 492.45 436.74 463.96 441.2 461.56 435.02 471.51 424.38 479.4 329.64 480.78 311.79 471.85 309.39 471.85 292.57 476.66 281.93 481.81 274.72 481.81 263.39 484.21 250 490.05 248.29 492.45 235.59 483.52 245.54 477 245.54 467.05 233.18 466.36 226.32 471.51 207.44" />
              </clipPath>
            </defs>

            <HashLink smooth to="#Member1">
              <polygon
                cursor="pointer"
                onMouseEnter={() => {
                  setIsHovered(true);
                }}
                onMouseLeave={() => {
                  setIsHovered(false);
                }}
                points="471.51 207.44 485.24 187.19 494.17 183.07 502.4 179.98 509.27 171.05 506.62 155.07 509.27 140.16 513.73 133.98 526.09 132.61 535.01 137.76 538.45 148.4 538.45 159.38 534.33 166.59 531.58 173.8 533.98 179.63 542.57 179.98 548.06 186.84 561.45 205.72 569 222.2 573.46 233.53 570.37 243.14 560.76 247.94 551.49 243.48 551.49 249.32 549.77 255.15 558.36 259.27 563.16 267.17 562.48 282.96 557.67 288.79 550.8 288.79 552.52 316.25 548.06 333.76 549.09 354.7 549.09 389.71 548.06 414.43 549.09 426.78 553.21 438.8 548.06 441.2 534.33 441.2 522.49 441.2 522.49 375.98 524.03 350.58 520.94 320.03 517.16 301.84 514.42 301.49 511.67 320.03 504.46 341.31 503.09 357.79 497.6 388.34 492.45 436.74 463.96 441.2 461.56 435.02 471.51 424.38 479.4 329.64 480.78 311.79 471.85 309.39 471.85 292.57 476.66 281.93 481.81 274.72 481.81 263.39 484.21 250 490.05 248.29 492.45 235.59 483.52 245.54 477 245.54 467.05 233.18 466.36 226.32 471.51 207.44"
                fill="#ccc"
                fillOpacity="0"
                stroke="#fff"
                strokeMiterlimit="10"
                strokeWidth="7px"
              />
            </HashLink>
          </animated.svg>
        </Grid>
      </Grid>

      <Grid container>
        {aboutProfiles.map((profile, index) => (
          <Grid
            id={profile.name}
            item
            xs={12}
            lg={6}
            style={{
              paddingTop: index % 2 && !isSmallScreen ? '15rem' : '5rem',
            }}
          >
            <AboutCard
              key={profile.name}
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
