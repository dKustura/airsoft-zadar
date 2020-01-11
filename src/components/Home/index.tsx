import React from 'react';

// Components
import Title from 'components/Title';
import PostCard from 'components/PostCard';

import { withStyles, WithStyles, Container, Grid } from '@material-ui/core';
import styles from './styles';

interface Props extends WithStyles<typeof styles> {}

const Home: React.FC<Props> = ({ classes }) => {
  return (
    <Container maxWidth="md">
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Title />
        </Grid>
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
