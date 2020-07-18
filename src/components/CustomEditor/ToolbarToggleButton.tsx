import * as React from 'react';

import ToggleButton from '@material-ui/lab/ToggleButton';

// Helpers
import { useToolbarButtonStyles as useStyles } from './styles';

interface Props {
  readonly value: string;
  readonly selected: boolean;
  readonly onChange?: () => void;
}

const ToolbarToggleButton: React.FC<Props> = ({
  value,
  selected,
  onChange,
  children,
  ...other
}) => {
  const classes = useStyles();

  return (
    <ToggleButton
      {...other}
      value={value}
      size="small"
      selected={selected}
      onChange={onChange}
      classes={{
        root: classes.root,
        selected: classes.selected,
      }}
      onMouseDown={(event) => {
        // Added to prevent editor from losing focus on button click
        event.preventDefault();
      }}
    >
      {children}
    </ToggleButton>
  );
};
export default ToolbarToggleButton;
