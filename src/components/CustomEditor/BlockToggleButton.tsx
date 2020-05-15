import * as React from 'react';
import { useSlate } from 'slate-react';

// Components
import { Tooltip, Zoom } from '@material-ui/core';
import ToolbarToggleButton from './ToolbarToggleButton';

// Helpers
import { toggleBlock, isBlockActive, BlockFormat } from './helpers';

interface Props {
  readonly format: BlockFormat;
  readonly Icon: React.ComponentType;
  readonly tooltip?: string;
}

const BlockToggleButton: React.FC<Props> = ({
  format,
  Icon,
  tooltip,
  ...other
}) => {
  const editor = useSlate();
  const isActive = isBlockActive(editor, format);

  return (
    <Tooltip TransitionComponent={Zoom} placement="top" title={tooltip}>
      <ToolbarToggleButton
        {...other}
        value="format"
        selected={isActive}
        onChange={() => toggleBlock(editor, format)}
      >
        <Icon />
      </ToolbarToggleButton>
    </Tooltip>
  );
};

export default BlockToggleButton;
