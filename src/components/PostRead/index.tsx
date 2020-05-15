import * as React from 'react';

// Components
import { Grid, Typography } from '@material-ui/core';
import CustomEditor from 'components/CustomEditor';

interface Props {
  readonly title: string;
  readonly content: any;
}

const PostRead: React.FC<Props> = ({ title, content }) => {
  return (
    <Grid container>
      <Grid item xs={12}>
        <Typography variant="h1">{title}</Typography>
      </Grid>
      <Grid item xs={12}>
        <CustomEditor readOnly value={content} name="post" />
      </Grid>
    </Grid>
  );
};

export default PostRead;
