import React from 'react';
import { useSlate } from 'slate-react';

// Components
import { Tooltip } from '@material-ui/core';
import ToggleButton from '@material-ui/lab/ToggleButton';

// Helpers
import { toggleMark, isMarkActive, MarkFormat } from './helpers';

// Styling
import { withStyles, WithStyles } from '@material-ui/core/styles';
import { markToggleButtonStyles as styles } from './styles';

interface Props extends WithStyles<typeof styles> {
  readonly format: MarkFormat;
  readonly Icon: React.ComponentType;
  readonly tooltip?: string;
}

const MarkButton: React.FC<Props> = ({
  format,
  Icon,
  classes,
  tooltip,
  ...other
}) => {
  const editor = useSlate();
  const isActive = isMarkActive(editor, format);

  return (
    <Tooltip placement="top" title={tooltip}>
      <ToggleButton
        {...other}
        value="format"
        size="small"
        selected={isActive}
        onChange={() => toggleMark(editor, format)}
        classes={{
          root: classes.root,
          selected: classes.selected,
        }}
        onMouseDown={event => {
          // Added to prevent editor from losing focus on button click
          event.preventDefault();
        }}
      >
        <Icon />
      </ToggleButton>
    </Tooltip>
  );
};

export default withStyles(styles)(MarkButton);
