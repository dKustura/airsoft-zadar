import React from 'react';

// Components
import { ButtonGroup, Button } from '@material-ui/core';
import FormatBoldIcon from '@material-ui/icons/FormatBold';
import FormatItalicIcon from '@material-ui/icons/FormatItalic';

interface Props {
  isBoldActive?: boolean;
  onBoldToggle?: () => void;
  isItalicActive?: boolean;
  onItalicToggle?: () => void;
}

const Toolbar: React.FC<Props> = ({
  isBoldActive,
  onBoldToggle,
  isItalicActive,
  onItalicToggle,
}) => {
  return (
    <ButtonGroup color="primary" aria-label="outlined primary button group">
      <Button
        variant={isBoldActive ? 'contained' : 'outlined'}
        onClick={onBoldToggle}
        disableElevation
      >
        <FormatBoldIcon />
      </Button>
      <Button
        variant={isItalicActive ? 'contained' : 'outlined'}
        onClick={onItalicToggle}
        disableElevation
      >
        <FormatItalicIcon />
      </Button>
    </ButtonGroup>
  );
};

export default Toolbar;
