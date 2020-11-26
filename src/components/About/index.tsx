import React, { ReactNode, useEffect, useMemo, useRef, useState } from 'react';
import { HashLink } from 'react-router-hash-link';
import { animated, useSpring, useSprings } from 'react-spring';
import { useMeasure } from 'react-use';

// Components
import AboutCard from 'components/AboutCard';
import { FormattedMessage } from 'react-intl';
import {
  Container,
  Grid,
  Theme,
  Typography,
  useMediaQuery,
} from '@material-ui/core';

// Helpers
import messages from './messages';
import { aboutProfiles } from './data';
import { useStyles } from './styles';
import { getRandomArrayOfBackgroundImages, team } from './images';
import { getRandomArbitrary } from './helper';
import { BACKGROUND_IMAGES, STROKE_COLOR, STROKE_WIDTH } from './contants';

const About = () => {
  const [
    ref,
    { width: imageWidth, height: imageHeight, top: imageTop, left: imageLeft },
  ] = useMeasure<HTMLImageElement>();
  const [hoveredProfileId, setHoveredProfileId] = useState<number | null>(null);
  const [lastHoveredProfileId, setLastHoveredProfileId] = useState<
    number | null
  >(null);
  const [hoverTextPosition, setHoverTextPosition] = useState<{
    left: string;
    top: string;
  }>();
  const [backgroundImagesComponents, setBackgroundImagesComponents] = useState<
    ReactNode[]
  >([]);
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
      strokeDashoffset: hoveredProfileId === profile.id ? 0 : 1200,
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

  const backgroundImages = getRandomArrayOfBackgroundImages(
    BACKGROUND_IMAGES.COUNT
  );

  const contentContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const backgroundComponents = backgroundImages.map(
      (backgroundImage, index) => {
        const maxHeight = contentContainerRef.current?.offsetHeight;

        const randomScale = getRandomArbitrary(
          BACKGROUND_IMAGES.MIN_SCALE,
          BACKGROUND_IMAGES.MAX_SCALE
        );
        const randomRotate = getRandomArbitrary(
          BACKGROUND_IMAGES.MIN_ROTATION_DEG,
          BACKGROUND_IMAGES.MAX_ROTATION_DEG
        );
        const randomX = getRandomArbitrary(
          BACKGROUND_IMAGES.MIN_X_PERCENTAGE,
          BACKGROUND_IMAGES.MAX_X_PERCENTAGE
        );
        const randomY = getRandomArbitrary(0, maxHeight || 0);
        return (
          <img
            key={`${backgroundImage}-${index}`}
            src={backgroundImage}
            style={{
              position: 'absolute',
              width: 100,
              transform: `translate(${randomX}vw, ${randomY}px) scale(${randomScale}) rotate(${randomRotate}deg)`,
              zIndex: -1,
            }}
          />
        );
      }
    );
    setBackgroundImagesComponents(backgroundComponents);
  }, []);

  return (
    <div>
      {backgroundImagesComponents}
      <Container maxWidth="lg" ref={contentContainerRef}>
        <Typography variant="h1" className={classes.pageTitle}>
          <FormattedMessage {...messages.pageTitle} />
        </Typography>

        <Grid container>
          <Grid
            item
            xs={12}
            className={classes.teamImageContainer}
            style={{ height: imageHeight }}
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
                  className={classes.memberName}
                  style={{ ...spring, ...hoverTextPosition }}
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
                  <path
                    d={
                      aboutProfiles.find(
                        (profile) => profile.id === hoveredProfileId
                      )?.pathDescription ||
                      aboutProfiles.find(
                        (profile) => profile.id === lastHoveredProfileId
                      )?.pathDescription
                    }
                  />
                </clipPath>
              </defs>

              {strokeAnimationSprings.map((spring, index) => {
                const profile = aboutProfiles[index];
                return (
                  <HashLink
                    smooth
                    to={`#member-${profile.id}`}
                    key={profile.id}
                  >
                    <animated.path
                      id={`path-${profile.id}`}
                      strokeDashoffset={spring.strokeDashoffset}
                      strokeDasharray="1195"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      cursor="pointer"
                      onMouseEnter={(event) => {
                        const box = event.currentTarget.getBBox();
                        const left = `${
                          ((box.x - imageLeft) * 100) / imageWidth - 10
                        }%`;
                        const top = `${
                          ((box.y - imageTop) * 100) / imageHeight + 10
                        }%`;

                        console.log('box.y', box.y);

                        console.log('imageTop', imageTop);

                        setHoverTextPosition({ left, top });
                        setHoveredProfileId(profile.id);
                        setLastHoveredProfileId(profile.id);
                      }}
                      onMouseLeave={() => {
                        setHoveredProfileId(null);
                      }}
                      d={profile.pathDescription}
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
    </div>
  );
};

export default About;
