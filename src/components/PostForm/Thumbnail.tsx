import React from 'react';

import { withStyles, WithStyles } from '@material-ui/core';
import { thumbnailStyles as styles } from './styles';

interface Props extends WithStyles<typeof styles> {
  readonly src?: string;
}

const Thumbnail: React.FC<Props> = ({ src, classes }) => {
  return (
    <div className={classes.card}>
      {src && <img className={classes.image} src={src} alt="thumbnail" />}
    </div>
  );
};

export default withStyles(styles)(Thumbnail);
