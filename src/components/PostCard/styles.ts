import { createStyles, Theme, makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme: Theme) => {
  return createStyles({
    card: {
      position: 'relative',
      height: '23rem',
    },
    thumbnailImage: {
      width: '24rem',
      height: '13.5rem',
      borderRadius: theme.shape.borderRadius,
    },
    titleContainer: {
      color: theme.palette.text.primary,
      position: 'absolute',
      bottom: 0,
      right: 0,
      clipPath: `inset(2rem 0 0 2rem round ${theme.shape.borderRadius}px)`,
      backgroundColor: theme.palette.postCard.main,
      height: '100%',
      border: `3px solid ${theme.palette.postCardBorder.main}`,
      borderRadius: theme.shape.borderRadius,
      textAlign: 'right',
      paddingLeft: '2rem',
      transition: 'background-color 0.2s ease-in-out 0s',
      // '&:hover': {
      //   backgroundColor: 'rgba(225, 225, 0, 1)',
      // },
    },
    thumbnailContainer: {
      position: 'absolute',
      top: 0,
      left: 0,
    },
  });
});
