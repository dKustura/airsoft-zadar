import React, { useEffect, useState } from 'react';
import { animated, useSpring } from 'react-spring';
import { useInView } from 'react-intersection-observer';
import { Grid, Typography } from '@material-ui/core';

interface Props {
  readonly image: string;
  readonly name: string;
  readonly info: string;
  readonly imageAlt: string;
  readonly imageFirst?: boolean;
}

const AboutCard = ({
  image,
  name,
  info,
  imageAlt,
  imageFirst = true,
}: Props) => {
  const [isVisible, setIsVisible] = useState(false);
  const direction = imageFirst ? 'row' : 'row-reverse';
  const fromTranslate = imageFirst
    ? 'translate3d(-20%,0,0)'
    : 'translate3d(20%,0,0)';

  const { ref, inView } = useInView({
    /* Optional options */
    threshold: 0.3,
  });

  const [props, set] = useSpring(() => ({
    opacity: 0,
    transform: fromTranslate,
  }));

  useEffect(() => {
    if (!isVisible && inView) {
      setIsVisible(true);
      set({ opacity: 1, transform: 'translate3d(0%,0,0)' });
    }
  }, [inView, isVisible, set]);

  return (
    <animated.div style={props}>
      <Grid ref={ref} container direction={direction}>
        <Grid item xs={5}>
          <img src={image} alt={imageAlt} height="400px" />
        </Grid>
        <Grid container xs={7} lg={7}>
          <Grid item>
            <Typography variant="h2">{name}</Typography>
          </Grid>
          <Grid item>
            <Typography variant="h5">{info}</Typography>
          </Grid>
        </Grid>
      </Grid>
    </animated.div>
  );
};

export default AboutCard;
