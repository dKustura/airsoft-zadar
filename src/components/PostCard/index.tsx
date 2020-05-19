import * as React from 'react';

// Components
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { Typography, Grid, withStyles, WithStyles } from '@material-ui/core';

// Styling
import styles from './styles';

interface Props extends WithStyles<typeof styles> {
  readonly title: string;
  readonly content: string;
  readonly dateCreated: Date;
}

const PostCard: React.FC<Props> = ({
  title,
  content,
  dateCreated,
  classes,
}) => {
  return (
    <Card className={classes.card}>
      <CardContent>
        <Grid
          container
          direction="column"
          spacing={1}
          className={classes.cardContent}
        >
          <Grid item>
            <Typography variant="h5">{title}</Typography>
          </Grid>
          <Grid item>
            <Typography variant="body2">{content}</Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default withStyles(styles)(PostCard);
