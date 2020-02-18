import { createStyles, Theme, fade } from '@material-ui/core';

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
      minHeight: '30vh',
    },
  });

export const toolbarButtonStyles = (theme: Theme) =>
  createStyles({
    root: {
      color: theme.palette.primary.main,
      borderColor: theme.palette.primary.main,
      '&$selected': {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.secondary.main,
        '&:hover': {
          backgroundColor: theme.palette.primary.dark,
          color: theme.palette.secondary.dark,
        },
      },
      '&:hover': {
        backgroundColor: theme.palette.secondary.light,
        color: theme.palette.primary.light,
      },
    },
    selected: {},
  });

export const toolbarStyles = (theme: Theme) =>
  createStyles({
    paper: {
      display: 'flex',
      border: `1px solid`,
      borderColor: fade(theme.palette.primary.main, 0.3),
      flexWrap: 'wrap',
      backgroundColor: 'transparent',
    },
    buttonGroupRoot: {
      backgroundColor: 'transparent',
    },
    buttonGroupGrouped: {
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
    divider: {
      alignSelf: 'stretch',
      height: 'auto',
      margin: theme.spacing(1, 0.5),
    },
  });
