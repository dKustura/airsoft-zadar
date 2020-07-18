import * as React from 'react';

// Components
import { Typography, Grid, Link } from '@material-ui/core';

// Helpers
import { Routes } from 'helpers/constants';

// Styling
import { useStyles } from './styles';
import { MaterialRouterLink } from 'helpers';

interface Props {
  readonly id: string;
  readonly thumbnail?: string;
  readonly title: string;
  readonly content: string;
  readonly dateCreated: Date;
}

const PostCard: React.FC<Props> = ({
  id,
  thumbnail,
  title,
  content,
  dateCreated,
}) => {
  const classes = useStyles();

  return (
    <Link component={MaterialRouterLink} to={`${Routes.POST}/${id}`}>
      <Grid container className={classes.card}>
        <Grid
          container
          justify="flex-end"
          alignItems="flex-end"
          className={classes.titleContainer}
        >
          <Grid item style={{ padding: 20 }}>
            <Typography variant="h4">{title}</Typography>
          </Grid>
        </Grid>
        {thumbnail && (
          <div className={classes.thumbnailContainer}>
            <img
              src={thumbnail}
              alt="thumbnail"
              className={classes.thumbnailImage}
            />
          </div>
        )}
      </Grid>
    </Link>
  );
};

export default PostCard;
