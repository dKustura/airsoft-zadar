import * as React from 'react';
import { useIntl, MessageDescriptor } from 'react-intl';
import { useSlate } from 'slate-react';

// Components
import { Paper, Divider } from '@material-ui/core';
import MarkToggleButton from './MarkToggleButton';
import MarksRemoveButton from './MarksRemoveButton';
import StyledToggleButtonGroup from './StyledToggleButtonGroup';
import DropdownStylingButton from './DropdownStylingButton';
import HyperlinkButton from './HyperlinkButton';
import ImageButton from './ImageButton';

// Icons
import FormatBoldIcon from '@material-ui/icons/FormatBold';
import FormatItalicIcon from '@material-ui/icons/FormatItalic';
import FormatUnderlinedIcon from '@material-ui/icons/FormatUnderlined';
import FormatStrikethroughIcon from '@material-ui/icons/FormatStrikethrough';
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';
import FormatListNumberedIcon from '@material-ui/icons/FormatListNumbered';
import FormatQuoteIcon from '@material-ui/icons/FormatQuote';

// Helpers
import { useToolbarStyles as useStyles } from './styles';
import { MarkFormat, BlockFormat } from './helpers';
import BlockToggleButton from './BlockToggleButton';
import messages from './messages';

const Toolbar = (): JSX.Element => {
  const editor = useSlate();
  const intl = useIntl();
  const classes = useStyles();

  const selectionLength = editor.selection
    ? Math.abs(editor.selection.anchor.offset - editor.selection.focus.offset)
    : 0;

  return (
    <Paper elevation={0} className={classes.paper}>
      <StyledToggleButtonGroup>
        <MarkToggleButton
          format={MarkFormat.Bold}
          Icon={FormatBoldIcon}
          tooltip={intl.formatMessage(
            messages.toolbarBold as MessageDescriptor
          )}
        />
        <MarkToggleButton
          format={MarkFormat.Italic}
          Icon={FormatItalicIcon}
          tooltip={intl.formatMessage(
            messages.toolbarItalic as MessageDescriptor
          )}
        />
        <MarkToggleButton
          format={MarkFormat.Underline}
          Icon={FormatUnderlinedIcon}
          tooltip={intl.formatMessage(
            messages.toolbarUnderline as MessageDescriptor
          )}
        />
        <MarkToggleButton
          format={MarkFormat.Strikethrough}
          Icon={FormatStrikethroughIcon}
          tooltip={intl.formatMessage(
            messages.toolbarStrikethrough as MessageDescriptor
          )}
        />
      </StyledToggleButtonGroup>
      <Divider orientation="vertical" className={classes.divider} />
      <StyledToggleButtonGroup>
        <MarksRemoveButton />
        <DropdownStylingButton />
        <HyperlinkButton disabled={selectionLength === 0} />
        <ImageButton />
      </StyledToggleButtonGroup>
      <Divider orientation="vertical" className={classes.divider} />
      <StyledToggleButtonGroup>
        <BlockToggleButton
          format={BlockFormat.BulletedList}
          Icon={FormatListBulletedIcon}
          tooltip={intl.formatMessage(
            messages.toolbarUnorderedList as MessageDescriptor
          )}
        />
        <BlockToggleButton
          format={BlockFormat.NumberedList}
          Icon={FormatListNumberedIcon}
          tooltip={intl.formatMessage(
            messages.toolbarOrderedList as MessageDescriptor
          )}
        />
        <BlockToggleButton
          format={BlockFormat.Quote}
          Icon={FormatQuoteIcon}
          tooltip={intl.formatMessage(
            messages.toolbarBlockQuote as MessageDescriptor
          )}
        />
      </StyledToggleButtonGroup>
    </Paper>
  );
};

export default Toolbar;
