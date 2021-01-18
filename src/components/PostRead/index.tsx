import * as React from 'react';

// Components
import { Grid, Typography } from '@material-ui/core';
import CustomEditor from 'components/CustomEditor';
import ReadingTime from 'components/ReadingTime';

// Helpers
import { useStyles } from './styles';

interface Props {
  readonly title: string;
  readonly content: any;
}

const PostRead = ({ title, content }: Props): JSX.Element => {
  const classes = useStyles();

  return (
    <Grid container>
      <Grid item xs={12} className={classes.title}>
        <Typography className={classes.titleTypography} variant="h1">
          {title}
        </Typography>
      </Grid>
      <Grid
        container
        justify="flex-end"
        spacing={2}
        className={classes.readingTime}
      >
        <ReadingTime content={content} />
      </Grid>
      <Grid item xs={12}>
        <CustomEditor readOnly value={content} name="post" />
      </Grid>
    </Grid>
  );
};

export default PostRead;
