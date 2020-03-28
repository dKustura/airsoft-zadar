import React, { useState } from 'react';

// Components
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Tooltip,
  Zoom,
} from '@material-ui/core';
import ImageIcon from '@material-ui/icons/Image';

// Styling
import { withStyles, WithStyles } from '@material-ui/core/styles';
import { toolbarButtonStyles as styles } from './styles';

interface Props extends WithStyles<typeof styles> {}

const ImageButton: React.FC<Props> = ({ classes, ...buttonProps }: Props) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleButtonClick = () => {
    setIsDialogOpen(true);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
  };

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

      <Dialog onClose={handleDialogClose} open={isDialogOpen}>
        <DialogTitle>Insert Image</DialogTitle>
        <DialogContent>{/* TODO: Add file dropdown component */}</DialogContent>
      </Dialog>
    </>
  );
};

export default withStyles(styles)(ImageButton);
