import * as React from 'react';

// Components
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import {
  Typography,
  Grid,
  withStyles,
  WithStyles,
  Link,
} from '@material-ui/core';

// Helpers
import { Routes } from 'helpers/constants';

// Styling
import styles from './styles';
import { MaterialRouterLink } from 'helpers';

interface Props extends WithStyles<typeof styles> {
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
  classes,
}) => {
  return (
    <Link component={MaterialRouterLink} to={`${Routes.POST}/${id}`}>
      <Card className={classes.card}>
        <CardContent>
          <Grid
            container
            alignItems="center"
            direction="column"
            spacing={1}
            className={classes.cardContent}
          >
            {thumbnail && (
              <Grid item>
                <img
                  src={thumbnail}
                  alt="thumbnail"
                  className={classes.cardThumbnail}
                />
              </Grid>
            )}
            <Grid item>
              <Typography variant="h4">{title}</Typography>
            </Grid>
            <Grid item>
              <Typography variant="body2">{content}</Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Link>
  );
};

export default withStyles(styles)(PostCard);
