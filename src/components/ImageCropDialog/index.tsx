import * as React from 'react';
import { useState, useCallback } from 'react';
import { FormattedMessage } from 'react-intl';

// Components
import {
  Dialog,
  Zoom,
  DialogContent,
  DialogActions,
  Button,
} from '@material-ui/core';
import Cropper from 'react-easy-crop';

// Helpers
import { useStyles } from './styles';
import messages from './messages';
import getCroppedImage from './helpers';

// Types
import { Point, Area } from 'react-easy-crop/types';

interface Props {
  readonly isOpen: boolean;
  readonly src: string;
  readonly handleClose: () => void;
  readonly handleConfirm: (croppedImage: string) => void;
}

const CROP_ZOOM_SPEED = 1;
const CROP_ASPECT_RATIO = 16 / 9;

const ImageCropDialog = ({
  isOpen,
  src,
  handleClose,
  handleConfirm,
}: Props): JSX.Element => {
  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
  const [rotation, setRotation] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
  const classes = useStyles();

  const onCropComplete = useCallback((_: Area, croppedAreaPixels: Area) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const createCroppedImage = useCallback(async () => {
    if (croppedAreaPixels) {
      try {
        const croppedImage = await getCroppedImage(
          src,
          croppedAreaPixels,
          rotation
        );
        return croppedImage;
      } catch (e) {
        console.error(e);
      }
    }
  }, [src, croppedAreaPixels, rotation]);

  // TODO: display a loading indicator while processing image
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
          image={src}
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

export default ImageCropDialog;
