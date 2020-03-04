import React from 'react';
import { useSlate } from 'slate-react';

// Components
import { Tooltip, Zoom } from '@material-ui/core';
import ToolbarToggleButton from './ToolbarToggleButton';

// Helpers
import { toggleMark, isMarkActive, MarkFormat } from './helpers';

interface Props {
  readonly format: MarkFormat;
  readonly Icon: React.ComponentType;
  readonly tooltip?: string;
}

const MarkButton: React.FC<Props> = ({ format, Icon, tooltip, ...other }) => {
  const editor = useSlate();
  const isActive = isMarkActive(editor, format);

  return (
    <Tooltip TransitionComponent={Zoom} placement="top" title={tooltip}>
      <ToolbarToggleButton
        {...other}
        value="format"
        selected={isActive}
        onChange={() => toggleMark(editor, format)}
      >
        <Icon />
      </ToolbarToggleButton>
    </Tooltip>
  );
};

export default MarkButton;
