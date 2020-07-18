import { createStyles, Theme, fade, makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    editor: {
      borderWidth: 1,
      borderStyle: 'solid',
      borderRadius: theme.shape.borderRadius,
      borderColor: theme.palette.primary.dark,
      padding: theme.spacing(2),
      '&:focus': {
        boxShadow: `inset 0px 0px 0px 1px ${theme.palette.primary.main}`,
      },
      minHeight: '30vh',
    },
    errorEditor: {
      borderWidth: 1,
      borderStyle: 'solid',
      borderRadius: theme.shape.borderRadius,
      borderColor: theme.palette.error.main,
      padding: theme.spacing(2),
      '&:focus': {
        boxShadow: `inset 0px 0px 0px 1px ${theme.palette.error.main}`,
      },
      minHeight: '30vh',
    },
  })
);

export const useToolbarButtonStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      color: theme.palette.primary.main,
      borderColor: theme.palette.primary.main,
      minWidth: theme.spacing(3),
      '&$selected': {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.background.default,
        '&:hover': {
          backgroundColor: theme.palette.primary.dark,
          color: theme.palette.background.default,
        },
      },
      '&:hover': {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.secondary.main,
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
    },
    dialogPaper: {
      backgroundColor: theme.palette.background.default,
    },
  })
);

export const useToolbarStyles = makeStyles((theme: Theme) =>
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
  })
);

export const useElementStyles = makeStyles((theme: Theme) =>
  createStyles({
    imageElement: {
      margin: theme.spacing(2),
    },
    quoteElement: {
      borderLeft: `solid ${theme.spacing(0.5)}px ${theme.palette.primary.main}`,
      paddingLeft: theme.spacing(2),
      color: fade(theme.palette.text.primary, 0.5),
      fontStyle: 'italic',
      margin: `0px ${theme.spacing(10)}px`,
    },
    defaultElement: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
    },
  })
);
