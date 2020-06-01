import React from 'react';

import { withStyles, WithStyles, Button } from '@material-ui/core';
import { thumbnailStyles as styles } from './styles';

import CameraAltIcon from '@material-ui/icons/CameraAlt';
import Skeleton from '@material-ui/lab/Skeleton';
import messages from './messages';
import { FormattedMessage } from 'react-intl';

interface Props extends WithStyles<typeof styles> {
  readonly src?: string;
  readonly onClick: () => void;
}

const Thumbnail: React.FC<Props> = ({ src, onClick, classes }) => {
  return (
    <div className={classes.card}>
      {src ? (
        <img className={classes.image} src={src} alt="thumbnail" />
      ) : (
        <Skeleton variant="rect" animation={false} className={classes.image} />
      )}
      <Button
        variant="contained"
        startIcon={<CameraAltIcon />}
        className={classes.button}
        onClick={onClick}
      >
        <FormattedMessage {...messages.uploadThumbnail} />
      </Button>
    </div>
  );
};

export default withStyles(styles)(Thumbnail);
