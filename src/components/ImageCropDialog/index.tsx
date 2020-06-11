import * as React from 'react';
import { useState, useCallback } from 'react';
import { FormattedMessage } from 'react-intl';

// Components
import {
  Dialog,
  Zoom,
  WithStyles,
  withStyles,
  DialogContent,
  DialogActions,
  Button,
} from '@material-ui/core';
import Cropper from 'react-easy-crop';

// Styling
import styles from './styles';

// Helpers
import messages from './messages';
import getCroppedImage from './helpers';

// Types
import { Point, Area } from 'react-easy-crop/types';

interface Props extends WithStyles<typeof styles> {
  readonly isOpen: boolean;
  // readonly src: string;
  readonly handleClose: () => void;
  readonly handleConfirm: (croppedImage: string) => void;
}

const imageUrl =
  'https://images.unsplash.com/photo-1590574508715-ed8fa0346f92?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80';

const CROP_ZOOM_SPEED = 5;
const CROP_ASPECT_RATIO = 16 / 9;

const ImageCropDialog: React.FC<Props> = ({
  isOpen,
  // src,
  handleClose,
  handleConfirm,
  classes,
}) => {
  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
  const [rotation, setRotation] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);

  const onCropComplete = useCallback((_: Area, croppedAreaPixels: Area) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const createCroppedImage = useCallback(async () => {
    if (croppedAreaPixels) {
      try {
        const croppedImage = await getCroppedImage(
          imageUrl,
          croppedAreaPixels,
          rotation
        );
        return croppedImage;
      } catch (e) {
        console.error(e);
      }
    }
  }, [croppedAreaPixels, rotation]);

  const onConfirm = useCallback(() => {
    createCroppedImage().then((image) => {
      if (image) {
        handleConfirm(image);
      }
    });
  }, [createCroppedImage, handleConfirm]);

  return (
    <Dialog
      open={isOpen}
      TransitionComponent={Zoom}
      keepMounted
      onClose={handleClose}
      classes={{ paper: classes.dialog }}
      maxWidth="md"
      fullWidth
    >
      <DialogContent className={classes.cropContainer}>
        <Cropper
          image={imageUrl}
          crop={crop}
          rotation={rotation}
          zoom={zoom}
          aspect={CROP_ASPECT_RATIO}
          onCropChange={setCrop}
          onRotationChange={setRotation}
          onCropComplete={onCropComplete}
          onZoomChange={setZoom}
          zoomSpeed={CROP_ZOOM_SPEED}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onConfirm} variant="outlined" color="primary">
          <FormattedMessage {...messages.confirm} />
        </Button>
        <Button
          onClick={handleClose}
          variant="outlined"
          className={classes.cancelButton}
        >
          <FormattedMessage {...messages.cancel} />
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default withStyles(styles)(ImageCropDialog);