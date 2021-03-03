import { createStyles, Theme, makeStyles } from '@material-ui/core';
import { ThemeMode } from 'reducers/constants';

export const useStyles = makeStyles((theme: Theme) => {
  const cardFilter =
    theme.palette.type === ThemeMode.Light
      ? 'drop-shadow(0px 1px 3px rgba(0, 0, 0, 0.12)) drop-shadow(0px 1px 2px rgba(0, 0, 0, 0.24))'
      : undefined;

  const cardTransition =
    theme.palette.type === ThemeMode.Light
      ? 'filter 0.2s ease-in-out'
      : undefined;

  const cardHoverFilter =
    theme.palette.type === ThemeMode.Light
      ? 'drop-shadow(0 14px 28px rgba(0,0,0,0.22)) drop-shadow(0 10px 10px rgba(0,0,0,0.20))'
      : undefined;

  return createStyles({
    card: {
      position: 'relative',
      filter: cardFilter,
      transition: cardTransition,

      '&:hover': {
        filter: cardHoverFilter,
      },
    },
    thumbnailImage: {
      width: '24rem',
      height: '13.5rem',
      border: `5px solid ${theme.palette.postCard.main}`,
      transition: 'all 0.2s ease-in-out 0s',
    },
    titleContainer: {
      minHeight: '20rem',
      color: theme.palette.text.primary,
      bottom: 0,
      right: 0,
      clipPath: `inset(2rem 0 0 2rem round 0px)`,
      backgroundColor: theme.palette.postCard.main,
      height: '100%',
      textAlign: 'right',
      paddingLeft: '2rem',
      transition: 'background-color 0.2s ease-in-out 0s',
    },
    metadataContainer: {
      padding: '3rem 1rem 0rem 1rem',
    },
    title: {
      padding: '0rem 1rem 1rem 1rem',
    },
    thumbnailContainer: {
      position: 'absolute',
      top: 0,
      left: 0,
    },
  });
});
