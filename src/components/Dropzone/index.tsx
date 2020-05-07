import React from 'react';
import { useDropzone } from 'react-dropzone';

// Components
import { Button, Grid, Typography } from '@material-ui/core';

// i18n
import { FormattedMessage } from 'react-intl';
import messages from './messages';

// Styling
import { withStyles, WithStyles } from '@material-ui/core/styles';
import styles from './styles';

interface Props extends WithStyles<typeof styles> {}

const Dropzone: React.FC<Props> = ({ classes }) => {
  const {
    // acceptedFiles,
    getRootProps,
    getInputProps,
    open,
  } = useDropzone();

  // const files = acceptedFiles.map(file => {
  //   console.log('file', file);
  //   return (
  //     <li key={file.name}>
  //       {file.name} - {file.size} bytes
  //     </li>
  //   );
  // });

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
        {/* <Grid
        container
        direction="column"
        alignItems="center"
        justify="center"
        className={classes.dropzone}
        {...getRootProps()}
      > */}
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
      {/* <ul>{files}</ul> */}
    </>
  );
};

export default withStyles(styles)(Dropzone);
