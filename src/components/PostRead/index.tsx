import * as React from 'react';

// Components
import { Grid, Typography } from '@material-ui/core';
import CustomEditor from 'components/CustomEditor';

// Styling
import { withStyles, WithStyles } from '@material-ui/core/styles';
import styles from './styles';

interface Props extends WithStyles<typeof styles> {
  readonly title: string;
  readonly content: any;
}

const PostRead: React.FC<Props> = ({ title, content, classes }) => {
  return (
    <Grid container>
      <Grid item xs={12} className={classes.title}>
        <Typography className={classes.titleTypography} variant="h1">
          {title}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <CustomEditor readOnly value={content} name="post" />
      </Grid>
    </Grid>
  );
};

export default withStyles(styles)(PostRead);
