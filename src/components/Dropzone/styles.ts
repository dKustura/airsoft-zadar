import { createStyles, Theme } from '@material-ui/core';

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
        // paddingTop: theme.spacing(1),
        // paddingBottom: theme.spacing(1),
        // //         -webkit-box-shadow: 0px 0px 0px 10px rgba(255,0,0,1);
        // // -moz-box-shadow: 0px 0px 0px 10px rgba(255,0,0,1);
        // boxShadow: `0px ${borderHover}px rgba(255,0,0,1), 0px -${borderHover}px rgba(255,0,0,1)`,
      },
    },
    padding: {
      padding: theme.spacing(1),
    },
  });
};
