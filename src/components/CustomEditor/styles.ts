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
    errorEditor: {
      borderWidth: 1,
      borderStyle: 'solid',
      borderRadius: 4,
      borderColor: theme.palette.error.main,
      padding: theme.spacing(2),
      '&:focus': {
        boxShadow: `inset 0px 0px 0px 1px ${theme.palette.error.main}`,
      },
      minHeight: '30vh',
    },
  });

export const toolbarButtonStyles = (theme: Theme) =>
  createStyles({
    root: {
      color: theme.palette.primary.main,
      borderColor: theme.palette.primary.main,
      minWidth: theme.spacing(3),
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
    dropdownTextfieldInput: {
      height: '3rem',
    },
    dialogContent: {
      '&:first-child': {
        padding: `${theme.spacing(3)}px ${theme.spacing(3)}px`,
      },
      padding: `${theme.spacing(3)}px ${theme.spacing(3)}px`,
    },
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

export const elementStyles = (theme: Theme) =>
  createStyles({
    imageElement: {
      margin: theme.spacing(2),
    },
  });

export const hyperlinkButtonStyles = (theme: Theme) => createStyles({});
