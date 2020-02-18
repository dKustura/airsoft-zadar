import React from 'react';

import { MenuItem, Button, Tooltip } from '@material-ui/core';
import DropdownMenu from 'components/DropdownMenu';

import FormatSizeIcon from '@material-ui/icons/FormatSize';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

// Styling
import { withStyles, WithStyles } from '@material-ui/core/styles';
import { toolbarButtonStyles as styles } from './styles';

interface Props extends WithStyles<typeof styles> {}

const DropdownStylingButton: React.FC<Props> = ({
  classes,
  ...buttonProps
}) => {
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
      <MenuItem>Huge</MenuItem>
      <MenuItem>Normal</MenuItem>
      <MenuItem>Small </MenuItem>
    </DropdownMenu>
  );
};

export default withStyles(styles)(DropdownStylingButton);
