import * as React from 'react';
import { useState, useEffect } from 'react';

// Components
import Title from 'components/Title';
import PostCard from 'components/PostCard';

import {
  withStyles,
  WithStyles,
  Container,
  Grid,
  Typography,
} from '@material-ui/core';
import styles from './styles';
import Background from './background';
import './index.scss';
import { animationNames } from './constants';

interface Props extends WithStyles<typeof styles> {}

const Home: React.FC<Props> = ({ classes }) => {
  // TODO: Use useReducer
  const [isAnimated, setIsAnimated] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isWallAnimationFinished, setIsWallAnimationFinished] = useState(false);
  const [isWavesAnimationFinished, setIsWavesAnimationFinished] = useState(
    false
  );

  useEffect(() => {
    const isAnimated = isHovered
      ? true
      : !isWallAnimationFinished || !isWavesAnimationFinished;
    setIsAnimated(isAnimated);
  }, [isHovered, isWallAnimationFinished, isWavesAnimationFinished]);

  return (
    <Container maxWidth="md">
      <Grid container className="container">
        <Grid item className="title" xs={8}>
          <Title />
        </Grid>
        <Grid
          item
          onMouseEnter={() => {
            setIsHovered(true);
            setIsAnimated(true);
          }}
          onMouseLeave={() => {
            setIsWallAnimationFinished(false);
            setIsWavesAnimationFinished(false);
            setIsHovered(false);
          }}
          onAnimationIteration={(event) => {
            const { animationName } = event;
            if (animationName === animationNames.wall) {
              setIsWallAnimationFinished(true);
            } else if (animationName === animationNames.waves) {
              setIsWavesAnimationFinished(true);
            }
          }}
          className="background"
        >
          <Background isAnimated={false} />
        </Grid>
      </Grid>
      <Grid container spacing={1}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <PostCard
              title="Naslov"
              content="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam diam lectus, sagittis a blandit eu, sollicitudin id nisi. Quisque at ante tellus. Donec faucibus feugiat blandit. Morbi scelerisque, magna at vehicula lacinia, ex nunc euismod dui, a venenatis massa massa id odio. Mauris nec gravida neque. Suspendisse accumsan pellentesque eros a efficitur. Praesent ullamcorper neque sed arcu fermentum blandit. Phasellus posuere pulvinar nunc vitae scelerisque. Phasellus luctus diam et dolor porttitor vehicula. Sed non ultrices leo."
              dateCreated={new Date()}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <PostCard
              title="Naslov"
              content="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam diam lectus, sagittis a blandit eu, sollicitudin id nisi. Quisque at ante tellus. Donec faucibus feugiat blandit. Morbi scelerisque, magna at vehicula lacinia, ex nunc euismod dui, a venenatis massa massa id odio. Mauris nec gravida neque. Suspendisse accumsan pellentesque eros a efficitur. Praesent ullamcorper neque sed arcu fermentum blandit. Phasellus posuere pulvinar nunc vitae scelerisque. Phasellus luctus diam et dolor porttitor vehicula. Sed non ultrices leo."
              dateCreated={new Date()}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <PostCard
              title="Naslov"
              content="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam diam lectus, sagittis a blandit eu, sollicitudin id nisi. Quisque at ante tellus. Donec faucibus feugiat blandit. Morbi scelerisque, magna at vehicula lacinia, ex nunc euismod dui, a venenatis massa massa id odio. Mauris nec gravida neque. Suspendisse accumsan pellentesque eros a efficitur. Praesent ullamcorper neque sed arcu fermentum blandit. Phasellus posuere pulvinar nunc vitae scelerisque. Phasellus luctus diam et dolor porttitor vehicula. Sed non ultrices leo."
              dateCreated={new Date()}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <PostCard
              title="Naslov"
              content="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam diam lectus, sagittis a blandit eu, sollicitudin id nisi. Quisque at ante tellus. Donec faucibus feugiat blandit. Morbi scelerisque, magna at vehicula lacinia, ex nunc euismod dui, a venenatis massa massa id odio. Mauris nec gravida neque. Suspendisse accumsan pellentesque eros a efficitur. Praesent ullamcorper neque sed arcu fermentum blandit. Phasellus posuere pulvinar nunc vitae scelerisque. Phasellus luctus diam et dolor porttitor vehicula. Sed non ultrices leo."
              dateCreated={new Date()}
            />
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default withStyles(styles)(Home);
