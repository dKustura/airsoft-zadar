import React from 'react';
import { useSlate } from 'slate-react';

// Components
import { MenuItem, Button, Tooltip, Typography } from '@material-ui/core';
import DropdownMenu from 'components/DropdownMenu';
import FormatSizeIcon from '@material-ui/icons/FormatSize';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

// Styling
import { withStyles, WithStyles } from '@material-ui/core/styles';
import { toolbarButtonStyles as styles } from './styles';

// Helpers
import { BlockFormat, toggleBlock } from './helpers';

interface Props extends WithStyles<typeof styles> {}

const DropdownStylingButton: React.FC<Props> = ({
  classes,
  ...buttonProps
}) => {
  const editor = useSlate();

  const dropdownButton = (
    <Tooltip placement="top" title="Font size">
      <Button
        {...buttonProps}
        classes={{
          root: classes.root,
        }}
      >
        <FormatSizeIcon />
        <ArrowDropDownIcon />
      </Button>
    </Tooltip>
  );

  return (
    <DropdownMenu menuButton={dropdownButton}>
      <MenuItem onClick={() => toggleBlock(editor, BlockFormat.Header)}>
        <Typography variant="h2">Title</Typography>
      </MenuItem>
      <MenuItem onClick={() => toggleBlock(editor, BlockFormat.Subheader)}>
        <Typography variant="h4">Subtitle</Typography>
      </MenuItem>
      <MenuItem onClick={() => toggleBlock(editor, BlockFormat.Paragraph)}>
        <Typography>Paragraph</Typography>
      </MenuItem>
    </DropdownMenu>
  );
};

export default withStyles(styles)(DropdownStylingButton);
