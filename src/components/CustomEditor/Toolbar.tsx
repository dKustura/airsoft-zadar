import React from 'react';

// Components
import { ButtonGroup } from '@material-ui/core';
import FormatBoldIcon from '@material-ui/icons/FormatBold';
import FormatItalicIcon from '@material-ui/icons/FormatItalic';
import MarkButton from './MarkButton';

interface Props {}

const Toolbar: React.FC<Props> = () => {
  return (
    <ButtonGroup color="primary" aria-label="outlined primary button group">
      <MarkButton format="bold" Icon={FormatBoldIcon} />
      <MarkButton format="italic" Icon={FormatItalicIcon} />
    </ButtonGroup>
  );
};

export default Toolbar;
