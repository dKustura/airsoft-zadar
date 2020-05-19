import * as React from 'react';
import { useState, useCallback } from 'react';
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

// Styling
import { withStyles, WithStyles } from '@material-ui/core/styles';
import { toolbarButtonStyles as styles } from './styles';
import { insertFile } from './helpers';

interface Props extends WithStyles<typeof styles> {}

const ImageButton: React.FC<Props> = ({ classes, ...buttonProps }: Props) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const editor = useSlate();
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
      <Tooltip TransitionComponent={Zoom} placement="top" title="Insert Image">
        <Button
          {...buttonProps}
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

export default withStyles(styles)(ImageButton);
