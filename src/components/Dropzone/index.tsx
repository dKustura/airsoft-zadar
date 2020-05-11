import * as React from 'react';
import { useDropzone, DropEvent } from 'react-dropzone';

// Components
import { Button, Grid, Typography } from '@material-ui/core';

// i18n
import { FormattedMessage } from 'react-intl';
import messages from './messages';

// Styling
import { withStyles, WithStyles } from '@material-ui/core/styles';
import styles from './styles';

interface Props extends WithStyles<typeof styles> {
  readonly onDropAccepted?: <T extends File>(
    files: T[],
    event: DropEvent
  ) => void;
  readonly onDropRejected?: <T extends File>(
    files: T[],
    event: DropEvent
  ) => void;
}

const Dropzone: React.FC<Props> = ({
  onDropAccepted,
  onDropRejected,
  classes,
}) => {
  const { getRootProps, getInputProps, open } = useDropzone({
    accept: 'image/*',
    onDropAccepted,
    onDropRejected,
  });

  return (
    <>
      <Grid
        {...getRootProps({
          className: classes.dropzone,
          container: true,
          alignItems: 'center',
          direction: 'column',
        })}
      >
        <input {...getInputProps()} />
        <Grid item className={classes.padding}>
          <Typography variant="h6">
            <FormattedMessage {...messages.dragNDropImagesHere} />
          </Typography>
        </Grid>
        <Grid item>
          <Typography>
            <FormattedMessage {...messages.or} />
          </Typography>
        </Grid>
        <Grid item className={classes.padding}>
          <Button
            variant="contained"
            color="primary"
            onClick={open}
            style={{ textTransform: 'none' }}
          >
            <FormattedMessage {...messages.chooseImages} />
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default withStyles(styles)(Dropzone);
