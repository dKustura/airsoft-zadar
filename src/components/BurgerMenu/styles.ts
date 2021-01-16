import { createStyles, Theme, makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      position: 'sticky',
      top: 0,
      zIndex: 200,
      transition: 'background-color 0.2s ease-in-out 0s',
    },
    burgerMenu: {
      position: 'absolute',
      width: 0,
      height: 0,
      backgroundColor: theme.palette.background.default,
      borderBottomRightRadius: '100%',
      zIndex: -1,
      animation: `menuCloseAnimation 0.35s both`,
      transition: 'background-color 0.2s ease-in-out 0s',
    },
    burgerMenuActive: {
      animation: 'menuOpenAnimation 1s cubic-bezier(0.25, 0.1, 0.25, 1) both',
    },
    menuOptions: {
      opacity: 0,
      width: '100%',
      visibility: 'hidden',
      transition: 'opacity .3s cubic-bezier(0.25, 0.1, 0.25, 1) .2s',
      position: 'absolute',
    },
    menuOptionsVisible: {
      visibility: 'visible',
      opacity: 1,
    },
  })
);
