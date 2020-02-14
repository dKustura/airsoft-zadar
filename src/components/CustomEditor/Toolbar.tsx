import React from 'react';

// Components
import { ButtonGroup } from '@material-ui/core';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import MarkButton from './MarkButton';
import MarkToggleButton from './MarkToggleButton';

// Icons
import FormatBoldIcon from '@material-ui/icons/FormatBold';
import FormatItalicIcon from '@material-ui/icons/FormatItalic';
import FormatUnderlinedIcon from '@material-ui/icons/FormatUnderlined';
import FormatStrikethroughIcon from '@material-ui/icons/FormatStrikethrough';

// Helpers
import { MarkFormat } from './helpers';

interface Props {}

const Toolbar: React.FC<Props> = () => {
  return (
    <>
      <ButtonGroup color="primary" aria-label="outlined primary button group">
        <MarkButton format={MarkFormat.Bold} Icon={FormatBoldIcon} />
        <MarkButton format={MarkFormat.Italic} Icon={FormatItalicIcon} />
        <MarkButton format={MarkFormat.Underline} Icon={FormatUnderlinedIcon} />
        <MarkButton
          format={MarkFormat.Linetrough}
          Icon={FormatStrikethroughIcon}
        />
      </ButtonGroup>
      <ToggleButtonGroup>
        <MarkToggleButton format={MarkFormat.Bold} Icon={FormatBoldIcon} />
        <MarkToggleButton format={MarkFormat.Italic} Icon={FormatItalicIcon} />
        <MarkToggleButton
          format={MarkFormat.Underline}
          Icon={FormatUnderlinedIcon}
        />
        <MarkToggleButton
          format={MarkFormat.Linetrough}
          Icon={FormatStrikethroughIcon}
        />
      </ToggleButtonGroup>
    </>
  );
};

export default Toolbar;
