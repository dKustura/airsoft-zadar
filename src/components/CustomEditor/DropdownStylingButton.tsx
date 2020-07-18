import * as React from 'react';
import { useSlate } from 'slate-react';
import { useIntl, MessageDescriptor, FormattedMessage } from 'react-intl';

// Components
import { MenuItem, Button, Tooltip, Typography, Zoom } from '@material-ui/core';
import DropdownMenu from 'components/DropdownMenu';
import FormatSizeIcon from '@material-ui/icons/FormatSize';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

// Helpers
import { useToolbarButtonStyles as useStyles } from './styles';
import { BlockFormat, toggleBlock } from './helpers';
import messages from './messages';

interface Props {}

const DropdownStylingButton: React.FC<Props> = (props) => {
  const editor = useSlate();
  const intl = useIntl();
  const classes = useStyles();

  const dropdownButton = (
    <Tooltip
      TransitionComponent={Zoom}
      placement="top"
      title={intl.formatMessage(messages.fontSize as MessageDescriptor)}
    >
      <Button
        {...props}
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
        <Typography variant="h2">
          <FormattedMessage {...messages.dropdownStylingButtonTitle} />
        </Typography>
      </MenuItem>
      <MenuItem onClick={() => toggleBlock(editor, BlockFormat.Subheader)}>
        <Typography variant="h4">
          <FormattedMessage {...messages.dropdownStylingButtonSubtitle} />
        </Typography>
      </MenuItem>
      <MenuItem onClick={() => toggleBlock(editor, BlockFormat.Paragraph)}>
        <Typography>
          <FormattedMessage {...messages.dropdownStylingButtonParagraph} />
        </Typography>
      </MenuItem>
    </DropdownMenu>
  );
};

export default DropdownStylingButton;
