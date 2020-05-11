import { createStyles, Theme, fade } from '@material-ui/core';

export default (theme: Theme) => {
  // const borderHover = theme.spacing(1);

  return createStyles({
    dropzone: {
      // backgroundColor: 'red',
      padding: theme.spacing(3),
      border: `2px dashed ${theme.palette.primary.main}`,
      borderRadius: 15,
      transition: 'all 0.2s ease-in-out 0s',

      '&:hover': {
        backgroundColor: fade(theme.palette.secondary.main, 0.3),
      },
    },
    dropzoneDrag: {},
    padding: {
      padding: theme.spacing(1),
    },
  });
};
