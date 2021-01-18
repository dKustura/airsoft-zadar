import * as React from 'react';
import { useState, useCallback } from 'react';
import { useIntl, MessageDescriptor } from 'react-intl';
import { useSlate } from 'slate-react';
import { useDropzone } from 'react-dropzone';

// Components
import {
  Button,
  Dialog,
  DialogContent,
  // DialogTitle,
  Tooltip,
  Zoom,
  useMediaQuery,
  Theme,
} from '@material-ui/core';
import Dropzone from 'components/Dropzone';
import ImageIcon from '@material-ui/icons/Image';

// Helpers
import { useToolbarButtonStyles as useStyles } from './styles';
import { insertFile } from './helpers';
import messages from './messages';

interface Props {}

const ImageButton = (props: Props): JSX.Element => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const editor = useSlate();
  const intl = useIntl();
  const classes = useStyles();

  const isSmallScreen = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down('sm')
  );

  const onDropAccepted = useCallback(
    (acceptedFiles: File[]) => {
      acceptedFiles.map((file) => insertFile(editor, file));
      setIsDialogOpen(false);
    },
    [editor]
  );

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
      setIsDialogOpen(true);
    }
  }, [open, isSmallScreen]);

  const handleDialogClose = useCallback(() => {
    setIsDialogOpen(false);
  }, []);

  return (
    <>
      <Tooltip
        TransitionComponent={Zoom}
        placement="top"
        title={intl.formatMessage(messages.insertImage as MessageDescriptor)}
      >
        <Button
          {...props}
          classes={{
            root: classes.root,
          }}
          onClick={handleButtonClick}
        >
          <ImageIcon />
        </Button>
      </Tooltip>

      <input {...getInputProps()} />

      <Dialog
        fullWidth
        onClose={handleDialogClose}
        open={isDialogOpen}
        classes={{ paper: classes.dialogPaper }}
      >
        {/* <DialogTitle>Insert Image</DialogTitle> */}
        <DialogContent classes={{ root: classes.dialogContent }}>
          <Dropzone
            onDropAccepted={onDropAccepted}
            onDropRejected={onDropRejected}
          />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ImageButton;
