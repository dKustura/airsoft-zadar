import * as React from 'react';
import { useState, useEffect } from 'react';
import { useFirebase } from 'components/Firebase';

// Components
import Title from 'components/Title';
import PostCard from 'components/PostCard';

import { Container, Grid } from '@material-ui/core';
// import Background from './background';
import BackgroundWall from './backgroundWall';
import BackgroundWaves from './backgroundWaves';
import BackgroundSun from './backgroundSun';
import BackgroundLogo from './backgroundLogo';

import './index.scss';

// Helpers
import { PostWithId } from 'components/Firebase/types';

interface Props {}

const Home: React.FC<Props> = () => {
  // TODO: Use useReducer
  const [isAnimated, setIsAnimated] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isWallAnimationFinished, setIsWallAnimationFinished] = useState(false);
  const [isWavesAnimationFinished, setIsWavesAnimationFinished] = useState(
    false
  );
  const [posts, setPosts] = useState<PostWithId[]>([]);

  const firebase = useFirebase();

  useEffect(() => {
    // const isAnimated = isHovered
    //   ? true
    //   : !isWallAnimationFinished || !isWavesAnimationFinished;
    setIsAnimated(false);
  }, [isHovered, isWallAnimationFinished, isWavesAnimationFinished]);

  useEffect(() => {
    firebase.getAllPosts().then((posts) => {
      setPosts(posts);
    });
  }, [firebase]);

  const onMouseEnterBackground = () => {
    setIsHovered(true);
    setIsAnimated(false);
  };

  const onMouseLeaveBackground = () => {
    setIsWallAnimationFinished(false);
    setIsWavesAnimationFinished(false);
    setIsHovered(false);
  };

  return (
    <Container maxWidth="lg">
      <Grid container className="container">
        <Grid
          item
          className="title"
          xs={8}
          onMouseEnter={onMouseEnterBackground}
          onMouseLeave={onMouseLeaveBackground}
        >
          <Title />
        </Grid>
        <Grid item className="background parallax-level-4">
          <BackgroundSun isAnimated={isAnimated} />
        </Grid>
        <Grid
          item
          className="background parallax-level-3"
          onAnimationIteration={() => {
            setIsWallAnimationFinished(true);
          }}
        >
          <BackgroundWall isAnimated={isAnimated} />
        </Grid>
        <Grid item className="background parallax-level-2">
          <BackgroundLogo isAnimated={isAnimated} />
        </Grid>
        <Grid
          item
          onMouseEnter={onMouseEnterBackground}
          onMouseLeave={onMouseLeaveBackground}
          onAnimationIteration={() => {
            setIsWavesAnimationFinished(true);
          }}
          className="background parallax-level-1"
        >
          <BackgroundWaves isAnimated={isAnimated} />
        </Grid>
      </Grid>
      <Grid container justify="center" spacing={4}>
        {posts.map((post, index) => (
          <Grid key={`post-${index}`} item xs={12} md={8} lg={6}>
            <PostCard
              id={post.id}
              thumbnail={post.thumbnailUrl}
              title={post.title}
              content={post.content}
              lastModifiedAt={post.lastModifiedAt}
            />
          </Grid>
        ))}
        {posts.length % 2 !== 0 && <Grid item xs={12} sm={8} md={6} />}
      </Grid>
    </Container>
  );
};

export default Home;
