import React from 'react';
import { useSlate } from 'slate-react';

// Components
import {
  MenuItem,
  Button,
  Tooltip,
  TextField,
  IconButton,
  InputAdornment,
} from '@material-ui/core';
import DropdownMenu from 'components/DropdownMenu';
import LinkIcon from '@material-ui/icons/Link';
import CloseIcon from '@material-ui/icons/Close';

// Styling
import { withStyles, WithStyles } from '@material-ui/core/styles';
import { toolbarButtonStyles as styles } from './styles';

// Helpers
import { MarkFormat, toggleMark } from './helpers';

interface Props extends WithStyles<typeof styles> {}

const HyperlinkButton: React.FC<Props> = ({ classes, ...buttonProps }) => {
  const editor = useSlate();

  const menuButton = (
    <Tooltip placement="top" title="Hyperlink">
      <Button
        {...buttonProps}
        classes={{
          root: classes.root,
        }}
      >
        <LinkIcon />
      </Button>
    </Tooltip>
  );

  return (
    <DropdownMenu menuButton={menuButton} wrapInMenuList={false}>
      <TextField
        autoFocus
        variant="outlined"
        InputProps={{
          classes: { root: classes.dropdownTextfieldInput },
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="insert link"
                onClick={() => null}
                edge="end"
              >
                <CloseIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      ></TextField>
    </DropdownMenu>
  );
};

export default withStyles(styles)(HyperlinkButton);
