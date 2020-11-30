import React, {
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
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

// Static data
import { aboutProfiles } from './data';
import { getRandomArrayOfBackgroundImages, team } from './images';

// Helpers
import messages from './messages';
import { useStyles } from './styles';
import {
  calculateTranslationCoords,
  getBackgroundImageRotateTransform,
  getBackgroundImageScaleTransform,
  getBackgroundImageXPosition,
  getBackgroundImageYPosition,
  getRandomBackgroundImageTransform,
} from './helper';
import { BACKGROUND_IMAGES, STROKE_COLOR, STROKE_WIDTH } from './contants';

const About = () => {
  const [ref, { height: imageHeight }] = useMeasure<HTMLImageElement>();
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

  const backgroundImages = useMemo(
    () => getRandomArrayOfBackgroundImages(BACKGROUND_IMAGES.COUNT),
    []
  );

  const contentContainerRef = useRef<HTMLDivElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);

  const [{ xy: mouseCoords }, set] = useSpring(() => ({
    xy: [0, 0],
    config: { mass: 10, tension: 550, friction: 140 },
  }));

  const onMouseMove = useCallback(
    ({
      clientX: x,
      clientY: y,
    }: React.MouseEvent<HTMLDivElement, MouseEvent>) =>
      set({ xy: calculateTranslationCoords(x, y) }),
    [set]
  );

  useEffect(() => {
    const backgroundComponents = backgroundImages.map(
      (backgroundImage, index) => {
        const containerHeight = contentContainerRef.current?.offsetHeight || 0;

        const scaleTransformValue = getBackgroundImageScaleTransform();
        const rotateTransformValue = getBackgroundImageRotateTransform();
        const randomX = getBackgroundImageXPosition();
        const randomY = getBackgroundImageYPosition(containerHeight);
        const blurValue = 1 / scaleTransformValue - 0.5;

        return (
          <animated.img
            key={`${backgroundImage}-${index}`}
            src={backgroundImage}
            style={{
              position: 'absolute',
              width: BACKGROUND_IMAGES.MAX_SIZE,
              filter: `blur(${blurValue}px)`,
              opacity: scaleTransformValue,
              transform: mouseCoords.interpolate(
                getRandomBackgroundImageTransform(
                  randomX,
                  randomY,
                  scaleTransformValue,
                  rotateTransformValue
                ) as any
              ),
              zIndex: -1,
            }}
          />
        );
      }
    );
    setBackgroundImagesComponents(backgroundComponents);
  }, [backgroundImages, mouseCoords]);

  return (
    <Grid container onMouseMove={onMouseMove}>
      <div className={classes.backgroundParallax}>
        {backgroundImagesComponents}
      </div>
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
            <div ref={imageContainerRef}>
              <animated.img
                ref={ref}
                src={team}
                width="100%"
                alt="Team"
                className={classes.teamImage}
                style={imageHoverSpring}
              />
            </div>

            {textAnimationSprings.map((spring, index) => {
              const profile = aboutProfiles[index];
              return (
                <animated.div
                  key={profile.id}
                  className={classes.memberNameContainer}
                  style={{ ...spring, ...hoverTextPosition }}
                >
                  <Typography variant="h2" className={classes.memberName}>
                    {profile.name}
                  </Typography>
                </animated.div>
              );
            })}

            <animated.img src={team} alt="Team" className={classes.maskImage} />

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
                        const pathBox = event.currentTarget.getBoundingClientRect();
                        const imageBox = imageContainerRef.current?.getBoundingClientRect();

                        const left = `${pathBox.x - (imageBox?.x || 0)}px`;
                        const top = `${
                          pathBox.y + pathBox.height - (imageBox?.y || 0)
                        }px`;

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
              className={
                index % 2 && !isSmallScreen
                  ? classes.profileLeft
                  : classes.profileRight
              }
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
    </Grid>
  );
};

export default About;
