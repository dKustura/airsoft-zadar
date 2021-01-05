import * as React from 'react';
import { useMemo } from 'react';
import readingTime from 'reading-time';
import { Node } from 'slate';

// Components
import { Grid, Typography } from '@material-ui/core';
import MenuBookIcon from '@material-ui/icons/MenuBook';

// Helpers
import { getAllNodesText } from 'helpers/editor';

interface Props {
  readonly content: Node[];
}

const ReadingTime = ({ content }: Props) => {
  const contentText = useMemo(() => getAllNodesText(content), [content]);
  const readingDuration = useMemo(() => readingTime(contentText), [
    contentText,
  ]);

  return (
    <>
      <Grid item>
        <Typography variant="subtitle1">
          <MenuBookIcon />
        </Typography>
      </Grid>
      <Grid item>
        <Typography variant="subtitle1">{readingDuration.text}</Typography>
      </Grid>
    </>
  );
};

export default ReadingTime;
