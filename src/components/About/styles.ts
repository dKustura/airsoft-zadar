import { createStyles, Theme, makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    pageTitle: {
      position: 'relative',
      zIndex: 10,
    },
    mainDescription: {
      padding: '3rem',
      position: 'relative',
      zIndex: 10,
    },
    meetMembers: {
      padding: '0 3rem 3rem 3rem',
      position: 'relative',
      zIndex: 10,
    },
    teamImageContainer: {
      position: 'relative',
    },
    teamImage: {
      position: 'absolute',
      top: 0,
      left: 0,
    },
    teamImageSvg: {
      position: 'absolute',
      top: 0,
      left: 0,
    },
    memberNameContainer: {
      position: 'absolute',
    },
    memberName: {
      color: '#fff',
    },
    profileLeft: {
      paddingTop: '15rem',
    },
    profileRight: {
      paddingTop: '5rem',
    },
    backgroundParallax: {
      position: 'absolute',
      transformOrigin: '0 0',
      transform: 'translateZ(-2px) scale(2)',
    },
    maskImage: {
      clipPath: 'url(#mask)',
      width: '100%',
    },
  })
);
