import * as React from 'react';
import { useState, useCallback, useEffect } from 'react';
import { FormattedMessage } from 'react-intl';
import { useDropzone } from 'react-dropzone';

// Components
import {
  Button,
  Dialog,
  DialogContent,
  useMediaQuery,
  Theme,
} from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';
import ImageCropDialog from 'components/ImageCropDialog';
import Dropzone from 'components/Dropzone';
import CameraAltIcon from '@material-ui/icons/CameraAlt';

// Styling
import { withStyles, WithStyles } from '@material-ui/core/styles';
import { thumbnailStyles as styles } from './styles';

// Helpers
import messages from './messages';

interface Props extends WithStyles<typeof styles> {
  readonly src?: string;
  readonly onSelection: (imageSrc: string) => void;
  readonly shouldCloseDialogs?: boolean;
}

const Thumbnail = ({
  src,
  onSelection,
  classes,
  shouldCloseDialogs,
}: Props): JSX.Element => {
  const [isDropzoneDialogOpen, setIsDropzoneDialogOpen] = useState(false);
  const [isCropDialogOpen, setIsCropDialogOpen] = useState(false);
  const [image, setImage] = useState(src);

  useEffect(() => {
    if (shouldCloseDialogs) {
      setIsDropzoneDialogOpen(false);
      setIsCropDialogOpen(false);
    }
  }, [shouldCloseDialogs]);

  const isSmallScreen = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down('sm')
  );

  const onDropAccepted = useCallback((acceptedFiles: File[]) => {
    // TODO: handle else case
    if (acceptedFiles && acceptedFiles.length) {
      const selectedImageUrl = URL.createObjectURL(acceptedFiles[0]);
      setImage(selectedImageUrl);
    }
    setIsDropzoneDialogOpen(false);
    setIsCropDialogOpen(true);
  }, []);

  // TODO: implement
  const onDropRejected = useCallback(() => {}, []);

  const { open, getInputProps } = useDropzone({
    accept: 'image/*',
    onDropAccepted,
    onDropRejected,
  });

  // When app is rendered on a small screen the drag'n'drop dialog is not shown
  const handleButtonClick = useCallback(() => {
    if (isSmallScreen) {
      open();
    } else {
      setIsDropzoneDialogOpen(true);
    }
  }, [open, isSmallScreen]);

  const handleDropzoneDialogClose = useCallback(() => {
    setIsDropzoneDialogOpen(false);
  }, []);

  const handleCropConfirm = useCallback(
    (imageSrc: string) => {
      setIsCropDialogOpen(false);
      onSelection(imageSrc);
    },
    [onSelection]
  );

  const handleCropExit = useCallback(() => {
    setIsCropDialogOpen(false);
  }, []);

  return (
    <>
      <div className={classes.card}>
        {src ? (
          <img className={classes.image} src={src} alt="thumbnail" />
        ) : (
          <Skeleton
            variant="rect"
            animation={false}
            className={classes.image}
          />
        )}
        <Button
          variant="contained"
          startIcon={<CameraAltIcon />}
          className={classes.button}
          onClick={handleButtonClick}
        >
          <FormattedMessage {...messages.uploadThumbnail} />
        </Button>
      </div>

      {image && (
        <ImageCropDialog
          src={image}
          isOpen={isCropDialogOpen}
          handleConfirm={handleCropConfirm}
          handleClose={handleCropExit}
        />
      )}

      <input {...getInputProps()} />

      <Dialog
        fullWidth
        onClose={handleDropzoneDialogClose}
        open={isDropzoneDialogOpen}
        classes={{ paper: classes.dropzoneDialogPaper }}
      >
        <DialogContent classes={{ root: classes.dropzoneDialogContent }}>
          <Dropzone
            onDropAccepted={onDropAccepted}
            onDropRejected={onDropRejected}
            multiple={false}
          />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default withStyles(styles)(Thumbnail);
