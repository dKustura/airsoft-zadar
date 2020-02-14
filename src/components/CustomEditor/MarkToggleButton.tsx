import React from 'react';
import { useSlate } from 'slate-react';

// Components
import ToggleButton from '@material-ui/lab/ToggleButton';

// Helpers
import { toggleMark, isMarkActive, MarkFormat } from './helpers';

interface Props {
  readonly format: MarkFormat;
  readonly Icon: React.ComponentType;
}

const MarkButton: React.FC<Props> = ({ format, Icon, ...other }) => {
  const editor = useSlate();
  const isActive = isMarkActive(editor, format);

  return (
    <ToggleButton
      {...other}
      size="small"
      selected={isActive}
      onChange={() => toggleMark(editor, format)}
    >
      <Icon />
    </ToggleButton>
  );
};

export default MarkButton;
