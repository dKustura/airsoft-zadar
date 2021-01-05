import * as React from 'react';
import { ReactEditor, useSlate } from 'slate-react';

// Components
import { Tooltip, Zoom, SvgIconProps } from '@material-ui/core';
import ToolbarToggleButton from './ToolbarToggleButton';

export interface BasicProps<TFormat> {
  readonly format: TFormat;
  readonly Icon: React.ComponentType<SvgIconProps>;
  readonly tooltip?: string;
}

interface Props<TFormat> extends BasicProps<TFormat> {
  readonly isActive: (editor: ReactEditor, format: TFormat) => boolean;
  readonly toggle: (editor: ReactEditor, format: TFormat) => void;
}

const GenericToggleButton = <T,>({
  format,
  Icon,
  tooltip,
  isActive,
  toggle,
  ...other
}: Props<T>) => {
  const editor = useSlate();

  return (
    <Tooltip TransitionComponent={Zoom} placement="top" title={tooltip || ''}>
      <ToolbarToggleButton
        {...other}
        value="format"
        selected={isActive(editor, format)}
        onChange={() => toggle(editor, format)}
      >
        <Icon />
      </ToolbarToggleButton>
    </Tooltip>
  );
};

export default GenericToggleButton;
