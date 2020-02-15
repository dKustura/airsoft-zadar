import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import { withStyles, Theme } from '@material-ui/core';

export default withStyles((theme: Theme) => ({
  root: {
    backgroundColor: 'transparent',
  },
  grouped: {
    margin: theme.spacing(0.5),
    border: 'none',
    padding: theme.spacing(0, 1),
    '&:not(:first-child)': {
      borderRadius: theme.shape.borderRadius,
    },
    '&:first-child': {
      borderRadius: theme.shape.borderRadius,
    },
  },
}))(ToggleButtonGroup);
