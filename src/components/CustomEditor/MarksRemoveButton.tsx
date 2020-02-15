import React, { useCallback } from 'react';
import { useSlate } from 'slate-react';

// Components
import { Tooltip } from '@material-ui/core';
import ToggleButton from '@material-ui/lab/ToggleButton';
import FormatClearIcon from '@material-ui/icons/FormatClear';

// Helpers
import { MarkFormat } from './helpers';

// Styling
import { withStyles, WithStyles } from '@material-ui/core/styles';
import { markToggleButtonStyles as styles } from './styles';

interface Props extends WithStyles<typeof styles> {}

const MarksRemoveButton: React.FC<Props> = ({ classes, ...other }) => {
  const editor = useSlate();

  const removeMarks = useCallback(() => {
    Object.values(MarkFormat).map(format => editor.removeMark(format));
  }, [editor]);

  return (
    <Tooltip placement="top" title="Remove styling">
      <ToggleButton
        {...other}
        value="removeStyle"
        size="small"
        selected={false}
        onChange={removeMarks}
        classes={{
          root: classes.root,
          selected: classes.selected,
        }}
      >
        <FormatClearIcon />
      </ToggleButton>
    </Tooltip>
  );
};

export default withStyles(styles)(MarksRemoveButton);
