import React, { Component } from 'react';

import ToggleButton from '@material-ui/lab/ToggleButton';

// Styling
import { withStyles, WithStyles } from '@material-ui/core/styles';
import { toolbarButtonStyles as styles } from './styles';

interface Props extends WithStyles<typeof styles> {
  readonly value: string;
  readonly selected: boolean;
  readonly onChange?: () => void;
}

class ToolbarToggleButton extends Component<Props> {
  render() {
    const {
      value,
      selected,
      onChange,
      classes,
      children,
      ...other
    } = this.props;

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
        onMouseDown={event => {
          // Added to prevent editor from losing focus on button click
          event.preventDefault();
        }}
      >
        {children}
      </ToggleButton>
    );
  }
}
export default withStyles(styles)(ToolbarToggleButton);
