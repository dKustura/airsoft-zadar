import React from 'react';
import { useSlate } from 'slate-react';

// Components
import { Button } from '@material-ui/core';
import { toggleMark, isMarkActive } from './helpers';

interface Props {
  readonly format: string;
  readonly Icon: React.ComponentType;
}

const MarkButton: React.FC<Props> = ({ format, Icon, ...other }) => {
  const editor = useSlate();
  const isActive = isMarkActive(editor, format);

  return (
    <Button
      {...other}
      variant={isActive ? 'contained' : 'outlined'}
      onClick={() => toggleMark(editor, format)}
      disableElevation
      onMouseDown={event => {
        // Added to prevent editor from losing focus on button click
        event.preventDefault();
      }}
    >
      <Icon />
    </Button>
  );
};

export default MarkButton;
