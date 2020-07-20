import { createStyles, Theme, makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme: Theme) => {
  return createStyles({
    card: {
      position: 'relative',
    },
    thumbnailImage: {
      width: '24rem',
      height: '13.5rem',
      borderRadius: theme.shape.borderRadius * 0,
      border: `5px solid ${theme.palette.postCard.main}`,
      transition: 'all 0.2s ease-in-out 0s',
      // borderBottom: `5px solid ${theme.palette.postCardBorder.main}`,
    },
    titleContainer: {
      minHeight: '20rem',
      color: theme.palette.text.primary,
      bottom: 0,
      right: 0,
      clipPath: `inset(2rem 0 0 2rem round ${theme.shape.borderRadius}px)`,
      backgroundColor: theme.palette.postCard.main,
      height: '100%',
      // border: `5px solid ${theme.palette.primary.main}`,
      // borderRadius: theme.shape.borderRadius,
      textAlign: 'right',
      paddingLeft: '2rem',
      transition: 'background-color 0.2s ease-in-out 0s',
    },
    thumbnailContainer: {
      position: 'absolute',
      top: 0,
      left: 0,
    },
  });
});
