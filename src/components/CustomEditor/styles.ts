import { createStyles, Theme } from '@material-ui/core';

export default (theme: Theme) =>
  createStyles({
    editor: {
      borderWidth: 1,
      borderStyle: 'solid',
      borderRadius: 4,
      borderColor: theme.palette.primary.main,
      padding: theme.spacing(2),
      '&:focus': {
        boxShadow: `inset 0px 0px 0px 1px ${theme.palette.primary.main}`,
      },
    },
  });
