import React from 'react';

// Components
import { Paper, Divider } from '@material-ui/core';
import MarkToggleButton from './MarkToggleButton';
import MarksRemoveButton from './MarksRemoveButton';
import StyledToggleButtonGroup from './StyledToggleButtonGroup';
import DropdownStylingButton from './DropdownStylingButton';
import HyperlinkButton from './HyperlinkButton';

// Icons
import FormatBoldIcon from '@material-ui/icons/FormatBold';
import FormatItalicIcon from '@material-ui/icons/FormatItalic';
import FormatUnderlinedIcon from '@material-ui/icons/FormatUnderlined';
import FormatStrikethroughIcon from '@material-ui/icons/FormatStrikethrough';

// Helpers
import { MarkFormat } from './helpers';

// Styling
import { withStyles, WithStyles } from '@material-ui/core/styles';
import { toolbarStyles as styles } from './styles';

interface Props extends WithStyles<typeof styles> {}

const Toolbar: React.FC<Props> = ({ classes }) => {
  return (
    <Paper elevation={0} className={classes.paper}>
      <StyledToggleButtonGroup>
        <MarkToggleButton
          format={MarkFormat.Bold}
          Icon={FormatBoldIcon}
          tooltip="Bold (Ctrl-B)"
        />
        <MarkToggleButton
          format={MarkFormat.Italic}
          Icon={FormatItalicIcon}
          tooltip="Italic (CTRL-I)"
        />
        <MarkToggleButton
          format={MarkFormat.Underline}
          Icon={FormatUnderlinedIcon}
          tooltip="Underline (Ctrl-U)"
        />
        <MarkToggleButton
          format={MarkFormat.Strikethrough}
          Icon={FormatStrikethroughIcon}
          tooltip="Strikethrough"
        />
      </StyledToggleButtonGroup>
      <Divider orientation="vertical" className={classes.divider} />
      <StyledToggleButtonGroup>
        <MarksRemoveButton />
        <DropdownStylingButton />
        <HyperlinkButton />
      </StyledToggleButtonGroup>
    </Paper>
  );
};

export default withStyles(styles)(Toolbar);
