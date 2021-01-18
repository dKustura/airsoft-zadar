import * as React from 'react';

// Components
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Zoom,
  Button,
} from '@material-ui/core';

// Helpers
import { useStyles } from './styles';

interface Props {
  readonly isOpen: boolean;
  readonly title: string;
  readonly description: string;
  readonly cancelLabel: string;
  readonly confirmLabel: string;
  readonly handleClose: () => void;
  readonly handleConfirm: () => void;
}

const PopupDialog = ({
  isOpen,
  title,
  description,
  handleClose,
  handleConfirm,
  cancelLabel,
  confirmLabel,
}: Props): JSX.Element => {
  const classes = useStyles();

  return (
    <Dialog
      open={isOpen}
      TransitionComponent={Zoom}
      keepMounted
      onClose={handleClose}
      aria-labelledby="popup-dialog-title"
      aria-describedby="popup-dialog-description"
      classes={{ paper: classes.dialog }}
      maxWidth="xs"
    >
      <DialogTitle id="popup-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="popup-dialog-description">
          {description}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleConfirm} variant="outlined" color="primary">
          {confirmLabel}
        </Button>
        <Button
          onClick={handleClose}
          variant="outlined"
          className={classes.cancelButton}
        >
          {cancelLabel}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PopupDialog;
