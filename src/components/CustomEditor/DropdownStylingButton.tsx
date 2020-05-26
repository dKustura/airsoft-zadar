import * as React from 'react';
import { useSlate } from 'slate-react';
import { useIntl, MessageDescriptor, FormattedMessage } from 'react-intl';

// Components
import { MenuItem, Button, Tooltip, Typography, Zoom } from '@material-ui/core';
import DropdownMenu from 'components/DropdownMenu';
import FormatSizeIcon from '@material-ui/icons/FormatSize';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

// Styling
import { withStyles, WithStyles } from '@material-ui/core/styles';
import { toolbarButtonStyles as styles } from './styles';

// Helpers
import { BlockFormat, toggleBlock } from './helpers';
import messages from './messages';

interface Props extends WithStyles<typeof styles> {}

const DropdownStylingButton: React.FC<Props> = ({
  classes,
  ...buttonProps
}) => {
  const editor = useSlate();
  const intl = useIntl();

  const dropdownButton = (
    <Tooltip
      TransitionComponent={Zoom}
      placement="top"
      title={intl.formatMessage(messages.fontSize as MessageDescriptor)}
    >
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

export default withStyles(styles)(DropdownStylingButton);
