import * as React from 'react';
import { useCallback } from 'react';
import { useSlate } from 'slate-react';

// Components
import { Tooltip, Zoom } from '@material-ui/core';
import FormatClearIcon from '@material-ui/icons/FormatClear';

// Helpers
import { MarkFormat } from './helpers';
import ToolbarToggleButton from './ToolbarToggleButton';

interface Props {}

const MarksRemoveButton: React.FC<Props> = ({ ...other }) => {
  const editor = useSlate();

  const removeMarks = useCallback(() => {
    Object.values(MarkFormat).map((format) => editor.removeMark(format));
  }, [editor]);

  return (
    <Tooltip
      TransitionComponent={Zoom}
      placement="top"
      title="Remove formatting"
    >
      <ToolbarToggleButton
        {...other}
        value="removeStyle"
        selected={false}
        onChange={removeMarks}
      >
        <FormatClearIcon />
      </ToolbarToggleButton>
    </Tooltip>
  );
};

export default MarksRemoveButton;
