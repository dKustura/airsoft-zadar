import React, { useEffect, useState } from 'react';
import { FormattedMessage, MessageDescriptor } from 'react-intl';
import { animated, useSpring } from 'react-spring';
import { useInView } from 'react-intersection-observer';
import { Grid, Typography } from '@material-ui/core';

interface Props {
  readonly image: string;
  readonly name: string;
  readonly info: MessageDescriptor;
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
        <Grid container item xs={12} sm={5} md={6} justify="center">
          <Grid item>
            <img src={image} alt={imageAlt} height="400px" />
          </Grid>
        </Grid>
        <Grid container item xs={12} sm={7} md={6} justify="center">
          <Grid item xs={12}>
            <Grid container justify="center">
              <Typography variant="h2">{name}</Typography>
            </Grid>
          </Grid>
          <Grid item>
            <Typography variant="h5">
              <FormattedMessage {...info} />
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </animated.div>
  );
};

export default AboutCard;
